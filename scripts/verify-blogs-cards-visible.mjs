/**
 * Regression: /blogs skeleton → visible cards (prod build).
 * Expects preview with WP_FETCH_DELAY_MS=3000 WP_FETCH_DELAY_ALLOW=1.
 *
 *   node scripts/verify-blogs-cards-visible.mjs [baseUrl]
 */
import { chromium } from 'playwright';

const BASE = (process.argv[2] || 'http://127.0.0.1:4321').replace(/\/+$/, '');
const URL = `${BASE}/blogs/`;

async function runOnce(browser, { reducedMotion }) {
	const context = await browser.newContext({
		viewport: { width: 1280, height: 800 },
		reducedMotion: reducedMotion ? 'reduce' : 'no-preference',
	});
	const page = await context.newPage();
	const cdp = await context.newCDPSession(page);
	await cdp.send('Network.emulateNetworkConditions', {
		offline: false,
		downloadThroughput: ((1.6 * 1024 * 1024) / 8) * 0.8,
		uploadThroughput: ((750 * 1024) / 8) * 0.8,
		latency: 400,
	});

	const label = reducedMotion ? 'reduced-motion' : 'motion-ok';
	const pass = (name, ok, detail = '') => {
		console.log(`${ok ? 'PASS' : 'FAIL'}  [${label}] ${name}${detail ? ` — ${detail}` : ''}`);
		return ok;
	};

	let ok = true;
	await page.goto(URL, { waitUntil: 'commit', timeout: 120_000 });

	const skeleton = await page
		.waitForSelector('[data-blog-grid-skeleton]', { timeout: 8_000 })
		.then(() => true)
		.catch(() => false);
	ok = pass('skeleton appears', skeleton) && ok;

	const card = await page
		.waitForSelector('[data-blog-grid] [data-post-card]', { timeout: 8_000 })
		.then(() => true)
		.catch(() => false);
	ok = pass('real card within 8s', card) && ok;

	await page.waitForTimeout(1500); // allow failsafe / reveal

	const stats = await page.evaluate(() => {
		const cards = [...document.querySelectorAll('[data-blog-grid] [data-post-card]')];
		const visible = cards.filter((el) => {
			const s = getComputedStyle(el);
			const r = el.getBoundingClientRect();
			return s.opacity === '1' && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
		});
		const countEl = document.querySelector('[data-blog-count]');
		const matchEl = document.querySelector('[data-blog-matching]');
		return {
			dom: cards.length,
			visible: visible.length,
			firstOpacity: cards[0] ? getComputedStyle(cards[0]).opacity : null,
			firstHeight: cards[0] ? cards[0].getBoundingClientRect().height : 0,
			countText: countEl?.textContent?.trim(),
			matchingText: matchEl?.textContent?.trim(),
		};
	});

	ok =
		pass(
			'visible cards opacity 1 + nonzero height',
			stats.visible >= 1 && stats.firstOpacity === '1' && stats.firstHeight > 0,
			JSON.stringify(stats),
		) && ok;

	const countNum = Number(stats.countText);
	ok =
		pass(
			'count text matches rendered cards',
			Number.isFinite(countNum) && countNum === stats.dom,
			`count=${stats.countText} dom=${stats.dom} matching=${stats.matchingText}`,
		) && ok;

	// Reachable by scroll
	if (stats.dom > 0) {
		await page.evaluate(() => {
			const last = document.querySelector('[data-blog-grid] [data-post-card]:last-child');
			last?.scrollIntoView({ block: 'center' });
		});
		await page.waitForTimeout(200);
		const lastOk = await page.evaluate(() => {
			const last = document.querySelector('[data-blog-grid] [data-post-card]:last-child');
			if (!last) return false;
			const s = getComputedStyle(last);
			return s.opacity === '1' && last.getBoundingClientRect().height > 0;
		});
		ok = pass('last card visible after scroll', lastOk) && ok;
	}

	await context.close();
	return ok;
}

async function main() {
	const browser = await chromium.launch({ headless: true });
	const a = await runOnce(browser, { reducedMotion: false });
	const b = await runOnce(browser, { reducedMotion: true });
	await browser.close();
	console.log('\n--- summary ---');
	console.log(a && b ? 'ALL PASS' : 'FAILED');
	if (!(a && b)) process.exitCode = 1;
}

main().catch((e) => {
	console.error(e);
	process.exitCode = 1;
});
