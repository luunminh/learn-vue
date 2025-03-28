<template>
  <div class="splash-screen flex justify-center items-center h-screen">
    <img src="/mgm-logo-white.svg" alt="App Logo" class="h-[80px] animate-bounce" />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.splash-screen {
  animation: fadeIn 10s infinite;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(2);
  }

  90% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
  }
}
</style>
