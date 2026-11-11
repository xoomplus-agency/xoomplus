/**
 * Shared flags for Express (`server.js`) and Astro (`src/config.ts`).
 * Change here so robots.txt updates without waiting on CDN-cached SSR shells.
 * `false` = live / indexable (Allow + Sitemap in robots.txt; no site-wide noindex).
 */
export const SITE_NOINDEX = false;
