/**
 * Run: npx --yes tsx src/lib/extract-faqs.test.ts
 */
import assert from 'node:assert/strict';
import { extractFaqs } from './extract-faqs.ts';

function assertNoFaqLeak(html: string, label: string) {
	const lower = html.toLowerCase();
	assert.ok(!lower.includes('faq-items'), `${label} still has faq-items`);
	assert.ok(!lower.includes('<details'), `${label} still has details FAQ`);
	assert.ok(!lower.includes('data-bs-toggle'), `${label} still has bootstrap FAQ chrome`);
}

{
	const html = [
		'<p>Intro.</p>',
		'<h2>FAQs</h2>',
		'<details><summary>Orphan?</summary>Should stay in body.</details>',
	].join('');
	const result = extractFaqs(html);
	assert.deepEqual(result.faqs, []);
	assert.equal(result.before, html);
	console.log('✓ without faq-items class → no extraction');
}

{
	const html = [
		'<p>Before article.</p>',
		'<div class="faq-items">',
		'<h2>FAQs</h2>',
		'<h3><button type="button" data-bs-toggle="collapse" data-bs-target="#faq20" aria-expanded="false" aria-controls="faq20">',
		'Why is handcrafted design making a comeback in 2025? </button></h3>',
		'As AI-generated visuals become more common, designers are embracing hand-drawn techniques.',
		'<h3><button type="button" data-bs-toggle="collapse" data-bs-target="#faq21">',
		'Why do graphic design trends matter? </button></h3>',
		'Graphic design trends enable you to build projects that communicate.',
		'<h3><button type="button" data-bs-toggle="collapse" data-bs-target="#faq22">',
		'How are AI tools changing the way designers work in 2025? </button></h3>',
		'AI tools help designers work faster.',
		'<h3><button type="button" data-bs-toggle="collapse" data-bs-target="#faq23">',
		'How will companies use AI for graphic design in 2025? </button></h3>',
		'In 2025, companies will use AI for rapid prototyping.',
		'<h3><button type="button" data-bs-toggle="collapse" data-bs-target="#faq24">',
		'What is zero-waste design, and why does it matter in 2025? </button></h3>',
		'Zero-waste design focuses on decreasing environmental impact.',
		'</div>',
		'<p>After article.</p>',
	].join('');
	const result = extractFaqs(html);
	assert.equal(result.faqs.length, 5);
	assert.match(result.faqs[0].question, /handcrafted design/i);
	assert.ok(!/button/i.test(result.faqs[0].question));
	assert.match(result.faqs[0].answerHtml, /AI-generated visuals/i);
	assert.match(result.faqs[4].question, /zero-waste design/i);
	assert.match(result.faqs[4].answerHtml, /environmental impact/i);
	assert.match(result.before, /Before article/);
	assert.match(result.after, /After article/);
	assertNoFaqLeak(result.before, 'before');
	assertNoFaqLeak(result.after, 'after');
	console.log('✓ bootstrap h3+button faq-items');
}

{
	const html = [
		'<p>Before.</p>',
		'<div class="faq-items">',
		'<h2>FAQs</h2>',
		'<details id="e-n-accordion-item-6600">',
		'<summary>How can I generate more leads?<button type="button">x</button></summary>',
		'Focus on SEO and CTAs.',
		'</details>',
		'<details>',
		'<summary>Why is SEO important?</summary>',
		'SEO brings qualified traffic.',
		'</details>',
		'</div>',
		'<p>After.</p>',
	].join('');
	const result = extractFaqs(html);
	assert.equal(result.faqs.length, 2);
	assert.equal(result.faqs[0].question, 'How can I generate more leads?');
	assert.match(result.faqs[0].answerHtml, /Focus on SEO/i);
	assertNoFaqLeak(result.before, 'before');
	assertNoFaqLeak(result.after, 'after');
	console.log('✓ details/summary faq-items');
}

{
	const html = '<div class="faq-items"><h2>FAQs</h2><p>No pairs.</p></div>';
	const result = extractFaqs(html);
	assert.deepEqual(result.faqs, []);
	assert.equal(result.before, html);
	console.log('✓ empty faq-items leaves content untouched');
}

console.log('\nAll extractFaqs tests passed.');
