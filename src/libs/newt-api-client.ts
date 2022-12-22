import axios from 'axios'
import aspida from '@aspida/axios'
import api from '@/api/$api'
import type { Content, Contents, GetContentQuery, GetContentsQuery } from 'newt-client-js'
export type { Content, Contents, GetContentQuery, GetContentsQuery }

// Fetch CDN
const fetchConfig = {
	headers: {
		Authorization: `Bearer ${process.env.CMS_CDN_API_KEY || ''}`,
	},
	baseURL: process.env.CMS_API_URL?.replace('api.newt', 'cdn.newt')
}
export const apiClient = api(aspida(axios, fetchConfig))
