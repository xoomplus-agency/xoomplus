export type ServiceDetailRow = {
	capability: string;
	helps: string;
	scope: string;
};

/** Table layout (SEO / Web Design detail sections). */
export type ServiceDetailTableItem = {
	layout: 'table';
	id: string;
	pill: string;
	title: [string, string];
	intro: string;
	columns: [string, string, string];
	rows: ServiceDetailRow[];
	note: string;
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
		pill: 'SEO',
		title: ['Be found for the', 'right reasons.'],
		intro:
			'Improve your search visibility, reach the right audience, and create a stronger foundation for long-term organic growth. Our SEO capabilities connect the technical foundations with the content people need.',
		columns: ['Capability', 'What it helps address', 'Scope to explore'],
		rows: [
			{
				capability: 'AI SEO (GEO & AEO)',
				helps: 'Make useful, clearly structured content easier to understand across evolving search experiences.',
				scope: 'Content clarity, question-led structure and search relevance.',
			},
			{
				capability: 'Local SEO',
				helps: 'Help people connect your services with the places you serve.',
				scope: 'Local business information, location relevance and local content.',
			},
			{
				capability: 'Technical SEO',
				helps: 'Look beneath the surface at how your website can be found and understood.',
				scope: 'Crawlability, indexing, site structure and technical priorities.',
			},
			{
				capability: 'On-Page SEO',
				helps: 'Bring each page into focus around the needs of your audience.',
				scope: 'Page titles, headings, internal links and content alignment.',
			},
			{
				capability: 'Link Building (Off-Page)',
				helps: 'Consider how your wider online presence supports search relevance.',
				scope: 'Relevant link opportunities and off-page priorities.',
			},
			{
				capability: 'SEO Audit',
				helps: 'Understand the current picture before deciding what to change.',
				scope: 'A review of issues, opportunities and a prioritised action plan.',
			},
			{
				capability: 'SEO Content Marketing',
				helps: 'Give your audience useful answers at the moments they need them.',
				scope: 'Topic direction, content planning and search-led page content.',
			},
		],
		note: 'Not sure where search is falling short? An SEO Audit can help clarify which foundations and content deserve attention first.',
	},
	{
		layout: 'pair',
		id: 'social-paid-media',
		pill: 'Social & paid media',
		title: ['The right message. A more', 'connected journey.'],
		intro:
			'Connect your message with the right people through thoughtful creative, focused campaigns and continual learning.',
		columns: [
			{
				id: 'social-media',
				eyebrow: '03 / Build the conversation',
				title: 'Social Media Marketing',
				text: 'Bring consistency and purpose to your social presence. Start with who you want to reach, what you want to say and how it connects to your business.',
				items: [
					{
						title: 'Content & creative direction',
						text: 'Explore themes, messages and creative that reflect your brand and feel relevant to your audience.',
					},
					{
						title: 'Campaign planning',
						text: 'Give social activity a clear purpose and connect it with the wider marketing conversation.',
					},
					{
						title: 'Reporting & refinement',
						text: 'Review the response to the work and use what you learn to inform the next round of activity.',
					},
				],
			},
			{
				id: 'ppc',
				eyebrow: '04 / Connect intent with action',
				title: 'PPC & Google Ads',
				text: 'Bring focus to paid activity. Align the audience, the message and the experience after the click, so each campaign has a clear role.',
				items: [
					{
						title: 'Audience & keyword research',
						text: 'Understand who the campaign is for and the needs or intent that should shape the direction.',
					},
					{
						title: 'Landing page alignment',
						text: 'Make the promise in the campaign and the experience on the website feel like one journey.',
					},
					{
						title: 'Reporting & refinement',
						text: 'Keep campaign decisions grounded in a shared view of the activity and the practical priorities.',
					},
				],
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
