/**
 * Live Google Business Profile content — every review, and the profile's
 * photos — injected into the static pages at the edge.
 *
 * Source: the Google Business Profile API (the owner-side API). It returns
 * EVERY review on the profile, and because they are the business's own data
 * they may be stored and displayed. The public Places API would return at
 * most five and forbids storing them, so it is deliberately not used.
 *
 * Storage: the edge cache, not KV. Adding a KV namespace means a new binding,
 * and a bad binding fails the whole deploy — see the _redirects incident in
 * the git log. The reviews are cached for six hours per Cloudflare location
 * and refreshed in the background, so no visitor ever waits on Google.
 *
 * Needs five Worker secrets (scripts/gbp-connect.mjs prints them):
 *   GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN,
 *   GBP_ACCOUNT_ID, GBP_LOCATION_ID
 * Until they exist this module does nothing and the pages show their static
 * content, exactly as before.
 *
 * Rendering: pages carry <div data-live-reviews data-limit="N">. HTMLRewriter
 * swaps in the review cards server-side, so Google indexes the real text.
 * The markup reuses classes already compiled into the site CSS by
 * src/components/Reviews.astro — do not invent new Tailwind classes here,
 * they would not exist in the stylesheet.
 */

const CACHE_KEY = 'https://nicovitolocksmith.com/__cache/google-profile-v2';

// Profile photos that must never be republished, by media item ID (the last
// part of the item's `name`). Anything uploaded to the Google profile appears
// on /our-work/ within six hours, so a photo showing the retired 347 number,
// or the AI storefront, goes here if it is ever uploaded.
const EXCLUDED_MEDIA = new Set([]);
// Categories never shown: the logo and profile picture are not job photos,
// and EXTERIOR is where a storefront picture would be filed — the business is
// fully mobile and must not appear to have premises.
const EXCLUDED_CATEGORIES = new Set(['LOGO', 'PROFILE', 'EXTERIOR']);
const FRESH_FOR = 6 * 60 * 60; // seconds
const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

export const reviewsConfigured = (env) =>
  Boolean(env.GBP_CLIENT_ID && env.GBP_CLIENT_SECRET && env.GBP_REFRESH_TOKEN &&
          env.GBP_ACCOUNT_ID && env.GBP_LOCATION_ID);

async function accessToken(env) {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.GBP_CLIENT_ID,
      client_secret: env.GBP_CLIENT_SECRET,
      refresh_token: env.GBP_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  if (!r.ok) throw new Error(`token ${r.status}`);
  return (await r.json()).access_token;
}

/** Google stores machine translations alongside the original; keep the original. */
function originalText(t = '') {
  if (t.includes('(Original)')) return t.split('(Original)').pop().trim();
  if (t.includes('(Translated by Google)')) return t.split('(Translated by Google)')[0].trim();
  return t.trim();
}

