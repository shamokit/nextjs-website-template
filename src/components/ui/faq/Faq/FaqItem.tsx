import { Accordion } from '@/components/ui/accordion/Accordion/index'
import type { FaqItemProps } from './type'
export const FaqItem: React.FC<FaqItemProps> = ({
	title,
	children
}) => {
	return (
		<>
			<Accordion title={title}>
				<div dangerouslySetInnerHTML={{ __html: `${children}` }} />
			</Accordion>
		</>
	)
}
