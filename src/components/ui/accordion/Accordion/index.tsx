import { useRef } from 'react'
import type { AccordionProps } from './type'
import { useToggle } from '@/utils/useToggle'
export const Accordion: React.FC<AccordionProps> = ({
	title,
	children,
	className,
	animation,
	openDefault,
}) => {
	const accordionRef = useRef<HTMLDetailsElement>(null)
	const accordionContentRef = useRef<HTMLDivElement>(null)
	const [, doAccordion] = useToggle({
		accordionRef,
		accordionContentRef,
		animation,
		initialValue: openDefault,
	})
	return (
		<details ref={accordionRef}>
			<summary onClick={(e) => doAccordion(e)} className={className}>
				{title}
			</summary>
			<div ref={accordionContentRef} className="overflow-hidden">
				{children}
			</div>
		</details>
	)
}
