<template>
  <div class="w-full h-full flex flex-col">
    <div class="header">
      <LayoutHeader :is-admin="tokenStore.getRole !== '001'" />
    </div>
    <div class="flex w-full content">
      <LayoutNavMenu :role="tokenStore.getRole" />
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

<style lang="css" scope>
.header {
  height: 50px;
}

.content{
  height: calc(100% - 50px);
}
</style>
