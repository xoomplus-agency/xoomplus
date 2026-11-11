/**
 * Shared robots.txt body for Express (`server.js`) and Astro (`robots.txt.ts`).
 * Allow crawl of HTML pages/posts only; block bundles, media, and APIs.
 */
export function buildRobotsTxt(siteUrl, siteNoindex) {
	if (siteNoindex) {
		return 'User-agent: *\nDisallow: /\n';
	}

	const site = String(siteUrl || 'https://xoomplus.co.uk').replace(/\/+$/, '');

	return `User-agent: *
Allow: /

Allow: /sitemap_index.xml
Allow: /robots.txt

Sitemap: ${site}/sitemap_index.xml
`;
}
