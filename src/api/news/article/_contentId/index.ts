import type { News } from '@/components/model/news/type'
import type { Content, GetContentsQuery } from 'newt-client-js'

export type Methods = {
	get: {
		query?: GetContentsQuery
		resBody: Content & News
	}
}
