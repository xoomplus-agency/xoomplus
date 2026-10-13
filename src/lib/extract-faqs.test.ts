/**
 * Run: npx --yes tsx src/lib/extract-faqs.test.ts
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractFaqs } from './extract-faqs.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(here, '__fixtures__', 'faq-navigation-icons.content.html');

function assertNoFaqLeak(html: string, label: string) {
	const lower = html.toLowerCase();
	assert.ok(!/(^|>)\s*faqs?\s*(<|$)/i.test(html), `${label} still has FAQ marker`);
	assert.ok(!lower.includes('schema-faq-section'), `${label} still has Yoast FAQ`);
	assert.ok(!lower.includes('<details'), `${label} still has details FAQ`);
	assert.ok(
		!html.includes('Should navigation icons have text labels'),
		`${label} still has FAQ question text`,
	);
}

// --- Real cleaned Elementor FAQ post ---
{
	const html = fs.readFileSync(fixturePath, 'utf8');
	const result = extractFaqs(html);
	assert.equal(result.faqs.length, 5, 'expected 5 FAQ pairs from fixture');
	assert.match(result.faqs[0].question, /Should navigation icons have text labels/i);
	assert.match(result.faqs[0].answerHtml, /Text labels remove guesswork/i);
	assert.match(result.faqs[4].question, /best icon size/i);
	assert.match(result.faqs[4].answerHtml, /44/i);
	assertNoFaqLeak(result.before, 'before');
	assertNoFaqLeak(result.after, 'after');
	assert.ok(result.before.length > 100, 'before should retain article body');
	console.log('✓ fixture navigation-icons: 5 Q&As extracted');
}

// --- No FAQ section ---
{
	const html =
		'<p>Intro paragraph about marketing.</p><h2>Another section</h2><p>More copy.</p>';
	const result = extractFaqs(html);
	assert.deepEqual(result.faqs, []);
	assert.equal(result.before, html);
	assert.equal(result.after, '');
	console.log('✓ no FAQ section returns html unchanged');
}

// --- Heading + strong/b pattern ---
{
	const html = [
		'<p>Before text.</p>',
		'<h2>FAQs</h2>',
		'<p><strong>Is this a question?</strong></p>',
		'<p>Yes, with a <a href="/x">link</a>.</p>',
		'<p><strong>Second question?</strong></p>',
		'<p>Second answer.</p>',
		'<h2>Next chapter</h2>',
		'<p>After FAQ.</p>',
	].join('');
	const result = extractFaqs(html);
	assert.equal(result.faqs.length, 2);
	assert.equal(result.faqs[0].question, 'Is this a question?');
	assert.match(result.faqs[0].answerHtml, /link/);
	assert.equal(result.faqs[1].question, 'Second question?');
	assert.match(result.before, /Before text/);
	assert.ok(!/FAQs/i.test(result.before));
	assert.ok(!/Is this a question/i.test(result.before));
	assert.match(result.after, /Next chapter/);
	assert.match(result.after, /After FAQ/);
	assert.ok(!/Second question/i.test(result.after));
	console.log('✓ heading + strong pattern');
}

// --- Yoast FAQ block ---
{
	const html = [
		'<p>Lead-in.</p>',
		'<div class="schema-faq wp-block-yoast-faq-block">',
		'<div class="schema-faq-section">',
		'<strong class="schema-faq-question">Yoast question one?</strong>',
		'<p class="schema-faq-answer">Yoast answer one with <em>emphasis</em>.</p>',
		'</div>',
		'<div class="schema-faq-section">',
		'<strong class="schema-faq-question">Yoast question two?</strong>',
		'<p class="schema-faq-answer">Yoast answer two.</p>',
		'</div>',
		'</div>',
		'<p>Trailing.</p>',
	].join('');
	const result = extractFaqs(html);
	assert.equal(result.faqs.length, 2);
	assert.equal(result.faqs[0].question, 'Yoast question one?');
	assert.match(result.faqs[0].answerHtml, /emphasis/);
	assert.equal(result.faqs[1].question, 'Yoast question two?');
	assert.match(result.before, /Lead-in/);
	assert.match(result.after, /Trailing/);
	assert.ok(!result.before.includes('schema-faq'));
	assert.ok(!result.after.includes('schema-faq'));
	console.log('✓ Yoast FAQ block');
}

// --- Incomplete pair ignored ---
{
	const html = '<h2>FAQs</h2><p><strong>Only a question?</strong></p>';
	const result = extractFaqs(html);
	assert.deepEqual(result.faqs, []);
	assert.equal(result.before, html);
	console.log('✓ incomplete pair leaves content untouched');
}

console.log('\nAll extractFaqs tests passed.');
