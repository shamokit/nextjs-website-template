import type { Contents } from 'newt-client-js'
import type { News } from '@/components/model/news/type'
type PageNewsProps = {
	postsData: Contents<News>
}
export const PageNews: React.FC<PageNewsProps> = ({ postsData }) => {
	return (
		<>
			<h2>News</h2>
			{postsData.items &&
				postsData.items.map((post) => {
					return (
						<article key={post.slug}>
							<h1>{post.title}</h1>
						</article>
					)
				})}
		</>
	)
}
