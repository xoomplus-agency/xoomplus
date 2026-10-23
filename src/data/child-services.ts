/**
 * Child-page Services sections — card grid + scroll stack.
 * Images resolve from /public/images (build-time lookup + ?v=mtime).
 */
import fs from 'node:fs';
import path from 'node:path';
import { withPublicMtimeCacheBust } from './services/images';

export type ChildServicesCardImage = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
};

export type ChildServicesCard = {
	title: string;
	text: string;
	image: ChildServicesCardImage;
};

export type ChildServicesContent = {
	pill?: string;
	heading?: string;
	text?: string;
	cards: ChildServicesCard[];
};

/** Card before image resolution (title + text only). */
export type ChildServicesCardDraft = {
	title: string;
	text: string;
	/** Optional explicit image path (wins over auto lookup). */
	imageSrc?: string;
	imageAlt?: string;
};

export type ChildServicesDraft = {
	pill?: string;
	heading?: string;
	text?: string;
	cards: ChildServicesCardDraft[];
};

export const CHILD_SERVICES_DEFAULT_PILL = 'Services';
export const CHILD_SERVICES_DEFAULT_TEXT =
	'Different industries have different audiences, challenges, and digital opportunities. Our services can be tailored around the needs of your business and the people you want to reach.';

// PLACEHOLDER: replace with real content per card
export const CHILD_SERVICES_CARD_PLACEHOLDER_TEXT =
	'Make your website easier to navigate, understand and use. We plan page structure, user journeys and visual layouts to help visitors find relevant information and take the next step.';

/** Grid card image size (~4 / 2.4). */
export const CHILD_SERVICES_CARD_IMAGE_WIDTH = 800;
export const CHILD_SERVICES_CARD_IMAGE_HEIGHT = 480;
/** Stack card image size (~4 / 2.7). */
export const CHILD_SERVICE_STACK_IMAGE_WIDTH = 800;
export const CHILD_SERVICE_STACK_IMAGE_HEIGHT = 540;
export const CHILD_SERVICES_CARD_IMAGE_FALLBACK = '/images/collaborative-thinking.webp';

const IMAGE_EXTS = ['webp', 'jpg', 'jpeg', 'png', 'avif'] as const;

/**
 * Card grid below Working together (UI/UX seven-card set).
 * Same on all children until per-page assets/content exist.
 */
export const DEFAULT_CHILD_SERVICE_GRID_CARDS: readonly ChildServicesCardDraft[] = [
	'Website UI/UX Design',
	'Mobile App UI/UX Design',
	'Web Application and SaaS Design',
	'CRM and Custom Business Software Design',
	'UI/UX Redesign',
	'Wireframing, Prototyping and Usability Reviews',
	'Design Systems and Reusable Components',
].map((title) => ({
	title,
	// PLACEHOLDER: replace with real content
	text: CHILD_SERVICES_CARD_PLACEHOLDER_TEXT,
}));

/**
 * Scroll stack below Clarity (UI/UX five-card set).
 * Same on all children until per-page assets/content exist.
 */
export const DEFAULT_CHILD_SERVICE_STACK_CARDS: readonly ChildServicesCardDraft[] = [
	{
		title: 'Strategy Before Decoration',
		text: 'We establish the product\'s goals, requirements and user journeys before concentrating on visual details. This helps keep design decisions connected to the purpose of the product.',
	},
	{
		title: 'Your Brand, Reflected in the Interface',
		text: 'We consider typography, colours, layouts and visual consistency to create an experience that reflects your identity without compromising usability.',
	},
	{
		title: 'A Shared Vision Before Development',
		text: 'Building an application or CRM is a significant investment. Wireframes, screen designs and prototypes help turn an idea into something stakeholders can review before development begins. This is particularly useful when a product has complex workflows or several people need to agree on how it should work',
	},
	{
		title: 'Work With Your Own Development Team',
		text: 'You do not have to commission development from XoomPlus to use our design service. If you already have developers or plan to hire a separate team, the agreed design deliverables can act as a visual brief for your project. You can show prospective developers the intended screens, workflows and interactions rather than relying solely on written descriptions or reference websites.',
	},
	{
		title: 'Clear Communication and Collaboration',
		text: 'We encourage feedback at the relevant stages so that questions and gaps can be addressed as the design develops. The aim is to keep the work aligned with your agreed requirements and give you a clear understanding of the proposed experience.',
	},
] as const;

