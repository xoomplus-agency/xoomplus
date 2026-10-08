import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQItem = {
	id: string;
	question: string;
	answer: string;
};

type FAQAccordionProps = {
	items: FAQItem[];
};

function ToggleIcon() {
	return (
		<span
			className="relative flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255,168,0,0.3)] transition-colors duration-[250ms] ease-in-out group-data-[state=open]:bg-[#FFA800]"
			aria-hidden="true"
		>
			{/* Plus — visible when closed */}
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
			{/* Minus — visible when open */}
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

export default function FAQAccordion({ items }: FAQAccordionProps) {
	return (
		<Accordion
			type="single"
			collapsible
			defaultValue="item-1"
			className="flex w-full flex-col gap-2.5"
		>
			{items.map((item) => (
				<AccordionItem
					key={item.id}
					value={item.id}
					className="overflow-hidden rounded-lg border border-solid border-[#E9E9E7] bg-white transition-[background-color] duration-[250ms] ease-in-out data-[state=closed]:bg-white data-[state=open]:bg-[#F7F7F5] max-sm:max-w-full [@media(hover:hover)]:data-[state=closed]:hover:border-[#DEDEDC] [@media(hover:hover)]:data-[state=closed]:hover:bg-[#FCFCFB]"
				>
					<AccordionTrigger className="w-full gap-4 p-[26px] text-left font-[family-name:var(--font-inter)] text-base font-medium text-primary-black max-sm:p-[18px] max-sm:text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FFA800]">
						<span className="min-w-0 flex-1 pr-2">{item.question}</span>
						<ToggleIcon />
					</AccordionTrigger>
					<AccordionContent className="px-[26px] pb-[26px] pt-0 font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.6] text-[#555555] max-sm:px-[18px] max-sm:pb-[18px] max-sm:text-[14px]">
						{item.answer}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
