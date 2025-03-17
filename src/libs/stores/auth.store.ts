/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref<boolean>(false)
  const user = ref<any | null>(null)

  const setAuth = (value: boolean) => (isAuth.value = value)
  const setUser = (user: any) => (user.value = user)

  return { isAuth, user, setAuth, setUser }
})
