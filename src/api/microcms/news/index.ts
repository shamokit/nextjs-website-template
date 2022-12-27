import type { NewsContents } from '@/schemas/news/type'
import type { MicroCMSQueries } from '@/libs/microcms-api-client'
export type Methods = {
  get: {
    query?: MicroCMSQueries
    resBody: NewsContents
  }
}
