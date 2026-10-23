export type ServiceDetailRow = {
	capability: string;
	helps: string;
	/** Third-column body (plain text). Optional when scopeLabel/scopeHref are used instead. */
	scope?: string;
	scopeLabel?: string;
	scopeHref?: string;
	/**
	 * Row arrow href. When omitted, computed from the matching child page under the
	 * main service (Organic Authority). Explicit `undefined` / missing + no match → no arrow.
	 */
	href?: string;
	/** Screen-reader label for the arrow link (Digital Infrastructure). */
	linkLabel?: string;
};

/** Table column width presets for ServiceDetail tables. */
export type ServiceDetailTableCols = 'default' | 'delivery';

/** Table layout (SEO / Web Design detail sections). */
export type ServiceDetailTableItem = {
	layout: 'table';
	id: string;
	pill: string;
	/** One or two heading lines (single-element arrays render as one wrapping line). */
	title: [string] | [string, string];
	intro: string;
	columns: [string, string, string];
	rows: ServiceDetailRow[];
	/** `delivery` = wider third column (Digital Infrastructure). Default = Organic Authority. */
	tableCols?: ServiceDetailTableCols;
	note?: string;
	noteTitle?: string;
	noteButtonLabel?: string;
	noteButtonHref?: string;
};

export type ServiceDetailPairColumnItem = {
	title: string;
	text: string;
};

export type ServiceDetailPairColumn = {
	id: string;
	eyebrow: string;
	title: string;
	text: string;
	items: ServiceDetailPairColumnItem[];
	/** Optional outline-dark CTA under the column items. */
	button?: { label: string; href: string };
};

/** Two-column pair layout (Social & paid media). */
export type ServiceDetailPairItem = {
	layout: 'pair';
	id: string;
	pill: string;
	title: [string, string];
	intro: string;
	columns: ServiceDetailPairColumn[];
};

export type ServiceDetailEntry = ServiceDetailTableItem | ServiceDetailPairItem;

