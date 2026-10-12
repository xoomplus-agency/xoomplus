/**
 * Compare generated frontend routes with current WordPress CMS slugs.
 * Reports: page key, WP id, CMS slug, generated Astro route, HTTP status, SEO title.
 * Exit 1 on mismatch or fetch failure.
 *
 * Usage: npm run check:wp-routes
 * Loads `.env` only when the file exists (local). On Vercel, use project env vars.
 */
import fs from 'node:fs';
import path from 'node:path';
import {
	WP_SEO_PAGES,
	fetchWpPageById,
	getAllWpPageRoutes,
	getWpBaseUrl,
	normalizePage,
	normalizeSeoPath,
	pathsMatch,
	getSiteUrl,
	type WpPageKey,
} from '../src/lib/wp-seo';

/** Load local `.env` into process.env when present; never override existing vars (Vercel). */
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

const wpBase = getWpBaseUrl();
const siteUrl = getSiteUrl();

if (!wpBase || !siteUrl) {
	const missing = [
		!wpBase ? 'WP_BASE_URL' : null,
		!siteUrl ? 'SITE_URL' : null,
	].filter(Boolean);
	console.error(
		`[check:wp-routes] Missing required environment variable(s): ${missing.join(', ')}.`,
	);
	console.error(
		'Set them in the Vercel project Environment Variables (Production/Preview), or in a local .env file.',
	);
	console.error(
		`WP_BASE_URL=${wpBase ? '(set)' : '(missing)'}  SITE_URL=${siteUrl ? '(set)' : '(missing)'}`,
	);
	process.exit(1);
}

let failed = false;

console.log('\nkey\tid\tCMS slug\tAstro route\tHTTP\tSEO title\tstatus');
console.log('---\t--\t--------\t-----------\t----\t---------\t------');

const generated = await getAllWpPageRoutes();
const byId = new Map(generated.map((r) => [r.id, r]));

for (const [key, { id }] of Object.entries(WP_SEO_PAGES) as [WpPageKey, { id: number }][]) {
	const { status, raw } = await fetchWpPageById(id, undefined, wpBase);
	const gen = byId.get(id);

	if (status !== 200 || !raw?.slug) {
		failed = true;
		console.log(
			`${key}\t${id}\t—\t${gen?.route ?? '—'}\t${status || 'ERR'}\t—\tFAIL (fetch)`,
		);
		continue;
	}

	const cmsSlug = raw.slug;
	let cmsPath = '—';
	try {
		cmsPath = raw.link ? new URL(raw.link).pathname : `/${cmsSlug}/`;
	} catch {
		cmsPath = `/${cmsSlug}/`;
	}

	const expectedRoute = key === 'home' ? '/' : normalizeSeoPath(`/${cmsSlug}`);
	const generatedRoute = gen?.route ?? '—';
	const match =
		gen != null &&
		gen.slug === cmsSlug &&
		pathsMatch(generatedRoute, expectedRoute) &&
		pathsMatch(cmsPath, expectedRoute);

	if (!match) failed = true;

	const seo = normalizePage(raw, wpBase, siteUrl, expectedRoute);
	const titlePreview = (seo.seoTitle ?? '—').slice(0, 48);

	console.log(
		`${key}\t${id}\t${cmsSlug}\t${generatedRoute}\t${status}\t${titlePreview}\t${match ? 'ok' : 'MISMATCH'}`,
	);
}

if (generated.length !== Object.keys(WP_SEO_PAGES).length) {
	failed = true;
	console.error(
		`\nGenerated ${generated.length} routes but WP_SEO_PAGES has ${Object.keys(WP_SEO_PAGES).length} entries.`,
	);
}

const caseStudies = byId.get(WP_SEO_PAGES.caseStudies.id);
if (!caseStudies) {
	failed = true;
	console.error(`\nMissing route for caseStudies id ${WP_SEO_PAGES.caseStudies.id}`);
} else {
	console.log(
		`\n✓ id ${WP_SEO_PAGES.caseStudies.id} (caseStudies) slug="${caseStudies.slug}" → ${caseStudies.route}`,
	);
	if (caseStudies.slug === 'case-studies' && caseStudies.route !== '/case-studies') {
		failed = true;
		console.error('id 1037 slug is case-studies but Astro route is not /case-studies');
	}
}

const services = byId.get(WP_SEO_PAGES.services.id);
if (!services) {
	failed = true;
	console.error(`\nMissing route for services id ${WP_SEO_PAGES.services.id}`);
} else {
	console.log(
		`✓ id ${WP_SEO_PAGES.services.id} (services) slug="${services.slug}" → ${services.route}`,
	);
}

if (failed) {
	console.error('\ncheck:wp-routes failed.');
	process.exit(1);
}

console.log('\ncheck:wp-routes passed — generated Astro routes match current WordPress slugs.');
