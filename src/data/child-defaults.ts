import type { ChildClarityData, ServiceFeaturesData } from './services/types';
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
					tag: 'On-Page SEO · Website Redesign',
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
export const defaultChildServicesBehind: ServicesBehindSection = servicesBehind;

// DEFAULT: replace per child service when real content is ready
const childServiceFaq = getFaqSet('child-service');
export const defaultChildFaq: FaqSet = {
	pill: childServiceFaq?.pill ?? FAQ_DEFAULTS.pill,
	heading: childServiceFaq?.heading ?? FAQ_DEFAULTS.heading,
	text: childServiceFaq?.text ?? FAQ_DEFAULTS.text,
	items: (childServiceFaq?.items ?? []).map((item) => ({ ...item })),
};
