<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td v-if="!props.readOnly" class="text-sm text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox
          :id="`check_service_${props.index + 1}`"
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
        <div class="px-3">
          <a-input
            v-if="!props.readOnly"
            :id="`service_${props.index + 1}_name_1`"
            v-model:value="service.name"
            :placeholder="$t('enter_service_name')"
            type="text"
          />
          <a-input
            v-else
            :id="`service_${props.index + 1}_name_3`"
            :value="service.name"
            :placeholder="$t('enter_service_name')"
            type="text"
            disabled
            readonly
          />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-input
            v-if="!props.readOnly"
            :id="`service_${props.index + 1}_price_1`"
            :placeholder="$t('enter_service_price')"
            type="number"
            :min="0"
            @change="
              (e: any) => {
                service.price = e.target.value ?? '';
              }
            "
          />
          <a-input
            v-else
            :id="`service_${props.index + 1}_price_3`"
            :value="service.price"
            :placeholder="$t('enter_service_price')"
            type="number"
            :min="0"
            disabled
            readonly
          />
        </div>
      </div>
    </td>
    <td v-if="!props.readOnly" class="text-sm font-normal text-center align-middle py-[16px]">
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
      price: number | string;
    }>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  serviceDeleteBucket: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  readOnly: {
    type: Boolean,
    default: false,
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
