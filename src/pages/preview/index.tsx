import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from "next/router";
import { NextSeo } from '@/libs/next-seo'
import { SITE_URL } from '@/utils/meta'
import type { PageContent } from '@/schemas/staticPage/type'
import { Breadcrumb } from '@/components/layout/breadcrumb/Breadcrumb'
import type { BreadcrumbItemProps } from '@/components/layout/breadcrumb/Breadcrumb/BreadcrumbItem/type'
import { generateBreadcrumbObjects } from '@/components/layout/breadcrumb/functions/generateBreadcrumbObjects'
import { previewFetchConfig } from '@/libs/newt-api-client'
import { useEffect } from 'react'

type PageProps = {
	pageData?: PageContent
	breadcrumb?: BreadcrumbItemProps[]
	status?: string
}
const StaticPage: NextPage<PageProps> = () => {
  const [data, setData] = useState<PageContent>()
  // const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemProps[]>([])
  const router = useRouter();
	useEffect(() => {
		const getPageData = async () => {
			if(!router.isReady) return
			const { query: {contentId, appUID, modelUID} } = router
			if (!contentId) return
			const res = await fetch(
				`/api/preview/?appUID=${appUID}&modelUID=${modelUID}&contentId=${contentId.toString()}`,
				previewFetchConfig
			)
			const data = await res.json()
			if(!data) return
			// const { pageObjects: breadcrumbList } = generateBreadcrumbObjects(data)
			setData(data)
			console.log(data)
			// setBreadcrumb(breadcrumbList)
		}
		getPageData()
	},[router])
	// const pageSlug = breadcrumb?.slice(-1)[0].path
	// const canonical = new URL(pageSlug ?? '', SITE_URL).toString()
	return (
		<>
			{data && (
				<>
					<NextSeo
						titleTemplate={data.meta?.title}
						title={data.meta?.title ?? data.title}
						description={data.meta?.description ?? data.title}
						// canonical={canonical}
						noindex
					/>
					<main>
						<article>
							<h1>{data.title}</h1>
						</article>
					</main>
					{/* {breadcrumb && <Breadcrumb list={breadcrumb} />} */}
				</>
			)}
		</>
	)
}

export default StaticPage
