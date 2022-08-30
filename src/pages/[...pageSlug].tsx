import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import { apiClient } from '@/lib/apiClient'
import type { PageContent } from '@/components/model/staticPage/type'
import { ParsedUrlQuery } from 'node:querystring'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/breadcrumb'
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

export const getStaticProps: GetStaticProps<PageProps, Params> = async (context) => {
	const pages: { pageName: string; slug: string }[] = []
	const getParentData = (data: PageContent) => {
		if (data.parent) {
			pages.push({ pageName: data.pageName, slug: data.slug })
			getParentData(data.parent)
		} else {
			pages.push({ pageName: data.pageName, slug: data.slug })
		}
	}
	try {
		if (!context.params) return { props: { status: 'no param' } }
		const { pageSlug } = context.params
		const slug = pageSlug[pageSlug.length - 1]
		const { data } = await fetchPage(slug)
		const pageData = data.items[0]

		if (!pageData) {
			return { props: { status: 'nodata' } }
		}
		getParentData(pageData)

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

		return {
			props: { pageData, breadcrumb },
		}
	} catch (error) {
		if (error instanceof Error) {
			return { props: { status: error.message } }
		}
		throw error
	}
}
export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await fetchPages()
	const slugs = data.items.map((page) => page.slug)
	const reverseSlugs = [...slugs].reverse()

	const stringPaths: string[] = []
	reverseSlugs.forEach((path, index) => {
		const prev = stringPaths[index - 1]
		stringPaths[index] = prev ? [stringPaths[index - 1], path].join('/') : path
	})
	const paths = stringPaths.map((slug) => {
		return {
			params: {
				pageSlug: [`${slug}`],
			},
		}
	})

	return {
		paths,
		fallback: "blocking",
	}
}
const StaticPage: NextPage<PageProps> = ({ pageData, breadcrumb }) => (
	<>
		<NextSeo
			titleTemplate={pageData?.meta?.title}
			title={pageData?.meta?.title ? pageData?.meta?.title : pageData?.pageName}
			description="Page Description"
		/>
		<main>
			<>
				<p>test</p>
				<p>test</p>
				<p>test</p>
				<p>test</p>
				<p>test</p>
				<p>test</p>
				{pageData && (
					<>
						<p>{pageData?.pageName}</p>
					</>
				)}
				{breadcrumb && <Breadcrumb list={breadcrumb} />}
			</>
		</main>
	</>
)

export default StaticPage
