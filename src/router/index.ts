import { createRouter, createWebHistory, useRoute, type RouteRecordRaw } from 'vue-router'
import HomeView from '../modules/HomeView.vue'
import { authPaths, authRoutes } from '@/modules/auth/auth.route'
import { uamPaths, uamRoutes } from '@/modules/uam/uam.route'
import { useAuthStore } from '@/libs/stores/auth.store'
import { storeToRefs } from 'pinia'
import { REMEMBER_URL_LOCAL_KEY } from '@/core/constants'

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
      path: '/about',
      name: 'about',
      component: () => import('../modules/AboutView.vue'),
    },
    ...authRoutes,
    ...uamRoutes,
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const { isAuth } = storeToRefs(authStore)

  const isPrivate = protectedRoutes.includes(to.path)

  if (isPrivate && !isAuth.value) {
    localStorage.setItem(REMEMBER_URL_LOCAL_KEY, from.fullPath)
    return next({ path: authPaths.signIn })
  }

  if (publicRoutes.includes(to.path) && isAuth.value) {
    const rememberUrlLocal = localStorage.getItem(REMEMBER_URL_LOCAL_KEY)
    const redirectUrl = rememberUrlLocal || '/'

    return next({ path: redirectUrl })
  }

  next()
})

export default router
