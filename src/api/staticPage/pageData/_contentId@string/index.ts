import type { PageContent } from '@/schemas/staticPage/type'
import type { GetContentQuery } from '@/libs/newt-api-client'
export type Methods = {
  get: {
    query?: GetContentQuery
    resBody: PageContent
  }
}
