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
            v-if="userRole?.toString() === roles.owner"
            id="building_name_1"
            v-model:value="buildingInfo.name"
            :placeholder="$t('enter_building_name')"
          />
          <a-input
            v-else
            id="building_name_1"
            :value="buildingInfo.name"
            :placeholder="$t('enter_building_name')"
            disabled
            readonly
          />
        </div>
        <div class="flex-1 ms-5">
          <label for="building_address_1" class="flex mb-1">
            <span>{{ $t('building_address') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            v-if="userRole?.toString() === roles.owner"
            id="building_address_1"
            v-model:value="buildingInfo.address"
            :placeholder="$t('enter_building_address')"
          />
          <a-input
            v-else
            id="building_address_1"
            :value="buildingInfo.address"
            :placeholder="$t('enter_building_address')"
            readonly
            disabled
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
      <CommonBuildingEditFloorTable :floors="props.floors" />
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
import { roles } from '~/consts/roles';

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
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
      buildingImages: UploadFile[];
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
  floors: {
    type: Array as PropType<
      {
        value: number;
        disable: boolean;
      }[]
    >,
    required: true,
  },
});
const buildingInfo = toRef(props, 'buildingInfo');
const { $event } = useNuxtApp();
const openModal = ref<boolean>(false);
const fallback = ref<() => void>(() => {});

// ---------------------- Event Listeners ----------------------
$event.on('openDeleteModalEditBuilding', (e: any) => {
  openModal.value = true;
  fallback.value = e;
});
</script>
