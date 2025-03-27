import type { RouteRecordRaw } from 'vue-router'
import { authPaths } from '../auth/auth.route'

const PREFIX = 'uam'

export const uamPaths = {
  userManager: `/${PREFIX}/users`,
  roleManager: `/${PREFIX}/roles`,
}

export const uamRoutes: RouteRecordRaw[] = [
  {
    path: uamPaths.userManager,
    name: 'users',
    component: () => import('./pages/UserList/UserList.vue'),
  },
]
