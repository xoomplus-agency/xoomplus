/**
 * Run: npx --yes tsx src/lib/wp-content-repair.test.ts
 */
import assert from 'node:assert/strict';
import { cleanWpPostHtml, repairWpHtml } from './wp-content.ts';
import { extractFaqs } from './extract-faqs.ts';

{
	const raw = [
		'<p>Intro about AEO.</p>',
		'<h3>Step 01: Know User Intent</h3>',
		'<p>Before you write.</p>',
		'<ul>',
		'<li>',
		'<h4>i. Research User Questions</h4>',
		'<p>Get real questions. Building a question bank.</li>',
		'<li>',
		'<h4>ii. Analyse Search Intent</h4>',
		'<p>There is a reason behind every query.</li>',
		'</ul>',
		'<h3>Step 02: Create Structured Content</h3>',
		'<p>The content can be smart.</p>',
		'<h2>Conclusion</h2>',
		'<p>Wrap up.</p>',
		'<div class="faq-items">',
		'<h2>FAQs</h2>',
		'<h3><button type="button">How to Optimise for Answer Engines?</button></h3>',
		'Start with question research.',
		'</div>',
	].join('\n');

	const repaired = repairWpHtml(raw);
	assert.match(repaired, /bank\.<\/p><\/li>/i);
	assert.match(repaired, /query\.<\/p><\/li>/i);

	const cleaned = cleanWpPostHtml(raw);
	assert.match(cleaned, /Step 02: Create Structured Content/);
	assert.match(cleaned, /Conclusion/);
	assert.ok(
		cleaned.indexOf('Step 02') < cleaned.indexOf('faq-items') ||
			!cleaned.includes('faq-items') ||
			cleaned.includes('Conclusion'),
		'later sections must remain outside broken list nesting',
	);

	const extracted = extractFaqs(cleaned);
	assert.equal(extracted.faqs.length, 1);
	assert.match(extracted.before, /Step 02: Create Structured Content/);
	assert.match(extracted.before, /Conclusion/);
	assert.match(extracted.before, /Get real questions/);
	assert.ok(!extracted.before.includes('faq-items'));
	assert.ok(!/How to Optimise for Answer Engines/i.test(extracted.before));
	console.log('✓ unclosed <p> in <li> no longer swallows article + FAQs');
}

console.log('\nAll wp-content repair tests passed.');
