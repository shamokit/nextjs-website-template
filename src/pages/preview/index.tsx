import type { NextPage } from 'next'
import { useState } from 'react'
import { NextSeo } from '@/libs/next-seo'
import { usePreview } from '@/libs/microcms-api-client'
// import { usePreview } from '@/libs/newt-api-client'
import { SITE_URL } from '@/utils/meta'
import type { PageContent } from '@/schemas/staticPage/type'
import { Breadcrumb } from '@/components/layout/breadcrumb/Breadcrumb'
import type { BreadcrumbItemProps } from '@/components/layout/breadcrumb/Breadcrumb/BreadcrumbItem/type'
import { generateBreadcrumbObjects } from '@/components/layout/breadcrumb/functions/generateBreadcrumbObjects'
import { useEffect } from 'react'

type PageProps = {
	pageData?: PageContent
	breadcrumb?: BreadcrumbItemProps[]
	status?: string
}
const StaticPage: NextPage<PageProps> = () => {
	const [prevPageResponse] = usePreview<PageContent>()
	const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemProps[]>()
	useEffect(() => {
		if(!prevPageResponse) return
		const { pageObjects: breadcrumbList } = generateBreadcrumbObjects(prevPageResponse)
		setBreadcrumb(breadcrumbList)
	}, [prevPageResponse])
	const pageSlug = breadcrumb?.slice(-1)[0].path
	const canonical = new URL(pageSlug ?? '', SITE_URL).toString()
	return (
		<>
			{prevPageResponse && (
				<>
					<NextSeo
						titleTemplate={prevPageResponse.meta?.title}
						title={prevPageResponse.meta?.title ?? prevPageResponse.title}
						description={prevPageResponse.meta?.description ?? prevPageResponse.title}
						canonical={canonical}
						noindex
					/>
					<main>
						<h1>{prevPageResponse.title}</h1>
					</main>
					{breadcrumb && <Breadcrumb list={breadcrumb} />}
				</>
			)}
		</>
	)
}

export default StaticPage
