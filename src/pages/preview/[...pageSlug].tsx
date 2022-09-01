import type { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { previewApiClient } from '@/lib/apiClient'
import type { PageContent } from '@/components/model/staticPage/type'
import { ParsedUrlQuery } from 'node:querystring'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/breadcrumb'

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

export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (context) => {
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

		const { secret } = context.query;
		if (secret !== process.env.PREVIEW_SECRET_KEY) {
			new Response('error', { status: 400 })
		}
		const slug = pageSlug[pageSlug.length - 1]
		const { data } = await fetchPreviewPage(slug)
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
const StaticPage: NextPage<PageProps> = ({ pageData, breadcrumb }) => (
	<>
		<NextSeo
			titleTemplate={pageData?.meta?.title}
			title={pageData?.meta?.title ? pageData?.meta?.title : pageData?.pageName}
			description="Page Description"
			noindex={true}
		/>
		<main>
			<>
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
