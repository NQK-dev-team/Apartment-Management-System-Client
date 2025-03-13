<template>
  <div class="mt-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('floor_list') }}</h2>
      <div class="flex items-center">
        <a-button
          class="flex items-center justify-center w-10 h-10 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
          @click="
            () => {
              const deleteArray = floors.filter((floor, _) => !floor.disable).map((floor) => floor.value);
              deleteArray.forEach((value) => {
                floors.splice(
                  floors.findIndex((floor) => floor.value === value),
                  1
                );
              });
            }
          "
        >
          <UndoOutlined />
        </a-button>
        <a-button
          type="primary"
          danger
          class="flex items-center justify-center w-10 h-10 rounded-sm mx-2"
          @click="
            () => {
              $event.emit('openDeleteModalEditBuilding', deleteFloors);
            }
          "
          ><DeleteOutlined
        /></a-button>
        <a-button
          type="primary"
          class="flex items-center justify-center w-10 h-10 rounded-sm"
          @click="floors.push({ value: floors.length + 1, disable: false })"
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
          </tr>
        </thead>
        <tbody>
          <CommonBuildingEditFloorItem
            v-for="(floor, index) in floors"
            :key="index"
            :floor="floor"
            :floor-delete-bucket="floorDeleteBucket"
          />
        </tbody>
      </table>
    </div>
    <p>{{ $t('total') }}: {{ floors.length }}</p>
  </div>
</template>

<script lang="ts" setup>
// ---------------------- Variables ----------------------
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
});
const floors = toRef(props, 'floors');
const floorDeleteBucket = ref<number[]>([]);
const checkAllFloors = computed(() => {
  const newFloors = floors.value.filter((floor) => !floor.disable);
  return !!(newFloors.length && newFloors.length === floorDeleteBucket.value.length);
});

// ---------------------- Functions ----------------------
function deleteFloors() {
  floorDeleteBucket.value.forEach((value) => {
    floors.value.splice(
      floors.value.findIndex((floor) => floor.value === value),
      1
    );
  });
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
</script>
