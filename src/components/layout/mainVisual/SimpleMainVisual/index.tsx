import styles from './index.module.css'
import { Container } from '@/components/layout/Container'
import { Image, type ImageProps } from '@/components/ui/image/Image'
import { Text } from '@/components/ui/text/Text'
type SimpleMainVisualProps = {
	image: ImageProps
	title: string
	copy: string
	useHeadingTag?: boolean
}
export const SimpleMainVisual: React.FC<SimpleMainVisualProps> = ({
	title,
	copy,
	image,
	useHeadingTag = true,
}) => {
	const HeadingTag = useHeadingTag ? 'h1' : 'p'
	return (
		<div className={`grid ${styles.SimpleMainVisual}`}>
			<Image
				className={{
					picture: `${styles.SimpleMainVisual__cell}`,
					img: "w-full"
				}}
				md={image.md}
				sm={image.sm}
				alt={image.alt ?? ''}
				width={image.width}
				height={image.height}
				loading={image.loading}
			/>
			<Container className={`grid items-center ${styles.SimpleMainVisual__cell}`}>
				<div className="text-white">
					<Text as={HeadingTag} text={title} />
					<Text as="p" text={copy} />
				</div>
			</Container>
		</div>
	)
}
