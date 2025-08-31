<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td class="text-sm text-center align-middle py-[16px]">
      <a-form-item class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox
          :id="`check_schedule_${props.index + 1}`"
          :checked="checked"
          @click="checked ? removeFromBucket() : addToBucket()"
        ></a-checkbox>
      </a-form-item>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <a-form-item class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        {{ props.index + 1 }}
      </a-form-item>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <a-form-item
        class="border-r-[1px] align_validation_message_start"
        :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
        :name="['schedules', props.index, 'buildingID']"
        :rules="[{ required: true, message: $t('please_select_a_building'), trigger: 'blur' }]"
      >
        <div class="px-3 w-full">
          <a-select
            :id="`schedule_${props.index + 1}_building`"
            v-model:value="schedule.buildingID"
            class="w-full text-left"
            :options="[
              ...props.buildingList.map((building: Building, idx) => ({
                label: building.name,
                value: building.ID,
                id: `schedule_${props.index + 1}_building_${idx + 1}`,
                name: `schedule_${props.index + 1}_building_${idx + 1}`,
              })),
            ]"
            :placeholder="$t('select_building')"
          ></a-select>
        </div>
      </a-form-item>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <a-form-item
        class="border-r-[1px] align_validation_message_start"
        :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
        :name="['schedules', props.index, 'start']"
        :rules="[{ required: true, message: $t('please_pick_start_date'), trigger: 'blur' }]"
      >
        <div class="px-3">
          <a-date-picker
            :id="`schedule_${props.index + 1}_start`"
            v-model:value="schedule.start"
            class="w-full"
          ></a-date-picker>
        </div>
      </a-form-item>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <a-form-item
        class="align_validation_message_start"
        :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
        :name="['schedules', props.index, 'end']"
        :rules="[
          {
            validator: (_, value) => validationRules.checkScheduleEndDate(_, value, $t, schedule.start),
            trigger: 'blur',
          },
        ]"
      >
        <div class="px-3">
          <a-date-picker
            :id="`schedule_${props.index + 1}_end`"
            v-model:value="schedule.end"
            class="w-full"
          ></a-date-picker>
        </div>
      </a-form-item>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { validationRules } from '~/consts/validation_rules';
import type { Building } from '~/types/building';

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
  buildingList: {
    type: Array as PropType<Building[]>,
    required: true,
  },
  schedule: {
    type: Object as PropType<{
      ID: number;
      start: string | undefined;
      end: string | undefined;
      buildingID: number | undefined;
    }>,
    required: true,
  },
  scheduleDeleteBucket: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
});
const { $event } = useNuxtApp();
const schedule = toRef(props, 'schedule');
const checked = computed(() => props.scheduleDeleteBucket.includes(schedule.value.ID));

// ---------------------- Functions ----------------------
function addToBucket() {
  $event.emit('addScheduleToDeleteBucketAddStaff', schedule.value.ID);
}

function removeFromBucket() {
  $event.emit('removeScheduleFromDeleteBucketAddStaff', schedule.value.ID);
}
</script>
