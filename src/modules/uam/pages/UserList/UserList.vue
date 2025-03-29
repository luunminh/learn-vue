<script lang="ts" setup>
import DataTableSearch from '@/core/components/DataTable/DataTable.Search.vue'
import { OnyxButton, OnyxIconButton, OnyxModalDialog } from 'sit-onyx'
import list from '@sit-onyx/icons/list.svg?raw'
import rotate from '@sit-onyx/icons/rotate.svg?raw'
import DataTable from '@/core/components/DataTable/DataTable.vue'
import { useGetUsers } from '../../api/getUsers'
import { allColumns } from './UserList.columns'
import { computed } from 'vue'
import UserForm from '../UserForm/UserForm.vue'
import { useModalStore } from '@/libs/stores/modal.store'
import { storeToRefs } from 'pinia'

const { usersList, isFetching, totalRecords, handleInvalidateUsersList, setParams } = useGetUsers()

const store = useModalStore()
const { modalState } = storeToRefs(store)

const key = 'user-form-modal'

const isOpen = computed(() => modalState.value?.[key] || false)

const columns = computed(() => allColumns())
</script>

<template>
  <OnyxModalDialog label="Create New User" :open="isOpen" @close="() => store.closeModal(key)">
    <UserForm />
  </OnyxModalDialog>
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
        <OnyxButton
          id="create-user-btn"
          label="Create new user"
          @click="() => store.openModal(key)"
          :disabled="isFetching"
        />
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
