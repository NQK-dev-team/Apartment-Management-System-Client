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
        v-if="column.dataIndex === 'start_date' || column.dataIndex === 'end_date'"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <SearchOutlined v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #bodyCell="{ value, column }">
      <template v-if="column.key === 'price'">
        {{ formatPrice(value) }}
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import type { ManagerSchedule } from '~/types/user';
import { getUserName, convertToDate } from '#build/imports';

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
      title: t('start_date'),
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: (a: any, b: any) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('end_date'),
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: (a: any, b: any) =>
        new Date(a.end_date !== '-' ? a.end_date : '2100-01-01').getTime() -
        new Date(b.end_date !== '-' ? b.end_date : '2100-01-01').getTime(),
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
      start_date: convertToDate(schedule.start_date),
      end_date: schedule.end_date.Valid ? convertToDate(schedule.end_date.Time!) : '-',
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
