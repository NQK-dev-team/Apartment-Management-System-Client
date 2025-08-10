<template>
  <StaffList v-if="userRole?.toString() === roles.manager || userRole?.toString() === roles.owner" />
  <CustomerList v-else-if="userRole?.toString() === roles.customer" />
</template>

<script lang="ts" setup>
import StaffList from '~/pages/common/support_ticket/list.staff.vue';
import CustomerList from '~/pages/common/support_ticket/list.customer.vue';
import { roles } from '~/consts/roles';

// // ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Support Ticket List',
  layout: 'main',
  // middleware: ['authorization-manager'],
});

// useHead({
//   title: 'Support Ticket List',
//   meta: [
//     {
//       name: 'description',
//       content: 'List of support tickets from the customers',
//     },
//   ],
// });

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
</script>
