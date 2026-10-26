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
/** Shared main-service “Working together” image (legacy working-together-image.webp removed). */
export const WEB_DESIGN_PROCESS_IMAGE = '/images/collaborative-thinking.webp';

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

/**
 * Default child-service hero (708×458).
 * Lookup (build/dev, re-scanned each call):
 *   1. /images/<slug>-hero-image.<ext>
 *   2. /images/<slug>-hero.<ext>
 *   3. /images/<slug>.<ext>
 * Also tries uiux ↔ ui-ux slug variants (e.g. uiux-design → ui-ux-design.webp).
 * Extensions: webp, jpg, jpeg, png, avif (case-insensitive). Cache-bust ?v=mtime.
 */
export const CHILD_SERVICE_HERO_DEFAULT = '/images/single-service-hero-image.webp';
export const CHILD_SERVICE_HERO_WIDTH = 708;
export const CHILD_SERVICE_HERO_HEIGHT = 458;

const CHILD_HERO_EXTS = ['webp', 'jpg', 'jpeg', 'png', 'avif'] as const;

/** Legacy asset prefixes kept after URL slug renames. */
const CHILD_HERO_SLUG_ALIASES: Record<string, string[]> = {
	'ai-seo': ['ai-seo-geo-and-aeo'],
	'link-building': ['link-building-off-page'],
	'ui-ux-design': ['uiux-design'],
	'uiux-design': ['ui-ux-design'],
};

function childHeroSlugCandidates(childSlug: string): string[] {
	const variants = new Set<string>([childSlug]);
	if (childSlug.includes('uiux')) variants.add(childSlug.replaceAll('uiux', 'ui-ux'));
	if (childSlug.includes('ui-ux')) variants.add(childSlug.replaceAll('ui-ux', 'uiux'));
	for (const alias of CHILD_HERO_SLUG_ALIASES[childSlug] ?? []) {
		variants.add(alias);
	}
	return [...variants];
}

function findChildHeroImageAuto(childSlug: string): string | null {
	const dir = publicImagesDir();
	if (!fs.existsSync(dir)) return null;

	const files = fs.readdirSync(dir);
	const byLower = new Map(files.map((name) => [name.toLowerCase(), name]));

	for (const slug of childHeroSlugCandidates(childSlug)) {
		for (const stem of [`${slug}-hero-image`, `${slug}-hero`, slug]) {
			for (const ext of CHILD_HERO_EXTS) {
				const actual = byLower.get(`${stem}.${ext}`.toLowerCase());
				if (actual) return `/images/${actual}`;
			}
		}
	}
	return null;
}

/** Per-child hero URL with cache-bust, or shared default. */
export function childServiceHeroImage(childSlug: string): string {
	const hit = findChildHeroImageAuto(childSlug);
	const pathOnly = hit ?? CHILD_SERVICE_HERO_DEFAULT;
	return withPublicMtimeCacheBust(pathOnly);
}

/**
 * Default child "Working together" image (~4 / 3.2).
 * Lookup (build/dev, no cross-request cache):
 *   1. child.processImage (caller) wins when set
 *   2. /images/<slug>-working-together.<ext>
 *   3. /images/<slug>-process.<ext>
 *   4. /images/collaborative-thinking.webp
 * Extensions tried: webp, jpg, jpeg, png, avif (case-insensitive).
 */
export const CHILD_PROCESS_IMAGE_DEFAULT = '/images/collaborative-thinking.webp';
export const CHILD_PROCESS_IMAGE_WIDTH = 800;
export const CHILD_PROCESS_IMAGE_HEIGHT = 640;

const CHILD_PROCESS_EXTS = ['webp', 'jpg', 'jpeg', 'png', 'avif'] as const;

export type ChildProcessImageSource = 'data' | 'auto' | 'fallback';

export type ChildProcessImageResolved = {
	/** Public URL with `?v=<mtimeMs>` cache-bust when the file exists. */
	src: string;
	/** Path without query string. */
	path: string;
	source: ChildProcessImageSource;
};

function publicImagesDir(): string {
	return path.join(process.cwd(), 'public', 'images');
}

/** Append `?v=<mtime ms>` so replaced files with the same name bust caches. */
export function withPublicMtimeCacheBust(publicUrl: string): string {
	const clean = publicUrl.split('?')[0] ?? publicUrl;
	const relative = clean.replace(/^\//, '');
	const full = path.join(process.cwd(), 'public', relative);
	try {
		const mtime = Math.floor(fs.statSync(full).mtimeMs);
		return `${clean}?v=${mtime}`;
	} catch {
		return clean;
	}
}

/**
 * Case-insensitive scan of /public/images for `<slug>-working-together|process.<ext>`.
 * Re-reads the directory every call (no module-level cache) so dev picks up new files.
 */
function findChildProcessImageAuto(childSlug: string): string | null {
	const dir = publicImagesDir();
	if (!fs.existsSync(dir)) return null;

	const files = fs.readdirSync(dir);
	const byLower = new Map(files.map((name) => [name.toLowerCase(), name]));

	for (const stem of [`${childSlug}-working-together`, `${childSlug}-process`]) {
		for (const ext of CHILD_PROCESS_EXTS) {
			const actual = byLower.get(`${stem}.${ext}`.toLowerCase());
			if (actual) return `/images/${actual}`;
		}
	}
	return null;
}

/** Legacy helper — returns path without cache-bust. Prefer `resolveChildProcessImage`. */
export function childProcessImage(childSlug: string): string {
	return findChildProcessImageAuto(childSlug) ?? CHILD_PROCESS_IMAGE_DEFAULT;
}

/**
 * Resolve ChildProcess image for a child page.
 * `processImage` from data wins when provided; otherwise auto → fallback.
 */
export function resolveChildProcessImage(
	childSlug: string,
	processImage?: { src: string } | null,
): ChildProcessImageResolved {
	if (processImage?.src) {
		const pathOnly = processImage.src.split('?')[0] ?? processImage.src;
		return {
			path: pathOnly,
			src: withPublicMtimeCacheBust(pathOnly),
			source: 'data',
		};
	}

	const auto = findChildProcessImageAuto(childSlug);
	if (auto) {
		return {
			path: auto,
			src: withPublicMtimeCacheBust(auto),
			source: 'auto',
		};
	}

	return {
		path: CHILD_PROCESS_IMAGE_DEFAULT,
		src: withPublicMtimeCacheBust(CHILD_PROCESS_IMAGE_DEFAULT),
		source: 'fallback',
	};
}
