<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup generic="T">
import {
  FlexRender,
  isFunction,
  useVueTable,
  getCoreRowModel,
  type PaginationState,
  type SortingState,
} from '@tanstack/vue-table'
import { useRoute, useRouter } from 'vue-router'
import { type DataTableProps } from './DataTable.types'
import { computed, reactive, ref, watch } from 'vue'
import {
  getAdditionalParams,
  getInitialState,
  getSortOrderParamsUrlFromState,
  TableQueryParams,
} from './DataTable.helpers'
import { OnyxLoadingIndicator, OnyxTable, OnyxPagination } from 'sit-onyx'
import { isEmpty } from '@/libs/utils'

const {
  data: datas,
  columns,
  state,
  onAction,
  initialState,
  totalRecords,
  isLoading = false,
  additionalFilterParams = [],
  ...props
} = defineProps<DataTableProps<T>>()

const route = useRoute()
const query = computed(() => route.query)
const path = computed(() => route.path)
const router = useRouter()

const data = computed(() => datas)

watch(
  data,
  () => {
    table.reset()
  },
  { deep: true },
)

const initialStates = computed(() =>
  getInitialState({
    initialState: initialState!,
    searchParams: new URLSearchParams(query as Record<string, any>),
  }),
)

const search = ref<string>(initialStates.value.globalFilter)
const sorting = ref<SortingState>(initialStates.value.sorting)
const pagination = reactive<PaginationState>({
  pageIndex: initialStates.value.pagination.pageIndex,
  pageSize: initialStates.value.pagination.pageSize,
})

const pageCount = computed(() => Math.ceil(totalRecords / pagination.pageSize))

watch([pagination, sorting, search, query], () => {
  handleTriggerAction()
})

const getActionParams = () => {
  const searchParamsValue = (query.value[TableQueryParams.SEARCH] || '') as string

  return {
    ...getAdditionalParams(
      additionalFilterParams,
      new URLSearchParams(query.value as Record<string, any>),
    ),
    search: searchParamsValue,
    take: pagination.pageSize || 0,
    skip: pagination.pageSize * pagination.pageIndex,
    order:
      getSortOrderParamsUrlFromState(sorting.value) ||
      getSortOrderParamsUrlFromState(initialStates.value.sorting),
  }
}

const handleTriggerAction = () => {
  if (!onAction) return

  const params = getActionParams()
  onAction(params)
}

const setOrDeleteSearchParamsByKey = ({ key, value }: { key: string; value: unknown }) => {
  const newQuery = { ...query.value }

  if (value !== undefined && value !== null && value !== '') {
    newQuery[key] = String(value)
  } else {
    delete newQuery[key]
  }

  router.push({ path: path.value, query: newQuery })
}

const handleSortingChange = (value: SortingState) => {
  setOrDeleteSearchParamsByKey({
    key: TableQueryParams.SORT,
    value:
      !isEmpty(value) && Array.isArray(value)
        ? `${value[0].id}:${value[0].desc ? 'desc' : 'asc'}`
        : [],
  })
}

const handlePaginationChange = (value: PaginationState) => {
  console.log({ value })
  setOrDeleteSearchParamsByKey({
    key: TableQueryParams.PAGE,
    value: value?.pageIndex,
  })
}

watch(pagination, () => {
  handlePaginationChange(pagination)
})

watch([sorting], () => {
  handleSortingChange(sorting.value)
})

const resetToFirstPage = () => {
  pagination.pageIndex = 0
}

const table = useVueTable({
  ...props,
  data,
  columns,
  state: {
    ...state,
    //@ts-ignore
    pagination,
    //@ts-ignore
    sorting,
    globalFilter: search,
  },
  manualPagination: true,
  autoResetPageIndex: false,
  pageCount: pageCount.value,
  initialState: {
    sorting: undefined,
    pagination: undefined,
    globalFilter: undefined,
  },
  onGlobalFilterChange: (updaterOrValue) => {
    search.value = updaterOrValue
    resetToFirstPage()
  },
  onPaginationChange: (updaterOrValue) => {
    if (isFunction(updaterOrValue)) {
      pagination.pageIndex = updaterOrValue(pagination).pageIndex
      pagination.pageSize = updaterOrValue(pagination).pageSize
    } else {
      pagination.pageIndex = updaterOrValue.pageIndex
      pagination.pageSize = updaterOrValue.pageSize
    }
  },
  onSortingChange: (updaterOrValue) => {
    if (!isFunction(updaterOrValue)) {
      sorting.value = updaterOrValue
      resetToFirstPage()
    }
  },
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="p-3 flex items-center justify-center" v-if="isLoading">
    <OnyxLoadingIndicator type="dots" />
  </div>
  <OnyxTable v-else class="w-full">
    <template #head>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan">
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </template>
    <tr v-for="row in table.getRowModel().rows" :key="row.id">
      <td v-for="cell in row.getVisibleCells()" :key="cell.id">
        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
      </td>
    </tr>
    <template #pagination>
      <OnyxPagination
        class="w-full"
        :modelValue="table.getState().pagination.pageIndex + 1"
        :pages="pageCount"
        v-on:update:model-value="(page) => (pagination.pageIndex = page - 1)"
      />
    </template>
  </OnyxTable>
</template>
