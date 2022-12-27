import type { NewsContent } from '@/schemas/news/type'
import type { GetContentQuery } from '@/libs/newt-api-client'
export type Methods = {
  get: {
    query?: GetContentQuery
    resBody: NewsContent
  }
}
