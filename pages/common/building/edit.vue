<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.building.list">{{ $t('building_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>
          <NuxtLink :to="pageRoutes.common.building.detail(buildingID)">
            {{ $t('building_information') }}
          </NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t('edit_building') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('edit_building') }}</h1>
      <div class="flex items-center justify-center mt-5">
        <div>
          <div
            class="h-[48px] w-[250px] flex items-center justify-center select-none px-8"
            @click="
              () => {
                if (highestStep - 1 >= 0 && step !== 4 && step !== 1) {
                  step = 1;
                }
              }
            "
          >
            <div
              class="flex items-center justify-center"
              :class="[
                highestStep - 1 >= 0 && step !== 4
                  ? step !== 1
                    ? 'cursor-pointer custom_step'
                    : ''
                  : 'cursor-not-allowed',
              ]"
            >
              <div
                class="w-[32px] h-[32px] rounded-full flex items-center justify-center me-2"
                :class="[
                  step > 1 && highestStep - 1 >= 0
                    ? lightMode
                      ? 'step_number_background_completed'
                      : 'step_number_background_completed_dark'
                    : step === 1 && highestStep - 1 >= 0
                      ? 'step_number_background_selected'
                      : lightMode
                        ? 'step_number_background'
                        : 'step_number_background_dark',
                ]"
              >
                <CheckOutlined v-show="step > 1" class="text-[#1677ff]" />
                <p
                  v-show="step <= 1"
                  :class="[
                    step >= 1 && highestStep - 1 >= 0
                      ? !lightMode
                        ? 'step_number_selected_dark'
                        : 'step_number_selected'
                      : lightMode
                        ? 'step_number'
                        : 'step_number_dark',
                  ]"
                >
                  1
                </p>
              </div>
              <p
                :class="[
                  step >= 1
                    ? !lightMode
                      ? 'step_title_selected_dark'
                      : 'step_title_selected'
                    : lightMode
                      ? 'step_title'
                      : 'step_title_dark',
                ]"
                class="mt-1"
              >
                {{ $t('building_info') }}
              </p>
            </div>
          </div>
          <div
            :class="[step === 1 && highestStep - 1 >= 0 ? 'bg-[#1890ff] border-[#1890ff]' : 'border-transparent']"
            class="h-[2px] w-[250px] step_border_transitition border-b-[1px]"
          ></div>
        </div>
        <RightOutlined class="text-xl mb-0" :class="[lightMode ? 'text-slate-300' : 'text-stone-600']" />
        <div>
          <div
            class="h-[48px] w-[250px] flex items-center justify-center select-none px-8"
            @click="
              () => {
                if (highestStep - 2 >= 0 && step !== 4 && step !== 2) {
                  step = 2;
                }
              }
            "
          >
            <div
              class="flex items-center justify-center"
              :class="[
                highestStep - 2 >= 0 && step !== 4
                  ? step !== 2
                    ? 'cursor-pointer custom_step'
                    : ''
                  : 'cursor-not-allowed',
              ]"
            >
              <div
                class="w-[32px] h-[32px] rounded-full flex items-center justify-center me-2"
                :class="[
                  step > 2 && highestStep - 2 >= 0
                    ? lightMode
                      ? 'step_number_background_completed'
                      : 'step_number_background_completed_dark'
                    : step === 2 && highestStep - 2 >= 0
                      ? 'step_number_background_selected'
                      : lightMode
                        ? 'step_number_background'
                        : 'step_number_background_dark',
                ]"
              >
                <CheckOutlined v-show="step > 2" class="text-[#1677ff]" />
                <p
                  v-show="step <= 2"
                  :class="[
                    step >= 2 && highestStep - 2 >= 0
                      ? !lightMode
                        ? 'step_number_selected_dark'
                        : 'step_number_selected'
                      : lightMode
                        ? 'step_number'
                        : 'step_number_dark',
                  ]"
                >
                  2
                </p>
              </div>
              <p
                :class="[
                  step >= 2
                    ? !lightMode
                      ? 'step_title_selected_dark'
                      : 'step_title_selected'
                    : lightMode
                      ? 'step_title'
                      : 'step_title_dark',
                ]"
                class="mt-1"
              >
                {{ $t('room_info') }}
              </p>
            </div>
          </div>
          <div
            :class="[step === 2 && highestStep - 2 >= 0 ? 'bg-[#1890ff] border-[#1890ff]' : 'border-transparent']"
            class="h-[2px] w-[250px] step_border_transitition border-b-[1px]"
          ></div>
        </div>
        <RightOutlined class="text-xl mb-0" :class="[lightMode ? 'text-slate-300' : 'text-stone-600']" />
        <div>
          <div
            class="h-[48px] w-[250px] flex items-center justify-center select-none px-8"
            @click="
              () => {
                if (highestStep - 3 >= 0 && step !== 4 && step !== 3) {
                  step = 3;
                }
              }
            "
          >
            <div
              class="flex items-center justify-center"
              :class="[
                highestStep - 3 >= 0 && step !== 4
                  ? step !== 3
                    ? 'cursor-pointer custom_step'
                    : ''
                  : 'cursor-not-allowed',
              ]"
            >
              <div
                class="w-[32px] h-[32px] rounded-full flex items-center justify-center me-2"
                :class="[
                  step > 3 && highestStep - 3 >= 0
                    ? lightMode
                      ? 'step_number_background_completed'
                      : 'step_number_background_completed_dark'
                    : step === 3 && highestStep - 3 >= 0
                      ? 'step_number_background_selected'
                      : lightMode
                        ? 'step_number_background'
                        : 'step_number_background_dark',
                ]"
              >
                <CheckOutlined v-show="step > 3" class="text-[#1677ff]" />
                <p
                  v-show="step <= 3"
                  :class="[
                    step >= 3 && highestStep - 3 >= 0
                      ? !lightMode
                        ? 'step_number_selected_dark'
                        : 'step_number_selected'
                      : lightMode
                        ? 'step_number'
                        : 'step_number_dark',
                  ]"
                >
                  3
                </p>
              </div>
              <p
                :class="[
                  step >= 3
                    ? !lightMode
                      ? 'step_title_selected_dark'
                      : 'step_title_selected'
                    : lightMode
                      ? 'step_title'
                      : 'step_title_dark',
                ]"
                class="mt-1"
              >
                {{ $t('confirm') }}
              </p>
            </div>
          </div>
          <div
            :class="[step === 3 && highestStep - 3 >= 0 ? 'bg-[#1890ff] border-[#1890ff]' : 'border-transparent']"
            class="h-[2px] w-[250px] step_border_transitition border-b-[1px]"
          ></div>
        </div>
        <RightOutlined class="text-xl mb-0" :class="[lightMode ? 'text-slate-300' : 'text-stone-600']" />
        <div>
          <div
            class="h-[48px] w-[250px] flex items-center justify-center select-none px-8"
            @click="
              () => {
                if (highestStep - 4 >= 0 && step !== 4) {
                  step = 4;
                }
              }
            "
          >
            <div
              class="flex items-center justify-center"
              :class="[highestStep - 4 >= 0 && step !== 4 ? 'custom_step cursor-pointer' : 'cursor-not-allowed']"
            >
              <div
                class="w-[32px] h-[32px] rounded-full flex items-center justify-center me-2"
                :class="[
                  step > 4 && highestStep - 4 >= 0
                    ? lightMode
                      ? 'step_number_background_completed'
                      : 'step_number_background_completed_dark'
                    : step === 4 && highestStep - 4 >= 0
                      ? 'step_number_background_selected'
                      : lightMode
                        ? 'step_number_background'
                        : 'step_number_background_dark',
                ]"
              >
                <CheckOutlined v-show="step > 4" class="text-[#1677ff]" />
                <p
                  v-show="step <= 4"
                  :class="[
                    step >= 4 && highestStep - 4 >= 0
                      ? !lightMode
                        ? 'step_number_selected_dark'
                        : 'step_number_selected'
                      : lightMode
                        ? 'step_number'
                        : 'step_number_dark',
                  ]"
                >
                  4
                </p>
              </div>
              <p
                :class="[
                  step >= 4
                    ? !lightMode
                      ? 'step_title_selected_dark'
                      : 'step_title_selected'
                    : lightMode
                      ? 'step_title'
                      : 'step_title_dark',
                ]"
                class="mt-1"
              >
                {{ $t('finish') }}
              </p>
            </div>
          </div>
          <div
            :class="[step === 4 && highestStep - 4 >= 0 ? 'bg-[#1890ff] border-[#1890ff]' : 'border-transparent']"
            class="h-[2px] w-[250px] step_border_transitition border-b-[1px]"
          ></div>
        </div>
      </div>
    </div>
    <div
      id="page_content"
      class="flex-1 flex flex-col px-4 mt-5"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <ClientOnly>
        <div v-show="step === 1" class="flex-1">
          <CommonBuildingEditStep1
            :building-info="buildingInfo"
            :managers="managers"
            :original-building-info="originalBuildingInfo"
            :floors="floors"
          />
        </div>
        <div v-show="step === 2" class="flex-1">
          <CommonBuildingEditStep2
            :building-info="buildingInfo"
            :original-building-info="originalBuildingInfo"
            :floors="floors"
          />
        </div>
        <div v-show="step === 3" class="flex-1">
          <CommonBuildingEditStep3
            :building-info="buildingInfo"
            :managers="managers"
            :original-building-info="originalBuildingInfo"
            :floors="floors"
          />
        </div>
        <div v-show="step === 4" class="flex-1">
          <div v-show="editSuccess" class="h-full w-full flex-col items-center justify-center" style="display: flex">
            <div class="flex items-center justify-center mt-5">
              <Success class="text-green-600 text-4xl" />
            </div>
            <h2 class="text-xl my-2">{{ $t('finish') }}</h2>
            <p class="text-center my-2">{{ $t('edit_building_success_title') }}</p>
            <p class="text-center my-2">{{ $t('edit_building_success_note') }}</p>
            <div class="my-2 w-[100px]">
              <NuxtLink v-show="step === 4" :to="pageRoutes.common.building.detail(buildingID)">
                <a-button type="primary" class="w-full h-full rounded-sm">{{ $t('back') }}</a-button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </ClientOnly>
      <div class="steps-action flex flex-col items-center mb-3 mt-10">
        <a-button
          v-if="step < 4"
          type="primary"
          class="w-[100px] rounded-sm"
          @click="
            () => {
              step++;
              if (step > highestStep) {
                highestStep = step;
              }
              if (step === 4) {
                step--;
                $event.emit('updateItem', { callback: updateBuilding, updateModalContent: 'update_building_confirm' });
              }
            }
          "
          >{{ step == 3 ? $t('confirm') : $t('next') }}</a-button
        >
        <a-button v-if="step < 4" v-show="step > 1 && step < 4" class="my-2 w-[100px] rounded-sm" @click="step--">{{
          $t('previous')
        }}</a-button>
        <NuxtLink v-if="step < 4" v-show="step === 1" :to="pageRoutes.common.building.detail(buildingID)">
          <a-button class="my-2 w-[100px] rounded-sm">{{ $t('cancel') }}</a-button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { pageRoutes } from '~/consts/page_routes';
