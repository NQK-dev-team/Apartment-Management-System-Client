<template>
  <a-form :model="updateRoomData" class="w-full h-full flex flex-col px-5" @finish="updateRoom">
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
          <a-button
            v-show="!editMode"
            type="primary"
            class="rounded-sm"
            html-type="button"
            @click="
              () => {
                notification.info({
                  message: t('edit_mode_active'),
                });
                editMode = true;
              }
            "
            >{{ $t('edit') }}</a-button
          >
          <a-button
            v-show="editMode"
            class="rounded-sm me-2"
            html-type="button"
            @click="
              () => {
                notification.info({
                  message: t('edit_mode_inactive'),
                });
                editMode = false;
                updateRoomData.description = roomData.description;
                updateRoomData.status = roomData.status;
                updateRoomData.images = roomData.images.map((image: any) => ({
                  ...image,
                  isDeleted: false,
                  isNew: false,
                }));
              }
            "
            >{{ $t('cancel') }}</a-button
          >
          <a-button v-show="editMode" type="primary" class="rounded-sm" html-type="submit">{{
            $t('save_changes')
          }}</a-button>
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
                <a-form-item
                  :rules="[
                    { required: true, message: $t('empty_room_area'), trigger: 'blur' },
                    {
                      validator: async (_: RuleObject, value: string) => validationRules.roomArea(_, value, $t),
                      trigger: 'blur',
                    },
                  ]"
                  name="area"
                >
                  <div class="flex items-center justify-between">
                    <label for="room_area" class="flex mb-1">
                      <span>{{ $t('area') }} (m<sup>2</sup>)</span>
                      <img v-show="editMode" :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                    </label>
                    <a-button
                      v-show="editMode"
                      class="mb-1 items-center justify-center rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
                      size="small"
                      style="display: flex"
                      @click="updateRoomData.area = roomData.area"
                    >
                      <UndoOutlined />
                    </a-button>
                  </div>
                  <a-input
                    v-if="!editMode"
                    id="room_area"
                    :value="roomData.area"
                    disabled
                    readonly
                    :placeholder="$t('area')"
                  />
                  <a-input
                    v-else
                    id="room_area"
                    v-model:value="updateRoomData.area"
                    :placeholder="$t('enter_room_area')"
                    type="number"
                  />
                </a-form-item>
              </ClientOnly>
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
                      <img v-show="editMode" :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                    </label>
                    <a-button
                      v-show="editMode"
                      class="mb-1 items-center justify-center rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
                      size="small"
                      style="display: flex"
                      @click="updateRoomData.status = roomData.status"
                    >
                      <UndoOutlined />
                    </a-button>
                  </div>
                  <a-input
                    v-if="!editMode"
                    id="room_status"
                    :value="
                      $t(
                        {
                          1: 'rented',
                          2: 'sold',
                          3: 'available',
                          4: 'maintenance',
                          5: 'unavailable',
                        }[roomData.status] || 'N/A'
                      )
                    "
                    disabled
                    readonly
                    :placeholder="$t('status')"
                  />
                  <a-select
                    v-else
                    id="room_status"
                    v-model:value="updateRoomData.status"
                    placeholder="{{ $t('select_status') }}"
                    class="w-full text-left"
                  >
                    <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{
                      $t('select_status')
                    }}</a-select-option>
                    <a-select-option :value="COMMON.ROOM_STATUS.RENTED" :class="`text-[#50c433]`">{{
                      $t('rented')
                    }}</a-select-option>
                    <a-select-option :value="COMMON.ROOM_STATUS.SOLD" :class="`text-[#43b7f1]`">{{
                      $t('sold')
                    }}</a-select-option>
                    <a-select-option :value="COMMON.ROOM_STATUS.AVAILABLE" :class="`text-[#888888]`">{{
                      $t('available')
                    }}</a-select-option>
                    <a-select-option :value="COMMON.ROOM_STATUS.MAINTANCED" :class="`text-[#d8d535]`">{{
                      $t('maintenance')
                    }}</a-select-option>
                    <a-select-option :value="COMMON.ROOM_STATUS.UNAVAILABLE" :class="`text-[#ff0000]`">{{
                      $t('unavailable')
                    }}</a-select-option>
                  </a-select>
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
                <a-button
                  v-show="editMode"
                  class="mb-1 items-center justify-center rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
                  size="small"
                  style="display: flex"
                  @click="updateRoomData.description = roomData.description"
                >
                  <UndoOutlined />
                </a-button>
              </div>
              <a-textarea
                v-if="!editMode"
                id="room_description"
                :value="roomData.description"
                disabled
                readonly
                :placeholder="$t('description')"
                :rows="3"
              />
              <a-textarea
                v-else
                id="room_description"
                v-model:value="updateRoomData.description"
                :placeholder="$t('enter_room_description')"
                :rows="3"
              />
            </div>
            <div class="flex-1 ms-2"></div>
          </div>
        </div>
        <div v-if="!editMode" class="w-[250px] h-full me-12 select-none">
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
        <div v-else class="w-[250px] h-full">
          <div class="flex items-center justify-between">
            <div class="flex">
              <h2 class="text-xl">{{ $t('building_image') }}</h2>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
            <a-button
              class="flex items-center justify-center rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
              size="small"
              @click="
                () => {
                  updateRoomData.images = roomData.images.map((image: any) => ({
                    ...image,
                    isDeleted: false,
                    isNew: false,
                  }));
                  updateRoomData.imageList = getImageList();
                }
              "
            >
              <UndoOutlined />
            </a-button>
          </div>
          <img
            v-if="!displayImages || !displayImages.length"
            :src="svgPaths.placeholderImage"
            :alt="$t('avatar')"
            class="w-full mt-1"
          />
          <div class="flex flex-col">
            <div v-for="(image, index) in displayImages" :key="index" class="mt-3">
              <img :src="image" :alt="$t('building_image') + ` ${index}`" class="w-full" />
            </div>
          </div>
          <a-form-item
            class="mt-3 text-center"
            :rules="[{ required: true, message: $t('image_require'), trigger: 'blur' }]"
            name="imageList"
          >
            <a-upload
              v-model:file-list="updateRoomData.imageList"
              accept=".png,.jpg,.jpeg"
              multiple
              list-type="text"
              @remove="
                (file) => {
                  if (isNaN(Number(file.uid))) {
                    updateRoomData.images = updateRoomData.images.filter((image: any) => image.uid !== file.uid);
                  } else {
                    const foundImage = updateRoomData.images.find(
                      (image: any) => !image.isNew && image.ID === Number(file.uid)
                    );
                    if (foundImage) {
                      foundImage.isDeleted = true;
                    }
                  }
                }
              "
              @change="(e: any) => handleFileUpload(e)"
            >
              <a-button class="flex items-center">
                <upload-outlined></upload-outlined>
                {{ $t('upload_file') }}
              </a-button>
            </a-upload>
          </a-form-item>
          <div class="mt-5 text-sm" :class="[lightMode ? 'text-[#00000080]' : 'text-[#d2d2d2a3]']">
            {{ $t('recommended_resolution') }}
          </div>
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
                class="flex items-center justify-center w-8 h-8 rounded-sm me-2"
                :disabled="!deleteBucket.value.length"
                @click="
                  () => {
                    $event.emit('deleteItem', { callback: deleteContracts });
                  }
                "
                ><DeleteOutlined
              /></a-button>
              <a-button type="primary" class="flex items-center justify-center w-8 h-8 rounded-sm"
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
            <CommonBuildingRoomDetailSupportTicketList
              :tickets="tickets"
              :approve="approve"
              :deny="deny"
              :room-data="roomData"
            />
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
  </a-form>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { pageRoutes } from '~/consts/page_routes';
