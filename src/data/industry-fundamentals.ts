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
	pill: 'Different sectors. Shared fundamentals.',
	title: 'Start with the journey. Not a list of channels.',
	text: 'We connect what people are looking for with what your business can offer. Industry context shapes each step.',
	items: [
		{
			icon: 'be-found',
			title: 'Be found',
			text: 'Understand search intent, locations and audience needs. Choose organic, social or paid activity with a clear purpose.',
		},
		{
			icon: 'bring-your-brand-into-focus',
			title: 'Be understood',
			text: 'Give your services a clear structure, useful content and a consistent message across your website and campaigns.',
		},
		{
			icon: 'make-the-next-step-clear',
			title: 'Make it easy to act',
			text: 'Connect the first click to a relevant enquiry, appointment or booking route, then review the journey together.',
		},
	],
	cta: {
		text: 'Not sure where to begin? Share the challenge — we can explore the right starting point.',
		label: 'Help me choose',
		href: '/contact',
	},
};
