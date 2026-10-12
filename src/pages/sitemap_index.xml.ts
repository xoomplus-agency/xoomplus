/**
 * Public Yoast sitemap index at /sitemap_index.xml.
 * Proxies WordPress Yoast XML and rewrites CMS-host <loc> → SITE_URL.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { fetchYoastSitemap, yoastSitemapResponse } from '../lib/yoast-sitemap';

export const GET: APIRoute = async () => {
	const result = await fetchYoastSitemap('sitemap_index.xml');
	return yoastSitemapResponse(result);
};
