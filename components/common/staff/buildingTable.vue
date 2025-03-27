<template>
  <a-table :columns="columns" :data-source="data" class="mt-3"> </a-table>
</template>

<script lang="ts" setup>
import type { ManagerSchedule } from '~/types/user';

// ---------------------- Variables ----------------------
const props = defineProps({
  schedules: {
    type: Object as PropType<ManagerSchedule[]>,
    required: true,
  },
});
const { t } = useI18n();
const columns = computed(() => [
  {
    title: t('no'),
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: t('building_managing'),
    dataIndex: 'building_managing',
    key: 'building_managing',
  },
  {
    title: t('startDate'),
    dataIndex: 'startDate',
    key: 'startDate',
    sorter: (a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    sortDirections: ['ascend', 'descend'],
    class: 'select-none',
  },
  {
    title: t('endDate'),
    dataIndex: 'endDate',
    key: 'endDate',
    sorter: (a: any, b: any) =>
      new Date(a.endDate !== '-' ? a.endDate : '2100-01-01').getTime() -
      new Date(b.endDate !== '-' ? b.endDate : '2100-01-01').getTime(),
    sortDirections: ['ascend', 'descend'],
    class: 'select-none',
  },
]);

const data = computed(() =>
  props.schedules.map((schedule, index) => ({
    no: index + 1,
    building_managing: schedule.building.name,
    startDate: convertToDate(schedule.startDate),
    endDate: schedule.endDate.Valid ? convertToDate(schedule.endDate.Time!) : '-',
  }))
);
</script>
