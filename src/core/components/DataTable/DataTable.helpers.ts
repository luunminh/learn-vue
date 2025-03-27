import { isEmpty } from '@/libs/utils'
import type { SortingState } from '@tanstack/vue-table'

export enum TableQueryParams {
  SEARCH = 'search',
  ROWS_PER_PAGE = 'rowsPerPage',
  PAGE = 'page',
  SORT = 'sort',
  FILTER = 'filter',
}

export const DEFAULT_ROWS_PER_PAGE = 10

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getInitialState = ({
  initialState,
  searchParams,
  isLocalState = false,
}: {
  initialState: any
  searchParams: URLSearchParams
  isLocalState?: boolean
}) => {
  return {
    globalFilter: initialState?.globalFilter, //just use globalFilter for local state
    sorting: initialState?.sorting || [],
    pagination: {
      pageIndex: isLocalState
        ? initialState?.pagination?.pageIndex || 0
        : searchParams.has(TableQueryParams.PAGE)
          ? Number(searchParams.get(TableQueryParams.PAGE))
          : initialState?.pagination?.pageIndex || 0,
      pageSize: isLocalState
        ? initialState?.pagination?.pageSize || DEFAULT_ROWS_PER_PAGE
        : searchParams.has(TableQueryParams.ROWS_PER_PAGE)
          ? Number(searchParams.get(TableQueryParams.ROWS_PER_PAGE))
          : initialState?.pagination?.pageSize || DEFAULT_ROWS_PER_PAGE,
    },
  }
}

export const getSortOrderStateFromParamsUrl = (sortParams: string) => {
  if (!sortParams) return []

  if (sortParams?.includes(':')) {
    const sortOrderSplit = sortParams?.split(':')
    if (sortOrderSplit.length === 2 && ['asc', 'desc'].includes(sortOrderSplit[1])) {
      return [
        {
          id: sortOrderSplit[0],
          desc: sortOrderSplit[1] === 'desc',
        },
      ]
    }
  }

  return []
}

export const getSortOrderParamsUrlFromState = (sortState: SortingState) => {
  return !isEmpty(sortState) ? `${sortState[0].id}:${sortState[0].desc ? 'desc' : 'asc'}` : null
}

export const getAdditionalParams = (filterList: string[], query: URLSearchParams) => {
  if (isEmpty(filterList)) return {}

  return filterList.reduce((state, key) => {
    const value = query.getAll(key)
    if (value) {
      return {
        ...state,
        [key]: value,
      }
    }
    return state
  }, {})
}
