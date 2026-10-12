/**
 * Verify Yoast sitemap locs use the public domain and never the CMS host.
 *
 * Usage:
 *   node scripts/verify-yoast-sitemap.mjs
 *   node scripts/verify-yoast-sitemap.mjs http://127.0.0.1:4321
 *   node scripts/verify-yoast-sitemap.mjs https://xoomplus.co.uk
 */

const PUBLIC = (process.env.SITE_URL || 'https://xoomplus.co.uk').replace(/\/+$/, '');
/** Future CMS host used for rewrite-unit tests (not necessarily current WP_BASE_URL). */
const CMS = (
	process.env.WP_SITEMAP_CMS_TEST_ORIGIN || 'https://cms.xoomplus.co.uk'
).replace(/\/+$/, '');
const site = (process.argv[2] || PUBLIC).replace(/\/+$/, '');
const CMS_HOST = new URL(CMS).host.toLowerCase();
const PUBLIC_HOST = new URL(PUBLIC).host.toLowerCase();

function locs(xml) {
	return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
}

function imageLocs(xml) {
	return [...xml.matchAll(/<image:loc>\s*([^<\s]+)\s*<\/image:loc>/gi)].map((m) =>
		m[1].trim(),
	);
}

function rewriteLocsOnly(xml, wpBase, siteUrl) {
	const from = wpBase.replace(/\/+$/, '');
	const to = siteUrl.replace(/\/+$/, '');
	if (from === to) return xml;
	const fromHost = new URL(from).host;
	const toOrigin = new URL(to).origin;
	const mediaPath = /^(?:\/wp-content\/|\/wp-includes\/)/i;
	return xml.replace(/<loc>([\s\S]*?)<\/loc>/gi, (full, inner) => {
		const loc = inner.trim();
		try {
			const absolute = loc.startsWith('//') ? `https:${loc}` : loc;
			const u = new URL(absolute);
			if (u.host.toLowerCase() !== fromHost.toLowerCase()) return full;
			if (mediaPath.test(u.pathname)) return full;
			u.protocol = new URL(toOrigin).protocol;
			u.host = new URL(toOrigin).host;
			return `<loc>${u.href}</loc>`;
		} catch {
			return full;
		}
	});
}

async function fetchText(url) {
	const res = await fetch(url, {
		headers: { Accept: 'application/xml,text/xml,*/*', 'Cache-Control': 'no-cache' },
		redirect: 'follow',
	});
	const text = await res.text();
	return { res, text };
}

function summarize(label, xml) {
	const all = locs(xml);
	const images = imageLocs(xml);
	const locHosts = all.map((u) => {
		try {
			return new URL(u).host.toLowerCase();
		} catch {
			return '(invalid)';
		}
	});
	const cmsInLoc = locHosts.filter((h) => h === CMS_HOST).length;
	const publicInLoc = locHosts.filter((h) => h === PUBLIC_HOST).length;
	const nonPublic = locHosts.filter((h) => h !== PUBLIC_HOST);
	const locOk =
		cmsInLoc === 0 &&
		(all.length === 0 ||
			all.every(
				(u) =>
					u === PUBLIC ||
					u === `${PUBLIC}/` ||
					u.startsWith(`${PUBLIC}/`),
			));
	return {
		label,
		locCount: all.length,
		imageLocCount: images.length,
		cmsHostInLoc: cmsInLoc,
		publicHostInLoc: publicInLoc,
		nonPublicHosts: [...new Set(nonPublic)],
		sample: all.slice(0, 3),
		ok: locOk,
	};
}

// 1) Unit: rewrite cms → public on synthetic + live XML
const liveIndex = await fetchText(`${PUBLIC}/sitemap_index.xml`);
const synthetic = liveIndex.text.replaceAll(PUBLIC, CMS);
const rewritten = rewriteLocsOnly(synthetic, CMS, PUBLIC);
const unit = summarize('rewrite-unit', rewritten);
const unitImagesOk =
	imageLocs(synthetic).length === 0
		? true
		: imageLocs(rewritten).every((u) => {
				try {
					return new URL(u).host.toLowerCase() === CMS_HOST;
				} catch {
					return false;
				}
			});

// 2) Fetch index + children from target site
const indexUrl = `${site}/sitemap_index.xml`;
const index = await fetchText(indexUrl);
const childUrls = locs(index.text).filter((u) => /\.xml$/i.test(u));
const children = [];
for (const url of childUrls) {
	// Prefer same-host child paths so Astro proxy children are tested, not only live WP.
	let absolute;
	try {
		const u = new URL(url, site);
		absolute = `${site}${u.pathname}`;
	} catch {
		absolute = url.startsWith('http') ? url : new URL(url, site).href;
	}
	const child = await fetchText(absolute);
	children.push(summarize(absolute, child.text));
}

const indexSummary = summarize(indexUrl, index.text);

console.log(
	JSON.stringify(
		{
			site,
			public: PUBLIC,
			cms: CMS,
			indexStatus: index.res.status,
			indexContentType: index.res.headers.get('content-type'),
			unitRewriteOk: unit.ok && unitImagesOk,
			unit,
			index: indexSummary,
			children,
			allOk: unit.ok && unitImagesOk && indexSummary.ok && children.every((c) => c.ok),
		},
		null,
		2,
	),
);

if (!(unit.ok && unitImagesOk && indexSummary.ok && children.every((c) => c.ok))) {
	process.exitCode = 1;
}
