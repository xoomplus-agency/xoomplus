/**
 * Assert desktop/mobile computed styles are unchanged by tablet overrides.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://localhost:4321';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.emulateMedia({ reducedMotion: 'reduce' });

const checks = [
	{
		w: 1440,
		h: 900,
		expect: {
			gutterIsClamp: true,
			sectionPadIsClamp: true,
			servicesCols: 3,
			heroHeight: '780px',
		},
	},
	{
		w: 1280,
		h: 900,
		expect: {
			gutterIsClamp: true,
			sectionPadIsClamp: true,
			servicesCols: 2, // pre-existing max-width:1280 rule
			heroHeight: '780px',
		},
	},
	{
		w: 414,
		h: 800,
		expect: {
			gutterIsClamp: true,
			sectionPadIsClamp: true,
			servicesCols: 1,
		},
	},
	{
		w: 375,
		h: 800,
		expect: {
			gutterIsClamp: true,
			sectionPadIsClamp: true,
			servicesCols: 1,
		},
	},
	{
		w: 320,
		h: 800,
		expect: {
			gutterIsClamp: true,
			sectionPadIsClamp: true,
			servicesCols: 1,
		},
	},
];

const results = [];
for (const c of checks) {
	await page.setViewportSize({ width: c.w, height: c.h });
	await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 90000 });
	await page.waitForTimeout(400);
	const got = await page.evaluate(() => {
		const root = getComputedStyle(document.documentElement);
		const gutter = root.getPropertyValue('--gutter').trim();
		const sectionPad = root.getPropertyValue('--section-padding-y').trim();
		const svc = document.querySelector('.services-grid');
		const cols = svc
			? getComputedStyle(svc).gridTemplateColumns.split(/\s(?![^\(]*\))/).filter(Boolean).length
			: null;
		const hero = document.querySelector('.home-hero');
		return {
			gutter,
			sectionPad,
			servicesCols: cols,
			heroHeight: hero ? getComputedStyle(hero).height : null,
			hScroll:
				Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
				document.documentElement.clientWidth + 2,
		};
	});
	const ok = {
		gutter: c.expect.gutterIsClamp ? got.gutter.includes('clamp') : true,
		sectionPad: c.expect.sectionPadIsClamp ? got.sectionPad.includes('clamp') : true,
		servicesCols: c.expect.servicesCols == null || got.servicesCols === c.expect.servicesCols,
		heroHeight: c.expect.heroHeight == null || got.heroHeight === c.expect.heroHeight,
		hScroll: !got.hScroll,
	};
	const pass = Object.values(ok).every(Boolean);
	results.push({ w: c.w, pass, ok, got });
	console.log(c.w, pass ? 'PASS' : 'FAIL', got);
}

fs.writeFileSync('scripts/tablet-audit/control-check.json', JSON.stringify(results, null, 2));
await browser.close();
if (results.some((r) => !r.pass)) process.exit(1);
