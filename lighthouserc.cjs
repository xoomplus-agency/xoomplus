/**
 * Lighthouse CI budgets — mobile, key templates.
 * Run: npm run lhci (expects a local server on LHCI_URL, default http://127.0.0.1:4321)
 */
const base = (process.env.LHCI_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const blogPost = (process.env.LHCI_BLOG_POST || '').trim();

const urls = [
	`${base}/`,
	`${base}/services/`,
	`${base}/locations/blackburn/`,
	`${base}/blogs/`,
	`${base}/contact/`,
];

if (blogPost) {
	const path = blogPost.startsWith('/') ? blogPost : `/${blogPost}`;
	urls.splice(4, 0, `${base}${path}`);
}

/** @type {Record<string, unknown>} */
module.exports = {
	ci: {
		collect: {
			url: urls,
			numberOfRuns: 3,
			settings: {
				onlyCategories: ['performance'],
				formFactor: 'mobile',
				throttlingMethod: 'simulate',
				screenEmulation: {
					mobile: true,
					width: 412,
					height: 915,
					deviceScaleFactor: 2.625,
					disabled: false,
				},
				emulatedUserAgent:
					'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
			},
		},
		assert: {
			assertions: {
				'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
				'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
				'total-blocking-time': ['error', { maxNumericValue: 150 }],
				'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
				'resource-summary:script:size': ['error', { maxNumericValue: 61440 }],
				'resource-summary:font:count': ['error', { maxNumericValue: 3 }],
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
