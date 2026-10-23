/**
 * Tablet layout audit — overflow / tiny tap targets / orphan grids.
 * Usage: node scripts/tablet-audit/audit.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const BASE = process.env.BASE_URL || 'http://localhost:4321';

const WIDTHS = [
	640, 700, 768, 800, 810, 820, 834, 900, 912, 960, 962, 1023,
	1024, 1032, 1100, 1180, 1199,
	// short landscape heights checked separately
];

const SHORT = [
	{ w: 962, h: 601 },
	{ w: 1024, h: 600 },
	{ w: 1024, h: 768 },
	{ w: 1180, h: 820 },
	{ w: 1366, h: 1024 }, // desktop fallback check
];

const CONTROL = [1440, 1280, 414, 375, 320];

const PAGES = [
	{ id: 'home', path: '/' },
	{ id: 'about', path: '/about' },
	{ id: 'services', path: '/services' },
	{ id: 'service-main', path: '/services/seo' },
	{ id: 'service-child', path: '/services/seo/local-seo' },
	{ id: 'pricing', path: '/pricing' },
	{ id: 'industries', path: '/industries' },
	{ id: 'case-studies', path: '/case-studies' },
	{ id: 'location', path: '/locations/blackburn' },
	{ id: 'contact', path: '/contact' },
	{ id: 'blogs', path: '/blogs' },
	{ id: 'privacy', path: '/privacy-policy' },
	{ id: '404', path: '/this-page-does-not-exist-404' },
];

async function resolveBlogPost(page) {
	try {
		await page.goto(`${BASE}/blogs`, { waitUntil: 'domcontentloaded', timeout: 60000 });
		const href = await page.evaluate(() => {
			const a = document.querySelector('a[href*="/blogs/"]');
			return a?.getAttribute('href') || null;
		});
		if (href && href !== '/blogs' && href !== '/blogs/') {
			return { id: 'blog-post', path: href.startsWith('http') ? new URL(href).pathname : href };
		}
	} catch {}
	return null;
}

function analyzeFn() {
	const vw = window.innerWidth;
	const doc = document.documentElement;
	const body = document.body;
	const scrollW = Math.max(doc.scrollWidth, body.scrollWidth);
	const clientW = doc.clientWidth;
	const hScroll = scrollW > clientW + 2;

	const overflows = [];
	const els = document.querySelectorAll('main *, footer *, header *, [data-site-header] *');
	for (const el of els) {
		if (!(el instanceof HTMLElement)) continue;
		const r = el.getBoundingClientRect();
		if (r.width < 1 || r.height < 1) continue;
		if (r.right > clientW + 2 || r.left < -2) {
			const tag = el.tagName.toLowerCase();
			const cls = (el.className && typeof el.className === 'string')
				? el.className.split(/\s+/).slice(0, 3).join('.')
				: '';
			const id = el.id ? `#${el.id}` : '';
			overflows.push({
				sel: `${tag}${id}${cls ? '.' + cls : ''}`,
				left: Math.round(r.left),
				right: Math.round(r.right),
				w: Math.round(r.width),
			});
			if (overflows.length >= 12) break;
		}
	}

	// Tiny tap targets (links/buttons visible, interactive)
	const tiny = [];
	const taps = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
	for (const el of taps) {
		if (!(el instanceof HTMLElement)) continue;
		const style = getComputedStyle(el);
		if (style.display === 'none' || style.visibility === 'hidden' || style.pointerEvents === 'none') continue;
		const r = el.getBoundingClientRect();
		if (r.width < 1 || r.height < 1) continue;
		// only count those roughly in/near viewport for speed, but sample page-wide
		if (r.height < 44 || r.width < 44) {
			// skip purely text inline links in prose that are expected small height but long width
			if (el.tagName === 'A' && r.width >= 44 && r.height >= 20 && el.closest('.prose, article')) continue;
			const tag = el.tagName.toLowerCase();
			const cls = (el.className && typeof el.className === 'string')
				? el.className.split(/\s+/).slice(0, 2).join('.')
				: '';
			tiny.push({
				sel: `${tag}${cls ? '.' + cls : ''}`,
				w: Math.round(r.width),
				h: Math.round(r.height),
				text: (el.textContent || '').trim().slice(0, 40),
			});
			if (tiny.length >= 15) break;
		}
	}

	// Orphan last card in grids: look for grid with odd child count and last alone
	const orphans = [];
	const grids = document.querySelectorAll('[class*="grid"], .services-grid, .bento, .pricing-grid');
	for (const g of grids) {
		if (!(g instanceof HTMLElement)) continue;
		const style = getComputedStyle(g);
		if (!style.display.includes('grid')) continue;
		const kids = [...g.children].filter((c) => c instanceof HTMLElement && getComputedStyle(c).display !== 'none');
		if (kids.length < 3) continue;
		const cols = style.gridTemplateColumns.split(' ').filter(Boolean).length;
		if (cols >= 2 && kids.length % cols === 1) {
			const last = kids[kids.length - 1].getBoundingClientRect();
			const first = kids[0].getBoundingClientRect();
			// last roughly left-aligned like first column → orphan look
			if (Math.abs(last.left - first.left) < 8) {
				orphans.push({
					cls: (g.className || '').toString().split(/\s+/).slice(0, 3).join('.'),
					cols,
					count: kids.length,
				});
			}
		}
	}

	// Tiny text
	const tinyText = [];
	for (const el of document.querySelectorAll('p, span, a, li, button, h1, h2, h3, h4, label')) {
		if (!(el instanceof HTMLElement)) continue;
		const fs = parseFloat(getComputedStyle(el).fontSize);
		if (fs > 0 && fs < 13) {
			tinyText.push({
				sel: el.tagName.toLowerCase() + ((el.className && typeof el.className === 'string') ? '.' + el.className.split(/\s+/)[0] : ''),
				fs: Math.round(fs * 10) / 10,
				text: (el.textContent || '').trim().slice(0, 30),
			});
			if (tinyText.length >= 8) break;
		}
	}

	// Hero h1 size
	const h1 = document.querySelector('h1');
	let h1Info = null;
	if (h1) {
		const s = getComputedStyle(h1);
		h1Info = { fs: s.fontSize, lines: Math.round(h1.getBoundingClientRect().height / parseFloat(s.lineHeight || s.fontSize)) };
	}

	// Navbar collision check: desktop nav visible?
	const desktopNav = document.querySelector('[data-nav-desktop]');
	const mobileNav = document.querySelector('[data-nav-mobile]');
	const dock = document.querySelector('[data-mobile-dock], .mobile-dock, [data-nav-dock]');
	const navInfo = {
		desktopVisible: desktopNav ? getComputedStyle(desktopNav).display !== 'none' : false,
		mobileVisible: mobileNav ? getComputedStyle(mobileNav).display !== 'none' : false,
		dockVisible: dock ? getComputedStyle(dock).display !== 'none' : false,
	};
	if (desktopNav && navInfo.desktopVisible) {
		const kids = [...desktopNav.querySelectorAll('a, button, img, .btn')];
		for (const a of kids) {
			const r = a.getBoundingClientRect();
			for (const b of kids) {
				if (a === b) continue;
				const rb = b.getBoundingClientRect();
				const overlap = !(r.right <= rb.left + 1 || r.left >= rb.right - 1 || r.bottom <= rb.top + 1 || r.top >= rb.bottom - 1);
				if (overlap && r.width > 10 && rb.width > 10) {
					navInfo.overlap = true;
					break;
				}
			}
			if (navInfo.overlap) break;
		}
		const nr = desktopNav.getBoundingClientRect();
		if (nr.right > clientW + 2 || nr.width > clientW) navInfo.overflow = true;
	}

	return {
		vw,
		scrollW,
		clientW,
		hScroll,
		overflowCount: overflows.length,
		overflows: overflows.slice(0, 8),
		tinyTapCount: tiny.length,
		tinyTaps: tiny.slice(0, 8),
		orphans,
		tinyText: tinyText.slice(0, 5),
		h1Info,
		navInfo,
	};
}

async function shot(page, name) {
	const dir = path.join(OUT, 'shots');
	fs.mkdirSync(dir, { recursive: true });
	await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: false });
}

async function main() {
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext();
	const page = await context.newPage();
	page.setDefaultTimeout(45000);

	const blog = await resolveBlogPost(page);
	const pages = [...PAGES];
	if (blog) pages.push(blog);
	else pages.push({ id: 'blog-post', path: '/blogs' }); // fallback

	const report = { base: BASE, generatedAt: new Date().toISOString(), pages: pages.map((p) => p.path), findings: [], controlShots: [] };

	// Control baselines (home only for pixel compare later)
	for (const w of CONTROL) {
		const h = w >= 1280 ? 900 : 800;
		await page.setViewportSize({ width: w, height: h });
		await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 90000 }).catch(() =>
			page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' }),
		);
		await page.waitForTimeout(400);
		const name = `control-home-${w}`;
		await shot(page, name);
		report.controlShots.push(name);
	}

	const auditWidths = [
		...WIDTHS.map((w) => ({ w, h: w <= 900 ? 1200 : 900 })),
		...SHORT,
	];

	// Deduplicate by w×h
	const seen = new Set();
	for (const { w, h } of auditWidths) {
		const key = `${w}x${h}`;
		if (seen.has(key)) continue;
		seen.add(key);

		await page.setViewportSize({ width: w, height: h });

		for (const p of pages) {
			const url = `${BASE}${p.path}`;
			try {
				await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
				await page.waitForTimeout(350);
			} catch (e) {
				report.findings.push({ page: p.id, width: w, height: h, problem: `load error: ${e.message}`, section: 'page' });
				continue;
			}

			const data = await page.evaluate(analyzeFn);
			const problems = [];

			if (data.hScroll) problems.push({ problem: `horizontal scroll (scrollW=${data.scrollW} vs ${data.clientW})`, section: data.overflows[0]?.sel || 'document' });
			for (const o of data.overflows.slice(0, 3)) {
				problems.push({ problem: `overflow element right=${o.right}`, section: o.sel });
			}
			if (data.orphans.length) {
				for (const o of data.orphans) {
					problems.push({ problem: `orphan last card in ${o.cols}-col grid (${o.count} items)`, section: o.cls });
				}
			}
			if (data.navInfo.overlap) problems.push({ problem: 'navbar child overlap', section: 'Header' });
			if (data.navInfo.overflow) problems.push({ problem: 'navbar overflow', section: 'Header' });
			if (w >= 1024 && w <= 1199 && !data.navInfo.desktopVisible) {
				problems.push({ problem: 'desktop navbar not visible in 1024-1199', section: 'Header' });
			}
			if (w < 1024 && data.navInfo.desktopVisible && !data.navInfo.mobileVisible) {
				// at <1024 mobile should show — ok if both logic differs
			}
			for (const t of data.tinyText) {
				problems.push({ problem: `tiny text ${t.fs}px`, section: t.sel });
			}
			// Only flag many tiny taps as a real issue (icons etc.)
			const realTiny = data.tinyTaps.filter((t) => t.h < 36 && t.w < 36);
			if (realTiny.length >= 3) {
				problems.push({
					problem: `tap targets <36px (${realTiny.length}+)`,
					section: realTiny.map((t) => t.sel).slice(0, 3).join(', '),
				});
			}

			for (const pr of problems) {
				report.findings.push({ page: p.id, path: p.path, width: w, height: h, ...pr, h1: data.h1Info });
			}

			// Sample screenshots for key pages at key widths
			if (['home', 'service-main', 'pricing', 'blogs', 'blog-post'].includes(p.id) && [768, 960, 1024, 1032].includes(w)) {
				await shot(page, `audit-${p.id}-${w}x${h}`);
			}
		}
	}

	fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
	const summary = {};
	for (const f of report.findings) {
		const k = `${f.page}|${f.width}|${f.problem}|${f.section}`;
		summary[k] = (summary[k] || 0) + 1;
	}
	const rows = Object.keys(summary).map((k) => {
		const [page, width, problem, section] = k.split('|');
		return { page, width: Number(width), problem, section };
	});
	fs.writeFileSync(path.join(OUT, 'audit-table.json'), JSON.stringify(rows, null, 2));
	console.log(`Findings: ${report.findings.length} (unique ${rows.length})`);
	console.log(`Wrote ${path.join(OUT, 'report.json')}`);
	await browser.close();
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
