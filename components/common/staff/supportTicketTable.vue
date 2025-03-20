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
            <AlignLeftOutlined class="detail"/>
            <CheckCircleOutlined class="approve ms-2"/>
            <CloseCircleOutlined class="deny ms-2"/>
          </span>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'state'">
        <a-tag :class="{
          'text-green-500': text.includes('Approved'),
          'text-red-500': text.includes('Denied')
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
  ticketId: string;
  contractId: string;
  customer: string;
  creationDate: string;
  state: string;
  managerApproving: string;
  ownerApproving: string;
}

const columns: TableProps['columns'] = [
  {
    title: 'No.',
    dataIndex: 'no',
    align: 'center',
    width: '5%',
  },
  {
    title: 'Ticket ID',
    dataIndex: 'ticketId',
    align: 'center',
    width: '15%',
  },
  {
    title: 'Contract ID',
    dataIndex: 'contractId',
    align: 'center',
    width: '15%',
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    align: 'center',
    width: '15%',
  },
  {
    title: 'Creation date',
    dataIndex: 'creationDate',
    align: 'center',
    filters: [
      { text: 'First Quarter 2024', value: '01/01/2024-03/31/2024' },
      { text: 'Second Quarter 2024', value: '04/01/2024-06/30/2024' },
      { text: 'Third Quarter 2024', value: '07/01/2024-09/30/2024' },
      { text: 'Fourth Quarter 2024', value: '10/01/2024-12/31/2024' },
    ],
    onFilter: (value, record) => {
      const [start, end] = value.split('-');
      const recordDate = new Date(record.creationDate);
      return recordDate >= new Date(start) && recordDate <= new Date(end);
    },
    width: '15%',
  },
  {
    title: 'State',
    dataIndex: 'state',
    align: 'center',
    filters: [
      { text: 'Owner Approved', value: 'Owner Approved' },
      { text: 'Owner Denied', value: 'Owner Denied' },
      { text: 'Manager Approved', value: 'Manager Approved' },
      { text: 'Manager Denied', value: 'Manager Denied' },
    ],
    onFilter: (value, record) => record.state === value,
    width: '15%',
  },
  {
    title: 'Manager Approving',
    dataIndex: 'managerApproving',
    align: 'center',
    width: '15%',
  },
  {
    title: 'Owner Approving',
    dataIndex: 'ownerApproving',
    align: 'center',
    width: '15%',
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    align: 'center',
    width: '15%',
  },
];

const data: DataItem[] = [];
const customers = ['Customer A', 'Customer B', 'Customer C'];
const states = ['Owner Approved', 'Owner Denied', 'Manager Approved', 'Manager Denied'];
const managers = ['Manager A', 'Manager B', 'Manager C'];
const owners = ['Owner A', 'Owner B', 'Owner C'];

function getRandomDate(start: Date, end: Date) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

for (let i = 1; i <= 100; i++) {
  const creationDate = getRandomDate(new Date('2024-01-01'), new Date('2024-12-31'));
  data.push({
    key: i.toString(),
    no: i,
    ticketId: 'XXXX-XXXX-XXXX-XXXX',
    contractId: 'XXXX-XXXX-XXXX-XXXX',
    customer: customers[Math.floor(Math.random() * customers.length)],
    creationDate: creationDate,
    state: states[Math.floor(Math.random() * states.length)],
    managerApproving: managers[Math.floor(Math.random() * managers.length)],
    ownerApproving: owners[Math.floor(Math.random() * owners.length)],
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
.detail:hover {
  cursor: pointer;
  color: #838485 !important;
}
.approve {
  color: green !important;
}
.approve:hover {
  cursor: pointer;
  color: #90EE90 !important;
}
.deny {
  color: red !important;
}
.deny:hover {
  cursor: pointer;
  color: #FF7F7F !important;
}
.ant-table-filter-dropdown {
  .ant-dropdown-menu-item {
    &.ant-dropdown-menu-item-selected {
      background-color: #f0f0f0 !important;
    }
    &.text-green-500 {
      color: #38a169 !important;
    }
    &.text-red-500 {
      color: #e53e3e !important;
    }
  }
}
</style>