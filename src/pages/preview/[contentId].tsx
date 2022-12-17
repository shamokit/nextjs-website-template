import { useState, useEffect } from 'react'
import type { NextPage, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from '@/libs/next-seo'
import axios from 'axios'
import { SITE_URL } from '@/utils/meta'
import { previewApiClient } from '@/libs/newt-api-client'
import type { PageContent } from '@/schemas/staticPage/type'
import { Breadcrumb } from '@/components/layout/breadcrumb/Breadcrumb'
import type { BreadcrumbItemProps } from '@/components/layout/breadcrumb/Breadcrumb/BreadcrumbItem/type'
import { generateBreadcrumbObjects } from '@/components/layout/breadcrumb/functions/generateBreadcrumbObjects'

const fetchPreviewPages = async () => {
	const data = await previewApiClient.staticPage.pageData.$get({
		query: {
			limit: 1000,
			depth: 2,
		},
	})

	return { data }
}
type PageProps = {
	pageData?: PageContent
	breadcrumb?: BreadcrumbItemProps[]
	status?: string
}

export const getStaticProps = async () => {
	return {
		props: {},
	}
}
export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await fetchPreviewPages()
	const pages = data.items
	const pageContentIds = pages.map((page) => page._id)
	const paths = pageContentIds.map((contentId) => {
		return {
			params: {
				contentId: contentId,
			},
		}
	})
	return {
		paths,
		fallback: 'blocking',
	}
}

const useQuery = () => {
	const router = useRouter()
	return router
}
const StaticPage: NextPage<PageProps> = () => {
	const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemProps[] | null>(null)
	const [data, setData] = useState<PageContent | null>(null)
	const [isLoading, setLoading] = useState(false)
	const { query } = useQuery()
	const pageSlug = breadcrumb?.slice(-1)[0].path

	useEffect(() => {
		const { secret, contentId } = query
		if (secret && contentId) {
			setLoading(true)
			const last = Array.isArray(contentId) ? contentId.slice(-1)[0] : contentId
			axios
				.get<PageContent>(`/api/preview?secret=${secret}&contentId=${last}`)
				.then((data) => {
					setData(data.data)
					const { pageObjects: breadcrumbList } = generateBreadcrumbObjects(data.data)
					setBreadcrumb(breadcrumbList)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [query])
	const canonical = new URL(pageSlug ?? '', SITE_URL).toString()
	return (
		<>
			{isLoading && <p>Loading...</p>}
			{data && (
				<>
					<NextSeo
						titleTemplate={data.meta?.title}
						title={data.meta?.title ?? data.title}
						description={data.meta?.description ?? data.title}
						canonical={canonical}
						noindex
					/>
					<main>
						<article>
							<h1>{data.title}</h1>
						</article>
					</main>
					{breadcrumb && <Breadcrumb list={breadcrumb} />}
				</>
			)}
		</>
	)
}

export default StaticPage
