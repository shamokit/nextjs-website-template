const cmsNames = ['newt', 'microcms'] as const
type CmsName = typeof cmsNames[number]
export const onRequestGet = async ({ request, env }) => {
	const ErrorResponse = new Response('401 Unauthorized', { status: 401 })

	// CMS名を選んでください。
	const cmsName: CmsName = 'microcms'

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
	const getCmsApiPathname = (cmsName: CmsName) => {
		if (!cmsNames.includes(cmsName)) return ''
		switch (cmsName) {
			case 'newt': {
				const appUID = params.get('appUID')
				const modelUID = params.get('modelUID')
				const contentId = params.get('contentId')
				if (!(appUID && modelUID && contentId)) return ''
				return `${appUID}/${modelUID}/${contentId}`
			}
			case 'microcms': {
				const endpoint = params.get('endpoint')
				const contentId = params.get('contentId')
				const draftKey = params.get('draftKey')
				if (!contentId) return ''
				return `${endpoint}/${contentId}${draftKey ? `?draftKey=${draftKey}` : ''}`
			}
		}
	}
	// headerを生成
	type GetHeader =
		| {
				Authorization: string
		  }
		| {
				'X-MICROCMS-API-KEY': string
		  }
		| undefined
	const getHeaders = (cmsName: CmsName): GetHeader => {
		if (!cmsNames.includes(cmsName)) return undefined
		switch (cmsName) {
			case 'newt': {
				return {
					Authorization: `Bearer ${
						env.CMS_PREVIEW_API_KEY ? env.CMS_PREVIEW_API_KEY : ''
					}`,
				}
			}
			case 'microcms': {
				return {
					'X-MICROCMS-API-KEY': `${
						env.CMS_PREVIEW_API_KEY ? env.CMS_PREVIEW_API_KEY : ''
					}`,
				}
			}
		}
	}
	const baseUrl = env.CMS_API_URL
	const cmsApiPathname = getCmsApiPathname(cmsName)
	const headers = getHeaders(cmsName)
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
