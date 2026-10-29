/**
 * Legacy alias — same combined urlset as /sitemap_index.xml.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import {
	buildCombinedSitemapEntries,
	renderUrlSet,
	sitemapUnavailableResponse,
	sitemapXmlResponse,
} from '../lib/wp-sitemap';
import { getSiteUrl } from '../lib/wp-seo';

export const GET: APIRoute = async () => {
	const siteUrl = getSiteUrl();
	if (!siteUrl) {
		return sitemapUnavailableResponse('SITE_URL missing');
	}

	try {
		const entries = await buildCombinedSitemapEntries();
		return sitemapXmlResponse(renderUrlSet(entries));
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return sitemapUnavailableResponse(msg);
	}
};
