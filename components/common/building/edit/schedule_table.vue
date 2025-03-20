<template>
  <div class="mt-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
      <div v-if="userRole?.toString() === roles.owner && !props.readOnly" class="flex items-center">
        <a-button
          class="flex items-center justify-center w-10 h-10 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
          @click="
            () => {
              current = 1;
              const originalSchedules = JSON.parse(JSON.stringify(originalBuildingInfo.data.schedules));
              originalSchedules.forEach((schedule: any) => {
                schedule.startDate = dayjs(schedule.startDate as string);
                schedule.endDate = (schedule.endDate as NullTime).Valid
                  ? dayjs((schedule.endDate as NullTime).Time as string)
                  : '';
              });
              buildingInfo.data.schedules = originalSchedules;
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
              buildingInfo.data.schedules = [
                {
                  ID: -addCounter,
                  createdAt: '',
                  createdBy: 0,
                  updatedAt: '',
                  updatedBy: 0,
                  buildingID: buildingID,
                  managerID: 0,
                  startDate: '',
                  endDate: '',
                  isDeleted: false,
                  isNew: true,
                } as unknown as EditManagerSchedule,
                ...buildingInfo.data.schedules,
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
            <th
              v-if="!props.readOnly && userRole?.toString() === roles.owner"
              class="text-sm text-center align-middle py-[16px] rounded-tl-lg w-[40px]"
            >
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
            <th
              v-if="userRole?.toString() === roles.owner"
              class="text-sm font-normal text-center align-middle py-[16px] w-[75px]"
            >
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                {{ $t('note') }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <CommonBuildingEditScheduleItem
            v-for="(schedule, index) in buildingInfo.data.schedules.filter((schedule) => !schedule.isDeleted)"
            v-show="current * 10 >= index + 1 && (current - 1) * 10 < index + 1"
            :key="index"
            :index="index"
            :schedule-delete-bucket="scheduleDeleteBucket"
            :managers="props.managers"
            :read-only="props.readOnly || userRole?.toString() !== roles.owner"
            :schedule="schedule as any"
            :step="props.step"
          />
        </tbody>
      </table>
      <div
        v-if="buildingInfo.data.schedules.filter((schedule) => !schedule.isDeleted).length > 10"
        class="flex items-center justify-end mt-5"
      >
        <a-pagination
          v-model:current="current"
          :total="buildingInfo.data.schedules.filter((schedule) => !schedule.isDeleted).length"
          :page-size="10"
        />
      </div>
    </div>
    <p>{{ $t('total') }}: {{ buildingInfo.data.schedules.filter((schedule) => !schedule.isDeleted).length }}</p>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { EditBuilding, EditManagerSchedule } from '~/types/building';
import type { User } from '~/types/user';
import { roles } from '~/consts/roles';
import dayjs from 'dayjs';
import type { NullTime } from '~/types/basic_model';

// ---------------------- Variables ----------------------
const route = useRoute();
const buildingID = Number(route.params.id as string);
const userRole = useCookie('userRole');
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const current = ref(1);
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
    required: true,
  },
  originalBuildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
    required: true,
  },
  managers: {
    type: Array as PropType<User[]>,
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  step: {
    type: Number,
    required: true,
  },
});
const buildingInfo = toRef(props, 'buildingInfo');
const addCounter = ref(0);
const scheduleDeleteBucket = ref<number[]>([]);
const checkAllSchedules = computed(
  () =>
    !!(
      buildingInfo.value.data.schedules.filter((schedule) => !schedule.isDeleted).length &&
      buildingInfo.value.data.schedules.filter((schedule) => !schedule.isDeleted).length ===
        scheduleDeleteBucket.value.length
    )
);

// ---------------------- Functions ----------------------
function deleteSchedules() {
  buildingInfo.value.data.schedules.forEach((schedule) => {
    if (scheduleDeleteBucket.value.includes(schedule.ID)) {
      if (schedule.isNew) {
        buildingInfo.value.data.schedules = buildingInfo.value.data.schedules.filter((s) => s.ID !== schedule.ID);
      } else {
        schedule.isDeleted = true;
      }
    }
  });

  scheduleDeleteBucket.value = [];
}

function addAllSchedulesToBucket() {
  scheduleDeleteBucket.value = buildingInfo.value.data.schedules
    .filter((schedule) => !schedule.isDeleted)
    .map((schedule) => schedule.ID);
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
