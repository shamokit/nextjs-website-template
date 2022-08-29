import axios from 'axios'
import aspida from '@aspida/axios'
import api from '../api/$api'
const fetchConfig = {
	headers: {
		Authorization: `Bearer ${process.env.NEWT_API_KEY ? process.env.NEWT_API_KEY : ''}`,
	},
	baseURL: `https://${
		process.env.NEWT_SPACE_U_KU ? process.env.NEWT_SPACE_U_KU : ''
	}.cdn.newt.so/v1`,
}
export const apiClient = api(aspida(axios, fetchConfig))
