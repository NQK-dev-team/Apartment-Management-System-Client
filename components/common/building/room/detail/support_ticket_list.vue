<template>
  <div>
    <a-table :columns="columns" :data-source="data" class="mt-3" :scroll="{ x: 'max-content' }">
      <template #bodyCell="{ column, value }">
        <template v-if="column.dataIndex === 'action'">
          <InfoCircleOutlined
            class="text-lg hover:cursor-pointer hover:text-gray-400 active:text-gray-600"
            :title="$t('detail')"
            @click="openDetailModal(value.ticketID)"
          />
          <template v-if="value.allowAction">
            <CheckCircleOutlined
              class="mx-3 text-green-500 text-lg hover:cursor-pointer hover:text-green-400 active:text-green-600"
              :title="$t('approve')"
              @click="props.approve(value.ticketID)"
            />
            <CloseCircleOutlined
              class="text-red-500 text-lg hover:cursor-pointer hover:text-red-400 active:text-red-600"
              :title="$t('deny')"
              @click="props.deny(value.ticketID)"
            />
          </template>
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
    <a-modal v-model:open="detailModalVisible" class="w-[700px]">
      <template #title>{{ $t('support_ticket_detail') }}</template>
      <template #footer>
        <a-button @click="detailModalVisible = false">{{ $t('close') }}</a-button>
      </template>
      <div v-if="ticketDetail">
        <div class="flex w-full">
          <div class="flex-1 flex flex-col">
            <label for="building_name" class="mb-1">{{ $t('building') }}</label>
            <a-input id="building_name" :value="ticketDetail.buildingName" disabled readonly />
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="room_floor" class="mb-1">{{ $t('floor') }}</label>
            <a-input id="room_floor" :value="ticketDetail.roomFloor" disabled readonly />
          </div>
        </div>
        <div class="flex w-full mt-5">
          <div class="flex-1 flex flex-col">
            <label for="room_no" class="mb-1">{{ $t('room_no') }}</label>
            <a-input id="room_no" :value="ticketDetail.roomNo" disabled readonly />
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="ticket_id" class="mb-1">{{ $t('ticket_id') }}</label>
            <a-input id="ticket_id" :value="ticketDetail.ID" disabled readonly />
          </div>
        </div>
        <div class="flex w-full mt-5">
          <div class="flex-1 flex flex-col">
            <label for="customer" class="mb-1">{{ $t('customer') }}</label>
            <a-input
              id="customer"
              :value="ticketDetail.customer.no + ' - ' + getUserName(ticketDetail.customer)"
              disabled
              readonly
            >
              <template #suffix>
                <NuxtLink
                  id="customerDetailLink"
                  name="customerDetailLink"
                  :to="pageRoutes.common.customer.detail(ticketDetail.customer.ID)"
                  target="_blank"
                  ><LinkOutlined
                /></NuxtLink>
              </template>
            </a-input>
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="creation_date" class="mb-1">{{ $t('creation_date') }}</label>
            <a-input id="creation_date" :value="convertToDateTime(ticketDetail.createdAt)" disabled readonly />
          </div>
        </div>
        <div class="flex w-full mt-5">
          <div class="flex-1 flex flex-col">
            <label for="status" class="mb-1">{{ $t('status') }}</label>
            <a-input
              id="status"
              :value="
                ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.PENDING
                  ? t('pending')
                  : ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.APPROVED
                    ? t('approved')
                    : t('denied')
              "
              :class="{
                'text-green-500': ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.APPROVED,
                'text-red-500': ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.REJECTED,
              }"
              disabled
              readonly
            />
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="manager" class="mb-1">{{ $t('manager_approving') }}</label>
            <a-input
              id="manager"
              :value="
                ticketDetail.managerID ? ticketDetail.manager.no + ' - ' + getUserName(ticketDetail.manager) : '-'
              "
              :title="
                ticketDetail.managerID ? ticketDetail.manager.no + ' - ' + getUserName(ticketDetail.manager) : '-'
              "
              disabled
              readonly
            >
              <template #suffix>
                <NuxtLink
                  v-if="ticketDetail.managerID && userRole?.toString() === roles.owner"
                  id="managerDetailLink"
                  name="managerDetailLink"
                  :to="pageRoutes.common.staff.detail(ticketDetail.manager.ID)"
                  target="_blank"
                  ><LinkOutlined
                /></NuxtLink>
              </template>
            </a-input>
          </div>
        </div>
        <div class="flex w-full mt-5">
          <div class="flex-1 flex flex-col">
            <label for="manager_decision" class="mb-1">{{ $t('manager_decision') }}</label>
            <a-input
              id="manager_decision"
              :value="!ticketDetail.managerID ? '-' : ticketDetail.managerResult ? t('approved') : t('denied')"
              disabled
              readonly
            />
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="decision_time_1" class="mb-1">{{ $t('decision_time') }}</label>
            <a-input
              id="decision_time_1"
              :value="
                ticketDetail?.managerResolveTime.Valid
                  ? convertToDateTime(ticketDetail.managerResolveTime.Time! as string)
                  : '-'
              "
              disabled
              readonly
            />
          </div>
        </div>
        <div class="flex w-full mt-5">
          <div class="flex-1 flex flex-col">
            <label for="owner" class="mb-1">{{ $t('owner_approving') }}</label>
            <a-input
              id="owner"
              :value="ticketDetail.ownerID ? ticketDetail.owner.no + ' - ' + getUserName(ticketDetail.owner) : '-'"
              :title="ticketDetail.ownerID ? ticketDetail.owner.no + ' - ' + getUserName(ticketDetail.owner) : '-'"
              disabled
              readonly
            />
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="owner_decision" class="mb-1">{{ $t('owner_decision') }}</label>
            <a-input
              id="owner_decision"
              :value="ticketDetail.ownerID ? (ticketDetail.ownerResult ? t('approved') : t('denied')) : '-'"
              disabled
              readonly
            />
          </div>
        </div>
        <div class="flex w-full mt-5">
          <div class="flex-1 flex flex-col">
            <label for="decision_time_2" class="mb-1">{{ $t('decision_time') }}</label>
            <a-input
              id="decision_time_2"
              :value="
                ticketDetail?.ownerResolveTime.Valid
                  ? convertToDateTime(ticketDetail.ownerResolveTime.Time! as string)
                  : '-'
              "
              disabled
              readonly
            />
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="title" class="mb-1">{{ $t('title') }}</label>
            <a-input id="title" :value="ticketDetail.title" disabled readonly />
          </div>
        </div>
        <div class="flex w-full mt-5">
          <div class="flex-1 flex flex-col">
            <label for="content" class="mb-1">{{ $t('content') }}</label>
            <a-textarea id="content" :value="ticketDetail.content" disabled readonly />
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="image">{{ $t('image') }}</label>
            <a-upload
              id="image"
              :file-list="
                ticketDetail.files.map((file, index) => ({
                  uid: index.toString(),
                  name: file.title || `File ${index + 1}`,
                  url: file.path as string,
                  status: 'done',
                }))
              "
              class="hide_delete_button"
            >
            </a-upload>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { roles } from '~/consts/roles';
