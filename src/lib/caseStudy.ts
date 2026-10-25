// Builds the vertical route for a case study page: the entry's own `sections`, then
// any markdown body headings. Sections that share a `chapter` are grouped under one
// stop, each titled one as a sub-section. The TLDR is not a stop: the hero's route
// strip carries it (see `heroLegs`).
import { jargonify } from './jargon';

export interface Section {
  component: string;
  /** Groups consecutive sections under one chapter stop. */
  chapter?: string;
  props?: Record<string, any>;
}

export interface SubSection {
  id: string;
  name: string;
}

export interface StopBlock {
  section: Section;
  hideHeading: boolean;
  /** Set when the block opens a sub-section of a chapter stop. */
  sub?: SubSection;
}

export interface Stop {
  id: string;
  name: string;
  /** Blocks on this stop. A block's own heading is hidden when it named the stop or a sub-section. */
  blocks: StopBlock[];
  /** Sub-sections of a chapter stop, in page order. */
  subs: SubSection[];
  /** Set on stops grouped from sections that share a chapter. */
  chapter?: string;
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

/** Split a TLDR body of `**Label:** text` paragraphs into named parts, as written. */
function tldrParts(body: string | undefined): { name: string; text: string }[] {
  if (!body) return [];
  return body
    .split(/\n\s*\n/)
    .map((para) => para.trim().match(/^\*\*([^*:]+):\*\*\s*([\s\S]+)$/))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .map((m) => ({ name: m[1].trim(), text: m[2].trim() }));
}

export type LegName = 'start' | 'route' | 'roadworks' | 'arrived';

export interface HeroShot {
  src: string;
  alt: string;
  caption?: string;
}

export interface HeroPair {
  label: string;
  before?: HeroShot;
  after: HeroShot;
}

/** The summary hero's content, from the entry's `hero` frontmatter (see config.ts). */
export interface Hero {
  inShort?: string;
  changed?: string[];
  notWell?: string[];
  role?: string;
  workedWith?: string[];
  timeframe?: string;
  status?: string;
  legs?: Partial<Record<LegName, string>>;
  beforeText?: string;
  afterText?: string;
  pairs?: HeroPair[];
}

export interface Leg {
  name: LegName;
  /** One line for the strip: the override, or the TLDR part's first sentence as plain text. */
  short: string;
  /** The TLDR part in full, with glossary terms. */
  html: string;
}

/** TLDR part to route strip leg. */
const LEGS: [string, LegName][] = [
  ['Problem', 'start'],
  ['Approach', 'route'],
  ['Constraints', 'roadworks'],
  ['Outcome', 'arrived'],
];

/** Glossary markers to their display text, for places that can't hold a tooltip. */
const plain = (text: string) =>
  text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, term, display) => (display ?? term).trim());

/** Everything up to the first full stop that is followed by a capital letter. */
const firstSentence = (text: string) => {
  const m = text.match(/^[\s\S]*?\.(?=\s+[A-Z])/);
  return (m ? m[0] : text).trim();
};

/** The route strip on the hero: one leg per TLDR part, in route order. Missing parts are left out. */
export function heroLegs(
  tldrBody: string | undefined,
  overrides: Partial<Record<LegName, string>> = {}
): Leg[] {
  const parts = tldrParts(tldrBody);
  return LEGS.flatMap(([part, name]) => {
    const text = parts.find((p) => p.name === part)?.text;
    if (!text) return [];
    return [{ name, short: overrides[name] ?? plain(firstSentence(text)), html: jargonify(text) }];
  });
}

export function buildStops(
  sections: Section[],
  headings: { depth: number; slug: string; text: string }[]
): { stops: Stop[]; leadBlocks: Section[] } {
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

  let heroSkipped = false;
  for (const section of sections) {
    if (OFF_ROUTE.has(section.component)) continue;
    if (section.component === 'ProjectGallery' && !heroSkipped) {
      heroSkipped = true;
      continue;
    }
    const p = section.props ?? {};
    const title: string | undefined = p.title ?? p.heading ?? p.label;
    const last = stops[stops.length - 1];
    if (section.chapter) {
      let stop = last;
      if (!stop || stop.chapter !== section.chapter) {
        stop = { id: uniqueId(section.chapter), name: section.chapter, chapter: section.chapter, blocks: [], subs: [] };
        stops.push(stop);
      }
      if (title && title !== section.chapter) {
        const sub = { id: uniqueId(title), name: title };
        stop.subs.push(sub);
        stop.blocks.push({ section, hideHeading: true, sub });
      } else {
        stop.blocks.push({ section, hideHeading: Boolean(title) });
      }
    } else if (title) {
      stops.push({ id: uniqueId(title), name: title, blocks: [{ section, hideHeading: true }], subs: [] });
    } else if (last) {
      last.blocks.push({ section, hideHeading: false });
    } else if (OWN_LABEL[section.component]) {
      const name = OWN_LABEL[section.component];
      stops.push({ id: uniqueId(name), name, blocks: [{ section, hideHeading: false }], subs: [] });
    } else {
      leadBlocks.push(section);
    }
  }

  // Markdown body: its top heading level below the page title becomes stops.
  const levels = headings.filter((h) => h.depth > 1).map((h) => h.depth);
  if (levels.length) {
    const depth = Math.min(...levels);
    for (const h of headings.filter((h) => h.depth === depth)) {
      stops.push({ id: h.slug, name: h.text, blocks: [], subs: [], headingId: h.slug });
    }
  }

  return { stops, leadBlocks };
}

/** Route window markers: start, straight on, and a dot for the destination. */
export function arrowFor(index: number, total: number) {
  if (index === total - 1) return '●';
  if (index === 0) return '↑';
  return '↓';
}
