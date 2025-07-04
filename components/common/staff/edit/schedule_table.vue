<template>
  <div class="mt-5">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
      <div class="flex items-center">
        <a-button
          class="flex items-center justify-center w-8 h-8 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
          @click="resetTable"
        >
          <UndoOutlined />
        </a-button>
        <a-button
          type="primary"
          danger
          class="flex items-center justify-center w-8 h-8 rounded-sm mx-2"
          :disabled="scheduleDeleteBucket.length === 0"
          @click="
            () => {
              $event.emit('deleteItem', {
                callback: deleteSchedules,
                noPasswordRequired: true,
              });
            }
          "
          ><DeleteOutlined
        /></a-button>
        <a-button
          type="primary"
          class="flex items-center justify-center w-8 h-8 rounded-sm"
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
        <tbody v-if="schedules.data.filter((schedule) => !schedule.isDeleted).length">
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
        <tbody v-else>
          <tr class="h-[150px]">
            <td :colspan="100" class="border-b-[1px]" :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']">
              <div class="h-full w-full">
                <div
                  class="flex flex-col items-center justify-center overflow-hidden"
                  :style="{ width: `${leftSizeWidth - 2}px` }"
                >
                  <svg v-if="lightMode" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                      <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                      <g fill-rule="nonzero" stroke="#d9d9d9">
                        <path
                          d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                        ></path>
                        <path
                          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                          fill="#fafafa"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                      <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                      <g fill-rule="nonzero" stroke="#3e3e3e">
                        <path
                          d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                        ></path>
                        <path
                          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                          fill="#1d1d1d"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                    {{ $t('no_data') }}
                  </p>
                </div>
              </div>
            </td>
          </tr>
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

  return !!(currentPage.length && currentPage.every((schedule) => scheduleDeleteBucket.value.includes(schedule.ID)));
});
const leftSizeWidth = ref(0);

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

function resetTable() {
  addCounter.value = 0;
  current.value = 1;
  scheduleDeleteBucket.value = [];
  const originalSchedules = JSON.parse(JSON.stringify(props.originalSchedules));
  originalSchedules.forEach((schedule: any) => {
    schedule.start = dayjs(schedule.start as string);
    schedule.end = (schedule.end as NullTime).Valid ? dayjs((schedule.end as NullTime).Time as string) : '';
  });
  schedules.value.data = originalSchedules;
  props.formRef.clearValidate();
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

$event.on('staffDetailCancelEditMode', resetTable);

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      leftSizeWidth.value = entry.contentRect.width;
    }
  });

  resizeObserver.observe(document.getElementById('left_side')!);
});
</script>
