<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('support_ticket_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('support_ticket_list') }}</h1>
      <div class="flex items-center justify-between w-full mt-5">
        <a-range-picker v-model:value="timeRange" :disabled-date="disabledDate" />
        <div class="flex items-center">
          <a-button
            type="primary"
            danger
            :disabled="!deleteBucket.length"
            class="rounded-sm me-2"
            @click="
              () => {
                $event.emit('deleteItem', { callback: deleteTickets });
              }
            "
          >
            <img :src="svgPaths.delete" alt="Delete contract" class="w-[12px] h-[12px]" />
          </a-button>
          <a-button type="primary" class="rounded-sm">
            <img :src="svgPaths.plus" alt="Add contract" class="w-[12px] h-[12px]" />
          </a-button>
        </div>
      </div>
    </div>
    <!-- Page main content -->
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <a-table
        :columns="columns"
        :data-source="data"
        :row-selection="{
          selectedRowKeys: deleteBucket,
          onChange: (selectedRowKeys: any) => {
            deleteBucket = selectedRowKeys;
          },
          getCheckboxProps: (record: any) => ({
            disabled: !record.allowDelete,
          }),
        }"
        class="mt-3"
        :scroll="{ x: 'max-content' }"
      >
        <template #bodyCell="{ column, value }">
          <template v-if="column.dataIndex === 'action'">
            <InfoCircleOutlined
              class="text-lg hover:cursor-pointer hover:text-gray-400 active:text-gray-600"
              :title="$t('detail')"
              @click="openDetailModal(value)"
            />
          </template>
          <template v-if="column.dataIndex === 'status'">
            <a-tag
              :class="{
                'text-gray-500': value === COMMON.SUPPORT_TICKET_STATUS.PENDING,
                'text-green-500': value === COMMON.SUPPORT_TICKET_STATUS.APPROVED,
                'text-red-500': value === COMMON.SUPPORT_TICKET_STATUS.REJECTED,
              }"
            >
              {{
                value === COMMON.SUPPORT_TICKET_STATUS.PENDING
                  ? t('pending')
                  : value === COMMON.SUPPORT_TICKET_STATUS.APPROVED
                    ? t('approved')
                    : t('denied')
              }}
            </a-tag>
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
            v-if="column.dataIndex === 'ticket_id' || column.dataIndex === 'room_no' || column.dataIndex === 'customer'"
            :style="{ color: filtered ? '#108ee9' : undefined }"
          />
          <FilterFilled v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
        </template>
      </a-table>
      <CommonSupportTicketDetailCustomer
        :ticket-detail="ticketDetail"
        :detail-modal-visible="detailModalVisible"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import type { SupportTicket } from '~/types/support_ticket';
import dayjs, { type Dayjs } from 'dayjs';
import { roles } from '~/consts/roles';
import { COMMON } from '~/consts/common';
import { svgPaths } from '~/consts/svg_paths';

