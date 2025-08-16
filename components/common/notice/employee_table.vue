<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :row-selection="{
      selectedRowKeys: notificationData.receivers,
      onChange: (selectedRowKeys: any) => {
        notificationData.receivers = selectedRowKeys;
      },
    }"
    class="mt-3"
    :scroll="{ x: 'max-content' }"
  >
    <template #bodyCell="{ value, column }">
      <template v-if="column.key === 'action'">
        <NuxtLink
          :to="pageRoutes.common.staff.detail(value)"
          class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
          target="_blank"
        >
          {{ $t('detail') }}
        </NuxtLink>
      </template>
      <template v-if="column.key === 'old_ssn'">
        {{ value || '-' }}
      </template>
      <template v-if="column.key === 'gender'">
        {{ $t(getUserGender(undefined, value)) }}
      </template>
    </template>
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div class="p-[8px]">
        <a-input
          ref="searchInput"
          :placeholder="t('enter_search')"
          :value="selectedKeys[0]"
          class="block width-[200px] mb-[8px]"
          @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <div class="flex items-center">
          <a-button
            size="small"
            class="w-[90px] h-[25px] inline-flex items-center justify-center"
            @click="handleReset(clearFilters)"
            >{{ t('clear') }}</a-button
          >
          <a-button
            type="primary"
            size="small"
            class="inline-flex items-center justify-center w-[100px] h-[25px] ms-[8px]"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon>
              <SearchOutlined />
            </template>
            {{ t('search') }}
          </a-button>
        </div>
      </div>
    </template>
    <template #customFilterIcon="{ filtered, column }">
      <SearchOutlined
        v-if="
          column.dataIndex === 'name' ||
          column.dataIndex === 'employeeNumber' ||
          column.dataIndex === 'ssn' ||
          column.dataIndex === 'old_ssn' ||
          column.dataIndex === 'phone' ||
          column.dataIndex === 'email'
        "
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <FilterFilled v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import type { User } from '~/types/user';

// ---------------------- Variables ----------------------
const props = defineProps({
  staffList: {
    type: Array as PropType<User[]>,
    required: true,
  },
  notificationData: {
    type: Object as PropType<{
      title: string;
      content: string;
      receivers: number[];
    }>,
    required: true,
  },
});
const staffList = toRef(props, 'staffList');
const notificationData = toRef(props, 'notificationData');
const { t } = useI18n();
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const searchInput = ref();
const columns = computed<any>(() => [
  {
    title: t('no'),
    dataIndex: 'no',
    key: 'no',
    class: 'text-nowrap',
  },
  {
    title: t('name'),
    dataIndex: 'name',
    key: 'name',
    class: 'text-nowrap',
    customFilterDropdown: true,
    onFilter: (value: string, record: any) => {
      const values = value.split(',');
      return values.some((val) =>
        removeDiacritics(record.name.toString().toLowerCase()).includes(val.trim().toLowerCase())
      );
    },
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: t('employee_number'),
    dataIndex: 'employeeNumber',
    key: 'employeeNumber',
    class: 'text-nowrap',
    customFilterDropdown: true,
    onFilter: (value: string, record: any) => {
      const values = value.split(',');
      return values.some((val) => record.employeeNumber.toString().toLowerCase().includes(val.trim().toLowerCase()));
    },
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: t('gender'),
    dataIndex: 'gender',
    key: 'gender',
    class: 'text-nowrap',
    filters: [
      {
        text: t(getUserGender(undefined, COMMON.USER_GENDER.MALE)),
        value: COMMON.USER_GENDER.MALE,
      },
      {
        text: t(getUserGender(undefined, COMMON.USER_GENDER.FEMALE)),
        value: COMMON.USER_GENDER.FEMALE,
      },
      {
        text: t(getUserGender(undefined, COMMON.USER_GENDER.OTHER)),
        value: COMMON.USER_GENDER.OTHER,
      },
    ],
    onFilter: (value: any, record: any) => record.gender === value,
  },
  {
    title: t('dob'),
    dataIndex: 'dob',
    key: 'dob',
    class: 'text-nowrap',
  },
  {
    title: t('ssn'),
    dataIndex: 'ssn',
    key: 'ssn',
    class: 'text-nowrap',
    customFilterDropdown: true,
    onFilter: (value: string, record: any) => {
      const values = value.split(',');
      return values.some((val) => record.ssn.toString().toLowerCase().includes(val.trim().toLowerCase()));
    },
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: t('old_ssn'),
    dataIndex: 'old_ssn',
    key: 'old_ssn',
    class: 'text-nowrap',
    customFilterDropdown: true,
    onFilter: (value: string, record: any) => {
      const values = value.split(',');
      return values.some((val) => record.old_ssn.toString().toLowerCase().includes(val.trim().toLowerCase()));
    },
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: t('phone'),
    dataIndex: 'phone',
    key: 'phone',
    class: 'text-nowrap',
    customFilterDropdown: true,
    onFilter: (value: string, record: any) => {
      const values = value.split(',');
      return values.some((val) => record.phone.toString().toLowerCase().includes(val.trim().toLowerCase()));
    },
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: t('email'),
    dataIndex: 'email',
    key: 'email',
    class: 'text-nowrap',
    customFilterDropdown: true,
    onFilter: (value: string, record: any) => {
      const values = value.split(',');
      return values.some((val) => record.email.toString().toLowerCase().includes(val.trim().toLowerCase()));
    },
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: t('action'),
    dataIndex: 'action',
    key: 'action',
    class: 'text-nowrap',
  },
]);
const data = computed<
  {
    no: number;
    name: string;
    employeeNumber: string;
    gender: number;
    dob: string;
    ssn: string;
    old_ssn: string;
    phone: string;
    email: string;
    key: number;
    action: number;
  }[]
>(() =>
  staffList.value.map((staff, index) => ({
    no: index + 1,
    name: getUserName(staff),
    employeeNumber: staff.no,
    gender: staff.gender,
    dob: convertToDate(staff.dob),
    ssn: staff.ssn,
    old_ssn: staff.oldSSN.String || '',
    phone: staff.phone,
    email: staff.email,
    key: staff.ID,
    action: staff.ID,
  }))
);

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
