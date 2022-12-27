import type { DefineMethods } from '@/libs/aspida'
import type { NewsContents } from '@/schemas/news/type'
import type { MicroCMSQueries } from '@/libs/microcms-api-client'
export type Methods = DefineMethods<{
  get: {
    query?: MicroCMSQueries
    resBody: NewsContents
  }
}>
