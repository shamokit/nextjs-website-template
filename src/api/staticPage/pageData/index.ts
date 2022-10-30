import type { PageContents } from '@/schemas/staticPage/type'
import type { GetContentsQuery } from '@/libs/apiClient'
export type Methods = {
  get: {
    query?: GetContentsQuery
    resBody: PageContents
  }
}
