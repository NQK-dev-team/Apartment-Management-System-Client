<template lang="html">
  <div v-if="displaySpinner" class="h-full w-full flex justify-center items-center fixed">
    <div id="loading_backdrop"></div>
    <a-spin :indicator="indicator" />
  </div>
</template>

<script setup lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue';

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '64px',
    color: '#737373',
    'z-index': 2010,
  },
  spin: true,
});

const displaySpinner = ref(false);

const { $event } = useNuxtApp();

onMounted(() => {
  $event.on('loading', () => {
    displaySpinner.value = !displaySpinner.value;
  });
});
</script>

<style lang="css" scoped>
#loading_backdrop {
  background-color: rgba(213, 213, 213, 0.5);
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