import { api } from '~/services/api';
import type { BuildingImage, EditBuilding, RoomImage } from '~/types/building';
import type { User } from '~/types/user';
import Success from '~/public/svg/success.svg';
import type { NullTime } from '~/types/basic_model';
import dayjs, { type Dayjs } from 'dayjs';
import type { UploadFile } from 'ant-design-vue';
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Edit Building',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Edit Building',
  meta: [
    {
      name: 'description',
      content: 'Update a building information',
    },
  ],
});

// ---------------------- Variables ----------------------
const route = useRoute();
const buildingID = Number(route.params.id as string);
const { $event } = useNuxtApp();
const lightModeCookie = useCookie('lightMode');
const step = ref<number>(1);
const highestStep = ref<number>(1);
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { t } = useI18n();
const buildingInfo = ref<{ data: EditBuilding }>({
  data: {
    ID: 0,
    name: '',
    address: '',
    images: [],
    rooms: [],
    services: [],
    schedules: [],
  } as unknown as EditBuilding,
});
const originalBuildingInfo = ref<{ data: EditBuilding }>({
  data: {
    ID: 0,
    name: '',
    address: '',
    images: [],
    rooms: [],
    services: [],
    schedules: [],
  } as unknown as EditBuilding,
});
const managers = ref<User[]>([]);
const editSuccess = ref<boolean>(false);
const floors = ref<
  {
    value: number;
    disable: boolean;
  }[]