import { api } from '~/services/api';
import type { Room, RoomImage } from '~/types/building';
import type { SupportTicket } from '~/types/support_ticket';
import type { Dayjs } from 'dayjs';
import type { UploadFile, UploadChangeParam } from 'ant-design-vue';
import { svgPaths } from '~/consts/svg_paths';
import { validationRules } from '~/consts/validation_rules';
import type { RuleObject } from 'ant-design-vue/es/form';
import { COMMON } from '~/consts/common';

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
const editMode = ref<boolean>(false);
const updateRoomData = ref({
  description: '',
  area: 0,
  status: 0,
  images: [] as ((RoomImage | UploadFile) & {
    isDeleted: boolean;
    isNew: boolean;
  })[],
  imageList: [] as any[],
});
const displayImages = asyncComputed(async () => {
  const result: string[] = [];

  for (const image of updateRoomData.value.images) {
    if (image.isDeleted) {
      continue;
    } else if (image.isNew) {
      const file = await getBase64((image as any).originFileObj);
      result.push(file as string);
    } else {
      result.push((image as any).path);
    }
  }

  return result;
});

// ---------------------- Functions ----------------------
function getImageList() {
  const result: {
    uid: string | number;
    name: string;
    status: string;
    url: string;
  }[] = [];

  updateRoomData.value.images.forEach((image: any) => {
    if (image.isDeleted) return;

    if (!image.isNew) {
      result.push({
        uid: image.ID,
        name: image.title ?? '',
        status: 'done',
        url: image.path,
      });
    } else {
      result.push({
        uid: image.uid,
        name: image.name,
        status: 'done',
        url: image.url,
      });
    }
  });

  return result;
}

