<template>
  <div></div>
</template>

<script lang="ts" setup>
import type { NewBuildingInfo } from '~/types/building';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<NewBuildingInfo>,
    required: true,
  },
});

// ---------------------- Functions ----------------------

</script>

<style lang="css" scoped></style>
