import axios from 'axios'
import aspida from '@aspida/axios'
import api from '../../src/api/$api'
export async function onRequestGet({request, env, params}) {
  try {
		let secret = params.secret
		let slug = params.slug

		if (secret !== env.PREVIEW_SECRET_KEY || !slug) {
			return Response.redirect(`https://nextjs-website-template.pages.dev`, 401)
		}
		const fetchPreviewPage = async (pageSlug) => {
			const previewFetchConfig = {
				headers: {
					Authorization: `Bearer ${env.NEXT_PREVIEW_TOKEN ? env.NEXT_PREVIEW_TOKEN : ''}`,
				},
				baseURL: `https://${
					env.NEWT_SPACE_U_KU ? env.NEWT_SPACE_U_KU : ''
				}.api.newt.so/v1`,
			}
			const previewApiClient = api(aspida(axios, previewFetchConfig))
			const data = await previewApiClient.staticPage.pageData.$get({
				query: {
					limit: 1,
					slug: pageSlug,
					depth: 2,
				},
			})

			return { data }
		}
		const { data } = await fetchPreviewPage(slug)
		const pageData = data.items[0]

		// slugが存在しない場合、プレビューモードを有効にしないようにしましょう。
		if (!pageData) {
			return Response.redirect(`https://nextjs-website-template.pages.dev`, 401)
		}

		// Cookiesを設定し、プレビューモードを有効にします。
		// Response..setPreviewData({})

		const slugs = data.items.map((page) => page.slug)
		const reverseSlugs = [...slugs].reverse()

		const stringPaths: string[] = []
		reverseSlugs.forEach((path, index) => {
			const prev = stringPaths[index - 1]
			stringPaths[index] = prev ? `${stringPaths[index - 1]}/${path}` : path
		})
		return Response.redirect(`https://nextjs-website-template.pages.dev/${stringPaths[-1]}`, 200)
  } catch (err) {
    return new Response(err, { status: 400 });
  }
}
