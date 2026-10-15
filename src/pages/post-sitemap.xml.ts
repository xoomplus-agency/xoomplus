/**
 * Post sitemap: published posts at public /%category%/%postname%/ URLs.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import {
	buildPostSitemapEntries,
	renderUrlSet,
	sitemapXmlResponse,
} from '../lib/wp-sitemap';

export const GET: APIRoute = async () => {
	const entries = await buildPostSitemapEntries();
	return sitemapXmlResponse(renderUrlSet(entries));
};
