<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.building.list">{{ $t('building_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('building_information') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('building', { name: buildingData.name }) }}</h1>
    </div>
    <div
      class="flex-1 flex flex-col px-4 mt-5 overflow-auto"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <div class="flex items-center h-[400px] pt-3">
        <div class="h-full flex-1 flex flex-col me-24">
          <div class="flex items-center">
            <div class="flex-1 me-2">
              <label for="building_name" class="flex mb-1">
                <span>{{ $t('building_name') }}</span>
              </label>
              <a-input
                id="building_name"
                :value="buildingData.name"
                disabled
                readonly
                :placeholder="$t('building_name')"
              />
            </div>
            <div class="flex-1 ms-2">
              <label for="building_address" class="flex mb-1">
                <span>{{ $t('building_address') }}</span>
              </label>
              <a-input
                id="building_address"
                :value="buildingData.address"
                disabled
                readonly
                :placeholder="$t('building_address')"
              />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-2">
              <label for="total_floor" class="flex mb-1">
                <span>{{ $t('total_floor') }}</span>
              </label>
              <a-input
                id="total_floor"
                :value="buildingData.totalFloor"
                disabled
                readonly
                :placeholder="$t('total_floor')"
              />
            </div>
            <div class="flex-1 ms-2">
              <label for="total_room" class="flex mb-1">
                <span>{{ $t('total_room') }}</span>
              </label>
              <a-input
                id="total_room"
                :value="buildingData.totalRoom"
                disabled
                readonly
                :placeholder="$t('total_room')"
              />
            </div>
          </div>
          <div class="flex items-center"></div>
          <div class="flex items-center"></div>
          <div class="flex items-center"></div>
        </div>
        <div class="w-[350px] h-full me-12 select-none">
          <a-carousel :autoplay="true" arrows>
            <!-- <template #prevArrow>
              <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                <left-circle-outlined />
              </div>
            </template>
            <template #nextArrow>
              <div class="custom-slick-arrow" style="right: 10px">
                <right-circle-outlined />
              </div>
            </template> -->
            <div v-for="(image, index) in buildingData.images" :key="index">
              <img
                :src="image.path"
                class="w-[350px] h-[350px] cursor-pointer"
                @click="
                  () => {
                    previewVisible = true;
                    previewImage = image.path;
                  }
                "
              />
            </div>
          </a-carousel>
        </div>
      </div>
      <hr />
      <div class="w-full flex-1 flex flex-col">
        <div class="flex items-center mt-3">
          <p
            class="me-3 cursor-pointer select-none"
            :class="[
              option === 1
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 1"
          >
            {{ $t('room_list') }}
          </p>
          <p
            class="ms-3 cursor-pointer select-none"
            :class="[
              option === 2
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 2"
          >
            {{ $t('management_list') }}
          </p>
        </div>
        <h2 v-show="option === 1" class="mt-3 mx-auto text-xl font-bold">{{ $t('room_list') }}</h2>
        <h2 v-show="option === 2" class="mt-3 mx-auto text-xl font-bold">{{ $t('management_list') }}</h2>
        <a-table :data-source="data" :columns="columns" class="mt-5">
          <!-- <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
            <div style="padding: 8px">
              <a-input
                ref="searchInput"
                :placeholder="`Search ${column.dataIndex}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
              >
                <template #icon><SearchOutlined /></template>
                Search
              </a-button>
              <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)"> Reset </a-button>
            </div>
          </template>
          <template #customFilterIcon="{ filtered }">
            <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
          </template> -->
          <!-- <template #bodyCell="{ text, column }">
            <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
              <template
                v-for="(fragment, i) in text
                  .toString()
                  .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))"
              >
                <mark v-if="fragment.toLowerCase() === state.searchText.toLowerCase()" :key="i" class="highlight">
                  {{ fragment }}
                </mark>
                <template v-else>{{ fragment }}</template>
              </template>
            </span>
          </template> -->
        </a-table>
      </div>
    </div>
    <a-modal
      class="previewImageBuildingDetail"
      :open="previewVisible"
      :footer="null"
      :closable="false"
      width="750px"
      @cancel="handleCancel"
    >
      <img alt="View image" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
