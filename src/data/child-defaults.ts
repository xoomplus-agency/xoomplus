import type {
	ChildClarityData,
	ServiceFeaturesData,
	ServiceProcessData,
} from './services/types';
import {
	CHILD_PROCESS_IMAGE_DEFAULT,
	CHILD_PROCESS_IMAGE_HEIGHT,
	CHILD_PROCESS_IMAGE_WIDTH,
} from './services/images';
import {
	industryImageTextRows,
	type IndustryFeatureRow,
} from './industry-features';
import { defaultHowWeWork, type HowWeWorkContent } from './how-we-work';
import { servicesBehind, type ServicesBehindSection } from './services-behind';
import { FAQ_DEFAULTS, getFaqSet, type FaqSet } from './faqs';

/**
 * Shared defaults for nested child service pages.
 * Children without their own override use these so no page is empty.
 */

// DEFAULT: replace per child service when real content is ready
export const defaultChildFeatures: ServiceFeaturesData = {
	pill: 'Built around people',
	titleLines: ['Not just how it looks.', 'How it works for you.'],
	text: 'Your website is where your message becomes an experience. We bring design and development into one conversation, so the pages people see and the journeys they take share a clear purpose.',
	items: [
		{
			icon: 'make-the-next-step-clear',
			title: 'Make the next step clear',
			text: 'Help people understand your offer, find what matters and move naturally towards an enquiry or purchase.',
		},
		{
			icon: 'bring-your-brand-into-focus',
			title: 'Bring your brand into focus',
			text: 'Create a consistent visual language that gives your content clarity and your business a recognisable presence.',
		},
		{
			icon: 'think-beyond-one-screen',
			title: 'Think beyond one screen',
			text: 'Shape the experience around the way people browse, from a first mobile visit to a deeper desktop exploration.',
		},
	],
};

// DEFAULT: replace per child service when real content is ready
export const defaultChildProcess: ServiceProcessData = {
	pill: 'Working together',
	titleLines: ['Good work starts', 'with a good partnership.'],
	image: {
		src: CHILD_PROCESS_IMAGE_DEFAULT,
		alt: 'Watercolour sketches of website wireframes on paper',
		width: CHILD_PROCESS_IMAGE_WIDTH,
		height: CHILD_PROCESS_IMAGE_HEIGHT,
	},
	items: [
		{
			title: 'A scope shaped around your needs',
			text: 'Agree the pages, platform requirements and handover before the build. A shared brief keeps the work focused and makes decisions easier.',
		},
		{
			title: 'A shared view of the work',
			text: 'Bring your brand assets, content and business knowledge into the conversation. Review the direction together as the website takes shape.',
		},
		{
			title: 'A considered handover',
			text: 'Discuss content management and the practical information you need to take ownership of the website. Any ongoing support can be scoped separately.',
		},
	],
	note: 'A useful starting point: your existing website, your goals, the pages you need and any content or brand assets you already have.',
};

// DEFAULT: replace per child service when real content is ready
export const defaultChildClarity: ChildClarityData = {
	id: 'clarity',
	pill: 'Clarity before the enquiry',
	title: 'Make complex services easier to understand.',
	text: 'When people need to make a considered decision, clear information and a purposeful next step matter more than noise.',
	columns: [
		{
			title: 'Medical Reporting',
			eyebrow: 'Local visibility · Quote enquiries',
			text: 'Help potential referrers and enquirers understand your reporting services, coverage and enquiry requirements.',
			items: [
				{
					title: 'Explain the service clearly',
					text: 'Organise service pages around report types, how an enquiry begins and what information your team needs.',
					tag: 'UI/UX Design · WordPress Development',
				},
				{
					title: 'Connect discovery to a quote request',
					text: 'Align location and service content with clear contact routes, without asking visitors to navigate unnecessary steps.',
					tag: 'Local SEO · On-Page SEO · Landing Page Design',
				},
			],
		},
		{
			title: 'Legal',
			eyebrow: 'Authority building · Qualified enquiries',
			text: 'Give visitors a clear view of your practice areas and help them find the most relevant route to your team.',
			items: [
				{
					title: 'Build an informative first impression',
					text: 'Structure practice-area pages and useful articles around the questions prospective enquirers are asking.',
					tag: 'SEO Content Marketing · Website Redesign',
				},
				{
					title: 'Make the next step specific',
					text: 'Bring search intent, campaign messaging and enquiry pages together around the services you want to communicate.',
					tag: 'PPC & Google Ads · Landing Page Design',
				},
			],
		},
	],
	note: 'Your subject experts review service information and any professional or regulatory wording. We shape the digital experience around that approved content.',
};

// DEFAULT: replace per child service when real content is ready
export const defaultChildRows: IndustryFeatureRow[] = industryImageTextRows.map(
	(row) => ({
		...row,
		image: { ...row.image },
		paragraphs: [...row.paragraphs] as IndustryFeatureRow['paragraphs'],
		titleLines: [...row.titleLines] as [string, string],
	}),
);

// DEFAULT: replace per child service when real content is ready
export const defaultChildHowWeWork: HowWeWorkContent = {
	...defaultHowWeWork,
	titleLines: [...defaultHowWeWork.titleLines] as HowWeWorkContent['titleLines'],
	introLines: [...defaultHowWeWork.introLines] as HowWeWorkContent['introLines'],
	images: [
		{ ...defaultHowWeWork.images[0] },
		{ ...defaultHowWeWork.images[1] },
	],
	cards: [
		{ ...defaultHowWeWork.cards[0] },
		{ ...defaultHowWeWork.cards[1] },
		{ ...defaultHowWeWork.cards[2] },
	],
};

// DEFAULT: replace per child service when real content is ready
export const defaultChildServicesBehind: ServicesBehindSection = servicesBehind;

// DEFAULT: replace per child service when real content is ready
const childServiceFaq = getFaqSet('child-service');
export const defaultChildFaq: FaqSet = {
	pill: childServiceFaq?.pill ?? FAQ_DEFAULTS.pill,
	heading: childServiceFaq?.heading ?? FAQ_DEFAULTS.heading,
	text: childServiceFaq?.text ?? FAQ_DEFAULTS.text,
	items: (childServiceFaq?.items ?? []).map((item) => ({ ...item })),
};
