<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td class="text-sm text-center align-middle py-[16px]">
      <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox :checked="checked" @click="checked ? removeFromBucket() : addToBucket()"></a-checkbox>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        {{ props.index + 1 }}
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-input v-model:value="floor.name" size="small" :placeholder="$t('enter_floor_name')" type="text" />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="h-[20px]">
        <CloseCircleOutlined class="text-red-500 cursor-pointer text-lg" @click="removeFloor" />
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { UploadFile } from '~/types/upload_file';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  floor: {
    type: Object as PropType<{
      name: string;
      rooms: {
        no: number;
        status: number;
        area: number;
        description: string;
        images: UploadFile[];
      }[];
    }>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  floorDeleteBucket: {
    type: Array as PropType<number[]>,
    required: true,
  },
});
const floor = toRef(props, 'floor');
const { $event } = useNuxtApp();
const checked = computed(() => props.floorDeleteBucket.includes(props.index));

// ---------------------- Functions ----------------------
function removeFloor() {
  $event.emit('deleteFloorFromList', props.index);
}

function addToBucket() {
  $event.emit('addFloorToDeleteBucket', props.index);
}

function removeFromBucket() {
  $event.emit('removeFloorFromDeleteBucket', props.index);
}
</script>
