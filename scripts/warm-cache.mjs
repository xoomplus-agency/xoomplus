/**
 * Warm Vercel ISR / CDN HTML after deploy by requesting every URL from the sitemap.
 *
 * Usage:
 *   SITE_URL=https://www.example.com node scripts/warm-cache.mjs
 *   node scripts/warm-cache.mjs https://www.example.com
 *
 * Optional: SITEMAP_URL, CONCURRENCY (default 6)
 */
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const argOrigin = process.argv[2]?.replace(/\/+$/, '');
const origin = (
	argOrigin ||
	process.env.SITE_URL ||
	env.SITE_URL ||
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: '') ||
	(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')
).replace(/\/+$/, '');

const sitemapUrl =
	process.env.SITEMAP_URL ||
	(origin ? `${origin}/sitemap_index.xml` : '') ||
	(origin ? `${origin}/sitemap.xml` : '');

const concurrency = Math.max(1, Number(process.env.CONCURRENCY || 6) || 6);

if (!origin || !sitemapUrl) {
	console.error(
		'[warm-cache] Set SITE_URL (or pass origin as argv[2]). Example: SITE_URL=https://xoomplus.com npm run warm:cache',
	);
	process.exit(1);
}

async function fetchText(url) {
	const res = await fetch(url, {
		headers: { Accept: 'application/xml,text/xml,*/*' },
		signal: AbortSignal.timeout(30_000),
	});
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	return res.text();
}

function extractLocs(xml) {
	const locs = [];
	const re = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
	let m;
	while ((m = re.exec(xml))) {
		locs.push(m[1].trim());
	}
	return locs;
}

async function collectUrls(entryUrl, depth = 0) {
	if (depth > 3) return [];
	const xml = await fetchText(entryUrl);
	const locs = extractLocs(xml);
	const isIndex =
		/sitemapindex/i.test(xml) || locs.some((u) => /\.xml(\?|$)/i.test(u));
	if (!isIndex) return locs;

	const nested = [];
	for (const loc of locs) {
		try {
			nested.push(...(await collectUrls(loc, depth + 1)));
		} catch (err) {
			console.warn(`[warm-cache] skip sitemap ${loc}:`, err.message || err);
		}
	}
	return nested;
}

async function warm(url) {
	const started = Date.now();
	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: { Accept: 'text/html,*/*', 'User-Agent': 'xoomplus-warm-cache/1.0' },
			redirect: 'follow',
			signal: AbortSignal.timeout(60_000),
		});
		const ms = Date.now() - started;
		const cache =
			res.headers.get('x-vercel-cache') ||
			res.headers.get('cf-cache-status') ||
			'-';
		return { url, ok: res.ok, status: res.status, ms, cache };
	} catch (err) {
		return {
			url,
			ok: false,
			status: 0,
			ms: Date.now() - started,
			cache: '-',
			error: err instanceof Error ? err.message : String(err),
		};
	}
}

async function pool(items, size, worker) {
	const results = [];
	let i = 0;
	async function run() {
		while (i < items.length) {
			const idx = i++;
			results[idx] = await worker(items[idx]);
		}
	}
	await Promise.all(Array.from({ length: Math.min(size, items.length) }, () => run()));
	return results;
}

const startedAll = Date.now();
console.log(`[warm-cache] origin=${origin}`);
console.log(`[warm-cache] sitemap=${sitemapUrl}`);

let urls;
try {
	urls = await collectUrls(sitemapUrl);
} catch (err) {
	console.error('[warm-cache] failed to read sitemap:', err.message || err);
	process.exit(1);
}

const htmlUrls = [
	...new Set(
		urls
			.map((u) => u.trim())
			.filter((u) => u.startsWith('http'))
			.filter((u) => !/\.(xml|xsl|txt|json)(\?|$)/i.test(u)),
	),
];

// Always include core nav paths even if sitemap is thin
for (const path of [
	'/',
	'/about',
	'/services',
	'/industries',
	'/projects',
	'/contact',
	'/blogs',
]) {
	htmlUrls.push(`${origin}${path}`);
}

const unique = [...new Set(htmlUrls)];
console.log(`[warm-cache] warming ${unique.length} URLs (concurrency=${concurrency})`);

const results = await pool(unique, concurrency, warm);
const ok = results.filter((r) => r.ok).length;
const fail = results.length - ok;

for (const r of results) {
	const mark = r.ok ? 'OK ' : 'ERR';
	console.log(
		`  ${mark} ${r.status || '---'} ${(r.ms + 'ms').padStart(6)} cache=${r.cache} ${r.url}${r.error ? ` (${r.error})` : ''}`,
	);
}

console.log(
	`[warm-cache] done in ${Date.now() - startedAll}ms — ${ok} ok, ${fail} failed`,
);
process.exit(fail > 0 ? 1 : 0);
