<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.room.list">{{ $t('room_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('room_info') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('room', { name: roomData?.no }) }}</h1>
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
                :value="roomData?.buildingName"
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
                :value="roomData?.buildingAddress"
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
              <a-input id="room_floor" :value="roomData?.floor" disabled readonly :placeholder="$t('floor')" />
            </div>
            <div class="flex-1 ms-2">
              <label for="room_no" class="flex mb-1">
                <span>{{ $t('room_no') }}</span>
              </label>
              <a-input id="room_no" :value="roomData?.no" disabled readonly :placeholder="$t('room_no')" />
            </div>
          </div>
          <div class="flex items-start mt-5">
            <div class="flex-1 me-2">
              <div class="flex items-center justify-between">
                <label for="room_area" class="flex mb-1">
                  <span>{{ $t('area') }} (m<sup>2</sup>)</span>
                </label>
              </div>
              <a-input id="room_area" :value="roomData?.area" disabled readonly :placeholder="$t('area')" />
            </div>
            <div class="flex-1 ms-2">
              <ClientOnly>
                <a-form-item
                  :rules="[{ required: true, message: $t('empty_room_status'), trigger: 'blur' }]"
                  name="status"
                >
                  <div class="flex items-center justify-between">
                    <label for="room_status" class="flex mb-1">
                      <span>{{ $t('status') }}</span>
                    </label>
                  </div>
                  <a-input
                    id="room_status"
                    :value="
                      $t(
                        {
                          1: 'rented',
                          2: 'sold',
                          3: 'available',
                          4: 'maintenance',
                          5: 'unavailable',
                        }[roomData?.status as 1 | 2 | 3 | 4 | 5] || '-'
                      )
                    "
                    disabled
                    readonly
                    :placeholder="$t('status')"
                  />
                </a-form-item>
              </ClientOnly>
            </div>
          </div>
          <div class="flex items-start mt-5">
            <div class="flex-1 me-2">
              <div class="flex items-center justify-between">
                <label for="room_description" class="flex mb-1">
                  <span>{{ $t('description') }}</span>
                </label>
              </div>
              <a-textarea
                id="room_description"
                :value="roomData?.description"
                disabled
                readonly
                :placeholder="$t('description')"
                :rows="3"
              />
            </div>
            <div class="flex-1 ms-2">
              <div class="flex items-end justify-end w-full h-full">
                <NuxtLink
                  :to="pageRoutes.common.contract.detail(roomData?.contracts[0]?.ID as number)"
                  class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
                  target="_blank"
                >
                  {{ $t('contract_information') }} &gt;&gt;</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
        <div class="w-[250px] h-full me-12 select-none">
          <a-carousel :autoplay="true" arrows>
            <div v-for="(image, index) in roomData?.images" :key="index">
              <img
                :src="image.path as string"
                class="w-[250px] h-[300px] cursor-pointer"
                @click="
                  () => {
                    previewVisible = true;
                    previewImage = image.path as string;
                  }
                "
              />
            </div>
          </a-carousel>
        </div>
      </div>
      <hr class="mt-2" />
      <div class="w-full flex-1 flex flex-col">
        <CommonRoomDetailSupportTicket v-if="roomData" :tickets="tickets" :room-data="roomData" />
        <div class="flex flex-col items-center my-5">
          <a-button class="my-2 w-[100px] rounded-sm">
            <NuxtLink :to="pageRoutes.common.room.list">{{ $t('back') }}</NuxtLink>
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
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import { api } from '~/services/api';
import type { Room } from '~/types/building';
import type { SupportTicket } from '~/types/support_ticket';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Room Detail',
  layout: 'main',
  middleware: ['authorization-customer'],
});

useHead({
  title: 'Room Detail',
  meta: [
    {
      name: 'description',
      content: "Detail information of the customer's room",
    },
  ],
});

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const route = useRoute();
const roomID = Number(route.params.id as string);
const roomData = ref<Room | undefined>(undefined);
const tickets = ref<SupportTicket[]>([]);
const { $event } = useNuxtApp();
const { t } = useI18n();
const previewVisible = ref(false);
const previewImage = ref('');

// ---------------------- Functions ----------------------
async function getroomData(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading', true);
    }

    const response = await api.common.room.getDetail(roomID);
    roomData.value = response.data;
  } catch (err: any) {
    roomData.value = undefined;
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
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
      $event.emit('loading', true);
    }
  }
}

async function getRoomSupportTicket(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading', true);
    }

    const response = await api.common.room.getTicket(roomID);
    tickets.value = response.data;
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
      $event.emit('loading', true);
    }
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  await getroomData();
  await getRoomSupportTicket();

  if (!roomData.value || !roomData.value.ID) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});

// ---------------------- Events ----------------------
$event.on('refetchRoomTickets', async () => {
  await getRoomSupportTicket();
});
</script>

<style lang="css">
.previewImageRoomDetail .ant-modal-content {
  padding: 0 !important;
}
</style>
