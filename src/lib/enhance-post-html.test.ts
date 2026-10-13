/**
 * Run: npx --yes tsx src/lib/enhance-post-html.test.ts
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, ELEMENT_NODE } from 'ultrahtml';
import { enhanceTables } from './enhance-post-html.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.join(here, '__fixtures__');

type Node = {
	type: number;
	name?: string;
	attributes?: Record<string, string>;
	children?: Node[];
};

function load(name: string): string {
	return fs.readFileSync(path.join(fixtures, name), 'utf8');
}

function tables(html: string): Node[] {
	const found: Node[] = [];
	const walk = (node: Node) => {
		if (node.type === ELEMENT_NODE && node.name?.toLowerCase() === 'table') {
			found.push(node);
		}
		for (const child of node.children || []) walk(child);
	};
	walk(parse(html) as Node);
	return found;
}

function classOf(node: Node | undefined): string {
	return node?.attributes?.class ?? '';
}

function findRows(table: Node): Node[] {
	const rows: Node[] = [];
	const walk = (node: Node) => {
		if (node.type === ELEMENT_NODE && node.name?.toLowerCase() === 'tr') {
			rows.push(node);
			return;
		}
		for (const child of node.children || []) walk(child);
	};
	walk(table);
	return rows;
}

/** Presentation attrs must be gone from table/tr/td/th/span only (per enhanceTables). */
function assertNoPresentationAttrs(html: string, label: string) {
	const re =
		/<(table|tr|td|th|span)\b([^>]*)>/gi;
	let match: RegExpExecArray | null;
	while ((match = re.exec(html))) {
		const attrs = match[2].toLowerCase();
		assert.ok(!/\sstyle\s*=/.test(attrs), `${label}: style on <${match[1]}>`);
		assert.ok(!/\swidth\s*=/.test(attrs), `${label}: width on <${match[1]}>`);
		assert.ok(!/\sheight\s*=/.test(attrs), `${label}: height on <${match[1]}>`);
		assert.ok(!/\sbgcolor\s*=/.test(attrs), `${label}: bgcolor on <${match[1]}>`);
		assert.ok(!/\salign\s*=/.test(attrs), `${label}: align on <${match[1]}>`);
		assert.ok(!/\svalign\s*=/.test(attrs), `${label}: valign on <${match[1]}>`);
	}
}

function assertTextPreserved(original: string, enhanced: string, needles: string[]) {
	for (const needle of needles) {
		assert.ok(original.includes(needle), `fixture missing expected text: ${needle}`);
		assert.ok(enhanced.includes(needle), `enhanced lost text: ${needle}`);
	}
}

// --- (a) keyword table: 3 cols, no thead, no bold header ---
{
	const original = load('table-keyword-3col.html');
	const enhanced = enhanceTables(original);
	const [table] = tables(enhanced);

	assert.ok(enhanced.includes('blog-table-wrap'), 'a: wrap missing');
	assert.ok(classOf(table).includes('bt-cols-3'), `a: expected bt-cols-3, got ${classOf(table)}`);
	const rows = findRows(table);
	assert.ok(!rows.some((r) => classOf(r).includes('bt-title')), 'a: unexpected bt-title');
	assert.ok(!rows.some((r) => classOf(r).includes('bt-head')), 'a: unexpected bt-head');
	assertTextPreserved(original, enhanced, [
		'Keyword',
		'Search volume',
		'Intent',
		'keyword mapping',
		'seo keyword mapping',
	]);
	console.log('✓ (a) keyword 3-col: no bt-title, no bt-head, bt-cols-3');
}

// --- (b) title row + bold header row ---
{
	const original = load('table-title-and-head.html');
	const enhanced = enhanceTables(original);
	const [table] = tables(enhanced);
	const rows = findRows(table);

	assert.ok(classOf(table).includes('bt-cols-2'), `b: expected bt-cols-2, got ${classOf(table)}`);
	assert.ok(rows.some((r) => classOf(r).includes('bt-title')), 'b: missing bt-title');
	assert.ok(rows.some((r) => classOf(r).includes('bt-head')), 'b: missing bt-head');
	assert.ok(enhanced.includes('Best Practices to Use Icons'), 'b: title text lost');
	assert.ok(enhanced.includes('<h4'), 'b: h4 should remain');
	assert.ok(enhanced.includes('<b>') || enhanced.includes('<strong>'), 'b: bold tags should remain');
	assert.ok(enhanced.includes('data-toc-exclude'), 'b: table heading should be TOC-excluded');
	assertNoPresentationAttrs(enhanced.match(/<table[\s\S]*?<\/table>/i)?.[0] ?? '', 'b table');
	assertTextPreserved(original, enhanced, [
		'Best Practices to Use Icons',
		'Practice',
		'Why it matters',
		'Use familiar symbols',
		'Add text labels',
	]);
	console.log('✓ (b) title + bold head: bt-title, bt-head, styles stripped');
}

