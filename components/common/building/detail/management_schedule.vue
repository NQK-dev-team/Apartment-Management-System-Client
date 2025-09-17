<template>
  <div class="flex-col w-full" style="display: flex">
    <a-input-search
      id="search_manager_schedule"
      v-model:value="searchValue"
      class="w-[500px] mx-auto my-3"
      :placeholder="$t('enter_search')"
      enter-button
      @search="searchEmployee"
    />
    <a-table :columns="columns" class="mt-5" :data-source="data" :scroll="{ x: 'max-content' }">
      <template #bodyCell="{ value, column, record }">
        <template v-if="column.key === 'employee_number'">
          <span
            >{{ value }}
            <NuxtLink
              :id="`manager_${record.no}_detail_link`"
              :name="`manager_${record.no}_detail_link`"
              :to="pageRoutes.common.staff.detail(record.ID)"
              class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
              target="_blank"
            >
              <LinkOutlined /> </NuxtLink
          ></span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import type { ManagerSchedule } from '~/types/user';
import { getUserName, convertToDate } from '#build/imports';
import type { NullTime } from '~/types/basic_model';
import { removeDiacritics } from '~/utils/diacritics';
import { pageRoutes } from '~/consts/page_routes';

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
      class: 'text-nowrap',
    },
    {
      title: t('employee_number'),
      dataIndex: 'employee_number',
      key: 'employee_number',
      class: 'text-nowrap',
    },
    {
      title: t('employee_name'),
      dataIndex: 'employee_name',
      key: 'employee_name',
      class: 'text-nowrap',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      class: 'text-nowrap',
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
      class: 'text-nowrap',
    },
    {
      title: t('startDate'),
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      sortDirections: ['ascend', 'descend'],
      class: 'select-none text-nowrap',
    },
    {
      title: t('endDate'),
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a: any, b: any) =>
        new Date(a.endDate !== '-' ? a.endDate : '2100-01-01').getTime() -
        new Date(b.endDate !== '-' ? b.endDate : '2100-01-01').getTime(),
      sortDirections: ['ascend', 'descend'],
      class: 'select-none text-nowrap',
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
    ID: number;
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
      endDate: (schedule.endDate as NullTime).Valid
        ? convertToDate((schedule.endDate as NullTime).Time! as string)
        : '-',
      ID: schedule.manager.ID,
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
      endDate: (schedule.endDate as NullTime).Valid
        ? convertToDate((schedule.endDate as NullTime).Time! as string)
        : '-',
      ID: schedule.manager.ID,
    });
  });
  data.value = result;
});
</script>
