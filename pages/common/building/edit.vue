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
      class="flex-1 flex flex-col px-4 mt-5 overflow-auto"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <ClientOnly>
        <div v-show="step === 1" class="flex-1">
          <CommonBuildingEditStep1
            :building-info="buildingInfo"
            :managers="managers"
            :schedules="schedules"
            :remove-items="removeItems"
            :add-items="addItems"
            :floors="floors"
          />
        </div>
        <div v-show="step === 2" class="flex-1"></div>
        <div v-show="step === 3" class="flex-1"></div>
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
                updateBuilding();
              }
            }
          "
          >{{ $t('next') }}</a-button
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
import type { Building } from '~/types/building';
import type { ManagerSchedule, User } from '~/types/user';
import type { UploadFile } from 'ant-design-vue';
import Success from '~/public/svg/success.svg';

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
const buildingInfo = ref<Building>({
  name: '',
  address: '',
  images: [],
  rooms: [],
  services: [],
} as unknown as Building);
const schedules = ref<ManagerSchedule[]>([]);
const managers = ref<User[]>([]);
const editSuccess = ref<boolean>(false);
const removeItems = ref({
  buildingImages: [] as number[],
  roomImages: [] as number[],
  rooms: [] as number[],
  schedules: [] as number[],
  services: [] as number[],
});
const addItems = ref({
  buildingImages: [] as UploadFile[],
  roomImages: [] as {
    roomID: number;
    images: UploadFile[];
  }[],
  rooms: [] as {
    ID: number;
    status: number;
    area: number | string;
    description: string;
    images: UploadFile[];
    floor: number;
  }[],
  schedules: [] as {
    ID: number;
    managerID: number;
    managerNo: string | undefined;
    start: string | undefined;
    end: string | undefined;
  }[],
  services: [] as {
    ID: number;
    name: string;
    price: number | string;
  }[],
});
const floors = ref<
  {
    value: number;
    disable: boolean;
  }[]
>([]);

// ---------------------- Functions ----------------------
function checkStep1(): boolean {
  console.log(buildingInfo.value);
  console.log(addItems.value);
  console.log(removeItems.value);
  console.log(schedules.value);
  if (buildingInfo.value.name === '') {
    notification.error({
      message: t('empty_building_name'),
    });
    return false;
  }
  if (buildingInfo.value.address === '') {
    notification.error({
      message: t('empty_building_address'),
    });
    return false;
  }
  if (
    buildingInfo.value.images.length -
      removeItems.value.buildingImages.length +
      addItems.value.buildingImages.length ===
    0
  ) {
    notification.error({
      message: t('building_image_require'),
    });
    return false;
  }
  const services: {
    ID: number;
    name: string;
    price: number | string;
  }[] = [];
  services.push(
    ...addItems.value.services.map((service) => {
      return {
        ID: service.ID,
        name: service.name,
        price: service.price,
      };
    }),
    ...buildingInfo.value.services.map((service) => {
      return {
        ID: service.ID,
        name: service.name,
        price: service.price,
      };
    })
  );
  removeItems.value.services.forEach((serviceID) => {
    services.splice(
      services.findIndex((service) => service.ID === serviceID),
      1
    );
  });
  if (services.find((service) => service.name === '') !== undefined) {
    notification.error({
      message: t('empty_service_name', {
        no: services.findIndex((service) => service.name === '') + 1,
      }),
    });
    return false;
  }
  if (services.find((service) => service.price === '') !== undefined) {
    notification.error({
      message: t('empty_service_price', {
        no: services.findIndex((service) => service.price === '') + 1,
      }),
    });
    return false;
  }
  if (services.find((service) => service.price !== '' && Number(service.price) <= 0) !== undefined) {
    notification.error({
      message: t('zero_service_price', {
        no: services.findIndex((service) => service.price !== '' && Number(service.price) <= 0) + 1,
      }),
    });
    return false;
  }
  const shedules: {
    ID: number;
    managerID: number;
    managerNo: string | undefined;
    start: string | undefined;
    end: string | undefined;
  }[] = [];
  schedules.push();

  return true;
}

function checkStep2(): boolean {
  return true;
}

async function updateBuilding() {}

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
  try {
    $event.emit('loading');
    const managerListResponse = await api.common.staff.getList();
    const scheduleResponse = await api.common.building.getSchedule(buildingID);
    const buildingInforResponse = await api.common.building.getDetail(buildingID);

    buildingInfo.value = buildingInforResponse.data;
    schedules.value = scheduleResponse.data.sort(
      (a, b) =>
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime() ||
        new Date(b.end_date.Valid ? b.end_date.Time! : '2100-01-01').getTime() -
          new Date(a.end_date.Valid ? a.end_date.Time! : '2100-01-01').getTime()
    );
    managers.value = managerListResponse.data;

    if (buildingInfo.value.rooms.length) {
      buildingInfo.value.rooms.forEach((room) => {
        if (!floors.value.find((floor) => floor.value === room.floor)) {
          floors.value.push({
            value: room.floor,
            disable: true,
          });
        }
      });
    }
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
    $event.emit('loading');
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
