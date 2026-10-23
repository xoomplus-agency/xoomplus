/**
 * Canonical UK contact details for Astro templates.
 * Do not build tel:/mailto: hrefs from CMS HTML — normalize CMS links separately.
 */
export const SITE_PHONE = {
	/** Visible label */
	display: '+44 330 010 4786',
	/** Digits only after + for tel: hrefs */
	e164: '+443300104786',
	href: 'tel:+443300104786',
} as const;

export const SITE_EMAIL = {
	display: 'info@xoomplus.co.uk',
	href: 'mailto:info@xoomplus.co.uk',
} as const;
