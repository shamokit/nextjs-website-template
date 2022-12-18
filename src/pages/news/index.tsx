import type { NextPage } from 'next'
import { NextSeo } from '@/libs/next-seo'
import { apiClient } from '@/libs/newt-api-client'
import type { NewsContents } from '@/schemas/news/type'
import { Breadcrumb } from '@/components/layout/breadcrumb/Breadcrumb'
import { generateBreadcrumbObjects } from '@/components/layout/breadcrumb/functions/generateBreadcrumbObjects'
import { PageNews } from '@/components/pages/news'
import { Container } from '@/components/layout/container/Container'

const { pageObjects: breadcrumbList } = generateBreadcrumbObjects({
	title: 'News',
	slug: 'news',
	parent: null,
})

const fetchPosts = async () => {
	const data = await apiClient.news.article.$get()
	return { data }
}

export const getStaticProps = async () => {
	const { data } = await fetchPosts()
	return {
		props: { postsData: data },
	}
}

type Props = {
	postsData: NewsContents
}
const News: NextPage<Props> = ({ postsData }) => {
	return (
		<>
			<NextSeo title="News" description="News" />
			<Container>
				<Breadcrumb list={breadcrumbList} withJsonLd={false} />
				<PageNews postsData={postsData} />
			</Container>
		</>
	)
}

export default News
