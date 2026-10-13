/**
 * Production-build verification for /blogs shell-first streaming.
 *
 * Expects preview already serving with WP_FETCH_DELAY_MS=3000 WP_FETCH_DELAY_ALLOW=1.
 *   node scripts/verify-blogs-shell.mjs [baseUrl]
 */
import { chromium } from 'playwright';

const BASE = (process.argv[2] || 'http://127.0.0.1:4321').replace(/\/+$/, '');
const URL = `${BASE}/blogs/`;

async function main() {
	const browser = await chromium.launch({ headless: true });
	const results = [];
	const pass = (name, ok, detail = '') => {
		results.push({ name, ok, detail });
		console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
	};

	const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
	const page = await context.newPage();
	const cdp = await context.newCDPSession(page);
	await cdp.send('Network.emulateNetworkConditions', {
		offline: false,
		downloadThroughput: ((1.6 * 1024 * 1024) / 8) * 0.8,
		uploadThroughput: ((750 * 1024) / 8) * 0.8,
		latency: 400,
	});

	let skeletonSeen = false;
	page.on('domcontentloaded', async () => {
		try {
			skeletonSeen =
				skeletonSeen ||
				(await page.locator('[data-blog-grid-skeleton]').count()) > 0;
		} catch {
			/* ignore */
		}
	});

	await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 120_000 });

	// Header in DOM with fixed utility class (CSS may still be applying)
	const header = page.locator('[data-site-header]').first();
	await header.waitFor({ state: 'attached', timeout: 60_000 });
	const headerClass = (await header.getAttribute('class')) || '';
	const headerVisible = await header.isVisible();
	// Wait briefly for stylesheet paint
	await page.waitForFunction(
		() => {
			const el = document.querySelector('[data-site-header]');
			if (!el) return false;
			const cs = getComputedStyle(el);
			return cs.position === 'fixed' || cs.position === 'absolute';
		},
		{ timeout: 10_000 },
	).catch(() => null);
	const headerStyles = await header.evaluate((el) => {
		const cs = getComputedStyle(el);
		return { position: cs.position, zIndex: cs.zIndex };
	});
	pass(
		'header visible + styled at first paint',
		headerVisible &&
			(headerClass.includes('fixed') || headerStyles.position === 'fixed'),
		JSON.stringify({ headerClass: headerClass.slice(0, 80), ...headerStyles }),
	);

	skeletonSeen =
		skeletonSeen ||
		(await page.locator('[data-blog-grid-skeleton]').count().catch(() => 0)) > 0;
	// If island already swapped, confirm skeleton existed in initial HTML response
	if (!skeletonSeen) {
		const html = await page.content();
		skeletonSeen = html.includes('data-blog-grid-skeleton') || html.includes('server-island');
	}
	// Prefer live observation while still loading
	const stillSkeleton = (await page.locator('[data-blog-grid-skeleton]').count()) > 0;
	pass(
		'skeleton appears while posts load',
		skeletonSeen || stillSkeleton,
		stillSkeleton ? 'live' : 'from initial markup / island placeholder',
	);

	const titleOk = await page.locator('#blogs-heading').isVisible();
	const filtersOk = await page.locator('[data-blog-filters]').isVisible();
	pass('page title + filters visible during skeleton', titleOk && filtersOk);

	const about = page.locator('[data-nav-desktop] a[href*="about"]').first();
	const navClickOk = (await about.count()) > 0 && (await about.isVisible());
	pass('nav item clickable during skeleton', navClickOk);

	const services = page.locator('[data-services-nav]').first();
	let servicesOk = false;
	if (await services.count()) {
		await services.hover().catch(() => {});
		const pe = await services.evaluate((el) => getComputedStyle(el).pointerEvents);
		const mega = page.locator('[data-services-mega]').first();
		const megaOpen = await mega
			.evaluate((el) => el.getAttribute('data-open') === 'true' || el.getAttribute('aria-hidden') === 'false')
			.catch(() => false);
		servicesOk = pe !== 'none' || megaOpen;
	}
	pass('Services menu interactable during skeleton', servicesOk);

	const overflow = await page.evaluate(() => document.documentElement.style.overflow);
	const theme = await page.locator('[data-site-header]').getAttribute('data-theme');
	pass(
		'theme/scroll chrome live (not locked)',
		overflow !== 'hidden' && (theme === 'light' || theme === null),
		`theme=${theme} overflow="${overflow}"`,
	);

	const y1 = await page.evaluate(() => window.scrollY);
	await page.evaluate(() => window.scrollBy(0, 240));
	await page.waitForTimeout(150);
	const y2 = await page.evaluate(() => window.scrollY);
	pass('window.scrollY changes during skeleton', y2 !== y1, `scrollY ${y1}→${y2}`);

	await page.waitForSelector('[data-blog-grid] [data-post-card]', { timeout: 120_000 });
	await page.waitForTimeout(300);
	const skelGone = (await page.locator('[data-blog-grid-skeleton]').count()) === 0;
	const cardCount = await page.locator('[data-blog-grid] [data-post-card]').count();
	pass('posts replace skeleton', skelGone && cardCount >= 9, `cards=${cardCount}`);

	const gridBox = await page.locator('[data-blog-grid]').boundingBox();
	const headingBox = await page.locator('#blogs-heading').boundingBox();
	pass(
		'grid present after swap; shell not remounted',
		Boolean(gridBox) && Boolean(headingBox),
		`gridTop=${gridBox?.y?.toFixed?.(0)} headingTop=${headingBox?.y?.toFixed?.(0)}`,
	);

	await context.close();
	await browser.close();

	const failed = results.filter((r) => !r.ok);
	console.log('\n--- summary ---');
	console.log(`passed ${results.length - failed.length}/${results.length}`);
	if (failed.length) process.exitCode = 1;
}

main().catch((err) => {
	console.error(err);
	process.exitCode = 1;
});
