<template>
  <div class="flex overflow-auto w-full h-full pt-5">
    <div class="flex-1 h-full flex flex-col me-10">
      <div class="flex">
        <div class="flex-1">
          <label for="building_name_1" class="flex mb-1">
            <span>{{ $t('building_name') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="building_name_1" v-model:value="buildingInfo.name" :placeholder="$t('enter_building_name')" />
        </div>
        <div class="flex-1 ms-5">
          <label for="building_address_1" class="flex mb-1">
            <span>{{ $t('building_address') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="building_address_1"
            v-model:value="buildingInfo.address"
            :placeholder="$t('enter_building_address')"
          />
        </div>
      </div>
      <CommonBuildingEditServiceTable :building-info="buildingInfo" :remove-items="removeItems" :add-items="addItems" />
      <CommonBuildingEditScheduleTable
        :building-info="buildingInfo"
        :remove-items="removeItems"
        :add-items="addItems"
        :managers="managers"
        :schedules="schedules"
      />
      <div class="mt-10">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('floor_list') }}</h2>
          <div class="flex items-center">
            <a-button
              type="primary"
              danger
              class="flex items-center justify-center w-10 h-10 rounded-sm"
              @click="
                () => {
                  openModal = true;
                  fallback = deleteFloors;
                }
              "
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
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    <a-checkbox
                      id="check_all_floors_1"
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
              </tr>
            </thead>
            <tbody>
              <!-- <CommonBuildingAddFloorItem
                v-for="(_, index) in buildingInfo.floors"
                :key="index"
                :index="index"
                :floor-delete-bucket="floorDeleteBucket"
              /> -->
            </tbody>
          </table>
        </div>
        <p>{{ $t('total') }}: {{}}</p>
      </div>
    </div>
    <CommonBuildingEditBuildingImage :building-info="buildingInfo" :remove-items="removeItems" :add-items="addItems" />
    <a-modal
      v-model:open="openModal"
      :title="$t('confirm_deletion')"
      :ok-text="$t('delete')"
      ok-type="danger"
      @ok="
        () => {
          fallback();
          openModal = false;
        }
      "
    >
      <p>{{ $t('delete_modal_content') }}</p>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import type { Building } from '~/types/building';
import { svgPaths } from '~/consts/svg_paths';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';
import { getBase64 } from '#build/imports';
import type { ManagerSchedule, User } from '~/types/user';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<Building>,
    required: true,
  },
  managers: {
    type: Array as PropType<User[]>,
    required: true,
  },
  schedules: {
    type: Array as PropType<ManagerSchedule[]>,
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
const buildingInfo = toRef(props, 'buildingInfo');
// const floorDeleteBucket = ref<number[]>([]);
const { $event } = useNuxtApp();
const checkAllFloors = computed(
  // () => !!(buildingInfo.value.floors.length && buildingInfo.value.floors.length === floorDeleteBucket.value.length)
  () => false
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

function deleteFloors() {
  // $event.emit('resetSelectedFloor');
  // buildingInfo.value.floors = buildingInfo.value.floors.filter((_, index) => !floorDeleteBucket.value.includes(index));
  // floorDeleteBucket.value = [];
}

function addAllFloorsToBucket() {
  // floorDeleteBucket.value = buildingInfo.value.floors.map((_, index) => index);
}

function removeAllFloorsFromBucket() {
  // floorDeleteBucket.value = [];
}

// ---------------------- Event Listeners ----------------------
$event.on('addFloorToDeleteBucket', (e: any) => {
  // if (!floorDeleteBucket.value.includes(e)) {
  //   floorDeleteBucket.value.push(e);
  // }
});

$event.on('removeFloorFromDeleteBucket', (e: any) => {
  // floorDeleteBucket.value = floorDeleteBucket.value.filter((idx) => idx !== e);
});

$event.on('openDeleteModalEditBuilding', (e: any) => {
  openModal.value = true;
  fallback.value = e;
});
</script>
