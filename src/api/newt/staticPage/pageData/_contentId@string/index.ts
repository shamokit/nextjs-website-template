import type { DefineMethods } from '@/libs/aspida'
import type { PageContent } from '@/schemas/staticPage/type'
import type { GetContentQuery } from '@/libs/newt-api-client'
export type Methods = DefineMethods<{
  get: {
    query?: GetContentQuery
    resBody: PageContent
  }
}>
