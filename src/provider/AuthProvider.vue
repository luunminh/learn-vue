<script lang="ts" setup>
import { useAuthStore } from '@/libs/stores/auth.store'
import { useLogout } from '@/modules/auth/api'
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'

const { onLogout } = useLogout()
const { isAuth, setAuth, setUser } = useAuthStore()

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
  if (!isAuth) {
    fetchAuthSession()
      .then(async (user) => {
        console.log({ user })
        const userData = user?.tokens?.idToken?.toString() || {}

        console.log({ userData })
        setAuth(true)
        setUser(userData)
      })
      .catch(() => onLogout())

    getCurrentUser().then((user) => {
      console.log({ user })
    })
  }
}
</script>

<template>
  <slot />
</template>
