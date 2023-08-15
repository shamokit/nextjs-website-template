/* microCMS */
import type { Meta } from '@/schemas/meta/type'

import type {
	MicroCMSListContent,
	MicroCMSListResponse,
} from '@/libs/microcms-api-client'

export type News = {
	title: string
	slug: string
	body: string
	meta?: Meta
}

export type NewsContent = MicroCMSListContent & News
export type NewsContents = MicroCMSListResponse<News>
