import { useMutation, type UseMutationOptions } from '@tanstack/vue-query'
import { authResponseWrapper } from '@/libs/services/http/http.helper'
import { HttpService } from '@/libs/services/http/http.service'
import { getTitleCase } from '@/libs/utils'

export type AddUserPayload = {
  username: string
  firstName: string
  lastName: string
  middleName?: string
  email: string
  userType: string
  roles: string[]
  profile: {
    employeeNo?: string
    phoneNumber?: string
    dob?: string
    address?: string
    signatureUrl?: string
  }
}

export type AddUserResponse = object

const handleAddUser = (payload: AddUserPayload) => HttpService.post('/v1/uam/users', payload)

export function useAddUser(options?: UseMutationOptions<AddUserResponse, Error, AddUserPayload>) {
  const {
    mutate: onAddUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<AddUserResponse, Error, AddUserPayload>({
    mutationFn: (payload: AddUserPayload) => authResponseWrapper(handleAddUser, [payload]),
    ...options,
  })

  return {
    onAddUser,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
