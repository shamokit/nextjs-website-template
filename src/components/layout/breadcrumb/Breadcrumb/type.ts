import { BreadcrumbItemProps } from '@/components/layout/breadcrumb/Breadcrumb/BreadcrumbItem/type'

export type BreadcrumbProps = {
	list: BreadcrumbItemProps[]
	withJsonLd?: boolean
	separator?: React.ReactNode
}
export type BreadcrumbJson = {
	'@type': 'ListItem'
	position: number
	name: string
	item: string
}
