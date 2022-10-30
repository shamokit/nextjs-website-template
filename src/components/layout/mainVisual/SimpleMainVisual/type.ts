import type { ArtDirectionProps } from '@/components/ui/image/ArtDirection/type'
import type { PictureProps } from '@/components/ui/image/Picture/type'
export type SimpleMainVisualProps = {
	title: string
	copy: string
	headingTag?: boolean
	children: React.ReactElement<ArtDirectionProps | PictureProps>
}
