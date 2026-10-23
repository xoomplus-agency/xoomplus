/**
 * Shared enquiry form binder — one script for every `form[data-enquiry-form]`.
 * Prevents native GET navigation; validates inline; POSTs CF7 FormData (or dry-run).
 */
import {
	buildCf7FormData,
	getCf7FeedbackUrl,
	isCf7Success,
	resolveCf7FormConfig,
	type Cf7Feedback,
	type Cf7FormConfig,
} from '../lib/cf7';
import { reverseCf7FieldMap } from '../lib/cf7-forms';
import { SITE_EMAIL } from '../data/site-contact';
import { setButtonLoading } from './btn-loading';

const HONEYPOT_NAME = 'hp_website';
const BOUND_ATTR = 'data-enquiry-bound';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setStatus(
	statusEl: HTMLElement,
	message: string,
	type: 'success' | 'error',
) {
	statusEl.textContent = message;
	statusEl.classList.remove('contact-status--success', 'contact-status--error');
	statusEl.classList.add(
		type === 'success' ? 'contact-status--success' : 'contact-status--error',
	);
	statusEl.hidden = false;
}

function clearStatus(statusEl: HTMLElement) {
	statusEl.hidden = true;
	statusEl.textContent = '';
	statusEl.classList.remove('contact-status--success', 'contact-status--error');
}

function clearFieldErrors(form: HTMLFormElement) {
	form.querySelectorAll<HTMLElement>('[data-cf7-error]').forEach((el) => {
		el.textContent = '';
		el.hidden = true;
		el.removeAttribute('role');
	});
	form
		.querySelectorAll<HTMLElement>('[aria-invalid="true"]')
		.forEach((el) => el.removeAttribute('aria-invalid'));
}

function controlFor(form: HTMLFormElement, name: string): HTMLElement | null {
	const item = form.elements.namedItem(name);
	if (!item) return null;
	if (item instanceof RadioNodeList) {
		const first = item[0];
		return first instanceof HTMLElement ? first : null;
	}
	return item instanceof HTMLElement ? item : null;
}

function setFieldError(form: HTMLFormElement, astroName: string, message: string) {
	const control = controlFor(form, astroName);
	if (control) {
		control.setAttribute('aria-invalid', 'true');
		const errId = `${control.id || astroName}-error`;
		const errorEl = form.querySelector<HTMLElement>(
			`[data-cf7-error="${astroName}"]`,
		);
		if (errorEl && control.id) {
			errorEl.id = errId;
			const describedby = control.getAttribute('aria-describedby');
			const parts = new Set(
				(describedby || '')
					.split(/\s+/)
					.filter(Boolean)
					.filter((id) => id !== errId),
			);
			parts.add(errId);
			control.setAttribute('aria-describedby', [...parts].join(' '));
		}
	}

	if (astroName === 'services') {
		form.querySelector('.enquiry-services')?.setAttribute('aria-invalid', 'true');
	}
	if (astroName === 'consent') {
		form
			.querySelector('.enquiry-consent input[type="checkbox"]')
			?.setAttribute('aria-invalid', 'true');
	}

	const errorEl = form.querySelector<HTMLElement>(`[data-cf7-error="${astroName}"]`);
	if (errorEl) {
		errorEl.textContent = message;
		errorEl.hidden = false;
		errorEl.setAttribute('role', 'alert');
	}
}

function setSubmitLoading(btn: HTMLButtonElement, loading: boolean) {
	setButtonLoading(btn, loading, { ariaLabel: 'Sending' });
}

function valueOf(form: HTMLFormElement, name: string): string {
	const el = controlFor(form, name);
	if (!el) return '';
	if (el instanceof HTMLInputElement && el.type === 'checkbox') {
		return el.checked ? el.value : '';
	}
	if ('value' in el) return String((el as HTMLInputElement).value ?? '').trim();
	return '';
}

/**
 * Client-side required checks.
 * - Homepage / About (`contact-homepage`): name, company, email, phone
 * - Enquiry (`contact-services`): name, email, details, consent
 */
function validateEnquiry(form: HTMLFormElement): string | null {
	clearFieldErrors(form);
	let firstInvalid: HTMLElement | null = null;
	const kind = form.dataset.cf7Form || 'contact-services';
	const isHomepage = kind === 'contact-homepage';

	const name = valueOf(form, 'name');
	if (!name) {
		setFieldError(form, 'name', 'Please enter your name.');
		firstInvalid ??= controlFor(form, 'name');
	}

	if (isHomepage) {
		const company = valueOf(form, 'company');
		if (!company) {
			setFieldError(form, 'company', 'Please enter your company.');
			firstInvalid ??= controlFor(form, 'company');
		}
	}

	const email = valueOf(form, 'email');
	if (!email) {
		setFieldError(form, 'email', 'Please enter your email address.');
		firstInvalid ??= controlFor(form, 'email');
	} else if (!EMAIL_RE.test(email)) {
		setFieldError(form, 'email', 'Please enter a valid email address.');
		firstInvalid ??= controlFor(form, 'email');
	}

	if (isHomepage) {
		const phone = valueOf(form, 'phone');
		if (!phone) {
			setFieldError(form, 'phone', 'Please enter your phone number.');
			firstInvalid ??= controlFor(form, 'phone');
		}
	} else {
		const details = valueOf(form, 'details');
		if (!details) {
			setFieldError(form, 'details', 'Please add a few details about your project.');
			firstInvalid ??= controlFor(form, 'details');
		}

		const consent = form.querySelector<HTMLInputElement>(
			'input[name="consent"][type="checkbox"]',
		);
		if (consent && !consent.checked) {
			setFieldError(form, 'consent', 'Please agree so we can respond to your enquiry.');
			firstInvalid ??= consent;
		}
	}

	if (firstInvalid) {
		firstInvalid.focus({ preventScroll: false });
		return firstInvalid.id || 'invalid';
	}
	return null;
}

