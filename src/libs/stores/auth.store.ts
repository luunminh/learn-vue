/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const count = ref<number>(0)
  const isAuth = ref<boolean>(false)
  const user = ref<Record<string, any> | null>(null) // Replace `any` with a more specific type if possible

  const setAuth = (value: boolean) => {
    isAuth.value = value
  }

  const setUser = (newUser: Record<string, any> | null) => {
    user.value = newUser // Fix parameter shadowing
  }

  const increase = () => count.value++
  const decrease = () => count.value--

  return { isAuth, user, setAuth, setUser, count, increase, decrease }
})
