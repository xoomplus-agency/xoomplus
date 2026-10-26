/**
 * Re-export barrel — prefer importing from `src/data/services/index` for new code.
 * Kept so existing component type imports keep working.
 *
 * Note: imports must use `./services/index` (not `./services`) because
 * `src/data/services.ts` already exists for the home Services section.
 */
export {
	mainServices,
	getMainServiceBySlug,
	getChildService,
	getChildHrefByName,
	getLiveChildServices,
	getDisabledChildRedirects,
	isDisabledChildPath,
	isChildServiceLive,
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
} from './services/index';

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
} from './services/index';
