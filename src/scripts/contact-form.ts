import {
	buildCf7FormData,
	getCf7FeedbackUrl,
	getCf7FormId,
	isCf7Success,
	type Cf7Feedback,
} from '../lib/cf7';

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

/**
 * Submit Astro contact forms to WordPress Contact Form 7 via REST.
 * Requires PUBLIC_CF7_FORM_ID (+ PUBLIC_WP_API). Enquiry forms use
 * PUBLIC_CF7_FORM_ID_ENQUIRY when set.
 */
export function initContactForms(_endpointIgnored?: string) {
	document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
		if (form.dataset.contactFormBound) return;
		form.dataset.contactFormBound = 'true';

		const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
		const statusEl = form.querySelector<HTMLElement>('.contact-status');
		if (!submitBtn || !statusEl) return;

		form.addEventListener('submit', async (event) => {
			event.preventDefault();
			clearStatus(statusEl);

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

			const kind = form.hasAttribute('data-enquiry-form') ? 'enquiry' : 'default';
			const formId = getCf7FormId(kind);
			const endpoint = formId ? getCf7FeedbackUrl(formId) : undefined;

			if (!formId || !endpoint) {
				setStatus(
					statusEl,
					'Form is not configured (missing PUBLIC_CF7_FORM_ID / PUBLIC_WP_API).',
					'error',
				);
				return;
			}

			submitBtn.disabled = true;

			try {
				const body = buildCf7FormData(form, formId);
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

				if (!response.ok || !isCf7Success(data)) {
					const detail =
						data.message ||
						data.invalid_fields?.map((f) => f.message).join(' ') ||
						`Request failed (${response.status})`;
					throw new Error(detail);
				}

				setStatus(
					statusEl,
					data.message ||
						'Thanks — your message has been sent. We will be in touch shortly.',
					'success',
				);
				form.reset();
			} catch (err) {
				const msg =
					err instanceof Error && err.message
						? err.message
						: 'Something went wrong. Please try again or email info@xoomplus.co.uk.';
				setStatus(statusEl, msg, 'error');
			} finally {
				submitBtn.disabled = false;
			}
		});
	});
}
