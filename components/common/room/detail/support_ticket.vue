<template>
  <div class="flex items-center justify-between mt-3">
    <div></div>
    <h2 class="text-xl font-bold">{{ $t('support_ticket_list') }}</h2>
    <div class="flex items-center">
      <a-button
        id="deleteTicketButton"
        name="deleteTicketButton"
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
      <a-button
        id="addTicketButton"
        name="addTicketButton"
        type="primary"
        class="rounded-sm"
        @click="openAddModal.value = true"
      >
        <img :src="svgPaths.plus" alt="Add contract" class="w-[12px] h-[12px]" />
      </a-button>
    </div>
  </div>
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
        id: `selectTicket${record.no}`,
        name: `selectTicket${record.no}`,
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
        v-if="column.dataIndex === 'ticket_id' || column.dataIndex === 'room_no' || column.dataIndex === 'customer'"
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
  <CommonRoomDetailTicketDetailCustomer :ticket-detail="ticketDetail" :detail-modal-visible="detailModalVisible" />
  <CommonRoomDetailAddTicketCustomer :open-add-modal="openAddModal" :room-data="roomData" />
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { svgPaths } from '~/consts/svg_paths';
import { api } from '~/services/api';
import type { Room } from '~/types/building';
import type { SupportTicket } from '~/types/support_ticket';

// ---------------------- Variables ----------------------
const props = defineProps({
  tickets: {
    type: Array as PropType<SupportTicket[]>,
    required: true,
  },
  roomData: {
    type: Object as PropType<Room>,
    required: true,
  },
});
const tickets = toRef(props, 'tickets');
const roomData = toRef(props, 'roomData');
const deleteBucket = ref<number[]>([]);
const openAddModal = ref({ value: false });
const ticketDetail = ref<SupportTicket | undefined>(undefined);
const detailModalVisible = ref({ value: false });
const { $event } = useNuxtApp();
const { t } = useI18n();
const searchInput = ref();
const userID = useCookie('userID');
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
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
    // {
    //   title: t('building'),
    //   dataIndex: 'building',
    //   key: 'building',
    //   class: 'text-nowrap',
    //   filters: buildings.map((building: string) => ({
    //     text: building,
    //     value: building,
    //   })),
    //   onFilter: (value: any, record: any) => record.building === value,
    // },
    // {
    //   title: t('floor'),
    //   dataIndex: 'floor',
    //   key: 'floor',
    //   class: 'text-nowrap',
    //   filters: floors.map((floor: number) => ({
    //     text: floor.toString(),
    //     value: floor,
    //   })),
    //   onFilter: (value: any, record: any) => record.floor === value,
    // },
    // {
    //   title: t('room_no'),
    //   dataIndex: 'room_no',
    //   key: 'room_no',
    //   customFilterDropdown: true,
    //   onFilter: (value: string, record: any) => {
    //     const values = value.split(',');
    //     return values.some((val) => record.room_no.toString().toLowerCase().includes(val.trim().toLowerCase()));
    //   },
    //   onFilterDropdownOpenChange: (visible: boolean) => {
    //     if (visible) {
    //       setTimeout(() => {
    //         searchInput.value.focus();
    //       }, 100);
    //     }
    //   },
    //   class: 'text-nowrap',
    // },
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

// ---------------------- Functions ----------------------
function openDetailModal(id: number) {
  const result = tickets.value.find((ticket) => ticket.ID === id) || undefined;
  ticketDetail.value = result ? JSON.parse(JSON.stringify(result)) : undefined;
  detailModalVisible.value.value = true;
}

async function deleteTickets() {
  try {
    $event.emit('loading');
    await api.common.support_ticket.deleteMany(deleteBucket.value);
    $event.emit('deleteItemSuccess');
    deleteBucket.value = [];

    $event.emit('refetchRoomTickets');
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    } else if (
      err.response._data.message === getMessageCode('PERMISSION_DENIED') ||
      err.response._data.message === getMessageCode('INVALID_CREDENTIALS') ||
      err.response._data.message === getMessageCode('TOKEN_REFRESH_FAILED') ||
      err.response._data.message === getMessageCode('TOKEN_VERIFY_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('no_permission'),
      });
    } else if (
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('failed'),
        description: t('request_error'),
      });
    } else if (
      err.response._data.message === getMessageCode('UPDATE_FAILED') ||
      err.response._data.message === getMessageCode('CREATE_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('data_invalid'),
      });
    } else if (err.response._data.message === getMessageCode('DATA_NOT_FOUND')) {
      notification.error({
        message: t('failed'),
        description: t('data_not_found'),
      });
    }
  } finally {
    $event.emit('loading');
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
</script>
