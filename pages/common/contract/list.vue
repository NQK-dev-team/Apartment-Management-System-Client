<template>
  <ContractListStaff v-if="userRole?.toString() === roles.owner || userRole?.toString() === roles.manager" />
</template>

<script lang="ts" setup>
import { roles } from '~/consts/roles';
import ContractListStaff from '~/pages/common/contract/list.staff.vue';

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
