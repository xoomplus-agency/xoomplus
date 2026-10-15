/**
 * Page sitemap: homepage, /blogs/, and mapped WordPress pages only.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import {
	buildPageSitemapEntries,
	renderUrlSet,
	sitemapXmlResponse,
} from '../lib/wp-sitemap';

export const GET: APIRoute = async () => {
	const entries = await buildPageSitemapEntries();
	return sitemapXmlResponse(renderUrlSet(entries));
};
