<template>
  <a-table :columns="columns" :data-source="data" :row-selection="rowSelection" bordered class="mt-2">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex && column.dataIndex !== 'operation'">
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
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NuxtLink } from '#components';
import type { TableProps } from 'ant-design-vue';
import { computed } from 'vue';
const { t } = useI18n();

interface DataItem {
  key: string;
  no: number;
  buildingManaging: string;
  beginDate: string;
  endDate: string;
}

const columns = computed(() => [
  {
    title: t('no'),
    align: 'center',
    dataIndex: 'no',
    width: '5%',
  },
  {
    title: t('building_managing'),
    align: 'center',
    dataIndex: 'buildingManaging',
    width: '30%',
  },
  {
    title: t('startDate'),
    align: 'center',
    dataIndex: 'beginDate',
    filters: [
      { text: 'First Quarter 2024', value: '01/01/2024-03/31/2024' },
      { text: 'Second Quarter 2024', value: '04/01/2024-06/30/2024' },
      { text: 'Third Quarter 2024', value: '07/01/2024-09/30/2024' },
      { text: 'Fourth Quarter 2024', value: '10/01/2024-12/31/2024' },
    ],
    onFilter: (value, record) => {
      const [start, end] = value.split('-');
      const recordDate = new Date(record.beginDate);
      return recordDate >= new Date(start) && recordDate <= new Date(end);
    },
    width: '25%',
  },
  {
    title: t('endDate'),
    align: 'center',
    dataIndex: 'endDate',
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
    width: '25%',
  },
  {
    title: t('operation'),
    align: 'center',
    dataIndex: 'operation',
    width: '10%',
  },
]);

const data: DataItem[] = [];
const buildings = ['A1', 'A2', 'A3'];

function getRandomDate(start: Date, end: Date) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

for (let i = 1; i <= 100; i++) {
  const beginDate = getRandomDate(new Date('2024-01-01'), new Date('2024-12-31'));
  const endDate = getRandomDate(new Date(beginDate), new Date('2025-12-31'));
  data.push({
    key: i.toString(),
    no: i,
    buildingManaging: buildings[Math.floor(Math.random() * buildings.length)],
    beginDate: beginDate,
    endDate: endDate,
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
.detail {
  color: deepskyblue !important;
}
.detail:hover {
  cursor: pointer;
  color: #B9EDFE !important;
}
.delete {
  color: red !important;
}
.delete:hover {
  cursor: pointer;
  color: #E19495 !important;
}
</style>