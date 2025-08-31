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
          <a-select-option
            v-for="(_, index) in buildingInfo.floors"
            :id="`select_floor_2_${index + 1}`"
            :key="index"
            :name="`select_floor_2_${index + 1}`"
            >{{ index + 1 }}</a-select-option
          >
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
            id="deleteRoom"
            name="deleteRoom"
            type="primary"
            danger
            class="flex items-center justify-center w-8 h-8 rounded-sm"
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
            id="addRoom"
            name="addRoom"
            type="primary"
            class="ms-2 flex items-center justify-center w-8 h-8 rounded-sm"
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
      <div class="mt-3 mb-2">
        <table class="w-full">
          <thead
            class="border-b-[1px]"
            :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
          >
            <tr>
              <th class="text-sm text-center align-middle py-[16px] rounded-tl-lg min-w-[40px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  <a-checkbox
                    id="check_all_room_2"
                    :checked="checkAllRooms"
                    @click="checkAllRooms ? removeAllRoomsFromDeleteBucket() : addAllRoomsToDeleteBucket()"
                  ></a-checkbox>
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px] min-w-[150px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  {{ $t('room_no') }}
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px] min-w-[150px]">
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
              <th class="text-sm font-normal text-center align-middle py-[16px] min-w-[200px]">
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
              <th class="text-sm font-normal text-center align-middle py-[16px] min-w-[350px]">
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
          <tbody v-if="buildingInfo.floors[selectedFloor].rooms.length">
            <CommonBuildingAddRoomItem
              v-for="(room, index) in buildingInfo.floors[selectedFloor].rooms"
              :key="index"
              :index="index"
              :room="room"
              :delete-bucket="deleteBucket"
              :floor="selectedFloor"
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
      <p>
        {{ $t('total') }}:
        <span id="totalRoomCount">{{
          selectedFloor !== -1 ? buildingInfo.floors[selectedFloor].rooms.length : 0
        }}</span>
      </p>
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
const pageContentWidth = ref<number>(0);

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
