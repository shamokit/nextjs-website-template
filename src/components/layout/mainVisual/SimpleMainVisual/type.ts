import type { ArtDirectionProps } from '@/components/ui/image/ArtDirection/type'

export type SimpleMainVisualProps = {
	title: string
	copy: string
	activeHeadingTag?: boolean
	children: React.ReactElement<ArtDirectionProps>
}
