/**
 * Public sitemap index at /sitemap_index.xml.
 * Lists page-sitemap.xml and post-sitemap.xml with newest lastmod each.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import {
	buildSitemapIndexChildren,
	renderSitemapIndex,
	sitemapXmlResponse,
} from '../lib/wp-sitemap';
import { getSiteUrl } from '../lib/wp-seo';

export const GET: APIRoute = async () => {
	const siteUrl = getSiteUrl();
	if (!siteUrl) {
		console.error('[sitemap_index] SITE_URL missing');
		return sitemapXmlResponse(
			`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</sitemapindex>
`,
			503,
		);
	}

	const children = await buildSitemapIndexChildren();
	return sitemapXmlResponse(renderSitemapIndex(siteUrl, children));
};
