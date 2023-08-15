import type { NextPage } from 'next'

import type { NewsContents } from '@/schemas/news/type'

import { apiClient } from '@/libs/microcms-api-client'

import { generateBreadcrumbObjects } from '@/components/layout/breadcrumb/functions/generateBreadcrumbObjects'

import { Main } from './components/Main'

const fetchPosts = async () => {
	const data = await apiClient.news.$get()
	return { data }
}

type Props = {
	postsData: NewsContents
}

export const metadata = {
	title: 'News',
	description: 'News',
	alternates: {
		canonical: '/news'
	}
}

const News: NextPage<Props> = async () => {
	const { data: postsData } = await fetchPosts()
	const { pageObjects } = generateBreadcrumbObjects({
		title: metadata.title,
		slug: metadata.alternates.canonical.replace(/^\//, ''),
		parent: null,
	})
	return <Main postsData={postsData} breadcrumbList={pageObjects} />
}
export default News
