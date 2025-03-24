<template>
  <div class="flex flex-col w-full">
    <a-input-search
      v-model:value="searchValue"
      class="w-[500px] mx-auto my-3"
      :placeholder="$t('enter_search')"
      enter-button
      @search="searchEmployee"
    />
    <a-table :columns="columns" class="mt-5" :data-source="data"> </a-table>
  </div>
</template>

<script lang="ts" setup>
import type { ManagerSchedule } from '~/types/user';
import { getUserName, convertToDate } from '#build/imports';
import type { NullTime } from '~/types/basic_model';
import { removeDiacritics } from '~/utils/diacritics';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const props = defineProps({
  schedules: {
    required: true,
    type: Array as PropType<ManagerSchedule[]>,
  },
});
const searchValue = ref('');
const columns = computed<any>(() => {
  const cols = [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: t('employee_number'),
      dataIndex: 'employee_number',
      key: 'employee_number',
    },
    {
      title: t('employee_name'),
      dataIndex: 'employee_name',
      key: 'employee_name',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
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
  ];
  return cols;
});
const data = ref<any[]>([]);

// ---------------------- Functions ----------------------
function searchEmployee() {
  const result: {
    key: number;
    no: number;
    employee_number: string;
    employee_name: string;
    email: string;
    phone: string;
    startDate: string;
    endDate: string;
  }[] = [];
  props.schedules.forEach((schedule, index) => {
    result.push({
      key: index,
      no: index + 1,
      employee_number: schedule.manager.no,
      employee_name: getUserName(schedule.manager),
      email: schedule.manager.email,
      phone: schedule.manager.phone,
      startDate: convertToDate(schedule.startDate as string),
      endDate: (schedule.endDate as NullTime).Valid ? convertToDate((schedule.endDate as NullTime).Time!) : '-',
    });
  });
  data.value = result.filter((user) => {
    const search = removeDiacritics(searchValue.value.trim()).toLowerCase();
    return (
      removeDiacritics(user.employee_name.toLowerCase()).includes(search) ||
      user.employee_number.includes(search) ||
      user.phone.includes(search) ||
      user.email.includes(search)
    );
  });
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  const result: any = [];
  props.schedules.forEach((schedule, index) => {
    result.push({
      key: index,
      no: index + 1,
      employee_number: schedule.manager.no,
      employee_name: getUserName(schedule.manager),
      email: schedule.manager.email,
      phone: schedule.manager.phone,
      startDate: convertToDate(schedule.startDate as string),
      endDate: (schedule.endDate as NullTime).Valid ? convertToDate((schedule.endDate as NullTime).Time!) : '-',
    });
  });
  data.value = result;
});
</script>
