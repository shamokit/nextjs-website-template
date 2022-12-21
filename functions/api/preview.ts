export const onRequestGet = async ({ request, env }) => {
	const ErrorResponse = new Response('401 Unauthorized', { status: 401 })
	const previewFetchConfig = {
		headers: {
			Authorization: `Bearer ${env.PREVIEW_TOKEN ? env.PREVIEW_TOKEN : ''}`,
		},
	}
	const previewFetchUrl = `https://${
		env.NEWT_SPACE_U_KU ? env.NEWT_SPACE_U_KU : ''
	}.api.newt.so/v1`
	const SECRET = env.SECRET
	const url = new URL(request.url)
	const params = new URLSearchParams(url.search)
	if (!params) return ErrorResponse
	const paramSECRET = params.get('secret')
	if (SECRET !== paramSECRET) return ErrorResponse
	const appUID = params.get('appUID')
	const modelUID = params.get('modelUID')
	const contentId = params.get('contentId')
	if (!(appUID && modelUID && contentId)) return ErrorResponse
	const res = await fetch(
		`${previewFetchUrl}/${appUID}/${modelUID}/${contentId.toString()}`,
		previewFetchConfig
	)
	const data = await res.json()
	return new Response(JSON.stringify(data, null, 2), {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	})
}
