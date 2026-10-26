/**
 * ScrollStack island for child-page Services cards (all viewports).
 * Style only via props + itemClassName / wrapper class — do not edit ScrollStack.jsx.
 */
import { useLayoutEffect, useState } from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack.jsx';
import type { ChildServicesCard } from '../data/child-services';

export type ChildServiceStackProps = {
	cards: ChildServicesCard[];
	/** Root element id used to flip SSR fallback → hydrated stack (no duplicate visible cards). */
	rootId?: string;
};

type StackSettings = {
	stackPosition: number;
	itemDistance: number;
	itemStackDistance: number;
	itemScale: number;
	baseScale: number;
	dimAmount: number;
	holdDistance: number;
};

const DESKTOP_SETTINGS: StackSettings = {
	stackPosition: 124,
	itemDistance: 40,
	itemStackDistance: 20,
	itemScale: 0.04,
	baseScale: 0.9,
	dimAmount: 0.06,
	holdDistance: 120,
};

function readTopBarBottom(): number {
	const mobileNav = document.querySelector<HTMLElement>('[data-nav-mobile]');
	if (mobileNav) {
		const style = window.getComputedStyle(mobileNav);
		if (style.display !== 'none' && style.visibility !== 'hidden') {
			return mobileNav.getBoundingClientRect().bottom;
		}
	}
	const header = document.querySelector<HTMLElement>('[data-site-header]');
	return header?.getBoundingClientRect().height ?? 64;
}

/** Dock / ScrollToTop clearance so the last pinned card sits above bottom chrome. */
function readDockClearance(): number {
	const scrollTop = document.querySelector<HTMLElement>('.scroll-to-top, [data-scroll-to-top]');
	const btn = scrollTop?.getBoundingClientRect().height ?? 48;
	/* Safe-area is applied via CSS padding-bottom on the stack; keep a stable px floor here. */
	return Math.round(btn + 24);
}

function settingsForWidth(width: number): StackSettings {
	const top = readTopBarBottom();
	const dock = readDockClearance();

	if (width < 640) {
		return {
			stackPosition: Math.round(top + 16),
			itemDistance: 24,
			itemStackDistance: 12,
			itemScale: 0.03,
			baseScale: 0.92,
			dimAmount: 0.04,
			holdDistance: Math.max(80, dock),
		};
	}

	if (width < 1024) {
		return {
			stackPosition: Math.round(top + 24),
			itemDistance: 32,
			itemStackDistance: 16,
			itemScale: 0.035,
			baseScale: 0.9,
			dimAmount: 0.06,
			holdDistance: Math.max(100, dock),
		};
	}

	return { ...DESKTOP_SETTINGS };
}

function useStackSettings(): StackSettings {
	const [settings, setSettings] = useState<StackSettings>(DESKTOP_SETTINGS);

	useLayoutEffect(() => {
		let timer = 0;
		const apply = () => setSettings(settingsForWidth(window.innerWidth));
		apply();
		const onResize = () => {
			window.clearTimeout(timer);
			timer = window.setTimeout(apply, 150);
		};
		window.addEventListener('resize', onResize);
		return () => {
			window.clearTimeout(timer);
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return settings;
}

function CardBody({ card }: { card: ChildServicesCard }) {
	return (
		<article className="child-stack-card__body">
			<img
				className="child-stack-card__img"
				src={card.image.src}
				alt={card.image.alt}
				width={card.image.width ?? 800}
				height={card.image.height ?? 540}
				loading="lazy"
				decoding="async"
			/>
			<div className="child-stack-card__copy">
				<h3 className="child-stack-card__title">{card.title}</h3>
				<p className="child-stack-card__text">{card.text}</p>
			</div>
		</article>
	);
}

export default function ChildServiceStack({
	cards,
	rootId = 'child-service-stack-root',
}: ChildServiceStackProps) {
	/* Prefer SSR list for reduced motion; stack for everyone else once hydrated. */
	const [useStack, setUseStack] = useState(true);
	const settings = useStackSettings();

	useLayoutEffect(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const root = document.getElementById(rootId);

		const sync = () => {
			const reduce = motion.matches;
			setUseStack(!reduce);
			root?.setAttribute('data-mode', reduce ? 'static' : 'hydrated');
		};
		sync();
		motion.addEventListener('change', sync);

		return () => {
			motion.removeEventListener('change', sync);
			root?.setAttribute('data-mode', 'ssr');
		};
	}, [rootId]);

	/* Compact mobile cards when content would exceed pin viewport (top bar + dock). */
	useLayoutEffect(() => {
		if (!useStack) return;
		const root = document.getElementById(rootId);
		if (!root || window.innerWidth >= 640) {
			root?.classList.remove('child-service-stack--compact');
			return;
		}

		const available =
			window.innerHeight - settings.stackPosition - readDockClearance();
		const cardsEls = root.querySelectorAll<HTMLElement>(
			'.child-service-stack__island .child-stack-card',
		);
		let tooTall = false;
		cardsEls.forEach((el) => {
			if (el.offsetHeight > available) tooTall = true;
		});
		root.classList.toggle('child-service-stack--compact', tooTall);
	}, [useStack, settings, rootId, cards]);

	if (!useStack) {
		return null;
	}

	return (
		<ScrollStack
			className="child-service-stack__scroll"
			useWindowScroll
			smoothScroll={false}
			snap={false}
			itemDistance={settings.itemDistance}
			itemStackDistance={settings.itemStackDistance}
			stackPosition={settings.stackPosition}
			itemScale={settings.itemScale}
			baseScale={settings.baseScale}
			dimAmount={settings.dimAmount}
			blurAmount={0}
			tiltAmount={0}
			rotationAmount={0}
			holdDistance={settings.holdDistance}
		>
			{cards.map((card) => (
				<ScrollStackItem key={card.title} itemClassName="child-stack-card">
					<CardBody card={card} />
				</ScrollStackItem>
			))}
		</ScrollStack>
	);
}
