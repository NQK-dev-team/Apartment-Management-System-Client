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
        <h1 class="mt-3 text-2xl">{{ $t('room', { name: 'test' }) }}</h1>
        <div>
          <a-button type="primary" class="rounded-sm">{{ $t('edit') }}</a-button>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <div class="flex items-center py-3">
        <div class="h-full flex-1 flex flex-col me-24">
          <!-- <div class="flex items-center">
            <div class="flex-1 me-2">
              <label for="building_name" class="flex mb-1">
                <span>{{ $t('building_name') }}</span>
              </label>
              <a-input id="building_name" :value="roomData.name" disabled readonly :placeholder="$t('building_name')" />
            </div>
            <div class="flex-1 ms-2">
              <label for="building_address" class="flex mb-1">
                <span>{{ $t('building_address') }}</span>
              </label>
              <a-input
                id="building_address"
                :value="roomData.address"
                disabled
                readonly
                :placeholder="$t('building_address')"
              />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-2">
              <label for="total_floor" class="flex mb-1">
                <span>{{ $t('total_floor') }}</span>
              </label>
              <a-input
                id="total_floor"
                :value="roomData.totalFloor"
                disabled
                readonly
                :placeholder="$t('total_floor')"
              />
            </div>
            <div class="flex-1 ms-2">
              <label for="total_room" class="flex mb-1">
                <span>{{ $t('total_room') }}</span>
              </label>
              <a-input id="total_room" :value="roomData.totalRoom" disabled readonly :placeholder="$t('total_room')" />
            </div>
          </div> -->
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
          <h2 v-show="option === 1" class="text-xl font-bold">{{ $t('contract_list') }}</h2>
          <h2 v-show="option === 2" class="text-xl font-bold">{{ $t('support_ticket_list') }}</h2>
        </div>
        <ClientOnly> </ClientOnly>
        <div class="flex flex-col items-center my-5">
          <a-button class="my-2 w-[100px] rounded-sm">
            <NuxtLink to="#">{{ $t('back') }}</NuxtLink>
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
const { $event } = useNuxtApp();
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
});
const supportTickets = ref<SupportTicket[]>([]);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const option = ref<number>(1);
const previewVisible = ref(false);
const previewImage = ref('');

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
// ---------------------- Lifecycle Hooks ----------------------
onMounted(async () => {
  await getRoomData();

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
