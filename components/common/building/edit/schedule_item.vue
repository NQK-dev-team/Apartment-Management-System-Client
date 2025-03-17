<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td v-if="!props.readOnly" class="text-sm text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox
          :id="`check_schedule_${props.index + 1}`"
          :checked="checked"
          @click="checked ? removeFromBucket() : addToBucket()"
        ></a-checkbox>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        {{ props.index + 1 }}
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3 w-[350px]">
          <a-select
            v-if="!props.readOnly"
            :id="`schedule_${props.index + 1}_manager_no_1`"
            v-model:value="schedule.managerNo"
            class="w-full text-left"
            show-search
            :options="[
              ...props.managers.map((manager) => ({
                value: manager.no,
                label: `${manager.no} - ${getUserName(manager)}`,
              })),
            ]"
            :placeholder="$t('search_by_employee_no')"
            @change="schedule.managerID = props.managers.find((manager) => manager.no === schedule.managerNo)?.ID ?? 0"
          ></a-select>
          <a-select
            v-else
            :id="`schedule_${props.index + 1}_manager_no_3`"
            :value="schedule.managerNo"
            class="w-full text-left"
            show-search
            :placeholder="$t('search_by_employee_no')"
            :options="
              props.managers.map((manager) => ({
                value: manager.no,
                label: `${manager.no} - ${getUserName(manager)}`,
              }))
            "
            disabled
            readonly
          ></a-select>
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-input
            v-if="!props.readOnly"
            :id="`schedule_${props.index + 1}_manager_email_1`"
            :value="managers.find((manager: User) => manager.no === schedule.managerNo)?.email ?? ''"
            disabled
            readonly
          ></a-input>
          <a-input
            v-else
            :id="`schedule_${props.index + 1}_manager_email_3`"
            :value="managers.find((manager: User) => manager.no === schedule.managerNo)?.email ?? ''"
            disabled
            readonly
          ></a-input>
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-input
            v-if="!props.readOnly"
            :id="`schedule_${props.index + 1}_manager_phone_1`"
            :value="managers.find((manager: User) => manager.no === schedule.managerNo)?.phone ?? ''"
            disabled
            readonly
          ></a-input>
          <a-input
            v-else
            :id="`schedule_${props.index + 1}_manager_phone_3`"
            :value="managers.find((manager: User) => manager.no === schedule.managerNo)?.phone ?? ''"
            disabled
            readonly
          ></a-input>
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-date-picker
            v-if="!props.readOnly"
            :id="`schedule_${props.index + 1}_start_1`"
            v-model:value="schedule.start_date"
            class="w-full"
          ></a-date-picker>
          <a-date-picker
            v-else
            :id="`schedule_${props.index + 1}_start_3`"
            :value="schedule.start_date"
            class="w-full"
            disabled
            readonly
          ></a-date-picker>
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-date-picker
            v-if="!props.readOnly"
            :id="`schedule_${props.index + 1}_end_1`"
            v-model:value="schedule.end_date"
            class="w-full"
          ></a-date-picker>
          <a-date-picker
            v-else
            :id="`schedule_${props.index + 1}_end_3`"
            :value="schedule.end_date"
            class="w-full"
            disabled
            readonly
          ></a-date-picker>
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <p v-if="schedule.ID <= 0" class="text-red-500">{{ $t('new') }}</p>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { User } from '~/types/user';
import type { Dayjs } from 'dayjs';
import type { BasicModel } from '~/types/basic_model';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  schedule: {
    type: Object as PropType<
      BasicModel & {
        start_date: string | Dayjs;
        end_date: Dayjs | string;
        managerID: number;
        managerNo: string;
        buildingID: number;
        isDeleted: boolean;
        isNew: boolean;
      }
    >,
    required: true,
  },
  scheduleDeleteBucket: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  managers: {
    type: Array as PropType<User[]>,
    required: true,
  },
});
const { $event } = useNuxtApp();
const schedule = toRef(props, 'schedule');
const checked = computed(() => props.scheduleDeleteBucket.includes(schedule.value.ID));

// ---------------------- Functions ----------------------
function addToBucket() {
  $event.emit('addScheduleToDeleteBucket', schedule.value.ID);
}

function removeFromBucket() {
  $event.emit('removeScheduleFromDeleteBucket', schedule.value.ID);
}
</script>
