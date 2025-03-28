import { createRouter, createWebHistory, useRoute, type RouteRecordRaw } from 'vue-router'
import HomeView from '../modules/HomeView.vue'
import { authPaths, authRoutes } from '@/modules/auth/auth.route'
import { uamPaths, uamRoutes } from '@/modules/uam/uam.route'
import { useAuthStore } from '@/libs/stores/auth.store'
import { storeToRefs } from 'pinia'
import { REMEMBER_URL_LOCAL_KEY } from '@/core/constants'
import { isBoolean } from 'lodash-es'
import { fetchAuthSession } from 'aws-amplify/auth'

const getRoute = (path: Record<string, string>) => Object.values(path)

const publicRoutes: string[] = [...getRoute(authPaths)]
const protectedRoutes: string[] = [...getRoute(uamPaths)]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/splash',
      name: 'splash',
      component: () => import('../core/components/SplashScreen.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../modules/AboutView.vue'),
    },
    ...authRoutes,
    ...uamRoutes,
  ],
})
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const { isAuth } = storeToRefs(authStore)

  const isPrivate = protectedRoutes.includes(to.path)
  const isPublic = publicRoutes.includes(to.path)

  if (isAuth.value === null) {
    if (to.path !== '/splash') {
      localStorage.setItem(REMEMBER_URL_LOCAL_KEY, to.fullPath) // Store the intended route
      return next({ path: '/splash' }) // Redirect to splash screen
    }

    await authStore.fetchAuthStore()
    const rememberUrl = localStorage.getItem(REMEMBER_URL_LOCAL_KEY) || '/'
    return next({ path: rememberUrl }) // Redirect to the intended route or home
  }

  if (isPrivate && !isAuth.value && isBoolean(isAuth.value)) {
    localStorage.setItem(REMEMBER_URL_LOCAL_KEY, to.fullPath) // Store the intended route
    return next({ path: authPaths.signIn }) // Redirect to login
  }

  if (isPublic && isAuth.value && isBoolean(isAuth.value)) {
    const rememberUrl = localStorage.getItem(REMEMBER_URL_LOCAL_KEY) || '/'
    return next({ path: rememberUrl }) // Redirect to the remembered route or home
  }

  next()
})

export default router
