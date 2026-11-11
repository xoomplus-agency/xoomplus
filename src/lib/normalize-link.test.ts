import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { normalizeLinkHref } from './normalize-link';

describe('normalizeLinkHref', () => {
	const currentUrl = new URL('https://xoomplus.co.uk/about/');

	it('removes same-page fragments and retains the scroll target', () => {
		assert.deepEqual(normalizeLinkHref('#contact', currentUrl), {
			href: '/about/',
			scrollTarget: 'contact',
		});
	});

	it('removes fragments from internal page links and preserves their target', () => {
		assert.deepEqual(normalizeLinkHref('/contact#enquiry-form', currentUrl), {
			href: '/contact/',
			scrollTarget: 'enquiry-form',
		});
	});

	it('removes fragments from external URLs without treating them as scroll targets', () => {
		assert.deepEqual(
			normalizeLinkHref('https://example.com/page#section', currentUrl),
			{ href: 'https://example.com/page' },
		);
	});

	it('leaves links without fragments unchanged', () => {
		assert.deepEqual(normalizeLinkHref('/contact/', currentUrl), {
			href: '/contact/',
		});
	});

	it('strips bare hash-only hrefs without inventing a scroll target', () => {
		assert.deepEqual(normalizeLinkHref('#', currentUrl), {
			href: '/about/',
		});
	});
});
