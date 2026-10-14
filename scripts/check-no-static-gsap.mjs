/**
 * Guardrail: fail if any layout/shared component statically imports GSAP.
 * Keep complex timelines lazy via dynamic import() only when genuinely needed.
 *
 * Prefer CSS + IntersectionObserver (src/scripts/reveal.ts) for scroll fades.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SCAN = [join(ROOT, 'src')];
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.astro', '.mjs', '.cjs']);

/** Static import / side-effect import of gsap (not dynamic import()). */
const STATIC_GSAP =
	/(?:^|[^.\w])import\s+(?:[\s\S]*?\s+from\s+)?['"]gsap(?:\/[^'"]*)?['"]|(?:^|[^.\w])import\s+['"]gsap(?:\/[^'"]*)?['"]|(?:^|[^.\w])require\s*\(\s*['"]gsap(?:\/[^'"]*)?['"]\s*\)/m;

async function walk(dir, out = []) {
	let entries;
	try {
		entries = await readdir(dir, { withFileTypes: true });
	} catch {
		return out;
	}
	for (const ent of entries) {
		const p = join(dir, ent.name);
		if (ent.isDirectory()) {
			if (ent.name === 'node_modules' || ent.name === 'dist') continue;
			await walk(p, out);
		} else if (EXTS.has(ent.name.slice(ent.name.lastIndexOf('.')))) {
			out.push(p);
		}
	}
	return out;
}

const files = (await Promise.all(SCAN.map((d) => walk(d)))).flat();
const violations = [];

for (const file of files) {
	const text = await readFile(file, 'utf8');
	if (STATIC_GSAP.test(text)) {
		violations.push(relative(ROOT, file));
	}
}

if (violations.length) {
	console.error('[check-no-static-gsap] Static GSAP imports are forbidden in src/:');
	for (const v of violations) console.error(`  - ${v}`);
	console.error(
		'Use CSS + IntersectionObserver for scroll reveals, or dynamic import("gsap") only when a section is near the viewport.',
	);
	process.exit(1);
}

console.log('[check-no-static-gsap] OK — no static gsap imports in src/');
