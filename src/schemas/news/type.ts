import type { Meta } from '@/schemas/meta/type'
import type { Content, Contents } from '@/libs/newt-api-client'
export type News = {
	title: string
	slug: string
	body: string
	parent: NewsContent | null
	meta?: Meta
}
export type NewsContent = News & Content
export type NewsContents = Contents<NewsContent>
