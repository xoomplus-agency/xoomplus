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
	steps: OurProcessStep[];
	bgImage: string;
};

export const defaultProcess: OurProcessContent = {
	pill: 'OUR PROCESS',
	title: 'A Simple and Straightforward Process for Digital Growth',
	intro:
		'Our digital marketing process has been refined over the years to deliver valuable outcomes for your business.',
	steps: [
		{
			icon: '/icons/discovery-call.svg',
			width: 214,
			height: 190,
			title: 'Discovery Call',
			description:
				'We evaluate your business, customers, competitive positioning and existing digital architecture to determine your primary growth levers.',
		},
		{
			icon: '/icons/audit-and-opportunity-review.svg',
			width: 214,
			height: 190,
			title: 'Audit & Opportunity Review',
			description:
				'We audit organic search footprints, on-site conversion leaks and technical performance to eliminate growth bottlenecks.',
		},
		{
			icon: '/icons/strategy-and-implementation.svg',
			width: 212,
			height: 184,
			title: 'Execution & Deployment',
			description:
				'We deploy coordinated campaigns across all selected channels, combining fast web architecture with targeted ad distribution.',
		},
		{
			icon: '/icons/reporting-and-refinement.svg',
			width: 201,
			height: 171,
			title: 'Optimisation & Reporting',
			description:
				'We assess conversion data, refine campaign efficiency and deliver monthly reviews focused on scale and goals.',
		},
	],
	bgImage: '/icons/our-process-svgs-bg-image.svg',
};

export const seoProcess: OurProcessContent = {
	pill: 'Our SEO Process',
	title: 'A Simple and Clear SEO Process from Start to Growth',
	intro:
		'We follow a step-by-step SEO process, keeping you informed at every stage.',
	steps: [
		{
			icon: '/icons/discovery-call.svg',
			width: 214,
			height: 190,
			title: 'Discovery Call',
			description:
				'We learn about your business, target audience, services and competitors.',
		},
		{
			icon: '/icons/audit-and-opportunity-review.svg',
			width: 214,
			height: 190,
			title: 'Audit & Opportunity Review',
			description:
				'We review your website, search rankings, content and technical performance.',
		},
		{
			icon: '/icons/strategy-and-implementation.svg',
			width: 212,
			height: 184,
			title: 'SEO Strategy & Implementation',
			description:
				'We put the agreed SEO plan into action. This includes improving website content, fixing technical issues and building quality links.',
		},
		{
			icon: '/icons/reporting-and-refinement.svg',
			width: 201,
			height: 171,
			title: 'Optimisation & Reporting',
			description:
				"We track your website's performance, review results and make improvements where needed.",
		},
	],
	bgImage: '/icons/our-process-svgs-bg-image.svg',
};

export const ppcProcess: OurProcessContent = {
	pill: 'Our Process',
	title: 'Our PPC Campaign Management Process',
	intro:
		'As a PPC agency in Manchester, our process combines strategic planning, campaign expertise and data-led optimisation.',
	steps: [
		{
			icon: '/icons/discovery-call.svg',
			width: 214,
			height: 190,
			title: 'Discovery Call',
			description:
				'We understand your business, audience, goals, current advertising challenges and what success looks like.',
		},
		{
			icon: '/icons/audit-and-opportunity-review.svg',
			width: 214,
			height: 190,
			title: 'PPC Audit & Opportunity Review',
			description:
				'We review your existing campaigns, competitors, keywords and account structure to identify improvement areas.',
		},
		{
			icon: '/icons/strategy-and-implementation.svg',
			width: 212,
			height: 184,
			title: 'Strategy & Campaign Implementation',
			description:
				'We create a tailored PPC marketing strategy and implement campaigns designed around your objectives.',
		},
		{
			icon: '/icons/reporting-and-refinement.svg',
			width: 201,
			height: 171,
			title: 'Reporting & Refinement',
			description:
				'We monitor performance, analyse results and continuously improve campaigns based on real data.',
		},
	],
	bgImage: '/icons/our-process-svgs-bg-image.svg',
};

