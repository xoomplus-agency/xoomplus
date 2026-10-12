/**
 * Legacy alias for the Yoast index. Serves the same proxied XML as
 * /sitemap_index.xml on the current origin — never redirects off-host.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { fetchYoastSitemap, yoastSitemapResponse } from '../lib/yoast-sitemap';

export const GET: APIRoute = async () => {
	const result = await fetchYoastSitemap('sitemap_index.xml');
	return yoastSitemapResponse(result);
};
