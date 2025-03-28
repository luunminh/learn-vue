/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAuthSession } from 'aws-amplify/auth'
import { isEmpty } from '../utils'

export const useAuthStore = defineStore('auth', () => {
  const count = ref<number>(0)
  const isAuth = ref<boolean | null>(null)
  // use Ref for full object replacement
  const user = ref<Record<string, any> | null>(null)

  const setAuth = (value: boolean) => {
    isAuth.value = value
  }

  const setUser = (newUser: Record<string, any> | null) => {
    user.value = newUser
  }

  const fetchAuthStore = async () => {
    try {
      // Fetch user session
      const userSession = await fetchAuthSession()
      const userData = userSession?.tokens?.idToken?.payload || {}

      if (isEmpty(userData)) {
        setAuth(false)
        return
      }
      setAuth(true)
      setUser({
        ...userData,
        fullName: `${userData.given_name} ${userData.family_name}`,
      })
    } catch (error) {
      console.error(error)
      setAuth(false)
    }
  }

  const increase = () => count.value++
  const decrease = () => count.value--

  return { isAuth, user, setAuth, setUser, count, increase, decrease, fetchAuthStore }
})
