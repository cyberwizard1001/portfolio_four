// Duplicate ids and broken in-page references (href="#…", aria-*) in the built HTML.
//   node tools/a11y/probes/ids.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  if (p === 'dist/scratch' || p === 'dist/blocks-demo') return [];
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});
let problems = 0;
for (const f of walk('dist')) {
  const html = readFileSync(f, 'utf8');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const set = new Set(ids);
  const dups = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  const hrefs = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]).filter((r) => !set.has(r));
  const aria = [...html.matchAll(/aria-(?:labelledby|describedby|controls)="([^"]+)"/g)].flatMap((m) => m[1].split(' ')).filter((r) => !set.has(r));
  if (dups.length || hrefs.length || aria.length) problems++;
  console.log(`${f.padEnd(52)} ${String(ids.length).padStart(3)} ids  dup: ${dups.join(' ') || '-'}  broken href: ${hrefs.join(' ') || '-'}  broken aria: ${aria.join(' ') || '-'}`);
}
process.exitCode = problems ? 1 : 0;
