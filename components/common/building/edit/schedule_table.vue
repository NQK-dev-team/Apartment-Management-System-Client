<template>
  <div class="mt-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
      <div v-if="userRole?.toString() === roles.owner" class="flex items-center">
        <a-button
          class="flex items-center justify-center w-10 h-10 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
          @click="
            () => {
              removeItems.schedules = [];
              addItems.schedules = [];
              current = 1;
            }
          "
        >
          <UndoOutlined />
        </a-button>
        <a-button
          type="primary"
          danger
          class="flex items-center justify-center w-10 h-10 rounded-sm mx-2"
          @click="
            () => {
              $event.emit('openDeleteModalEditBuilding', deleteSchedules);
            }
          "
          ><DeleteOutlined
        /></a-button>
        <a-button
          type="primary"
          class="flex items-center justify-center w-10 h-10 rounded-sm"
          @click="
            () => {
              addCounter++;
              addItems.schedules.push({ ID: -addCounter, managerID: 0, managerNo: '', start: '', end: '' });
            }
          "
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
            <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                {{ $t('note') }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <CommonBuildingEditScheduleItem
            v-for="(schedule, index) in displaySchedules"
            v-show="current * 10 >= index + 1 && (current - 1) * 10 < index + 1"
            :key="index"
            :index="index"
            :schedule="schedule"
            :schedule-delete-bucket="scheduleDeleteBucket"
            :managers="props.managers"
            :add-items="addItems"
            :schedules="props.schedules"
          />
        </tbody>
      </table>
      <div class="flex items-center justify-end mt-5">
        <a-pagination v-model:current="current" :total="displaySchedules.length" :page-size="10" />
      </div>
    </div>
    <p>{{ $t('total') }}: {{ displaySchedules.length }}</p>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { Building } from '~/types/building';
import type { UploadFile } from 'ant-design-vue/es/upload/interface';
import type { ManagerSchedule, User } from '~/types/user';
import { roles } from '~/consts/roles';
import dayjs from 'dayjs';

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const current = ref(1);
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
        ID: number;
        managerID: number;
        managerNo: string | undefined;
        start: string | undefined;
        end: string | undefined;
      }[];
      services: {
        ID: number;
        name: string;
        price: number | string;
      }[];
    }>,
  },
});
const removeItems = toRef(props, 'removeItems');
const displaySchedules = computed(() => {
  const result: {
    ID: number;
    managerID: number;
    managerNo: string | undefined;
    start: any;
    end: any;
  }[] = [];

  result.push(
    ...props.addItems.schedules.map((schedule) => {
      return {
        ID: schedule.ID,
        managerID: schedule.managerID,
        managerNo: schedule.managerNo,
        start: schedule.start ?? '',
        end: schedule.end ?? '',
      };
    })
  );

  result.push(
    ...props.schedules.map((schedule) => {
      return {
        ID: schedule.ID,
        managerID: schedule.managerID,
        managerNo: schedule.manager.no,
        start: schedule.start_date ? dayjs(schedule.start_date) : '',
        end: schedule.end_date.Valid ? (dayjs(schedule.end_date.Time) ?? '') : '',
      };
    })
  );

  removeItems.value.schedules.forEach((ID) => {
    result.splice(
      result.findIndex((schedule) => schedule.ID === ID),
      1
    );
  });

  return result;
});
const addCounter = ref(0);
const addItems = toRef(props, 'addItems');
const scheduleDeleteBucket = ref<number[]>([]);
const checkAllSchedules = computed(
  () => !!(displaySchedules.value.length && displaySchedules.value.length === scheduleDeleteBucket.value.length)
);

// ---------------------- Functions ----------------------
function deleteSchedules() {
  scheduleDeleteBucket.value.forEach((ID) => {
    if (ID <= 0) {
      addItems.value.schedules = addItems.value.schedules.filter((schedule) => schedule.ID !== ID);
    } else {
      removeItems.value.schedules.push(ID);
    }
  });
  scheduleDeleteBucket.value = [];
}

function addAllSchedulesToBucket() {
  scheduleDeleteBucket.value = displaySchedules.value.map((schedule) => schedule.ID);
}

function removeAllSchedulesFromBucket() {
  scheduleDeleteBucket.value = [];
}

// ---------------------- Event Listeners ----------------------
$event.on('addScheduleToDeleteBucket', (e: any) => {
  if (!scheduleDeleteBucket.value.includes(e)) {
    scheduleDeleteBucket.value.push(e);
  }
});

$event.on('removeScheduleFromDeleteBucket', (e: any) => {
  scheduleDeleteBucket.value = scheduleDeleteBucket.value.filter((id) => id !== e);
});
</script>
