import type { DefineMethods } from '@/libs/aspida'
import type { GetContentQuery } from '@/libs/newt-api-client'
export type Methods = DefineMethods<{
  get: {
    query?: {
      appUID: string
      modelUID: string
      contentId: string
      query?: GetContentQuery
      secret: string
    }
    resBody: unknown
  }
}>
