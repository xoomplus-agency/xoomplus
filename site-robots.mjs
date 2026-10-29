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

# Build / API / static assets — not pages or posts
Disallow: /_astro/
Disallow: /api/
Disallow: /images/
Disallow: /videos/
Disallow: /fonts/
Disallow: /icons/
Disallow: /*.js$
Disallow: /*.mjs$
Disallow: /*.css$
Disallow: /*.map$
Disallow: /*.json$
Disallow: /*.woff$
Disallow: /*.woff2$
Disallow: /*.ttf$
Disallow: /*.eot$
Disallow: /*.webp$
Disallow: /*.avif$
Disallow: /*.png$
Disallow: /*.jpg$
Disallow: /*.jpeg$
Disallow: /*.gif$
Disallow: /*.svg$
Disallow: /*.ico$
Disallow: /*.mp4$
Disallow: /*.webm$
Disallow: /*.mp3$

Allow: /sitemap_index.xml
Allow: /robots.txt

Sitemap: ${site}/sitemap_index.xml
`;
}
