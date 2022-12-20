import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { NextSeo } from '@/libs/next-seo'
import { SITE_URL } from '@/utils/meta'
import type { PageContent } from '@/schemas/staticPage/type'
import { Breadcrumb } from '@/components/layout/breadcrumb/Breadcrumb'
import type { BreadcrumbItemProps } from '@/components/layout/breadcrumb/Breadcrumb/BreadcrumbItem/type'
import { generateBreadcrumbObjects } from '@/components/layout/breadcrumb/functions/generateBreadcrumbObjects'
import { previewFetchConfig, previewFetchUrl } from '@/libs/newt-api-client'

export const config = {
	runtime: 'experimental-edge',
}
type PageProps = {
	pageData?: PageContent
	breadcrumb?: BreadcrumbItemProps[]
	status?: string
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	// クエリパラメータの取得
	const { contentId, appUID, modelUID } = query
	if (!contentId) return { props: { pageData: [] } }
	const res = await fetch(
		`${previewFetchUrl}/${appUID}/${modelUID}/${contentId.toString()}`,
		previewFetchConfig
	)
	const data = await res.json()
	if(!data) return { props: { pageData: [] } }
	const { pageObjects: breadcrumbList } = generateBreadcrumbObjects(data)
	return {
		props: {
			pageData: data,
			breadcrumb: breadcrumbList,
		},
	}
}
const StaticPage: NextPage<PageProps> = ({ pageData, breadcrumb }) => {
	const pageSlug = breadcrumb?.slice(-1)[0].path
	const canonical = new URL(pageSlug ?? '', SITE_URL).toString()
	return (
		<>
			{pageData && (
				<>
					<NextSeo
						titleTemplate={pageData.meta?.title}
						title={pageData.meta?.title ?? pageData.title}
						description={pageData.meta?.description ?? pageData.title}
						canonical={canonical}
						noindex
					/>
					<main>
						<article>
							<h1>{pageData.title}</h1>
						</article>
					</main>
					{breadcrumb && <Breadcrumb list={breadcrumb} />}
				</>
			)}
		</>
	)
}

export default StaticPage
