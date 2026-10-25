// Tabs through every in-scope page at 1280px and 375px and reports, for each stop in
// the tab order: whether a focus indicator is drawn, whether a sticky bar covers it,
// and whether the target is under 24x24px. Also checks the skip link.
//   node tools/a11y/probes/keyboard.mjs [path…]
import { chromium } from 'playwright';
import { PAGES } from '../pages.mjs';

const BASE = process.env.A11Y_BASE ?? 'http://localhost:4321/portfolio_four/';
const only = process.argv.slice(2);
const browser = await chromium.launch();

for (const width of [1280, 375]) {
  // Reduced motion makes focus scrolling instant, so positions are read after the scroll ends.
  const page = await browser.newPage({ viewport: { width, height: width > 400 ? 800 : 812 }, reducedMotion: 'reduce' });
  for (const path of only.length ? only : PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const issues = [];

    // Skip link: first in tab order, visible on focus, lands in main.
    await page.keyboard.press('Tab');
    const skip = await page.evaluate(() => {
      const a = document.activeElement;
      const r = a.getBoundingClientRect();
      return { cls: a.className, visible: r.top >= 0 && r.bottom <= innerHeight && r.width > 1 };
    });
    if (!String(skip.cls).includes('skip-link') || !skip.visible) issues.push(`skip link: first tab stop is .${skip.cls}, visible=${skip.visible}`);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    const afterSkip = await page.evaluate(() => Boolean(document.activeElement.closest('#main-content')));
    if (!afterSkip) issues.push('skip link: next Tab after it does not land inside #main-content');

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.evaluate(() => document.activeElement?.blur());
    let count = 0;
    const seen = new Set();
    for (let i = 0; i < 400; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const a = document.activeElement;
        if (!a || a === document.body) return null;
        const r = a.getBoundingClientRect();
        const cs = getComputedStyle(a);
        const key = a.outerHTML.slice(0, 120) + r.top + window.scrollY;
        const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2) || /\d+px \d+px 0px [1-9]/.test(cs.boxShadow) || cs.boxShadow.includes('inset');
        // Sticky things that could cover the focused element.
        const covers = [...document.querySelectorAll('.menubar, .route')].filter((s) => {
          const ps = getComputedStyle(s).position;
          if (ps !== 'sticky' && ps !== 'fixed') return false;
          if (s.contains(a)) return false;
          const sr = s.getBoundingClientRect();
          return r.top < sr.bottom && r.bottom > sr.top && r.left < sr.right && r.right > sr.left;
        }).map((s) => s.className.split(' ')[0]);
        const inline = cs.display === 'inline' && a.closest('p, li, dd, td, figcaption');
        return {
          key,
          label: `${a.tagName.toLowerCase()}${a.className ? '.' + String(a.className).split(' ').filter((c) => !c.startsWith('astro'))[0] : ''} "${(a.getAttribute('aria-label') || a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)}"`,
          ring,
          outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
          covers,
          small: !inline && (r.width < 24 || r.height < 24) ? `${Math.round(r.width)}x${Math.round(r.height)}` : '',
          offscreen: r.bottom < 0 || r.top > innerHeight,
          hiddenAncestor: Boolean(a.closest('[aria-hidden="true"]')),
        };
      });
      if (!info) break;
      if (seen.has(info.key)) break;
      seen.add(info.key);
      count++;
      if (!info.ring) issues.push(`no focus ring: ${info.label} (${info.outline})`);
      if (info.covers.length) issues.push(`covered by ${info.covers.join(', ')}: ${info.label}`);
      if (info.small) issues.push(`target ${info.small}: ${info.label}`);
      if (info.offscreen) issues.push(`focused but off screen: ${info.label}`);
      if (info.hiddenAncestor) issues.push(`focus inside aria-hidden: ${info.label}`);
    }
    const unique = [...new Set(issues)];
    console.log(`${width} /${path} — ${count} tab stops${unique.length ? '\n   ' + unique.join('\n   ') : ''}`);
  }
  await page.close();
}
await browser.close();
