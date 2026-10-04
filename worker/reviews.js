/**
 * Live Google reviews, injected into the static pages at the edge.
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

const CACHE_KEY = 'https://nicovitolocksmith.com/__cache/google-reviews-v1';
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

export async function fetchReviews(env) {
  const token = await accessToken(env);
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

async function refresh(env) {
  const reviews = await fetchReviews(env);
  const body = JSON.stringify({ fetchedAt: Date.now(), reviews });
  await caches.default.put(CACHE_KEY, new Response(body, {
    headers: { 'content-type': 'application/json', 'cache-control': `max-age=${FRESH_FOR * 4}` },
  }));
  return reviews;
}

/**
 * Cached reviews, or null. Never blocks a page on Google: a miss or a stale
 * entry triggers a background refresh and this request uses what it has.
 */
export async function getReviews(env, ctx) {
  if (!reviewsConfigured(env)) return null;
  const hit = await caches.default.match(CACHE_KEY);
  if (!hit) {
    ctx.waitUntil(refresh(env).catch((e) => console.error('reviews refresh failed', e.message)));
    return null;
  }
  const data = await hit.json();
  if (Date.now() - data.fetchedAt > FRESH_FOR * 1000) {
    ctx.waitUntil(refresh(env).catch((e) => console.error('reviews refresh failed', e.message)));
  }
  return data.reviews;
}

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const star =
  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
  'stroke-linecap="round" stroke-linejoin="round" class="fill-current" aria-hidden="true">' +
  '<path d="m12 2 3 6.5 7 1-5 4.9 1.2 7L12 18l-6.2 3.4L7 14.4 2 9.5l7-1Z"/></svg>';

const month = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'America/New_York' }) : '';

export function renderReviews(reviews, limit) {
  const shown = reviews.slice(0, limit);
  const avg = Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
  const cards = shown.map((r) => `
      <figure class="card p-6 flex flex-col">
        <div class="flex text-brass-400" role="img" aria-label="${r.rating} out of 5 stars">${star.repeat(r.rating)}</div>
        ${r.text
          ? `<blockquote class="mt-3 text-navy-800 leading-relaxed grow">“${esc(r.text)}”</blockquote>`
          : `<p class="mt-3 text-muted grow">Left a ${r.rating}-star rating.</p>`}
        ${r.reply ? `<p class="mt-4 pt-4 border-t border-line text-sm text-muted"><span class="font-bold text-navy-900">Reply from Nico &amp; Vito:</span> ${esc(r.reply)}</p>` : ''}
        <figcaption class="mt-4 pt-4 border-t border-line text-sm">
          <span class="font-bold text-navy-900">${esc(r.author)}</span>
          <span class="block text-muted">Google review · ${month(r.date)}</span>
        </figcaption>
      </figure>`).join('');
  const more = reviews.length > shown.length
    ? `<div class="mt-8"><a href="/reviews/" class="btn btn-outline">Read every review</a></div>` : '';
  return `
    <p class="mt-3 flex items-center gap-2 text-muted">
      <span class="flex text-brass-400" aria-hidden="true">${star.repeat(5)}</span>
      <strong class="text-navy-900">${avg}</strong> out of 5 on Google
    </p>
    <div class="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">${cards}</div>${more}`;
}

/** Rewrites every [data-live-reviews] block on the page, and reveals it. */
export function injectReviews(response, reviews) {
  return new HTMLRewriter()
    .on('[data-live-reviews]', {
      element(el) {
        const limit = Number(el.getAttribute('data-limit')) || 6;
        el.setInnerContent(renderReviews(reviews, limit), { html: true });
      },
    })
    .on('[data-live-reviews-section]', {
      element(el) { el.removeAttribute('hidden'); },
    })
    .transform(response);
}
