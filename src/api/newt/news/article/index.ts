import type { NewsContents } from '@/schemas/news/type'
import type { GetContentsQuery } from '@/libs/newt-api-client'
export type Methods = {
  get: {
    query?: GetContentsQuery
    resBody: NewsContents
  }
}
