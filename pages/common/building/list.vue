<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('building_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('building_list') }}</h1>
      <div class="flex justify-between items-center">
        <div></div>
        <a-input-search
          id="searchBuilding"
          v-model:value="searchValue"
          class="w-[500px]"
          :placeholder="$t('enter_search')"
          enter-button
          @search="filterBuildingList"
        />
        <NuxtLink v-if="userRole?.toString() === roles.owner" :to="pageRoutes.common.building.add">
          <a-button type="primary" class="flex items-center rounded-sm"><PlusOutlined /></a-button>
        </NuxtLink>
      </div>
    </div>
    <div class="mt-5 overflow-auto">
      <div class="grid-cols-1 gap-5 grid md:grid-cols-2 lg:grid-cols-4">
        <CommonBuildingListCard v-for="(building, index) in buildingList"
          v-show="current * 8 >= index + 1 && (current - 1) * 8 < index + 1" :key="index" :name="building.name"
          :address="building.address" :totalRoom="building.totalRoom" :totalFloor="building.totalFloor"
          :image="building.image" />
      </div>
      <div class="flex justify-center mt-5">
        <a-pagination v-model:current="current" :total="buildingList.length" :defaultPageSize="8" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { ref } from 'vue';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Building List',
  layout: 'main',
  middleware: ['authorization-manager']
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
const userRole = useCookie('userRole');
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
const searchValue = ref("");

// ---------------------- Functions ----------------------
async function getBuildingList() {
  try {
    $event.emit('loading');
    const response = await api.common.building.getList();
    const data = response.data;
    buildingList.value = data.map(element => {
      return {
        name: element.name,
        address: element.address,
        totalRoom: element.totalRoom,
        totalFloor: element.totalFloor,
        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        // image: element.image[0]
      }
    });

  } catch (err: any) {
    if (
      err.status >= 500 ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    $event.emit('loading');
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getBuildingList()
});
</script>
