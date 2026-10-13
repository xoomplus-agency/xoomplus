/**
 * Contact Form 7 REST submit helpers (browser + build).
 *
 * Env:
 *   PUBLIC_WP_API          — e.g. https://cms.example.com/wp-json/wp/v2
 *   PUBLIC_CF7_FORM_ID     — CF7 form post ID (required for submit)
 *   PUBLIC_CF7_FORM_ID_ENQUIRY — optional second form for enquiry cards
 *
 * Map Astro field names → CF7 mail-tag names via PUBLIC_CF7_FIELD_MAP JSON, e.g.
 *   {"name":"your-name","email":"your-email","details":"your-message"}
 * Defaults below match common CF7 templates.
 */

const DEFAULT_FIELD_MAP: Record<string, string> = {
	name: 'your-name',
	email: 'your-email',
	company: 'your-company',
	phone: 'your-phone',
	details: 'your-message',
	message: 'your-message',
	website: 'your-website',
	budget: 'your-budget',
	source: 'your-source',
	services: 'your-services',
};

function readPublic(name: string): string | undefined {
	try {
		const v = (import.meta.env as Record<string, string | undefined>)[name];
		if (v?.trim()) return v.trim();
	} catch {
		/* ignore */
	}
	if (typeof process !== 'undefined') {
		const v = process.env?.[name];
		if (v?.trim()) return v.trim();
	}
	return undefined;
}

/** WP site origin from PUBLIC_WP_API (strip /wp-json/...). */
export function getWpOrigin(): string | undefined {
	const api = readPublic('PUBLIC_WP_API');
	if (!api) return undefined;
	try {
		const u = new URL(api);
		return u.origin;
	} catch {
		return undefined;
	}
}

export function getCf7FormId(kind: 'default' | 'enquiry' = 'default'): string | undefined {
	if (kind === 'enquiry') {
		return readPublic('PUBLIC_CF7_FORM_ID_ENQUIRY') || readPublic('PUBLIC_CF7_FORM_ID');
	}
	return readPublic('PUBLIC_CF7_FORM_ID');
}

export function getCf7FeedbackUrl(formId: string): string | undefined {
	const origin = getWpOrigin();
	if (!origin || !formId) return undefined;
	return `${origin}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;
}

function fieldMap(): Record<string, string> {
	const raw = readPublic('PUBLIC_CF7_FIELD_MAP');
	if (!raw) return { ...DEFAULT_FIELD_MAP };
	try {
		const parsed = JSON.parse(raw) as Record<string, string>;
		return { ...DEFAULT_FIELD_MAP, ...parsed };
	} catch {
		console.warn('[cf7] PUBLIC_CF7_FIELD_MAP is not valid JSON — using defaults');
		return { ...DEFAULT_FIELD_MAP };
	}
}

/**
 * Build multipart body CF7 expects, mapping our input names → CF7 tags.
 */
export function buildCf7FormData(
	form: HTMLFormElement,
	formId: string,
): FormData {
	const map = fieldMap();
	const out = new FormData();
	const src = new FormData(form);

	out.append('_wpcf7', formId);
	out.append('_wpcf7_version', '5.9.0');
	out.append('_wpcf7_locale', 'en_US');
	out.append('_wpcf7_unit_tag', `wpcf7-f${formId}-o1`);
	out.append('_wpcf7_container_post', '0');
	out.append('_wpcf7_posted_data_hash', '');

	const services: string[] = [];
	for (const [key, value] of src.entries()) {
		if (key === 'hp_website') continue;
		if (key.startsWith('_wpcf7')) continue;
		if (key === 'services') {
			services.push(String(value));
			continue;
		}
		const dest = map[key] || key;
		out.append(dest, value);
	}
	if (services.length) {
		out.append(map.services || 'your-services', services.join(', '));
	}

	return out;
}

export type Cf7Feedback = {
	status?: string;
	message?: string;
	invalid_fields?: { field: string; message: string }[];
};

export function isCf7Success(data: Cf7Feedback): boolean {
	return data.status === 'mail_sent' || data.status === 'mail_sent_ng';
}
