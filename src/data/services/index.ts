/**
 * Main service pages (/services/[slug]) — one content file per service.
 *
 * Mega menu (`services-menu.ts`), footer service links, and overview cards still
 * define names/slugs separately today; optional later sync without visual change.
 */
import type { MainService } from './types';
import { isChildServiceLive } from './types';
import { seo } from './seo';
import { webDesignDevelopment } from './web-design-development';
import { socialMediaMarketing } from './social-media-marketing';
import { ppcGoogleAds } from './ppc-google-ads';

export type {
	MainService,
	ChildService,
	ChildServiceLive,
	ChildServiceDisabled,
	ChildServiceHeroData,
	ChildClarityData,
	ChildClarityColumn,
	ChildClarityItem,
	ServiceHeroData,
	ServiceHeroLink,
	ServiceFeatureItem,
	ServiceFeaturesData,
	ServiceBentoMainCard,
	ServiceBentoCard,
	ServiceBentoData,
	ServiceShowcasePanel,
	ServiceShowcaseData,
	ServiceProcessItem,
	ServiceProcessData,
} from './types';

export { isChildServiceLive } from './types';

export {
	serviceImage,
	serviceHeroImage,
	serviceShowcaseImage,
	serviceProcessImage,
	childServiceHeroImage,
	CHILD_SERVICE_HERO_DEFAULT,
	CHILD_SERVICE_HERO_WIDTH,
	CHILD_SERVICE_HERO_HEIGHT,
	childProcessImage,
	resolveChildProcessImage,
	withPublicMtimeCacheBust,
	CHILD_PROCESS_IMAGE_DEFAULT,
	CHILD_PROCESS_IMAGE_WIDTH,
	CHILD_PROCESS_IMAGE_HEIGHT,
	WEB_DESIGN_HERO_IMAGE,
	WEB_DESIGN_SHOWCASE_IMAGE,
	WEB_DESIGN_PROCESS_IMAGE,
} from './images';

/** Add a service file above, then append it here — getStaticPaths picks it up automatically. */
export const mainServices: MainService[] = [
	seo,
	webDesignDevelopment,
	socialMediaMarketing,
	ppcGoogleAds,
];

export function getMainServiceBySlug(slug: string): MainService | undefined {
	return mainServices.find((service) => service.slug === slug);
}

export function getChildService(
	mainSlug: string,
	childSlug: string,
): { service: MainService; child: import('./types').ChildServiceLive } | undefined {
	const service = getMainServiceBySlug(mainSlug);
	const child = service?.children?.find((c) => c.slug === childSlug);
	if (!service || !child || child.disabled === true) return undefined;
	return { service, child };
}

/** Lookup child page href by capability/display name under a main service. Skips disabled. */
export function getChildHrefByName(mainSlug: string, name: string): string | undefined {
	const service = getMainServiceBySlug(mainSlug);
	const child = service?.children?.find((c) => c.name === name && c.disabled !== true);
	return child ? `/services/${mainSlug}/${child.slug}` : undefined;
}

/** Live (page-generating) children only — used by getStaticPaths and sitemap filters. */
export function getLiveChildServices(service: MainService) {
	return (service.children ?? []).filter(isChildServiceLive);
}

/**
 * Redirect map for disabled children → parent service.
 * Used when `REMOVED_CHILD_PAGES === "redirect-parent"`.
 */
export function getDisabledChildRedirects(): Record<string, string> {
	const redirects: Record<string, string> = {};
	for (const service of mainServices) {
		for (const child of service.children ?? []) {
			if (child.disabled !== true) continue;
			const from = `/services/${service.slug}/${child.slug}`;
			const to = `/services/${service.slug}`;
			redirects[from] = to;
			redirects[`${from}/`] = `${to}/`;
		}
	}
	return redirects;
}

/** True when a /services/<main>/<child> path should be omitted from sitemaps / indexes. */
export function isDisabledChildPath(pathname: string): boolean {
	const path = pathname.replace(/\/+$/, '') || '/';
	const match = path.match(/^\/services\/([^/]+)\/([^/]+)$/);
	if (!match) return false;
	const [, mainSlug, childSlug] = match;
	const service = getMainServiceBySlug(mainSlug);
	const child = service?.children?.find((c) => c.slug === childSlug);
	return child?.disabled === true;
}
