<template>
  <div class="w-full h-full">
    <img src="/image/auth_background.png" class="w-full h-full fixed" />
    <div class="w-full h-full flex items-center justify-center relative"></div>
  </div>
</template>

<script lang="ts" setup>
// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Forgot Password',
});

useHead({
  title: 'Forgot Password',
  meta: [
    {
      name: 'description',
      content: 'Recover user password',
    },
  ],
});
</script>
