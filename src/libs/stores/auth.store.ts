/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const count = ref<number>(0)
  const isAuth = ref<boolean>(false)
  // use Ref for full object replacement
  const user = ref<Record<string, any> | null>(null)

  const setAuth = (value: boolean) => {
    isAuth.value = value
  }

  const setUser = (newUser: Record<string, any> | null) => {
    user.value = newUser
  }

  const increase = () => count.value++
  const decrease = () => count.value--

  return { isAuth, user, setAuth, setUser, count, increase, decrease }
})
