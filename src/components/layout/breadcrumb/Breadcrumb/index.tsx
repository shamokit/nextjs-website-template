import Head from 'next/head'
import { jsonLdScriptProps } from '@/libs/react-schemaorg'
import type { BreadcrumbList } from '@/libs/schema-dts'
import { SITE_URL } from '@/utils/meta'
import { BreadcrumbItem } from '@/components/layout/breadcrumb/Breadcrumb/BreadcrumbItem'
import {
	BreadcrumbProps,
	BreadcrumbJson,
} from '@/components/layout/breadcrumb/Breadcrumb/type'

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ list, withJsonLd = true }) => {
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
				name: item.title,
				item: `${SITE_URL}/${item.path}`,
			} as BreadcrumbJson
		}),
	]
	const breadcrumbJsonLength = breadcrumbJson.length

	return (
		<>
			{withJsonLd ? (
				<Head>
					<script
						{...jsonLdScriptProps<BreadcrumbList>({
							'@context': 'https://schema.org',
							'@type': 'BreadcrumbList',
							itemListElement: breadcrumbJson,
						})}
					/>
				</Head>
			) : null}
			<div className="overflow-hidden">
				<ol className="flex flex-wrap -mr-2">
					{breadcrumbJson.map((item, index) => {
						return (
							<BreadcrumbItem
								key={item.item}
								path={item.item}
								title={item.name}
								separator={index > 0 ? '>' : ''}
								isLink={true}
								current={breadcrumbJsonLength !== index + 1}
							/>
						)
					})}
				</ol>
			</div>
		</>
	)
}
