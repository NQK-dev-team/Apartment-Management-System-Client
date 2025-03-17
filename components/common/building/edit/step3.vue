<template>
  <div class="flex overflow-auto w-full h-full pt-5">
    <div class="flex-1 h-full flex flex-col me-10">
      <div class="flex">
        <div class="flex-1">
          <label for="building_name_3" class="flex mb-1">
            <span>{{ $t('building_name') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="building_name_3"
            :placeholder="$t('enter_building_name')"
            :value="buildingInfo.data.name"
            disabled
            readonly
          />
        </div>
        <div class="flex-1 ms-5">
          <label for="building_address_3" class="flex mb-1">
            <span>{{ $t('building_address') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="building_address_3"
            :value="buildingInfo.data.address"
            :placeholder="$t('enter_building_address')"
            disabled
            readonly
          />
        </div>
      </div>
      <CommonBuildingEditServiceTable
        :building-info="buildingInfo"
        :original-building-info="props.originalBuildingInfo"
        :read-only="true"
      />
      <CommonBuildingEditScheduleTable
        :building-info="buildingInfo"
        :original-building-info="props.originalBuildingInfo"
        :managers="managers"
        :read-only="true"
      />
      <CommonBuildingEditFloorTable :floors="props.floors" :read-only="true" />
      <div class="mt-10">
        <div v-if="props.floors.length" class="flex items-center">
          <h2 class="text-xl font-bold">{{ $t('floor') }}</h2>
          <div class="ms-5">
            <a-select
              id="select_floor_3"
              v-model:value="selectedFloor"
              style="width: 150px"
              placeholder="{{ $t('select_floor') }}"
            >
              <a-select-option :value="-1" class="hidden">{{ $t('select_floor') }}</a-select-option>
              <a-select-option v-for="(floor, index) in props.floors" :key="index" :value="floor.value">{{
                floor.value
              }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div v-else class="flex items-center justify-center w-full h-full">
          <h2 class="text-center text-gray-400 text-2xl">{{ $t('no_floor') }}</h2>
        </div>
        <div v-if="selectedFloor !== -1" class="mt-10">
          <h2 class="text-xl font-bold">{{ $t('room_list') }}</h2>
          <div class="mt-3 mb-2">
            <table class="w-full">
              <thead
                class="border-b-[1px]"
                :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
              >
                <tr>
                  <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
                    <div
                      class="border-r-[1px] h-[20px]"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('room_no') }}
                    </div>
                  </th>
                  <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
                    <div
                      class="border-r-[1px] h-[20px] flex items-center justify-center"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('status') }}
                      <div class="flex items-center">
                        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                      </div>
                    </div>
                  </th>
                  <th class="text-sm font-normal text-center align-middle py-[16px] w-[200px]">
                    <div
                      class="border-r-[1px] h-[20px] flex items-center justify-center"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('area') }} (m<sup>2</sup>)
                      <div class="flex items-center">
                        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                      </div>
                    </div>
                  </th>
                  <th class="text-sm font-normal text-center align-middle py-[16px] w-[350px]">
                    <div
                      class="border-r-[1px] h-[20px]"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('description') }}
                    </div>
                  </th>
                  <th class="text-sm font-normal text-center align-middle py-[16px]">
                    <div
                      class="border-r-[1px] h-[20px] flex items-center justify-center"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('image') }}
                      <div class="flex items-center">
                        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                      </div>
                    </div>
                  </th>
                  <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
                    <div
                      class="border-r-[1px] h-[20px]"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('note') }}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <CommonBuildingEditRoomItem
                  v-for="(room, index) in buildingInfo.data.rooms.filter(
                    (room) => room.floor === selectedFloor && !room.isDeleted
                  )"
                  :key="index"
                  :index="index"
                  :room="room"
                  :floor="selectedFloor"
                  :read-only="true"
                />
              </tbody>
            </table>
          </div>
          <p>{{ $t('total') }}: {{ totalRooms }}</p>
        </div>
      </div>
    </div>
    <CommonBuildingEditBuildingImage
      v-if="buildingInfo.data.images.length"
      :building-info="buildingInfo"
      :original-building-info="props.originalBuildingInfo"
      :read-only="true"
    />
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { EditBuilding } from '~/types/building';
import type { User } from '~/types/user';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
    required: true,
  },
  managers: {
    type: Array as PropType<User[]>,
    required: true,
  },
  originalBuildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
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
});
const buildingInfo = toRef(props, 'buildingInfo');
const { $event } = useNuxtApp();
const selectedFloor = ref<number>(-1);
const totalRooms = computed(() => {
  if (selectedFloor.value === -1) {
    return 0;
  }

  return buildingInfo.value.data.rooms.filter((room) => room.floor === selectedFloor.value && !room.isDeleted).length;
});

// ---------------------- Event Listeners ----------------------
$event.on('resetSelectedFloor', (e: any) => {
  if (e.includes(selectedFloor.value)) {
    selectedFloor.value = -1;
  }
});
</script>

<style lang="css">
.readonly-image-list .ant-upload-select{
  display: none !important;
}
</style>
