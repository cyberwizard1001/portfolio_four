// Lists visible text set below 14px, per page, at 1280px.
import { chromium } from 'playwright';
import { PAGES } from '../pages.mjs';
const BASE = process.env.A11Y_BASE ?? 'http://localhost:4321/portfolio_four/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
for (const p of PAGES) {
  await page.goto(BASE + p, { waitUntil: 'networkidle' });
  const rows = await page.evaluate(() => {
    const seen = new Map();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const t = walker.currentNode; if (!t.textContent.trim()) continue;
      const el = t.parentElement; const cs = getComputedStyle(el);
      if (el.closest('.visually-hidden, script, style') || el.getClientRects().length === 0) continue;
      const size = parseFloat(cs.fontSize); if (size >= 14) continue;
      const k = `${size}px ${cs.fontFamily.split(',')[0]} ${el.tagName.toLowerCase()}.${String(el.className).split(' ').filter((c) => !c.startsWith('astro')).join('.')}`;
      if (!seen.has(k)) seen.set(k, t.textContent.trim().slice(0, 40));
    }
    return [...seen];
  });
  if (rows.length) console.log('/' + p + '\n' + rows.map(([k, v]) => `   ${k}  "${v}"`).join('\n'));
}
await browser.close();
