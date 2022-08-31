import axios, {type AxiosResponse} from 'axios'
export async function onRequestGet({env, params}) {
  try {
		let secret = params.secret
		let slug = params.slug

		if (secret !== env.PREVIEW_SECRET_KEY || !slug) {
			new Response("error", { status: 400 });
		}
		const fetchPreviewPage = async (pageSlug) => {
			const previewFetchConfig = {
				headers: {
					Authorization: `Bearer ${env.NEXT_PREVIEW_TOKEN ? env.NEXT_PREVIEW_TOKEN : ''}`,
				},
				baseURL: `https://${
					env.NEWT_SPACE_U_KU ? env.NEWT_SPACE_U_KU : ''
				}.api.newt.so/v1`,
				params: {
					query: {
					limit: 1,
					slug: pageSlug,
					depth: 2,
				},
				}
			}
			const data: AxiosResponse<{items: {slug: string}[]}> = await axios.get("/staticPage/pageData",previewFetchConfig)

			return { data: data.data }
		}
		const { data } = await fetchPreviewPage(slug)
		const pageData = data.items[0]
		console.log(pageData)
		// slugが存在しない場合、プレビューモードを有効にしないようにしましょう。
		if (!pageData) {
			return new Response("error", { status: 400 });
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
		return Response.redirect(`https://nextjs-website-template.pages.dev/${stringPaths[-1]}`, 301)
  } catch (err) {
    return new Response(err, { status: 400 });
  }
}