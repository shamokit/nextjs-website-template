export async function onRequestGet({ env, params }) {
	try {
		let secret = params.secret
		let slug = params.slug

		if (secret !== env.PREVIEW_SECRET_KEY || !slug) {
			new Response('error', { status: 400 })
		}
		const fetchPreviewPage = async (pageSlug) => {
			const data = await fetch(
				`https://${env.NEWT_SPACE_U_KU ? env.NEWT_SPACE_U_KU : ''
				}.api.newt.so/v1/staticPage/pageData`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${env.NEXT_PREVIEW_TOKEN ? env.NEXT_PREVIEW_TOKEN : ''
							}`,
					},
					query: {
						limit: 1,
						slug: pageSlug,
						depth: 2,
					}
				}
			)

			return { data: await data.json() }
		}
		const { data } = await fetchPreviewPage(slug)
		return new Response(data.items[0], { status: 400 })

		console.log(data)
		const pageData = data.items[0]
		// slugが存在しない場合、プレビューモードを有効にしないようにしましょう。
		if (!pageData) {
			return new Response('error', { status: 400 })
		}

		// Cookiesを設定し、プレビューモードを有効にします。
		// Response..setPreviewData({})

		const slugs = data.items.map((page) => page.slug)
		const reverseSlugs = [...slugs].reverse()

		const stringPaths = []
		reverseSlugs.forEach((path, index) => {
			const prev = stringPaths[index - 1]
			stringPaths[index] = prev ? `${stringPaths[index - 1]}/${path}` : path
		})
		return Response.redirect(
			`https://nextjs-website-template.pages.dev/${stringPaths[-1]}`,
			301
		)
	} catch (err) {
		return new Response(err, { status: 400 })
	}
}
