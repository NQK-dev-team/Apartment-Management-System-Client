<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.building.list">{{ $t('building_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.building.detail(buildingID)">{{
            roomData.buildingName
          }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('room_info') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex items-center justify-between">
        <h1 class="mt-3 text-2xl">{{ $t('room', { name: roomData.no }) }}</h1>
        <div>
          <a-button type="primary" class="rounded-sm">{{ $t('edit') }}</a-button>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <div class="flex items-center py-3">
        <div class="h-full flex-1 flex flex-col me-24">
          <div class="flex items-start">
            <div class="flex-1 me-2">
              <label for="building_name" class="flex mb-1">
                <span>{{ $t('building') }}</span>
              </label>
              <a-input
                id="building_name"
                :value="roomData.buildingName"
                disabled
                readonly
                :placeholder="$t('building_name')"
              />
            </div>
            <div class="flex-1 ms-2">
              <label for="building_address" class="flex mb-1">
                <span>{{ $t('building_address') }}</span>
              </label>
              <a-input
                id="building_address"
                :value="roomData.buildingAddress"
                disabled
                readonly
                :placeholder="$t('building_address')"
              />
            </div>
          </div>
          <div class="flex items-start mt-5">
            <div class="flex-1 me-2">
              <label for="room_floor" class="flex mb-1">
                <span>{{ $t('floor') }}</span>
              </label>
              <a-input id="room_floor" :value="roomData.floor" disabled readonly :placeholder="$t('floor')" />
            </div>
            <div class="flex-1 ms-2">
              <label for="room_no" class="flex mb-1">
                <span>{{ $t('room_no') }}</span>
              </label>
              <a-input id="room_no" :value="roomData.no" disabled readonly :placeholder="$t('room_no')" />
            </div>
          </div>
          <div class="flex items-start mt-5">
            <div class="flex-1 me-2">
              <ClientOnly>
                <label for="room_status" class="flex mb-1">
                  <span>{{ $t('status') }}</span>
                </label>
                <a-input
                  v-if="roomData.status === 1"
                  id="room_status"
                  :value="$t('rented')"
                  disabled
                  readonly
                  :placeholder="$t('status')"
                />
                <a-input
                  v-else-if="roomData.status === 2"
                  id="room_status"
                  :value="$t('sold')"
                  disabled
                  readonly
                  :placeholder="$t('status')"
                />
                <a-input
                  v-else-if="roomData.status === 3"
                  id="room_status"
                  :value="$t('available')"
                  disabled
                  readonly
                  :placeholder="$t('status')"
                />
                <a-input
                  v-else-if="roomData.status === 4"
                  id="room_status"
                  :value="$t('maintenance')"
                  disabled
                  readonly
                  :placeholder="$t('status')"
                />
                <a-input
                  v-else-if="roomData.status === 5"
                  id="room_status"
                  :value="$t('unavailable')"
                  disabled
                  readonly
                  :placeholder="$t('status')"
                />
              </ClientOnly>
            </div>
            <div class="flex-1 ms-2">
              <label for="room_description" class="flex mb-1">
                <span>{{ $t('description') }}</span>
              </label>
              <a-textarea
                id="room_description"
                :value="roomData.description"
                disabled
                readonly
                :placeholder="$t('description')"
                :rows="3"
              />
            </div>
          </div>
        </div>
        <div class="w-[250px] h-full me-12 select-none">
          <a-carousel :autoplay="true" arrows>
            <div v-for="(image, index) in roomData.images" :key="index">
              <img
                :src="image.path"
                class="w-[250px] h-[300px] cursor-pointer"
                @click="
                  () => {
                    previewVisible = true;
                    previewImage = image.path;
                  }
                "
              />
            </div>
          </a-carousel>
        </div>
      </div>
      <hr class="mt-2" />
      <div class="w-full flex-1 flex flex-col">
        <div class="flex items-center mt-3">
          <p
            class="me-3 cursor-pointer select-none"
            :class="[
              option === 1
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 1"
          >
            {{ $t('contract_list') }}
          </p>
          <p
            class="mx-3 cursor-pointer select-none"
            :class="[
              option === 2
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 2"
          >
            {{ $t('support_ticket_list') }}
          </p>
        </div>
        <div class="flex items-center justify-center mt-3">
          <div v-show="option === 1" class="justify-between items-center w-full" style="display: flex">
            <div></div>
            <h2 class="text-xl font-bold">{{ $t('contract_list') }}</h2>
            <div class="flex items-center justify-end">
              <a-button
                type="primary"
                danger
                class="flex items-center justify-center w-10 h-10 rounded-sm me-2"
                :disabled="!deleteBucket.value.length"
                @click="
                  () => {
                    $event.emit('deleteItem', { callback: deleteContracts });
                  }
                "
                ><DeleteOutlined
              /></a-button>
              <a-button type="primary" class="flex items-center justify-center w-10 h-10 rounded-sm"
                ><NuxtLink :to="pageRoutes.common.contract.add" target="_blank"><PlusOutlined /></NuxtLink
              ></a-button>
            </div>
          </div>
          <h2 v-show="option === 2" class="text-xl font-bold">{{ $t('support_ticket_list') }}</h2>
        </div>
        <ClientOnly>
          <CommonBuildingRoomDetailContractList
            v-show="option === 1"
            :contracts="roomData.contracts"
            :delete-bucket="deleteBucket"
          />
          <div v-show="option === 2">
            <div class="flex items-center justify-end me-2">
              <a-range-picker v-model:value="timeRange" :disabled-date="disabledDate" />
            </div>
            <CommonBuildingRoomDetailSupportTicketList :tickets="tickets" :approve="approve" :deny="deny" />
          </div>
        </ClientOnly>
        <div class="flex flex-col items-center my-5">
          <a-button class="my-2 w-[100px] rounded-sm">
            <NuxtLink :to="pageRoutes.common.building.detail(buildingID)">{{ $t('back') }}</NuxtLink>
          </a-button>
        </div>
      </div>
    </div>
    <a-modal
      class="previewImageRoomDetail"
      :open="previewVisible"
      :footer="null"
      :closable="false"
      width="500px"
      @cancel="previewVisible = false"
    >
      <img alt="View image" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { pageRoutes } from '~/consts/page_routes';
import { api } from '~/services/api';
import type { Room } from '~/types/building';
import type { SupportTicket } from '~/types/support_ticket';
import type { Dayjs } from 'dayjs';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Building Room Detail',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Room Detail',
  meta: [
    {
      name: 'description',
      content: 'Detail information of a room in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const route = useRoute();
const buildingID = Number(route.params.buildingID as string);
const roomID = Number(route.params.roomID as string);
const { $event, $dayjs } = useNuxtApp();
const roomData = ref<Room>({
  ID: 0,
  no: 0,
  floor: 0,
  description: '',
  area: 0,
  status: 0,
  createdAt: '',
  createdBy: 0,
  updatedAt: '',
  updatedBy: 0,
  buildingID: 0,
  images: [],
  contracts: [],
  buildingName: '',
  buildingAddress: '',
});
const tickets = ref<SupportTicket[]>([]);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const option = ref<number>(1);
const previewVisible = ref(false);
const previewImage = ref('');
const deleteBucket = ref<{ value: number[] }>({ value: [] });
const { t } = useI18n();
const now = $dayjs();
const timeRange = ref<[Dayjs, Dayjs]>([now.startOf('quarter'), now]);

// ---------------------- Functions ----------------------
async function getRoomData(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }
    const response = await api.common.building.getRoomDetail(buildingID, roomID);
    const data = response.data;

    roomData.value = data;
  } catch (err: any) {
    roomData.value.ID = 0;

    if (
      err.status >= 500 ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      throw createError({
        status: 500,
        message: 'Internal server error',
        fatal: true,
      });
    }
  } finally {
    if (emitLoading) {
      $event.emit('loading');
    }
  }
}

async function getContracts() {
  try {
    $event.emit('loading');
    const response = await api.common.building.getRoomContracts(buildingID, roomID);
    roomData.value.contracts = response.data;
  } catch (err: any) {
    roomData.value.ID = 0;

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
  } finally {
    $event.emit('loading');
  }
}

async function deleteContracts() {
  try {
    $event.emit('loading');
    await api.common.building.deleteRoomContracts(buildingID, roomID, deleteBucket.value.value);
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
    } else if (err.response._data.message === getMessageCode('PERMISSION_DENIED')) {
      notification.warn({
        message: t('delete_fail'),
        description: t('can_not_delete_a_contract_in_the_list'),
      });
    }
  } finally {
    $event.emit('loading');
    getContracts();
  }
}

async function getSupporTickets() {
  try {
    $event.emit('loading');
    const ticketResponse = await api.common.support_ticket.getList(
      1000,
      0,
      convertToDate(timeRange.value[0].toDate().toISOString()),
      convertToDate(timeRange.value[1].toDate().toISOString())
    );
    tickets.value = ticketResponse.data;
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
  } finally {
    $event.emit('loading');
  }
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

function disabledDate(current: Dayjs) {
  // Can not select days after today
  return current && current >= $dayjs().endOf('day');
}
// ---------------------- Lifecycle Hooks ----------------------
onMounted(async () => {
  await getRoomData();
  await getSupporTickets();

  if (
    roomData.value.ID === 0 ||
    roomData.value.buildingID === 0 ||
    roomData.value.buildingID !== buildingID ||
    roomData.value.ID !== roomID
  ) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});
</script>

<style lang="css">
.previewImageRoomDetail .ant-modal-content {
  padding: 0 !important;
}
</style>
