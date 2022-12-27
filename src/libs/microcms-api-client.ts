import axios from 'axios'
import aspida from '@aspida/axios'
import api from '@/api/$api'
import type { MicroCMSQueries, GetListDetailRequest, GetListRequest, MicroCMSListResponse, MicroCMSListContent } from 'microcms-js-sdk'
export type { MicroCMSQueries, GetListDetailRequest, GetListRequest, MicroCMSListResponse, MicroCMSListContent }

// Fetch CDN
const fetchConfig = {
	headers: {
		"X-MICROCMS-API-KEY": `${process.env.CMS_API_KEY || ''}`,
	},
	baseURL: process.env.CMS_API_URL
}
export const apiClient = api(aspida(axios, fetchConfig))
