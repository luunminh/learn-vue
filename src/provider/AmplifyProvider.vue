<script lang="ts" setup>
import { appConfigs } from '@/config'
import { Amplify } from 'aws-amplify'
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito'
import { defaultStorage } from 'aws-amplify/utils'
import { onBeforeMount, onMounted } from 'vue'

Amplify.configure(appConfigs.AWS_CONFIG)

onBeforeMount(() => {
  cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage)
})

onMounted(() => {
  console.log('AmplifyProvider mounted')
})
</script>

<template>
  <slot />
</template>