>([]);

// ---------------------- Functions ----------------------
function checkStep1(): boolean {
  if (buildingInfo.value.data.name === '') {
    notification.error({
      message: t('empty_building_name'),
    });
    return false;
  }
  if (buildingInfo.value.data.name.length > COMMON.MAX_LENGTH.BUILDING_NAME) {
    notification.error({
      message: t('building_name_max_length', { length: COMMON.MAX_LENGTH.BUILDING_NAME }),
    });
    return false;
  }
  if (buildingInfo.value.data.address === '') {
    notification.error({
      message: t('empty_building_address'),
    });
    return false;
  }
  if (buildingInfo.value.data.address.length > COMMON.MAX_LENGTH.BUILDING_ADDRESS) {
    notification.error({
      message: t('building_address_max_length', { length: COMMON.MAX_LENGTH.BUILDING_ADDRESS }),
    });
    return false;
  }
  if (buildingInfo.value.data.images.filter((image) => !image.isDeleted).length === 0) {
    notification.error({
      message: t('building_image_require'),
    });
    return false;
  }
  const finalServices = buildingInfo.value.data.services.filter((service) => !service.isDeleted);
  if (finalServices.find((service) => service.name === '') !== undefined) {
    notification.error({
      message: t('empty_service_name', {
        no: finalServices.findIndex((service) => service.name === '') + 1,
      }),
    });
    return false;
  }
  if (finalServices.find((service) => service.name.length > COMMON.MAX_LENGTH.SERVICE_NAME) !== undefined) {
    notification.error({
      message: t('service_name_max_length', {
        no: finalServices.findIndex((service) => service.name.length > COMMON.MAX_LENGTH.SERVICE_NAME) + 1,
        length: COMMON.MAX_LENGTH.SERVICE_NAME,
      }),
    });
    return false;
  }
  if (finalServices.find((service) => service.price === '') !== undefined) {
    notification.error({
      message: t('empty_service_price', {
        no: finalServices.findIndex((service) => service.price === '') + 1,
      }),
    });
    return false;
  }
  if (finalServices.find((service) => service.price !== '' && Number(service.price) <= 0) !== undefined) {
    notification.error({
      message: t('zero_service_price', {
        no: finalServices.findIndex((service) => service.price !== '' && Number(service.price) <= 0) + 1,
      }),
    });
    return false;
  }
  const finalSchedules = buildingInfo.value.data.schedules.filter((schedule) => !schedule.isDeleted);
  if (finalSchedules.find((schedule) => !schedule.managerNo) !== undefined) {
    notification.error({
      message: t('empty_employee_schedule', {
        no: finalSchedules.findIndex((schedule) => !schedule.managerNo) + 1,
      }),
    });
    return false;
  }
  if (finalSchedules.find((schedule) => !schedule.startDate) !== undefined) {
    notification.error({
      message: t('empty_start_date_schedule', {
        no:
          buildingInfo.value.data.schedules
            .filter((schedule) => !schedule.isDeleted)
            .findIndex((schedule) => !schedule.startDate) + 1,
      }),
    });
    return false;
  }
  if (
    finalSchedules.find(
      (schedule) => schedule.endDate && schedule.startDate.toDate() > (schedule.endDate as Dayjs).toDate()
    ) !== undefined
  ) {
    notification.error({
      message: t('start_date_large_end_date', {
        no:
          finalSchedules.findIndex(
            (schedule) => schedule.endDate && schedule.startDate.toDate() > (schedule.endDate as Dayjs).toDate()
          ) + 1,
      }),
    });
    return false;
  }
  return true;
}

