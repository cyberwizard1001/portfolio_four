import { glossary } from '../data/glossary';

const MARKER = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

let counter = 0;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Replaces author-written `[[term]]` / `[[term|display text]]` markers with a
 * jargon-trigger button + its tooltip. Throws at build time if `term` isn't
 * in the glossary, so a typo fails the build instead of shipping silently.
 */
export function jargonify(text: string): string {
  let lastIndex = 0;
  let out = '';
  let match: RegExpExecArray | null;

  MARKER.lastIndex = 0;
  while ((match = MARKER.exec(text))) {
    const [full, rawTerm, rawDisplay] = match;
    const term = rawTerm.trim().toLowerCase();
    const meaning = (glossary as Record<string, string>)[term];

    if (!meaning) {
      throw new Error(
        `jargonify: unknown glossary term "${rawTerm}" (from "${full}"). Add it to src/data/glossary.ts.`
      );
    }

    out += escapeHtml(text.slice(lastIndex, match.index));

    const display = escapeHtml((rawDisplay ?? rawTerm).trim());
    const id = `jargon-tip-${counter++}`;

    out +=
      `<button type="button" class="jargon-term" aria-expanded="false" aria-describedby="${id}">${display}</button>` +
      `<span class="jargon-tip" role="tooltip" id="${id}">${escapeHtml(meaning)}</span>`;

    lastIndex = match.index + full.length;
  }

  out += escapeHtml(text.slice(lastIndex));
  return out;
}
