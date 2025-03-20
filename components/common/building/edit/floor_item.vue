<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td v-if="!props.readOnly" class="text-sm text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox
          :id="`check_floor_${props.floor.value}`"
          :checked="checked"
          :disabled="props.floor.disable"
          @click="checked ? removeFromBucket() : addToBucket()"
        ></a-checkbox>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        {{ props.floor.value }}
      </div>
    </td>
    <td v-if="userRole?.toString() === roles.owner" class="text-sm font-normal text-center align-middle py-[16px]">
      <div :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <p v-if="!floor.disable" class="text-red-500">{{ $t('new') }}</p>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { roles } from '~/consts/roles';

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  floor: {
    required: true,
    type: Object as PropType<{
      value: number;
      disable: boolean;
    }>,
  },
  floorDeleteBucket: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const { $event } = useNuxtApp();
const checked = computed(() => props.floorDeleteBucket.includes(props.floor.value));

// ---------------------- Functions ----------------------
function addToBucket() {
  $event.emit('addFloorToDeleteBucket', props.floor.value);
}

function removeFromBucket() {
  $event.emit('removeFloorFromDeleteBucket', props.floor.value);
}
</script>
