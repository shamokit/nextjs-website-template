import { useState, useEffect } from 'react'
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import axios from 'axios'
import { apiClient, previewApiClient } from '@/lib/apiClient'
import type { PageContent } from '@/components/model/staticPage/type'
import { ParsedUrlQuery } from 'node:querystring'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/breadcrumb'
import { useRouter } from 'next/router'

const fetchPages = async () => {
	const data = await apiClient.staticPage.pageData.$get()

	return { data }
}
const fetchPreviewPage = async (pageSlug: string) => {
	const data = await previewApiClient.staticPage.pageData.$get({
		query: {
			limit: 1,
			slug: pageSlug,
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
	pageSlug: string[]
}

export const getStaticProps = async () => {
	return {
		props: {},
	}
}
export const getStaticPaths: GetStaticPaths = async () => {
	const pages: string[] = []
	const getParentData = (data: PageContent) => {
		if (data.parent) {
			pages.push(data.slug)
			getParentData(data.parent)
		} else {
			pages.push(data.slug)
		}
	}
	const { data } = await fetchPreviewPage('testpage')
	const pageData = data.items[0]
	getParentData(pageData)

	const reversePages = [...pages].reverse()
	const slugs: string[] = []
	reversePages.forEach((slug, index) => {
		const prev = slugs[index - 1]
		const slugsData = prev ? `${prev}/${slug}` : slug
		slugs[index] = slugsData
	})

	const paths = slugs.map((slug) => {
		return {
			params: {
				pageSlug: slug.split('/'),
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
	const router = useRouter()
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(false)
	const { query } = useQuery()

	useEffect(() => {
		const { secret, pageSlug } = query
		setLoading(true)
		if (secret && pageSlug) {
			const last = pageSlug.slice(-1)[0]
			axios
				.get(`/api/preview?secret=${secret}&slug=${last}`)
				.then((res) => res)
				.then((data) => {
					// setData(data)
					console.log(data)
					// setLoading(false)
				})
		}
	}, [query])
	return (
		<>
			<NextSeo noindex />
			<main>test</main>
		</>
	)
}

export default StaticPage
