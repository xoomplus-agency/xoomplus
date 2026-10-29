/**
 * Build one static combined sitemap → public/sitemap_index.xml
 * (all Astro pages + published WP posts in a single <urlset>).
 *
 *   npx tsx scripts/generate-combined-sitemap.mjs
 *   (also runs from prebuild)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pub = path.join(root, 'public');

Object.assign(process.env, loadEnv('production', root, ''));

const {
	buildCombinedSitemapEntries,
	renderUrlSet,
} = await import('../src/lib/wp-sitemap.ts');

const combined = await buildCombinedSitemapEntries();
const xml = renderUrlSet(combined);

fs.mkdirSync(pub, { recursive: true });
fs.writeFileSync(path.join(pub, 'sitemap_index.xml'), xml);

const embed = `/**
 * Auto-generated — single static sitemap for /sitemap_index.xml
 * Re-run: npx tsx scripts/generate-combined-sitemap.mjs
 */
export const SITEMAP_INDEX_XML = ${JSON.stringify(xml)};
`;
fs.writeFileSync(path.join(root, 'sitemap-xml-content.js'), embed);

fs.writeFileSync(
	path.join(pub, 'SITEMAP-EDIT.txt'),
	`STATIC COMBINED SITEMAP
=======================

File: public/sitemap_index.xml  (copied to dist/client/ on build)
URL:  https://xoomplus.co.uk/sitemap_index.xml

Contains ALL blog posts + marketing pages in one <urlset>.

Refresh from WordPress + Astro routes:

  npm run sitemap:static

Then rebuild / redeploy. Purge Cloudflare for /sitemap_index.xml after deploy.
`,
);

console.log(
	`[combined-sitemap] wrote public/sitemap_index.xml total=${combined.length}`,
);
