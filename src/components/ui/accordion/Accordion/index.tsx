import { useRef } from 'react'
import type { AccordionProps } from './type'
import { useToggle } from '@/utils/useToggle'
export const Accordion: React.FC<AccordionProps> = ({
	title,
	children,
	...toggleProps
}) => {
	const accordionRef = useRef<HTMLDetailsElement>(null)
	const accordionContentRef = useRef<HTMLDivElement>(null)
	const [, , doAccordion] = useToggle(
		accordionRef,
		accordionContentRef,
		toggleProps.openDefault,
		toggleProps.animation,
		toggleProps.animationTimingOpen,
		toggleProps.animationTimingClose,
		toggleProps.animationAction
	)
	return (
		<details ref={accordionRef}>
			<summary onClick={(e) => doAccordion(e)}>{title}</summary>
			<div ref={accordionContentRef} className="overflow-hidden">
				{children}
			</div>
		</details>
	)
}
