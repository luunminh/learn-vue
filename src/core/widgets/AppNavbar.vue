<script lang="ts" setup>
import { useAuthStore } from '@/libs/stores/auth.store'
import { useLogout } from '@/modules/auth/api'
import { authPaths } from '@/modules/auth/auth.route'
import { useColorMode } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import {
  OnyxNavBar,
  OnyxUserMenu,
  OnyxColorSchemeMenuItem,
  useThemeTransition,
  OnyxButton,
} from 'sit-onyx'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const { isAuth, user } = storeToRefs(authStore)

console.log({ isAuth, user })

const route = useRouter()
const { onLogout, isPending } = useLogout()

const navigateToLogin = () => route.push({ path: authPaths.signIn })

const { store: colorScheme } = useColorMode({ disableTransition: false })
useThemeTransition(colorScheme)

const handleSignUp = () => {
  console.log({ isAuth })
}
</script>

<template>
  <OnyxNavBar app-name="ML W Vue" logo-url="/mgm-logo-white.svg">
    <template #contextArea>
      <template v-if="isAuth">
        <OnyxUserMenu :full-name="user?.fullName">
          <OnyxColorSchemeMenuItem v-model="colorScheme" />
          <OnyxButton label="Logout" @click="onLogout" :loading="isPending" />
        </OnyxUserMenu>
      </template>
      <template v-else>
        <div class="flex gap-2">
          <OnyxButton label="Login" @click="navigateToLogin" />
          <OnyxButton label="Signup" color="neutral" @click="handleSignUp" />
        </div>
      </template>
    </template>
  </OnyxNavBar>
</template>
