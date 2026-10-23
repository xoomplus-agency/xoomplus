import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const BASE = 'http://localhost:4321';
const OUT = 'scripts/tablet-audit';

function hash(buf) {
	return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const CONTROL = [1440, 1280, 414, 375, 320];
const compare = [];
fs.mkdirSync(path.join(OUT, 'after'), { recursive: true });
for (const w of CONTROL) {
	await page.setViewportSize({ width: w, height: w >= 1280 ? 900 : 800 });
	await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
	await page.waitForTimeout(600);
	const afterPath = path.join(OUT, 'after', `home-${w}.png`);
	await page.screenshot({ path: afterPath, fullPage: false });
	const before = fs.readFileSync(path.join(OUT, 'before', `home-${w}.png`));
	const after = fs.readFileSync(afterPath);
	compare.push({
		w,
		identical: before.equals(after),
		before: hash(before),
		after: hash(after),
		beforeBytes: before.length,
		afterBytes: after.length,
	});
	console.log('control', w, before.equals(after) ? 'IDENTICAL' : 'DIFF', before.length, after.length);
}

const probes = [];
for (const [p, w] of [
	['/', 768],
	['/', 1024],
	['/about', 900],
	['/pricing', 900],
	['/pricing', 768],
	['/services/seo', 1024],
	['/contact', 768],
]) {
	await page.setViewportSize({ width: w, height: 1000 });
	await page.goto(`${BASE}${p}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
	await page.waitForTimeout(250);
	const info = await page.evaluate(() => {
		const c = document.querySelector('.container');
		const gutter = c ? getComputedStyle(c).paddingLeft : null;
		const story = document.querySelector('.our-story');
		const svc = document.querySelector('.services-grid');
		const adhoc = document.querySelector('.pricing-plans__adhoc');
		const pkgs = document.querySelector('.pricing-plans__packages');
		const hScroll =
			Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
			document.documentElement.clientWidth + 2;
		const bt = document.querySelector('.bt-header');
		return {
			gutter,
			hScroll,
			storyFlex: story ? getComputedStyle(story).flexDirection : null,
			svcCols: svc ? getComputedStyle(svc).gridTemplateColumns.split(' ').filter(Boolean).length : null,
			adhocCols: adhoc
				? getComputedStyle(adhoc).gridTemplateColumns.split(' ').filter(Boolean).length
				: null,
			pkgCols: pkgs
				? getComputedStyle(pkgs).gridTemplateColumns.split(' ').filter(Boolean).length
				: null,
			btHeader: bt ? getComputedStyle(bt).flexDirection : null,
		};
	});
	probes.push({ p, w, ...info });
	console.log(p, w, info);
}

const devices = [
	{ width: 960, height: 1440 },
	{ width: 768, height: 1024 },
	{ width: 1032, height: 1376 },
	{ width: 820, height: 1180 },
	{ width: 1024, height: 768 },
];
const shotPages = ['/', '/services/seo', '/pricing', '/blogs'];
fs.mkdirSync(path.join(OUT, 'devices'), { recursive: true });
await page.emulateMedia({ reducedMotion: 'reduce' });
for (const d of devices) {
	await page.setViewportSize(d);
	for (const p of shotPages) {
		await page.goto(`${BASE}${p}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
		await page.waitForTimeout(300);
		const name = `${p.replace(/\//g, '') || 'home'}-${d.width}x${d.height}`;
		await page.screenshot({ path: path.join(OUT, 'devices', `${name}.png`), fullPage: false });
	}
	console.log('device', `${d.width}x${d.height}`);
}

fs.writeFileSync(path.join(OUT, 'verify.json'), JSON.stringify({ compare, probes }, null, 2));
await browser.close();
console.log('done');
