<template>
  <a-table :columns="columns" :data-source="data" class="mt-2">
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
        <a-tag
        :class="{
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
import type { ManagerResolveTicket } from '~/types/support_ticket';

// ---------------------- Variables ----------------------
const props = defineProps({
  tickets: {
    type: Object as PropType<ManagerResolveTicket[]>,
    required: true,
  },
});
const { t } = useI18n();
const columns = computed(() => [
  {
    title: t('no'),
    dataIndex: 'no',
},
  {
    title: t('ticket_id'),
    dataIndex: 'ticketId',
  },
  {
    title: t('contract_id'),
    dataIndex: 'contractId',
  },
  {
    title: t('customer'),
    dataIndex: 'customer',
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
    width: '15%',
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

const data = [];
</script>