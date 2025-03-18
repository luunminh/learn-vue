import type { RouteRecordRaw } from 'vue-router'

export const authPaths = {
  signIn: '/sign-in',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
}

export const authRoutes: RouteRecordRaw[] = [
  {
    path: authPaths.signIn,
    name: 'signIn',
    component: () => import('./pages/SignIn/SignIn.vue'),
  },
]
