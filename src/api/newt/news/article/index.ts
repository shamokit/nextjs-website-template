import type { DefineMethods } from '@/libs/aspida'
import type { NewsContents } from '@/schemas/news/type'
import type { GetContentsQuery } from '@/libs/newt-api-client'
export type Methods = DefineMethods<{
  get: {
    query?: GetContentsQuery
    resBody: NewsContents
  }
}>
