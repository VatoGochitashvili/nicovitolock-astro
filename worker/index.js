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

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    // Accept both spellings: the form posts to /api/contact, but anything
    // that has already been normalised should not fall through to assets.
    if (pathname === '/api/contact' || pathname === '/api/contact/') {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
