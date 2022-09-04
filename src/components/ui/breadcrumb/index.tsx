import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'
import { BreadcrumbList } from 'schema-dts'
import { InnerLink } from '@/components/ui/link/InnerLink/index'
import { SITE_URL } from '@/lib/const'
export type BreadcrumbProps = {
	list: BreadcrumbItem[]
	separator?: React.ReactNode
	withJsonLd?: boolean
}
export type BreadcrumbJson = {
	'@type': 'ListItem'
	position: number
	name: string
	item: string
}
export type BreadcrumbItem = {
	name: string
	url: string
}
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
	list,
	separator = '>',
	withJsonLd = true,
}) => {
	const breadcrumbJson: BreadcrumbJson[] = [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: `${SITE_URL}/`,
		},
		...list.map((item, index) => {
			return {
				'@type': 'ListItem',
				position: index + 2,
				name: item.name,
				item: `${SITE_URL}/${item.url}`,
			} as BreadcrumbJson
		}),
	]
	const breadcrumbJsonLength = breadcrumbJson.length

	return (
		<>
			{withJsonLd && (
				<Head>
					<script
						{...jsonLdScriptProps<BreadcrumbList>({
							'@context': 'https://schema.org',
							'@type': 'BreadcrumbList',
							itemListElement: breadcrumbJson,
						})}
					/>
				</Head>
			)}
			<div className="overflow-hidden">
				<ol className="flex flex-wrap -mr-4xs">
					{breadcrumbJson.map((item, index) => {
						return (
							<li key={item.item} className="flex mr-4xs">
								{index > 0 && (
									<span aria-hidden className="flex-grow-0 flex-shrink-0 mr-4xs">
										{separator}
									</span>
								)}
								{breadcrumbJsonLength === index + 1 ? (
									<span>{item.name}</span>
								) : (
									<InnerLink href={item.item}>{item.name}</InnerLink>
								)}
							</li>
						)
					})}
				</ol>
			</div>
		</>
	)
}
