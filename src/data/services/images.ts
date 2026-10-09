/**
 * Service page images — preferred paths with fallbacks so missing assets never 404.
 *
 * Convention for new services:
 *   /images/<slug>-hero-image.webp
 *   /images/<slug>-showcase-image.webp
 *   /images/<slug>-working-together-image.webp
 *
 * Web Design keeps legacy filenames (see WEB_DESIGN_* constants).
 */
import fs from 'node:fs';
import path from 'node:path';

/** Current Web Design panel image (used until web-design-and-development-hero-image.webp lands). */
export const WEB_DESIGN_HERO_IMAGE = '/images/main-service-hero-glass-image.webp';
/** Current Web Design showcase image. */
export const WEB_DESIGN_SHOWCASE_IMAGE = '/images/one-connected-experience-image.webp';
/** Current Web Design process image. */
export const WEB_DESIGN_PROCESS_IMAGE = '/images/working-together-image.webp';

/** Expected final Web Design hero path (not yet in public/). */
export const WEB_DESIGN_HERO_PREFERRED = '/images/web-design-and-development-hero-image.webp';
/** Expected final Web Design showcase path (not yet in public/). */
export const WEB_DESIGN_SHOWCASE_PREFERRED =
	'/images/web-design-development-showcase-image.webp';

function publicFileExists(publicUrl: string): boolean {
	const relative = publicUrl.replace(/^\//, '');
	return fs.existsSync(path.join(process.cwd(), 'public', relative));
}

/** Use `preferred` when the file exists under public/; otherwise `fallback`. */
export function serviceImage(preferred: string, fallback: string): string {
	return publicFileExists(preferred) ? preferred : fallback;
}

export function serviceHeroImage(slug: string): string {
	if (slug === 'web-design-development') {
		return serviceImage(WEB_DESIGN_HERO_PREFERRED, WEB_DESIGN_HERO_IMAGE);
	}
	return serviceImage(`/images/${slug}-hero-image.webp`, WEB_DESIGN_HERO_IMAGE);
}

export function serviceShowcaseImage(slug: string): string {
	if (slug === 'web-design-development') {
		return serviceImage(WEB_DESIGN_SHOWCASE_PREFERRED, WEB_DESIGN_SHOWCASE_IMAGE);
	}
	return serviceImage(`/images/${slug}-showcase-image.webp`, WEB_DESIGN_SHOWCASE_IMAGE);
}

export function serviceProcessImage(slug: string): string {
	if (slug === 'web-design-development') {
		return WEB_DESIGN_PROCESS_IMAGE;
	}
	return serviceImage(
		`/images/${slug}-working-together-image.webp`,
		WEB_DESIGN_PROCESS_IMAGE,
	);
}

/** Default child-service hero (708×458). Per-child: /images/<child-slug>-hero-image.webp */
export const CHILD_SERVICE_HERO_DEFAULT = '/images/single-service-hero-image.webp';
export const CHILD_SERVICE_HERO_WIDTH = 708;
export const CHILD_SERVICE_HERO_HEIGHT = 458;

export function childServiceHeroImage(childSlug: string): string {
	return serviceImage(`/images/${childSlug}-hero-image.webp`, CHILD_SERVICE_HERO_DEFAULT);
}

/** Default child "Working together" image (620×397). Per-child: /images/<child-slug>-collaborative-thinking.webp */
export const CHILD_PROCESS_IMAGE_DEFAULT = '/images/collaborative-thinking.webp';
export const CHILD_PROCESS_IMAGE_WIDTH = 620;
export const CHILD_PROCESS_IMAGE_HEIGHT = 397;

export function childProcessImage(childSlug: string): string {
	return serviceImage(
		`/images/${childSlug}-collaborative-thinking.webp`,
		CHILD_PROCESS_IMAGE_DEFAULT,
	);
}

/** Default child image-text-row images (from Industries). */
export const CHILD_ROW_TURN_INTEREST_DEFAULT = '/images/turn-interest-into-a-reason.webp';
export const CHILD_ROW_LET_THE_DETAILS_DEFAULT = '/images/let-the-details-do-talking.webp';

export function childTurnInterestImage(childSlug: string): string {
	return serviceImage(
		`/images/${childSlug}-turn-interest.webp`,
		CHILD_ROW_TURN_INTEREST_DEFAULT,
	);
}

export function childLetTheDetailsImage(childSlug: string): string {
	return serviceImage(
		`/images/${childSlug}-let-the-details.webp`,
		CHILD_ROW_LET_THE_DETAILS_DEFAULT,
	);
}

/** Default How we work images (About). Per-child: /images/<slug>-how-we-work-1.webp / -2.webp */
export const CHILD_HOW_WE_WORK_1_DEFAULT = '/images/how-we-work-1.webp';
export const CHILD_HOW_WE_WORK_2_DEFAULT = '/images/how-we-work-2.webp';

export function childHowWeWorkImage(childSlug: string, index: 1 | 2): string {
	const fallback = index === 1 ? CHILD_HOW_WE_WORK_1_DEFAULT : CHILD_HOW_WE_WORK_2_DEFAULT;
	return serviceImage(`/images/${childSlug}-how-we-work-${index}.webp`, fallback);
}
