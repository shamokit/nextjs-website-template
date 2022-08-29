import type { News } from '@/components/model/news/type'
import type { Contents, GetContentsQuery } from 'newt-client-js'

export type Methods = {
	get: {
		query?: GetContentsQuery
		resBody: Contents<News>
	}
}