import type { SupportTicket } from '~/types/support_ticket';
import { pageRoutes } from '~/consts/page_routes';
import type { Room } from '~/types/building';
import { COMMON } from '~/consts/common';

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
const { t } = useI18n();
const props = defineProps({
  tickets: {
    type: Object as PropType<SupportTicket[]>,
    required: true,
  },
  approve: {
    type: Function as PropType<(id: number) => Promise<void>>,
    required: true,
  },
  deny: {
    type: Function as PropType<(id: number) => Promise<void>>,
    required: true,
  },
  roomData: {
    type: Object as PropType<Room>,
    required: true,
  },
});
const ticketDetail = ref<SupportTicket | undefined>(undefined);
const detailModalVisible = ref(false);
const searchInput = ref();
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const columns = computed<any[]>(() => {
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
  props.tickets.map((ticket, index) => ({
    no: index + 1,
    ticket_id: ticket.ID,
    customer: getUserName(ticket.customer),
    creation_date: convertToDateTime(ticket.createdAt),
    status: ticket.status,
    manager_approving: ticket.managerID ? getUserName(ticket.manager) : '-',
    owner_approving: ticket.ownerID ? getUserName(ticket.owner) : '-',
    action: {
      ticketID: ticket.ID,
      allowAction:
        ticket.status === COMMON.SUPPORT_TICKET_STATUS.PENDING &&
        ((!ticket.ownerID && userRole.value?.toString() === roles.owner && ticket.managerID) ||
          (!ticket.managerID && userRole.value?.toString() === roles.manager)),
    },
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

function openDetailModal(id: number) {
  ticketDetail.value = props.tickets.find((ticket) => ticket.ID === id) || undefined;
  ticketDetail.value!.roomNo = props.roomData.no;
  ticketDetail.value!.roomFloor = props.roomData.floor;
  ticketDetail.value!.buildingName = props.roomData.buildingName;
  detailModalVisible.value = true;
}
</script>
