import type { NextPage } from 'next'

import type { NewsContents } from '@/schemas/news/type'

// import { apiClient } from '@/libs/newt-api-client'
import { apiClient } from '@/libs/microcms-api-client'
import { NextSeo } from '@/libs/next-seo'

import { Breadcrumb } from '@/components/layout/breadcrumb/Breadcrumb'
import { generateBreadcrumbObjects } from '@/components/layout/breadcrumb/functions/generateBreadcrumbObjects'
import { Container } from '@/components/layout/container/Container'
import { PageNews } from '@/components/pages/news'

const { pageObjects: breadcrumbList } = generateBreadcrumbObjects({
	title: 'News',
	slug: 'news',
	parent: null,
})

// const fetchPosts = async () => {
// 	const data = await apiClient.news.article.$get()
// 	return { data }
// }
const fetchPosts = async () => {
	const data = await apiClient.static_page.$get()
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
	console.log(postsData.contents)
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
