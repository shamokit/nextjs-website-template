import type { AccordionProps } from '@/components/ui/accordion/Accordion/type'
export type FaqItemProps = AccordionProps
export type FaqItemsProps = {
	faqs: AccordionProps[]
	jsonLd?: boolean
}
