<template>
  <a-table :columns="columns" :data-source="data" :row-selection="rowSelection" bordered class="mt-2">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex && column.dataIndex !== 'operation' && column.dataIndex !== 'state'">
        <div>
          {{ text }}
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div>
          <span>
            <NuxtLink class="detail">Edit</NuxtLink> | <NuxtLink class="delete">Delete</NuxtLink>
          </span>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'state'">
        <a-tag :class="{
          'text-green-500': text === 'In Effect',
          'text-red-500': text === 'End Effect',
          'text-gray-500': text === 'Cancel',
          'text-orange-500': text === 'Not in Effect'
        }">
          {{ text }}
        </a-tag>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NuxtLink } from '#components';
import type { TableProps } from 'ant-design-vue';

interface DataItem {
  key: string;
  no: number;
  nameholder: string;
  customerId: string;
  gender: string;
  phone: string;
  nationalId: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  signDate: string;
  state: string;
}

const columns: TableProps['columns'] = [
  {
    title: 'No.',
    dataIndex: 'no',
    align: 'center',
    width: '5%',
  },
  {
    title: 'Nameholder',
    dataIndex: 'nameholder',
    align: 'center',
    width: '15%',
  },
  {
    title: 'Customer Id',
    dataIndex: 'customerId',
    align: 'center',
    width: '15%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    align: 'center',
    width: '10%',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    align: 'center',
    width: '10%',
  },
  {
    title: 'National ID',
    dataIndex: 'nationalId',
    align: 'center',
    width: '10%',
  },
  {
    title: 'Contract number',
    dataIndex: 'contractNumber',
    align: 'center',
    width: '15%',
  },
  {
    title: 'Start date',
    dataIndex: 'startDate',
    align: 'center',
    filters: [
      { text: 'First Quarter 2024', value: '01/01/2024-03/31/2024' },
      { text: 'Second Quarter 2024', value: '04/01/2024-06/30/2024' },
      { text: 'Third Quarter 2024', value: '07/01/2024-09/30/2024' },
      { text: 'Fourth Quarter 2024', value: '10/01/2024-12/31/2024' },
    ],
    onFilter: (value, record) => {
      const [start, end] = value.split('-');
      const recordDate = new Date(record.startDate);
      return recordDate >= new Date(start) && recordDate <= new Date(end);
    },
    width: '15%',
  },
  {
    title: 'End date',
    dataIndex: 'endDate',
    align: 'center',
    filters: [
      { text: 'First Quarter 2024', value: '01/01/2024-03/31/2024' },
      { text: 'Second Quarter 2024', value: '04/01/2024-06/30/2024' },
      { text: 'Third Quarter 2024', value: '07/01/2024-09/30/2024' },
      { text: 'Fourth Quarter 2024', value: '10/01/2024-12/31/2024' },
    ],
    onFilter: (value, record) => {
      const [start, end] = value.split('-');
      const recordDate = new Date(record.endDate);
      return recordDate >= new Date(start) && recordDate <= new Date(end);
    },
    width: '15%',
  },
  {
    title: 'Sign date',
    dataIndex: 'signDate',
    align: 'center',
    width: '15%',
  },
  {
    title: 'State',
    dataIndex: 'state',
    align: 'center',
    filters: [
      { text: 'In Effect', value: 'In Effect' },
      { text: 'End Effect', value: 'End Effect' },
      { text: 'Cancel', value: 'Cancel' },
      { text: 'Unsign', value: 'Unsign' },
      { text: 'Not in Effect', value: 'Not in Effect' },
    ],
    onFilter: (value, record) => record.state === value,
    width: '15%',
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    align: 'center',
    width: '10%',
  },
];

const data: DataItem[] = [];
const genders = ['Male', 'Female'];
const states = ['In Effect', 'End Effect', 'Cancel', 'Unsign', 'Not in Effect'];

function getRandomDate(start: Date, end: Date) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

for (let i = 1; i <= 100; i++) {
  const startDate = getRandomDate(new Date('2024-01-01'), new Date('2024-12-31'));
  const endDate = getRandomDate(new Date(startDate), new Date('2025-12-31'));
  data.push({
    key: i.toString(),
    no: i,
    nameholder: `Nameholder ${i}`,
    customerId: 'XXXX-XXXX-XXXX-XXXX',
    gender: genders[Math.floor(Math.random() * genders.length)],
    phone: `12345678${i.toString().padStart(2, '0')}`,
    nationalId: `12345678${i.toString().padStart(2, '0')}`,
    contractNumber: 'XXXX-XXXX-XXXX-XXXX',
    startDate: startDate,
    endDate: endDate,
    signDate: getRandomDate(new Date('2024-01-01'), new Date('2024-12-31')),
    state: states[Math.floor(Math.random() * states.length)],
  });
}

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    console.log(selected, selectedRows, changeRows);
  },
});

</script>

<style scoped>
.detail{
  color: deepskyblue !important;
}
.delete{
  color: red !important;
}
.detail:hover {
  cursor: pointer;
  color: #B9EDFE !important;
}

.delete:hover {
  cursor: pointer;
  color: #E19495 !important;
}
</style>