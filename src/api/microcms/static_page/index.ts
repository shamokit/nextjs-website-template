import type { DefineMethods } from '@/libs/aspida'
import type { PageContents } from '@/schemas/staticPage/type'
import type { MicroCMSQueries } from '@/libs/microcms-api-client'
export type Methods = DefineMethods<{
  get: {
    query?: MicroCMSQueries
    resBody: PageContents
  }
}>