export const socialMediaProcess: OurProcessContent = {
	pill: 'Our Process',
	title: 'Our Clear Process of Social Media Marketing',
	intro:
		'Our social media experts keep the process simple so you always understand what happens next. From discovery, campaign management and reporting, every stage has a clear purpose.',
	steps: [
		{
			icon: '/icons/discovery-call.svg',
			width: 214,
			height: 190,
			title: 'Competitor Analysis',
			description:
				'We analyse your competitors, industry trends and current market landscape to identify opportunities and create a stronger social media marketing direction.',
		},
		{
			icon: '/icons/audit-and-opportunity-review.svg',
			width: 214,
			height: 190,
			title: 'Audience & Persona Research',
			description:
				'We identify your ideal customers, understand their behaviours, interests and needs to create content and campaigns that connect with the right audience.',
		},
		{
			icon: '/icons/strategy-and-implementation.svg',
			width: 212,
			height: 184,
			title: 'Campaign Setup & Implementation',
			description:
				'We turn insights into action by creating targeted campaigns, developing creative assets and launching strategies across the right social media platforms.',
		},
		{
			icon: '/icons/reporting-and-refinement.svg',
			width: 201,
			height: 171,
			title: 'Reporting & Optimisation',
			description:
				'We track performance, review key metrics and continuously refine campaigns to improve engagement, reach and business results.',
		},
	],
	bgImage: '/icons/our-process-svgs-bg-image.svg',
};

/** Web Design & Development service page Our Process. */
export const webDesignProcess: OurProcessContent = {
	pill: 'Our Process',
	title: 'Our Clear Web Design and Development Process',
	intro:
		'Our process gives your project a clear direction, from initial requirements to launch and handover. Each stage keeps the work aligned with your business goals, technical requirements and agreed scope.',
	steps: [
		{
			icon: '/icons/discovery-call.svg',
			width: 214,
			height: 190,
			title: 'Discovery Call',
			description:
				'We discuss your business goals, target audience, challenges and website requirements.',
		},
		{
			icon: '/icons/audit-and-opportunity-review.svg',
			width: 214,
			height: 190,
			title: 'Audit and Opportunity Review',
			description:
				"We assess your existing website's structure, content and functionality to identify gaps and opportunities for improvement.",
		},
		{
			icon: '/icons/strategy-and-implementation.svg',
			width: 212,
			height: 184,
			title: 'Strategy and Implementation',
			description:
				'We plan and implement the website structure, design and functionality around your requirements.',
		},
		{
			icon: '/icons/reporting-and-refinement.svg',
			width: 201,
			height: 171,
			title: 'Reporting and Refinement',
			description:
				'Key features are tested, identified issues are addressed and recommendations are provided for ongoing improvements.',
		},
	],
	bgImage: '/icons/our-process-svgs-bg-image.svg',
};

/** About page Our Process — does not affect home / services. */
export const aboutProcess: OurProcessContent = {
	pill: 'Our Process',
	title: 'How We Deliver: The 4-Stage Framework',
	intro: 'A 4-Step Proven Process for Sustainable Growth',
	steps: [
		{
			icon: '/icons/discovery-call.svg',
			width: 214,
			height: 190,
			title: 'Discovery Call',
			description:
				'We evaluate your business model, customer margins, competitive positioning and existing digital architecture to determine your primary growth levers.',
		},
		{
			icon: '/icons/audit-and-opportunity-review.svg',
			width: 214,
			height: 190,
			title: 'Audit & Opportunity Review',
			description:
				'We audit organic search footprints, on-site conversion leaks and technical performance to eliminate bottlenecks in your digital growth.',
		},
		{
			icon: '/icons/strategy-and-implementation.svg',
			width: 212,
			height: 184,
			title: 'Execution & Deployment',
			description:
				'We deploy coordinated campaigns across all selected channels, combining fast web architecture with targeted ad distribution.',
		},
		{
			icon: '/icons/reporting-and-refinement.svg',
			width: 201,
			height: 171,
			title: 'Optimisation & Reporting',
			description:
				'We continuously assess conversion data, refine campaign efficiency and deliver monthly reviews focused on scale and goals.',
		},
	],
	bgImage: '/icons/our-process-svgs-bg-image.svg',
};
