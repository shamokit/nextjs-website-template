import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { apiClient } from 'src/libs/apiClient'
import type { NewsContents } from '@/schemas/news/type'
import { Breadcrumb } from '@/components/ui/breadcrumb/Breadcrumb'
import { generateBreadcrumbObjectArray } from '@/components/ui/breadcrumb/functions/generateBreadcrumbObjectArray'
import { PageNews } from '@/components/pages/news/index'
import { Container } from '@/components/layout/Container'

const { pageObjects: breadcrumbList } = generateBreadcrumbObjectArray({
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
				<Breadcrumb list={breadcrumbList} />
				<PageNews postsData={postsData} />
				<Breadcrumb list={breadcrumbList} withJsonLd={false} />
			</Container>
		</>
	)
}

export default News
