/**
 * Decode HTML entities in plain text from WordPress / ultrahtml.
 * ultrahtml leaves entities in text nodes; Astro/React text nodes then escape
 * `&` so `&#8217;` shows literally. Also handles double-encoding (`&amp;#8217;`).
 */
const NAMED: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	nbsp: ' ',
	rsquo: '\u2019',
	lsquo: '\u2018',
	rdquo: '\u201D',
	ldquo: '\u201C',
	sbquo: '\u201A',
	bdquo: '\u201E',
	ndash: '\u2013',
	mdash: '\u2014',
	hellip: '\u2026',
	trade: '\u2122',
	reg: '\u00AE',
	copy: '\u00A9',
	bull: '\u2022',
	middot: '\u00B7',
	deg: '\u00B0',
};

function codePointToChar(cp: number): string {
	if (!Number.isFinite(cp) || cp < 0 || cp > 0x10ffff) return '';
	try {
		return String.fromCodePoint(cp);
	} catch {
		return '';
	}
}

function decodeOnce(text: string): string {
	return text
		.replace(/&#x([0-9a-fA-F]+);/g, (_, h: string) => codePointToChar(parseInt(h, 16)))
		.replace(/&#(\d+);/g, (_, n: string) => codePointToChar(Number(n)))
		.replace(/&([a-zA-Z][a-zA-Z0-9]+);/g, (match, name: string) => {
			const mapped = NAMED[name.toLowerCase()];
			return mapped !== undefined ? mapped : match;
		});
}

/** Decode HTML entities; repeats so `&amp;#8217;` → `’`. */
export function decodeHtmlEntities(text: string): string {
	if (!text || !text.includes('&')) return text || '';
	let prev = '';
	let out = text;
	let guard = 0;
	while (out !== prev && guard < 5) {
		prev = out;
		out = decodeOnce(out);
		guard += 1;
	}
	return out;
}
