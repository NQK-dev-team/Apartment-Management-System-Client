<template>
  <div class="mt-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('service_list') }}</h2>
      <div class="flex items-center">
        <a-button type="primary" danger class="flex items-center justify-center w-10 h-10 rounded-sm" @click="() => {}"
          ><DeleteOutlined
        /></a-button>
        <a-button type="primary" class="ms-2 flex items-center justify-center w-10 h-10 rounded-sm"
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
                <a-checkbox id="check_all_services_1"></a-checkbox>
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
                {{ $t('service_name') }}
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
                {{ $t('service_price') }}
                <div class="flex items-center">
                  <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- <CommonBuildingAddServiceItem
                v-for="(service, index) in buildingInfo.services"
                :key="index"
                :index="index"
                :service="service"
                :service-delete-bucket="serviceDeleteBucket"
              /> -->
        </tbody>
      </table>
    </div>
    <p>{{ $t('total') }}: {{ displayServices.length }}</p>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { Building } from '~/types/building';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<Building>,
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
        managerID: number;
        managerNo: string | undefined;
        start: string | undefined;
        end: string | undefined;
      }[];
      services: {
        name: string;
        price: number | string;
      }[];
    }>,
  },
});
const displayServices = computed(() => {
  const result: {
    ID: number;
    name: string;
    price: number | string;
  }[] = [];

  result.push(
    ...props.buildingInfo.services.map((service) => {
      return {
        ID: service.ID,
        name: service.name,
        price: service.price,
      };
    })
  );

  props.buildingInfo.services.forEach((service) => {
    if (props.removeItems.services.includes(service.ID)) {
      result.splice(
        result.findIndex((elemet) => elemet.ID === service.ID),
        1
      );
    }
  });

  result.push(
    ...props.addItems.services.map((service) => {
      return {
        ID: 0,
        name: service.name,
        price: service.price,
      };
    })
  );

  return result;
});
const checkAllServices = computed(
  // () => !!(buildingInfo.value.services.length && buildingInfo.value.services.length === serviceDeleteBucket.value.length)
  () => false
);
// const serviceDeleteBucket = ref<number[]>([]);

// ---------------------- Functions ----------------------
function deleteServices() {
  // buildingInfo.value.services = buildingInfo.value.services.filter(
  //   (_, index) => !serviceDeleteBucket.value.includes(index)
  // );
  // serviceDeleteBucket.value = [];
}

function addAllServicesToBucket() {
  // serviceDeleteBucket.value = buildingInfo.value.services.map((_, index) => index);
}

function removeAllServicesFromBucket() {
  // serviceDeleteBucket.value = [];
}

// ---------------------- Event Listeners ----------------------
$event.on('addServiceToDeleteBucket', (e: any) => {
  // if (!serviceDeleteBucket.value.includes(e)) {
  //   serviceDeleteBucket.value.push(e);
  // }
});

$event.on('removeServiceFromDeleteBucket', (e: any) => {
  // serviceDeleteBucket.value = serviceDeleteBucket.value.filter((idx) => idx !== e);
});
</script>