async function getRoomData(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }
    const response = await api.common.building.getRoomDetail(buildingID, roomID);
    const data = response.data;

    roomData.value = data;
    updateRoomData.value.description = data.description;
    updateRoomData.value.status = data.status;
    updateRoomData.value.area = data.area;
    updateRoomData.value.images = data.images.map((image: RoomImage) => ({
      ...image,
      isDeleted: false,
      isNew: false,
    }));
    updateRoomData.value.imageList = getImageList();
  } catch (err: any) {
    roomData.value.ID = 0;

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

async function getContracts() {
  try {
    $event.emit('loading');
    const response = await api.common.building.getRoomContracts(buildingID, roomID);
    roomData.value.contracts = response.data;
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

async function deleteContracts() {
  try {
    $event.emit('loading');
    await api.common.building.deleteRoomContracts(buildingID, roomID, deleteBucket.value.value);
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
    const ticketResponse = await api.common.building.getRoomTickets(
      buildingID,
      roomID,
      convertToDate(timeRange.value[0].toDate().toISOString()),
      convertToDate(timeRange.value[1].toDate().toISOString())
    );
    tickets.value = ticketResponse.data;
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

async function approve(id: number) {
  try {
    await api.common.support_ticket.approve(id);
    notification.info({
      message: t('support_ticket_updated_title'),
      description: t('support_ticket_status_updated_content'),
    });
    getSupporTickets();
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

async function deny(id: number) {
  try {
    await api.common.support_ticket.deny(id);
    notification.info({
      message: t('support_ticket_updated_title'),
      description: t('support_ticket_status_updated_content'),
    });
    getSupporTickets();
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

function disabledDate(current: Dayjs) {
  // Can not select days after today
  return current && current >= $dayjs().endOf('day');
}

function handleFileUpload(event: UploadChangeParam<UploadFile<any>>) {
  event.fileList.forEach((file) => {
    if (file.status === 'done' && isNaN(Number(file.uid))) {
      if (updateRoomData.value.images.find((image: any) => image.isNew && !image.isDeleted && image.uid === file.uid)) {
        return;
      }
      updateRoomData.value.images.push({
        ...file,
        isNew: true,
        isDeleted: false,
      });
    }
  });
}

async function updateRoom() {
  let isSuccess = false;
  try {
    $event.emit('loading');

    const formData = new FormData();
    formData.append('description', updateRoomData.value.description);
    formData.append('status', updateRoomData.value.status.toString());
    formData.append('area', updateRoomData.value.area.toString());
    updateRoomData.value.images.forEach((image) => {
      if (image.isDeleted) {
        formData.append('deletedRoomImages[]', (image as RoomImage).ID.toString());
      } else if (image.isNew) {
        formData.append('newRoomImages[]', (image as UploadFile).originFileObj as File);
      }
    });

    await api.common.building.updateRoom(buildingID, roomID, formData);
    isSuccess = true;
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
    editMode.value = false;

    if (isSuccess) {
      notification.info({
        message: t('success'),
        description: t('room_updated_success'),
      });

      await getRoomData();
      await getSupporTickets();
    }
  }
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

// ---------------------- Watchers ----------------------
watch(timeRange, () => {
  getSupporTickets();
});
</script>

<style lang="css">
.previewImageRoomDetail .ant-modal-content {
  padding: 0 !important;
}
</style>
