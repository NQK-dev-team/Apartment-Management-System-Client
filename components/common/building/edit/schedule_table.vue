<template>
  <div class="mt-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
      <div class="flex items-center">
        <a-button type="primary" danger class="flex items-center justify-center w-10 h-10 rounded-sm" @click="() => {}"
          ><DeleteOutlined
        /></a-button>
        <a-button type="primary" class="ms-2 flex items-center justify-center w-10 h-10 rounded-sm"
          ><PlusOutlined
        /></a-button>
      </div>
    </div>
    <div class="mt-3 mb-8">
      <table class="w-full">
        <thead
          class="border-b-[1px]"
          :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
        >
          <tr>
            <th class="text-sm text-center align-middle py-[16px] rounded-tl-lg w-[40px]">
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                <a-checkbox
                  id="check_all_schedules_1"
                  :checked="checkAllSchedules"
                  @click="() => (checkAllSchedules ? removeAllSchedulesFromBucket() : addAllSchedulesToBucket())"
                ></a-checkbox>
              </div>
            </th>
            <th class="text-sm font-normal text-center align-middle py-[16px]">
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                {{ $t('no') }}
              </div>
            </th>
            <th class="text-sm font-normal text-center align-middle py-[16px]">
              <div
                class="border-r-[1px] h-[20px] flex items-center justify-center"
                :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
              >
                {{ $t('employee') }}
                <div class="flex items-center">
                  <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                </div>
              </div>
            </th>
            <th class="text-sm font-normal text-center align-middle py-[16px]">
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                {{ $t('email') }}
              </div>
            </th>
            <th class="text-sm font-normal text-center align-middle py-[16px]">
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                {{ $t('phone') }}
              </div>
            </th>
            <th class="text-sm font-normal text-center align-middle py-[16px]">
              <div
                class="border-r-[1px] h-[20px] flex items-center justify-center"
                :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
              >
                {{ $t('start_date') }}
                <div class="flex items-center">
                  <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                </div>
              </div>
            </th>
            <th class="text-sm font-normal text-center align-middle py-[16px]">
              <div
                class="border-r-[1px] h-[20px] flex items-center justify-center"
                :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
              >
                {{ $t('end_date') }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- <CommonBuildingAddScheduleItem
                v-for="(schedule, index) in buildingInfo.schedules"
                :key="index"
                :index="index"
                :schedule="schedule"
                :schedule-delete-bucket="scheduleDeleteBucket"
                :managers="props.managers"
              /> -->
        </tbody>
      </table>
    </div>
    <p>{{ $t('total') }}: {{}}</p>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { Building } from '~/types/building';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';
import type { ManagerSchedule, User } from '~/types/user';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<Building>,
    required: true,
  },
  managers: {
    type: Array as PropType<User[]>,
    required: true,
  },
  schedules: {
    type: Array as PropType<ManagerSchedule[]>,
    required: true,
  },
  removeItems: {
    type: Object as PropType<{
      buildingImages: number[];
      roomImages: number[];
      rooms: number[];
      schedules: number[];
      services: number[];
    }>,
    required: true,
  },
  addItems: {
    required: true,
    type: Object as PropType<{
      buildingImages: UploadFile[];
      roomImages: {
        roomID: number;
        images: UploadFile[];
      }[];
      rooms: {
        status: number;
        area: number | string;
        description: string;
        images: UploadFile[];
        floor: number;
      }[];
      schedules: {
        managerID: number;
        managerNo: string | undefined;
        start: string | undefined;
        end: string | undefined;
      }[];
      services: {
        name: string;
        price: number | string;
      }[];
    }>,
  },
});
const checkAllSchedules = computed(
  // () =>
  //   !!(buildingInfo.value.schedules.length && buildingInfo.value.schedules.length === scheduleDeleteBucket.value.length)
  () => false
);
// const scheduleDeleteBucket = ref<number[]>([]);

// ---------------------- Functions ----------------------
function deleteSchedules() {
  // buildingInfo.value.schedules = buildingInfo.value.schedules.filter(
  //   (_, index) => !scheduleDeleteBucket.value.includes(index)
  // );
  // scheduleDeleteBucket.value = [];
}

function addAllSchedulesToBucket() {
  // scheduleDeleteBucket.value = buildingInfo.value.schedules.map((_, index) => index);
}

function removeAllSchedulesFromBucket() {
  // scheduleDeleteBucket.value = [];
}

// ---------------------- Event Listeners ----------------------
$event.on('addScheduleToDeleteBucket', (e: any) => {
  // if (!scheduleDeleteBucket.value.includes(e)) {
  //   scheduleDeleteBucket.value.push(e);
  // }
});

$event.on('removeScheduleFromDeleteBucket', (e: any) => {
  // scheduleDeleteBucket.value = scheduleDeleteBucket.value.filter((idx) => idx !== e);
});
</script>