function checkStep2(): boolean {
  let invalidRoom = buildingInfo.value.data.rooms.find((room) => !room.isDeleted && room.status === 0);
  if (invalidRoom) {
    notification.error({
      message: t('empty_room_status', {
        no: invalidRoom.no,
      }),
    });
    return false;
  }
  invalidRoom = buildingInfo.value.data.rooms.find((room) => !room.isDeleted && room.area === '');
  if (invalidRoom) {
    notification.error({
      message: t('empty_room_area', {
        no: invalidRoom.no,
      }),
    });
    return false;
  }
  invalidRoom = buildingInfo.value.data.rooms.find((room) => !room.isDeleted && Number(room.area) <= 0);
  if (invalidRoom) {
    notification.error({
      message: t('zero_room_area', {
        no: invalidRoom.no,
      }),
    });
    return false;
  }
  invalidRoom = buildingInfo.value.data.rooms.find(
    (room) => !room.isDeleted && room.description.length > COMMON.MAX_LENGTH.ROOM_DESCRIPTION
  );
  if (invalidRoom) {
    notification.error({
      message: t('room_description_max_length', {
        no: invalidRoom.no,
        length: COMMON.MAX_LENGTH.ROOM_DESCRIPTION,
      }),
    });
    return false;
  }
  invalidRoom = buildingInfo.value.data.rooms.find(
    (room) => !room.isDeleted && !room.images.filter((image) => !image.isDeleted).length
  );
  if (invalidRoom) {
    notification.error({
      message: t('room_image_require', {
        no: invalidRoom.no,
      }),
    });
    return false;
  }
  return true;
}

