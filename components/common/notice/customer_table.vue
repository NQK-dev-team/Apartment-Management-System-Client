<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :row-selection="{
      selectedRowKeys: notificationData.customerReceivers,
      onChange: (selectedRowKeys: any) => {
        notificationData.customerReceivers = selectedRowKeys;
      },
      getCheckboxProps: (record: any) => ({
        id: `check_customer_${record.no}`,
        name: `check_customer_${record.no}`,
      }),
    }"
    class="mt-3"
    :scroll="{ x: 'max-content' }"
  >
    <template #bodyCell="{ value, column, record }">
      <template v-if="column.key === 'action'">
        <NuxtLink
          :id="`customer_${record.no}_detail_link`"
          :name="`customer_${record.no}_detail_link`"
          :to="pageRoutes.common.customer.detail(value)"
          class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
          target="_blank"
        >
          {{ $t('detail') }}
        </NuxtLink>
      </template>
      <template v-if="column.key === 'gender'">
        {{ $t(getUserGender(undefined, value)) }}
      </template>
      <template v-if="column.key === 'old_ssn'">
        {{ value || '-' }}
      </template>
    </template>
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div class="p-[8px]">
        <a-input
          :id="`${column.dataIndex}SearchInput`"
          ref="searchInput"
          :name="`${column.dataIndex}SearchInput`"
          :placeholder="t('enter_search')"
          :value="selectedKeys[0]"
          class="block width-[200px] mb-[8px]"
          @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <div class="flex items-center">
          <a-button
            :id="`${column.dataIndex}ClearButton`"
            size="small"
            :name="`${column.dataIndex}ClearButton`"
            class="w-[90px] h-[25px] inline-flex items-center justify-center"
            @click="handleReset(clearFilters)"
            >{{ t('clear') }}</a-button
          >
          <a-button
            :id="`${column.dataIndex}ApplyButton`"
            type="primary"
            :name="`${column.dataIndex}ApplyButton`"
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
          column.dataIndex === 'customerNumber' ||
          column.dataIndex === 'ssn' ||
          column.dataIndex === 'old_ssn' ||
          column.dataIndex === 'phone' ||
          column.dataIndex === 'email'
        "
        :id="`${column.dataIndex}SearchIcon`"
        :name="`${column.dataIndex}SearchIcon`"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <FilterFilled
        v-else
        :id="`${column.dataIndex}FilterIcon`"
        :name="`${column.dataIndex}FilterIcon`"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import type { User } from '~/types/user';

// ---------------------- Variables ----------------------
const props = defineProps({
  customerList: {
    type: Array as PropType<User[]>,
    required: true,
  },
  notificationData: {
    type: Object as PropType<{
      title: string;
      content: string;
      customerReceivers: number[];
      staffReceivers: number[];
    }>,
    required: true,
  },
});
const customerList = toRef(props, 'customerList');
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
    title: t('customer_no'),
    dataIndex: 'customerNumber',
    key: 'customerNumber',
    class: 'text-nowrap',
    customFilterDropdown: true,
    onFilter: (value: string, record: any) => {
      const values = value.split(',');
      return values.some((val) => record.customerNumber.toString().toLowerCase().includes(val.trim().toLowerCase()));
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
    customerNumber: string;
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
  customerList.value.map((customer, index) => ({
    no: index + 1,
    name: getUserName(customer),
    customerNumber: customer.no,
    gender: customer.gender,
    dob: convertToDate(customer.dob),
    ssn: customer.ssn,
    old_ssn: customer.oldSSN.String || '',
    phone: customer.phone,
    email: customer.email,
    key: customer.ID,
    action: customer.ID,
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
