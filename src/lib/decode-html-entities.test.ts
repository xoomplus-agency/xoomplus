import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { decodeHtmlEntities } from './decode-html-entities';

describe('decodeHtmlEntities', () => {
	it('decodes numeric apostrophe used by WordPress', () => {
		assert.equal(
			decodeHtmlEntities("What are the 7 C&#8217;s of ecommerce websites?"),
			'What are the 7 C\u2019s of ecommerce websites?',
		);
	});

	it('decodes double-encoded entities', () => {
		assert.equal(decodeHtmlEntities('C&amp;#8217;s'), 'C\u2019s');
	});

	it('decodes named curly quotes', () => {
		assert.equal(decodeHtmlEntities('it&rsquo;s'), 'it\u2019s');
	});

	it('leaves plain text alone', () => {
		assert.equal(decodeHtmlEntities("C's"), "C's");
	});
});
