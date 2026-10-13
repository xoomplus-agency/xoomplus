/**
 * Compare post-body headings to global typography tokens.
 * Usage: npx --yes tsx scripts/check-blog-heading-styles.mjs [baseUrl] [path]
 * Requires Playwright browsers: npx playwright install chromium
 */
import { chromium } from 'playwright';

const base = (process.argv[2] || 'http://localhost:4321').replace(/\/+$/, '');
const pathArg = process.argv[3] || '/digital-marketing/test/';
const url = `${base}${pathArg.startsWith('/') ? pathArg : `/${pathArg}`}`;

const PROPS = [
	'fontSize',
	'fontWeight',
	'lineHeight',
	'letterSpacing',
	'fontFamily',
	'color',
];
const LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

async function main() {
	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage();
	const failures = [];
	const rows = [];

	for (const width of [1440, 390]) {
		await page.setViewportSize({
			width,
			height: width === 1440 ? 900 : 844,
		});
		await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120_000 });

		const result = await page.evaluate(({ props }) => {
			const prose = document.querySelector('.prose-blog');
			if (!prose) return { error: 'no .prose-blog' };

			let ref = document.getElementById('heading-style-ref');
			if (ref) ref.remove();
			ref = document.createElement('div');
			ref.id = 'heading-style-ref';
			ref.setAttribute('aria-hidden', 'true');
			ref.style.cssText =
				'position:absolute;left:-9999px;top:0;visibility:hidden;pointer-events:none;';
			const tok = (size, weight, lh, track) =>
				`font-family:var(--font-sans);font-size:var(${size});font-weight:var(${weight});line-height:var(${lh});letter-spacing:${track};color:var(--color-primary-black);margin:0;`;
			ref.innerHTML = `
				<h1 style="${tok('--text-h1', '--text-h1--font-weight', '--text-h1--line-height', '-0.02em')}">Ref H1</h1>
				<h2 style="${tok('--text-h2', '--text-h2--font-weight', '--text-h2--line-height', '-0.02em')}">Ref H2</h2>
				<h3 style="${tok('--text-h3', '--text-h3--font-weight', '--text-h3--line-height', '-0.02em')}">Ref H3</h3>
				<h4 style="${tok('--text-h4', '--text-h4--font-weight', '--text-h4--line-height', 'normal')}">Ref H4</h4>
				<h5 style="${tok('--text-small-heading', '--text-small-heading--font-weight', '--text-small-heading--line-height', 'normal')}">Ref H5</h5>
				<h6 style="${tok('--text-small', '--text-small--font-weight', '--text-small--line-height', 'normal')}">Ref H6</h6>
			`;
			document.body.appendChild(ref);

			const samples = document.createElement('div');
			samples.id = 'heading-style-samples';
			samples.innerHTML = `
				<h2 class="post-h1">Sample H1 visual</h2>
				<h2>Sample H2</h2>
				<h3>Sample H3</h3>
				<h4>Sample H4</h4>
				<h5>Sample H5</h5>
				<h6>Sample H6</h6>
			`;
			prose.appendChild(samples);

			const pick = (el) => {
				const cs = getComputedStyle(el);
				const out = {};
				for (const p of props) out[p] = cs[p];
				return out;
			};

			const refMap = Object.fromEntries(
				['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((t) => [t, pick(ref.querySelector(t))]),
			);
			const sampleMap = {
				h1: pick(samples.querySelector('.post-h1')),
				h2: pick(samples.querySelector('h2:not(.post-h1)')),
				h3: pick(samples.querySelector('h3')),
				h4: pick(samples.querySelector('h4')),
				h5: pick(samples.querySelector('h5')),
				h6: pick(samples.querySelector('h6')),
			};

			const takeawaysTitle = document.querySelector(
				'.prose-blog .key-takeaways > :is(h2,h3,h4,h5,h6)',
			);

			return {
				refMap,
				sampleMap,
				exclusion: takeawaysTitle
					? {
							fontSize: getComputedStyle(takeawaysTitle).fontSize,
							fontWeight: getComputedStyle(takeawaysTitle).fontWeight,
						}
					: null,
			};
		}, { props: PROPS });

		if (result.error) {
			failures.push(`${width}px: ${result.error}`);
			continue;
		}

		for (const level of LEVELS) {
			const ref = result.refMap[level];
			const sample = result.sampleMap[level];
			const diffs = [];
			for (const prop of PROPS) {
				if (ref[prop] !== sample[prop]) {
					diffs.push(`${prop}: ref=${ref[prop]} sample=${sample[prop]}`);
					failures.push(`${width}px ${level} ${prop}`);
				}
			}
			rows.push({
				width,
				level,
				ok: diffs.length === 0,
				refSize: ref.fontSize,
				sampleSize: sample.fontSize,
				refWeight: ref.fontWeight,
				sampleWeight: sample.fontWeight,
				diffs,
			});
		}

		if (result.exclusion) {
			const ok =
				result.exclusion.fontSize === '18px' &&
				result.exclusion.fontWeight === '700';
			rows.push({
				width,
				level: 'excl:key-takeaways',
				ok,
				refSize: '18px',
				sampleSize: result.exclusion.fontSize,
				refWeight: '700',
				sampleWeight: result.exclusion.fontWeight,
				diffs: ok ? [] : ['exclusion regression'],
			});
			if (!ok) failures.push(`${width}px exclusion`);
		}
	}

	await browser.close();

	console.log('\nHeading style comparison');
	console.log('URL:', url);
	console.table(
		rows.map((r) => ({
			width: r.width,
			level: r.level,
			match: r.ok ? 'PASS' : 'FAIL',
			refSize: r.refSize,
			sampleSize: r.sampleSize,
			refWeight: r.refWeight,
			sampleWeight: r.sampleWeight,
			diffs: r.diffs.join('; ') || '—',
		})),
	);

	if (failures.length) {
		console.error('\nFAILED:', failures.length, failures.slice(0, 30));
		process.exit(1);
	}
	console.log('\nAll heading style checks passed.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
