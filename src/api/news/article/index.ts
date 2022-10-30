import type { NewsContents } from '@/schemas/news/type'
import type { GetContentsQuery } from '@/libs/apiClient'
export type Methods = {
  get: {
    query?: GetContentsQuery
    resBody: NewsContents
  }
}
