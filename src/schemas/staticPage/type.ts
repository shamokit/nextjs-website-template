import type { Meta } from '@/schemas/meta/type'
import type { Content, Contents } from '@/libs/apiClient'
export type Page = {
	title: string
	slug: string
	body: string
	meta?: Meta
}
type PageWithParent = Page & { parent: PageWithParent | null }
export type PageContent = PageWithParent & Content
export type PageContents = Contents<PageContent>
