<script lang="ts" setup>
import { useAuthStore } from '@/libs/stores/auth.store'
import { useRoute, useRouter } from 'vue-router'
import { REMEMBER_URL_LOCAL_KEY } from '../constants'

type Props = {
  type: 'auth' | 'private'
}

const { type } = defineProps<Props>()

const pathname = useRoute()
const router = useRouter()

const { isAuth } = useAuthStore()

if (type === 'private' && !isAuth) {
  localStorage.setItem(REMEMBER_URL_LOCAL_KEY, pathname.fullPath)
  router.push({ name: '/login' })
}

if (type === 'auth' && isAuth) {
  const rememberUrlLocal = localStorage.getItem(REMEMBER_URL_LOCAL_KEY)
  const redirectUrl = rememberUrlLocal || '/'

  router.push({ name: redirectUrl })
}
</script>

<template>
  <slot />
</template>
