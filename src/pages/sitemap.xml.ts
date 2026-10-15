/**
 * Legacy alias for the sitemap index (same XML as /sitemap_index.xml).
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
