<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'Status'">
        <span>
          <a-tag :color="record.Status.includes('Unpaid') ? 'volcano' : 'green'">
            {{ record.Status[0].toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a style="color: deepskyblue;">Detail</a>
          <a-divider type="vertical" />
          <a style="color: red;">{{ $t('Delete') }}</a>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
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
    title: 'Customer ID',
    dataIndex: 'Customer ID',
    key: 'Customer ID',
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

const data = [
  {
    key: '1',
    'No': '1',
    'Contract ID': 'C001',
    Owner: 'John Brown',
    'Customer ID': 'C001',
    'Bill ID': 'B001',
    'Payment Period': '2021-09',
    Amount: '1000',
    Status: ['Unpaid'],
    'Paid by': '',
    'Payment Date': '',
  },
  {
    key: '2',
    'No': '2',
    'Contract ID': 'C002',
    Owner: 'Jim Green',
    'Customer ID': 'C002',
    'Bill ID': 'B002',
    'Payment Period': '2021-09',
    Amount: '2000',
    Status: ['Paid'],
    'Paid by': 'John Brown',
    'Payment Date': '2021-09-01',
  },
  {
    key: '3',
    'No': '3',
    'Contract ID': 'C003',
    Owner: 'Joe Black',
    'Customer ID': 'C003',
    'Bill ID': 'B003',
    'Payment Period': '2021-09',
    Amount: '3000',
    Status: ['Unpaid'],
    'Paid by': '',
    'Payment Date': '',
  },
];
// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  contractID: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  customerID: {
    type: String,
    required: true,
  },
  billID: {
    type: String,
    required: true,
  },
  paymentPeriod: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  paidBy: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: String,
    required: true,
  },
});
const { t } = useI18n();
const { $event } = useNuxtApp();
</script>