/** Detail sections on /our-services. */
export const servicesDetail: ServiceDetailEntry[] = [
	{
		layout: 'table',
		id: 'seo',
		pill: 'Organic Authority',
		title: ['Be Found for the', 'Right Reasons'],
		intro:
			'Organic search is not about ranking for meaningless vanity keywords. It is about putting your business in front of buyers at the exact moment they need your help. Our search strategies pair strong technical foundations with content people actually read.',
		columns: ['Capability', 'What it helps address', 'Scope to explore'],
		rows: [
			{
				capability: 'AI SEO (GEO & AEO)',
				helps: 'Prepares your site so modern AI search engines (like Google Gemini and ChatGPT Search) recommend your brand when answering user questions.',
				scope: 'Explore AI Search Optimisation',
			},
			{
				capability: 'Local SEO',
				helps: 'Fixes poor regional visibility and helps your business dominate Google Maps and local search results across Manchester and surrounding areas.',
				scope: 'Explore Local Manchester SEO',
			},
			{
				capability: 'Technical SEO',
				helps: 'Resolves slow loading speeds, broken links, indexing errors and mobile issues so Google can crawl and rank your pages effortlessly.',
				scope: 'Explore Technical SEO',
			},
			{
				capability: 'On-Page SEO',
				helps: 'Fixes weak headings, missing meta tags and poor keyword layout so search engines understand the exact commercial purpose of every page.',
				scope: 'Explore On-Page Optimisation',
			},
			{
				capability: 'Link Building (Off-Page)',
				helps: 'Builds your domain authority through high-quality, reputable industry backlinks, helping you outrank established competitors.',
				scope: 'Explore Link Building Services',
			},
			{
				capability: 'E-Commerce SEO',
				helps: 'Fixes low product visibility on Google by optimising category pages, structured product markup and faceted navigation for better sales.',
				scope: 'Explore E-Commerce SEO',
			},
			{
				capability: 'SEO Audit',
				helps: 'Conducts a deep health check of your website to identify what is holding your search traffic back and provides a step-by-step fix roadmap.',
				scope: 'Request an In-Depth SEO Audit',
			},
		],
		noteTitle: 'Not sure where your search visibility is falling short?',
		note: 'An SEO Audit clarifies whether your technical foundations or your content need attention first.',
		noteButtonLabel: 'Book an SEO Audit',
		noteButtonHref: '/contact#contact-form',
	},
	{
		layout: 'pair',
		id: 'social-paid-media',
		pill: 'Demand Creation & Capture',
		title: ['The Right Message. A More', 'Connected Journey.'],
		intro:
			'Social media engages with a broad audience, while paid search captures demand exactly when they are ready to buy. When both run together, your business becomes visible and gains a continuous flow of inbound leads.',
		columns: [
			{
				id: 'social-media',
				eyebrow: 'Social Media Marketing & AI Design',
				title: 'Build Lasting Brand Authority',
				text: 'Bring consistency and purpose to your social presence. We clarify who you want to reach, what you want to say and how that translates into business growth.',
				items: [
					{
						title: 'Content & Creative Direction',
						text: 'Strategic messaging and modern visual creative that reflect your true business quality and resonate with your target market.',
					},
					{
						title: 'AI-Enhanced Visual Design',
						text: 'Fast, high-impact creative production using modern AI design workflows to keep your brand looking fresh and professional across all platforms.',
					},
					{
						title: 'Audience Engagement',
						text: 'Proactive management that turns casual social media attention into qualified brand advocates and inbound inquiries.',
					},
				],
				button: {
					label: 'Explore Social Media Marketing',
					href: '/services/social-media-marketing',
				},
			},
			{
				id: 'ppc',
				eyebrow: 'PPC & Targeted Google Ads',
				title: 'Capture Immediate Commercial Intent',
				text: 'Bring sharp commercial focus to your paid advertising. We align the audience, ad copy and landing pages so every pound spent has a clear purpose.',
				items: [
					{
						title: 'High-Intent Keyword Targeting',
						text: 'Deep research to pinpoint the exact search terms buyers use when looking to hire or purchase right now.',
					},
					{
						title: 'Landing Page Alignment',
						text: 'We match your ads with dedicated landing pages to ensure a seamless user experience that drives high conversion rates.',
					},
					{
						title: 'Transparent Attribution & Refinement',
						text: 'Continuous monitoring and negative keyword clearance to steadily lower your customer acquisition cost.',
					},
				],
				button: {
					label: 'Explore PPC & Google Ads',
					href: '/services/ppc-google-ads',
				},
			},
		],
	},
	{
		layout: 'table',
		id: 'digital-infrastructure',
		pill: 'Digital Infrastructure',
		title: ['Built to Convert. Engineered to Perform.'],
		intro:
			'A website is the commercial foundation that powers your entire marketing setup. If your site is slow, confusing on mobile or difficult to navigate, you lose qualified leads. We design and develop custom platforms where speed, visuals and clear conversions work hand in hand.',
		columns: ['Capability', 'What it fixes', 'Our delivery'],
		tableCols: 'delivery',
		rows: [
			{
				capability: 'UI/UX & Conversion Design',
				helps: 'High bounce rates and confused visitors.',
				scope:
					'Intuitive layout structures, clear typography and clean navigation tailored to how your customers browse, ensuring every page leads to a logical next step.',
				linkLabel: 'Explore UI/UX Design',
				href: '/services/web-design-development/uiux-design',
			},
			{
				capability: 'Custom WordPress & Shopify Engineering',
				helps: 'Slow, fragile site templates that break on updates.',
				scope:
					'Secure, lightweight code built for long-term scalability and effortless in-house content management, without bloated plugins slowing you down.',
				linkLabel: 'Explore Custom Web Development',
				href: undefined,
			},
			{
				capability: 'High-Converting Landing Page Design',
				helps: 'Paid ads that generate clicks but not leads.',
				scope:
					'Dedicated, razor-focused landing pages engineered for PPC and paid social campaigns, built for instant load speeds and clear conversion action.',
				linkLabel: 'Explore Landing Page Design',
				href: '/services/web-design-development/landing-page-design',
			},
			{
				capability: 'Managed Maintenance, Hosting & Security',
				helps: 'Vulnerable sites, server downtime and out-of-date systems.',
				scope:
					'Fast UK-based hosting, daily automated backups, security patches and ongoing speed optimisation to keep your website running smoothly.',
				linkLabel: 'Explore Website Maintenance',
				href: undefined,
			},
		],
	},
];

export function getServiceDetail(id: string): ServiceDetailTableItem | undefined {
	const item = servicesDetail.find((entry) => entry.id === id);
	return item?.layout === 'table' ? item : undefined;
}

export function getServiceDetailPair(id: string): ServiceDetailPairItem | undefined {
	const item = servicesDetail.find((entry) => entry.id === id);
	return item?.layout === 'pair' ? item : undefined;
}
