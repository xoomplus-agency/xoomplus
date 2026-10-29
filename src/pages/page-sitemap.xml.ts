/**
 * Legacy path — same combined pages+posts urlset as /sitemap_index.xml.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import {
	buildCombinedSitemapEntries,
	renderUrlSet,
	sitemapUnavailableResponse,
	sitemapXmlResponse,
} from '../lib/wp-sitemap';

export const GET: APIRoute = async () => {
	try {
		const entries = await buildCombinedSitemapEntries();
		return sitemapXmlResponse(renderUrlSet(entries));
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return sitemapUnavailableResponse(msg);
	}
};
