// Segmented sitemaps with honest lastmod.
//
// Two problems with what this replaces:
//
// 1. Every page carried `lastmod: new Date()`, so all 808 URLs claimed to have
//    changed on every deploy. Google learns quickly that a sitemap's lastmod
//    is noise and then stops using it — which matters a great deal on a site
//    where most URLs are sitting in "Discovered - currently not indexed" and
//    the crawler is deciding what is worth fetching.
//
// 2. One flat sitemap gives no per-template feedback. Split by page type, and
//    Search Console reports coverage per sitemap, so it becomes visible which
//    templates Google is accepting and which it is ignoring.
//
// lastmod comes from a hash of the page's own main content, stored in a
// committed manifest. A page's date only moves when its content actually
// moves, which is the entire point.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://nicovitolocksmith.com';
const MANIFEST = join(ROOT, 'sitemap-manifest.json');

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e === 'index.html') out.push(p);
  }
  return out;
}

/** Content fingerprint: the <main> text only, so a changed CSS filename or a
 *  reordered script tag does not read as a content change. */
function contentHash(file) {
  const html = readFileSync(file, 'utf8');
  const m = html.match(/<main[\s\S]*?<\/main>/i);
  const body = m ? m[0] : html;
  const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return createHash('sha1').update(text).digest('hex').slice(0, 16);
}

const SEGMENTS = [
  { name: 'core',      test: (p) => p === '/' || ['/about', '/contact', '/faq', '/reviews', '/services', '/service-areas', '/car-keys'].includes(p) },
  { name: 'services',  test: (p) => /^\/services\/[^/]+$/.test(p) },
  { name: 'car-keys',  test: (p) => /^\/car-keys\/[^/]+$/.test(p) },
  { name: 'areas',     test: (p) => /^\/service-areas\/[^/]+$/.test(p) },
  { name: 'local',     test: (p) => /^\/services\/[^/]+\/[^/]+$/.test(p) },
];

const PRIORITY = {
  core: 0.9, services: 0.9, 'car-keys': 0.8, areas: 0.7, local: 0.6,
};

const prev = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
const today = new Date().toISOString().slice(0, 10);
const next = {};
const bySegment = new Map(SEGMENTS.map((s) => [s.name, []]));

for (const file of walk(DIST)) {
  const rel = '/' + relative(DIST, file).replace(/\/?index\.html$/, '');
  const path = rel === '/' ? '/' : rel;
  if (path === '/404') continue;
  const hash = contentHash(file);
  const before = prev[path];
  const lastmod = before && before.hash === hash ? before.lastmod : today;
  next[path] = { hash, lastmod };

  const seg = SEGMENTS.find((s) => s.test(path));
  if (!seg) continue;
  const loc = `${SITE}${path === '/' ? '/' : path + '/'}`;
  bySegment.get(seg.name).push({ loc, lastmod, priority: PRIORITY[seg.name] });
}

const xmlEscape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

let total = 0;
const indexEntries = [];
for (const [name, urls] of bySegment) {
  if (!urls.length) continue;
  urls.sort((a, b) => a.loc.localeCompare(b.loc));
  total += urls.length;
  const body = urls
    .map((u) => `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n');
  writeFileSync(
    join(DIST, `sitemap-${name}.xml`),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
  );
  const newest = urls.reduce((a, u) => (u.lastmod > a ? u.lastmod : a), '0000-00-00');
  indexEntries.push({ name, newest, count: urls.length });
}

// The image sitemap is generated separately and shipped from public/.
if (existsSync(join(DIST, 'image-sitemap.xml'))) {
  indexEntries.push({ name: null, loc: `${SITE}/image-sitemap.xml`, newest: today });
}

writeFileSync(
  join(DIST, 'sitemap-index.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    indexEntries
      .map((e) => `  <sitemap>\n    <loc>${e.loc ?? `${SITE}/sitemap-${e.name}.xml`}</loc>\n    <lastmod>${e.newest}</lastmod>\n  </sitemap>`)
      .join('\n') +
    `\n</sitemapindex>\n`,
);

writeFileSync(MANIFEST, JSON.stringify(next, null, 0) + '\n');

const changed = Object.entries(next).filter(([p, v]) => !prev[p] || prev[p].hash !== v.hash).length;
console.log(
  `[sitemaps] ${total} urls across ${indexEntries.filter((e) => e.name).length} segments; ` +
    `${changed} page(s) changed content this build`,
);
for (const e of indexEntries.filter((x) => x.name)) console.log(`           sitemap-${e.name}.xml  ${e.count}`);
