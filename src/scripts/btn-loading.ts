/**
 * Shared default-button loading state (spinner + optional label).
 * Same `.btn-loading-icon` / SVG as Button.astro and the contact form.
 */
import loadingIconUrl from '../assets/icons/btn-loading-icon.svg?url';

export type SetButtonLoadingOptions = {
	/** Text beside the spinner. Omit for spinner-only (contact submit). */
	loadingLabel?: string;
	/** aria-label while loading. */
	ariaLabel?: string;
	/** Lock current width so the button does not jump when the label changes. */
	lockWidth?: boolean;
};

const SPINNER_HTML = `<img class="btn-loading-icon size-[21px]" src="${loadingIconUrl}" width="21" height="21" alt="" aria-hidden="true" />`;

export function setButtonLoading(
	btn: HTMLButtonElement,
	loading: boolean,
	opts: SetButtonLoadingOptions = {},
): void {
	const label = btn.querySelector<HTMLElement>('.btn__label');
	if (!label) {
		btn.disabled = loading;
		if (loading) btn.setAttribute('aria-busy', 'true');
		else btn.removeAttribute('aria-busy');
		return;
	}

	if (loading) {
		if (!btn.dataset.labelHtml) btn.dataset.labelHtml = label.innerHTML;
		if (btn.dataset.ariaLabelSaved === undefined) {
			btn.dataset.ariaLabelSaved = btn.getAttribute('aria-label') ?? '';
		}
		if (opts.lockWidth && !btn.dataset.widthLocked) {
			btn.style.minWidth = `${Math.ceil(btn.getBoundingClientRect().width)}px`;
			btn.dataset.widthLocked = '1';
		}
		btn.disabled = true;
		btn.setAttribute('aria-busy', 'true');
		const aria =
			opts.ariaLabel || opts.loadingLabel || 'Loading';
		btn.setAttribute('aria-label', aria);

		if (opts.loadingLabel) {
			label.style.gap = '10px';
			label.innerHTML = `${SPINNER_HTML}<span>${opts.loadingLabel}</span>`;
		} else {
			label.style.gap = '';
			label.innerHTML = SPINNER_HTML;
		}
		return;
	}

	btn.disabled = false;
	btn.removeAttribute('aria-busy');
	const savedAria = btn.dataset.ariaLabelSaved;
	delete btn.dataset.ariaLabelSaved;
	if (savedAria) btn.setAttribute('aria-label', savedAria);
	else btn.removeAttribute('aria-label');

	if (btn.dataset.widthLocked) {
		btn.style.minWidth = '';
		delete btn.dataset.widthLocked;
	}
	label.style.gap = '';
	if (btn.dataset.labelHtml) {
		label.innerHTML = btn.dataset.labelHtml;
		delete btn.dataset.labelHtml;
	}
}
