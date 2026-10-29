/**
 * cPanel Setup Node.js App entry (Passenger) — no Docker.
 * Startup file: server.js
 * After FTP: in cPanel Node app run `npm install --omit=dev`, then Restart.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';
import { SITE_NOINDEX } from './site-flags.mjs';
import { buildRobotsTxt } from './site-robots.mjs';
import { SITEMAP_INDEX_XML } from './sitemap-xml-content.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.join(__dirname, 'dist', 'client');

const app = express();

/** Keep in sync with src/lib/security-headers.ts and vercel.json */
const SECURITY_HEADERS = {
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
	'Content-Security-Policy':
		"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://xoomplus.co.uk https://www.xoomplus.co.uk https://xoomplusagency.com https://www.xoomplusagency.com https://cms.xoomplus.co.uk https://*.googleapis.com https://*.gstatic.com https://*.google.com; font-src 'self' data:; frame-src https://www.google.com https://maps.google.com; connect-src 'self' https://xoomplus.co.uk https://www.xoomplus.co.uk https://xoomplusagency.com https://www.xoomplusagency.com https://cms.xoomplus.co.uk; object-src 'none'; base-uri 'self'; form-action 'self' https://xoomplus.co.uk https://www.xoomplus.co.uk https://xoomplusagency.com https://www.xoomplusagency.com https://cms.xoomplus.co.uk; frame-ancestors 'self'; upgrade-insecure-requests",
	'X-Frame-Options': 'SAMEORIGIN',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy':
		'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
};

app.use((_req, res, next) => {
	for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
		res.setHeader(key, value);
	}
	next();
});

/** Force CDN/browser to skip caching — CF was pinning robots/sitemaps for a year. */
function setNeverCache(res) {
	res.setHeader(
		'Cache-Control',
		'private, no-store, no-cache, must-revalidate, max-age=0, s-maxage=0',
	);
	res.setHeader('CDN-Cache-Control', 'no-store');
	res.setHeader('Cloudflare-CDN-Cache-Control', 'no-store');
	res.setHeader('Surrogate-Control', 'no-store');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	res.removeHeader?.('ETag');
	res.removeHeader?.('Last-Modified');
}

/**
 * robots.txt + sitemaps — Express owns these so deploys apply immediately
 * (not stuck behind a Cloudflare HIT of an old Astro/static response).
 */
app.get('/robots.txt', (_req, res) => {
	setNeverCache(res);
	res.setHeader('Content-Type', 'text/plain; charset=utf-8');
	const site = process.env.SITE_URL || 'https://xoomplus.co.uk';
	res.status(200).send(buildRobotsTxt(site, SITE_NOINDEX));
});

/** Single static combined sitemap (pages + posts) — one <urlset>. */
function sendCombinedSitemap(res) {
	const candidates = [
		path.join(clientRoot, 'sitemap_index.xml'),
		path.join(__dirname, 'public', 'sitemap_index.xml'),
	];
	let body = SITEMAP_INDEX_XML;
	for (const file of candidates) {
		try {
			if (!fs.existsSync(file)) continue;
			const disk = fs.readFileSync(file, 'utf8');
			if (disk.includes('<url>')) {
				body = disk;
				break;
			}
		} catch {
			/* use embedded */
		}
	}
	setNeverCache(res);
	res.status(200);
	res.setHeader('Content-Type', 'application/xml; charset=utf-8');
	res.send(body);
}

app.get('/sitemap_index.xml', (_req, res) => sendCombinedSitemap(res));
app.get('/sitemap.xml', (_req, res) => sendCombinedSitemap(res));
/** Legacy child sitemap paths → same combined file (single sitemap). */
app.get('/page-sitemap.xml', (_req, res) => sendCombinedSitemap(res));
app.get('/post-sitemap.xml', (_req, res) => sendCombinedSitemap(res));

/**
 * HTML must not get year-long CDN/browser TTL (CF was HITting `/` with old
 * CF7 form id 15940 while `/?refresh=1` got a fresh object).
 */
function setHtmlCacheHeaders(res) {
	const htmlCache =
		'public, max-age=0, must-revalidate, s-maxage=60, stale-while-revalidate=300';
	res.setHeader('Cache-Control', htmlCache);
	res.setHeader('CDN-Cache-Control', htmlCache);
	res.setHeader('Cloudflare-CDN-Cache-Control', 'max-age=60');
}

/**
 * Do not auto-serve `/` → index.html from static. Homepage goes through Astro
 * SSR + middleware so Cache-Control and `?refresh=1` actually apply.
 * (express.static with index:true bypassed middleware and left CF on a stale HIT.)
 *
 * Combined sitemap is served by Express from dist/client/sitemap_index.xml.
 */
app.use(
	express.static(clientRoot, {
		index: false,
		redirect: true,
		fallthrough: true,
		setHeaders(res, filePath) {
			if (filePath.endsWith('.html')) setHtmlCacheHeaders(res);
			if (filePath.endsWith('.xml') || filePath.endsWith('.xsl')) {
				res.setHeader('Content-Type', 'application/xml; charset=utf-8');
				setNeverCache(res);
			}
			if (filePath.endsWith('robots.txt')) {
				res.setHeader('Content-Type', 'text/plain; charset=utf-8');
				setNeverCache(res);
			}
			const norm = String(filePath).replace(/\\/g, '/');
			if (
				norm.includes('/_astro/') ||
				/\.(?:js|mjs|css|map|json|woff2?|ttf|eot|webp|avif|png|jpe?g|gif|svg|ico|mp4|webm|mp3)$/i.test(
					norm,
				)
			) {
				res.setHeader('X-Robots-Tag', 'noindex, nofollow');
			}
		},
	}),
);

/**
 * Serve prerendered `…/index.html` for clean URLs when Express does not
 * resolve the directory (common on Passenger without a trailing slash).
 * Skip `/` — SSR handles the homepage.
 */
app.use((req, res, next) => {
	if (req.method !== 'GET' && req.method !== 'HEAD') return next();
	const urlPath = decodeURIComponent(req.path.split('?')[0] || '/');
	if (path.extname(urlPath)) return next();

	const relative = urlPath.replace(/^\/+|\/+$/g, '');
	if (!relative) return next();

	const indexFile = path.join(clientRoot, relative, 'index.html');
	if (fs.existsSync(indexFile)) {
		setHtmlCacheHeaders(res);
		res.sendFile(indexFile);
		return;
	}
	next();
});

app.use(ssrHandler);

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
	console.log(`Xoomplus Astro SSR listening on http://${host}:${port}`);
});
