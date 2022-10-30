import type { PageContent } from '@/schemas/staticPage/type'
import type { GetContentQuery } from '@/libs/apiClient'
export type Methods = {
  get: {
    query?: GetContentQuery
    resBody: PageContent
  }
}
