<script lang="ts" setup>
import { useAuthStore } from '@/libs/stores/auth.store'
import { authPaths } from '@/modules/auth/auth.route'
import { useColorMode } from '@vueuse/core'
import {
  OnyxNavBar,
  OnyxUserMenu,
  OnyxColorSchemeMenuItem,
  useThemeTransition,
  OnyxButton,
} from 'sit-onyx'
import { useRouter } from 'vue-router'
const { isAuth, user } = useAuthStore()

const route = useRouter()

const navigateToLogin = () => route.push({ path: authPaths.signIn })

const { store: colorScheme } = useColorMode({ disableTransition: false })
useThemeTransition(colorScheme)
</script>

<template>
  <OnyxNavBar app-name="ML W Vue" logo-url="src/assets/mgm-logo-white.svg">
    <template #contextArea>
      <template v-if="isAuth">
        <OnyxUserMenu :full-name="user?.fullName">
          <OnyxColorSchemeMenuItem v-model="colorScheme" />
        </OnyxUserMenu>
      </template>
      <template v-else>
        <div class="flex gap-2">
          <OnyxButton label="Login" @click="navigateToLogin" />
          <OnyxButton label="Signup" color="neutral" />
        </div>
      </template>
    </template>
  </OnyxNavBar>
</template>
