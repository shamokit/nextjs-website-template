import type { Page } from '@/components/model/staticPage/type'
import type { Content, Contents, GetContentsQuery } from 'newt-client-js'

export type Methods = {
  get: {
    query?: GetContentsQuery
    resBody: Contents<Page & Content>
  }
}
