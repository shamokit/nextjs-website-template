import { useState, useEffect } from 'react'
import type { NextPage, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import axios from 'axios'
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
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(false)
	const { query } = useQuery()

	useEffect(() => {
		const { secret, contentId } = query
		setLoading(true)
		if (secret && contentId) {
			const last = Array.isArray(contentId) ? contentId.slice(-1)[0] : contentId
			console.log(last)
			axios
				.get(`/api/preview?secret=${secret}&contentId=${last}`)
				.then((res) => res)
				.then((data) => {
					console.log(data)
					// setData(data)
					setLoading(false)
				})
		}
	}, [query])
	return (
		<>
			<NextSeo noindex />
			<main>{`${isLoading}`}</main>
		</>
	)
}

export default StaticPage
