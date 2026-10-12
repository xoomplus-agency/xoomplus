export type PricingIntroButton = {
	label: string;
	href: string;
};

export type PricingIntroImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type PricingIntroSection = {
	id: string;
	pill: string;
	titleDark: string;
	titleAccent: string;
	paragraphs: string[];
	primaryButton: PricingIntroButton;
	secondaryButton: PricingIntroButton;
	image: PricingIntroImage;
};

export const pricingIntro: PricingIntroSection = {
	id: 'pricing-intro',
	pill: 'Simple, Transparent Pricing',
	titleDark: 'Digital Marketing That',
	titleAccent: 'Fits Your Goals',
	paragraphs: [
		'Choose the services that match your business needs. From SEO and website development to social media marketing and paid search, Xoomplus creates tailored solutions around your goals, audience, and growth opportunities.',
		// PLACEHOLDER: paragraph 2 is a copy, replace with real text
		'Choose the services that match your business needs. From SEO and website development to social media marketing and paid search, Xoomplus creates tailored solutions around your goals, audience, and growth opportunities.',
	],
	primaryButton: { label: 'Get a Custom Quote', href: '/contact' },
	secondaryButton: { label: 'Talk to Our Team', href: '/contact' },
	image: {
		src: '/images/pricing-section-image.webp',
		alt: 'Illustration of marketing dashboards showing brand growth, services and website traffic',
		width: 730,
		height: 707,
	},
};
