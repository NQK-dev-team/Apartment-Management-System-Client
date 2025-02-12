<template>
  <div class="mt-5">
    <div class="flex items-center">
      <h2 class="text-xl font-bold">{{ $t('floor') }}</h2>
      <div class="ms-5">
        <a-select v-model:value="selectedFloor" style="width: 150px" placeholder="{{ $t('select_floor') }}">
          <a-select-option :value="-1" class="hidden">{{ $t('select_floor') }}</a-select-option>
          <a-select-option v-for="(floor, index) in buildingInfo.floors" :key="index">{{ floor.name }}</a-select-option>
        </a-select>
      </div>
    </div>
    <div v-if="selectedFloor !== -1" class="mt-10">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">{{ $t('room_list') }}</h2>
        <div class="flex items-center">
          <a-button type="primary" danger class="flex items-center justify-center w-10 h-10"
            ><DeleteOutlined
          /></a-button>
          <a-button
            type="primary"
            class="ms-2 flex items-center justify-center w-10 h-10"
            @click="
              buildingInfo.floors[selectedFloor].rooms.push({
                no: 0,
                status: 0,
                area: 0,
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
                  <a-checkbox></a-checkbox>
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  {{ $t('no') }}
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  {{ $t('room_no') }}
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  {{ $t('status') }}
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  {{ $t('area') }}
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  {{ $t('description') }}
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px]">
                <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
                  {{ $t('image') }}
                </div>
              </th>
              <th class="text-sm font-normal text-center align-middle py-[16px] rounded-tr-lg w-[100px]">
                <div class="h-[20px]">
                  {{ $t('action') }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <CommonBuildingAddRoomItem
              v-for="(room, index) in buildingInfo.floors[selectedFloor].rooms"
              :key="index"
              :index="index"
            />
          </tbody>
        </table>
      </div>
      <p>{{ $t('total') }}: {{ selectedFloor !== -1 ? buildingInfo.floors[selectedFloor].rooms.length : 0 }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

// ---------------------- Functions ----------------------

// ---------------------- Watchers ----------------------
watch(selectedFloor, () => {
  deleteBucket.value = [];
});
</script>
