/**
 * Contact Form 7 REST submit helpers (browser).
 *
 * Form IDs and field maps live in `./cf7-forms` (explicit per-form config).
 * PUBLIC_WP_API is optional; defaults to the live WordPress origin.
 */

import {
	type Cf7FormConfig,
	getCf7FormConfig,
} from './cf7-forms';

const DEFAULT_WP_ORIGIN = 'https://xoomplus.co.uk';
const CF7_VERSION = '6.2.2';

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

/** WP site origin from PUBLIC_WP_API, else production WordPress. */
export function getWpOrigin(): string {
	const api = readPublic('PUBLIC_WP_API');
	if (api) {
		try {
			return new URL(api).origin;
		} catch {
			/* fall through */
		}
	}
	return DEFAULT_WP_ORIGIN;
}

export function getCf7FeedbackUrl(formId: string | number): string {
	return `${getWpOrigin()}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;
}

export function resolveCf7FormConfig(
	form: HTMLFormElement,
): Cf7FormConfig | undefined {
	return getCf7FormConfig(form.dataset.cf7Form);
}

/**
 * Build multipart body CF7 expects from an Astro form + explicit config.
 */
export function buildCf7FormData(
	form: HTMLFormElement,
	config: Cf7FormConfig,
): FormData {
	const out = new FormData();
	const src = new FormData(form);
	const formId = String(config.id);
	const multi = new Set(config.multi ?? []);
	const skip = new Set(config.skip ?? ['hp_website']);
	const omitEmpty = new Set(config.omitEmpty ?? []);
	const multiValues: Record<string, string[]> = {};

	out.append('_wpcf7', formId);
	out.append('_wpcf7_version', CF7_VERSION);
	out.append('_wpcf7_locale', 'en_US');
	out.append('_wpcf7_unit_tag', `wpcf7-f${formId}-o1`);
	out.append('_wpcf7_container_post', '0');
	out.append('_wpcf7_posted_data_hash', '');

	for (const [key, value] of src.entries()) {
		if (skip.has(key) || key.startsWith('_wpcf7')) continue;

		const dest = config.fields[key];
		if (!dest) continue;

		const raw = String(value);
		if (omitEmpty.has(key) && !raw.trim()) continue;

		const transformed = config.transform?.[key]?.(raw) ?? raw;

		if (multi.has(key)) {
			(multiValues[dest] ??= []).push(transformed);
			continue;
		}

		out.append(dest, transformed);
	}

	for (const [dest, values] of Object.entries(multiValues)) {
		for (const v of values) out.append(dest, v);
	}

	if (config.includePageContext && typeof document !== 'undefined') {
		out.append('page-title', document.title);
		out.append('page-url', window.location.href);
	}

	return out;
}

export type Cf7Feedback = {
	status?: string;
	message?: string;
	invalid_fields?: { field: string; message: string; error_id?: string }[];
};

export function isCf7Success(data: Cf7Feedback): boolean {
	return data.status === 'mail_sent';
}

export { getCf7FormConfig, type Cf7FormConfig };
