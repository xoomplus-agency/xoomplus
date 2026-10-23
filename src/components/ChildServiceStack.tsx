/**
 * Desktop ScrollStack island for child-page Services cards.
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

function StaticCardList({ cards }: { cards: ChildServicesCard[] }) {
	return (
		<ul className="child-stack-list m-0 list-none p-0" role="list">
			{cards.map((card) => (
				<li key={card.title} className="child-stack-list__item">
					<div className="scroll-stack-card child-stack-card">
						<CardBody card={card} />
					</div>
				</li>
			))}
		</ul>
	);
}

export default function ChildServiceStack({
	cards,
	rootId = 'child-service-stack-root',
}: ChildServiceStackProps) {
	/* Island only mounts via client:media ≥768px — default to stack; opt out for reduced motion. */
	const [useStack, setUseStack] = useState(true);

	useLayoutEffect(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const sync = () => setUseStack(!motion.matches);
		sync();
		motion.addEventListener('change', sync);

		const root = document.getElementById(rootId);
		root?.setAttribute('data-mode', 'hydrated');

		return () => {
			motion.removeEventListener('change', sync);
			root?.setAttribute('data-mode', 'ssr');
		};
	}, [rootId]);

	if (!useStack) {
		return <StaticCardList cards={cards} />;
	}

	return (
		<ScrollStack
			className="child-service-stack__scroll"
			useWindowScroll
			smoothScroll={false}
			snap={false}
			itemDistance={40}
			itemStackDistance={20}
			stackPosition={124}
			itemScale={0.04}
			baseScale={0.9}
			dimAmount={0.06}
			blurAmount={0}
			tiltAmount={0}
			rotationAmount={0}
			holdDistance={120}
		>
			{cards.map((card) => (
				<ScrollStackItem key={card.title} itemClassName="child-stack-card">
					<CardBody card={card} />
				</ScrollStackItem>
			))}
		</ScrollStack>
	);
}