export function slugifyServiceCardTitle(title: string): string {
	return title
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** Slug variants so `ui-ux` / `uiux` and review/reviews both match files on disk. */
export function serviceCardImageSlugCandidates(title: string): string[] {
	const base = slugifyServiceCardTitle(title);
	const variants = new Set<string>([base]);
	if (base.includes('ui-ux')) variants.add(base.replaceAll('ui-ux', 'uiux'));
	if (base.includes('uiux')) variants.add(base.replaceAll('uiux', 'ui-ux'));
	if (base.endsWith('-review')) variants.add(`${base}s`);
	if (base.endsWith('-reviews')) variants.add(base.slice(0, -1));
	return [...variants];
}

function publicImagesDir(): string {
	return path.join(process.cwd(), 'public', 'images');
}

/**
 * Case-insensitive lookup in /public/images for `<slug>.<ext>`.
 * Re-reads the directory every call (no module-level cache).
 */
export function findPublicImageBySlug(slug: string): string | null {
	const dir = publicImagesDir();
	if (!fs.existsSync(dir)) return null;

	const files = fs.readdirSync(dir);
	const byLower = new Map(files.map((name) => [name.toLowerCase(), name]));

	for (const ext of IMAGE_EXTS) {
		const actual = byLower.get(`${slug}.${ext}`.toLowerCase());
		if (actual) return `/images/${actual}`;
	}
	return null;
}

export type ResolvedServiceCardImage = {
	src: string;
	path: string;
	found: boolean;
	expectedSlugs: string[];
};

export function resolveServiceCardImage(title: string, explicitSrc?: string): ResolvedServiceCardImage {
	if (explicitSrc) {
		const pathOnly = explicitSrc.split('?')[0] ?? explicitSrc;
		return {
			path: pathOnly,
			src: withPublicMtimeCacheBust(pathOnly),
			found: true,
			expectedSlugs: serviceCardImageSlugCandidates(title),
		};
	}

	const expectedSlugs = serviceCardImageSlugCandidates(title);
	for (const slug of expectedSlugs) {
		const hit = findPublicImageBySlug(slug);
		if (hit) {
			return {
				path: hit,
				src: withPublicMtimeCacheBust(hit),
				found: true,
				expectedSlugs,
			};
		}
	}

	return {
		path: CHILD_SERVICES_CARD_IMAGE_FALLBACK,
		src: withPublicMtimeCacheBust(CHILD_SERVICES_CARD_IMAGE_FALLBACK),
		found: false,
		expectedSlugs,
	};
}

/** Grid below Working together. */
export function defaultChildServicesDraft(): ChildServicesDraft {
	return {
		pill: CHILD_SERVICES_DEFAULT_PILL,
		text: CHILD_SERVICES_DEFAULT_TEXT,
		cards: DEFAULT_CHILD_SERVICE_GRID_CARDS.map((card) => ({ ...card })),
	};
}

/** Scroll stack below Clarity. */
export function defaultChildServiceStackDraft(): ChildServicesDraft {
	return {
		pill: CHILD_SERVICES_DEFAULT_PILL,
		text: CHILD_SERVICES_DEFAULT_TEXT,
		cards: DEFAULT_CHILD_SERVICE_STACK_CARDS.map((card) => ({ ...card })),
	};
}

type ResolveOptions = {
	imageWidth?: number;
	imageHeight?: number;
};

/** Resolve draft → content with cache-busted image paths. */
export function resolveChildServicesContent(
	draft: ChildServicesDraft,
	shortName: string,
	options: ResolveOptions = {},
): { content: ChildServicesContent; missing: { title: string; expected: string[] }[] } {
	const missing: { title: string; expected: string[] }[] = [];
	const width = options.imageWidth ?? CHILD_SERVICES_CARD_IMAGE_WIDTH;
	const height = options.imageHeight ?? CHILD_SERVICES_CARD_IMAGE_HEIGHT;

	const cards: ChildServicesCard[] = draft.cards.map((card) => {
		const resolved = resolveServiceCardImage(card.title, card.imageSrc);
		if (!resolved.found) {
			missing.push({
				title: card.title,
				expected: resolved.expectedSlugs.flatMap((slug) =>
					IMAGE_EXTS.map((ext) => `${slug}.${ext}`),
				),
			});
		}
		return {
			title: card.title,
			text: card.text,
			image: {
				src: resolved.src,
				alt: card.imageAlt ?? card.title,
				width,
				height,
			},
		};
	});

	return {
		content: {
			pill: draft.pill ?? CHILD_SERVICES_DEFAULT_PILL,
			heading: draft.heading ?? `Our ${shortName} Services`,
			text: draft.text ?? CHILD_SERVICES_DEFAULT_TEXT,
			cards,
		},
		missing,
	};
}
