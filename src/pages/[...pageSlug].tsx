import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import { NextSeo } from '@/libs/next-seo'
import { apiClient } from '@/libs/newt-api-client'
import { SITE_URL } from '@/utils/meta'
import type { PageContent } from '@/schemas/staticPage/type'
import { Breadcrumb } from '@/components/layout/breadcrumb/Breadcrumb'
import type { BreadcrumbProps } from '@/components/layout/breadcrumb/Breadcrumb/type'
import { generateBreadcrumbObjects } from '@/components/layout/breadcrumb/functions/generateBreadcrumbObjects'
const fetchPages = async () => {
	const data = await apiClient.staticPage.pageData.$get()
	return { data }
}
const fetchPage = async (pageSlug: string) => {
	const data = await apiClient.staticPage.pageData.$get({
		query: {
			limit: 1,
			slug: pageSlug,
			depth: 2,
		},
	})

	return { data: data.items[0] }
}
type PageProps = {
	pageData?: PageContent
	breadcrumb?: BreadcrumbProps
	status?: string
}
type Params = ParsedUrlQuery & {
	pageSlug: string[]
}
export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await fetchPages()
	const slugs = data.items.map((page) => page.slug)
	const reverseSlugs = [...slugs].reverse()

	const stringPaths: string[] = []
	reverseSlugs.forEach((path, index) => {
		const prev = stringPaths[index - 1]
		stringPaths[index] = prev ? `${prev}/${path}` : path
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
export const getStaticProps: GetStaticProps<PageProps, Params> = async ({ params }) => {
	try {
		if (!params) return { props: { status: 'no param' } }
		const { pageSlug } = params
		const slug = pageSlug[pageSlug.length - 1]
		const { data } = await fetchPage(slug)

		if (!data) {
			return { props: { status: 'nodata' } }
		}
		const { pageObjects: breadcrumbList } = generateBreadcrumbObjects(data)
		return {
			props: {
				pageData: data,
				breadcrumb: {
					list: breadcrumbList,
				},
			},
		}
	} catch (error) {
		if (error instanceof Error) {
			return { props: { status: error.message } }
		}
		throw error
	}
}

const StaticPage: NextPage<PageProps> = ({ pageData, breadcrumb }) => {
	const pageSlug = breadcrumb?.list.slice(-1)[0].path
	return (
		<>
			{pageData && (
				<>
					<NextSeo
						titleTemplate={pageData.meta?.title}
						title={pageData.meta?.title ? pageData.meta?.title : pageData.title}
						description={
							pageData.meta?.description ? pageData.meta?.description : pageData.title
						}
						canonical={`${SITE_URL}/${pageSlug}`}
					/>
					<main>
						<article>
							<h1>{pageData.title}</h1>
						</article>
					</main>
					{breadcrumb && <Breadcrumb {...breadcrumb} />}
				</>
			)}
		</>
	)
}

export default StaticPage
