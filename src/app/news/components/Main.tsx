import type { NewsContents } from '@/schemas/news/type'

import { Breadcrumb } from '@/components/layout/breadcrumb/Breadcrumb'
import { generateBreadcrumbObjects } from '@/components/layout/breadcrumb/functions/generateBreadcrumbObjects'
import { Container } from '@/components/layout/container/Container'

type MainProps = {
	breadcrumbList: ReturnType<typeof generateBreadcrumbObjects>['pageObjects']
	postsData: NewsContents
}
export const Main: React.FC<MainProps> = ({ breadcrumbList, postsData }) => {
	return (
		<Container>
			<Breadcrumb list={breadcrumbList} withJsonLd={false} />
			<h2>News</h2>
			{postsData.contents
				? postsData.contents.map((post) => {
						return (
							<article key={post.slug}>
								<h1>{post.title}</h1>
							</article>
						)
				  })
				: null}
		</Container>
	)
}
