<script lang="ts" setup>
import { OnyxButton, OnyxForm, OnyxInput, OnyxModalDialog, OnyxSelect, OnyxStepper } from 'sit-onyx'
import { useUserForm } from './useUserForm'
import { userTypeOptions } from '../../model/user.model'
const {
  handleSubmit,
  isPending,
  handleReset,
  formState,
  isOpen,
  roleQuery,
  handleCloseModal,
  store,
  key,
  confirmKey,
} = useUserForm()

const { fetchNextPage, roleOptions, isFetching } = roleQuery
</script>

<template>
  <OnyxForm class="form" @reset="handleReset" @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-2 px-5 w-[800px] h-fit">
      <div class="flex gap-2 py-2">
        <OnyxInput
          label="First Name"
          type="text"
          v-model="formState.firstName"
          :pattern="/[A-Za-z ]+/"
          class="w-[50%]"
          required
          placeholder="First Name"
        />
        <OnyxInput
          label="Last Name"
          v-model="formState.lastName"
          type="text"
          :pattern="/[A-Za-z ]+/"
          class="w-[50%]"
          required
          placeholder="Last Name"
        />
      </div>
      <div class="flex gap-2 py-2">
        <OnyxInput
          v-model="formState.email"
          label="Email"
          type="email"
          class="w-[50%]"
          required
          placeholder="Email"
        />
        <OnyxSelect
          label="Role"
          class="w-[50%]"
          :pattern="/[A-Za-z ]+/"
          required
          placeholder="Role"
          :v-model="+formState.roles"
          multiple
          :lazy-loading="{ enabled: true, loading: isFetching }"
          @lazy-load="fetchNextPage"
          list-label="List Role"
          :options="roleOptions as any"
        />
      </div>
      <div class="flex gap-2 py-2">
        <OnyxInput label="Phone Number" type="tel" class="w-[50%]" placeholder="Phone Number" />
        <OnyxStepper
          :v-model="+formState.employeeNo"
          class="w-[50%]"
          label="Window User Number"
          :min="0"
          :max="999"
        />
      </div>
      <div class="flex gap-2 py-2">
        <OnyxSelect
          label="User Type"
          class="w-[50%]"
          required
          placeholder="User Type"
          :options="userTypeOptions"
          list-label="List User Type"
          v-model="formState.userType"
        />
      </div>
      <div class="flex items-center justify-end gap-2">
        <OnyxButton
          label="Cancel"
          :disabled="isPending"
          color="neutral"
          @click="handleCloseModal"
        />
        <OnyxButton :loading="isPending" label="Save" type="submit" />
      </div>
    </div>
  </OnyxForm>
  <OnyxModalDialog label="Discard" :open="isOpen" @close="() => store.closeModal(confirmKey)">
    <div class="flex flex-col gap-3 p-3">
      <p class="text-md">Change may not be saved. Are you sure to discard?</p>
      <div class="flex items-center justify-end gap-2">
        <OnyxButton label="Cancel" color="neutral" @click="() => store.closeModal(confirmKey)" />
        <OnyxButton
          label="Discard"
          color="danger"
          @click="
            () => {
              store.closeModal(key)
              store.closeModal(confirmKey)
            }
          "
        />
      </div>
    </div>
  </OnyxModalDialog>
</template>
