/**
 * Scroll-reveal: elements stay VISIBLE by default.
 * JS optionally arms a hide→show transition only after targets exist and have
 * layout, then observes them. Per-element 1s failsafe forces visibility.
 * Re-runs when server islands inject new [data-reveal] nodes.
 */
const REDUCE = '(prefers-reduced-motion: reduce)';
const MAX_STAGGER = 6;
const MAX_BATCH = 12;
const FAILSAFE_MS = 1000;

let io: IntersectionObserver | null = null;
let mo: MutationObserver | null = null;
let observeQueued = false;
const armedFailsafe = new WeakMap<HTMLElement, number>();

function prefersReducedMotion(): boolean {
	return window.matchMedia(REDUCE).matches;
}

function forceVisible(el: HTMLElement): void {
	const pending = armedFailsafe.get(el);
	if (pending) {
		window.clearTimeout(pending);
		armedFailsafe.delete(el);
	}
	el.classList.add('is-visible');
	el.removeAttribute('data-reveal-armed');
	el.style.opacity = '1';
	el.style.visibility = 'visible';
	el.style.transform = 'none';
	el.style.removeProperty('will-change');
}

function scheduleElementFailsafe(el: HTMLElement): void {
	if (armedFailsafe.has(el)) return;
	const id = window.setTimeout(() => {
		armedFailsafe.delete(el);
		if (!el.isConnected) return;
		if (el.classList.contains('is-visible')) return;
		forceVisible(el);
	}, FAILSAFE_MS);
	armedFailsafe.set(el, id);
}

function prepareGroups(): void {
	document.querySelectorAll('[data-reveal-group]').forEach((group) => {
		const kids = [...group.querySelectorAll(':scope > [data-reveal]')];
		kids.forEach((el, i) => {
			if (!(el instanceof HTMLElement)) return;
			if (i >= MAX_BATCH) {
				forceVisible(el);
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
		if (el.classList.contains('is-visible')) continue;
		out.push(el);
	}
	return out;
}

function reveal(el: HTMLElement): void {
	el.style.willChange = 'opacity, transform';
	el.classList.add('is-visible');
	el.removeAttribute('data-reveal-armed');
	const pending = armedFailsafe.get(el);
	if (pending) {
		window.clearTimeout(pending);
		armedFailsafe.delete(el);
	}
	const clear = (event: TransitionEvent) => {
		if (event.target !== el) return;
		if (event.propertyName !== 'opacity' && event.propertyName !== 'transform') return;
		el.style.removeProperty('will-change');
		el.removeEventListener('transitionend', clear);
	};
	el.addEventListener('transitionend', clear);
}

function ensureObserver(): IntersectionObserver {
	if (io) return io;
	io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target;
				if (!(el instanceof HTMLElement)) continue;
				reveal(el);
				io?.unobserve(el);
			}
		},
		{ threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
	);
	return io;
}

function hasLayout(el: HTMLElement): boolean {
	const r = el.getBoundingClientRect();
	return r.width > 0 || r.height > 0;
}

function isInViewport(el: HTMLElement): boolean {
	const rect = el.getBoundingClientRect();
	const vh = window.innerHeight || document.documentElement.clientHeight;
	const vw = window.innerWidth || document.documentElement.clientWidth;
	return rect.bottom > 0 && rect.top < vh && rect.right > 0 && rect.left < vw;
}

function observeNewTargets(): void {
	if (prefersReducedMotion()) {
		for (const el of collectTargets()) forceVisible(el);
		return;
	}

	prepareGroups();
	const targets = collectTargets();
	if (!targets.length) return;

	const observer = ensureObserver();
	for (const el of targets) {
		// Deferred blog grid (and any [data-reveal-off] ancestor handled above):
		// never hide late-mounted island cards — blank grid is worse than no motion.
		if (el.closest('[data-blog-grid]')) {
			forceVisible(el);
			continue;
		}

		// Wait for layout before deciding; zero-size nodes would get stuck armed.
		if (!hasLayout(el) || isInViewport(el)) {
			forceVisible(el);
			continue;
		}

		el.setAttribute('data-reveal-armed', '');
		scheduleElementFailsafe(el);
		observer.observe(el);
	}
}

function queueObserve(): void {
	if (observeQueued) return;
	observeQueued = true;
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			observeQueued = false;
			observeNewTargets();
		});
	});
}

function watchDom(): void {
	if (mo) return;
	mo = new MutationObserver((mutations) => {
		for (const m of mutations) {
			for (const node of m.addedNodes) {
				if (!(node instanceof Element)) continue;
				if (node.matches?.('[data-reveal]') || node.querySelector?.('[data-reveal]')) {
					queueObserve();
					return;
				}
			}
		}
	});
	mo.observe(document.documentElement, { childList: true, subtree: true });
}

function init(): void {
	queueObserve();
	watchDom();
	document.addEventListener('astro:page-load', () => queueObserve());
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
	init();
}
