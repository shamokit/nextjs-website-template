import { useState, useEffect } from 'react'
import type { NextPage, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import axios from 'axios'
import { SITE_URL } from '@/lib/const'
import { previewApiClient } from '@/lib/apiClient'
import type { PageContent } from '@/components/model/staticPage/type'
import { ParsedUrlQuery } from 'node:querystring'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/breadcrumb'
import { useRouter } from 'next/router'

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
	pageData?: PageContent | undefined
	breadcrumb?: BreadcrumbItem[]
	status?: string
}
type Params = ParsedUrlQuery & {
	contentId: string[]
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
	const [breadcrumb, setBreadcrumb] = useState(null)
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(false)
	const { query } = useQuery()
	const pageSlug = breadcrumb?.slice(-1)[0].url

	useEffect(() => {
		const { secret, contentId } = query
		setLoading(true)
		if (secret && contentId) {
			const last = Array.isArray(contentId) ? contentId.slice(-1)[0] : contentId
			axios
			.get(`/api/preview?secret=${secret}&contentId=${last}`)
			.then((res) => res)
			.then((data) => {
				console.log(data)
				setData(data)
				setLoading(false)
				const pages: { pageName: string; slug: string }[] = []
				const getParentData = (data: PageContent) => {
					if (data.parent) {
						pages.push({ pageName: data.pageName, slug: data.slug })
						getParentData(data.parent)
					} else {
						pages.push({ pageName: data.pageName, slug: data.slug })
					}
				}
				getParentData(data)

				const reversePages = [...pages].reverse()

				const breadcrumb: BreadcrumbItem[] = []
				reversePages.forEach((page, index) => {
					const prev = breadcrumb[index - 1]
					const breadcrumbData = prev
						? {
								name: page.pageName,
								url: `${prev.url}/${page.slug}`,
							}
						: {
								name: page.pageName,
								url: page.slug,
							}
					breadcrumb[index] = breadcrumbData
				})
				console.log(breadcrumb)
				setBreadcrumb(breadcrumb)
			})
		}
	}, [query])
	return (
		<>
			<NextSeo
				titleTemplate={data?.meta?.title}
				title={data?.meta?.title ? data?.meta?.title : data?.pageName}
				description="Page Description"
				canonical={`${SITE_URL}/${pageSlug}`}
				noindex
			/>
			<main>
				{data && (
					<>
						<p>{data?.pageName}</p>
					</>
				)}
				{breadcrumb && <Breadcrumb list={breadcrumb} />}
			</main>
		</>
	)
}

export default StaticPage
