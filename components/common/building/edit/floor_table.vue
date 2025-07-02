<template>
  <div class="mt-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('floor_list') }}</h2>
      <div v-if="userRole?.toString() === roles.owner && !props.readOnly" class="flex items-center">
        <!-- <a-button
          class="flex items-center justify-center w-8 h-8 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
          @click="
            () => {
              const deleteArray = floors.filter((floor, _) => !floor.disable).map((floor) => floor.value);
              deleteArray.forEach((value) => {
                floors.splice(
                  floors.findIndex((floor) => floor.value === value),
                  1
                );
              });
              $event.emit('resetSelectedFloor', deleteArray);
              floorDeleteBucket = [];
            }
          "
        >
          <UndoOutlined />
        </a-button> -->
        <a-button
          type="primary"
          danger
          class="flex items-center justify-center w-8 h-8 rounded-sm mx-2"
          :disabled="!floorDeleteBucket.length"
          @click="
            () => {
              $event.emit('openDeleteModalEditBuilding', deleteFloors);
            }
          "
          ><DeleteOutlined
        /></a-button>
        <a-button
          type="primary"
          class="flex items-center justify-center w-8 h-8 rounded-sm"
          @click="floors.push({ value: floors.length + 1, disable: false })"
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
            <th
              v-if="!props.readOnly && userRole?.toString() === roles.owner"
              class="text-sm text-center align-middle py-[16px] rounded-tl-lg w-[40px]"
            >
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                <a-checkbox
                  id="check_all_floors_1"
                  :checked="checkAllFloors"
                  :disabled="floors.filter((floor) => !floor.disable).length === 0"
                  @click="() => (checkAllFloors ? removeAllFloorsFromBucket() : addAllFloorsToBucket())"
                ></a-checkbox>
              </div>
            </th>
            <th class="text-sm font-normal text-center align-middle py-[16px]">
              <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                {{ $t('floor_number') }}
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
        <tbody v-if="floors.length">
          <CommonBuildingEditFloorItem
            v-for="(floor, index) in floors"
            :key="index"
            :floor="floor"
            :floor-delete-bucket="floorDeleteBucket"
            :read-only="props.readOnly || userRole?.toString() !== roles.owner"
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
    <p>{{ $t('total') }}: {{ floors.length }}</p>
  </div>
</template>

<script lang="ts" setup>
import { roles } from '~/consts/roles';

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const props = defineProps({
  floors: {
    required: true,
    type: Array as PropType<
      {
        value: number;
        disable: boolean;
      }[]
    >,
  },
  readOnly: {
    default: false,
    type: Boolean,
  },
  step: {
    type: Number,
    required: true,
  },
});
const floors = toRef(props, 'floors');
const floorDeleteBucket = ref<number[]>([]);
const checkAllFloors = computed(() => {
  const newFloors = floors.value.filter((floor) => !floor.disable);
  return !!(newFloors.length && newFloors.length === floorDeleteBucket.value.length);
});
const pageContentWidth = ref<number>(0);

// ---------------------- Functions ----------------------
function deleteFloors() {
  const newBucker: number[] = [];
  floorDeleteBucket.value.forEach((value) => {
    floors.value.splice(
      floors.value.findIndex((floor) => {
        if (!floor.disable) {
          newBucker.push(floor.value);
        }

        return floor.value === value;
      }),
      1
    );
  });
  $event.emit('resetSelectedFloor', newBucker);
  floorDeleteBucket.value = [];
}

function addAllFloorsToBucket() {
  floorDeleteBucket.value = floors.value.filter((floor) => !floor.disable).map((floor) => floor.value);
}

function removeAllFloorsFromBucket() {
  floorDeleteBucket.value = [];
}

// ---------------------- Event Listeners ----------------------
$event.on('addFloorToDeleteBucket', (e: any) => {
  if (!floorDeleteBucket.value.includes(e)) {
    floorDeleteBucket.value.push(e);
  }
});

$event.on('removeFloorFromDeleteBucket', (e: any) => {
  floorDeleteBucket.value = floorDeleteBucket.value.filter((value) => value !== e);
});

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      pageContentWidth.value = entry.contentRect.width;
    }
  });

  resizeObserver.observe(document.getElementById(`edit_building_step_${props.step}_left_side`)!);
});
</script>
