<template>
  <a-table :columns="columns" :data-source="data" bordered class="mt-2">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex && column.dataIndex !== 'operation' && column.dataIndex !== 'state'">
        <div>
          {{ text }}
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div>
          <span>
            <AlignLeftOutlined id="support-ticket-detail-icon" class="detail" @click="showModal"/>
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
  <supportTicketDetail v-model:open="modalOpen" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NuxtLink } from '#components';
import type { TableProps } from 'ant-design-vue';
import { computed } from 'vue';
import { AlignLeftOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import supportTicketDetail from '@/components/modal/supportTicketDetail.vue';
const { t } = useI18n();

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

const columns = computed(() => [
  {
    title: t('no'),
    align: 'center',
    dataIndex: 'no',
    width: '5%',
  },
  {
    title: t('ticket_id'),
    align: 'center',
    dataIndex: 'ticketId',
    width: '10%',
  },
  {
    title: t('building'),
    align: 'center',
    dataIndex: 'building',
    filters: [
      { text: 'A1', value: 'A1' },
      { text: 'A2', value: 'A2' },
      { text: 'A3', value: 'A3' },
      { text: 'B1', value: 'B1' },
      { text: 'B2', value: 'B2' },
      { text: 'B3', value: 'B3' },
    ],
    onFilter: (value, record) => record.building === value,
    width: '5%',
  },
  {
    title: t('floor'),
    align: 'center',
    dataIndex: 'floor',
    filters: [
      { text: 'G', value: 'G' },
      { text: 'F1', value: 'F1' },
      { text: 'F2', value: 'F2' },
      { text: 'F3', value: 'F3' },
      { text: 'F4', value: 'F4' },
      { text: 'F5', value: 'F5' },
      { text: 'F6', value: 'F6' },
      { text: 'F7', value: 'F7' },
      { text: 'F8', value: 'F8' },
      { text: 'F9', value: 'F9' },
      { text: 'F10', value: 'F10' },
    ],
    onFilter: (value, record) => record.floor === value,
    width: '5%',
  },
  {
    title: t('room_no'),
    align: 'center',
    dataIndex: 'roomId',
    width: '5%',
  },
  {
    title: t('contract_id'),
    align: 'center',
    dataIndex: 'contractId',
    width: '10%',
  },
  {
    title: t('customer'),
    align: 'center',
    dataIndex: 'customer',
    width: '8%',
  },
  {
    title: t('creation_date'),
    align: 'center',
    dataIndex: 'creationDate',
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
    width: '10%',
  },
  {
    title: t('status'),
    align: 'center',
    dataIndex: 'state',
    filters: [
      { text: 'Owner Approved', value: 'Owner Approved' },
      { text: 'Owner Denied', value: 'Owner Denied' },
      { text: 'Manager Approved', value: 'Manager Approved' },
      { text: 'Manager Denied', value: 'Manager Denied' },
    ],
    onFilter: (value, record) => record.state === value,
    width: '10%',
  },
  {
    title: t('manager_approving'),
    align: 'center',
    dataIndex: 'managerApproving',
    width: '10%',
  },
  {
    title: t('owner_approving'),
    align: 'center',
    dataIndex: 'ownerApproving',
    width: '10%',
  },
  {
    title: t('operation'),
    align: 'center',
    dataIndex: 'operation',
    width: '20%',
  },
]);

const data: DataItem[] = [];
const customers = ['Customer A', 'Customer B', 'Customer C'];
const states = ['Owner Approved', 'Owner Denied', 'Manager Approved', 'Manager Denied'];
const managers = ['Manager A', 'Manager B', 'Manager C'];
const owners = ['Owner A', 'Owner B', 'Owner C'];
const buildings = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'];
const floors = ['G', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'];

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
    building: buildings[Math.floor(Math.random() * buildings.length)],
    floor: floors[Math.floor(Math.random() * floors.length)],
    roomId: (Math.floor(Math.random() * 100) + 1).toString(),
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
const modalOpen = ref(false);

const showModal = () => {
  modalOpen.value = true;
};

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