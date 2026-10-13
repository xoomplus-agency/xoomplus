/**
 * Same-origin proxy for Yoast’s main-sitemap.xsl.
 * Referenced by rewritten xml-stylesheet hrefs on proxied sitemap XML.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import {
	fetchYoastSitemapStylesheet,
	yoastSitemapResponse,
} from '../lib/yoast-sitemap';

export const GET: APIRoute = async () => {
	const result = await fetchYoastSitemapStylesheet();
	return yoastSitemapResponse(result);
};
