import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto('http://localhost:4321/blogs', { waitUntil: 'domcontentloaded', timeout: 60000 });
const href = await page.evaluate(() => {
	const links = [...document.querySelectorAll('a[href*="/blogs/"]')]
		.map((a) => a.getAttribute('href'))
		.filter((h) => h && h !== '/blogs' && h !== '/blogs/' && !h.includes('?'));
	return links[0] || null;
});
console.log('blog', href);
if (href) {
	for (const d of [
		{ w: 768, h: 1024 },
		{ w: 960, h: 1440 },
		{ w: 1032, h: 900 },
	]) {
		await page.setViewportSize({ width: d.w, height: d.h });
		await page.goto(`http://localhost:4321${href}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
		await page.waitForTimeout(400);
		await page.screenshot({
			path: `scripts/tablet-audit/devices/blogpost-${d.w}x${d.h}.png`,
			fullPage: false,
		});
	}
	await page.setViewportSize({ width: 1100, height: 900 });
	await page.goto(`http://localhost:4321${href}`, { waitUntil: 'domcontentloaded' });
	const side = await page.evaluate(() => {
		const layout = document.querySelector('.blog-article__layout');
		const aside = document.querySelector('.blog-sidebar');
		return {
			gtc: layout && getComputedStyle(layout).gridTemplateColumns,
			asideW: aside && Math.round(aside.getBoundingClientRect().width),
		};
	});
	console.log('blog@1100', side);
}
await browser.close();
