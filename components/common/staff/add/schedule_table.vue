<template>
  <div class="mt-5">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
      <div class="flex items-center">
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
              addCounter++;
              schedules.push({
                ID: addCounter,
                start: '',
                end: '',
                buildingID: undefined,
              });
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
          </tr>
        </thead>
        <tbody>
          <CommonStaffAddScheduleItem
            v-for="(schedule, index) in schedules"
            :key="index"
            :index="index"
            :schedule="schedule"
            :light-mode="lightMode"
            :schedule-delete-bucket="scheduleDeleteBucket"
            :building-list="buildingList"
          />
        </tbody>
      </table>
    </div>
    <p>{{ $t('total') }}: {{ schedules.length }}</p>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { Building } from '~/types/building';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const props = defineProps({
  buildingList: {
    type: Array as PropType<Building[]>,
    required: true,
  },
  schedules: {
    type: Array as PropType<
      {
        ID: number;
        start: string | undefined;
        end: string | undefined;
        buildingID: number | undefined;
      }[]
    >,
    required: true,
  },
});
const addCounter = ref(0);
const schedules = toRef(props, 'schedules');
const scheduleDeleteBucket = ref<number[]>([]);
const checkAllSchedules = computed(
  () => !!(schedules.value.length && schedules.value.length === scheduleDeleteBucket.value.length)
);

// ---------------------- Functions ----------------------
function deleteSchedules() {
  scheduleDeleteBucket.value.forEach((id) => {
    schedules.value.splice(
      schedules.value.findIndex((schedule) => schedule.ID === id),
      1
    );
  });

  scheduleDeleteBucket.value = [];
}

function addAllSchedulesToBucket() {
  scheduleDeleteBucket.value = schedules.value.map((schedule) => schedule.ID);
}

function removeAllSchedulesFromBucket() {
  scheduleDeleteBucket.value = [];
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
