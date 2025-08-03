<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('bill_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('bill_list') }}</h1>
      <div class="flex justify-between items-center mt-3">
        <a-range-picker v-model:value="timeRange" :disabled-date="disabledDate" picker="month" />
        <div class="flex justify-end items-center">
          <a-button
            type="primary"
            danger
            :disabled="!deleteBucket.length"
            class="rounded-sm me-2"
            @click="
              () => {
                $event.emit('deleteItem', { callback: deleteBills });
              }
            "
          >
            <img :src="svgPaths.delete" alt="Delete bill" class="w-[12px] h-[12px]" />
          </a-button>
          <NuxtLink :to="pageRoutes.common.bill.add">
            <a-button type="primary" class="rounded-sm">
              <img :src="svgPaths.plus" alt="Add bill" class="w-[12px] h-[12px]" />
            </a-button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <a-table
        :row-selection="{
          selectedRowKeys: deleteBucket,
          onChange: (selectedRowKeys: any) => {
            deleteBucket = selectedRowKeys;
          },
          getCheckboxProps: (record: any) => ({
            disabled:
              record.status_numeric === COMMON.BILL_STATUS.PAID ||
              record.status_numeric === COMMON.BILL_STATUS.PROCESSING ||
              record.status_numeric === COMMON.BILL_STATUS.CANCELLED,
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
                      : record.status_numeric === COMMON.BILL_STATUS.OVERDUE ||
                          record.status_numeric === COMMON.BILL_STATUS.CANCELLED
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
              column.dataIndex === 'room_no' ||
              column.dataIndex === 'bill_name'
            "
            :style="{ color: filtered ? '#108ee9' : undefined }"
          />
          <FilterFilled v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { svgPaths } from '~/consts/svg_paths';
import { roles } from '~/consts/roles';
import { pageRoutes } from '~/consts/page_routes';
import { COMMON } from '~/consts/common';
import type { Dayjs } from 'dayjs';
import type { Bill } from '~/types/bill';

// ---------------------- Metadata ----------------------
useHead({
  title: 'Billing List',
  meta: [
    {
      name: 'description',
      content: 'List of billing payments in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const { $event, $dayjs } = useNuxtApp();
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const userRole = useCookie('userRole');
const deleteBucket = ref<number[]>([]);
const timeRange = ref<[Dayjs, Dayjs]>([$dayjs().startOf('quarter'), $dayjs()]);
const searchInput = ref();
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const offset = ref(0);
const limit = ref(500);
const billList = ref<Bill[]>([]);
const columns: any = computed(() => {
  const buildings = [...new Set(billList.value.map((bill) => bill.buildingName || ''))];
  const floors = [...new Set(billList.value.map((bill) => bill.roomFloor || 0))];
  buildings.sort((a, b) => removeDiacritics(a).toLowerCase().localeCompare(removeDiacritics(b).toLowerCase()));
  floors.sort((a, b) => a - b);

  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap w-[75px]',
    },
    {
      title: t('building'),
      dataIndex: 'building',
      key: 'building',
      class: 'text-nowrap',
      filters: buildings.map((building: string) => ({
        text: building,
        value: building,
      })),
      onFilter: (value: any, record: any) => record.building === value,
    },
    {
      title: t('floor'),
      dataIndex: 'floor',
      key: 'floor',
      class: 'text-nowrap',
      filters: floors.map((floor: number) => ({
        text: floor.toString(),
        value: floor,
      })),
      onFilter: (value: any, record: any) => record.floor === value,
    },
    {
      title: t('room_no'),
      dataIndex: 'room_no',
      key: 'room_no',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.room_no.toString().toLowerCase().includes(val.trim().toLowerCase()));
      },
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
      class: 'text-nowrap',
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
        { text: t('cancelled'), value: COMMON.BILL_STATUS.CANCELLED },
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
  const bills = JSON.parse(JSON.stringify(billList.value));
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
      payment_time: bill.paymentTime.Valid && bill.paymentTime.Time ? convertToDateTime(bill.paymentTime.Time as string) : '-',
      paid_by: bill.paymentTime.Valid && bill.paymentTime.Time ? getUserName(bill.payer) : '-',
      customer_no: bill.paymentTime.Valid && bill.paymentTime.Time ? bill.payer.no : '-',
      action: bill.ID,
      payerID: bill.paymentTime.Valid && bill.paymentTime.Time ? bill.payer.ID : null,
      key: bill.ID,
      status: t(getBillStatus(bill.status)),
      status_numeric: bill.status,
      building: bill.buildingName || '',
      room_no: bill.roomNo,
      floor: bill.roomFloor || 0,
    }));
});

// ---------------------- Functions ----------------------
async function getBillList(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }
    const response = await api.common.bill.getList(
      limit.value,
      offset.value,
      convertToMonthYear(timeRange.value[0].toDate().toISOString()),
      convertToMonthYear(timeRange.value[1].toDate().toISOString())
    );

    if (offset.value === 0) {
      billList.value = response.data;
    } else {
      billList.value.push(...response.data);
    }

    if (response.data.length >= limit.value) {
      offset.value += limit.value;
    }
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    if (emitLoading) {
      $event.emit('loading');
    }
  }
}

async function deleteBills() {
  try {
    $event.emit('loading');
    await api.common.bill.deleteMany(deleteBucket.value);
    $event.emit('deleteItemSuccess');
    deleteBucket.value = [];

    if (offset.value > 0) {
      offset.value = 0;
    } else {
      await getBillList();
    }
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    $event.emit('loading');
  }
}

function disabledDate(current: Dayjs) {
  // Can not select days after today
  return current && current >= $dayjs().endOf('day');
}

function handleSearch(selectedKeys: any, confirm: any, dataIndex: any) {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
}

function handleReset(clearFilters: any) {
  clearFilters({ confirm: true });
  state.searchText = '';
}

// ---------------------- Lifecycles ----------------------
onBeforeMount(() => {
  if (userRole.value?.toString() !== roles.owner && userRole.value?.toString() !== roles.manager) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});

onMounted(() => {
  getBillList();
});

// ---------------------- Watchers ----------------------
watch(offset, () => {
  getBillList(false);
});

watch(timeRange, () => {
  if (offset.value > 0) {
    offset.value = 0;
  } else {
    getBillList();
  }
});
</script>
