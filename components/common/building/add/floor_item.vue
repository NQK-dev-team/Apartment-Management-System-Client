<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td v-if="!props.readOnly" class="text-sm text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox
          :id="`check_floor_${props.index + 1}`"
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
  </tr>
</template>

<script lang="ts" setup>
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
const checked = computed(() => props.floorDeleteBucket.includes(props.index));

// ---------------------- Functions ----------------------
function addToBucket() {
  $event.emit('addFloorToDeleteBucket', props.index);
}

function removeFromBucket() {
  $event.emit('removeFloorFromDeleteBucket', props.index);
}
</script>
