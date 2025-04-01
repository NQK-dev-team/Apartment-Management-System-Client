<template>
  <div class="mt-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('service_list') }}</h2>
      <div v-if="!props.readOnly" class="flex items-center">
        <a-button
          class="flex items-center justify-center w-10 h-10 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
          @click="
            () => {
              current = 1;
              buildingInfo.data.services = JSON.parse(JSON.stringify(originalBuildingInfo.data.services));
              serviceDeleteBucket = [];
            }
          "
        >
          <UndoOutlined />
        </a-button>
        <a-button
          type="primary"
          danger
          class="flex items-center justify-center w-10 h-10 rounded-sm mx-2"
          :disabled="!serviceDeleteBucket.length"
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
              buildingInfo.data.services = [
                {
                  ID: -addCounter,
                  createdAt: '',
                  createdBy: 0,
                  updatedAt: '',
                  updatedBy: 0,
                  buildingID: buildingID,
                  name: '',
                  price: '',
                  isDeleted: false,
                  isNew: true,
                },
                ...buildingInfo.data.services,
              ];
            }
          "
          ><PlusOutlined
        /></a-button>
      </div>
    </div>
    <div class="mt-3 mb-2">
      <table class="w-full">
        <thead
          class="border-b-[1px]"
          :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
        >
          <tr>
            <th v-if="!props.readOnly" class="text-sm text-center align-middle py-[16px] rounded-tl-lg w-[40px]">
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                <a-checkbox
                  id="check_all_services_1"
                  :disabled="!buildingInfo.data.services.filter((service) => !service.isDeleted).length"
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
            v-for="(service, index) in buildingInfo.data.services.filter((service) => !service.isDeleted)"
            v-show="current * 10 >= index + 1 && (current - 1) * 10 < index + 1"
            :key="index"
            :index="index"
            :service="service"
            :service-delete-bucket="serviceDeleteBucket"
            :read-only="props.readOnly"
          />
        </tbody>
      </table>
      <div
        v-if="buildingInfo.data.services.filter((service) => !service.isDeleted).length > 10"
        class="flex items-center justify-end mt-5"
      >
        <a-pagination
          v-model:current="current"
          :total="buildingInfo.data.services.filter((service) => !service.isDeleted).length"
          :page-size="10"
        />
      </div>
    </div>
    <p>{{ $t('total') }}: {{ buildingInfo.data.services.filter((service) => !service.isDeleted).length }}</p>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { EditBuilding } from '~/types/building';

// ---------------------- Variables ----------------------
const route = useRoute();
const buildingID = Number(route.params.id as string);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const addCounter = ref(0);
const current = ref(1);
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
    required: true,
  },
  originalBuildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const buildingInfo = toRef(props, 'buildingInfo');
const serviceDeleteBucket = ref<number[]>([]);
const checkAllServices = computed(() => {
  const currentPage = buildingInfo.value.data.services
    .filter((service) => !service.isDeleted)
    .filter((_, index) => current.value * 10 >= index + 1 && (current.value - 1) * 10 < index + 1);

  return !!(currentPage.length && currentPage.every((service) => serviceDeleteBucket.value.includes(service.ID)));
});

// ---------------------- Functions ----------------------
function deleteServices() {
  buildingInfo.value.data.services.forEach((service) => {
    if (serviceDeleteBucket.value.includes(service.ID)) {
      if (service.isNew) {
        buildingInfo.value.data.services = buildingInfo.value.data.services.filter((s) => s.ID !== service.ID);
      } else {
        service.isDeleted = true;
      }
    }
  });

  serviceDeleteBucket.value = [];
}

function addAllServicesToBucket() {
  serviceDeleteBucket.value.push(
    ...buildingInfo.value.data.services
      .filter((service) => !service.isDeleted)
      .filter((_, index) => current.value * 10 >= index + 1 && (current.value - 1) * 10 < index + 1)
      .map((service) => service.ID)
  );
}

function removeAllServicesFromBucket() {
  const IDs = buildingInfo.value.data.services
    .filter((service) => !service.isDeleted)
    .filter((_, index) => current.value * 10 >= index + 1 && (current.value - 1) * 10 < index + 1)
    .map((service) => service.ID);

  serviceDeleteBucket.value = serviceDeleteBucket.value.filter((id) => !IDs.includes(id));
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
