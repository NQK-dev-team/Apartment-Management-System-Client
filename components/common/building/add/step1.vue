<template>
  <div class="flex overflow-auto w-full h-full pt-5">
    <div class="flex-1 h-full flex flex-col me-10">
      <div class="flex">
        <div class="flex-1">
          <label for="building_name_1" class="flex mb-1">
            <span>{{ $t('building_name') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="building_name_1"
            v-model:value.lazy="buildingInfo.name"
            :placeholder="$t('enter_building_name')"
          />
        </div>
        <div class="flex-1 ms-5">
          <label for="building_address_1" class="flex mb-1">
            <span>{{ $t('building_address') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="building_address_1"
            v-model:value.lazy="buildingInfo.address"
            :placeholder="$t('enter_building_address')"
          />
        </div>
      </div>
      <div class="mt-10">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('service_list') }}</h2>
          <div class="flex items-center">
            <a-button
              type="primary"
              danger
              class="flex items-center justify-center w-10 h-10"
              :disabled="!serviceDeleteBucket.length"
              @click="
                () => {
                  openModal = true;
                  fallback = deleteServices;
                }
              "
              ><DeleteOutlined
            /></a-button>
            <a-button
              type="primary"
              class="ms-2 flex items-center justify-center w-10 h-10"
              @click="
                buildingInfo.services.push({
                  name: '',
                  price: '',
                })
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
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    <a-checkbox
                      id="check_all_services_1"
                      :disabled="!buildingInfo.services.length"
                      :checked="checkAllServices"
                      @click="checkAllServices ? removeAllServicesFromBucket() : addAllServicesToBucket()"
                    ></a-checkbox>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
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
                <th class="text-sm font-normal text-center align-middle py-[16px] rounded-tr-lg w-[100px]">
                  <div class="h-[20px]">
                    {{ $t('action') }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <CommonBuildingAddServiceItem
                v-for="(service, index) in buildingInfo.services"
                :key="index"
                :index="index"
                :service="service"
                :service-delete-bucket="serviceDeleteBucket"
              />
            </tbody>
          </table>
        </div>
        <p>{{ $t('total') }}: {{ buildingInfo.services.length }}</p>
      </div>
      <div class="mt-10">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('floor_list') }}</h2>
          <div class="flex items-center">
            <a-button
              type="primary"
              danger
              class="flex items-center justify-center w-10 h-10"
              :disabled="!floorDeleteBucket.length"
              @click="
                () => {
                  openModal = true;
                  fallback = deleteFloors;
                }
              "
              ><DeleteOutlined
            /></a-button>
            <a-button
              type="primary"
              class="ms-2 flex items-center justify-center w-10 h-10"
              @click="
                buildingInfo.floors.push({
                  rooms: [],
                })
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
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    <a-checkbox
                      id="check_all_floors_1"
                      :disabled="!buildingInfo.floors.length"
                      :checked="checkAllFloors"
                      @click="() => (checkAllFloors ? removeAllFloorsFromBucket() : addAllFloorsToBucket())"
                    ></a-checkbox>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('floor_number') }}
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px] rounded-tr-lg w-[100px]">
                  <div class="h-[20px]">
                    {{ $t('action') }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <CommonBuildingAddFloorItem
                v-for="(_, index) in buildingInfo.floors"
                :key="index"
                :index="index"
                :floor-delete-bucket="floorDeleteBucket"
              />
            </tbody>
          </table>
        </div>
        <p>{{ $t('total') }}: {{ buildingInfo.floors.length }}</p>
      </div>
    </div>
    <div class="w-[300px] h-full">
      <div class="flex">
        <h2 class="text-xl">{{ $t('building_image') }}</h2>
        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
      </div>
      <div class="flex flex-col">
        <div v-for="(image, index) in imageList" :key="index" class="mt-3">
          <img :src="image" :alt="$t('building_image') + ` ${index}`" class="w-full" />
        </div>
      </div>
      <div class="mt-3 text-center">
        <a-upload
          v-model:file-list="buildingInfo.images"
          accept=".png,.jpg,.jpeg"
          multiple
          list-type="text"
          @change="(e) => handleFileUpload(e)"
        >
          <a-button class="flex items-center">
            <upload-outlined></upload-outlined>
            {{ $t('upload_file') }}
          </a-button>
        </a-upload>
        <div class="mt-5 text-sm" :class="[lightMode ? 'text-[#00000080]' : 'text-[#d2d2d2a3]']">
          {{ $t('recommended_resolution') }}
        </div>
      </div>
    </div>
    <CommonBuildingAddConfirmDeleteModal :open="openModal" :fallback="fallback" />
  </div>
</template>

<script lang="ts" setup>
import type { NewBuildingInfo } from '~/types/building';
import { svgPaths } from '~/consts/svg_paths';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';
import { getBase64 } from '#build/imports';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<NewBuildingInfo>,
    required: true,
  },
});
const buildingInfo = toRef(props, 'buildingInfo');
const serviceDeleteBucket = ref<number[]>([]);
const floorDeleteBucket = ref<number[]>([]);
const { $event } = useNuxtApp();
const checkAllServices = computed(
  () =>
    !!(buildingInfo.value.services.length && buildingInfo.value.services.length === serviceDeleteBucket.value.length)
);
const checkAllFloors = computed(
  () => !!(buildingInfo.value.floors.length && buildingInfo.value.floors.length === floorDeleteBucket.value.length)
);
const openModal = ref<boolean>(false);
const fallback = ref<() => void>(() => {});
const imageList = ref<string[]>([]);

