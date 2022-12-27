import type { MicroCMSQueries } from '@/libs/microcms-api-client'
import type { PageContent } from '@/schemas/staticPage/type'
export type Methods = {
  get: {
    query: MicroCMSQueries & {
      secret: string
    }
    resBody: PageContent
  }
}
