import axios from 'axios'
import aspida from '@aspida/axios'
import api from '../api/$api'
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
const previewFetchConfig = {
	headers: {
		Authorization: `Bearer ${process.env.NEXT_PREVIEW_TOKEN ? process.env.NEXT_PREVIEW_TOKEN : ''}`,
	},
	baseURL: `https://${
		process.env.NEWT_SPACE_U_KU ? process.env.NEWT_SPACE_U_KU : ''
	}.api.newt.so/v1`,
}
export const previewApiClient = api(aspida(axios, previewFetchConfig))
