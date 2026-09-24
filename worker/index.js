/**
 * Worker entry point.
 *
 * The site is static — everything in dist/ is served by the ASSETS binding,
 * including _redirects and _headers. This script exists for one reason: the
 * contact form needs a server-side endpoint, and a Workers deployment has no
 * equivalent of the functions/ directory that Cloudflare Pages picks up
 * automatically.
 *
 * wrangler.jsonc sets `run_worker_first: ["/api/*"]`, so requests to /api/
 * reach this script before the asset router. Without that, the asset layer's
 * trailing-slash normalisation answers POST /api/contact with a 301 to
 * /api/contact/ — and a redirected POST is replayed as a GET with no body,
 * which is exactly how the endpoint appeared to "404" in production.
 */

import { handleContact } from './contact.js';

const CANONICAL_HOST = 'nicovitolocksmith.com';

export default {
  async fetch(request, env) {
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
      return Response.redirect(url.toString(), 301);
    }

    const { pathname } = url;

    // Accept both spellings: the form posts to /api/contact, but anything
    // that has already been normalised should not fall through to assets.
    if (pathname === '/api/contact' || pathname === '/api/contact/') {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
