<script lang="ts" setup>
import { OnyxButton, OnyxCard, OnyxHeadline, OnyxInput } from 'sit-onyx'
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <OnyxCard class="w-[500px] mx-auto">
      <OnyxHeadline is="h2">Sign In</OnyxHeadline>
      <div class="flex flex-col mt-3 gap-3">
        <OnyxInput label="Email" required placeholder="Enter Email" />
        <OnyxInput label="Password" required placeholder="Enter Password" />
        <OnyxLink class="text-end text-base" href="#">forgot password ?</OnyxLink>
        <OnyxButton label="Sign In" class="w-full!" />
      </div>
    </OnyxCard>
  </div>
</template>
