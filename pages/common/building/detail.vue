<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.building.list">{{ $t('building_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('building_information') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex items-center justify-between">
        <h1 class="mt-3 text-2xl">{{ $t('building', { name: buildingData.name }) }}</h1>
        <div>
          <NuxtLink :to="pageRoutes.common.building.edit(buildingID)">
            <a-button type="primary" class="rounded-sm">{{ $t('edit') }}</a-button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <div class="flex items-center py-3">
        <div class="h-full flex-1 flex flex-col me-24">
          <div class="flex items-center">
            <div class="flex-1 me-2">
              <label for="building_id" class="flex mb-1">
                <span>{{ $t('buildingID') }}</span>
              </label>
              <a-input id="building_id" :value="buildingData.ID" disabled readonly :placeholder="$t('buildingID')" />
            </div>
            <div class="flex-1 ms-2">
              <label for="building_name" class="flex mb-1">
                <span>{{ $t('building_name') }}</span>
              </label>
              <a-input
                id="building_name"
                :value="buildingData.name"
                disabled
                readonly
                :placeholder="$t('building_name')"
              />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-2">
              <label for="building_address" class="flex mb-1">
                <span>{{ $t('building_address') }}</span>
              </label>
              <a-input
                id="building_address"
                :value="buildingData.address"
                disabled
                readonly
                :placeholder="$t('building_address')"
              />
            </div>
            <div class="flex-1 ms-2">
              <label for="total_floor" class="flex mb-1">
                <span>{{ $t('total_floor') }}</span>
              </label>
              <a-input
                id="total_floor"
                :value="buildingData.totalFloor"
                disabled
                readonly
                :placeholder="$t('total_floor')"
              />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-2">
              <label for="total_room" class="flex mb-1">
                <span>{{ $t('total_room') }}</span>
              </label>
              <a-input
                id="total_room"
                :value="buildingData.totalRoom"
                disabled
                readonly
                :placeholder="$t('total_room')"
              />
            </div>
            <div class="flex-1 ms-2"></div>
          </div>
          <!-- <div class="flex items-center"></div>
          <div class="flex items-center"></div>
          <div class="flex items-center"></div> -->
        </div>
        <div class="w-[250px] h-full me-12 select-none">
          <a-carousel :autoplay="true" arrows>
            <!-- <template #prevArrow>
              <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                <left-circle-outlined />
              </div>
            </template>
            <template #nextArrow>
              <div class="custom-slick-arrow" style="right: 10px">
                <right-circle-outlined />
              </div>
            </template> -->
            <div v-for="(image, index) in buildingData.images" :key="index">
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
            {{ $t('room_list') }}
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
            {{ $t('service_list') }}
          </p>
          <p
            class="mx-3 cursor-pointer select-none"
            :class="[
              option === 3
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 3"
          >
            {{ $t('management_schedule') }}
          </p>
          <p
            class="ms-3 cursor-pointer select-none"
            :class="[
              option === 4
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 4"
          >
            {{ $t('statistic') }}
          </p>
        </div>
        <div class="flex items-center justify-center mt-3">
          <h2 v-show="option === 1" class="text-xl font-bold">{{ $t('room_list') }}</h2>
          <h2 v-show="option === 2" class="text-xl font-bold">{{ $t('service_list') }}</h2>
          <h2 v-show="option === 3" class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
          <h2 v-show="option === 4" class="text-xl font-bold">{{ $t('statistic') }}</h2>
        </div>
        <ClientOnly>
          <CommonBuildingDetailRoomListTable
            v-show="option === 1"
            :rooms="rooms"
            :building-id="buildingID"
            :total-floor="buildingData.totalFloor"
          />
          <CommonBuildingDetailServiceListTable v-show="option === 2" :services="services" />
          <template v-if="schedules.length > 0">
            <CommonBuildingDetailManagementSchedule v-show="option === 3" :schedules="schedules" />
          </template>
        </ClientOnly>
        <div class="flex flex-col items-center my-5">
          <NuxtLink :to="pageRoutes.common.building.list" class="my-2"
            ><a-button class="w-[100px] rounded-sm">{{ $t('back') }}</a-button></NuxtLink
          >
        </div>
      </div>
    </div>
    <a-modal
      class="previewImageBuildingDetail"
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
z
<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import { api } from '~/services/api';
import type { NullTime } from '~/types/basic_model';
import type { Service, Building, Room } from '~/types/building';
import type { ManagerSchedule } from '~/types/user';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Building Detail',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Building Detail',
  meta: [
    {
      name: 'description',
      content: 'Detail information of a building in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const route = useRoute();
const buildingID = Number(route.params.id as string);
const { $event } = useNuxtApp();
const buildingData = ref<Building>({
  ID: 0,
  name: '',
  address: '',
  totalFloor: 0,
  totalRoom: 0,
  images: [],
  createdAt: '',
  createdBy: 0,
  updatedAt: '',
  updatedBy: 0,
  rooms: [],
  services: [],
});
const rooms = ref<Room[]>([]);
const services = ref<Service[]>([]);
const schedules = ref<ManagerSchedule[]>([]);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const option = ref<number>(1);
const previewVisible = ref(false);
const previewImage = ref('');

// ---------------------- Functions ----------------------
async function getBuildingData(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }
    const response = await api.common.building.getDetail(buildingID);
    const scheduleResponse = await api.common.building.getSchedule(buildingID);
    const data = response.data;
    const scheduleData = scheduleResponse.data;

    buildingData.value = data;
    rooms.value = data.rooms.sort((a, b) => a.no - b.no);
    services.value = data.services;
    schedules.value = scheduleData.sort(
      (a, b) =>
        new Date(b.startDate as string).getTime() - new Date(a.startDate as string).getTime() ||
        new Date((b.endDate as NullTime).Valid ? ((b.endDate as NullTime).Time! as string) : '2100-01-01').getTime() -
          new Date((a.endDate as NullTime).Valid ? ((a.endDate as NullTime).Time! as string) : '2100-01-01').getTime()
    );
  } catch (err: any) {
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
      $event.emit('loading');
    }
  }
}
// ---------------------- Lifecycle Hooks ----------------------
onMounted(async () => {
  await getBuildingData();

  if (buildingData.value.ID === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});
</script>

<style lang="css">
.previewImageBuildingDetail .ant-modal-content {
  padding: 0 !important;
}
</style>
