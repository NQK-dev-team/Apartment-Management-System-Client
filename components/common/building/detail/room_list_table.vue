<template>
  <a-table :data-source="roomList" :columns="roomListTableColumns" class="mt-5" :scroll="{ x: 'max-content' }">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'area'"> {{ column.title }} (m<sup>2</sup>) </template>
    </template>
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div class="p-[8px]">
        <a-input
          ref="searchInput"
          :placeholder="t('enter_search')"
          :value="selectedKeys[0]"
          class="block width-[200px] mb-[8px]"
          @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <div class="flex items-center">
          <a-button
            size="small"
            class="w-[90px] h-[25px] inline-flex items-center justify-center"
            @click="handleReset(clearFilters)"
            >{{ t('clear') }}</a-button
          >
          <a-button
            type="primary"
            size="small"
            class="inline-flex items-center justify-center w-[100px] h-[25px] ms-[8px]"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon>
              <SearchOutlined />
            </template>
            {{ t('search') }}
          </a-button>
        </div>
      </div>
    </template>
    <template #customFilterIcon="{ filtered, column }">
      <SearchOutlined v-if="column.dataIndex === 'roomNo'" :style="{ color: filtered ? '#108ee9' : undefined }" />
      <FilterFilled v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #bodyCell="{ value, column }">
      <template v-if="column.key === 'status'">
        <a-tag
          :bordered="false"
          :color="
            value === COMMON.ROOM_STATUS.RENTED
              ? '#50c433'
              : value === COMMON.ROOM_STATUS.SOLD
                ? '#43b7f1'
                : value === COMMON.ROOM_STATUS.AVAILABLE
                  ? '#888888'
                  : value === COMMON.ROOM_STATUS.MAINTANCED
                    ? '#d8d535'
                    : value === COMMON.ROOM_STATUS.UNAVAILABLE
                      ? '#FF0000'
                      : ''
          "
        >
          {{
            value === COMMON.ROOM_STATUS.RENTED
              ? $t('rented')
              : value === COMMON.ROOM_STATUS.SOLD
                ? $t('bought')
                : value === COMMON.ROOM_STATUS.AVAILABLE
                  ? $t('available')
                  : value === COMMON.ROOM_STATUS.MAINTANCED
                    ? $t('maintenance')
                    : value === COMMON.ROOM_STATUS.UNAVAILABLE
                      ? $t('unavailable')
                      : ''
          }}
        </a-tag>
      </template>
      <template v-if="column.key === 'action'">
        <NuxtLink
          :to="pageRoutes.common.building.roomDetail(props.buildingId, value)"
          class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
        >
          {{ $t('detail') }}
        </NuxtLink>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import type { Room } from '~/types/building';
import { COMMON } from '~/consts/common';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const props = defineProps({
  rooms: {
    type: Object as PropType<Room[]>,
    required: true,
  },
  buildingId: {
    type: Number,
    required: true,
  },
  totalFloor: {
    type: Number,
    required: true,
  },
});
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const searchInput = ref();
const roomListTableColumns = computed<any>(() => {
  const floorFilter = [];
  for (let i = 0; i < props.totalFloor; i++) {
    floorFilter.push({ text: (i + 1).toString(), value: i + 1 });
  }

  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap',
    },
    {
      title: t('floor'),
      dataIndex: 'floor',
      key: 'floor',
      filters: floorFilter,
      customFilterDropdown: false,
      filterMultiple: true,
      onFilter: (value: number, record: any) => record.floor === value,
      class: 'text-nowrap',
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
      class: 'text-nowrap',
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
      class: 'text-nowrap',
    },
    {
      title: t('area'),
      dataIndex: 'area',
      key: 'area',
      class: 'text-nowrap',
    },
    {
      title: t('description'),
      dataIndex: 'description',
      key: 'description',
      class: 'text-nowrap',
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      class: 'text-nowrap',
    },
  ];
});
const roomList = computedAsync(() =>
  props.rooms.map((room, index) => {
    return {
      no: index + 1,
      floor: room.floor,
      roomNo: room.no,
      status: room.status,
      key: room.ID,
      action: room.ID,
      area: room.area,
      description: room.description,
    };
  })
);

// ---------------------- Functions ----------------------
function handleSearch(selectedKeys: any, confirm: any, dataIndex: any) {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
}

function handleReset(clearFilters: any) {
  clearFilters({ confirm: true });
  state.searchText = '';
}
</script>
