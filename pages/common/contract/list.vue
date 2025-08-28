<template>
  <ContractListStaff v-if="userRole?.toString() === roles.owner || userRole?.toString() === roles.manager" />
  <ContractListCustomer v-else-if="userRole?.toString() === roles.customer" />
</template>

<script lang="ts" setup>
import { roles } from '~/consts/roles';
import ContractListStaff from '~/pages/common/contract/list.staff.vue';
import ContractListCustomer from '~/pages/common/contract/list.customer.vue';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Contract List',
  layout: 'main',
  // middleware:
  //   userRole?.toString() === roles.owner || userRole?.toString() === roles.manager
  //     ? ['authorization-manager']
  //     : ['authorization-customer'],
});

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
</script>
