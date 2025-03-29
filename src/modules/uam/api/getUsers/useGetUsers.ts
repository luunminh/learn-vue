import { responseWrapper, type PaginationResponseType } from '@/libs/services/http/http.helper'
import { HttpService } from '@/libs/services/http/http.service'
import { isEmpty, type TableParams } from '@/libs/utils'
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/vue-query'
import { stringify } from 'querystring'
import { computed, ref, watch } from 'vue'

export interface GetUsersResponse {
  id: string
  email: string
  username: string
  fullName: string
  userType: string
  status: string
  updatedAt: string
  createdAt: string
  roles: GetUsersRoleResponse[]
  phoneNumber?: string
  employeeNo?: string
}

export interface GetUsersRoleResponse {
  id: string
  name: string
  displayName: string
  description: string
}

export interface GetUserParams extends TableParams {
  userType?: string
  roles?: string[]
}

const QueryKey = {
  USERS_LIST: '/ais-svc/users',
}

export function useGetUsers(
  options?: Partial<UseQueryOptions<PaginationResponseType<GetUsersResponse>, Error>>,
) {
  const params = ref<GetUserParams>({ skip: 0, take: 10 })

  const {
    data,
    isLoading,
    isFetching,
    refetch: onGetUserList,
  } = useQuery<PaginationResponseType<GetUsersResponse>, Error>({
    queryKey: computed(() => [QueryKey.USERS_LIST, params.value]),
    queryFn: (query) => {
      const [, ...params] = query.queryKey
      return responseWrapper<PaginationResponseType<GetUsersResponse>>(getUsers, params)
    },
    notifyOnChangeProps: ['data', 'isFetching', 'isLoading'],
    placeholderData: keepPreviousData,
    ...options,
  })

  const queryClient = useQueryClient()
  const handleInvalidateUsersList = () =>
    queryClient.invalidateQueries({ queryKey: [QueryKey.USERS_LIST] })

  const usersList = computed(() => data?.value?.data || [])
  const totalRecords = computed(() => data?.value?.totalRecords || 0)

  const setParams = (value: GetUserParams) => {
    Object.keys(value).forEach((key) => {
      if (isEmpty(value[key])) {
        params.value[key] = ''
      } else {
        params.value[key] = value[key]
      }
    })
  }

  watch(
    params,
    () => {
      onGetUserList()
    },
    { deep: true },
  )

  return {
    usersList,
    totalRecords,
    isLoading,
    isFetching,
    setParams,
    onGetUserList,
    handleInvalidateUsersList,
  }
}

const getUsers = (params: GetUserParams) => {
  const formattedParams = Object.keys(params).reduce((acc, key) => {
    if (params[key]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[key] = params[key]
    }

    return acc
  }, {})
  return HttpService.get(`/v1/uam/users?${stringify(formattedParams)}`, {})
}
