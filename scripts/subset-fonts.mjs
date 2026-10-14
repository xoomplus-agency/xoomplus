/**
 * Build site font files (max 3 woff2, Latin subset, ≤25KB target each):
 * 1. SF Pro Display Bold (500–700) — headings
 * 2. Inter 400 — body
 * 3. Inter 600 (served for 500–700) — UI emphasis
 *
 * Inter variable was evaluated but stays >35KB after Latin subset; static
 * pair hits the size budget without faux-bold.
 *
 * TODO: SF Pro is Apple's font; confirm web licensing. If not licensed for web,
 * replace with a visually similar open font (e.g. Inter Display / Inter Tight).
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(__dirname, '../src/assets/fonts');

/** Latin + punctuation glyph string (U+0020–00FF + common extras). */
function latinGlyphs() {
	const chars = [];
	for (let i = 0x20; i <= 0xff; i++) chars.push(String.fromCharCode(i));
	const extras =
		'\u2013\u2014\u2018\u2019\u201A\u201C\u201D\u201E\u2020\u2021\u2022\u2026\u2030\u2032\u2033\u20AC\u2122';
	return chars.join('') + extras;
}

const glyphs = latinGlyphs();

await mkdir(fontsDir, { recursive: true });

const faces = [
	{ src: 'SFPRODISPLAYBOLD.OTF', out: 'SFPRODISPLAYBOLD.woff2' },
	/* Inter static files are already Latin-ish; re-subset if OTF/TTF sources appear later.
	   Keep existing Inter-400/600 woff2 when under budget. */
];

for (const face of faces) {
	const input = await readFile(join(fontsDir, face.src));
	const woff2 = await subsetFont(input, glyphs, { targetFormat: 'woff2' });
	await writeFile(join(fontsDir, face.out), woff2);
	console.log(
		`${face.src} ${input.length} → ${face.out} ${woff2.length} (${(woff2.length / 1024).toFixed(1)} KB)`,
	);
}

for (const name of ['Inter-400.woff2', 'Inter-600.woff2', 'SFPRODISPLAYBOLD.woff2']) {
	const buf = await readFile(join(fontsDir, name));
	const kb = buf.length / 1024;
	console.log(`check ${name}: ${kb.toFixed(1)} KB${kb > 25 ? ' (over 25KB target)' : ''}`);
}
