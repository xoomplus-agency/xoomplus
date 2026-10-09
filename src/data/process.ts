/**
 * Home "Our Process" section content.
 * Layout is a 4-column desktop grid with step-specific float animations —
 * supply exactly 4 steps so the connector graphic and stagger stay aligned.
 */

export type OurProcessStep = {
	icon: string;
	title: string;
	description: string;
	width?: number;
	height?: number;
};

export type OurProcessContent = {
	pill: string;
	title: string;
	intro: string;
	/** Exactly 4 steps — desktop grid + connector SVG expect four columns. */
	steps: [OurProcessStep, OurProcessStep, OurProcessStep, OurProcessStep];
	bgImage: string;
};

export const defaultProcess: OurProcessContent = {
	pill: 'OUR PROCESS',
	title: 'A Clear Process From First Conversation to Ongoing Improvement',
	intro:
		'We keep the process straightforward so you always know what happens next. From the first conversation through strategy, implementation, and reporting, every stage has a clear purpose.',
	steps: [
		{
			icon: '/icons/discovery-call.svg',
			width: 214,
			height: 190,
			title: 'Discovery Call',
			description:
				'We start by understanding your business, goals, audience, current challenges, and what you want to achieve.',
		},
		{
			icon: '/icons/audit-and-opportunity-review.svg',
			width: 214,
			height: 190,
			title: 'Audit & Opportunity Review',
			description:
				'We start by understanding your business, goals, audience, current challenges, and what you want to achieve.',
		},
		{
			icon: '/icons/strategy-and-implementation.svg',
			width: 212,
			height: 184,
			title: 'Strategy & Implementation',
			description:
				'We turn the findings into a clear strategy and begin implementing the work across the agreed digital services.',
		},
		{
			icon: '/icons/reporting-and-refinement.svg',
			width: 201,
			height: 171,
			title: 'Reporting & Refinement',
			description:
				'We track progress, review performance, and refine the work based on what we learn.',
		},
	],
	bgImage: '/icons/our-process-svgs-bg-image.svg',
};
