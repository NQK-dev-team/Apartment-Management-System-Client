<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td class="text-sm text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox :checked="checked" @click="checked ? removeFromBucket() : addToBucket()"></a-checkbox>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        {{ props.index + 1 }}
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-input v-model:value="service.name" :placeholder="$t('enter_service_name')" type="text" />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-input
            v-model:value="service.price"
            :placeholder="$t('enter_service_price')"
            type="number"
            :min="0"
          />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="h-[20px]">
        <CloseCircleOutlined class="text-red-500 cursor-pointer text-lg" @click="removeService" />
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
  service: {
    type: Object as PropType<{
      name: string;
      price: number;
    }>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  serviceDeleteBucket: {
    type: Array as PropType<number[]>,
    required: true,
  },
});
const service = toRef(props, 'service');
const { $event } = useNuxtApp();
const checked = computed(() => props.serviceDeleteBucket.includes(props.index));

// ---------------------- Functions ----------------------
function removeService() {
  $event.emit('deleteServiceFromList', props.index);
}

function addToBucket() {
  $event.emit('addServiceToDeleteBucket', props.index);
}

function removeFromBucket() {
  $event.emit('removeServiceFromDeleteBucket', props.index);
}
</script>
