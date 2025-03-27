<script lang="ts" setup>
import { useAuthStore } from '@/libs/stores/auth.store'
import { useLogout } from '@/modules/auth/api'
import { fetchAuthSession } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'
import { storeToRefs } from 'pinia'
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'

const { onLogout } = useLogout()
const authStore = useAuthStore()
const { isAuth } = storeToRefs(authStore)

const unsubscribe = ref<() => void>(() => {})

onBeforeMount(() => authenticate())

onMounted(() => {
  unsubscribe.value = Hub.listen('auth', ({ payload: { event } }) => {
    switch (event) {
      case 'signedIn':
        authenticate()
        break
      case 'signInWithRedirect':
        break
      default:
        break
    }
  })
})

onBeforeUnmount(() => {
  if (unsubscribe.value) {
    unsubscribe.value()
  }
})

const authenticate = () => {
  if (!isAuth.value) {
    fetchAuthSession()
      .then(async (user) => {
        const userData = user?.tokens?.idToken?.payload || {}

        if (!userData) return onLogout()

        authStore.setAuth(true)
        authStore.setUser({
          ...userData,
          fullName: `${userData.given_name} ${userData.family_name}`,
        })
      })
      .catch(() => onLogout())
  }
}
</script>

<template>
  <slot />
</template>
