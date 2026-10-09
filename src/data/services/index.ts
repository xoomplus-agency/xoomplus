/**
 * Main service pages (/services/[slug]) — one content file per service.
 *
 * Mega menu (`services-menu.ts`), footer service links, and overview cards still
 * define names/slugs separately today; optional later sync without visual change.
 */
import type { MainService } from './types';
import { seo } from './seo';
import { webDesignDevelopment } from './web-design-development';
import { socialMediaMarketing } from './social-media-marketing';
import { ppcGoogleAds } from './ppc-google-ads';

export type {
	MainService,
	ChildService,
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
	CHILD_PROCESS_IMAGE_DEFAULT,
	CHILD_PROCESS_IMAGE_WIDTH,
	CHILD_PROCESS_IMAGE_HEIGHT,
	childTurnInterestImage,
	childLetTheDetailsImage,
	CHILD_ROW_TURN_INTEREST_DEFAULT,
	CHILD_ROW_LET_THE_DETAILS_DEFAULT,
	childHowWeWorkImage,
	CHILD_HOW_WE_WORK_1_DEFAULT,
	CHILD_HOW_WE_WORK_2_DEFAULT,
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
): { service: MainService; child: NonNullable<MainService['children']>[number] } | undefined {
	const service = getMainServiceBySlug(mainSlug);
	const child = service?.children?.find((c) => c.slug === childSlug);
	if (!service || !child) return undefined;
	return { service, child };
}

/** Lookup child page href by capability/display name under a main service. */
export function getChildHrefByName(mainSlug: string, name: string): string | undefined {
	const service = getMainServiceBySlug(mainSlug);
	const child = service?.children?.find((c) => c.name === name);
	return child ? `/services/${mainSlug}/${child.slug}` : undefined;
}
