import axios from 'axios'
import aspida from '@aspida/axios'
import api from '@/api/$api'
import type { Content, Contents, GetContentQuery, GetContentsQuery } from 'newt-client-js'
export type { Content, Contents, GetContentQuery, GetContentsQuery }

// Fetch CDN
const fetchConfig = {
	headers: {
		Authorization: `Bearer ${process.env.NEWT_API_KEY ? process.env.NEWT_API_KEY : ''}`,
	},
	baseURL: `https://${
		process.env.NEWT_SPACE_U_KU ? process.env.NEWT_SPACE_U_KU : ''
	}.cdn.newt.so/v1`,
}
export const apiClient = api(aspida(axios, fetchConfig))

// Fetch API with preview
export const previewFetchConfig = {
	headers: {
		Authorization: `Bearer ${
			process.env.NEXT_PREVIEW_TOKEN ? process.env.NEXT_PREVIEW_TOKEN : ''
		}`,
	}
}
export const previewFetchUrl = `https://${
	process.env.NEWT_SPACE_U_KU ? process.env.NEWT_SPACE_U_KU : ''
}.api.newt.so/v1`
