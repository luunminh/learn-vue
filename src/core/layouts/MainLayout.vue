<script lang="ts" setup>
import { OnyxAppLayout } from 'sit-onyx'
import AppNavbar from '../widgets/AppNavbar.vue'
</script>

<template>
  <OnyxAppLayout class="mx-auto">
    <template #navBar>
      <app-navbar />
    </template>

    <template #default>
      <RouterView />
    </template>
  </OnyxAppLayout>
</template>
