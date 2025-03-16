<template>
  <div class="mt-5 h-full w-full">
    <div v-if="props.floors.length" class="flex items-center">
      <h2 class="text-xl font-bold">{{ $t('floor') }}</h2>
      <div class="ms-5">
        <a-select
          id="select_floor_2"
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
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">{{ $t('room_list') }}</h2>
        <div class="flex items-center">
          <a-button
            class="flex items-center justify-center w-10 h-10 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
            @click="handleUndo"
          >
            <UndoOutlined />
          </a-button>
          <a-button
            type="primary"
            danger
            class="flex items-center justify-center w-10 h-10 rounded-sm mx-2"
            :disabled="deleteBucket.length === 0"
            @click="
              () => {
                $event.emit('openDeleteModalEditBuilding', deleteRooms);
              }
            "
            ><DeleteOutlined
          /></a-button>
          <a-button
            type="primary"
            class="flex items-center justify-center w-10 h-10 rounded-sm"
            @click="
              () => {
                const nextNo =
                  buildingInfo.data.rooms.filter((room) => room.floor === selectedFloor).sort((a, b) => b.no - a.no)[0]
                    .no + 1;
                addCounter++;
                buildingInfo.data.rooms.push({
                  ID: -addCounter,
                  createdAt: '',
                  updatedAt: '',
                  createdBy: 0,
                  updatedBy: 0,
                  no: nextNo,
                  floor: selectedFloor,
                  status: 0,
                  area: '',
                  description: '',
                  buildingID: buildingID,
                  images: [],
                  isNew: true,
                  isDeleted: false,
                });
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
                    id="check_all_room_2"
                    :checked="checkAllRooms"
                    @click="checkAllRooms ? removeAllRoomsFromDeleteBucket() : addAllRoomsToDeleteBucket()"
                  ></a-checkbox>
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
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
              <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
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
              :delete-bucket="deleteBucket"
              :floor="selectedFloor"
            />
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

// ---------------------- Variables ----------------------
const route = useRoute();
const buildingID = Number(route.params.id as string);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
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
const addCounter = ref<number>(0);
const buildingInfo = toRef(props, 'buildingInfo');
const selectedFloor = ref<number>(-1);
const deleteBucket = ref<number[]>([]);
const { $event } = useNuxtApp();
const checkAllRooms = computed(() => {
  return !!(
    buildingInfo.value.data.rooms.filter((room) => room.floor === selectedFloor.value && !room.isDeleted) &&
    buildingInfo.value.data.rooms.filter((room) => room.floor === selectedFloor.value && !room.isDeleted).length ===
      deleteBucket.value.length
  );
});
const totalRooms = computed(() => {
  if (selectedFloor.value === -1) {
    return 0;
  }

  return buildingInfo.value.data.rooms.filter((room) => room.floor === selectedFloor.value && !room.isDeleted).length;
});

// ---------------------- Functions ----------------------
function deleteRooms() {
  buildingInfo.value.data.rooms.forEach((room) => {
    if (room.floor === selectedFloor.value && deleteBucket.value.includes(room.ID)) {
      if (room.ID > 0) {
        room.isDeleted = true;
      } else {
        buildingInfo.value.data.rooms = buildingInfo.value.data.rooms.filter(
          (r) => r.floor === selectedFloor.value && r.ID !== room.ID
        );
      }
    }
  });

  deleteBucket.value = [];
}

function addAllRoomsToDeleteBucket() {
  deleteBucket.value = buildingInfo.value.data.rooms
    .filter((room) => room.floor === selectedFloor.value && !room.isDeleted)
    .map((room) => room.ID);
}

function removeAllRoomsFromDeleteBucket() {
  deleteBucket.value = [];
}

function handleUndo() {
  buildingInfo.value.data.rooms = buildingInfo.value.data.rooms.filter((room) => room.floor !== selectedFloor.value);
  buildingInfo.value.data.rooms.push(
    ...JSON.parse(
      JSON.stringify(props.originalBuildingInfo.data.rooms.filter((room) => room.floor === selectedFloor.value))
    )
  );
  deleteBucket.value = [];
  setTimeout(() => {
    $event.emit('resetRoomImageBuildingEdit', selectedFloor.value);
  }, 100);
}

// ---------------------- Watchers ----------------------
watch(selectedFloor, () => {
  deleteBucket.value = [];
});

// ---------------------- Event Listeners ----------------------
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
