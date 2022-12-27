import type { PageContents } from '@/schemas/staticPage/type'
import type { MicroCMSQueries } from '@/libs/microcms-api-client'
export type Methods = {
  get: {
    query?: MicroCMSQueries
    resBody: PageContents
  }
}