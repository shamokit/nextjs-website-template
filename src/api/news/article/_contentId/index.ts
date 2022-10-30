import type { NewsContent } from '@/schemas/news/type'
import type { GetContentQuery } from '@/libs/apiClient'
export type Methods = {
  get: {
    query?: GetContentQuery
    resBody: NewsContent
  }
}
