import { appConfigs } from '@/config'
import { AxiosClient } from './axios-client'
import axios from 'axios'

axios.defaults.withCredentials = true

export const HttpService = new AxiosClient({
  baseURL: `${appConfigs.envConfig.API_URL}/ais-svc`,
  timeout: appConfigs.envConfig.CONNECTION_TIMEOUT || 30000, // 30 seconds
  headers: { Accept: 'application/json' },
})

export { getResponseData, responseWrapper } from './http.helper'

export type {
  ApiPaginationResponseType,
  ApiResponseType,
  PaginationResponseType,
} from './http.helper'
