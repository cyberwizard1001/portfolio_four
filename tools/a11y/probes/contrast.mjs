import { chromium } from 'playwright';
import { PAGES } from '../pages.mjs';
const BASE = process.env.A11Y_BASE ?? 'http://localhost:4321/portfolio_four/';
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
const pairs = new Map();
for (const p of PAGES) {
  const page = await ctx.newPage(); await page.goto(BASE + p, { waitUntil: 'networkidle' });
  const rows = await page.evaluate(() => {
    const parse = (c) => { const m = c.match(/[\d.]+/g); if (!m) return null; const [r,g,bl,a=1] = m.map(Number); return {r,g,b:bl,a}; };
    const lum = ({r,g,b}) => { const f = (v) => { v/=255; return v<=0.03928? v/12.92 : ((v+0.055)/1.055)**2.4; }; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
    const hex = (c) => '#' + [c.r,c.g,c.b].map((v)=>Math.round(v).toString(16).padStart(2,'0')).join('').toUpperCase();
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const t = walker.currentNode; if (!t.textContent.trim()) continue;
      const el = t.parentElement; if (el.closest('[aria-hidden="true"], .visually-hidden, script, style, .jargon-tip, dialog')) continue;
      const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none' || el.getClientRects().length === 0) continue;
      const fg = parse(cs.color);
      let bg = null, n = el;
      while (n && n.nodeType === 1) { const c = parse(getComputedStyle(n).backgroundColor); if (c && c.a > 0.5) { bg = c; break; } n = n.parentElement; }
      bg = bg || {r:255,g:255,b:255};
      const L1 = lum(fg), L2 = lum(bg); const ratio = (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
      const size = parseFloat(cs.fontSize), w = parseInt(cs.fontWeight);
      const large = size >= 24 || (size >= 18.66 && w >= 700);
      out.push({ fg: hex(fg), bg: hex(bg), ratio: Math.round(ratio*100)/100, size, large, family: cs.fontFamily.split(',')[0], sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').filter(c=>!c.startsWith('astro')).slice(0,2).join('.') : ''), text: t.textContent.trim().slice(0, 30) });
    }
    return out;
  });
  for (const r of rows) { const k = `${r.fg} on ${r.bg}`; const e = pairs.get(k) ?? { ratio: r.ratio, minSize: 99, fails: [], count: 0 }; e.count++; e.minSize = Math.min(e.minSize, r.size); if (r.ratio < (r.large ? 3 : 4.5)) e.fails.push(`/${p} ${r.sel} ${r.size}px "${r.text}"`); pairs.set(k, e); }
  await page.close();
}
await b.close();
for (const [k, e] of [...pairs].sort((a,b)=>a[1].ratio-b[1].ratio)) console.log(k, e.ratio, 'n=' + e.count, 'minSize=' + e.minSize, e.fails.length ? '\n   FAIL ' + [...new Set(e.fails)].slice(0,8).join('\n   FAIL ') : '');
