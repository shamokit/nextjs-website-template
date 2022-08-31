import { previewApiClient } from '@/lib/apiClient'
const fetchPreviewPage = async (pageSlug) => {
	const data = await previewApiClient.staticPage.pageData.$get({
		query: {
			limit: 1,
			slug: pageSlug,
			depth: 2,
		},
	})

	return { data }
}
export async function onRequestGet(context) {
  try {
    let request = await context.request

		const { searchParams } = new URL(request.url)
		let secret = searchParams.get('secret')
		let slug = searchParams.get('slug')

		if (secret !== context.env.PREVIEW_SECRET_KEY || !slug) {
			return Response.redirect(`https://nextjs-website-template.pages.dev`, 401)
		}

		const { data } = await fetchPreviewPage(slug)
		const pageData = data.items[0]

		// slugが存在しない場合、プレビューモードを有効にしないようにしましょう。
		if (!pageData) {
			return Response.redirect(`https://nextjs-website-template.pages.dev`, 401)
		}

		// Cookiesを設定し、プレビューモードを有効にします。
		Response.setPreviewData({})

		const slugs = data.items.map((page) => page.slug)
		const reverseSlugs = [...slugs].reverse()

		const stringPaths = []
		reverseSlugs.forEach((path, index) => {
			const prev = stringPaths[index - 1]
			stringPaths[index] = prev ? `${stringPaths[index - 1]}/${path}` : path
		})
		return Response.redirect(`https://nextjs-website-template.pages.dev/${stringPaths[-1]}`, 200)
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}
