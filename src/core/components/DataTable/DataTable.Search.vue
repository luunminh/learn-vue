<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { TableParamKeyEnum } from '@/libs/utils'
import { debounce } from 'lodash-es'
import { OnyxMiniSearch } from 'sit-onyx'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export type TableSearchProps = {
  searchText?: string
  searchKey?: string
  pageKey?: string
  label?: string
  onSearch?: (_text: string) => void
  interceptorAction?: (..._args: any[]) => boolean | Promise<boolean>
}

const {
  searchText,
  searchKey = TableParamKeyEnum.SEARCH,
  pageKey = 'page',
  label,
  onSearch,
  interceptorAction,
} = defineProps<TableSearchProps>()

const route = useRoute()
const router = useRouter()

const searchParam = searchText || route.query[searchKey]?.toString() || ''

const searchValue = ref<string>(searchParam)

const onSearchFunc = async (val: string) => {
  if (onSearch) return onSearch(val)

  const searchParams = { ...route.query }

  if (val) searchParams[searchKey] = val
  else delete searchParams[searchKey]

  delete searchParams[pageKey]

  router.push({ path: route.path, query: searchParams })
}
const debounceValue = debounce(onSearchFunc, 500)

const handleTextChange = (value: string) => {
  searchValue.value = value
  debounceValue(value)
}

const handleClearSearchValue = async () => {
  if (!!interceptorAction) {
    const allowContinue = await interceptorAction()
    if (!allowContinue) return
  }
  searchValue.value = ''
  onSearchFunc('')
}
</script>

<template>
  <div class="flex grow">
    <OnyxMiniSearch
      class="w-full"
      :label="label || ''"
      :model-value="searchValue"
      v-on:update:model-value="handleTextChange"
      v-on:clear="handleClearSearchValue"
    />
  </div>
</template>
