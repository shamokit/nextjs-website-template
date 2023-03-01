import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import aspida from '@aspida/axios'
import api from '@/api/newt/$api'
import type {
	Content,
	Contents,
	GetContentParams,
	GetContentQuery,
	GetContentsQuery,
} from 'newt-client-js'
export type { Content, Contents, GetContentParams, GetContentQuery, GetContentsQuery }

// Fetch CDN
const fetchConfig = {
	headers: {
		Authorization: `Bearer ${process.env.CMS_PREVIEW_API_KEY || ''}`,
	},
	baseURL: process.env.CMS_API_URL?.replace('api.newt', 'cdn.newt'),
}
export const apiClient = api(aspida(axios, fetchConfig))
const previewFetchConfig = {
	baseURL: '/api',
}
export const previewApiClient = api(aspida(axios, previewFetchConfig))
export const usePreview = <T>() => {
	const [pageResponse, setPageResponse] = useState<T>()
	const router = useRouter()
	useEffect(() => {
		const getPageData = async () => {
			if (!router.isReady) return
			const {
				query: { appUID, contentId, modelUID, secret },
			} = router
			if (!appUID || !contentId || !modelUID || !secret) return
			const pageResponse = (await previewApiClient.preview.$get({
				query: {
					appUID: appUID.toString(),
					modelUID: modelUID.toString(),
					contentId: contentId.toString(),
					secret: secret.toString(),
				},
			})) as T
			if (!pageResponse) return
			setPageResponse(pageResponse)
		}
		getPageData()
	}, [router])
	return [pageResponse]
}
