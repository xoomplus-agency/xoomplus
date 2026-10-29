/**
 * Run: npx --yes tsx src/lib/wp-content-headings.test.ts
 */
import assert from 'node:assert/strict';
import { cleanWpPostHtml } from './wp-content.ts';

const html = [
	'<p>Intro</p>',
	'<ul><li><h4>Scrapbook &amp; Mixed Media Collage</h4></li></ul>',
	'<ul><li><h3>1. AI-Powered Design</h3></li></ul>',
	'<ul><li><h3>- Flat Design Overkill</h3></li></ul>',
	'<h3>2. Bold Minimalism</h3>',
	'<ul><li><p>Real list item</p></li></ul>',
].join('');

const out = cleanWpPostHtml(html);
console.log(out);

assert.match(out, /<h4>Scrapbook &amp; Mixed Media Collage<\/h4>/);
assert.ok(!out.includes('<ul><li><h4>'), 'heading must not stay inside ul/li');
assert.match(out, /<h3>AI-Powered Design<\/h3>/);
assert.match(out, /<h3>Flat Design Overkill<\/h3>/);
assert.match(out, /<h3>Bold Minimalism<\/h3>/);
assert.match(out, /<ul><li><p>Real list item<\/p><\/li><\/ul>/);
assert.ok(!/<h3>1\./.test(out));
assert.ok(!/<h3>- /.test(out));

console.log('\nAll heading normalize tests passed.');
