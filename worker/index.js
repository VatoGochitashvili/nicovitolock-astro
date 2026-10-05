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
    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      // Every page URL ends in a slash (trailingSlash: 'always'). Adding it here
      // makes www/about one hop to /about/ instead of two.
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
