import type { Page } from '@/components/model/staticPage/type'
import type { Content, GetContentQuery } from 'newt-client-js'

export type Methods = {
  get: {
    query?: GetContentQuery
    resBody: Page & Content
  }
}
