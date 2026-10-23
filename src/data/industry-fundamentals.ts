export type IndustryFundamentalsItem = {
	icon: string;
	title: string;
	text: string;
};

export type IndustryFundamentalsSection = {
	id: string;
	pill: string;
	title: string;
	text: string;
	items: IndustryFundamentalsItem[];
	cta: {
		text: string;
		label: string;
		href: string;
	};
};

export const industryFundamentals: IndustryFundamentalsSection = {
	id: 'fundamentals',
	pill: 'Strategic Roadmap',
	title: 'Start with the Customer Journey. Not a Disconnected List of Channels',
	text: 'Digital marketing works best when it reflects how real people make decisions in your industry.',
	items: [
		{
			icon: 'be-found',
			title: 'Be Found',
			text: 'Show up when potential clients in Manchester and across the UK search for your services on Google or AI search tools.',
		},
		{
			icon: 'bring-your-brand-into-focus',
			title: 'Be Understood',
			text: 'Explain what you do clearly, showcase real proof and answer buyer questions upfront so visitors feel secure.',
		},
		{
			icon: 'make-the-next-step-clear',
			title: 'Make It Easy to Act',
			text: 'Give clients simple ways to call, book an appointment or request a quote without friction.',
		},
	],
	cta: {
		text: 'Not sure which stage your website is missing right now?',
		label: 'Request an Opportunity Audit',
		href: '/contact',
	},
};
