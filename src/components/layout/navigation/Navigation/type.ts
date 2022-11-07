type Menu = {
	href: string
	name: string
	children?: Menu[]
}[]
export type NavigationProps = {
	menu: Menu
	className: string
}
