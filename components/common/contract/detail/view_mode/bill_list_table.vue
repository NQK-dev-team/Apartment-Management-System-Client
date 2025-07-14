<template>
  <ClientOnly>
    <a-table
      v-if="userRole?.toString() === roles.owner || userRole?.toString() === roles.manager"
      :row-selection="{
        selectedRowKeys: deleteBucket.value,
        onChange: (selectedRowKeys: any) => {
          deleteBucket.value = selectedRowKeys;
        },
        getCheckboxProps: (record: any) => ({
          disabled:
            record.status_numeric === COMMON.BILL_STATUS.PAID ||
            record.status_numeric === COMMON.BILL_STATUS.PROCESSING,
        }),
      }"
      :data-source="data"
      :columns="columns"
      class="mt-5"
      :scroll="{ x: 'max-content' }"
    >
      <template #bodyCell="{ column, value, record }">
        <template v-if="column.dataIndex === 'action'">
          <NuxtLink
            :to="pageRoutes.common.bill.detail(value)"
            target="_blank"
            class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
            >{{ $t('detail') }}</NuxtLink
          >
        </template>
        <template v-if="column.dataIndex === 'customer_no'">
          <span>
            {{ value }}
            <NuxtLink
              v-if="record.payerID"
              :to="pageRoutes.common.customer.detail(record.payerID)"
              target="_blank"
              class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
              ><LinkOutlined
            /></NuxtLink>
          </span>
        </template>
        <template v-if="column.dataIndex === 'status'">
          <span
            :class="[
              record.status_numeric === COMMON.BILL_STATUS.UN_PAID
                ? 'text-[#888888]'
                : record.status_numeric === COMMON.BILL_STATUS.PAID
                  ? 'text-[#50c433]'
                  : record.status_numeric === COMMON.BILL_STATUS.PROCESSING
                    ? 'text-[#d8d535]'
                    : record.status_numeric === COMMON.BILL_STATUS.OVERDUE
                      ? 'text-[#ff0000]'
                      : '',
            ]"
          >
            {{ value }}
          </span>
        </template>
      </template>
      <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div class="p-[8px]">
          <a-date-picker
            v-if="column.dataIndex === 'payment_period'"
            ref="searchInput"
            class="block width-[200px] mb-[8px]"
            :value="selectedKeys[0]"
            picker="month"
            @change="(e) => setSelectedKeys(e ? [e] : [])"
            @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-input
            v-else
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
        <CalendarOutlined
          v-if="column.dataIndex === 'payment_period'"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <SearchOutlined
          v-else-if="
            column.dataIndex === 'bill_no' ||
            column.dataIndex === 'customer_no' ||
            column.dataIndex === 'paid_by' ||
            column.dataIndex === 'bill_name'
          "
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <FilterFilled v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
    </a-table>
    <a-table v-else :data-source="data" :columns="columns" class="mt-5" :scroll="{ x: 'max-content' }">
      <template #bodyCell="{ column, value, record }">
        <template v-if="column.dataIndex === 'action'">
          <NuxtLink
            :to="pageRoutes.common.bill.detail(value)"
            target="_blank"
            class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
            >{{ $t('detail') }}</NuxtLink
          >
        </template>
        <template v-if="column.dataIndex === 'customer_no'">
          <span>
            {{ value }}
            <NuxtLink
              v-if="record.payerID"
              :to="pageRoutes.common.customer.detail(record.payerID)"
              target="_blank"
              class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
              ><LinkOutlined
            /></NuxtLink>
          </span>
        </template>
        <template v-if="column.dataIndex === 'status'">
          <span
            :class="[
              record.status_numeric === COMMON.BILL_STATUS.UN_PAID
                ? 'text-[#888888]'
                : record.status_numeric === COMMON.BILL_STATUS.PAID
                  ? 'text-[#50c433]'
                  : record.status_numeric === COMMON.BILL_STATUS.PROCESSING
                    ? 'text-[#d8d535]'
                    : record.status_numeric === COMMON.BILL_STATUS.OVERDUE
                      ? 'text-[#ff0000]'
                      : '',
            ]"
          >
            {{ value }}
          </span>
        </template>
      </template>
      <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div class="p-[8px]">
          <a-date-picker
            v-if="column.dataIndex === 'payment_period'"
            ref="searchInput"
            class="block width-[200px] mb-[8px]"
            :value="selectedKeys[0]"
            picker="month"
            @change="(e) => setSelectedKeys(e ? [e] : [])"
            @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-input
            v-else
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
        <CalendarOutlined
          v-if="column.dataIndex === 'payment_period'"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <FilterFilled v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
    </a-table>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import type { Bill } from '~/types/bill';
