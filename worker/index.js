/**
 * Worker entry point.
 *
 * The site is static — everything in dist/ is served by the ASSETS binding,
 * including _redirects and _headers. This script exists for one reason: the
 * contact form needs a server-side endpoint, and a Workers deployment has no
 * equivalent of the functions/ directory that Cloudflare Pages picks up
 * automatically.
 *
 * wrangler.jsonc sets `run_worker_first: true`, so every request reaches this
 * script before the asset router. Without that, the asset layer's
 * trailing-slash normalisation answers POST /api/contact with a 301 to
 * /api/contact/ — and a redirected POST is replayed as a GET with no body,
 * which is exactly how the endpoint appeared to "404" in production.
 */

import { handleContact } from './contact.js';
import { getProfile, injectProfile } from './gbp.js';

// Pages carrying live Google Business Profile blocks: reviews
// (src/components/Reviews.astro) and profile photos (/our-work/).
const PROFILE_PAGES = new Set(['/', '/reviews/', '/our-work/']);

const CANONICAL_HOST = 'nicovitolocksmith.com';

// Old URL shapes from listings and guesses. These were wildcard rules in
// _redirects, which land on a slashless URL that the asset router then
// redirects again; the single-segment rules meant to fix that never matched,
// because Cloudflare applies the wildcard first. Here the new prefix and the
// trailing slash go on in the same hop.
const LEGACY_PREFIXES = [
  ['/locations/', '/service-areas/'],
  ['/areas/', '/service-areas/'],
  ['/service-area/', '/service-areas/'],
  ['/neighborhoods/', '/service-areas/'],
  ['/service/', '/services/'],
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // One host, one copy of the site.
    //
    // www serves a complete duplicate of all 810 pages. Every one canonicals
    // to the apex, so Google correctly declines to index them — but it still
    // spends crawl budget fetching them, and on a domain this young that
    // budget is the thing standing between the site and being fully indexed.
    // Search Console confirmed the cost directly: www URLs appearing under
    // both "Alternate page with proper canonical tag" and "Crawled - currently
    // not indexed", crawled as recently as 2026-09-21 and indexed never.
    //
    // 301 rather than 302: this is permanent, and only a permanent redirect
    // consolidates signals onto the apex. Path and query are preserved, so a
    // visitor typing www. lands exactly where they meant to, one hop earlier.
    //
    // The host, a legacy prefix and the trailing slash every page URL ends in
    // (trailingSlash: 'always') are all fixed in one redirect, so
    // www.…/locations/bay-ridge is one hop, not three.
    // "/locations", "/locations/" and "/locations/bay-ridge" all match.
    const legacy = LEGACY_PREFIXES.find(([from]) => url.pathname.startsWith(from) || url.pathname === from.slice(0, -1));
    // http is included so http://…/bay-ridge is one hop too. That only takes
    // effect when Cloudflare's own "Always Use HTTPS" is off (it redirects at
    // the edge before this Worker runs, path untouched, and the slash then
    // costs a second hop).
    const insecure = url.protocol === 'http:';
    if (insecure || url.hostname === `www.${CANONICAL_HOST}` || legacy) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      if (legacy) url.pathname = legacy[1] + url.pathname.slice(legacy[0].length);
      if (!url.pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(url.pathname)) url.pathname += '/';
      return Response.redirect(url.toString(), 301);
    }

    const { pathname } = url;

    // Accept both spellings: the form posts to /api/contact, but anything
    // that has already been normalised should not fall through to assets.
    if (pathname === '/api/contact' || pathname === '/api/contact/') {
      return handleContact(request, env);
    }

    const response = await env.ASSETS.fetch(request);

    // Live Google reviews and profile photos, written into the HTML before it
    // leaves the edge so crawlers see them. Any failure leaves the static page
    // untouched.
    if (request.method === 'GET' && PROFILE_PAGES.has(pathname) && response.ok &&
        (response.headers.get('content-type') || '').includes('text/html')) {
      try {
        const profile = await getProfile(env, ctx);
        if (profile) return injectProfile(response, profile);
      } catch (e) {
        console.error('profile inject failed', e.message);
      }
    }
    return response;
  },
};
