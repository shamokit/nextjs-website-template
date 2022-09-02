export async function onRequestGet({ env, request }) {
	try {
		const url = new URL(request.url);

		const params = new URLSearchParams(url.search);
		let secret = params.get("secret")
		let slug = params.get("slug")

		if (secret !== env.PREVIEW_SECRET_KEY || !slug) {
			return new Response('error', { status: 400 })
		}

		const fetchPreviewPage = async (pageSlug) => {
			const queryParam = new URLSearchParams({
				limit: 1,
				slug: pageSlug,
				depth: 2,
			})
			const data = await fetch(
				`https://${env.NEWT_SPACE_U_KU ? env.NEWT_SPACE_U_KU : ''
				}.api.newt.so/v1/staticPage/pageData?${queryParam}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${env.NEXT_PREVIEW_TOKEN ? env.NEXT_PREVIEW_TOKEN : ''
							}`,
					}
				}
			)

			return { data: await data.json() }
		}
		const {data} = await fetchPreviewPage(slug)
		const pageData = data.items[0]


		// slugが存在しない場合、プレビューモードを有効にしないようにしましょう。
		if (!pageData) {
			return new Response('error', { status: 400 })
		}

		return new Response(JSON.stringify(pageData), { status: 200 })

	} catch (err) {
		return new Response(err, { status: 400 })
	}
}
