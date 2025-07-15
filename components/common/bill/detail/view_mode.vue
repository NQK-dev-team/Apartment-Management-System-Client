<template>
  <a-form> </a-form>
</template>

<script lang="ts" setup>
import type { Bill } from '~/types/bill';

// ---------------------- Variables ----------------------
const props = defineProps({
  bill: {
    type: Object as PropType<Bill>,
    required: true,
  },
});
const bill = toRef(props, 'bill');

// ---------------------- Functions ----------------------

// ---------------------- Events ----------------------
</script>
