const DEFAULT_ENDPOINT = '/api/contact';
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
 * Shared contact-form submit handler.
 * Forms opt in with `data-contact-form`. Honeypot field name: `hp_website`.
 */
export function initContactForms(endpoint = DEFAULT_ENDPOINT) {
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

			submitBtn.disabled = true;

			try {
				const response = await fetch(endpoint, {
					method: 'POST',
					body: new FormData(form),
					headers: { Accept: 'application/json' },
				});

				if (!response.ok) {
					throw new Error(`Request failed (${response.status})`);
				}

				setStatus(
					statusEl,
					'Thanks — your message has been sent. We will be in touch shortly.',
					'success',
				);
				form.reset();
			} catch {
				setStatus(
					statusEl,
					'Something went wrong. Please try again or email info@xoomplus.co.uk.',
					'error',
				);
			} finally {
				submitBtn.disabled = false;
			}
		});
	});
}
