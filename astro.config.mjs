// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://nicovitolocksmith.com',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const p = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        let priority = 0.6;
        let changefreq = 'monthly';
        if (p === '/') {
          priority = 1.0;
          changefreq = 'weekly';
        } else if (p === '/services') {
          priority = 0.9;
          changefreq = 'weekly';
        } else if (/^\/services\/[^/]+$/.test(p)) {
          priority = 0.9;
        } else if (/^\/services\/[^/]+\/[^/]+$/.test(p)) {
          priority = 0.55;
        } else if (p === '/service-areas') {
          priority = 0.85;
        } else if (/^\/service-areas\/[^/]+$/.test(p)) {
          priority = 0.65;
        } else if (p === '/contact' || p === '/about') {
          priority = 0.8;
        } else if (p === '/reviews' || p === '/faq' || p === '/pricing') {
          priority = 0.7;
        }
        item.priority = priority;
        // `changefreq` is a TS enum in the sitemap package; these string
        // values are its members, so the cast is exact, not a workaround.
        item.changefreq = /** @type {import('sitemap').EnumChangefreq} */ (changefreq);
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    // Cast: @tailwindcss/vite resolves its own Vite copy, so its Plugin type
    // is structurally identical but nominally different from Astro's.
    plugins: [/** @type {any} */ (tailwindcss())],
    resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  },
});
