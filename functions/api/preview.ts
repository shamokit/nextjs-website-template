type CmsName = 'newt' | 'microCMS'
export const onRequestGet = async ({ request, env }) => {
	const ErrorResponse = new Response('401 Unauthorized', { status: 401 })
	// CMS名を選んでください。
	const cmsName: CmsName = 'newt'

	// REQUEST URL
	const url = new URL(request.url)

	// check param exists
	const params = new URLSearchParams(url.search)
	if (!params) return ErrorResponse

	// シークレットキーの確認
	const SECRET = env.SECRET
	const paramSECRET = params.get('secret')
	if (SECRET !== paramSECRET) return ErrorResponse

	// pathを生成 NewtとmicroCMSを想定しています。
	const getCmsApiPathname = (cmsName: CmsName) => {
		let path = ''
		switch (cmsName) {
			case 'newt': {
				const appUID = params.get('appUID')
				const modelUID = params.get('modelUID')
				const contentId = params.get('contentId')
				if (!(appUID && modelUID && contentId)) return ''
				path = `${appUID}/${modelUID}/${contentId}`
				break;
			}
			case 'microCMS': {
				const endpoint = params.get('endpoint')
				const contentId = params.get('contentId')
				const draftKey = params.get('draftKey')
				if (!(contentId)) return ''
				path = `${endpoint}/${contentId}?draftKey=${draftKey}`
				break;
			}
			default:
				break;
		}
		return path
	}
	// headerを生成 NewtとmicroCMSを想定しています。
	const getHeaders = (cmsName: CmsName) => {
		let headers = {}
		switch (cmsName) {
			case 'newt': {
				headers = {
					Authorization: `Bearer ${env.CMS_API_KEY ? env.CMS_API_KEY : ''}`
				}
				break;
			}
			case 'microCMS': {
				headers = {
					"X-MICROCMS-API-KEY": `${env.CMS_API_KEY ? env.CMS_API_KEY : ''}`
				}
				break;
			}
			default:
				break;
		}
		return headers
	}

	const baseUrl = env.CMS_API_URL
	const cmsApiPathname = getCmsApiPathname(cmsName)
	const headers = getHeaders(cmsName)
	const fetchUrl = `${baseUrl}/${cmsApiPathname}`
	const res = await fetch(fetchUrl, { headers })
	const data = await res.json()
	return new Response(JSON.stringify(data, null, 2), {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	})
}
