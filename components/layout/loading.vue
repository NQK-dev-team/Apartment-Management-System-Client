<template>
  <div v-if="displaySpinner" class="h-full w-full flex justify-center items-center fixed" style="z-index: 20000">
    <div id="loading_backdrop" :class="[lightMode ? 'bg-[#d5d5d580]' : 'bg-[#41414180]']"></div>
    <a-spin :indicator="indicator" :class="[lightMode ? 'text-[#737373]' : 'text-black']" />
  </div>
</template>

<script setup lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '64px',
    'z-index': 20010,
  },
  spin: true,
});
const displaySpinner = ref(false);
const { $event } = useNuxtApp();
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
// ---------------------- Lifecycles ----------------------
onMounted(() => {
  $event.on('loading', () => {
    displaySpinner.value = !displaySpinner.value;
  });
});
</script>

<style lang="css" scoped>
#loading_backdrop {
  z-index: 20000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
