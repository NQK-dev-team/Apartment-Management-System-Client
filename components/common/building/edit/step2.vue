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
            class="flex items-center justify-center w-8 h-8 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
            @click="handleUndo"
          >
            <UndoOutlined />
          </a-button>
          <a-button
            v-if="userRole?.toString() === roles.owner"
            type="primary"
            danger
            class="flex items-center justify-center w-8 h-8 rounded-sm mx-2"
            :disabled="deleteBucket.length === 0"
            @click="
              () => {
                $event.emit('openDeleteModalEditBuilding', deleteRooms);
              }
            "
            ><DeleteOutlined
          /></a-button>
          <a-button
            v-if="userRole?.toString() === roles.owner"
            type="primary"
            class="flex items-center justify-center w-8 h-8 rounded-sm"
            @click="
              () => {
                let nextNo = 0;
                if (buildingInfo.data.rooms.filter((room) => room.floor === selectedFloor).length) {
                  nextNo =
                    buildingInfo.data.rooms
                      .filter((room) => room.floor === selectedFloor)
                      .sort((a, b) => b.no - a.no)[0].no + 1;
                } else {
                  nextNo = 1000 * selectedFloor + 1;
                }
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
      <div class="mt-3 mb-2">
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
              :delete-bucket="deleteBucket"
              :floor="selectedFloor"
            />
          </tbody>
          <tbody v-else>
            <tr class="h-[150px]">
              <td :colspan="14" class="border-b-[1px]" :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']">
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
import { roles } from '~/consts/roles';
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
const userRole = useCookie('userRole');
const addCounter = ref<number>(0);
const buildingInfo = toRef(props, 'buildingInfo');
const selectedFloor = ref<number>(-1);
const deleteBucket = ref<number[]>([]);
const { $event } = useNuxtApp();
const checkAllRooms = computed(() => {
  return !!(
    buildingInfo.value.data.rooms.filter((room) => room.floor === selectedFloor.value && !room.isDeleted).length &&
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
const pageContentWidth = ref<number>(0);

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

  resizeObserver.observe(document.getElementById('page_content')!);
});
</script>
