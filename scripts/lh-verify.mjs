/**
 * Mobile Lighthouse median-of-3 for key templates. Writes JSON under scripts/lighthouse-verify/.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'lighthouse-verify');
const base = (process.env.LHCI_URL || 'http://127.0.0.1:4335').replace(/\/$/, '');
const runs = Number(process.env.LH_RUNS || 3);

const pages = [
	{ id: 'home', path: '/' },
	{ id: 'services', path: '/services/' },
	{ id: 'location', path: '/locations/blackburn/' },
	{ id: 'blogs', path: '/blogs/' },
	{ id: 'contact', path: '/contact/' },
];

await mkdir(outDir, { recursive: true });

function runLh(url, outPath) {
	return new Promise((resolve, reject) => {
		const args = [
			'lighthouse',
			url,
			'--only-categories=performance',
			'--form-factor=mobile',
			'--screenEmulation.mobile=true',
			'--throttling-method=simulate',
			'--chrome-flags=--headless --no-sandbox --disable-gpu',
			'--output=json',
			`--output-path=${outPath}`,
			'--quiet',
		];
		const child = spawn('npx', args, { stdio: 'inherit', shell: true });
		child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`lh exit ${code}`))));
	});
}

function pick(audits, id) {
	return audits[id]?.numericValue ?? null;
}

function median(nums) {
	const a = nums.filter((n) => n != null).sort((x, y) => x - y);
	if (!a.length) return null;
	const mid = Math.floor(a.length / 2);
	return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
}

function summarize(json) {
	const a = json.audits;
	const fonts = (a['network-requests']?.details?.items || []).filter(
		(i) => i.resourceType === 'Font' || /\.woff2(\?|$)/i.test(i.url || ''),
	);
	const scripts = (a['network-requests']?.details?.items || []).filter(
		(i) => i.resourceType === 'Script',
	);
	const scriptBytes = scripts.reduce((s, i) => s + (i.transferSize || 0), 0);
	const reflow = a['non-composited-animations'] || a['forced-reflow-detail'];
	const chain = a['critical-request-chains'];
	let chainMs = null;
	if (chain?.details?.longestChain?.duration != null) {
		chainMs = chain.details.longestChain.duration;
	}
	return {
		FCP: pick(a, 'first-contentful-paint'),
		LCP: pick(a, 'largest-contentful-paint'),
		TBT: pick(a, 'total-blocking-time'),
		CLS: pick(a, 'cumulative-layout-shift'),
		SI: pick(a, 'speed-index'),
		perfScore: json.categories?.performance?.score,
		fontCount: fonts.length,
		scriptKB: Math.round(scriptBytes / 1024),
		chainMs,
		forcedReflow: a['forced-reflow-detail']?.details?.items?.length ?? null,
		lcpEl: a['largest-contentful-paint-element']?.displayValue ?? null,
	};
}

const report = {};

for (const page of pages) {
	const url = `${base}${page.path}`;
	const runsOut = [];
	for (let i = 1; i <= runs; i++) {
		const outPath = join(outDir, `${page.id}-run${i}.json`);
		console.log(`\n=== ${page.id} run ${i}/${runs}: ${url}`);
		try {
			await runLh(url, outPath);
			const json = JSON.parse(await (await import('node:fs/promises')).readFile(outPath, 'utf8'));
			const s = summarize(json);
			runsOut.push(s);
			console.log(
				`  FCP=${(s.FCP / 1000).toFixed(2)}s LCP=${(s.LCP / 1000).toFixed(2)}s TBT=${s.TBT?.toFixed?.(0)} CLS=${s.CLS?.toFixed?.(3)} fonts=${s.fontCount} js=${s.scriptKB}KB`,
			);
		} catch (err) {
			console.error(`  FAIL: ${err.message}`);
			runsOut.push(null);
		}
	}
	const ok = runsOut.filter(Boolean);
	report[page.id] = {
		url,
		runs: runsOut,
		median: {
			FCP: median(ok.map((r) => r.FCP)),
			LCP: median(ok.map((r) => r.LCP)),
			TBT: median(ok.map((r) => r.TBT)),
			CLS: median(ok.map((r) => r.CLS)),
			fontCount: median(ok.map((r) => r.fontCount)),
			scriptKB: median(ok.map((r) => r.scriptKB)),
			chainMs: median(ok.map((r) => r.chainMs)),
		},
	};
}

await writeFile(join(outDir, 'summary.json'), JSON.stringify(report, null, 2));
console.log('\n=== MEDIANS ===');
for (const [id, data] of Object.entries(report)) {
	const m = data.median;
	console.log(
		`${id}: FCP=${(m.FCP / 1000).toFixed(2)}s LCP=${(m.LCP / 1000).toFixed(2)}s TBT=${m.TBT?.toFixed?.(0)}ms CLS=${m.CLS?.toFixed?.(3)} fonts=${m.fontCount} js=${m.scriptKB}KB chain=${m.chainMs != null ? (m.chainMs / 1000).toFixed(2) + 's' : 'n/a'}`,
	);
}
