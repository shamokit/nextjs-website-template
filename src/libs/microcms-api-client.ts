'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import aspida from '@aspida/axios'
import axios from 'axios'
import type {
	GetListDetailRequest,
	GetListRequest,
	MicroCMSListContent,
	MicroCMSListResponse,
	MicroCMSQueries,
} from 'microcms-js-sdk'

import api from '@/api/$api'

export type {
	MicroCMSQueries,
	GetListDetailRequest,
	GetListRequest,
	MicroCMSListResponse,
	MicroCMSListContent,
}

// Fetch CDN
const fetchConfig = {
	headers: {
		'X-MICROCMS-API-KEY': `${process.env.CMS_API_KEY || ''}`,
	},
	baseURL: process.env.CMS_API_URL,
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
				query: { endpoint, contentId, draftKey, secret },
			} = router
			if (!endpoint || !contentId || !draftKey || !secret) return
			const pageResponse = (await previewApiClient.preview.$get({
				query: {
					endpoint: endpoint.toString(),
					contentId: contentId.toString(),
					draftKey: draftKey.toString(),
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
