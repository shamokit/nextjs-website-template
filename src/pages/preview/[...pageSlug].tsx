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
	const { data } = await fetchPages()
	const slugs = data.items.map((page) => page.slug)
	const reverseSlugs = [...slugs].reverse()

	const stringPaths: string[] = []
	reverseSlugs.forEach((path, index) => {
		const prev = stringPaths[index - 1]
		stringPaths[index] = prev ? `${stringPaths[index - 1]}/${path}` : path
	})
	const paths = stringPaths.map((slug) => {
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
  const router = useRouter();
  return router;
}

const StaticPage: NextPage<PageProps> = () => {
	const router = useRouter()
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(false)
	const {query} = useQuery()

	useEffect(() => {
		const {secret, pageSlug} = query
		setLoading(true)
		if(secret) {
			axios.get(`/api/preview?secret=${secret}&slug=${pageSlug}`)
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
			<NextSeo
				noindex
			/>
			<main>
				test
			</main>
		</>
	)
}

export default StaticPage
