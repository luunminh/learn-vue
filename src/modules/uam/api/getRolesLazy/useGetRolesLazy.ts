/* eslint-disable @typescript-eslint/no-explicit-any */
import { responseWrapper, type PaginationResponseType } from '@/libs/services/http/http.helper'
import { HttpService } from '@/libs/services/http/http.service'
import { isEmpty, type TableParams } from '@/libs/utils'
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
  type UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import { stringify } from 'querystring'
import { computed, ref, watch } from 'vue'
import type { MyRole } from '../../model/user.model'
import { debounce } from 'lodash-es'

const PAYLOAD_SIZE = 10

const defaultSearch = {
  take: PAYLOAD_SIZE,
  skip: 0,
}

const QueryKey = {
  ROLES_LAZY: '/ais-svc/roles',
}

export function useGetRolesLazy(
  options?: Partial<UseInfiniteQueryOptions<PaginationResponseType<MyRole>, Error>>,
) {
  const params = ref<TableParams>({ skip: 0, take: 10 })
  const inputSearch = ref<string>('')

  const setInputSearch = (value: string) => {
    inputSearch.value = value
  }

  const debouncedSearch = ref('')

  const queryKey = computed(() => [
    QueryKey.ROLES_LAZY,
    { type: 'lazy', ...params.value, search: debouncedSearch.value },
  ])

  watch(
    inputSearch,
    debounce((newValue) => {
      debouncedSearch.value = newValue.trim()
    }, 500),
  )
  const {
    data,
    isLoading,
    isFetching,
    refetch: onGetRoles,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<MyRole>, Error>({
    queryKey: queryKey,

    queryFn: (props) => {
      const { pageParam = defaultSearch } = props

      const newParams = {
        ...params.value,
        ...(pageParam as any),
        search: inputSearch.value?.trim(),
      }

      return responseWrapper<PaginationResponseType<MyRole>>(getRolesApi, [newParams])
    },
    getNextPageParam(lastPage, allPages) {
      if (lastPage.data?.length < PAYLOAD_SIZE) return undefined
      return {
        take: PAYLOAD_SIZE,
        skip: allPages.length * PAYLOAD_SIZE,
      }
    },
    initialPageParam: defaultSearch,
    notifyOnChangeProps: ['data', 'isFetching'],
    placeholderData: keepPreviousData,
    enabled: true,
    ...options,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
    }),
  })

  const queryClient = useQueryClient()
  const handleInvalidateRoles = () =>
    queryClient.invalidateQueries({ queryKey: [QueryKey.ROLES_LAZY] })

  const roleOptions = computed(() => {
    if (isEmpty(data.value?.pages)) return []
    return data.value?.pages.reduce(
      (state, page, _pageIdx) => [...state, ...mapOptions(page.data)] as any,
      [],
    )
  })

  const hasNext = computed(() => {
    if (isEmpty(data.value?.pages)) return null
    return data.value?.pages[data.value?.pages.length - 1]?.hasNext
  })

  const setParams = (value: TableParams) => {
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
      onGetRoles()
    },
    { deep: true },
  )

  return {
    roleOptions,
    isLoading,
    isFetching,
    hasNext,
    inputSearch,
    setInputSearch,
    fetchNextPage,
    setParams,
    onGetRoles,
    handleInvalidateRoles,
  }
}

const getRolesApi = (params: TableParams) => {
  const formattedParams = Object.keys(params).reduce((acc, key) => {
    if (params[key]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[key] = params[key]
    }

    return acc
  }, {})
  return HttpService.get(`/v1/uam/roles?${stringify(formattedParams)}`, {})
}

const mapOptions = (values: MyRole[]) => {
  return values?.map((value) => ({ label: value.displayName, value: value.name, data: value }))
}
