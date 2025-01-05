<template>
  <div class="w-full h-full flex flex-col">
    <GeneralHeader :is-admin="tokenStore.getRole !== '001'" />
    <div
      class="w-full flex-1"
      :class="{
        dark_theme: !(lightModeCookie === null || lightModeCookie === undefined ? 1 : parseInt(lightModeCookie)),
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const lightModeCookie = useCookie('lightMode');
const tokenStore = jwtStore();
</script>