// --- (c) plain th headers, no title ---
{
	const original = load('table-plain-th.html');
	const enhanced = enhanceTables(original);
	const [table] = tables(enhanced);
	const rows = findRows(table);

	assert.ok(classOf(table).includes('bt-cols-3'), `c: expected bt-cols-3, got ${classOf(table)}`);
	assert.ok(!rows.some((r) => classOf(r).includes('bt-title')), 'c: unexpected bt-title');
	assert.ok(rows.some((r) => classOf(r).includes('bt-head')), 'c: missing bt-head');
	assertNoPresentationAttrs(enhanced.match(/<table[\s\S]*?<\/table>/i)?.[0] ?? '', 'c table');
	assertTextPreserved(original, enhanced, [
		'Metric',
		'What It Means',
		'Why It Matters',
		'TTFB',
		'LCP',
		'Slow servers feel broken.',
	]);
	console.log('✓ (c) plain th: bt-head only, styles stripped');
}

// --- never throws ---
{
	assert.equal(enhanceTables(''), '');
	assert.equal(enhanceTables('just text'), 'just text');
	console.log('✓ empty / non-table html unchanged');
}

// --- callout / key-takeaways: strip container style + TOC-exclude headings ---
{
	const original = `
<div class="custom-callout" style="background:red;padding:99px">
  <h3 style="margin:40px">Note</h3>
  <p>Body with a <a href="/contact/">link</a>.</p>
</div>
<aside class="key-takeaways" style="border:2px solid blue">
  <p><strong>Key Takeaways</strong></p>
  <ul><li>One</li><li>Two</li></ul>
</aside>`;
	const enhanced = enhanceTables(original);
	assert.ok(enhanced.includes('class="custom-callout"'), 'callout class kept');
	assert.ok(enhanced.includes('class="key-takeaways"'), 'takeaways class kept');
	assert.ok(!/custom-callout"[^>]*\sstyle=/.test(enhanced), 'callout style stripped');
	assert.ok(!/key-takeaways"[^>]*\sstyle=/.test(enhanced), 'takeaways style stripped');
	assert.ok(enhanced.includes('data-toc-exclude'), 'heading inside callout TOC-excluded');
	assert.ok(enhanced.includes('Body with a'), 'callout text unchanged');
	assert.ok(enhanced.includes('<a href="/contact/">link</a>'), 'link kept');
	console.log('✓ callout/takeaways: style stripped, TOC-excluded, classes kept');
}

// --- headings: demote h1, strip WP size/align classes + style, keep id/links ---
{
	const original = `
<h1 id="intro" class="wp-block-heading has-large-font-size has-text-align-center" style="font-size:48px">
  Intro <a href="/x">link</a>
</h1>
<h2 class="has-medium-font-size" style="color:red" id="sec">Section</h2>
<h3><span style="font-weight:400">Wrapped</span></h3>`;
	const enhanced = enhanceTables(original);
	assert.ok(!/<h1\b/i.test(enhanced), 'content h1 demoted');
	assert.ok(/<h2\b[^>]*\bpost-h1\b/i.test(enhanced), 'post-h1 class added');
	assert.ok(enhanced.includes('id="intro"'), 'h1 id preserved on demoted heading');
	assert.ok(enhanced.includes('id="sec"'), 'h2 id preserved');
	assert.ok(!/has-large-font-size/.test(enhanced), 'font-size class stripped');
	assert.ok(!/has-text-align-center/.test(enhanced), 'align class stripped');
	assert.ok(!/has-medium-font-size/.test(enhanced), 'medium font-size class stripped');
	assert.ok(!/<h2\b[^>]*\sstyle=/i.test(enhanced), 'heading style stripped');
	assert.ok(enhanced.includes('<a href="/x">link</a>'), 'link inside heading kept');
	assert.ok(enhanced.includes('Wrapped'), 'span text kept');
	console.log('✓ headings: h1→h2.post-h1, WP classes/styles stripped, ids/links kept');
}

console.log('\nAll enhanceTables tests passed.');
