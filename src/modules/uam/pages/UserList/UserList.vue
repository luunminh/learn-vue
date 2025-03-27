<script lang="ts" setup>
import DataTableSearch from '@/core/components/DataTable/DataTable.Search.vue'
import { OnyxButton, OnyxIconButton } from 'sit-onyx'
import list from '@sit-onyx/icons/list.svg?raw'
import rotate from '@sit-onyx/icons/rotate.svg?raw'
import DataTable from '@/core/components/DataTable/DataTable.vue'
import { useGetUsers } from '../../api/getUsers'
import { allColumns } from './UserList.columns'
import { computed } from 'vue'

const { usersList, isFetching, totalRecords, handleInvalidateUsersList, setParams } = useGetUsers()

const columns = computed(() => allColumns())
</script>

<template>
  <div class="p-3 rounded-md">
    <div class="flex items-center justify-between py-3">
      <div class="flex gap-1 items-center">
        <div class="w-[300px]"><DataTableSearch /></div>
        <OnyxIconButton :disabled="isFetching" :icon="list" label="Filter Button" />
      </div>
      <div class="flex gap-2">
        <OnyxIconButton
          :icon="rotate"
          :loading="isFetching"
          label="Refresh Button"
          :onclick="handleInvalidateUsersList"
        />
        <OnyxButton label="Create new user" />
      </div>
    </div>
    <DataTable
      :data="usersList"
      :columns="columns"
      :isLoading="isFetching"
      :total-records="totalRecords"
      :additional-filter-params="['statuses', 'roles']"
      v-on:action="(params) => setParams(params)"
    />
  </div>
</template>
