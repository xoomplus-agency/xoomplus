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
	pill: 'WHY XOOMPLUS',
	title: 'A Digital Partner Focused on Your Business Goals',
	text: 'Your digital presence should do more than look good. We bring strategy, creativity, technology, and performance together to create digital experiences that support your business objectives.',
	cards: [
		{
			icon: '/icons/strategy-first.svg',
			title: 'Strategy First',
			text: 'We start with your goals, audience, and opportunities before moving into execution.',
		},
		{
			icon: '/icons/experienced-team.svg',
			title: 'Experienced Team',
			text: 'Bring together the expertise needed across design, development, SEO, social media, and digital marketing.',
		},
		{
			icon: '/icons/clear-reporting.svg',
			title: 'Clear Reporting',
			text: 'Understand what is being worked on, what is changing, and where opportunities are developing.',
		},
		{
			icon: '/icons/tailored-strategies.svg',
			title: 'Tailored Strategies',
			text: 'Your business is different, so your digital strategy should be built around your specific needs.',
		},
		{
			icon: '/icons/result-focused.svg',
			title: 'Results Focused',
			text: 'Keep the work connected to meaningful business objectives rather than activity alone.',
		},
		{
			icon: '/icons/long-term-growth.svg',
			title: 'Long-Term Growth',
			text: 'Build digital foundations that can continue to improve as your business grows.',
		},
	],
	button: { label: 'Let’s Talk', href: '#contact' },
};
