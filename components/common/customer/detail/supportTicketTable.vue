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
              @click="approve(value.ticketID)"
            />
            <CloseCircleOutlined
              class="text-red-500 text-lg hover:cursor-pointer hover:text-red-400 active:text-red-600"
              :title="$t('deny')"
              @click="deny(value.ticketID)"
            />
          </template>
        </template>
        <template v-if="column.dataIndex === 'status'">
          <a-tag
            :class="{
              'text-gray-500': value === 1,
              'text-green-500': value === 2,
              'text-red-500': value === 3,
            }"
          >
            {{ value === 1 ? t('pending') : value === 2 ? t('approved') : t('denied') }}
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
          v-if="column.dataIndex === 'ticket_id' || column.dataIndex === 'room_no'"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <FilterFilled v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
    </a-table>
    <a-modal v-model:open="detailModalVisible" class="w-[800px]">
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
            <a-input id="customer" :value="getUserName(ticketDetail.customer)" disabled readonly />
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
                ticketDetail.status === 1 ? t('pending') : ticketDetail.status === 2 ? t('approved') : t('denied')
              "
              :class="{
                'text-green-500': ticketDetail.status === 2,
                'text-red-500': ticketDetail.status === 3,
              }"
              disabled
              readonly
            />
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="manager" class="mb-1">{{ $t('manager_approving') }}</label>
            <a-input
              id="manager"
              :value="ticketDetail.managerID ? getUserName(ticketDetail.manager) : ''"
              disabled
              readonly
            />
          </div>
        </div>
        <div class="flex w-full mt-5">
          <div class="flex-1 flex flex-col">
            <label for="manager_decision" class="mb-1">{{ $t('manager_decision') }}</label>
            <a-input
              id="manager_decision"
              :value="ticketDetail.managerResult ? t('approved') : t('denied')"
              disabled
              readonly
            />
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="decision_date_1" class="mb-1">{{ $t('decision_date') }}</label>
            <a-input
              id="decision_date_1"
              :value="
                ticketDetail?.managerResolveTime.Valid ? convertToDateTime(ticketDetail.managerResolveTime.Time!) : ''
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
              :value="ticketDetail.ownerID ? getUserName(ticketDetail.owner) : ''"
              disabled
              readonly
            />
          </div>
          <div class="ms-2 flex-1 flex flex-col">
            <label for="owner_decision" class="mb-1">{{ $t('owner_decision') }}</label>
            <a-input
              id="owner_decision"
              :value="ticketDetail.ownerID ? (ticketDetail.ownerResult ? t('approved') : t('denied')) : ''"
              disabled
              readonly
            />
          </div>
        </div>
        <div class="flex w-full mt-5">
          <div class="flex-1 flex flex-col">
            <label for="decision_date_2" class="mb-1">{{ $t('decision_date') }}</label>
            <a-input
              id="decision_date_2"
              :value="
                ticketDetail?.ownerResolveTime.Valid ? convertToDateTime(ticketDetail.ownerResolveTime.Time!) : ''
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
                  url: file.path,
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
import { getMessageCode } from '~/consts/api_response';
import { roles } from '~/consts/roles';
import { api } from '~/services/api';
import type { SupportTicket } from '~/types/support_ticket';

// ---------------------- Variables ----------------------
const props = defineProps({
  tickets: {
    type: Object as PropType<SupportTicket[]>,
    required: true,
  },
});
const { t } = useI18n();
const searchInput = ref();
const columns = computed<any[]>(() => {
  const buildings = [...new Set(props.tickets.map((ticket) => ticket.buildingName))];
  const floors = [...new Set(props.tickets.map((ticket) => ticket.roomFloor))];
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
      class: 'text-nowrap',
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
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      customFilterDropdown: false,
      filters: [
        { text: t('pending'), value: 1 },
        { text: t('approved'), value: 2 },
        { text: t('denied'), value: 3 },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      class: 'text-nowrap',
    },
    {
      title: t('manager_approving'),
      dataIndex: 'manager_approving',
      key: 'manager_approving',
      class: 'text-nowrap',
    },
    {
      title: t('owner_approving'),
      dataIndex: 'owner_approving',
      key: 'owner_approving',
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
const userRole = useCookie('userRole');
const data = computed(() =>
  props.tickets.map((ticket, index) => ({
    no: index + 1,
    ticket_id: ticket.ID,
    creation_date: convertToDateTime(ticket.createdAt),
    status: ticket.status,
    manager_approving: ticket.managerID ? getUserName(ticket.manager) : '-',
    owner_approving: ticket.ownerID ? getUserName(ticket.owner) : '-',
    action: {
      ticketID: ticket.ID,
      allowAction:
        ticket.status === 1 &&
        ((userRole?.toString() === roles.owner && !ticket.ownerID) ||
          (userRole?.toString() === roles.manager && !ticket.managerID)),
    },
    building: ticket.buildingName,
    floor: ticket.roomFloor,
    room_no: ticket.roomNo,
  }))
);
const ticketDetail = ref<SupportTicket | null>(null);
const detailModalVisible = ref(false);
const state = reactive({
  searchText: '',
  searchedColumn: '',
});

// ---------------------- Functions ----------------------
function openDetailModal(id: number) {
  ticketDetail.value = props.tickets.find((ticket) => ticket.ID === id) || null;
  detailModalVisible.value = true;
}

async function approve(id: number) {
  try {
    await api.common.support_ticket.approve(id);
    notification.info({
      message: t('support_ticket_updated_title'),
      description: t('support_ticket_status_updated_content'),
    });
  } catch (err: any) {
    if (
      err.status >= 500 ||
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

async function deny(id: number) {
  try {
    await api.common.support_ticket.deny(id);
    notification.info({
      message: t('support_ticket_updated_title'),
      description: t('support_ticket_status_updated_content'),
    });
  } catch (err: any) {
    if (
      err.status >= 500 ||
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

<style lang="css">
.hide_delete_button .ant-upload-list-item-actions{
  display:none !important;
}
</style>
