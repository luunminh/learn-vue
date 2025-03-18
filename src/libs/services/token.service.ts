import { fetchAuthSession } from 'aws-amplify/auth'
import { get } from 'lodash-es'

export enum AuthCognitoErrorsCode {
  NotAuthorizedException = 'NotAuthorizedException',
}

export default class TokenService {
  static async getToken() {
    try {
      const currentSession = await fetchAuthSession()

      const token = currentSession.tokens?.idToken?.toString()

      return token
    } catch (error) {
      const errorCode = get(error, 'code', null)

      console.warn(errorCode)

      if (errorCode === AuthCognitoErrorsCode.NotAuthorizedException) {
        throw error
      }

      return null
    }
  }

  static forceRefreshToken() {
    return fetchAuthSession({ forceRefresh: true })
  }
}
