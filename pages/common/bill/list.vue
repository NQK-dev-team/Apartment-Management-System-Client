<template>
  <BillListStaff v-if="userRole?.toString() === roles.owner || userRole?.toString() === roles.manager"/>
</template>

<script lang="ts" setup>
import { roles } from '~/consts/roles';
import BillListStaff from '~/pages/common/bill/list.staff.vue';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Bill List',
  layout: 'main',
});

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
</script>
