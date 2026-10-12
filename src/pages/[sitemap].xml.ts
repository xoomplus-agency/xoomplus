/**
 * Yoast child sitemaps: /post-sitemap.xml, /page-sitemap.xml, /post-sitemap2.xml, …
 * Proxies WordPress and rewrites CMS-host <loc> → SITE_URL.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import {
	fetchYoastSitemap,
	isYoastSitemapFile,
	yoastSitemapResponse,
} from '../lib/yoast-sitemap';

export const GET: APIRoute = async ({ params }) => {
	const base = (params.sitemap || '').trim();
	const fileName = `${base}.xml`;
	if (!isYoastSitemapFile(fileName) || /^sitemap_index\.xml$/i.test(fileName)) {
		// Index has its own route; reject unrelated *.xml noise.
		return new Response('Not found', { status: 404 });
	}
	const result = await fetchYoastSitemap(fileName);
	return yoastSitemapResponse(result);
};
