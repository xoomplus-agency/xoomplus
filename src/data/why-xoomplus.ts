export type WhyXoomplusCard = {
	icon: string;
	title: string;
	text: string;
};

export type WhyXoomplusButton = {
	label: string;
	href: string;
};

export type WhyXoomplusContent = {
	id: string;
	pill: string;
	title: string;
	text: string;
	cards: WhyXoomplusCard[];
	button?: WhyXoomplusButton;
};

/** Home page Why Xoomplus — word for word from the previous hardcoded section. */
export const defaultWhyXoomplus: WhyXoomplusContent = {
	id: 'why-xoomplus',
	pill: 'Why Xoomplus',
	title: 'A Strategic Partner for Digital Growth',
	text: '6 Reasons Why Ambitious UK Brands Choose Xoomplus Over Everyone Else',
	cards: [
		{
			icon: '/icons/strategy-first.svg',
			title: 'Audit & Research',
			text: 'We conduct thorough research to understand your audience, competitors, trends and gaps before we do anything.',
		},
		{
			icon: '/icons/experienced-team.svg',
			title: 'The A Team',
			text: 'Each member of Xoomplus has a strong portfolio and years of experience to deliver premium service and the results you need.',
		},
		{
			icon: '/icons/clear-reporting.svg',
			title: 'Transparent Reporting',
			text: 'Transparency is our non-negotiable practice. We ensure clear and transparent communication from the start.',
		},
		{
			icon: '/icons/tailored-strategies.svg',
			title: 'Tailored Plans',
			text: 'Every business is a unique idea and has distinct digital needs. We craft tailored plans that reflect your unique business needs.',
		},
		{
			icon: '/icons/result-focused.svg',
			title: 'Focused Efforts',
			text: 'Everything we do has a clear purpose and goal. That is why our efforts don’t waver, and our results aren’t delayed.',
		},
		{
			icon: '/icons/long-term-growth.svg',
			title: 'Lasting Growth',
			text: 'We deliver immediate outcomes that also form the foundation for long-term digital growth.',
		},
	],
	button: { label: 'Let’s Talk', href: '#contact' },
};
