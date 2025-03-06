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
          <NuxtLink v-if="userRole?.toString() === roles.owner" :to="pageRoutes.common.building.edit(buildingID)">
            <a-button type="primary" class="rounded-sm">{{ $t('edit') }}</a-button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div
      class="flex-1 flex flex-col px-4 mt-5 overflow-auto"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <div class="flex items-center h-[400px] py-3">
        <div class="h-full flex-1 flex flex-col me-24">
          <div class="flex items-center">
            <div class="flex-1 me-2">
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
            <div class="flex-1 ms-2">
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
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-2">
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
            <div class="flex-1 ms-2">
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
          </div>
          <div class="flex items-center"></div>
          <div class="flex items-center"></div>
          <div class="flex items-center"></div>
        </div>
        <div class="w-[350px] h-full me-12 select-none">
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
                :src="image.path"
                class="w-[350px] h-[350px] cursor-pointer"
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
      <hr />
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
        <div class="flex items-center justify-between mt-3">
          <div></div>
          <h2 v-show="option === 1" class="text-xl font-bold">{{ $t('room_list') }}</h2>
          <h2 v-show="option === 2" class="text-xl font-bold">{{ $t('service_list') }}</h2>
          <h2 v-show="option === 3" class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
          <h2 v-show="option === 4" class="text-xl font-bold">{{ $t('statistic') }}</h2>
          <div v-show="option === 1">
            <div class="items-center" style="display: flex">
              <a-button
                class="flex items-center rounded-sm"
                type="primary"
                danger
                :disabled="roomListSelection.selection.length === 0"
                @click="
                  () => {
                    $event.emit('deleteItem', { callback: deleteRoom });
                  }
                "
                ><DeleteOutlined
              /></a-button>
              <a-button class="flex items-center rounded-sm ms-2" type="primary" @click="addRoomModal = true"
                ><PlusOutlined
              /></a-button>
            </div>
          </div>
          <div v-show="option === 2">
            <div class="items-center" style="display: flex">
              <a-button
                class="flex items-center rounded-sm"
                type="primary"
                danger
                :disabled="serviceListSelection.selection.length === 0"
                @click="
                  () => {
                    $event.emit('deleteItem', { callback: deleteService });
                  }
                "
                ><DeleteOutlined
              /></a-button>
              <a-button class="flex items-center rounded-sm ms-2" type="primary" @click="addServiceModal = true"
                ><PlusOutlined
              /></a-button>
            </div>
          </div>
          <div v-show="option === 3">
            <div v-if="userRole?.toString() === roles.owner" class="items-center" style="display: flex">
              <a-button class="flex items-center rounded-sm" type="primary" danger><DeleteOutlined /></a-button>
              <a-button class="flex items-center rounded-sm ms-2" type="primary"><PlusOutlined /></a-button>
            </div>
          </div>
          <div v-show="option === 4"></div>
        </div>
        <ClientOnly>
          <CommonBuildingDetailRoomListTable
            v-show="option === 1"
            :rooms="rooms"
            :building-id="buildingID"
            :total-floor="buildingData.totalFloor"
            :room-list-selection="roomListSelection"
          />
          <CommonBuildingDetailServiceListTable
            v-show="option === 2"
            :services="services"
            :service-list-selection="serviceListSelection"
          />
        </ClientOnly>
      </div>
    </div>
    <a-modal
      class="previewImageBuildingDetail"
      :open="previewVisible"
      :footer="null"
      :closable="false"
      width="750px"
      @cancel="previewVisible = false"
    >
      <img alt="View image" style="width: 100%" :src="previewImage" />
    </a-modal>
    <a-modal
      v-model:open="addServiceModal"
      :title="$t('add_service')"
      @ok="addService"
      @cancel="
        () => {
          newService.name = '';
          newService.price = '';
          newServiceFormRef?.clearValidate();
        }
      "
    >
      <a-form ref="newServiceFormRef" :model="newService" layout="vertical">
        <a-form-item :rules="[{ required: true, message: $t('empty_service_name'), trigger: 'blur' }]" name="name">
          <label class="mb-1 flex items-center" for="service_name">
            <span>{{ $t('service_name') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="service_name" v-model:value="newService.name" :placeholder="$t('enter_service_name')" />
        </a-form-item>
        <a-form-item :rules="[{ required: true, validator: validateServicePrice, trigger: 'blur' }]" name="price">
          <label class="mb-1 flex items-center" for="service_price">
            <span>{{ $t('service_price') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="service_price"
            v-model:value="newService.price"
            :placeholder="$t('enter_service_price')"
            type="number"
            :min="0"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:open="addRoomModal"
      :title="$t('add_room')"
      @ok="addRoom"
      @cancel="
        () => {
          newRoom.floor = 0;
          newRoom.no = 0;
          newRoom.status = 0;
          newRoom.area = '';
          newRoom.description = '';
          newRoom.images = [];
          newRoomFormRef?.clearValidate();
        }
      "
    >
      <a-form ref="newRoomFormRef" :model="newRoom" layout="vertical">
        <a-form-item :rules="[{ required: true, validator: validateFloorSelect, trigger: 'blur' }]" name="floor">
          <label class="mb-1 flex items-center" for="select_floor">
            <span>{{ $t('floor') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-select
            id="select_floor"
            v-model:value="newRoom.floor"
            placeholder="{{ $t('select_floor') }}"
            @change="
              () => {
                const rooms = buildingData.rooms
                  .filter((room) => room.floor === newRoom.floor)
                  .sort((a, b) => b.no - a.no);
                newRoom.no = rooms.length ? rooms[0].no + 1 : newRoom.floor * 1000 + 1;
              }
            "
          >
            <a-select-option :value="0" class="hidden">{{ $t('select_floor') }}</a-select-option>
            <a-select-option v-for="(_, index) in buildingData.totalFloor" :key="index + 1" :value="index + 1">{{
              index + 1
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <template v-if="newRoom.floor">
          <label class="mb-1 flex items-center" for="room_no">
            <span>{{ $t('room_no') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="room_no" :value="newRoom.no" :placeholder="$t('enter_room_no')" disabled readonly class="mb-5" />
          <a-form-item :rules="[{ required: true, validator: validateStatusSelect, trigger: 'blur' }]" name="status">
            <label class="mb-1 flex items-center" for="select_status">
              <span>{{ $t('floor') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-select id="select_status" v-model:value="newRoom.status" placeholder="{{ $t('select_status') }}">
              <a-select-option :value="0" class="hidden">{{ $t('select_status') }}</a-select-option>
              <a-select-option :value="1" class="text-[#50c433]">{{ $t('rented') }}</a-select-option>
              <a-select-option :value="2" class="text-[#43b7f1]">{{ $t('sold') }}</a-select-option>
              <a-select-option :value="3" class="text-[#d8d535]">{{ $t('available') }}</a-select-option>
              <a-select-option :value="4" class="text-[#888888]">{{ $t('maintenance') }}</a-select-option>
              <a-select-option :value="5" class="text-[#FF0000]">{{ $t('unavailable') }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :rules="[{ required: true, validator: validateArea, trigger: 'blur' }]" name="area">
            <label class="mb-1 flex items-center" for="room_area">
              <span>{{ $t('area') }} (m<sup>2</sup>)</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-input
              id="room_area"
              v-model:value="newRoom.area"
              :placeholder="$t('enter_room_area')"
              type="number"
              :min="0"
            />
          </a-form-item>
          <label class="mb-1 flex items-center" for="room_description">{{ $t('description') }} </label>
          <a-textarea
            id="room_description"
            v-model:value="newRoom.description"
            :placeholder="$t('enter_room_description')"
            class="mb-5"
          />
          <a-form-item :rules="[{ required: true, message: $t('room_image_require'), trigger: 'blur' }]" name="images">
            <label class="mb-1 flex items-center" for="room_images">
              <span>{{ $t('images') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-upload
              id="room_images"
              v-model:file-list="newRoom.images"
              accept=".png,.jpg,.jpeg"
              multiple
              list-type="picture-card"
              class="custom_room_image_upload"
              @preview="handlePreview"
            >
              <div>
                <plus-outlined />
                <div style="margin-top: 8px">{{ $t('upload_file') }}</div>
              </div>
            </a-upload>
          </a-form-item>
        </template>
      </a-form>
    </a-modal>
    <a-modal width="500px" :open="previewRoomVisible" :title="previewRoomTitle" :footer="null" @cancel="handleCancel">
      <img alt="Image Preview" style="width: 100%" :src="previewRoomImage" />
    </a-modal>
  </div>
</template>
z
<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';
import { api } from '~/services/api';
import type { Service, Building, Room } from '~/types/building';
import type { FormInstance, UploadFile, UploadProps } from 'ant-design-vue';
import { svgPaths } from '~/consts/svg_paths';
import type { Rule } from 'ant-design-vue/es/form';

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
      content: 'Detail of a building in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const userRole = useCookie('userRole');
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
  deletedAt: '',
  deletedBy: 0,
  rooms: [],
  services: [],
});
const rooms = ref<Room[]>([]);
const services = ref<Service[]>([]);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const option = ref<number>(1);
const previewVisible = ref(false);
const previewImage = ref('');
const roomListSelection = ref<{ selection: number[] }>({ selection: [] });
const serviceListSelection = ref<{ selection: number[] }>({ selection: [] });
const addServiceModal = ref<boolean>(false);
const newService = ref<{ name: string; price: number | string }>({ name: '', price: '' });
const addRoomModal = ref<boolean>(false);
const newRoom = ref<{
  floor: number;
  no: number;
  status: number;
  area: number | string;
  description: string;
  images: UploadFile[];
}>({
  floor: 0,
  no: 0,
  status: 0,
  area: '',
  description: '',
  images: [],
});
const newServiceFormRef = ref<FormInstance>();
const newRoomFormRef = ref<FormInstance>();
const previewRoomVisible = ref(false);
const previewRoomImage = ref('');
const previewRoomTitle = ref('');

// ---------------------- Functions ----------------------
async function getBuildingData(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }
    const response = await api.common.building.getDetail(buildingID);
    const data = response.data;

    buildingData.value = data;
    rooms.value = data.rooms.sort((a, b) => a.no - b.no);
    services.value = data.services;
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
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

async function deleteRoom() {
  try {
    $event.emit('loading');
    const idList: number[] = roomListSelection.value.selection;
    await api.common.building.deleteRooms(buildingID, idList);
    getBuildingData(false);
    $event.emit('deleteItemSuccess');
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    $event.emit('loading');
  }
}

async function deleteService() {
  try {
    $event.emit('loading');
    const idList: number[] = serviceListSelection.value.selection;
    await api.common.building.deleteServices(buildingID, idList);
    getBuildingData(false);
    $event.emit('deleteItemSuccess');
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    $event.emit('loading');
  }
}

function addService() {
  try {
    if (!newServiceFormRef.value) return;
    newServiceFormRef.value
      .validateFields()
      .then(async () => {
        $event.emit('loading');
        await api.common.building.addService(buildingID, {
          name: newService.value.name,
          price: Number(newService.value.price),
        });
        getBuildingData(false);
        notification.info({
          message: t('success'),
          description: t('add_service_success'),
        });
        addServiceModal.value = false;
        newService.value.name = '';
        newService.value.price = '';
        $event.emit('loading');
      })
      .catch(() => {});
  } catch (err: any) {
    if (err.response?._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  }
}

function addRoom() {
  try {
    if (!newRoomFormRef.value) return;
    newRoomFormRef.value
      .validateFields()
      .then(async () => {
        $event.emit('loading');
        await api.common.building.addRoom(buildingID, newRoom.value);
        getBuildingData(false);
        notification.info({
          message: t('success'),
          description: t('add_room_success'),
        });
        addRoomModal.value = false;
        newRoom.value.floor = 0;
        newRoom.value.no = 0;
        newRoom.value.status = 0;
        newRoom.value.area = '';
        newRoom.value.description = '';
        newRoom.value.images = [];
        $event.emit('loading');
      })
      .catch(() => {});
  } catch (err: any) {
    if (err.response?._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  }
}

function validateServicePrice(_rule: Rule, value: string) {
  if (value === '') {
    return Promise.reject(t('empty_service_price'));
  }
  if (Number(value) <= 0) {
    return Promise.reject(t('zero_service_price'));
  }
  return Promise.resolve();
}

function validateArea(_rule: Rule, value: string) {
  if (value === '') {
    return Promise.reject(t('empty_room_area'));
  }
  if (Number(value) <= 0) {
    return Promise.reject(t('zero_room_area'));
  }
  return Promise.resolve();
}

function validateFloorSelect(_rule: Rule, value: number) {
  if (value === 0) {
    return Promise.reject(t('select_a_floor'));
  }
  return Promise.resolve();
}

function validateStatusSelect(_rule: Rule, value: number) {
  if (value === 0) {
    return Promise.reject(t('empty_room_status'));
  }
  return Promise.resolve();
}

function handleCancel() {
  previewRoomVisible.value = false;
  previewRoomTitle.value = '';
}

// @ts-ignore
async function handlePreview(file: UploadProps['fileList'][number]) {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewRoomImage.value = file.url || file.preview;
  previewRoomVisible.value = true;
  previewRoomTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
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

<!-- <style lang="css" scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  /* height: 160px; */
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style> -->
