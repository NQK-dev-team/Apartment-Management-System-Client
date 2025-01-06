<template>
  <div class="w-full h-full flex flex-col">
    <GeneralHeader :is-admin="tokenStore.getRole !== '001'" />
    <div class="flex w-full flex-1">
      <GeneralNavMenu :role="tokenStore.getRole" />
      <div
        class="flex-1 w-full"
        :class="{
          dark_theme: !(lightModeCookie === null || lightModeCookie === undefined ? 1 : parseInt(lightModeCookie)),
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const tokenStore = jwtStore();
</script>
