<template>
  <a-table :columns="columns" class="mt-5" :data-source="data"
    ><template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div class="p-[8px]">
        <a-input
          ref="searchInput"
          :placeholder="t('enter_search')"
          :value="selectedKeys[0]"
          class="block width-[200px] mb-[8px]"
          @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          class="inline-flex items-center justify-center w-[100px] h-[25px] mr-[8px]"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon>
            <SearchOutlined />
          </template>
          {{ t('search') }}
        </a-button>
        <a-button
          size="small"
          class="w-[90px] h-[25px] inline-flex items-center justify-center"
          @click="handleReset(clearFilters)"
          >{{ t('clear') }}</a-button
        >
      </div>
    </template>
    <template #customFilterIcon="{ filtered, column }">
      <FilterFilled
        v-if="column.dataIndex === 'startDate' || column.dataIndex === 'endDate'"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <SearchOutlined v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import type { ManagerSchedule } from '~/types/user';
import { getUserName, convertToDate } from '#build/imports';
import type { NullTime } from '~/types/basic_model';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const props = defineProps({
  schedules: {
    required: true,
    type: Array as PropType<ManagerSchedule[]>,
  },
});
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const searchInput = ref();
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
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.employee_number.toString().toLowerCase().includes(val.trim().toLowerCase()));
      },
    },
    {
      title: t('employee_name'),
      dataIndex: 'employee_name',
      key: 'employee_name',
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) =>
          removeDiacritics(record.employee_name.toString()).toLowerCase().includes(val.trim().toLowerCase())
        );
      },
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.email.toString().toLowerCase().includes(val.trim().toLowerCase()));
      },
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.phone.toString().toLowerCase().includes(val.trim().toLowerCase()));
      },
    },
    {
      title: t('startDate'),
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('endDate'),
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a: any, b: any) =>
        new Date(a.endDate !== '-' ? a.endDate : '2100-01-01').getTime() -
        new Date(b.endDate !== '-' ? b.endDate : '2100-01-01').getTime(),
      sortDirections: ['ascend', 'descend'],
    },
  ];
  return cols;
});
const data = computed<any>(() => {
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
  return result;
});

// ---------------------- Functions ----------------------
function handleSearch(selectedKeys: any, confirm: any, dataIndex: any) {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
}

function handleReset(clearFilters: any) {
  clearFilters({ confirm: true });
  state.searchText = '';
}
</script>
