/**
 * GSAP ScrollTrigger reveals for [data-reveal] only.
 *
 * Heroes use CSS-only [data-hero-enter] / [data-hero-item] — never touched here.
 * Content stays VISIBLE by default. GSAP loads after first paint (idle),
 * then arms only below-fold targets. Failsafe + reduced-motion keep content readable.
 * Re-binds when server islands / Load More inject new [data-reveal] nodes.
 * Cleans up triggers on Astro view transitions.
 */
const REDUCE = '(prefers-reduced-motion: reduce)';
const MAX_STAGGER = 6;
const MAX_BATCH = 12;
const FAILSAFE_MS = 2500;
const DISTANCE = 20;
const DURATION = 0.65;
const STAGGER = 0.07;
const EASE = 'power2.out';

type GsapMod = typeof import('gsap').default;
type ScrollTriggerMod = typeof import('gsap/ScrollTrigger').ScrollTrigger;
type FromState = { opacity: number; x?: number; y?: number; scale?: number };

let gsap: GsapMod | null = null;
let ScrollTrigger: ScrollTriggerMod | null = null;
let loadPromise: Promise<boolean> | null = null;
let mo: MutationObserver | null = null;
let observeQueued = false;
/** False until first load/idle — keeps GSAP off the LCP critical path. */
let idleReady = false;
const armedFailsafe = new WeakMap<HTMLElement, number>();
const bound = new WeakSet<HTMLElement>();

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
	if (gsap) gsap.set(el, { clearProps: 'opacity,transform,visibility' });
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

function fromVars(variant: string | null): FromState {
	switch (variant) {
		case 'fade':
			return { opacity: 0, y: 0 };
		case 'left':
			return { opacity: 0, x: -DISTANCE, y: 0 };
		case 'right':
			return { opacity: 0, x: DISTANCE, y: 0 };
		case 'scale':
			return { opacity: 0, scale: 0.97, y: 0 };
		case 'up':
		default:
			return { opacity: 0, y: DISTANCE };
	}
}

function prepareGroups(): void {
	document.querySelectorAll('[data-reveal-group]').forEach((group) => {
		const kids = [...group.querySelectorAll(':scope > [data-reveal]')];
		kids.forEach((el, i) => {
			if (!(el instanceof HTMLElement)) return;
			if (i >= MAX_BATCH) {
				forceVisible(el);
				el.removeAttribute('data-reveal');
				bound.add(el);
				return;
			}
			el.style.setProperty('--i', String(Math.min(i, MAX_STAGGER)));
		});
	});
}

function collectTargets(): HTMLElement[] {
	const out: HTMLElement[] = [];
	for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
		if (bound.has(el)) continue;
		if (el.classList.contains('is-visible')) continue;
		if (el.closest('[data-reveal-off]')) continue;
		if (el.closest('[data-site-header]')) continue;
		/* Never arm hero copy — LCP must paint without JS. */
		if (el.closest('[data-hero-enter]')) continue;
		out.push(el);
	}
	return out;
}

function hasLayout(el: HTMLElement): boolean {
	const r = el.getBoundingClientRect();
	return r.width > 0 || r.height > 0;
}

/** True when the element is already well into the first viewport (above-fold). */
function isAboveFold(el: HTMLElement): boolean {
	const rect = el.getBoundingClientRect();
	const vh = window.innerHeight || document.documentElement.clientHeight;
	const vw = window.innerWidth || document.documentElement.clientWidth;
	if (rect.right <= 0 || rect.left >= vw) return false;
	return rect.top < vh * 0.55 && rect.bottom > 0;
}

function staggerDelay(el: HTMLElement): number {
	const raw = el.style.getPropertyValue('--i') || '0';
	const i = Number.parseInt(raw, 10);
	if (!Number.isFinite(i) || i <= 0) return 0;
	return Math.min(i, MAX_STAGGER) * STAGGER;
}

