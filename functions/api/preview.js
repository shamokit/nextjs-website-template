export async function onRequestGet({ env, request }) {
	try {
		const url = new URL(request.url);

		const params = new URLSearchParams(url.search);
		let secret = params.get("secret")
		let contentId = params.get("contentId")

		// secretがenvの値と違う場合とcontentIdがない場合は400
		if (secret !== env.PREVIEW_SECRET_KEY || !contentId) {
			return new Response('error', { status: 400 })
		}

		const fetchPreviewPage = async (contentId) => {
			const NEWT_SPACE_U_KU = env.NEWT_SPACE_U_KU ?? ''
			const NEXT_PREVIEW_TOKEN = env.NEXT_PREVIEW_TOKEN ?? ''
			if (!NEWT_SPACE_U_KU) return new Response('error', { status: 400 })
			const queryParam = new URLSearchParams({
				limit: 1,
				contentId: contentId,
				depth: 2,
			})
			const data = await fetch(
				`https://${NEWT_SPACE_U_KU}.api.newt.so/v1/staticPage/pageData?${queryParam}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${NEXT_PREVIEW_TOKEN}`,
					}
				}
			)

			return { data: await data.json() }
		}
		const { data } = await fetchPreviewPage(contentId)

		// データがない場合404に
		if (!data) {
			return new Response('error', { status: 400 })
		}
		return new Response(JSON.stringify(data), { status: 200 })
	} catch (err) {
		return new Response(err, { status: 400 })
	}
}
