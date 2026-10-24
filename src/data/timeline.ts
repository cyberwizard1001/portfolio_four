export interface TimelineEntry {
  org: string;
  title: string;
  dates: string;
  body: string;
}

// Current roles first (main role before volunteering), then past roles newest first.
export const timeline: TimelineEntry[] = [
  {
    org: 'Tedaisy Insurance Group',
    title: 'Product Designer',
    dates: '2024–present',
    body: 'Designing across the insurance funnel, where compliance copy and legacy frameworks are the constraint, not an excuse. Recent work: redesigning the pet-insurance review/checkout page around clarity and trust.',
  },
  {
    org: 'Reach Volunteering',
    title: 'Volunteer (UX/Design)',
    dates: '2026–present',
    body: "Giving design and research time to charities that can't usually afford it.",
  },
  {
    org: 'Perro',
    title: 'UX Designer & Flutter Developer',
    dates: '2023–24',
    body: 'Redesigned and built the onboarding and subscription flow in Flutter, designer and developer in one. The work was later cited as a product strength when the company was acquired.',
  },
  {
    org: 'Newcastle University',
    title: 'MSc, Human–Computer Interaction',
    dates: '2023–24',
    body: 'Dissertation on reducing the admin burden on mental-health practitioners — research, co-design by post, a Figma prototype, and a Responsible Research and Innovation review.',
  },
];
