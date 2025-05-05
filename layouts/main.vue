<template>
  <div class="w-full h-full flex flex-col bg-[#efefef]">
    <div class="header">
      <LayoutHeader :is-admin="userRole !== roles.customer" />
    </div>
    <div class="flex w-full content">
      <LayoutNavMenu :role="userRole" />
      <div
        class="flex-1 w-full overflow-auto"
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
import { roles } from '~/consts/roles';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const userRoleCookie = useCookie('userRole');
const userRole: string = userRoleCookie && userRoleCookie.value ? userRoleCookie.value.toString() : '';
</script>

<style lang="css" scope>
.header {
  height: 50px;
}

.content{
  height: calc(100% - 50px);
}
</style>
