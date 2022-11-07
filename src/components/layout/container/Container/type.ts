export type ContainerSizeList = 'full' | 'large' | 'default'
export type ContainerProps = {
	children: React.ReactNode
	className?: string
	size?: ContainerSizeList
	withDefaultPaddingSide?: boolean
}
