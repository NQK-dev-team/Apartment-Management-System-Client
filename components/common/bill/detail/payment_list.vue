<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'Service Name'">
        <a>{{ text }}</a>
      </template>
    </template>
    <template #footer>Total:</template>
  </a-table>
</template>
<script lang="ts" setup>
const props = defineProps({
  serviceName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
});
const columns = [
  {
    title: 'Service Name',
    dataIndex: 'Service Name',
    key: 'Service Name',
  },
  {
    title: 'Amount',
    dataIndex: 'Amount',
    key: 'Amount',
  },
  {
    title: 'Note',
    dataIndex: 'Note',
    key: 'Note',
  },
];

const data = [
  {
    'Service Name': 'Service 1',
    Amount: 100,
    Note: 'Note 1',
  },
  {
    'Service Name': 'Service 2',
    Amount: 200,
    Note: 'Note 2',
  },
  {
    'Service Name': 'Service 3',
    Amount: 300,
    Note: 'Note 3',
  }
];
</script>
<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
