export type PricingStep = {
	number: string;
	title: string;
	text: string;
};

export type PricingStepsSection = {
	id: string;
	title: string;
	text: string;
	steps: PricingStep[];
	/** Connecting dashed wave behind the badges */
	line: {
		src: string;
		width: number;
		height: number;
	};
};

export const pricingSteps: PricingStepsSection = {
	id: 'pricing-steps',
	title: 'A Simple, Straightforward Approach to Getting Started',
	text: 'No complicated onboarding or unnecessary delays. Just a transparent process designed to get your business growing digitally.',
	line: {
		src: '/icons/simple-approach-pricing-page.svg',
		width: 1169,
		height: 43,
	},
	steps: [
		{
			number: '01',
			title: 'Discovery Call',
			text: 'We evaluate your business model, customer margins, competitive positioning and existing digital architecture to determine your primary growth levers.',
		},
		{
			number: '02',
			title: 'Audit & Opportunity Review',
			text: 'We audit organic search footprints, on-site conversion leaks and technical performance to eliminate bottlenecks in your digital growth.',
		},
		{
			number: '03',
			title: 'Execution & Deployment',
			text: 'We deploy coordinated campaigns across all selected channels, combining fast web architecture with targeted ad distribution.',
		},
		{
			number: '04',
			title: 'Optimisation & Reporting',
			text: 'We continuously assess conversion data, refine campaign efficiency and deliver monthly reviews focused on scale and goals.',
		},
	],
};
