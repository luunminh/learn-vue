import { reactive, watch } from 'vue'
import { useSignIn } from '../../api'
import { isEmpty } from 'lodash-es'
import { useRouter } from 'vue-router'
import { useToast } from 'sit-onyx'
import { Hub } from 'aws-amplify/utils'

export type SignInFormType = {
  email: string
  password: string
}

export const signInInitValues: SignInFormType = {
  email: '',
  password: '',
}

export const useSignInForm = () => {
  const toast = useToast()
  const router = useRouter()

  const { onSignIn, isPending } = useSignIn({
    onSuccess: (data) => {
      Hub.dispatch('auth', { event: 'signedIn' })
      toast.show({ headline: 'Sign-in successful', color: 'success', duration: 1000 })
      setTimeout(() => router.push('/'), 1000)
    },
    onError: (error) => {
      toast.show({ headline: error.message, color: 'danger', duration: 2000 })
      console.error('Sign-in error:', error)
    },
  })

  const formValues = reactive<SignInFormType>({ ...signInInitValues })
  const formErrors = reactive<SignInFormType>({ email: '', password: '' })

  watch(
    () => formValues.email,
    () => {
      const errMap = {
        'Email is required': isEmpty(formValues.email?.trim()),
        'Wrong email format': !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email),
      }

      const emailErr = Object.entries(errMap).find(([_, value]) => value)?.[0] || ''
      formErrors.email = emailErr
    },
  )

  watch(
    () => formValues.password,
    () => {
      const errMap = {
        'Password is required': isEmpty(formValues.password?.trim()),
        'Password must be at least 8 characters': formValues.password.length < 8,
        'Password must contain at least one number': !/\d/.test(formValues.password),
        'Password must contain at least one lowercase letter': !/[a-z]/.test(formValues.password),
        'Password must contain at least one uppercase letter': !/[A-Z]/.test(formValues.password),
        'Password must contain at least one special character': !/[!@#$%^&*]/.test(
          formValues.password,
        ),
      }

      const passwordError = Object.entries(errMap).find(([_, value]) => value)?.[0] || ''
      formErrors.password = passwordError
    },
  )

  const handleOnChange = (e: Event, key: keyof SignInFormType) => {
    formValues[key] = (e.target as HTMLInputElement).value
  }

  const onValidSubmit = (e: Event) => {
    e.preventDefault()

    const hasErrors = Object.values(formErrors).some((value) => !isEmpty(value))
    if (hasErrors) return

    onSignIn(formValues)
  }

  return { handleOnChange, onValidSubmit, formValues, isPending, formErrors }
}
