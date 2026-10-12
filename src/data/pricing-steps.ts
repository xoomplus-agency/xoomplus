export type PricingStep = {
	number: string;
	title: string;
	text: string;
};

export type PricingStepsSection = {
	id: string;
	title: string;
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
	title: 'A Simple Approach to Getting Started',
	line: {
		src: '/icons/simple-approach-pricing-page.svg',
		width: 1169,
		height: 43,
	},
	steps: [
		{
			number: '1',
			title: 'Tell Us About Your Business',
			text: "Share your goals, current challenges, and what you're looking to achieve.",
		},
		{
			number: '2',
			title: 'We Review Your Needs',
			text: "We'll understand your requirements and identify the services that are most relevant to your business.",
		},
		{
			number: '3',
			title: 'Get a Tailored Recommendation',
			text: "We'll recommend an approach based on your objectives and project requirements.",
		},
		{
			number: '4',
			title: 'Start Growing',
			text: "Once everything is agreed, we'll move forward with the strategy and implementation.",
		},
	],
};
