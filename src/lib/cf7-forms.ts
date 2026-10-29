/**
 * Explicit CF7 form configs (numeric post IDs + field maps).
 * Do not use shortcode hashes as REST form IDs.
 */

export type Cf7FormConfig = {
	/** WordPress CF7 post ID for Feedback API */
	id: number;
	/** Human title from WP (documentation only) */
	title: string;
	/** Astro input `name` → CF7 mail-tag / input name */
	fields: Record<string, string>;
	/** Astro names submitted as repeated CF7 fields (checkboxes) */
	multi?: readonly string[];
	/** Astro names omitted from the request entirely */
	skip?: readonly string[];
	/** Astro names omitted when empty (optional CF7 fields) */
	omitEmpty?: readonly string[];
	/** Transform Astro values before append (e.g. consent → "Checked/Ticked") */
	transform?: Partial<Record<string, (value: string) => string>>;
	/**
	 * Append `page-title` (document.title) and `page-url` (location.href).
	 * CF7 must also define matching hidden fields + mail-tags in WordPress.
	 */
	includePageContext?: boolean;
};

/**
 * Contact Form 7 — "Homepage Form"
 * Shortcode hash `7fc49ca` → numeric post ID 15862.
 * Used by homepage / About (`ContactSection.astro`).
 */
export const CF7_CONTACT_HOMEPAGE: Cf7FormConfig = {
	id: 15862,
	title: 'Homepage Form',
	fields: {
		name: 'your-name',
		company: 'your-company',
		email: 'your-email',
		phone: 'your-phone',
		details: 'project-details',
	},
	skip: ['hp_website'],
	omitEmpty: ['details'],
	/** Sends document.title + location.href as CF7 [page-title] / [page-url] */
	includePageContext: true,
};

/**
 * Contact Form 7 — "Contact Form"
 * Shortcode hash `08de270` → numeric post ID 15863.
 * Used by `/contact` and `/pricing` (ContactForm.astro).
 */
export const CF7_CONTACT_SERVICES: Cf7FormConfig = {
	id: 15863,
	title: 'Contact Form',
	fields: {
		name: 'your-name',
		email: 'your-email',
		company: 'your-company',
		website: 'your-website',
		services: 'project-services',
		details: 'project-details',
		budget: 'project-budget',
		timeline: 'project-timeline',
		consent: 'privacy-consent',
	},
	multi: ['services'],
	skip: ['source', 'hp_website'],
	omitEmpty: ['company', 'website', 'budget', 'timeline'],
	transform: {
		/** Prefer readable label; acceptance fields still need the WP mu-plugin to avoid "1". */
		consent: () => 'Checked/Ticked',
	},
	includePageContext: true,
};

export const CF7_FORM_BY_KEY = {
	'contact-homepage': CF7_CONTACT_HOMEPAGE,
	'contact-services': CF7_CONTACT_SERVICES,
} as const;

export type Cf7FormKey = keyof typeof CF7_FORM_BY_KEY;

export function getCf7FormConfig(key: string | undefined): Cf7FormConfig | undefined {
	if (!key) return undefined;
	return CF7_FORM_BY_KEY[key as Cf7FormKey];
}

/** CF7 field name → Astro `name` (for field-level errors). */
export function reverseCf7FieldMap(config: Cf7FormConfig): Record<string, string> {
	const out: Record<string, string> = {};
	for (const [astro, cf7] of Object.entries(config.fields)) {
		out[cf7] = astro;
	}
	return out;
}