export async function fetchReviews(env, token) {
  const base = `https://mybusiness.googleapis.com/v4/accounts/${env.GBP_ACCOUNT_ID}/locations/${env.GBP_LOCATION_ID}/reviews`;
  const all = [];
  let pageToken = '';
  for (let i = 0; i < 20; i++) {
    const u = `${base}?pageSize=50&orderBy=updateTime%20desc${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const r = await fetch(u, { headers: { authorization: `Bearer ${token}` } });
    if (!r.ok) throw new Error(`reviews ${r.status}`);
    const j = await r.json();
    all.push(...(j.reviews ?? []));
    if (!j.nextPageToken) break;
    pageToken = encodeURIComponent(j.nextPageToken);
  }
  return all
    .map((v) => ({
      author: v.reviewer?.isAnonymous ? 'A Google user' : (v.reviewer?.displayName || 'A Google user'),
      rating: STARS[v.starRating] ?? 0,
      date: v.createTime,
      text: originalText(v.comment),
      reply: v.reviewReply?.comment ? originalText(v.reviewReply.comment) : '',
    }))
    .filter((v) => v.rating > 0)
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

/** Sized URL for a googleusercontent image ("=w800" style suffix). */
function sized(url, w) {
  if (!/googleusercontent\.com/.test(url)) return url;
  return url.replace(/=[^/]*$/, '') + `=w${w}`;
}

export async function fetchPhotos(env, token) {
  const base = `https://mybusiness.googleapis.com/v4/accounts/${env.GBP_ACCOUNT_ID}/locations/${env.GBP_LOCATION_ID}/media`;
  const all = [];
  let pageToken = '';
  for (let i = 0; i < 10; i++) {
    const r = await fetch(`${base}?pageSize=100${pageToken ? `&pageToken=${pageToken}` : ''}`,
      { headers: { authorization: `Bearer ${token}` } });
    if (!r.ok) throw new Error(`media ${r.status}`);
    const j = await r.json();
    all.push(...(j.mediaItems ?? []));
    if (!j.nextPageToken) break;
    pageToken = encodeURIComponent(j.nextPageToken);
  }
  return all
    .filter((m) => m.mediaFormat === 'PHOTO' && m.googleUrl)
    .filter((m) => !EXCLUDED_CATEGORIES.has(m.locationAssociation?.category))
    .filter((m) => !EXCLUDED_MEDIA.has(String(m.name || '').split('/').pop()))
    .map((m) => ({
      src: sized(m.googleUrl, 800),
      src2x: sized(m.googleUrl, 1200),
      w: m.dimensions?.widthPixels || 0,
      h: m.dimensions?.heightPixels || 0,
      description: (m.description || '').trim(),
      date: m.createTime,
    }))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

async function refresh(env) {
  const token = await accessToken(env);
  // Each half can fail on its own (e.g. a quota hiccup on media); keep what
  // succeeded rather than losing both.
  const [reviews, photos] = await Promise.all([
    fetchReviews(env, token).catch((e) => { console.error('reviews', e.message); return []; }),
    fetchPhotos(env, token).catch((e) => { console.error('photos', e.message); return []; }),
  ]);
  const body = JSON.stringify({ fetchedAt: Date.now(), reviews, photos });
  await caches.default.put(CACHE_KEY, new Response(body, {
    headers: { 'content-type': 'application/json', 'cache-control': `max-age=${FRESH_FOR * 4}` },
  }));
}

/**
 * Cached { reviews, photos }, or null. Never blocks a page on Google: a miss
 * or a stale entry triggers a background refresh and this request uses what
 * it has.
 */
export async function getProfile(env, ctx) {
  if (!reviewsConfigured(env)) return null;
  const hit = await caches.default.match(CACHE_KEY);
  if (!hit) {
    ctx.waitUntil(refresh(env).catch((e) => console.error('profile refresh failed', e.message)));
    return null;
  }
  const data = await hit.json();
  if (Date.now() - data.fetchedAt > FRESH_FOR * 1000) {
    ctx.waitUntil(refresh(env).catch((e) => console.error('profile refresh failed', e.message)));
  }
  return data;
}

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const star =
  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
  'stroke-linecap="round" stroke-linejoin="round" class="fill-current" aria-hidden="true">' +
  '<path d="m12 2 3 6.5 7 1-5 4.9 1.2 7L12 18l-6.2 3.4L7 14.4 2 9.5l7-1Z"/></svg>';

const month = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'America/New_York' }) : '';

