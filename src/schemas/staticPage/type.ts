import type { Meta } from '@/schemas/meta/type'
export type Page = {
	title: string
	slug: string
	body: string
	meta?: Meta
	parent: Page | null
}

/* microCMS */
import type { MicroCMSListResponse, MicroCMSListContent } from '@/libs/microcms-api-client'
export type PageContent = MicroCMSListContent & Page
export type PageContents = MicroCMSListResponse<Page>

/* Newt */
// import type { Content, Contents } from '@/libs/newt-api-client'
// export type PageContent = Page & Content
// export type PageContents = Contents<PageContent>
