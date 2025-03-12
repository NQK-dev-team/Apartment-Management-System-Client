<template>
  <div class="mt-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('service_list') }}</h2>
      <div class="flex items-center">
        <a-button
          class="flex items-center justify-center w-10 h-10 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
          @click="
            () => {
              removeItems.services = [];
              addItems.services = [];
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
              $event.emit('openDeleteModalEditBuilding', deleteServices);
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
              addItems.services.push({ ID: -addCounter, name: '', price: '' });
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
                  id="check_all_services_1"
                  :disabled="!displayServices.length"
                  :checked="checkAllServices"
                  @click="checkAllServices ? removeAllServicesFromBucket() : addAllServicesToBucket()"
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
            <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                {{ $t('note') }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <CommonBuildingEditServiceItem
            v-for="(service, index) in displayServices"
            :key="index"
            :index="index"
            :service="service"
            :service-delete-bucket="serviceDeleteBucket"
          />
        </tbody>
      </table>
    </div>
    <p>{{ $t('total') }}: {{ displayServices.length }}</p>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { Building } from '~/types/building';
import type { UploadFile } from 'ant-design-vue/es/upload/interface';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const addCounter = ref(0);
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
      buildingImages: {
        ID: number;
        image: UploadFile;
      }[];
      roomImages: {
        roomID: number;
        images: UploadFile[];
      }[];
      rooms: {
        ID: number;
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
const addItems = toRef(props, 'addItems');
const displayServices = computed(() => {
  const result: {
    ID: number;
    name: string;
    price: number | string;
  }[] = [];

  result.push(
    ...props.addItems.services.map((service) => {
      return {
        ID: service.ID,
        name: service.name,
        price: service.price,
      };
    })
  );

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

  return result;
});
const serviceDeleteBucket = ref<number[]>([]);
const checkAllServices = computed(
  () => !!(displayServices.value.length && displayServices.value.length === serviceDeleteBucket.value.length)
);

// ---------------------- Functions ----------------------
function deleteServices() {
  serviceDeleteBucket.value.forEach((ID) => {
    if (ID <= 0) {
      addItems.value.services = addItems.value.services.filter((service) => service.ID !== ID);
    } else {
      removeItems.value.services.push(ID);
    }
  });

  serviceDeleteBucket.value = [];
}

function addAllServicesToBucket() {
  serviceDeleteBucket.value = displayServices.value.map((service) => service.ID);
}

function removeAllServicesFromBucket() {
  serviceDeleteBucket.value = [];
}

// ---------------------- Event Listeners ----------------------
$event.on('addServiceToDeleteBucket', (e: any) => {
  if (!serviceDeleteBucket.value.includes(e)) {
    serviceDeleteBucket.value.push(e);
  }
});

$event.on('removeServiceFromDeleteBucket', (e: any) => {
  serviceDeleteBucket.value = serviceDeleteBucket.value.filter((id) => id !== e);
});
</script>
