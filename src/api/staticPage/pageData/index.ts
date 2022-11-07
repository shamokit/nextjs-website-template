import type { PageContents } from '@/schemas/staticPage/type'
import type { GetContentsQuery } from '@/libs/newt-api-client'
export type Methods = {
  get: {
    query?: GetContentsQuery
    resBody: PageContents
  }
}