function reviewCard(r, clamp = false) {
  return `
      <figure class="card p-6 flex flex-col">
        <div class="flex text-brass-400" role="img" aria-label="${r.rating} out of 5 stars">${star.repeat(r.rating)}</div>
        ${r.text
          ? `<blockquote class="mt-3 text-navy-800 leading-relaxed grow${clamp ? ' rv-clamp' : ''}">“${esc(r.text)}”</blockquote>`
          : `<p class="mt-3 text-muted grow">Left a ${r.rating}-star rating.</p>`}
        ${r.reply && !clamp ? `<p class="mt-4 pt-4 border-t border-line text-sm text-muted"><span class="font-bold text-navy-900">Reply from Nico &amp; Vito:</span> ${esc(r.reply)}</p>` : ''}
        <figcaption class="mt-4 pt-4 border-t border-line text-sm">
          <span class="font-bold text-navy-900">${esc(r.author)}</span>
          <span class="block text-muted">Google review · ${month(r.date)}</span>
        </figcaption>
      </figure>`;
}

// Below this many reviews a rolling strip looks empty, so it stays a grid.
const MARQUEE_MIN = 3;

/**
 * style "grid" (the /reviews/ page) or "marquee" (the homepage): a strip of
 * cards rolling sideways. The marquee repeats its cards once so the loop is
 * seamless; the copy is aria-hidden so screen readers hear each review once.
 * Its CSS (.rv-*) lives in src/styles/global.css.
 */
export function renderReviews(reviews, limit, style = 'grid') {
  const shown = reviews.slice(0, limit);
  const avg = Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
  const rating = `
    <p class="mt-3 flex items-center gap-2 text-muted">
      <span class="flex text-brass-400" aria-hidden="true">${star.repeat(5)}</span>
      <strong class="text-navy-900">${avg}</strong> out of 5 on Google
    </p>`;
  const more = reviews.length > shown.length || style === 'marquee'
    ? `<div class="mt-8"><a href="/reviews/" class="btn btn-outline">Read every review</a></div>` : '';

  if (style === 'marquee' && shown.length >= MARQUEE_MIN) {
    const items = shown.map((r) => `<li>${reviewCard(r, true)}</li>`).join('');
    const copy = shown.map((r) => `<li aria-hidden="true" inert>${reviewCard(r, true)}</li>`).join('');
    return `${rating}
    <div class="rv-marquee" style="--rv-dur:${shown.length * 9}s">
      <ul class="rv-track" aria-label="Google reviews">${items}${copy}</ul>
    </div>${more}`;
  }
  return `${rating}
    <div class="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">${shown.map((r) => reviewCard(r)).join('')}</div>${more}`;
}

export function renderPhotos(photos) {
  return photos.map((p) => {
    const alt = p.description || 'Photo from the Nico & Vito Locksmith Google Business Profile';
    const dims = p.w && p.h ? ` width="${p.w}" height="${p.h}"` : '';
    return `
      <li class="gallery-item">
        <img src="${esc(p.src)}" srcset="${esc(p.src)} 800w, ${esc(p.src2x)} 1200w"
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
          alt="${esc(alt)}"${dims} loading="lazy" decoding="async" referrerpolicy="no-referrer"
          class="w-full h-auto rounded-md bg-navy-900/5" />
        ${p.description ? `<p class="mt-2.5 text-[0.92rem] text-navy-800 leading-snug">${esc(p.description)}</p>` : ''}
      </li>`;
  }).join('');
}

/** Rewrites the live blocks on the page and reveals their sections. */
export function injectProfile(response, { reviews = [], photos = [] }) {
  const rw = new HTMLRewriter();
  if (reviews.length) {
    rw.on('[data-live-reviews]', {
      element(el) {
        const limit = Number(el.getAttribute('data-limit')) || 6;
        const style = el.getAttribute('data-style') || 'grid';
        el.setInnerContent(renderReviews(reviews, limit, style), { html: true });
      },
    }).on('[data-live-reviews-section]', {
      element(el) { el.removeAttribute('hidden'); },
    });
  }
  if (photos.length) {
    rw.on('[data-gbp-photos]', {
      element(el) { el.setInnerContent(renderPhotos(photos), { html: true }); },
    }).on('[data-gbp-photos-section]', {
      element(el) { el.removeAttribute('hidden'); },
    });
  }
  return rw.transform(response);
}
