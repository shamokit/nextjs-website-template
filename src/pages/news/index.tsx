import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import type { Contents } from 'newt-client-js'
import { apiClient } from '@/lib/apiClient'
import type { News } from '@/components/model/news/type'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/breadcrumb'
import { PageNews } from '@/components/pages/news/index'
import { Container } from '@/components/layout/Container'

const list: BreadcrumbItem[] = [
	{
		name: 'News',
		url: '/news/',
	},
]

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
	postsData: Contents<News>
}
const News: NextPage<Props> = ({ postsData }) => {
	return (
		<>
			<NextSeo title="News" description="News" />
			<Container>
				<Breadcrumb list={list} />
				<PageNews postsData={postsData} />
				<Breadcrumb list={list} withJsonLd={false} />
			</Container>
		</>
	)
}

export default News