function messageForStatus(data: Cf7Feedback, httpStatus: number): string {
	switch (data.status) {
		case 'validation_failed':
		case 'acceptance_missing':
			return (
				data.message ||
				data.invalid_fields?.map((f) => f.message).join(' ') ||
				'Please check the form and try again.'
			);
		case 'spam':
			return (
				data.message ||
				`Your message was flagged as spam. Please try again or email ${SITE_EMAIL.display}.`
			);
		case 'mail_failed':
			return (
				data.message ||
				`Your message could not be delivered. Please try again or email ${SITE_EMAIL.display}.`
			);
		default:
			return (
				data.message ||
				data.invalid_fields?.map((f) => f.message).join(' ') ||
				`Request failed (${httpStatus || 'network'}). Please try again or email ${SITE_EMAIL.display}.`
			);
	}
}

function isDryRun(form: HTMLFormElement): boolean {
	if (form.hasAttribute('data-enquiry-dry-run')) return true;
	try {
		return new URLSearchParams(window.location.search).has('enquiryDryRun');
	} catch {
		return false;
	}
}

function bindEnquiryChips(form: HTMLFormElement) {
	if (form.dataset.enquiryChipsBound) return;
	form.dataset.enquiryChipsBound = 'true';

	const NOT_SURE = 'Not sure yet';
	const serviceInputs = [
		...form.querySelectorAll<HTMLInputElement>(
			'.enquiry-chips input[type="checkbox"][name="services"]',
		),
	];
	if (!serviceInputs.length) return;

	function syncChip(input: HTMLInputElement) {
		input
			.closest('.enquiry-chip')
			?.classList.toggle('enquiry-chip--checked', input.checked);
	}

	serviceInputs.forEach((input) => {
		input.addEventListener('change', () => {
			if (input.value === NOT_SURE && input.checked) {
				serviceInputs.forEach((other) => {
					if (other === input) return;
					other.checked = false;
					syncChip(other);
				});
			} else if (input.value !== NOT_SURE && input.checked) {
				const notSure = serviceInputs.find((el) => el.value === NOT_SURE);
				if (notSure?.checked) {
					notSure.checked = false;
					syncChip(notSure);
				}
			}
			syncChip(input);
		});
		syncChip(input);
	});
}

function bindConfiguredForm(form: HTMLFormElement, config: Cf7FormConfig) {
	const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
	const status =
		form.querySelector<HTMLElement>('.contact-status') ||
		form.querySelector<HTMLElement>('[role="status"]');
	if (!submitBtn || !status) return;

	const reverseMap = reverseCf7FieldMap(config);
	let inflight = false;

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (inflight) return;

		clearStatus(status);

		const honeypot = (
			form.elements.namedItem(HONEYPOT_NAME) as HTMLInputElement | null
		)?.value;
		if (honeypot) {
			setStatus(status, 'Thanks — we will be in touch shortly.', 'success');
			form.reset();
			return;
		}

		if (validateEnquiry(form)) return;

		inflight = true;
		setSubmitLoading(submitBtn, true);

		try {
			if (isDryRun(form)) {
				await new Promise((r) => setTimeout(r, 400));
				setStatus(
					status,
					'Dry run OK — enquiry was not sent. Remove ?enquiryDryRun=1 to submit for real.',
					'success',
				);
				return;
			}

			const endpoint =
				form.getAttribute('action')?.trim() || getCf7FeedbackUrl(config.id);
			const body = buildCf7FormData(form, config);
			const response = await fetch(endpoint, {
				method: 'POST',
				body,
				headers: { Accept: 'application/json' },
			});

			let data: Cf7Feedback = {};
			try {
				data = (await response.json()) as Cf7Feedback;
			} catch {
				/* non-JSON */
			}

			if (data.invalid_fields?.length) {
				for (const field of data.invalid_fields) {
					const astroName = reverseMap[field.field];
					if (astroName) setFieldError(form, astroName, field.message);
				}
			}

			if (!response.ok || !isCf7Success(data)) {
				throw new Error(messageForStatus(data, response.status));
			}

			setStatus(
				status,
				data.message ||
					'Thanks — your message has been sent. We will be in touch shortly.',
				'success',
			);
			form.reset();
			form
				.querySelectorAll<HTMLInputElement>(
					'.enquiry-chips input[type="checkbox"]',
				)
				.forEach((input) => {
					input
						.closest('.enquiry-chip')
						?.classList.remove('enquiry-chip--checked');
				});
		} catch (err) {
			const msg =
				err instanceof Error && err.message
					? err.message
					: `Something went wrong. Please try again or email ${SITE_EMAIL.display}.`;
			setStatus(status, msg, 'error');
		} finally {
			inflight = false;
			setSubmitLoading(submitBtn, false);
		}
	});
}

/**
 * Bind every enquiry form once. Safe to call multiple times (deduped per form).
 */
export function initEnquiryForms(): void {
	document.querySelectorAll<HTMLFormElement>('form[data-enquiry-form]').forEach((form) => {
		if (form.getAttribute(BOUND_ATTR) === '1') return;

		bindEnquiryChips(form);

		const config = resolveCf7FormConfig(form);
		if (!config) return;

		form.setAttribute(BOUND_ATTR, '1');
		bindConfiguredForm(form, config);
	});
}

/** @deprecated Use initEnquiryForms */
export function initContactForms(_endpointIgnored?: string) {
	initEnquiryForms();
}

initEnquiryForms();
