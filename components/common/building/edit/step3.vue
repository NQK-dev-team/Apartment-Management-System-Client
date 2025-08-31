<template>
  <div class="flex overflow-auto w-full pt-5">
    <div id="edit_building_step_3_left_side" class="flex-1 h-full flex flex-col me-10">
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
        :step="3"
      />
      <CommonBuildingEditScheduleTable
        :building-info="buildingInfo"
        :original-building-info="props.originalBuildingInfo"
        :managers="managers"
        :read-only="true"
        :step="3"
      />
      <CommonBuildingEditFloorTable :floors="props.floors" :read-only="true" :step="3" />
    </div>
    <CommonBuildingEditBuildingImage
      v-if="buildingInfo.data.images.length"
      :building-info="buildingInfo"
      :original-building-info="props.originalBuildingInfo"
      :read-only="true"
    />
  </div>
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
          <a-select-option
            v-for="(floor, index) in props.floors"
            :id="`select_floor_3_${index + 1}`"
            :key="index"
            :name="`select_floor_3_${index + 1}`"
            :value="floor.value"
            >{{ floor.value }}</a-select-option
          >
        </a-select>
      </div>
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
              <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
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
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
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
              <th
                v-if="userRole?.toString() === roles.owner"
                class="text-sm font-normal text-center align-middle py-[16px] w-[75px]"
              >
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  {{ $t('note') }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody
            v-if="buildingInfo.data.rooms.filter((room) => room.floor === selectedFloor && !room.isDeleted).length"
          >
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
          <tbody v-else>
            <tr class="h-[150px]">
              <td :colspan="100" class="border-b-[1px]" :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']">
                <div class="h-full w-full">
                  <div
                    class="flex flex-col items-center justify-center overflow-hidden"
                    :style="{ width: `${pageContentWidth - 2}px` }"
                  >
                    <svg v-if="lightMode" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                        <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                        <g fill-rule="nonzero" stroke="#d9d9d9">
                          <path
                            d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                          ></path>
                          <path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            fill="#fafafa"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                        <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                        <g fill-rule="nonzero" stroke="#3e3e3e">
                          <path
                            d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                          ></path>
                          <path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            fill="#1d1d1d"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                      {{ $t('no_data') }}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>{{ $t('total') }}: {{ totalRooms }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { EditBuilding } from '~/types/building';
import type { User } from '~/types/user';
import { roles } from '~/consts/roles';

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
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
const pageContentWidth = ref<number>(0);

// ---------------------- Event Listeners ----------------------
$event.on('resetSelectedFloor', (e: any) => {
  if (e.includes(selectedFloor.value)) {
    selectedFloor.value = -1;
  }
});

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      pageContentWidth.value = entry.contentRect.width;
    }
  });

  resizeObserver.observe(document.getElementById('edit_building_step_3_left_side')!);
});
</script>

<style lang="css">
.readonly-image-list .ant-upload-select{
  display: none !important;
}
</style>
