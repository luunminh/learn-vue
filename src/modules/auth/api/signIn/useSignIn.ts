import { useMutation, type UseMutationOptions } from '@tanstack/vue-query'
import { signIn } from 'aws-amplify/auth'
import { authResponseWrapper } from '@/libs/services/http/http.helper'

export type SignInPayload = {
  email: string
  password: string
}

export type SignInResponse = object

const handleSignIn = ({ email, password }: SignInPayload) =>
  signIn({ username: email, password, options: { authFlowType: 'CUSTOM_WITH_SRP' } })

export function useSignIn(options?: UseMutationOptions<SignInResponse, Error, SignInPayload>) {
  const {
    mutate: onSignIn,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<SignInResponse, Error, SignInPayload>({
    mutationFn: (payload: SignInPayload) => authResponseWrapper(handleSignIn, [payload]),
    ...options,
  })

  return {
    onSignIn,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
