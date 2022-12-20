export const onRequestGet = async ({ params, env }) => {
	// const previewFetchConfig = {
	// 	headers: {
	// 		Authorization: `Bearer ${
	// 			env.NEXT_PREVIEW_TOKEN ? env.NEXT_PREVIEW_TOKEN : ''
	// 		}`,
	// 	}
	// }
	// const previewFetchUrl = `https://${
	// 	env.NEWT_SPACE_U_KU ? env.NEWT_SPACE_U_KU : ''
	// }.api.newt.so/v1`
	// const { query: {contentId, appUID, modelUID} } = params
	// if (!contentId) return
	// const res = await fetch(
	// 	`${previewFetchUrl}/${appUID}/${modelUID}/${contentId.toString()}`,
	// 	previewFetchConfig
	// )
	// const data = await res.json()
  return new Response(JSON.stringify({ value: params.params }));
};