import type { Dayjs } from 'dayjs';
import { roles } from '~/consts/roles';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const props = defineProps({
  bills: {
    type: Array as () => Bill[],
    required: true,
  },
  deleteBillBucket: {
    type: Object as () => { value: number[] },
    required: true,
  },
});
const searchInput = ref();
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const deleteBucket = toRef(props, 'deleteBillBucket');
const columns: any = computed(() => {
  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap w-[75px]',
    },
    {
      title: t('bill_no'),
      dataIndex: 'bill_no',
      key: 'bill_no',
      class: 'text-nowrap',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.bill_no.toString().toLowerCase().includes(val.trim().toLowerCase()));
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
      title: t('bill_name'),
      dataIndex: 'bill_name',
      key: 'bill_name',
      class: 'text-nowrap',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) =>
          removeDiacritics(record.bill_name.toString().toLowerCase()).includes(
            removeDiacritics(val.trim().toLowerCase())
          )
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
      title: t('paid_by'),
      dataIndex: 'paid_by',
      key: 'paid_by',
      class: 'text-nowrap',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) =>
          removeDiacritics(record.paid_by.toString().toLowerCase()).includes(removeDiacritics(val.trim().toLowerCase()))
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
      title: t('payment_period'),
      dataIndex: 'payment_period',
      key: 'payment_period',
      class: 'text-nowrap',
      customFilterDropdown: true,
      onFilter: (value: Dayjs, record: any) => {
        return record.payment_period.toString().toLowerCase() === convertToMonthYear(value.toDate().toISOString());
      },
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
      sorter: (a: any, b: any) => new Date(a.payment_period).getTime() - new Date(b.payment_period).getTime(),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('total_payment'),
      dataIndex: 'total_payment',
      key: 'total_payment',
      class: 'text-nowrap',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      class: 'text-nowrap',
      customFilterDropdown: false,
      filterMultiple: true,
      filters: [
        { text: t('unpaid'), value: COMMON.BILL_STATUS.UN_PAID },
        { text: t('paid'), value: COMMON.BILL_STATUS.PAID },
        { text: t('overdue'), value: COMMON.BILL_STATUS.OVERDUE },
        { text: t('processing'), value: COMMON.BILL_STATUS.PROCESSING },
      ],
      onFilter: (value: number, record: any) => record.status_numeric === value,
    },
    {
      title: t('paid_by'),
      dataIndex: 'paid_by',
      key: 'paid_by',
      class: 'text-nowrap',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.paid_by.toString().toLowerCase().includes(val.trim().toLowerCase()));
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
      dataIndex: 'customer_no',
      key: 'customer_no',
      class: 'text-nowrap',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.customer_no.toString().toLowerCase().includes(val.trim().toLowerCase()));
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
      title: t('payment_time'),
      dataIndex: 'payment_time',
      key: 'payment_time',
      class: 'text-nowrap',
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      class: 'text-nowrap w-[75px]',
    },
  ];
});
const data = computed(() => {
  const bills = JSON.parse(JSON.stringify(props.bills));
  bills.sort((a: Bill, b: Bill) => {
    return new Date(convertToMonthYear(b.period)).getTime() - new Date(convertToMonthYear(a.period)).getTime();
  });

  return bills
    .sort((a: Bill, b: Bill) => {
      return new Date(convertToMonthYear(b.period)).getTime() - new Date(convertToMonthYear(a.period)).getTime();
    })
    .map((bill: Bill, index: number) => ({
      no: index + 1,
      bill_no: bill.ID,
      bill_name: bill.title,
      total_payment: formatPrice(bill.amount),
      payment_period: convertToMonthYear(bill.period),
      payment_time: bill.paymentTime.Valid && bill.paymentTime.Time ? convertToDateTime(bill.paymentTime.Time) : '-',
      paid_by: bill.paymentTime.Valid && bill.paymentTime.Time ? getUserName(bill.payer) : '-',
      customer_no: bill.paymentTime.Valid && bill.paymentTime.Time ? bill.payer.no : '-',
      action: bill.ID,
      payerID: bill.paymentTime.Valid && bill.paymentTime.Time ? bill.payer.ID : null,
      key: bill.ID,
      status: t(getBillStatus(bill.status)),
      status_numeric: bill.status,
    }));
});
const userRole = useCookie('userRole');

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
