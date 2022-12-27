import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from '@/libs/next-seo'
import { previewApiClient } from '@/libs/newt-api-client'
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
	const [pageResponse, setPageResponse] = useState<PageContent>()
	const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemProps[]>()
	const router = useRouter()
	useEffect(() => {
		const getPageData = async () => {
			if (!router.isReady) return
			const {
				query: { contentId, appUID, modelUID, secret },
			} = router
			if (!appUID || !modelUID || !contentId || !secret) return
			const pageResponse = await previewApiClient.preview.$get({
				query: {
					appUID: appUID.toString(),
					modelUID: modelUID.toString(),
					contentId: contentId.toString(),
					secret: secret.toString(),
				}})
			if (!pageResponse) return
			const { pageObjects: breadcrumbList } = generateBreadcrumbObjects(pageResponse)
			setPageResponse(pageResponse)
			setBreadcrumb(breadcrumbList)
		}
		getPageData()
	}, [router])
	const pageSlug = breadcrumb?.slice(-1)[0].path
	const canonical = new URL(pageSlug ?? '', SITE_URL).toString()
	return (
		<>
			{pageResponse && (
				<>
					<NextSeo
						titleTemplate={pageResponse.meta?.title}
						title={pageResponse.meta?.title ?? pageResponse.title}
						description={pageResponse.meta?.description ?? pageResponse.title}
						canonical={canonical}
						noindex
					/>
					<main>
						<h1>{pageResponse.title}</h1>
					</main>
					{breadcrumb && <Breadcrumb list={breadcrumb} />}
				</>
			)}
		</>
	)
}

export default StaticPage
