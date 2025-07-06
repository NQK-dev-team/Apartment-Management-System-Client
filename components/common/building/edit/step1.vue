<template>
  <div class="flex overflow-auto w-full h-full pt-5">
    <div id="edit_building_step_1_left_side" class="flex-1 h-full flex flex-col me-10">
      <div class="flex">
        <div class="flex-1">
          <label for="building_name_1" class="flex mb-1">
            <span>{{ $t('building_name') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input-search
            v-if="userRole?.toString() === roles.owner && !props.readOnly"
            id="building_name_1"
            v-model:value="buildingInfo.data.name"
            :placeholder="$t('enter_building_name')"
            @search="buildingInfo.data.name = props.originalBuildingInfo.data.name"
          >
            <template #enterButton>
              <a-button><UndoOutlined /></a-button>
            </template>
          </a-input-search>
          <a-input
            v-else
            id="building_name_1"
            :value="buildingInfo.data.name"
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
          <a-input-search
            v-if="userRole?.toString() === roles.owner && !props.readOnly"
            id="building_address_1"
            v-model:value="buildingInfo.data.address"
            :placeholder="$t('enter_building_address')"
            @search="buildingInfo.data.address = props.originalBuildingInfo.data.address"
          >
            <template #enterButton>
              <a-button><UndoOutlined /></a-button>
            </template>
          </a-input-search>
          <a-input
            v-else
            id="building_address_1"
            :value="buildingInfo.data.address"
            :placeholder="$t('enter_building_address')"
            readonly
            disabled
          />
        </div>
      </div>
      <CommonBuildingEditServiceTable
        :building-info="buildingInfo"
        :original-building-info="props.originalBuildingInfo"
        :read-only="props.readOnly"
        :step="1"
      />
      <CommonBuildingEditScheduleTable
        :building-info="buildingInfo"
        :original-building-info="props.originalBuildingInfo"
        :managers="managers"
        :step="1"
      />
      <CommonBuildingEditFloorTable :floors="props.floors" :step="1" />
    </div>
    <CommonBuildingEditBuildingImage
      v-if="buildingInfo.data.images.length"
      :building-info="buildingInfo"
      :original-building-info="props.originalBuildingInfo"
    />
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
import type { EditBuilding } from '~/types/building';
import { svgPaths } from '~/consts/svg_paths';
import type { User } from '~/types/user';
import { roles } from '~/consts/roles';

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
    required: true,
  },
  originalBuildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
    required: true,
  },
  managers: {
    type: Array as PropType<User[]>,
    required: true,
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
  readOnly: {
    type: Boolean,
    default: false,
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
