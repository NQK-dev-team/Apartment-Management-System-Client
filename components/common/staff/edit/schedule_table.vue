<template>
  <div class="mt-5">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
      <div class="flex items-center">
        <a-button
          class="flex items-center justify-center w-10 h-10 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
          @click="
            () => {
              addCounter = 0;
              current = 1;
              scheduleDeleteBucket = [];
              const originalSchedules = JSON.parse(JSON.stringify(props.originalSchedules));
              originalSchedules.forEach((schedule: any) => {
                schedule.start = dayjs(schedule.start as string);
                schedule.end = (schedule.end as NullTime).Valid ? dayjs((schedule.end as NullTime).Time as string) : '';
              });
              schedules.data = originalSchedules;
              props.formRef.clearValidate();
            }
          "
        >
          <UndoOutlined />
        </a-button>
        <a-button
          type="primary"
          danger
          class="flex items-center justify-center w-10 h-10 rounded-sm mx-2"
          :disabled="scheduleDeleteBucket.length === 0"
          @click="deleteSchedules"
          ><DeleteOutlined
        /></a-button>
        <a-button
          type="primary"
          class="flex items-center justify-center w-10 h-10 rounded-sm"
          @click="
            () => {
              addCounter--;
              schedules.data = [
                {
                  ID: addCounter,
                  start: '',
                  end: '',
                  buildingID: undefined,
                  isNew: true,
                  isDeleted: false,
                },
                ...schedules.data,
              ];
            }
          "
          ><PlusOutlined
        /></a-button>
      </div>
    </div>
    <div class="mt-3 mb-2">
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
            <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                {{ $t('no') }}
              </div>
            </th>
            <th class="text-sm font-normal text-center align-middle py-[16px]">
              <div
                class="border-r-[1px] h-[20px] flex items-center justify-center"
                :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
              >
                {{ $t('building') }}
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
                {{ $t('startDate') }}
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
                {{ $t('endDate') }}
              </div>
            </th>
            <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                {{ $t('note') }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <CommonStaffEditScheduleItem
            v-for="(schedule, index) in schedules.data.filter((schedule) => !schedule.isDeleted)"
            v-show="current * 10 >= index + 1 && (current - 1) * 10 < index + 1"
            :key="index"
            :index="index"
            :schedule="schedule"
            :light-mode="lightMode"
            :schedule-delete-bucket="scheduleDeleteBucket"
            :building-list="buildingList"
          />
        </tbody>
      </table>
      <div
        v-if="schedules.data.filter((schedule) => !schedule.isDeleted).length > 10"
        class="flex items-center justify-end mt-5"
      >
        <a-pagination
          v-model:current="current"
          :total="schedules.data.filter((schedule) => !schedule.isDeleted).length"
          :page-size="10"
        />
      </div>
    </div>
    <p>{{ $t('total') }}: {{ schedules.data.filter((schedule) => !schedule.isDeleted).length }}</p>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { Building } from '~/types/building';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { NullTime } from '~/types/basic_model';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const current = ref(1);
const { $event } = useNuxtApp();
const props = defineProps({
  buildingList: {
    type: Array as PropType<Building[]>,
    required: true,
  },
  schedules: {
    type: Object as PropType<{
      data: {
        ID: number;
        start: string | Dayjs;
        end: string | Dayjs;
        buildingID: number | undefined;
        isNew: boolean;
        isDeleted: boolean;
      }[];
    }>,
    required: true,
  },
  originalSchedules: {
    type: Array as PropType<
      {
        ID: number;
        start: string | Dayjs;
        end: string | Dayjs;
        buildingID: number | undefined;
        isNew: boolean;
        isDeleted: boolean;
      }[]
    >,
    required: true,
  },
  formRef: {
    type: Object as PropType<any>,
    required: true,
  },
});
const addCounter = ref(0);
const schedules = toRef(props, 'schedules');
const scheduleDeleteBucket = ref<number[]>([]);
const checkAllSchedules = computed(() => {
  const currentPage = schedules.value.data
    .filter((schedule) => !schedule.isDeleted)
    .filter((_, index) => current.value * 10 >= index + 1 && (current.value - 1) * 10 < index + 1);

  return currentPage.every((schedule) => scheduleDeleteBucket.value.includes(schedule.ID));
});

// ---------------------- Functions ----------------------
function deleteSchedules() {
  schedules.value.data.forEach((schedule) => {
    if (scheduleDeleteBucket.value.includes(schedule.ID)) {
      if (schedule.isNew) {
        schedules.value.data = schedules.value.data.filter((s) => s.ID !== schedule.ID);
      } else {
        schedule.isDeleted = true;
      }
    }
  });

  scheduleDeleteBucket.value = [];
}

function addAllSchedulesToBucket() {
  scheduleDeleteBucket.value.push(
    ...schedules.value.data
      .filter((schedule) => !schedule.isDeleted)
      .filter((_, index) => current.value * 10 >= index + 1 && (current.value - 1) * 10 < index + 1)
      .map((schedule) => schedule.ID)
  );
}

function removeAllSchedulesFromBucket() {
  const IDs = schedules.value.data
    .filter((schedule) => !schedule.isDeleted)
    .filter((_, index) => current.value * 10 >= index + 1 && (current.value - 1) * 10 < index + 1)
    .map((schedule) => schedule.ID);

  scheduleDeleteBucket.value = scheduleDeleteBucket.value.filter((id) => !IDs.includes(id));
}

// ---------------------- Event Listeners ----------------------
$event.on('addScheduleToDeleteBucketAddStaff', (e: any) => {
  if (!scheduleDeleteBucket.value.includes(e)) {
    scheduleDeleteBucket.value.push(e);
  }
});

$event.on('removeScheduleFromDeleteBucketAddStaff', (e: any) => {
  scheduleDeleteBucket.value = scheduleDeleteBucket.value.filter((id) => id !== e);
});
</script>