function bindReveal(el: HTMLElement): void {
	if (!gsap || !ScrollTrigger || bound.has(el)) return;
	bound.add(el);

	const variant = el.getAttribute('data-reveal');
	const delay = staggerDelay(el);
	const start = fromVars(variant);

	el.setAttribute('data-reveal-armed', '');
	scheduleElementFailsafe(el);
	gsap.set(el, { ...start, force3D: true });

	ScrollTrigger.create({
		trigger: el,
		start: 'top 90%',
		once: true,
		onEnter: () => {
			if (!gsap) {
				forceVisible(el);
				return;
			}
			gsap.to(el, {
				opacity: 1,
				x: 0,
				y: 0,
				scale: 1,
				duration: DURATION,
				delay,
				ease: EASE,
				overwrite: 'auto',
				onComplete: () => {
					el.classList.add('is-visible');
					el.removeAttribute('data-reveal-armed');
					el.style.removeProperty('will-change');
					const pending = armedFailsafe.get(el);
					if (pending) {
						window.clearTimeout(pending);
						armedFailsafe.delete(el);
					}
					gsap?.set(el, { clearProps: 'opacity,transform,x,y,scale' });
				},
			});
		},
	});
}

function observeNewTargets(): void {
	if (prefersReducedMotion()) {
		for (const el of collectTargets()) {
			bound.add(el);
			forceVisible(el);
		}
		return;
	}

	if (!gsap || !ScrollTrigger) return;

	prepareGroups();
	const targets = collectTargets();
	if (!targets.length) return;

	for (const el of targets) {
		if (!hasLayout(el)) {
			bound.add(el);
			forceVisible(el);
			continue;
		}

		// Above-fold (incl. initial blog island cards): never hide for LCP/CLS.
		if (isAboveFold(el)) {
			bound.add(el);
			forceVisible(el);
			continue;
		}

		// Below-fold Load More / search results keep data-reveal and animate once.
		bindReveal(el);
	}

	ScrollTrigger.refresh();
}

function queueObserve(): void {
	if (observeQueued) return;
	observeQueued = true;
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			observeQueued = false;
			void ensureGsap().then((ok) => {
				if (ok) observeNewTargets();
				else {
					for (const el of collectTargets()) forceVisible(el);
				}
			});
		});
	});
}

function killPageTriggers(): void {
	if (ScrollTrigger) {
		ScrollTrigger.getAll().forEach((t) => t.kill());
	}
}

async function ensureGsap(): Promise<boolean> {
	if (gsap && ScrollTrigger) return true;
	if (prefersReducedMotion()) return false;
	if (!loadPromise) {
		loadPromise = (async () => {
			try {
				const [{ default: g }, { ScrollTrigger: ST }] = await Promise.all([
					import('gsap'),
					import('gsap/ScrollTrigger'),
				]);
				g.registerPlugin(ST);
				gsap = g;
				ScrollTrigger = ST;
				return true;
			} catch {
				loadPromise = null;
				return false;
			}
		})();
	}
	return loadPromise;
}

function scheduleGsapLoad(run: () => void): void {
	const start = () => {
		if ('requestIdleCallback' in window) {
			requestIdleCallback(() => run(), { timeout: 1800 });
		} else {
			setTimeout(run, 1);
		}
	};
	if (document.readyState === 'complete') start();
	else window.addEventListener('load', start, { once: true });
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

function onPageLoad(): void {
	/* Soft nav after first idle: re-bind. First visit waits for scheduleGsapLoad. */
	if (!idleReady) return;
	queueObserve();
}

function onBeforeSwap(): void {
	killPageTriggers();
}

function init(): void {
	watchDom();
	document.addEventListener('astro:page-load', onPageLoad);
	document.addEventListener('astro:before-swap', onBeforeSwap);

	if (prefersReducedMotion()) {
		for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
			forceVisible(el);
		}
		idleReady = true;
		return;
	}

	// Defer GSAP until after load/idle so LCP/FCP are not blocked.
	scheduleGsapLoad(() => {
		idleReady = true;
		queueObserve();
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
	init();
}
