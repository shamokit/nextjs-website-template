import type { AspidaClient } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './news/article'
import type { Methods as Methods1 } from './news/article/_contentId'
import type { Methods as Methods2 } from './staticPage/pageData'
import type { Methods as Methods3 } from './staticPage/pageData/_contentId@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/news/article'
  const PATH1 = '/staticPage/pageData'
  const GET = 'GET'

  return {
    news: {
      article: {
        _contentId: (val2: number | string) => {
          const prefix2 = `${PATH0}/${val2}`

          return {
            get: (
              option?:
                | { query?: Methods1['get']['query'] | undefined; config?: T | undefined }
                | undefined
            ) => fetch<Methods1['get']['resBody']>(prefix, prefix2, GET, option).json(),
            $get: (
              option?:
                | { query?: Methods1['get']['query'] | undefined; config?: T | undefined }
                | undefined
            ) =>
              fetch<Methods1['get']['resBody']>(prefix, prefix2, GET, option)
                .json()
                .then((r) => r.body),
            $path: (
              option?:
                | { method?: 'get' | undefined; query: Methods1['get']['query'] }
                | undefined
            ) =>
              `${prefix}${prefix2}${
                option && option.query ? `?${dataToURLString(option.query)}` : ''
              }`,
          }
        },
        get: (
          option?:
            | { query?: Methods0['get']['query'] | undefined; config?: T | undefined }
            | undefined
        ) => fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json(),
        $get: (
          option?:
            | { query?: Methods0['get']['query'] | undefined; config?: T | undefined }
            | undefined
        ) =>
          fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option)
            .json()
            .then((r) => r.body),
        $path: (
          option?:
            | { method?: 'get' | undefined; query: Methods0['get']['query'] }
            | undefined
        ) =>
          `${prefix}${PATH0}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      },
    },
    staticPage: {
      pageData: {
        _contentId: (val2: string) => {
          const prefix2 = `${PATH1}/${val2}`

          return {
            get: (
              option?:
                | { query?: Methods3['get']['query'] | undefined; config?: T | undefined }
                | undefined
            ) => fetch<Methods3['get']['resBody']>(prefix, prefix2, GET, option).json(),
            $get: (
              option?:
                | { query?: Methods3['get']['query'] | undefined; config?: T | undefined }
                | undefined
            ) =>
              fetch<Methods3['get']['resBody']>(prefix, prefix2, GET, option)
                .json()
                .then((r) => r.body),
            $path: (
              option?:
                | { method?: 'get' | undefined; query: Methods3['get']['query'] }
                | undefined
            ) =>
              `${prefix}${prefix2}${
                option && option.query ? `?${dataToURLString(option.query)}` : ''
              }`,
          }
        },
        get: (
          option?:
            | { query?: Methods2['get']['query'] | undefined; config?: T | undefined }
            | undefined
        ) => fetch<Methods2['get']['resBody']>(prefix, PATH1, GET, option).json(),
        $get: (
          option?:
            | { query?: Methods2['get']['query'] | undefined; config?: T | undefined }
            | undefined
        ) =>
          fetch<Methods2['get']['resBody']>(prefix, PATH1, GET, option)
            .json()
            .then((r) => r.body),
        $path: (
          option?:
            | { method?: 'get' | undefined; query: Methods2['get']['query'] }
            | undefined
        ) =>
          `${prefix}${PATH1}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
