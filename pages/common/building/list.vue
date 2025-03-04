<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('building_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('building_list') }}</h1>
      <div class="flex justify-center">
        <a-input-search
          id="searchBuilding"
          v-model:value="searchValue"
          class="w-[500px]"
          :placeholder="$t('enter_search')"
          enter-button
          @search="filterBuildingList"
        />
      </div>
    </div>
    <div class="mt-5 overflow-auto p-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <div class="flex justify-center items-center">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <CommonBuildingListCard
            v-for="(building, index) in buildingListFiltered"
            v-show="current * 8 >= index + 1 && (current - 1) * 8 < index + 1"
            :id="building.id"
            :key="index"
            :name="building.name"
            :address="building.address"
            :total-room="building.totalRoom"
            :total-floor="building.totalFloor"
            :image="building.image"
          />
        </div>
      </div>
      <div class="flex justify-center mt-10 mb-3">
        <a-pagination v-model:current="current" :total="buildingListFiltered.length" :default-page-size="8" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { ref } from 'vue';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Building List',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Building List',
  meta: [
    {
      name: 'description',
      content: 'List of buildings in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const buildingList = ref<
  {
    id: number;
    name: string;
    address: string;
    totalRoom: number;
    totalFloor: number;
    image: string;
  }[]
>([]);
const { $event } = useNuxtApp();
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const current = ref(1);
const searchValue = ref('');
const buildingListFiltered = ref<
  {
    id: number;
    name: string;
    address: string;
    totalRoom: number;
    totalFloor: number;
    image: string;
  }[]
>([]);

// ---------------------- Functions ----------------------
async function getBuildingList() {
  try {
    $event.emit('loading');
    const response = await api.common.building.getList();
    const data = response.data;
    buildingList.value = data.map((element) => {
      return {
        id: element.ID,
        name: element.name,
        address: element.address,
        totalRoom: element.totalRoom,
        totalFloor: element.totalFloor,
        image: element.images[0].path,
      };
    });
    buildingListFiltered.value = buildingList.value;
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    $event.emit('loading');
  }
}

function filterBuildingList() {
  buildingListFiltered.value = buildingList.value.filter((building) => {
    return removeDiacritics(building.name).toLowerCase().includes(searchValue.value.toLowerCase().trim());
  });
  current.value = 1;
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getBuildingList();
});
</script>
