import { computed, ref } from 'vue'
import { useAddUser, type AddUserPayload } from '../../api/addUser/useAddUser'
import { useToast } from 'sit-onyx'
import { useGetUsers } from '../../api/getUsers'
import { formatPhoneNumberPayload } from '@/libs/utils'
import { isEqual } from 'lodash-es'
import { useModalStore } from '@/libs/stores/modal.store'
import { storeToRefs } from 'pinia'
import { useGetRolesLazy } from '../../api/getRolesLazy'

export enum UserFormKey {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  ROLES = 'roles',
  PHONE = 'phoneNumber',
  USER_NUMBER = 'employeeNo',
  USER_TYPE = 'userType',
  SIGNATURE_URL = 'signatureUrl',
}

export type UserFormType = {
  firstName: string
  lastName: string
  email: string
  roles: string[]
  phoneNumber: string
  employeeNo: string
  userType: string
  signatureUrl?: string
}

const userFormInitValue: UserFormType = {
  firstName: '',
  lastName: '',
  email: '',
  roles: [],
  phoneNumber: '',
  employeeNo: '',
  userType: '',
  signatureUrl: '',
}

export const useUserForm = () => {
  const key = 'user-form-modal'
  const confirmKey = 'confirm-modal'

  const store = useModalStore()
  const { modalState } = storeToRefs(store)

  const isOpen = computed(() => modalState.value?.[confirmKey] || false)

  const roleQuery = useGetRolesLazy()

  const toast = useToast()
  const { handleInvalidateUsersList } = useGetUsers({ enabled: false })

  const { onAddUser, isPending } = useAddUser({
    onSuccess: () => {
      toast.show({ headline: 'User added successfully', color: 'success', duration: 2000 })
      handleInvalidateUsersList()
    },
    onError: (err) => {
      toast.show({ headline: err?.message, color: 'danger', duration: 2000 })
    },
  })

  const formState = ref<UserFormType>({ ...userFormInitValue })
  const isDirty = computed(() => !isEqual(formState.value, userFormInitValue))

  const handleReset = () => {
    formState.value = { ...userFormInitValue }
  }

  const handleSubmit = () => {
    const formValues = formState.value
    const formattedPayload: AddUserPayload = {
      ...formValues,
      username: formValues.email,
      profile: {
        signatureUrl: undefined,
        employeeNo: formValues.employeeNo,
        phoneNumber: formatPhoneNumberPayload(formValues.phoneNumber || ''),
      },
    }

    console.log('formattedPayload', formattedPayload)

    onAddUser(formattedPayload)
  }

  const handleCloseModal = () => {
    if (isDirty.value) {
      store.openModal(confirmKey)
      return
    }
    store.closeModal(key)
  }

  return {
    key,
    confirmKey,
    handleCloseModal,
    formState,
    isPending,
    handleReset,
    handleSubmit,
    isDirty,
    isOpen,
    roleQuery,
    store,
  }
}
