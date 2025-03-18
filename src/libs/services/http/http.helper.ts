/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ApisauceInstance } from 'apisauce'
import TokenService from '../token.service'
import { signOut } from 'aws-amplify/auth'

type ApiCall = (..._args: any[]) => Promise<any>

export async function responseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {}
      if (response.ok) res(response.data)
      if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
        console.error('Connection timeout. Please check your network and try again.')
      }
      rej(response.data)
    } catch (err) {
      rej(err)
    }
  })
}

/**
 * Wraps an API call and returns a promise that resolves with the original response if the call is successful,
 * or rejects with an error if the call fails. This function is specifically designed for handling authentication-related API calls, and other third-party services which don't follow Vizplatform API standard.
 *
 * @template T The expected return type.
 * @param {ApiCall} func The API call to wrap.
 * @param {any[]} args The arguments to pass to the API call.
 * @returns {Promise<T>} A promise that resolves with the original response if the call is successful,
 * or rejects with an error if the call fails.
 */
export async function authResponseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {}
      res(response)
    } catch (err) {
      rej(err)
    }
  })
}

export const getResponseData = (data: { data: any }) => data.data

export interface ApiResponseType<T> {
  data: T
  code: number
  success: boolean
  timestamp: string
}

export interface PaginationResponseType<T> {
  data: T[]
  payloadSize?: number
  hasNext?: boolean
  skippedRecords?: number
  totalRecords?: number
  skip?: number
  take?: number
}

export interface ApiPaginationResponseType<T> {
  data: PaginationResponseType<T>
  code?: number
  success?: boolean
  timestamp?: string
  query?: Object
}

export const configApiInstance = (api: ApisauceInstance) => {
  api.axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await TokenService.getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (err) => Promise.reject(err),
  )

  api.axiosInstance.interceptors.response.use(undefined, async (error) => {
    if (error.response.status === 401) {
      await signOut()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  })
}
