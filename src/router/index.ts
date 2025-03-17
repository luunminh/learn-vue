import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../modules/HomeView.vue'
import { authRoutes } from '@/modules/auth/auth.route'

const publicRoutes = []
const protectedRoutes = []

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../modules/AboutView.vue'),
    },
    ...authRoutes,
  ],
})

const mapProtectedRoutes = (routes: RouteRecordRaw[]) => {}

export default router
