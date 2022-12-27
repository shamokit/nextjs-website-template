import type { GetContentQuery } from '@/libs/newt-api-client'
import type { PageContent } from '@/schemas/staticPage/type'
export type Methods = {
  get: {
    query?: {
			appUID: string;
			modelUID: string;
			contentId: string;
			query?: GetContentQuery;
			secret: string
		}
    resBody: PageContent
  }
}
