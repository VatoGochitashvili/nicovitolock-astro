import type { APIRoute } from 'astro';
import { workPhotos } from '@/data/work';
import { services } from '@/data/services';
import { vehicles } from '@/data/vehicles';
import { photosForService, photosForMake } from '@/data/work';
import { SITE } from '@/lib/seo';

/**
 * Image sitemap.
 *
 * The work photographs are first-party and unique — nobody else has them — so
 * they are worth surfacing to Google Images explicitly rather than hoping the
 * crawler finds them in markup. Each entry is tied to the page it appears on,
 * which is what the spec requires.
 */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = () => {
  const entries: { page: string; imgs: typeof workPhotos }[] = [];

  for (const s of services) {
    const imgs = photosForService(s.slug);
    if (imgs.length) entries.push({ page: `/services/${s.slug}/`, imgs });
  }
  for (const v of vehicles) {
    const imgs = photosForMake(v.slug);
    if (imgs.length) entries.push({ page: `/car-keys/${v.slug}/`, imgs });
  }
  entries.push({ page: '/', imgs: workPhotos.filter((w) => !w.aiGenerated).slice(0, 12) });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(({ page, imgs }) => `  <url>
    <loc>${SITE}${page}</loc>
${imgs.map((i) => `    <image:image>
      <image:loc>${SITE}/work/${i.slug}.webp</image:loc>
      <image:title>${esc(i.caption)}</image:title>
      <image:caption>${esc(i.alt)}</image:caption>
    </image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
};
