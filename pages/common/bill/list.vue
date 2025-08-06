<template>
  <BillListStaff v-if="userRole?.toString() === roles.owner || userRole?.toString() === roles.manager" />
  <BillListCustomer v-else-if="userRole?.toString() === roles.customer" />
</template>

<script lang="ts" setup>
import { roles } from '~/consts/roles';
import BillListStaff from '~/pages/common/bill/list.staff.vue';
import BillListCustomer from '~/pages/common/bill/list.customer.vue';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Billing List',
  layout: 'main',
});

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
</script>