// ---------------------- Metadata ----------------------
useHead({
  title: 'Support Ticket List',
  meta: [
    {
      name: 'description',
      content: 'List of support tickets from the customers',
    },
  ],
});

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
const tickets = ref<SupportTicket[]>([]);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { t } = useI18n();
const userID = useCookie('userID');
const searchInput = ref();
const columns = computed<any[]>(() => {
  const buildings = [...new Set(tickets.value.map((ticket) => ticket.buildingName || ''))];
  const floors = [...new Set(tickets.value.map((ticket) => ticket.roomFloor || 0))];
  buildings.sort((a, b) => removeDiacritics(a).toLowerCase().localeCompare(removeDiacritics(b).toLowerCase()));
  floors.sort((a, b) => a - b);

  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap',
    },
    {
      title: t('ticket_id'),
      dataIndex: 'ticket_id',
      key: 'ticket_id',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.ticket_id.toString().toLowerCase().includes(val.trim().toLowerCase()));
      },
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
      sorter: (a: any, b: any) => a.ticket_id - b.ticket_id,
      sortDirections: ['ascend', 'descend'],
      class: 'text-nowrap',
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
      title: t('customer'),
      dataIndex: 'customer',
      key: 'customer',
      class: 'text-nowrap',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.customer.toString().toLowerCase().includes(val.trim().toLowerCase()));
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
      title: t('creation_date'),
      dataIndex: 'creation_date',
      key: 'creation_date',
      sorter: (a: any, b: any) => new Date(a.creation_date).getTime() - new Date(b.creation_date).getTime(),
      sortDirections: ['ascend', 'descend'],
      class: 'select-none text-nowrap',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      customFilterDropdown: false,
      filters: [
        { text: t('pending'), value: COMMON.SUPPORT_TICKET_STATUS.PENDING },
        { text: t('approved'), value: COMMON.SUPPORT_TICKET_STATUS.APPROVED },
        { text: t('denied'), value: COMMON.SUPPORT_TICKET_STATUS.REJECTED },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      class: 'text-nowrap',
    },
    // {
    //   title: t('manager_approving'),
    //   dataIndex: 'manager_approving',
    //   key: 'manager_approving',
    //   class: 'text-nowrap',
    // },
    // {
    //   title: t('owner_approving'),
    //   dataIndex: 'owner_approving',
    //   key: 'owner_approving',
    //   class: 'text-nowrap',
    // },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      class: 'text-nowrap',
    },
  ];
});
const data = computed(() =>
  tickets.value.map((ticket, index) => ({
    no: index + 1,
    ticket_id: ticket.ID,
    customer: getUserName(ticket.customer),
    creation_date: convertToDateTime(ticket.createdAt),
    status: ticket.status,
    manager_approving: ticket.managerID ? getUserName(ticket.manager) : '-',
    owner_approving: ticket.ownerID ? getUserName(ticket.owner) : '-',
    action: ticket.ID,
    key: ticket.ID,
    allowDelete:
      ticket.status === COMMON.SUPPORT_TICKET_STATUS.PENDING &&
      !ticket.managerID &&
      !ticket.ownerID &&
      ticket.customerID === Number(userID.value || 0),
    building: ticket.buildingName || '',
    floor: ticket.roomFloor || 0,
    room_no: ticket.roomNo || 0,
  }))
);
const ticketDetail = ref<SupportTicket | null>(null);
const detailModalVisible = ref({ value: false });
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const { $event, $dayjs } = useNuxtApp();
const now = $dayjs();
const timeRange = ref<[Dayjs, Dayjs]>([now.startOf('quarter'), now]);
const ticketApiOffset = ref<number>(0);
const ticketApiLimit = ref<number>(500);
const deleteBucket = ref<number[]>([]);

// ---------------------- Functions ----------------------
function openDetailModal(id: number) {
  const result = tickets.value.find((ticket) => ticket.ID === id) || null;
  ticketDetail.value = result ? JSON.parse(JSON.stringify(result)) : null;
  detailModalVisible.value.value = true;
}

async function getSupporTickets(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }

    const ticketResponse = await api.common.support_ticket.getList(
      ticketApiLimit.value,
      ticketApiOffset.value,
      convertToDate(timeRange.value[0].toDate().toISOString()),
      convertToDate(timeRange.value[1].toDate().toISOString())
    );

    if (ticketApiOffset.value === 0) {
      tickets.value = ticketResponse.data;
    } else {
      tickets.value.push(...ticketResponse.data);
    }

    if (ticketResponse.data.length >= ticketApiLimit.value) {
      ticketApiOffset.value += ticketApiLimit.value;
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

async function refetchSupportTickets() {
  tickets.value = [];
  if (ticketApiOffset.value > 0) {
    ticketApiOffset.value = 0;
  } else {
    try {
      const ticketResponse = await api.common.support_ticket.getList(
        ticketApiLimit.value,
        ticketApiOffset.value,
        convertToDate(timeRange.value[0].toDate().toISOString()),
        convertToDate(timeRange.value[1].toDate().toISOString())
      );
      tickets.value = ticketResponse.data;

      if (ticketResponse.data.length === ticketApiLimit.value) {
        ticketApiOffset.value += ticketApiLimit.value;
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
    }
  }
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

function disabledDate(current: Dayjs) {
  // Can not select days after today
  return current && current >= dayjs().endOf('day');
}

async function deleteTickets() {
  try {
    $event.emit('loading');
    await api.common.support_ticket.deleteMany(deleteBucket.value);
    $event.emit('deleteItemSuccess');
    deleteBucket.value = [];

    await refetchSupportTickets();
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

// ---------------------- Lifecycles ----------------------
onBeforeMount(() => {
  if (userRole.value?.toString() !== roles.customer) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});

onMounted(() => {
  getSupporTickets();
});

// ---------------------- Watchers ----------------------
watch(timeRange, async () => {
  $event.emit('loading');
  await refetchSupportTickets();
  $event.emit('loading');
});

watch(ticketApiOffset, () => {
  getSupporTickets(false);
});

// ---------------------- Events ----------------------
$event.on('refetchCustomerSupportTickets', async () => {
  $event.emit('loading');
  await refetchSupportTickets();
  $event.emit('loading');
});
</script>

<style lang="css">
.hide_delete_button .ant-upload-list-item-actions{
  display:none !important;
}
</style>