async function updateBuilding() {
  try {
    $event.emit('loading');

    const data = buildingInfo.value.data;
    const totalFloor = floors.value.length;

    const formData = new FormData();
    formData.append('id', buildingID.toString());
    formData.append('name', data.name.trim());
    formData.append('address', data.address.trim());
    formData.append('totalFloor', totalFloor.toString());
    data.images.forEach((image) => {
      if (image.isDeleted) {
        formData.append('deletedBuildingImages[]', (image as BuildingImage).ID.toString());
      } else if (image.isNew) {
        formData.append('newBuildingImages[]', (image as UploadFile).originFileObj as File);
      }
    });
    data.services.forEach((service) => {
      if (service.isDeleted) {
        formData.append('deletedServices[]', service.ID.toString());
      } else if (service.isNew) {
        formData.append(
          'newServices[]',
          JSON.stringify({
            name: service.name.trim(),
            price: Number(service.price.toString().trim()),
          })
        );
      } else {
        formData.append(
          'services[]',
          JSON.stringify({
            id: service.ID,
            name: service.name.trim(),
            price: Number(service.price.toString().trim()),
          })
        );
      }
    });
    data.schedules.forEach((schedule) => {
      if (schedule.isDeleted) {
        formData.append('deletedSchedules[]', schedule.ID.toString());
      } else if (schedule.isNew) {
        formData.append(
          'newSchedules[]',
          JSON.stringify({
            managerID: schedule.managerID,
            startDate: convertToDate(schedule.startDate.toDate().toISOString()),
            endDate: schedule.endDate ? convertToDate((schedule.endDate as Dayjs).toDate().toISOString()) : null,
          })
        );
      } else {
        formData.append(
          'schedules[]',
          JSON.stringify({
            id: schedule.ID,
            managerID: schedule.managerID,
            startDate: convertToDate(schedule.startDate.toDate().toISOString()),
            endDate: schedule.endDate ? convertToDate((schedule.endDate as Dayjs).toDate().toISOString()) : null,
          })
        );
      }
    });
    data.rooms.forEach((room) => {
      if (room.isDeleted) {
        formData.append('deletedRooms[]', room.ID.toString());
      } else if (room.isNew) {
        formData.append(
          'newRooms[]',
          JSON.stringify({
            floor: room.floor,
            no: room.no,
            status: room.status,
            area: Number(room.area.toString().trim()),
            description: room.description.trim(),
          })
        );
        room.images.forEach((image) => {
          if (image.isNew) {
            formData.append(`newRoomImages[${room.no}]`, (image as UploadFile).originFileObj as File);
          }
        });
      } else {
        formData.append(
          'rooms[]',
          JSON.stringify({
            id: room.ID,
            floor: room.floor,
            no: room.no,
            status: room.status,
            area: Number(room.area.toString().trim()),
            description: room.description.trim(),
          })
        );
        room.images.forEach((image) => {
          if (image.isDeleted) {
            formData.append('deletedRoomImages[]', (image as RoomImage).ID.toString());
          } else if (image.isNew) {
            formData.append(`newRoomImages[${room.no}]`, (image as UploadFile).originFileObj as File);
          }
        });
      }
    });

    await api.common.building.updateBuilding(buildingID, formData);
    editSuccess.value = true;
    step.value++;
  } catch (err: any) {
    step.value = 3;
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

async function getBuildingData() {
  try {
    $event.emit('loading');
    const managerListResponse = await api.common.staff.getList();
    const scheduleResponse = await api.common.building.getSchedule(buildingID);
    const buildingInforResponse = await api.common.building.getDetail(buildingID);

    buildingInfo.value.data.ID = buildingInforResponse.data.ID;
    buildingInfo.value.data.name = buildingInforResponse.data.name;
    buildingInfo.value.data.address = buildingInforResponse.data.address;
    buildingInfo.value.data.images = buildingInforResponse.data.images.map((image) => {
      return {
        ...image,
        isDeleted: false,
        isNew: false,
      };
    });
    buildingInfo.value.data.rooms = buildingInforResponse.data.rooms
      .map((room) => {
        return {
          ...room,
          images: room.images.map((image) => {
            return {
              ...image,
              isDeleted: false,
              isNew: false,
            };
          }),
          isDeleted: false,
          isNew: false,
        };
      })
      .sort((a, b) => a.no - b.no);
    buildingInfo.value.data.services = buildingInforResponse.data.services.map((service) => {
      return {
        ...service,
        isDeleted: false,
        isNew: false,
      };
    });
    buildingInfo.value.data.schedules = scheduleResponse.data
      .sort(
        (a, b) =>
          new Date(b.startDate as string).getTime() - new Date(a.startDate as string).getTime() ||
          new Date((b.endDate as NullTime).Valid ? ((b.endDate as NullTime).Time! as string) : '2100-01-01').getTime() -
            new Date((a.endDate as NullTime).Valid ? ((a.endDate as NullTime).Time! as string) : '2100-01-01').getTime()
      )
      .map((schedule) => {
        return {
          ID: schedule.ID,
          createdAt: schedule.createdAt,
          createdBy: schedule.createdBy,
          updatedAt: schedule.updatedAt,
          updatedBy: schedule.updatedBy,
          buildingID: schedule.buildingID,
          managerID: schedule.managerID,
          managerNo: schedule.manager.no,
          startDate: dayjs(schedule.startDate as string),
          endDate: (schedule.endDate as NullTime).Valid ? dayjs((schedule.endDate as NullTime).Time as string) : '',
          isDeleted: false,
          isNew: false,
        };
      });
    // buildingInfo.value.data.schedules.forEach((schedule) => {
    //   schedule.startDate = dayjs(schedule.startDate as string);
    //   schedule.endDate = (schedule.endDate as NullTime).Valid
    //     ? dayjs((schedule.endDate as NullTime).Time as string)
    //     : '';
    // });
    originalBuildingInfo.value = JSON.parse(JSON.stringify(buildingInfo.value));
    managers.value = managerListResponse.data;

    // if (buildingInforResponse.data.rooms.length) {
    //   buildingInforResponse.data.rooms.forEach((room) => {
    //     if (!floors.value.find((floor) => floor.value === room.floor)) {
    //       floors.value.push({
    //         value: room.floor,
    //         disable: true,
    //       });
    //     }
    //   });
    // }
    for (let i = 1; i <= buildingInforResponse.data.totalFloor; i++) {
      floors.value.push({
        value: i,
        disable: true,
      });
    }
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
    $event.emit('loading');
  }
}

// ---------------------- Watchers ----------------------
watch(step, () => {
  if (step.value === 2) {
    if (!checkStep1()) {
      step.value = 1;
    }
  }
  if (step.value === 3) {
    if (!checkStep2()) {
      step.value = 2;
    }
  }
});

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  await getBuildingData();

  if (buildingInfo.value.data.ID === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});
</script>

<style lang="css" scoped>
.step_title{
  color:rgba(0, 0, 0, 0.5);
}

.step_title_selected{
  color:black;
}

.step_title_dark{
  color:rgba(255, 255, 255, 0.45);
}

.step_title_selected_dark{
  color:white;
}

.step_number{
  color:rgba(0, 0, 0, 0.5);
  font-size:13px;
  height:18px;
}

.step_number_dark{
  color:rgba(255, 255, 255, 0.65);
  font-size:13px;
  height:18px;
}

.step_number_selected{
  color:white;
  font-size:13px;
  height:18px;
}

.step_number_selected_dark{
  color:white;
  font-size:13px;
  height:18px;
}

.step_number_background{
  background-color: rgba(0, 0, 0, 0.06);
}

.step_number_background_dark{
  background-color: rgba(255, 255, 255, 0.12);
}

.step_number_background_selected{
  background-color: rgb(22, 119, 255);
}

.step_number_background_completed{
  background-color:rgb(230, 244, 255);
}

.step_number_background_completed_dark{
  background-color: rgb(17, 26, 44);
}

.custom_step:hover .step_number_background,
.custom_step:hover .step_number_background_dark,
.custom_step:hover .step_number_background_selected,
.custom_step:hover .step_number_background_completed,
.custom_step:hover .step_number_background_completed_dark{
  border: 1px solid #1890ff !important;
}

.custom_step:hover .step_number,
.custom_step:hover .step_title,
.custom_step:hover .step_number_dark,
.custom_step:hover .step_title_dark,
.custom_step:hover .step_number_selected,
.custom_step:hover .step_title_selected,
.custom_step:hover .step_number_selected_dark,
.custom_step:hover .step_title_selected_dark{
  color:#1890ff !important;
}

.step_border_transitition{
  transition:background-color 0.3s ease,border-color 0.3s ease;
}
</style>
