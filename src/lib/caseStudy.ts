// Builds the vertical route for a case study page: the TLDR's Problem, Approach,
// Constraints and Outcome become the first stops, then the entry's own `sections`
// continue along the same line, then any markdown body headings.
import { jargonify } from './jargon';

export interface Section {
  component: string;
  props?: Record<string, any>;
}

export interface Stop {
  id: string;
  name: string;
  /** Rendered TLDR paragraph, for the first four stops. */
  html?: string;
  /** Blocks on this stop. The first one's own heading is hidden when it named the stop. */
  blocks: { section: Section; hideHeading: boolean }[];
  /** Markdown heading id, when the stop is a heading inside the rendered body. */
  headingId?: string;
}

/** Blocks never placed on the route: the header and "next stop" replace them. */
const OFF_ROUTE = new Set(['ProjectHero', 'ProjectMeta', 'ProjectIntro', 'MoreProjects']);

/** Untitled blocks that can open a stop use their own visible label. */
const OWN_LABEL: Record<string, string> = { ProjectProblemKeyInfo: 'Problem' };

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Split a TLDR body of `**Label:** text` paragraphs into named parts. */
export function parseTldr(body: string | undefined): { name: string; html: string }[] {
  if (!body) return [];
  return body
    .split(/\n\s*\n/)
    .map((para) => para.trim().match(/^\*\*([^*:]+):\*\*\s*([\s\S]+)$/))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .map((m) => ({ name: m[1].trim(), html: jargonify(m[2].trim()) }));
}

export function buildStops(
  tldrBody: string | undefined,
  sections: Section[],
  headings: { depth: number; slug: string; text: string }[]
): { stops: Stop[]; intro?: Section; leadBlocks: Section[] } {
  const stops: Stop[] = [];
  const leadBlocks: Section[] = [];
  const used = new Set<string>();
  const uniqueId = (name: string) => {
    let id = `stop-${slug(name) || 'section'}`;
    let n = 2;
    while (used.has(id)) id = `stop-${slug(name)}-${n++}`;
    used.add(id);
    return id;
  };

  for (const part of parseTldr(tldrBody)) {
    stops.push({ id: uniqueId(part.name), name: part.name, html: part.html, blocks: [] });
  }

  const intro = sections.find((s) => s.component === 'ProjectIntro');
  let heroSkipped = false;
  for (const section of sections) {
    if (OFF_ROUTE.has(section.component)) continue;
    if (section.component === 'ProjectGallery' && !heroSkipped) {
      heroSkipped = true;
      continue;
    }
    const p = section.props ?? {};
    const title: string | undefined = p.title ?? p.heading ?? p.label;
    if (title) {
      stops.push({ id: uniqueId(title), name: title, blocks: [{ section, hideHeading: true }] });
    } else if (stops.length) {
      stops[stops.length - 1].blocks.push({ section, hideHeading: false });
    } else if (OWN_LABEL[section.component]) {
      const name = OWN_LABEL[section.component];
      stops.push({ id: uniqueId(name), name, blocks: [{ section, hideHeading: false }] });
    } else {
      leadBlocks.push(section);
    }
  }

  // Markdown body: its top heading level below the page title becomes stops.
  const levels = headings.filter((h) => h.depth > 1).map((h) => h.depth);
  if (levels.length) {
    const depth = Math.min(...levels);
    for (const h of headings.filter((h) => h.depth === depth)) {
      stops.push({ id: h.slug, name: h.text, blocks: [], headingId: h.slug });
    }
  }

  return { stops, intro, leadBlocks };
}

/** Sat-nav arrows for the route window: turn by turn, with a dot for the destination. */
export function arrowFor(index: number, total: number) {
  if (index === total - 1) return '●';
  if (index === 0) return '↑';
  return index % 2 ? '↱' : '↰';
}
