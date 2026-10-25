// Renders SVG files to PNG for a visual check: node shoot-svg.mjs out-dir file.svg...
import { chromium } from 'playwright';
import { basename, resolve } from 'node:path';
const [out, ...files] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage();
for (const f of files) {
  await page.goto('file://' + resolve(f));
  await page.locator('svg').screenshot({ path: `${out}/${basename(f, '.svg')}.png` });
}
await browser.close();
