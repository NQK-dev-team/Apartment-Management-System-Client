<template>
  <div class="mt-5 h-full w-full">
    <div v-if="buildingInfo.floors.length" class="flex items-center">
      <h2 class="text-xl font-bold">{{ $t('floor') }}</h2>
      <div class="ms-5">
        <a-select
          id="select_floor_2"
          v-model:value="selectedFloor"
          style="width: 150px"
          placeholder="{{ $t('select_floor') }}"
        >
          <a-select-option :value="-1" class="hidden">{{ $t('select_floor') }}</a-select-option>
          <a-select-option v-for="(_, index) in buildingInfo.floors" :key="index">{{ index + 1 }}</a-select-option>
        </a-select>
      </div>
    </div>
    <div v-else class="flex items-center justify-center w-full h-full">
      <h2 class="text-center text-gray-400 text-2xl">{{ $t('no_floor') }}</h2>
    </div>
    <div v-if="selectedFloor !== -1" class="mt-10">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">{{ $t('room_list') }}</h2>
        <div class="flex items-center">
          <a-button
            type="primary"
            danger
            class="flex items-center justify-center w-10 h-10"
            :disabled="deleteBucket.length === 0"
            @click="
              () => {
                openModal = true;
                fallback = deleteRooms;
              }
            "
            ><DeleteOutlined
          /></a-button>
          <a-button
            type="primary"
            class="ms-2 flex items-center justify-center w-10 h-10"
            @click="
              buildingInfo.floors[selectedFloor].rooms.push({
                status: 0,
                area: '',
                description: '',
                images: [],
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
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  <a-checkbox
                    id="check_all_room_2"
                    :checked="checkAllRooms"
                    @click="checkAllRooms ? removeAllRoomsFromDeleteBucket() : addAllRoomsToDeleteBucket()"
                  ></a-checkbox>
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  {{ $t('no') }}
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
              <th class="text-sm font-normal text-center align-middle py-[16px] w-[500px]">
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
            </tr>
          </thead>
          <tbody>
            <CommonBuildingAddRoomItem
              v-for="(room, index) in buildingInfo.floors[selectedFloor].rooms"
              :key="index"
              :index="index"
              :room="room"
              :delete-bucket="deleteBucket"
              :floor="selectedFloor"
            />
          </tbody>
        </table>
      </div>
      <p>{{ $t('total') }}: {{ selectedFloor !== -1 ? buildingInfo.floors[selectedFloor].rooms.length : 0 }}</p>
    </div>
    <CommonBuildingAddConfirmDeleteModal :open="openModal" :fallback="fallback" />
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { NewBuildingInfo } from '~/types/building';

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
const selectedFloor = ref<number>(-1);
const deleteBucket = ref<number[]>([]);
const openModal = ref<boolean>(false);
const fallback = ref<() => void>(() => {});
const { $event } = useNuxtApp();
const checkAllRooms = computed(() => {
  return !!(
    buildingInfo.value.floors[selectedFloor.value].rooms.length &&
    buildingInfo.value.floors[selectedFloor.value].rooms.length === deleteBucket.value.length
  );
});

// ---------------------- Functions ----------------------
function deleteRooms() {
  buildingInfo.value.floors[selectedFloor.value].rooms = buildingInfo.value.floors[selectedFloor.value].rooms.filter(
    (_, idx) => !deleteBucket.value.includes(idx)
  );
  deleteBucket.value = [];
}

function addAllRoomsToDeleteBucket() {
  deleteBucket.value = buildingInfo.value.floors[selectedFloor.value].rooms.map((room, index) => index);
}

function removeAllRoomsFromDeleteBucket() {
  deleteBucket.value = [];
}

// ---------------------- Watchers ----------------------
watch(selectedFloor, () => {
  deleteBucket.value = [];
});

// ---------------------- Event Listeners ----------------------
$event.on('closeDeleteModalAddBuilding', () => {
  openModal.value = false;
});

$event.on('addRoomToDeleteBucket', (e: any) => {
  if (!deleteBucket.value.includes(e)) {
    deleteBucket.value.push(e);
  }
});

$event.on('removeRoomFromDeleteBucket', (e: any) => {
  deleteBucket.value.splice(deleteBucket.value.indexOf(e), 1);
});

$event.on('resetSelectedFloor', () => {
  selectedFloor.value = -1;
});
</script>
