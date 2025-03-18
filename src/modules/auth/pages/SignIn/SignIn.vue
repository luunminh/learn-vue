<script lang="ts" setup>
import { OnyxButton, OnyxCard, OnyxHeadline, OnyxInput } from 'sit-onyx'
import { useSignInForm } from './useSignInForm'

const { isPending, formValues, onValidSubmit, formErrors } = useSignInForm()
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <form :onsubmit="onValidSubmit">
      <OnyxCard class="w-[500px] mx-auto">
        <OnyxHeadline is="h2">Sign In</OnyxHeadline>
        <div class="flex flex-col mt-3 gap-3">
          <OnyxInput
            name="email"
            v-model:model-value="formValues.email"
            label="Email"
            required
            placeholder="Enter Email"
            :custom-error="formErrors.email"
          />
          <OnyxInput
            name="password"
            v-model:model-value="formValues.password"
            label="Password"
            type="password"
            required
            placeholder="Enter Password"
            :custom-error="formErrors.password"
          />
          <OnyxLink class="text-end text-base" href="#">forgot password ?</OnyxLink>
          <OnyxButton type="submit" :loading="isPending" label="Sign In" class="w-full!" />
        </div>
      </OnyxCard>
    </form>
  </div>
</template>
