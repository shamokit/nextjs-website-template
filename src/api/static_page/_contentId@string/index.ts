import type { PageContent } from '@/schemas/staticPage/type'

import type { DefineMethods } from '@/libs/aspida'
import type { MicroCMSQueries } from '@/libs/microcms-api-client'

export type Methods = DefineMethods<{
  get: {
    query?: MicroCMSQueries
    resBody: PageContent
  }
}>
