export const onRequestGet = async ({ request, env }) => {
	const previewFetchConfig = {
		headers: {
			Authorization: `Bearer ${
				env.NEXT_PREVIEW_TOKEN ? env.NEXT_PREVIEW_TOKEN : ''
			}`,
		}
	}
	const previewFetchUrl = `https://${
		env.NEWT_SPACE_U_KU ? env.NEWT_SPACE_U_KU : ''
	}.api.newt.so/v1`
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search)
	const appUID = params.get("appUID")
	const modelUID = params.get("modelUID")
	const contentId = params.get("contentId")
	if (!contentId) return
	const res = await fetch(
		`${previewFetchUrl}/${appUID}/${modelUID}/${contentId.toString()}`,
		previewFetchConfig
	)
	const data = await res.json()

  return new Response(JSON.stringify({ data }));
};
