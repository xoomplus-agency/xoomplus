/**
 * Single IntersectionObserver scroll-reveal. Play once. No scroll listeners.
 */
const REDUCE = '(prefers-reduced-motion: reduce)';
const MAX_STAGGER = 6;
const MAX_BATCH = 12;

function prefersReducedMotion(): boolean {
	return window.matchMedia(REDUCE).matches;
}

function prepareGroups(): void {
	document.querySelectorAll('[data-reveal-group]').forEach((group) => {
		const kids = [...group.querySelectorAll(':scope > [data-reveal]')];
		kids.forEach((el, i) => {
			if (!(el instanceof HTMLElement)) return;
			if (i >= MAX_BATCH) {
				el.classList.add('is-visible');
				el.removeAttribute('data-reveal');
				return;
			}
			el.style.setProperty('--i', String(Math.min(i, MAX_STAGGER)));
		});
	});
}

function collectTargets(): HTMLElement[] {
	const out: HTMLElement[] = [];
	for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
		if (el.closest('[data-reveal-off]')) continue;
		if (el.closest('[data-site-header]')) continue;
		out.push(el);
	}
	return out;
}

function reveal(el: HTMLElement): void {
	el.style.willChange = 'opacity, transform';
	el.classList.add('is-visible');
	const clear = (event: TransitionEvent) => {
		if (event.target !== el) return;
		if (event.propertyName !== 'opacity' && event.propertyName !== 'transform') return;
		el.style.removeProperty('will-change');
		el.removeEventListener('transitionend', clear);
	};
	el.addEventListener('transitionend', clear);
}

function init(): void {
	if (prefersReducedMotion()) return;

	prepareGroups();
	const targets = collectTargets();
	if (!targets.length) return;

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target;
				if (!(el instanceof HTMLElement)) continue;
				reveal(el);
				io.unobserve(el);
			}
		},
		{ threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
	);

	for (const el of targets) io.observe(el);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
	init();
}
