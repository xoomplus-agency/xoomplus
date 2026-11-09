/**
 * Run: npx --yes tsx src/lib/extract-faqs.test.ts
 */
import assert from 'node:assert/strict';
import { extractFaqs } from './extract-faqs.ts';

function assertNoFaqLeak(html: string, label: string) {
	const lower = html.toLowerCase();
	assert.ok(!lower.includes('faq-items'), `${label} still has faq-items`);
	assert.ok(!lower.includes('faq-item'), `${label} still has faq-item`);
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
	console.log('✓ without faq-items / faq-item class → no extraction');
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
	const html = [
		'<p>Intro copy.</p>',
		'<div class="faq-items">',
		'<h2>FAQs</h2>',
		'<p>Is a full-service agency more expensive than a specialist?</p>',
		'<p>Not necessarily. Compare the total fees, deliverables and management time involved.</p>',
		'<p>Can I use both a full-service and specialist agency?</p>',
		'<p>Yes. Make sure responsibilities, reporting and communication are clearly defined.</p>',
		'</div>',
	].join('');
	const result = extractFaqs(html);
	assert.equal(result.faqs.length, 2);
	assert.equal(
		result.faqs[0].question,
		'Is a full-service agency more expensive than a specialist?',
	);
	assert.match(result.faqs[0].answerHtml, /Not necessarily/i);
	assert.equal(
		result.faqs[1].question,
		'Can I use both a full-service and specialist agency?',
	);
	assert.match(result.faqs[1].answerHtml, /responsibilities/i);
	assert.match(result.before, /Intro copy/);
	assert.ok(!/full-service agency more expensive/i.test(result.before));
	console.log('✓ plain alternating paragraph faq-items');
}

{
	const html = [
		'<div class="faq-item">',
		'<h2>FAQs</h2>',
		'<details id="e-n-accordion-item-2480">',
		'<summary>What are the top WordPress development trends to watch in 2026?</summary>',
		'The biggest WordPress development trends in 2026 include AI-powered tools.',
		'</details>',
		'<details id="e-n-accordion-item-2481">',
		'<summary>Why is Headless WordPress becoming more popular?</summary>',
		'Headless WordPress separates content management from the front end.',
		'</details>',
		'</div>',
	].join('');
	const result = extractFaqs(html);
	assert.equal(result.faqs.length, 2);
	assert.match(result.faqs[0].question, /WordPress development trends/i);
	assert.match(result.faqs[1].answerHtml, /separates content management/i);
	console.log('✓ faq-item class + details/summary');
}

{
	const html = '<div class="faq-items"><h2>FAQs</h2><p>No pairs.</p></div>';
	const result = extractFaqs(html);
	assert.deepEqual(result.faqs, []);
	assert.equal(result.before, html);
	console.log('✓ empty faq-items leaves content untouched');
}

{
	const html = [
		'<div class="faq-items">',
		'<h2>FAQs</h2>',
		'What is product page design?',
		'Product page design is the way a product page is organised and displayed.',
		'Why is product page design important for e-commerce?',
		'A good product page design improves the shopping experience.',
		'How to design product pages for conversions?',
		'To design product pages for conversions, focus on making the buying process simple.',
		'How do product images improve conversions?',
		'Clear images allow customers to see product details before buying.',
		'How can I improve my product page performance?',
		'You can improve your product pages by:',
		'<ul>',
		'<li>Speeding up page loading times.</li>',
		'<li>Using better product images.</li>',
		'<li>Writing simple product descriptions.</li>',
		'</ul>',
		'</div>',
	].join('\n');
	const result = extractFaqs(html);
	assert.equal(result.faqs.length, 5);
	assert.equal(result.faqs[0].question, 'What is product page design?');
	assert.match(result.faqs[0].answerHtml, /organised and displayed/i);
	assert.equal(result.faqs[4].question, 'How can I improve my product page performance?');
	assert.match(result.faqs[4].answerHtml, /You can improve your product pages by/i);
	assert.match(result.faqs[4].answerHtml, /<li>Speeding up page loading times\.<\/li>/i);
	assert.ok(!/Why is product page design important/i.test(result.faqs[0].answerHtml));
	console.log('✓ plain CMS faq-items with newline Q/A + list answer');
}

{
	const html = [
		'<div class="faq-items">',
		'<h2>FAQs</h2>',
		'<p>What is product page design?<br>Product page design is the layout of a product page.</p>',
		'<p>Why is product page design important for e-commerce?<br>It improves trust and conversions.</p>',
		'</div>',
	].join('');
	const result = extractFaqs(html);
	assert.equal(result.faqs.length, 2);
	assert.equal(result.faqs[0].question, 'What is product page design?');
	assert.match(result.faqs[0].answerHtml, /layout of a product page/i);
	assert.equal(result.faqs[1].question, 'Why is product page design important for e-commerce?');
	console.log('✓ plain CMS faq-items with br-separated Q/A inside p');
}

{
	const html = [
		'<div class="faq-items">',
		'<h2>FAQs</h2>',
		'<details><summary>What are the 7 C&#8217;s of ecommerce websites?</summary>',
		'<p>Clear, compelling, customer-centric content helps.</p>',
		'</details>',
		'</div>',
	].join('');
	const result = extractFaqs(html);
	assert.equal(result.faqs.length, 1);
	assert.equal(
		result.faqs[0].question,
		'What are the 7 C\u2019s of ecommerce websites?',
	);
	assert.ok(!result.faqs[0].question.includes('&#'), 'question still has raw entity');
	console.log('✓ WordPress &#8217; decoded in FAQ questions');
}

console.log('\nAll extractFaqs tests passed.');
