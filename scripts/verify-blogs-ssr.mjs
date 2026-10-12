/** Verify /blogs SSR freshness vs live WordPress publish list. */
function strip(t) {
	return t.replace(/^\s*<style[\s\S]*?<\/style>\s*/gi, '');
}

const site = process.argv[2] || 'http://127.0.0.1:4321';
const api = (process.env.PUBLIC_WP_API || 'https://xoomplus.co.uk/wp-json/wp/v2').replace(
	/\/+$/,
	'',
);

const wpRes = await fetch(
	`${api}/posts?per_page=100&status=publish&orderby=date&order=desc&_fields=id,slug,status&_=${Date.now()}`,
	{ headers: { 'Cache-Control': 'no-cache' } },
);
const wpTotal = Number(wpRes.headers.get('X-WP-Total') || '0');
const wpPosts = JSON.parse(strip(await wpRes.text()));
const nonPublish = wpPosts.filter((p) => p.status !== 'publish');

const pageRes = await fetch(`${site.replace(/\/+$/, '')}/blogs/`, {
	headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
	redirect: 'follow',
});
const html = await pageRes.text();
const totalAttr = (html.match(/data-total="(\d+)"/) || [])[1];
const idxMatch = html.match(/id="blog-search-index"[^>]*>([\s\S]*?)<\/script>/);
let indexSlugs = [];
let isAstro = Boolean(idxMatch);
if (idxMatch) {
	try {
		const idx = JSON.parse(idxMatch[1]);
		indexSlugs = idx.map((x) => String(x.p || ''));
	} catch {
		/* ignore */
	}
}

console.log(
	JSON.stringify(
		{
			site,
			isAstroListing: isAstro,
			wpTotal,
			apiPageNonPublish: nonPublish.length,
			wpNewest: wpPosts.slice(0, 3).map((p) => ({ id: p.id, slug: p.slug, status: p.status })),
			blogsStatus: pageRes.status,
			cacheControl: pageRes.headers.get('cache-control'),
			cdnCacheControl: pageRes.headers.get('cdn-cache-control'),
			vercelCdn: pageRes.headers.get('vercel-cdn-cache-control'),
			cfCache: pageRes.headers.get('cf-cache-status'),
			server: pageRes.headers.get('server'),
			dataTotal: totalAttr,
			indexCount: indexSlugs.length,
			firstIndex: indexSlugs[0] || null,
			totalsMatch: String(wpTotal) === String(totalAttr) || indexSlugs.length === wpTotal,
			newestOnPage: indexSlugs[0]?.includes(wpPosts[0]?.slug) || false,
		},
		null,
		2,
	),
);
