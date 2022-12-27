import type { Meta } from '@/schemas/meta/type'
export type News = {
	title: string
	slug: string
	body: string
	meta?: Meta
}

/* microCMS */
import type { MicroCMSListResponse, MicroCMSListContent } from '@/libs/microcms-api-client'
export type NewsContent = MicroCMSListContent & News
export type NewsContents = MicroCMSListResponse<News>

/* Newt */
// import type { Content, Contents } from '@/libs/newt-api-client'
// export type News = {
// 	title: string
// 	slug: string
// 	body: string
// 	parent: NewsContent | null
// 	meta?: Meta
// }
// export type NewsContent = News & Content
// export type NewsContents = Contents<NewsContent>
