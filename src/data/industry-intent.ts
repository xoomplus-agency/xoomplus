export type IndustryIntentItem = {
	title: string;
	text: string;
};

export type IndustryIntentCard = {
	eyebrow: string;
	title: string;
	items: IndustryIntentItem[];
};

export type IndustryIntentSection = {
	id: string;
	pill: string;
	title: string;
	text: string;
	cards: IndustryIntentCard[];
};

export const industryIntent: IndustryIntentSection = {
	id: 'local-intent',
	pill: 'Local intent. Considered decisions.',
	title: 'From a nearby search to a worthwhile conversation',
	text: 'For trade and project-led businesses, useful digital work could connect the area you serve, the work you do and the enquiry you want.',
	cards: [
		{
			eyebrow: 'Home & Trade Services',
			title: 'Be found when the need is local.',
			items: [
				{ title: 'Show up for relevant areas', text: 'Local SEO + On-Page SEO' },
				{ title: 'Explain the job and the next step', text: 'Landing Page Design + UI/UX Design' },
				{ title: 'Connect a search to a quote', text: 'PPC & Google Ads + landing page alignment' },
			],
		},
		{
			eyebrow: 'Property & Construction',
			title: 'Make the work easier to understand.',
			items: [
				{ title: 'Show projects in context', text: 'Web Design & Development' },
				{ title: 'Answer practical project questions', text: 'SEO Content Marketing + On-Page SEO' },
				{ title: 'Focus enquiries on the right work', text: 'PPC & Google Ads + audience research' },
			],
		},
	],
};
