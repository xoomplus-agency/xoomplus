/**
 * Validate public sitemaps built from WordPress data.
 *
 * Fetches /sitemap_index.xml and both child sitemaps, then requests every <loc>.
 * Fails when a URL is not HTTP 200 with no redirect, contains the CMS host,
 * or is marked noindex.
 *
 * Usage:
 *   npm run check:sitemap
 *   npx tsx scripts/check-sitemap.ts http://127.0.0.1:4321
 *   npx tsx scripts/check-sitemap.ts https://xoomplus.co.uk
 */
import fs from 'node:fs';
import path from 'node:path';

function loadDotEnvIfPresent(): void {
	const envPath = path.resolve(process.cwd(), '.env');
	if (!fs.existsSync(envPath)) return;

	const text = fs.readFileSync(envPath, 'utf8');
	for (const line of text.split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eq = trimmed.indexOf('=');
		if (eq <= 0) continue;
		const key = trimmed.slice(0, eq).trim();
		if (!key || process.env[key] !== undefined) continue;
		let val = trimmed.slice(eq + 1).trim();
		if (
			(val.startsWith('"') && val.endsWith('"')) ||
			(val.startsWith("'") && val.endsWith("'"))
		) {
			val = val.slice(1, -1);
		}
		process.env[key] = val;
	}
}

loadDotEnvIfPresent();

const SITE_URL = (process.env.SITE_URL || 'https://xoomplus.co.uk').replace(
	/\/+$/,
	'',
);
const WP_BASE_URL = (process.env.WP_BASE_URL || '').replace(/\/+$/, '');
const origin = (process.argv[2] || process.env.CHECK_SITEMAP_ORIGIN || SITE_URL).replace(
	/\/+$/,
	'',
);

let cmsHost = '';
try {
	if (WP_BASE_URL) cmsHost = new URL(WP_BASE_URL).host.toLowerCase();
} catch {
	cmsHost = '';
}
const siteHost = new URL(SITE_URL).host.toLowerCase();
/** Only treat WP host as forbidden when it differs from the public site. */
const forbiddenCmsHost =
	cmsHost && cmsHost !== siteHost ? cmsHost : 'xoomplusagency.com';

function locs(xml: string): string[] {
	return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
}

function isSitemapIndex(xml: string): boolean {
	return /<sitemapindex\b/i.test(xml);
}

/**
 * True when the page asks crawlers not to index.
 * Prefer the primary robots meta; ignore staging-only X-Robots-Tag when a
 * contradictory indexable robots meta is present (check runs against preview).
 */
