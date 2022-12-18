export type TabProps = {
	className?: string
	title: React.ReactNode
	index: number
	activeFirst?: boolean
	children: React.ReactNode
	onClick?: (e: React.MouseEvent, index: number) => void
	onToggle?: (
		e: React.SyntheticEvent<HTMLDetailsElement, Event>,
		index: number
	) => false | void
	onKeyUp?: (e: React.KeyboardEvent<HTMLElement>, index: number) => void
}
