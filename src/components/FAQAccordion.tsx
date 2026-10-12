import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export type FAQItem = {
	id: string;
	question: string;
	answer: string;
};

type FAQAccordionProps = {
	items: FAQItem[];
	/** Index of item open on load; null = all closed. Default 0 (first item). */
	defaultOpen?: number | null;
};

function ToggleIcon() {
	return (
		<span
			className="relative flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255,168,0,0.3)] transition-colors duration-[250ms] ease-in-out group-data-[state=open]:bg-[#FFA800]"
			aria-hidden="true"
		>
			<svg
				className="absolute size-3 group-data-[state=open]:hidden"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M6 2.5V9.5M2.5 6H9.5"
					stroke="white"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
			</svg>
			<svg
				className="absolute size-3 hidden group-data-[state=open]:block"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M2.5 6H9.5"
					stroke="white"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
			</svg>
		</span>
	);
}

export default function FAQAccordion({ items, defaultOpen = 0 }: FAQAccordionProps) {
	const defaultValue =
		defaultOpen === null || defaultOpen === undefined
			? undefined
			: items[defaultOpen]?.id;

	return (
		<Accordion
			type="single"
			collapsible
			defaultValue={defaultValue}
			className="flex w-full flex-col gap-2.5"
		>
			{items.map((item) => (
				<AccordionItem
					key={item.id}
					value={item.id}
					className="overflow-hidden rounded-lg border border-solid border-[#E9E9E7] bg-white transition-[background-color] duration-[250ms] ease-in-out data-[state=closed]:bg-white data-[state=open]:bg-[#F7F7F5] max-sm:max-w-full [@media(hover:hover)]:data-[state=closed]:hover:border-[#DEDEDC] [@media(hover:hover)]:data-[state=closed]:hover:bg-[#FCFCFB]"
				>
					<AccordionTrigger className="text-h4 w-full gap-4 p-[clamp(1rem,0.8rem+1vw,1.625rem)] text-left font-[family-name:var(--font-inter)] text-primary-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FFA800]">
						<span className="min-w-0 flex-1 pr-2">{item.question}</span>
						<ToggleIcon />
					</AccordionTrigger>
					<AccordionContent className="faq-answer text-small px-[clamp(1rem,0.8rem+1vw,1.625rem)] pb-[clamp(1rem,0.8rem+1vw,1.625rem)] pt-0 font-[family-name:var(--font-inter)] text-[#555555]">
						{/* Answers are trusted content from our data files only. */}
						<div dangerouslySetInnerHTML={{ __html: item.answer }} />
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
