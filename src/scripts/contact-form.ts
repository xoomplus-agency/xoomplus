import loadingIconUrl from '../assets/icons/btn-loading-icon.svg?url';
import {
	buildCf7FormData,
	getCf7FeedbackUrl,
	isCf7Success,
	resolveCf7FormConfig,
	type Cf7Feedback,
	type Cf7FormConfig,
} from '../lib/cf7';
import { reverseCf7FieldMap } from '../lib/cf7-forms';

const HONEYPOT_NAME = 'hp_website';

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
	});
	form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
		'[aria-invalid="true"]',
	).forEach((el) => {
		el.removeAttribute('aria-invalid');
	});
}

function setFieldError(form: HTMLFormElement, astroName: string, message: string) {
	const control = form.elements.namedItem(astroName);
	if (control && !(control instanceof RadioNodeList) && 'setAttribute' in control) {
		(control as HTMLElement).setAttribute('aria-invalid', 'true');
	}

	if (astroName === 'services') {
		form
			.querySelector('.enquiry-services')
			?.setAttribute('aria-invalid', 'true');
	}

	const errorEl = form.querySelector<HTMLElement>(
		`[data-cf7-error="${astroName}"]`,
	);
	if (errorEl) {
		errorEl.textContent = message;
		errorEl.hidden = false;
	}
}

function setSubmitLoading(btn: HTMLButtonElement, loading: boolean) {
	const label = btn.querySelector<HTMLElement>('.btn__label');
	if (!label) {
		btn.disabled = loading;
		if (loading) btn.setAttribute('aria-busy', 'true');
		else btn.removeAttribute('aria-busy');
		return;
	}

	if (loading) {
		if (!btn.dataset.labelHtml) btn.dataset.labelHtml = label.innerHTML;
		btn.disabled = true;
		btn.setAttribute('aria-busy', 'true');
		btn.setAttribute('aria-label', 'Sending');
		label.innerHTML = `<img class="btn-loading-icon size-[21px]" src="${loadingIconUrl}" width="21" height="21" alt="" aria-hidden="true" />`;
	} else {
		btn.disabled = false;
		btn.removeAttribute('aria-busy');
		btn.removeAttribute('aria-label');
		if (btn.dataset.labelHtml) {
			label.innerHTML = btn.dataset.labelHtml;
			delete btn.dataset.labelHtml;
		}
	}
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
				'Your message was flagged as spam. Please try again or email info@xoomplus.co.uk.'
			);
		case 'mail_failed':
			return (
				data.message ||
				'Your message could not be delivered. Please try again or email info@xoomplus.co.uk.'
			);
		default:
			return (
				data.message ||
				data.invalid_fields?.map((f) => f.message).join(' ') ||
				`Request failed (${httpStatus || 'network'}). Please try again or email info@xoomplus.co.uk.`
			);
	}
}

function bindConfiguredForm(form: HTMLFormElement, config: Cf7FormConfig) {
	const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
	const statusEl = form.querySelector<HTMLElement>('.contact-status');
	if (!submitBtn || !statusEl) return;

	const reverseMap = reverseCf7FieldMap(config);
	let inflight = false;

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (inflight) return;

		clearStatus(statusEl);
		clearFieldErrors(form);

		const honeypot = (
			form.elements.namedItem(HONEYPOT_NAME) as HTMLInputElement | null
		)?.value;
		if (honeypot) {
			setStatus(statusEl, 'Thanks — we will be in touch shortly.', 'success');
			form.reset();
			return;
		}

		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		const endpoint = getCf7FeedbackUrl(config.id);
		inflight = true;
		setSubmitLoading(submitBtn, true);

		try {
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
				statusEl,
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
					: 'Something went wrong. Please try again or email info@xoomplus.co.uk.';
			setStatus(statusEl, msg, 'error');
		} finally {
			inflight = false;
			setSubmitLoading(submitBtn, false);
		}
	});
}

/**
 * Bind forms that declare `data-cf7-form` to the matching CF7 Feedback API config.
 * Forms without that attribute are left alone (e.g. homepage until configured).
 */
export function initContactForms(_endpointIgnored?: string) {
	document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
		if (form.dataset.contactFormBound) return;

		const config = resolveCf7FormConfig(form);
		if (!config) return;

		form.dataset.contactFormBound = 'true';
		bindConfiguredForm(form, config);
	});
}
