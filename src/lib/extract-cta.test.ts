/**
 * Run: npx --yes tsx src/lib/extract-cta.test.ts
 */
import assert from 'node:assert/strict';
import { extractCta } from './extract-cta.ts';
import { cleanWpPostHtml } from './wp-content.ts';

// --- Two lines + link on its own ---
{
	const html = `
		<p>Before CTA.</p>
		<div class="cta-section">
			<p>Ready to grow your pipeline?</p>
			<p>We will map the quickest path from where you are to where you want to be.</p>
			<a href="/contact">Discuss your project</a>
		</div>
		<p>After CTA.</p>
	`;
	const result = extractCta(html);
	assert.ok(result.cta, 'expected cta');
	assert.equal(result.cta.heading, 'Ready to grow your pipeline?');
	assert.equal(
		result.cta.text,
		'We will map the quickest path from where you are to where you want to be.',
	);
	assert.equal(result.cta.href, '/contact');
	assert.equal(result.cta.buttonLabel, 'Discuss your project');
	assert.ok(result.html.includes('Before CTA'));
	assert.ok(result.html.includes('After CTA'));
	assert.ok(!/cta-section/i.test(result.html), 'cta-section removed from html');
	assert.ok(!result.html.includes('Discuss your project'), 'button label not left in prose');
	console.log('✓ two lines + standalone link');
}

// --- Link inside the text line (href → button, text stays without URL chrome) ---
{
	const html = `
		<div class="cta-section">
			<h2>Let's build something better.</h2>
			<p>Start with a short call — <a href="https://xoomplus.co.uk/contact/">Book a call</a> today.</p>
		</div>
	`;
	const result = extractCta(html);
	assert.ok(result.cta);
	assert.equal(result.cta.heading, "Let's build something better.");
	assert.equal(result.cta.text, 'Start with a short call — Book a call today.');
	assert.equal(result.cta.href, 'https://xoomplus.co.uk/contact/');
	assert.equal(result.cta.buttonLabel, 'Book a call');
	assert.ok(!/cta-section/i.test(result.html));
	console.log('✓ link inside text → button href + label');
}

// --- Survives WP cleaner ---
{
	const raw = `
		<div class="elementor-widget-container">
			<div class="cta-section" style="background:red">
				<p>Heading from CMS</p>
				<p>Supporting line from CMS</p>
				<a href="/contact#form">Talk to us</a>
			</div>
		</div>
	`;
	const cleaned = cleanWpPostHtml(raw);
	assert.ok(cleaned.includes('cta-section'), 'cleaner keeps cta-section');
	const result = extractCta(cleaned);
	assert.ok(result.cta);
	assert.equal(result.cta.heading, 'Heading from CMS');
	assert.equal(result.cta.text, 'Supporting line from CMS');
	assert.equal(result.cta.href, '/contact#form');
	assert.equal(result.cta.buttonLabel, 'Talk to us');
	console.log('✓ cleaner preserves cta-section for extract');
}

// --- No CTA ---
{
	const html = '<p>Just a post.</p><h2>Section</h2>';
	const result = extractCta(html);
	assert.equal(result.cta, null);
	assert.equal(result.html, html);
	console.log('✓ no cta-section leaves html unchanged');
}

// --- H2 CTA marker (live WP pattern on /digital-marketing/test/) ---
{
	const html = `
		<p>Before.</p>
		<h2>CTA</h2>
		<p>Want to make your website easier to navigate and use? <a href="https://xoomplus.co.uk/contact/">Talk to Xoom Plus</a> about improving your website usability today.</p>
		<h2>FAQs</h2>
		<p><b>Question?</b></p>
	`;
	const result = extractCta(html);
	assert.ok(result.cta, 'expected cta from H2 marker');
	assert.equal(
		result.cta.heading,
		'Want to make your website easier to navigate and use?',
	);
	assert.match(result.cta.text, /Talk to Xoom Plus about improving/);
	assert.ok(!result.cta.text.includes('<a'), 'no anchor left in text');
	assert.equal(result.cta.href, 'https://xoomplus.co.uk/contact/');
	assert.equal(result.cta.buttonLabel, 'Talk to Xoom Plus');
	assert.ok(result.html.includes('Before.'));
	assert.ok(result.html.includes('FAQs'));
	assert.ok(!/>\s*CTA\s*</i.test(result.html), 'CTA marker removed');
	console.log('✓ H2 CTA marker + single paragraph with link');
}

// --- H2 CTA with two lines ---
{
	const html = `
		<h2>CTA</h2>
		<p>Ready to grow your pipeline?</p>
		<p>We will map the path. <a href="/contact">Discuss your project</a></p>
		<h2>FAQs</h2>
	`;
	const result = extractCta(html);
	assert.ok(result.cta);
	assert.equal(result.cta.heading, 'Ready to grow your pipeline?');
	assert.match(result.cta.text, /We will map the path/);
	assert.equal(result.cta.href, '/contact');
	assert.equal(result.cta.buttonLabel, 'Discuss your project');
	console.log('✓ H2 CTA marker + heading + text lines');
}

console.log('\nAll extract-cta tests passed.');
