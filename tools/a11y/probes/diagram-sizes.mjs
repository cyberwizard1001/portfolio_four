// Rendered width of each generated diagram on its case study, and the scale it is drawn at.
import { chromium } from 'playwright';
const BASE = process.env.A11Y_BASE ?? 'http://localhost:4321/portfolio_four/';
const DIAGRAMS = {
  'projects/perro-onboarding/': ['drop-off-funnel.svg', 'before-after-screens.svg'],
  'projects/counselling-companions/': ['admin-breakdown.svg', 'persona-solo.svg', 'persona-institution.svg'],
  'projects/direct-quote-flow/': ['evidence-map.svg'],
};
const browser = await chromium.launch();
for (const width of [1280, 375]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  for (const [path, files] of Object.entries(DIAGRAMS)) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    for (const f of files) {
      const r = await page.evaluate((f) => [...document.images].filter((i) => i.src.endsWith(f)).map((i) => ({ w: i.getBoundingClientRect().width, nat: i.naturalWidth, alt: i.alt })), f);
      r.forEach((x) => console.log(width, f, `${Math.round(x.w)}px of ${x.nat} = x${(x.w / x.nat).toFixed(3)}`, '| alt:', x.alt));
    }
  }
  await page.close();
}
await browser.close();
