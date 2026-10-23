/**
 * Shared factories for nested child-service pages (/services/<main>/<child>).
 */
import type { ChildService } from './types';
import {
	CHILD_SERVICE_HERO_DEFAULT,
	CHILD_SERVICE_HERO_HEIGHT,
	CHILD_SERVICE_HERO_WIDTH,
	childServiceHeroImage,
} from './images';

/** Our Story copy — used as Landing Page Design content and as placeholder for others. */
export const CHILD_PLACEHOLDER_TITLE: [string, string] = [
	'Built around your business.',
	'Not around silos.',
];

export const CHILD_PLACEHOLDER_PARAGRAPHS: [string, string, string] = [
	'A great website should support your marketing. Your marketing should reflect your brand. And every decision should start with your business.',
	'That is the thinking behind XoomPlus. We bring digital marketing, design and development into one conversation, so ideas can move from strategy to execution without losing their purpose along the way.',
	'We see ourselves as a digital partner: curious about your challenges, clear about our thinking and invested in building something useful together.',
];

const WEB_DESIGN_NAME = 'Web Design & Development';

export function makeChildService(
	mainName: string,
	slug: string,
	name: string,
	options: {
		placeholder?: boolean;
		shortName?: string;
		secondaryLabel?: string;
	} = {},
): ChildService {
	const { placeholder = true, shortName, secondaryLabel } = options;
	const imageSrc = childServiceHeroImage(slug);

	return {
		slug,
		name,
		shortName: shortName ?? name,
		secondaryLabel:
			secondaryLabel ??
			(mainName === WEB_DESIGN_NAME
				? 'Explore Our Design Process'
				: 'Explore Our Process'),
		metaTitle: `${name} | ${mainName} | Xoomplus`,
		// PLACEHOLDER: replace with real content
		metaDescription: placeholder
			? `Explore ${name} from Xoomplus — part of our ${mainName} services. Placeholder description.`
			: `${name} from Xoomplus — purposeful digital work shaped around your business, as part of our ${mainName} services.`,
		hero: {
			pill: name,
			titleLines: [...CHILD_PLACEHOLDER_TITLE],
			paragraphs: [...CHILD_PLACEHOLDER_PARAGRAPHS],
			image: {
				src: imageSrc,
				alt: `${name} — illustrative service visual`,
				width: CHILD_SERVICE_HERO_WIDTH,
				height: CHILD_SERVICE_HERO_HEIGHT,
			},
		},
	};
}

/** Resolve hero image URL (preferred per-child file, else default). */
export function resolveChildHeroImage(childSlug: string): string {
	return childServiceHeroImage(childSlug) || CHILD_SERVICE_HERO_DEFAULT;
}
