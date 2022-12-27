import type { DefineMethods } from '@/libs/aspida'
import type { PageContents } from '@/schemas/staticPage/type'
import type { GetContentsQuery } from '@/libs/newt-api-client'
export type Methods = DefineMethods<{
  get: {
    query?: GetContentsQuery
    resBody: PageContents
  }
}>
