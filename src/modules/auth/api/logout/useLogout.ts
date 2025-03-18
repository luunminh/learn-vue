import { useMutation, type UseMutationOptions } from '@tanstack/vue-query'
import { signOut } from 'aws-amplify/auth'
import { authResponseWrapper } from '@/libs/services/http/http.helper'
import { useAuthStore } from '@/libs/stores/auth.store'
import { useRouter } from 'vue-router'

const handleLogout = () => signOut()

export function useLogout(options?: UseMutationOptions<object, Error, void>) {
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const {
    mutate: onLogout,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<object, Error, void>({
    mutationFn: () => authResponseWrapper(handleLogout),
    onSuccess() {
      setAuth(false)
      router.push('/login')
    },
    ...options,
  })

  return {
    onLogout,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