z
<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { pageRoutes } from '~/consts/page_routes';
import { api } from '~/services/api';
import type { Building } from '~/types/building';
import { SearchOutlined } from '@ant-design/icons-vue';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Building Detail',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Building Detail',
  meta: [
    {
      name: 'description',
      content: 'Detail of a building in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const route = useRoute();
const buildingID = Number(route.params.id as string);
const { $event } = useNuxtApp();
const { t } = useI18n();
const buildingData = ref<Building>({
  ID: 0,
  name: '',
  address: '',
  totalFloor: 0,
  totalRoom: 0,
  images: [],
  createdAt: '',
  createdBy: 0,
  updatedAt: '',
  updatedBy: 0,
  deletedAt: '',
  deletedBy: 0,
});
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const previewVisible = ref(false);
const previewImage = ref('');
const option = ref<number>(1);
const columns = ref<any>([]);
const data = ref<any>([]);

// ---------------------- Functions ----------------------
async function getBuildingData() {
  try {
    $event.emit('loading');
    const response = await api.common.building.getDetail(buildingID);
    const data = response.data;
    buildingData.value = data;
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      throw createError({
        status: 500,
        message: 'Internal server error',
        fatal: true,
      });
    }
  } finally {
    $event.emit('loading');
  }
}

function handleCancel() {
  previewVisible.value = false;
}

function assignColumns() {
  if (option.value === 1) {
    const floorFilter = [];
    for (let i = 0; i < buildingData.value.totalFloor; i++) {
      floorFilter.push({ text: (i + 1).toString(), value: i + 1 });
    }

    columns.value = [
      {
        title: t('no'),
        dataIndex: 'no',
        key: 'no',
      },
      {
        title: t('floor'),
        dataIndex: 'floor',
        key: 'floor',
        filters: floorFilter,
        filterMultiple: true,
      },
      {
        title: t('room_no'),
        dataIndex: 'roomNo',
        key: 'roomNo',
        customFilterDropdown: true,
      },
      {
        title: t('status'),
        dataIndex: 'status',
        key: 'status',
        filterMultiple: true,
        filters: [
          { text: t('rented'), value: 1 },
          { text: t('bought'), value: 2 },
          { text: t('available'), value: 3 },
          { text: t('maintenance'), value: 4 },
          { text: t('unavailable'), value: 5 },
        ],
      },
      {
        title: t('action'),
        dataIndex: 'action',
        key: 'action',
      },
      // {
      //   title: 'Name',
      //   dataIndex: 'name',
      //   key: 'name',
      //   customFilterDropdown: true,
      //   onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
      //   onFilterDropdownOpenChange: (visible) => {
      //     if (visible) {
      //       setTimeout(() => {
      //         searchInput.value.focus();
      //       }, 100);
      //     }
      //   },
      // },
    ];
  } else if (option.value === 2) {
    columns.value = [];
  }
}

// ---------------------- Lifecycle Hooks ----------------------
onMounted(async () => {
  await getBuildingData();

  if (buildingData.value.ID === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});

// ---------------------- Watchers ----------------------
watch(option, () => {
  assignColumns();
});

// const state = reactive({
//   searchText: '',
//   searchedColumn: '',
// });

// const searchInput = ref();

// const handleSearch = (selectedKeys, confirm, dataIndex) => {
//   confirm();
//   state.searchText = selectedKeys[0];
//   state.searchedColumn = dataIndex;
// };

// const handleReset = (clearFilters) => {
//   clearFilters({ confirm: true });
//   state.searchText = '';
// };
</script>

<style lang="css">
.previewImageBuildingDetail .ant-modal-content {
  padding: 0 !important;
}
</style>

<!-- <style lang="css" scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  /* height: 160px; */
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style> -->