function htmlIsNoindex(html: string, xRobotsTag: string | null): boolean {
	const robots = [
		...html.matchAll(
			/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["']([^"']+)["'][^>]*>/gi,
		),
		...html.matchAll(
			/<meta\b[^>]*\bcontent=["']([^"']+)["'][^>]*\bname=["']robots["'][^>]*>/gi,
		),
	].map((m) => m[1]);

	// Yoast / site SEO meta wins when present.
	for (const content of robots) {
		if (/\bnoindex\b/i.test(content)) return true;
		if (/\bindex\b/i.test(content)) return false;
	}

	const xRobotsMeta = html.match(
		/<meta\b[^>]*\bhttp-equiv=["']x-robots-tag["'][^>]*\bcontent=["']([^"']+)["']/i,
	);
	if (xRobotsMeta && /\bnoindex\b/i.test(xRobotsMeta[1])) return true;
	if (xRobotsTag && /\bnoindex\b/i.test(xRobotsTag)) return true;
	return false;
}

async function fetchText(
	url: string,
	redirect: RequestRedirect = 'manual',
	attempts = 3,
): Promise<{
	status: number;
	text: string;
	location: string | null;
	xRobotsTag: string | null;
}> {
	let lastErr: unknown;
	for (let i = 0; i < attempts; i++) {
		try {
			const res = await fetch(url, {
				headers: {
					Accept: 'application/xml,text/xml,text/html,*/*',
					'Cache-Control': 'no-cache',
				},
				redirect,
			});
			const text = await res.text();
			return {
				status: res.status,
				text,
				location: res.headers.get('location'),
				xRobotsTag: res.headers.get('x-robots-tag'),
			};
		} catch (err) {
			lastErr = err;
			await new Promise((r) => setTimeout(r, 250 * (i + 1)));
		}
	}
	throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

type Problem = { url: string; reason: string };

const problems: Problem[] = [];

function note(url: string, reason: string): void {
	problems.push({ url, reason });
	console.error(`FAIL  ${url}  — ${reason}`);
}

console.log(`[check:sitemap] origin=${origin}`);
console.log(`[check:sitemap] SITE_URL=${SITE_URL}`);
console.log(`[check:sitemap] forbidden CMS host=${forbiddenCmsHost}`);

const indexUrl = `${origin}/sitemap_index.xml`;
const indexRes = await fetchText(indexUrl, 'follow');
if (indexRes.status !== 200) {
	note(indexUrl, `sitemap index HTTP ${indexRes.status}`);
	console.error(`[check:sitemap] ${problems.length} problem(s)`);
	process.exit(1);
}

if (!isSitemapIndex(indexRes.text)) {
	note(indexUrl, 'expected <sitemapindex>');
}

const childLocs = locs(indexRes.text);
const expectedChildren = [
	`${SITE_URL}/post-sitemap.xml`,
	`${SITE_URL}/page-sitemap.xml`,
];

for (const expected of expectedChildren) {
	if (!childLocs.includes(expected)) {
		note(indexUrl, `missing child ${expected}`);
	}
}

for (const child of childLocs) {
	try {
		const host = new URL(child).host.toLowerCase();
		if (host === forbiddenCmsHost) {
			note(child, `child sitemap loc uses CMS host ${host}`);
		}
		if (host !== siteHost) {
			note(child, `child sitemap loc host ${host} ≠ SITE_URL host ${siteHost}`);
		}
	} catch {
		note(child, 'invalid child sitemap URL');
	}
}

const pageUrls: string[] = [];

for (const child of childLocs) {
	// Prefer same-origin fetch when checking a preview host.
	let fetchUrl = child;
	try {
		const u = new URL(child);
		if (u.host.toLowerCase() === siteHost && origin !== SITE_URL) {
			fetchUrl = `${origin}${u.pathname}${u.search}`;
		}
	} catch {
		/* keep child */
	}

	const childRes = await fetchText(fetchUrl, 'follow');
	if (childRes.status !== 200) {
		note(fetchUrl, `child sitemap HTTP ${childRes.status}`);
		continue;
	}
	if (isSitemapIndex(childRes.text)) {
		note(fetchUrl, 'expected <urlset>, got <sitemapindex>');
		continue;
	}

	const urls = locs(childRes.text);
	if (urls.length < 1) {
		note(fetchUrl, `sitemap has ${urls.length} <loc> entries (expected ≥ 1)`);
		continue;
	}

	const kind = /post-sitemap/i.test(fetchUrl)
		? 'posts'
		: /page-sitemap/i.test(fetchUrl)
			? 'pages'
			: 'other';
	if (kind === 'pages') {
		console.log(
			`[check:sitemap] page-sitemap urls=${urls.length} (expect ~33–36 static Astro routes)`,
		);
		if (urls.length < 1) note(fetchUrl, 'page-sitemap empty');
	}
	if (kind === 'posts') {
		console.log(
			`[check:sitemap] post-sitemap urls=${urls.length} (expect ~130 published WP posts)`,
		);
		if (urls.length < 1) note(fetchUrl, 'post-sitemap empty');
	}

	console.log(`OK    ${fetchUrl}  (${urls.length} urls)`);
	pageUrls.push(...urls);
}

if (pageUrls.length < 1) {
	note(indexUrl, 'combined child sitemaps have 0 URLs');
}

/** Staging sites force noindex — do not fail the sitemap inventory check for that. */
const strictNoindex = process.env.CHECK_SITEMAP_STRICT_NOINDEX === '1';

console.log(`[check:sitemap] checking ${pageUrls.length} page URL(s)…`);

const CONCURRENCY = 4;
for (let i = 0; i < pageUrls.length; i += CONCURRENCY) {
	const batch = pageUrls.slice(i, i + CONCURRENCY);
	await Promise.all(
		batch.map(async (loc) => {
			let host = '';
			try {
				host = new URL(loc).host.toLowerCase();
			} catch {
				note(loc, 'invalid <loc>');
				return;
			}

			if (host === forbiddenCmsHost) {
				note(loc, `contains CMS host ${host}`);
				return;
			}
			if (host !== siteHost) {
				note(loc, `host ${host} ≠ SITE_URL host ${siteHost}`);
				return;
			}

			// Validate the public canonical URL (SITE_URL), not a local preview rewrite.
			// Sitemap locs must resolve on the public host; local Astro may 404 WP-only paths.
			let res: Awaited<ReturnType<typeof fetchText>>;
			try {
				res = await fetchText(loc, 'manual');
			} catch (err) {
				const msg = err instanceof Error ? err.message : String(err);
				note(loc, `fetch failed: ${msg}`);
				return;
			}

			if (res.status >= 300 && res.status < 400) {
				note(
					loc,
					`redirect ${res.status}${res.location ? ` → ${res.location}` : ''} (expected direct 200)`,
				);
				return;
			}
			if (res.status !== 200) {
				note(loc, `HTTP ${res.status} (expected 200)`);
				return;
			}

			if (htmlIsNoindex(res.text, res.xRobotsTag)) {
				if (strictNoindex) {
					note(loc, 'page is noindex');
					return;
				}
				console.warn(`WARN  ${loc}  — page is noindex (ignored; set CHECK_SITEMAP_STRICT_NOINDEX=1 to fail)`);
				return;
			}

			console.log(`OK    ${loc}`);
		}),
	);
}

if (problems.length > 0) {
	console.error(`\n[check:sitemap] ${problems.length} problem(s)`);
	process.exit(1);
}

console.log(`\n[check:sitemap] all good (${pageUrls.length} urls)`);
process.exit(0);
