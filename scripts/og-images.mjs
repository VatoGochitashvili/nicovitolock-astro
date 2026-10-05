// Share cards for the service, service x neighborhood and car-make pages.
//
// Every page used to carry the same og:image, so a shared link to the rekeying
// page looked exactly like a link to the homepage. Those pages now point at
// /og/<photo>.jpg (ogPhoto() in src/lib/seo.ts): a 1200x630 card cut from one
// of the full-size /work photos.
//
// The cards are committed in public/og/, so the deploy build needs no image
// tooling. Two modes:
//
//   node scripts/og-images.mjs             (part of `npm run build`)
//     Fails the build if a page asks for a card that public/og/ does not have.
//     A missing share image is otherwise silent — the link just unfurls blank.
//
//   node scripts/og-images.mjs --generate  (after a build, when it fails above)
//     Cuts every card the built pages ask for from public/work/, cropping on
//     the subject rather than the centre, and writes them to public/og/ and
//     dist/og/. JPEG, because not everything that unfurls links reads WebP.

import { readFileSync, readdirSync, statSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const WORK = join(ROOT, 'public', 'work');
const CARDS = join(ROOT, 'public', 'og');

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

const wanted = new Set();
for (const file of walk(DIST)) {
  const m = readFileSync(file, 'utf8').match(/<meta property="og:image" content="[^"]*\/og\/([^"/]+)\.jpg"/);
  if (m) wanted.add(m[1]);
}

if (process.argv.includes('--generate')) {
  const { default: sharp } = await import('sharp');
  mkdirSync(CARDS, { recursive: true });
  mkdirSync(join(DIST, 'og'), { recursive: true });
  for (const slug of wanted) {
    // shareablePhoto() in src/data/work.ts keeps the van out; this is the backstop.
    if (slug.startsWith('van-')) throw new Error(`refusing a van photo as a share card: ${slug} (retired 347 number on the van)`);
    const src = join(WORK, `${slug}.webp`);
    if (!existsSync(src)) throw new Error(`no source photo for share card: public/work/${slug}.webp`);
    const out = join(CARDS, `${slug}.jpg`);
    await sharp(src)
      .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    copyFileSync(out, join(DIST, 'og', `${slug}.jpg`));
  }
  console.log(`og-images: wrote ${wanted.size} cards to public/og/`);
} else {
  const missing = [...wanted].filter((slug) => !existsSync(join(CARDS, `${slug}.jpg`)));
  if (missing.length) {
    console.error(`og-images: ${missing.length} share card(s) missing from public/og/: ${missing.join(', ')}`);
    console.error('Run `node scripts/og-images.mjs --generate`, then build again.');
    process.exit(1);
  }
  console.log(`og-images: all ${wanted.size} share cards present`);
}
