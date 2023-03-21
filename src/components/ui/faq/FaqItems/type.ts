import type { FaqItemProps } from '@/components/ui/faq/FaqItem/type'

export type FaqItemsProps = {
	faqs: FaqItemProps[]
	jsonLd?: boolean
	className?: string
}