// ---------------------- Functions ----------------------
function handleFileUpload(event: UploadChangeParam<UploadFile<any>>) {
  let isDone = true;

  event.fileList.forEach((file) => {
    if (file.status !== 'done') {
      isDone = false;
    }
  });

  if (!isDone) {
    return;
  }

  const files = event.fileList.map((file) => file.originFileObj);
  imageList.value = [];
  Array.from(files).forEach(async (file) => {
    if (file) {
      const base64 = await getBase64(file);
      imageList.value.push(base64 as string);
    }
  });
}

function deleteServices() {
  buildingInfo.value.services = buildingInfo.value.services.filter(
    (_, index) => !serviceDeleteBucket.value.includes(index)
  );
  serviceDeleteBucket.value = [];
}

function deleteFloors() {
  $event.emit('resetSelectedFloor');
  buildingInfo.value.floors = buildingInfo.value.floors.filter((_, index) => !floorDeleteBucket.value.includes(index));
  floorDeleteBucket.value = [];
}

function deleteService(index: number) {
  buildingInfo.value.services = buildingInfo.value.services.filter((_, idx) => idx !== index);
  const tempBucket: number[] = [];
  serviceDeleteBucket.value.forEach((idx) => {
    if (idx !== index) {
      if (idx > index) {
        tempBucket.push(idx - 1);
      } else {
        tempBucket.push(idx);
      }
    }
  });
  serviceDeleteBucket.value = tempBucket;
}

function deleteFloor(index: number) {
  $event.emit('resetSelectedFloor');
  buildingInfo.value.floors = buildingInfo.value.floors.filter((_, idx) => idx !== index);
  const tempBucket: number[] = [];
  floorDeleteBucket.value.forEach((idx) => {
    if (idx !== index) {
      if (idx > index) {
        tempBucket.push(idx - 1);
      } else {
        tempBucket.push(idx);
      }
    }
  });
  floorDeleteBucket.value = tempBucket;
}

function addAllServicesToBucket() {
  serviceDeleteBucket.value = buildingInfo.value.services.map((_, index) => index);
}

function removeAllServicesFromBucket() {
  serviceDeleteBucket.value = [];
}

function addAllFloorsToBucket() {
  floorDeleteBucket.value = buildingInfo.value.floors.map((_, index) => index);
}

function removeAllFloorsFromBucket() {
  floorDeleteBucket.value = [];
}

// ---------------------- Event Listeners ----------------------
$event.on('deleteServiceFromList', (e: any) => {
  // deleteService(e);
  openModal.value = true;
  fallback.value = () => deleteService(e);
});

$event.on('deleteFloorFromList', (e: any) => {
  // deleteFloor(e);
  openModal.value = true;
  fallback.value = () => deleteFloor(e);
});

$event.on('addServiceToDeleteBucket', (e: any) => {
  if (!serviceDeleteBucket.value.includes(e)) {
    serviceDeleteBucket.value.push(e);
  }
});

$event.on('addFloorToDeleteBucket', (e: any) => {
  if (!floorDeleteBucket.value.includes(e)) {
    floorDeleteBucket.value.push(e);
  }
});

$event.on('removeServiceFromDeleteBucket', (e: any) => {
  serviceDeleteBucket.value = serviceDeleteBucket.value.filter((idx) => idx !== e);
});

$event.on('removeFloorFromDeleteBucket', (e: any) => {
  floorDeleteBucket.value = floorDeleteBucket.value.filter((idx) => idx !== e);
});

$event.on('closeDeleteModalAddBuilding', () => {
  openModal.value = false;
});
</script>
