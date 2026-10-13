/**
 * Subset SF Pro Display OTF → Latin woff2 for web.
 * TODO: SF Pro is Apple's font; confirm web licensing. If not licensed for web,
 * replace with a visually similar open font (e.g. Inter Display / Inter Tight).
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(__dirname, '../src/assets/fonts');

/** Build a Latin + punctuation glyph string (U+0000–00FF + common extras). */
function latinGlyphs() {
	const chars = [];
	for (let i = 0x20; i <= 0xff; i++) chars.push(String.fromCharCode(i));
	const extras =
		'\u2013\u2014\u2018\u2019\u201A\u201C\u201D\u201E\u2020\u2021\u2022\u2026\u2030\u2032\u2033\u20AC\u2122';
	return chars.join('') + extras;
}

const glyphs = latinGlyphs();

const faces = [
	{ src: 'SFPRODISPLAYREGULAR.OTF', out: 'SFPRODISPLAYREGULAR.woff2' },
	{ src: 'SFPRODISPLAYMEDIUM.OTF', out: 'SFPRODISPLAYMEDIUM.woff2' },
	{ src: 'SFPRODISPLAYBOLD.OTF', out: 'SFPRODISPLAYBOLD.woff2' },
];

await mkdir(fontsDir, { recursive: true });

for (const face of faces) {
	const input = await readFile(join(fontsDir, face.src));
	const woff2 = await subsetFont(input, glyphs, { targetFormat: 'woff2' });
	const outPath = join(fontsDir, face.out);
	await writeFile(outPath, woff2);
	console.log(
		`${face.src} ${input.length} → ${face.out} ${woff2.length} (${((woff2.length / input.length) * 100).toFixed(1)}%)`,
	);
}
