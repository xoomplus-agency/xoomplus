/**
 * Step-0 repro: /blogs blank-cards evidence (Playwright).
 *   node scripts/repro-blogs-blank.mjs [baseUrl] [label]
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = (process.argv[2] || 'http://127.0.0.1:4321').replace(/\/+$/, '');
const LABEL = process.argv[3] || 'preview';
const URL = `${BASE}/blogs/`;
const OUT_DIR = path.resolve('scripts');
const SHOT = path.join(OUT_DIR, `blogs-blank-${LABEL}.png`);

function styleDump(s) {
	return {
		opacity: s.opacity,
		visibility: s.visibility,
		display: s.display,
		height: s.height,
		transform: s.transform,
		clipPath: s.clipPath,
		contentVisibility: s.contentVisibility,
		containIntrinsicSize: s.containIntrinsicSize,
	};
}

async function main() {
	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	const consoleMsgs = [];
	const pageErrors = [];
	page.on('console', (m) => consoleMsgs.push({ type: m.type(), text: m.text() }));
	page.on('pageerror', (e) => pageErrors.push(String(e)));

	console.log(`[${LABEL}] goto ${URL}`);
	await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 120_000 });
	await page.waitForTimeout(5000);
	await page.screenshot({ path: SHOT, fullPage: true });

	const evidence = await page.evaluate(() => {
		const cards = [...document.querySelectorAll('[data-blog-grid] [data-post-card]')];
		const grid = document.querySelector('[data-blog-grid]');
		const dump = (el) => {
			if (!el) return null;
			const s = getComputedStyle(el);
			const r = el.getBoundingClientRect();
			return {
				tag: el.tagName,
				classes: el.className,
				ariaBusy: el.getAttribute('aria-busy'),
				dataReveal: el.getAttribute('data-reveal'),
				armed: el.hasAttribute('data-reveal-armed'),
				isVisibleClass: el.classList.contains('is-visible'),
				isLoading: el.classList.contains('is-loading'),
				isHidden: el.classList.contains('is-hidden') || el.hasAttribute('hidden'),
				opacity: s.opacity,
				visibility: s.visibility,
				display: s.display,
				height: `${r.height}px`,
				transform: s.transform,
				clipPath: s.clipPath,
				contentVisibility: s.contentVisibility,
				containIntrinsicSize: s.containIntrinsicSize,
			};
		};
		const ancestors = [];
		let n = grid;
		while (n && n !== document.body) {
			ancestors.push({
				tag: n.tagName,
				classes: typeof n.className === 'string' ? n.className : '',
				ariaBusy: n.getAttribute?.('aria-busy'),
				isLoading: n.classList?.contains('is-loading'),
				isHidden: n.classList?.contains('is-hidden') || n.hasAttribute?.('hidden'),
			});
			n = n.parentElement;
		}
		return {
			cardCount: cards.length,
			countText: document.querySelector('[data-blog-count]')?.textContent?.trim(),
			matchingText: document.querySelector('[data-blog-matching]')?.textContent?.trim(),
			grid: dump(grid),
			firstCard: dump(cards[0] || null),
			ancestors,
			skeletonStill: Boolean(document.querySelector('[data-blog-grid-skeleton]')),
		};
	});

	// Scroll + resize (ScrollTrigger / IO refresh)
	await page.evaluate(() => window.scrollBy(0, 400));
	await page.waitForTimeout(400);
	await page.setViewportSize({ width: 1100, height: 700 });
	await page.waitForTimeout(400);
	const afterInteract = await page.evaluate(() => {
		const cards = [...document.querySelectorAll('[data-blog-grid] [data-post-card]')];
		return cards.slice(0, 3).map((el) => ({
			opacity: getComputedStyle(el).opacity,
			height: el.getBoundingClientRect().height,
			isVisible: el.classList.contains('is-visible'),
			armed: el.hasAttribute('data-reveal-armed'),
		}));
	});

	const report = {
		label: LABEL,
		url: URL,
		screenshot: SHOT,
		evidence,
		afterScrollResize: afterInteract,
		console: consoleMsgs.filter((m) => m.type === 'error' || m.type === 'warning'),
		pageErrors,
	};

	const outJson = path.join(OUT_DIR, `blogs-blank-repro-${LABEL}.json`);
	fs.writeFileSync(outJson, JSON.stringify(report, null, 2));
	console.log(JSON.stringify(report, null, 2));
	await browser.close();
}

main().catch((e) => {
	console.error(e);
	process.exitCode = 1;
});
