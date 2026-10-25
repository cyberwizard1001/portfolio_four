import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { deviceNames } from '../data/sprites';

// Each project and build has its own pixel device, so the sprites double as an icon system.
const device = z.enum(deviceNames);

// Shared enum for project-block section components — used by both projects and buildPages.
const sectionComponent = z.enum([
  'ProjectHero',
  'ProjectGallery',
  'ProjectTextBlock',
  'ProjectMeta',
  'ProjectIntro',
  'ProjectCallout',
  'ProjectQuote',
  'ProjectMetricsBand',
  'ProjectLearnings',
  'ProjectProcessSteps',
  'ProjectFindingsGrid',
  'ProjectHowMightWe',
  'ProjectDecisionLog',
  'ProjectPersona',
  'ProjectProblemKeyInfo',
  'ProjectTextImage',
  'ProjectImageGalleryGrid',
  'ProjectImageCarousel',
  'ProjectAccessibilityAudit',
  'MoreProjects',
]);

// One block on a case study. Sections that share a `chapter` are grouped under one stop.
const section = z.object({
  component: sectionComponent,
  chapter: z.string().optional(),
  props: z.record(z.any()).optional(),
});

// The summary hero at the top of a case study. Everything is optional so a page builds
// before its copy is written.
const heroImage = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const hero = z.object({
  /** Two sentences: what the project was and what changed. */
  inShort: z.string().optional(),
  /** Two to four short benefits. */
  changed: z.array(z.string()).optional(),
  /** One to three honest lines on what didn't go well. */
  notWell: z.array(z.string()).optional(),
  role: z.string().optional(),
  workedWith: z.array(z.string()).optional(),
  timeframe: z.string().optional(),
  status: z.string().optional(),
  /** Short overrides for the route strip. If missing, the first sentence of the TLDR part is used. */
  legs: z
    .object({
      start: z.string().optional(),
      route: z.string().optional(),
      roadworks: z.string().optional(),
      arrived: z.string().optional(),
    })
    .optional(),
  /** The overall before and after text, shown under the viewer and swapped by the toggle. */
  beforeText: z.string().optional(),
  afterText: z.string().optional(),
  /** Matched screens. A pair with only `after` is allowed. */
  pairs: z
    .array(
      z.object({
        label: z.string(),
        before: heroImage.optional(),
        after: heroImage,
      })
    )
    .optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    filename: z.string(),
    mode: z.string().default('NORMAL'),
    type: z.string(),
    year: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    oneliner: z.string(),
    eyebrow: z.string().optional(),
    problem: z.string().optional(),
    outcomeValue: z.string().optional(),
    outcomeLabel: z.string().optional(),
    isNew: z.boolean().optional(),
    hidden: z.boolean().optional(),
    statusline: z.array(
      z.object({
        label: z.string(),
        lime: z.boolean().optional(),
      })
    ),
    order: z.number(),
    device: device.optional(),
    hero: hero.optional(),
    sections: z
      .array(section)
      .optional(),
  }),
});

const projectTldrs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/project-tldrs' }),
  schema: z.object({}).passthrough(),
});

const buildPages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/build-pages' }),
  schema: z.object({
    title: z.string(),
    filename: z.string(),
    mode: z.string().default('NORMAL'),
    type: z.string(),
    year: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    oneliner: z.string(),
    statusline: z.array(
      z.object({
        label: z.string(),
        lime: z.boolean().optional(),
      })
    ),
    order: z.number(),
    device: device.optional(),
    hero: hero.optional(),
    sections: z
      .array(section)
      .optional(),
  }),
});

const builds = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/builds' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string(),
    tags: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    order: z.number().default(0),
    device: device.optional(),
  }),
});

export const collections = { projects, projectTldrs, builds, buildPages };
