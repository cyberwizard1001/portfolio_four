// Accessibility scan of the production build. Dev-only.
//
//   npm run build && npm run preview      (in one terminal)
//   node tools/a11y/scan.mjs              (in another)
//
// Visits every in-scope page at desktop and phone widths, runs axe with the
// WCAG 2.0/2.1/2.2 A and AA rules plus best practice, and writes the results
// to tools/a11y/axe-results.json. Set A11Y_BASE to scan another origin, for
// example A11Y_BASE=http://localhost:4321/ for a Cloudflare-style build.
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { PAGES } from './pages.mjs';

const BASE = process.env.A11Y_BASE ?? 'http://localhost:4321/portfolio_four/';

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 375, height: 812 },
];

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'];

const browser = await chromium.launch();
const results = [];
let serious = 0;

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  for (const path of PAGES) {
    const page = await context.newPage();
    const url = BASE + path;
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    if (!response?.ok()) throw new Error(`${url} returned ${response?.status()}`);
    const axe = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    const violations = axe.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      tags: v.tags.filter((t) => t.startsWith('wcag') || t === 'best-practice'),
      nodes: v.nodes.map((n) => ({ target: n.target.join(' '), summary: n.failureSummary })),
    }));
    const incomplete = axe.incomplete.map((v) => ({
      id: v.id,
      help: v.help,
      nodes: v.nodes.map((n) => ({ target: n.target.join(' '), summary: n.failureSummary })),
    }));
    serious += violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').length;
    results.push({ page: '/' + path, viewport: viewport.name, violations, incomplete });
    const line = violations.map((v) => `${v.id} (${v.impact}, ${v.nodes.length})`).join(', ') || 'clean';
    console.log(`${viewport.name.padEnd(7)} /${path.padEnd(34)} ${line}`);
    await page.close();
  }
  await context.close();
}

await browser.close();

const out = fileURLToPath(new URL('./axe-results.json', import.meta.url));
await writeFile(out, JSON.stringify({ base: BASE, tags: TAGS, scannedAt: new Date().toISOString(), results }, null, 2) + '\n');
console.log(`\n${serious} serious or critical violation type(s). Results in tools/a11y/axe-results.json`);
process.exitCode = serious ? 1 : 0;
