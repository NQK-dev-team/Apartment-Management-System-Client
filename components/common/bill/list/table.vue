<template>
  <a-table :columns="columns">
    <template #headerCell="{ column }">
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'Status'">
        <span>
          <a-tag :color="record.Status === 0 ? 'volcano' : 'green'">
            {{ record.Status[0].toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a style="color: deepskyblue;">{{ $t('detail') }}</a>
          <a-divider type="vertical" />
          <a style="color: red;">{{ $t('delete') }}</a>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
const columns = [
  {
    name: 'No',
    dataIndex: 'No',
    key: 'No',
  },
  {
    title: 'Contract ID',
    dataIndex: 'Contract ID',
    key: 'Contract ID',
  },
  {
    title: 'Owner',
    dataIndex: 'Owner',
    key: 'Owner',
  },
  {
    title: 'Payer ID',
    dataIndex: 'Payer ID',
    key: 'Payer ID',
  },
  {
    title: 'Bill ID',
    dataIndex: 'Bill ID',
    key: 'Bill ID',
  },
  {
    title: 'Payment Period',
    dataIndex: 'Payment Period',
    key: 'Payment Period',
  },
  {
    title: 'Amount',
    dataIndex: 'Amount',
    key: 'Amount',
  },
  {
    title: 'Status',
    key: 'Status',
    dataIndex: 'Status',
  },
  {
    title: 'Paid by',
    key: 'Paid by',
    dataIndex: 'Paid by',
  },
  {
    title: 'Payment Date',
    dataIndex: 'Payment Date',
    key: 'Payment Date',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  period: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  paymentTime: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  payerID: {
    type: Number,
    required: true,
  },
  payerName: {
    type: String,
    required: true,
  },
  contractID: {
    type: Number,
    required: true,
  },
});
const { t } = useI18n();
const { $event } = useNuxtApp();
</script>