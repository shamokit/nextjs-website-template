export const onRequestGet = async ({ request, env }) => {
	const ErrorResponse = new Response('401 Unauthorized', { status: 401 })

	// REQUEST URL
	const url = new URL(request.url)

	// check param exists
	const params = new URLSearchParams(url.search)
	if (!params) return ErrorResponse

	// シークレットキーの確認
	const SECRET = env.SECRET
	const paramSECRET = params.get('secret')
	if (SECRET !== paramSECRET) return ErrorResponse

	// pathを生成
	const getCmsApiPathname = () => {
		const endpoint = params.get('endpoint')
		const contentId = params.get('contentId')
		const draftKey = params.get('draftKey')
		if (!contentId) return ''
		return `${endpoint}/${contentId}${draftKey ? `?draftKey=${draftKey}` : ''}`
	}
	// headerを生成
	type GetHeader = {
		'X-MICROCMS-API-KEY': string
	}
	const getHeaders = (): GetHeader => {
		return {
			'X-MICROCMS-API-KEY': `${env.CMS_PREVIEW_API_KEY ? env.CMS_PREVIEW_API_KEY : ''}`,
		}
	}
	const baseUrl = env.CMS_API_URL
	const cmsApiPathname = getCmsApiPathname()
	const headers = getHeaders()
	const fetchUrl = `${baseUrl}/${cmsApiPathname}`
	if (!headers) return ErrorResponse
	const res = await fetch(fetchUrl, { headers })
	const data = await res.json()
	return new Response(JSON.stringify(data, null, 2), {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	})
}
