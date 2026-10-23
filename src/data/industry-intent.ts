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
	pill: 'Connecting Search to Revenue',
	title: 'From Simple Searches to Commercial Conversation',
	text: 'We link the areas you serve with the practical answers your clients want, turning simple search queries into commercial opportunities.',
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
				{ title: 'Answer practical project questions', text: 'On-Page SEO' },
				{ title: 'Focus enquiries on the right work', text: 'PPC & Google Ads + audience research' },
			],
		},
	],
};
