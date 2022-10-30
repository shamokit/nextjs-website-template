import { Container } from '@/components/layout/Container'
import { Text } from '@/components/ui/text/Text'
import type {SimpleMainVisualProps} from './type'
export const SimpleMainVisual: React.FC<SimpleMainVisualProps> = ({
	title,
	copy,
	headingTag = true,
	children,
}) => {
	const HeadingTag = headingTag ? 'h1' : 'p'
	return (
		<div className="grid grid-cols-1 grid-rows-1">
			{children}
			<Container className="grid items-center col-start-1 col-end-1 row-start-1 row-end-1">
				<div className="text-white">
					<Text as={HeadingTag} text={title} />
					<Text as="p" text={copy} />
				</div>
			</Container>
		</div>
	)
}
