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
      <div class="flex items-center h-[400px] py-3">
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
            class="mx-3 cursor-pointer select-none"
            :class="[
              option === 2
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 2"
          >
            {{ $t('management_list') }}
          </p>
          <p
            class="ms-3 cursor-pointer select-none"
            :class="[
              option === 3
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 3"
          >
            {{ $t('statistic') }}
          </p>
        </div>
        <h2 v-show="option === 1" class="mt-3 mx-auto text-xl font-bold">{{ $t('room_list') }}</h2>
        <h2 v-show="option === 2" class="mt-3 mx-auto text-xl font-bold">{{ $t('management_list') }}</h2>
        <h2 v-show="option === 3" class="mt-3 mx-auto text-xl font-bold">{{ $t('statistic') }}</h2>
        <a-table v-show="option === 1" :data-source="roomList" :columns="roomListTableColumns" class="mt-5">
          <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
            <div class="p-[8px]">
              <a-input
                id="searchRoomNo"
                ref="searchInput"
                :placeholder="t('enter_search')"
                :value="selectedKeys[0]"
                class="block width-[200px] mb-[8px]"
                @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
              />
              <a-button
                type="primary"
                size="small"
                class="inline-flex items-center justify-center w-[100px] h-[25px] mr-[8px]"
                @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
              >
                <template #icon>
                  <SearchOutlined />
                </template>
                {{ t('search') }}
              </a-button>
              <a-button
                size="small"
                class="w-[90px] h-[25px] inline-flex items-center justify-center"
                @click="handleReset(clearFilters)"
                >{{ t('clear') }}</a-button
              >
            </div>
          </template>
          <template #customFilterIcon="{ filtered, column }">
            <SearchOutlined v-if="column.dataIndex === 'roomNo'" :style="{ color: filtered ? '#108ee9' : undefined }" />
            <FilterOutlined v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
          </template>
          <template #bodyCell="{ value, column }">
            <template v-if="column.key === 'status'">
              <span
                :class="[
                  value === 1
                    ? 'text-[#1B8800]'
                    : value === 2
                      ? 'text-[#086C9E]'
                      : value === 3
                        ? 'text-[#787878]'
                        : value === 4
                          ? 'text-[#B57E17]'
                          : value === 5
                            ? 'text-[#FF0000]'
                            : '',
                ]"
              >
                {{
                  value === 1
                    ? $t('rented')
                    : value === 2
                      ? $t('bought')
                      : value === 3
                        ? $t('available')
                        : value === 4
                          ? $t('maintenance')
                          : value === 5
                            ? $t('unavailable')
                            : ''
                }}
              </span>
            </template>
            <template v-if="column.key === 'action'">
              <NuxtLink
                :to="pageRoutes.common.building.roomDetail(buildingData.ID, value)"
                class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
              >
                {{ $t('detail') }}
              </NuxtLink>
            </template>
          </template>
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
import type { Building, Room } from '~/types/building';

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
const { t, locale } = useI18n();
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
const rooms = ref<Room[]>([]);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const previewVisible = ref(false);
const previewImage = ref('');
const option = ref<number>(1);
const roomListTableColumns = ref<any>([]);
const roomList = ref<any>([]);
const state = reactive({
  searchText: '',
  searchedColumn: '',
});

const searchInput = ref();

// ---------------------- Functions ----------------------
function setTable() {
  const floorFilter = [];
  for (let i = 0; i < buildingData.value.totalFloor; i++) {
    floorFilter.push({ text: (i + 1).toString(), value: i + 1 });
  }

  roomListTableColumns.value = [
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
      customFilterDropdown: false,
      filterMultiple: true,
      onFilter: (value: number, record: any) => record.floor === value,
    },
    {
      title: t('room_no'),
      dataIndex: 'roomNo',
      key: 'roomNo',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.roomNo.toString().toLowerCase().includes(val.trim().toLowerCase()));
      },
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      customFilterDropdown: false,
      filterMultiple: true,
      filters: [
        { text: t('rented'), value: 1 },
        { text: t('bought'), value: 2 },
        { text: t('available'), value: 3 },
        { text: t('maintenance'), value: 4 },
        { text: t('unavailable'), value: 5 },
      ],
      onFilter: (value: number, record: any) => record.status === value,
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
    },
  ];
  roomList.value = rooms.value.map((room, index) => {
    return {
      no: index,
      floor: room.floor,
      roomNo: room.no,
      status: room.status,
      action: room.ID,
    };
  });
}

async function getBuildingData() {
  try {
    $event.emit('loading');
    const buildingDetailResponse = await api.common.building.getDetail(buildingID);
    const buildingDetailResponseData = buildingDetailResponse.data;
    const roomListReponse = await api.common.building.getRoomList(buildingID);
    const roomListReponseData = roomListReponse.data;

    buildingData.value = buildingDetailResponseData;
    rooms.value = roomListReponseData.sort((a, b) => a.no - b.no);

    setTable();
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

function handleSearch(selectedKeys: any, confirm: any, dataIndex: any) {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
}

function handleReset(clearFilters: any) {
  clearFilters({ confirm: true });
  state.searchText = '';
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
watch(locale, () => {
  setTable();
});
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
