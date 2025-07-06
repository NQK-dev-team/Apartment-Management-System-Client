<template>
  <div>
    <a-table :columns="columns" :data-source="data" class="mt-3" :scroll="{ x: 'max-content' }">
      <template #bodyCell="{ column, value }">
        <template v-if="column.dataIndex === 'action'">
          <NuxtLink
            :to="pageRoutes.common.contract.detail(value)"
            target="_blank"
            class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
            >{{ $t('detail') }}</NuxtLink
          >
        </template>
        <template v-if="column.dataIndex === 'status'">
          <a-tag
            :class="`text-[#${value === COMMON.CONTRACT_STATUS.ACTIVE ? '50c433' : value === COMMON.CONTRACT_STATUS.EXPIRED ? '888888' : value === COMMON.CONTRACT_STATUS.CANCELLED ? 'ff0000' : value === COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE ? '888888' : '888888'}]`"
          >
            {{
              value === COMMON.CONTRACT_STATUS.ACTIVE
                ? $t('active')
                : value === COMMON.CONTRACT_STATUS.EXPIRED
                  ? $t('expired')
                  : value === COMMON.CONTRACT_STATUS.CANCELLED
                    ? $t('cancelled')
                    : value === COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE
                      ? $t('wait_for_signature')
                      : $t('not_in_effect')
            }}
          </a-tag>
        </template>
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
        <SearchOutlined
          v-if="column.dataIndex === 'contract_id' || column.dataIndex === 'room_no'"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <FilterFilled v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import type { Contract } from '~/types/contract';
import { COMMON } from '~/consts/common';

// ---------------------- Variables ----------------------
const props = defineProps({
  contracts: {
    type: Object as PropType<Contract[]>,
    required: true,
  },
});
const { t } = useI18n();
const searchInput = ref();
const columns = computed<any[]>(() => {
  const buildings = [...new Set(props.contracts.map((contract) => contract.buildingName as string))];
  const floors = [...new Set(props.contracts.map((contract) => contract.roomFloor as number))];
  buildings.sort((a, b) => removeDiacritics(a).toLowerCase().localeCompare(removeDiacritics(b).toLowerCase()));
  floors.sort((a, b) => a - b);

  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap',
    },
    {
      title: t('contract_id'),
      dataIndex: 'contract_id',
      key: 'contract_id',
      class: 'text-nowrap',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.contract_id.toString().toLowerCase().includes(val.trim().toLowerCase()));
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
      title: t('building'),
      dataIndex: 'building',
      key: 'building',
      class: 'text-nowrap',
      filters: buildings.map((building: string) => ({
        text: building,
        value: building,
      })),
      onFilter: (value: any, record: any) => record.building === value,
    },
    {
      title: t('floor'),
      dataIndex: 'room_floor',
      key: 'room_floor',
      class: 'text-nowrap',
      filters: floors.map((floor: number) => ({
        text: floor.toString(),
        value: floor,
      })),
      onFilter: (value: any, record: any) => record.room_floor === value,
    },
    {
      title: t('room_no'),
      dataIndex: 'room_no',
      key: 'room_no',
      class: 'text-nowrap',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.room_no.toString().toLowerCase().includes(val.trim().toLowerCase()));
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
      title: t('startDate'),
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      sortDirections: ['ascend', 'descend'],
      class: 'select-none text-nowrap',
    },
    {
      title: t('endDate'),
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a: any, b: any) =>
        new Date(a.endDate !== '-' ? a.endDate : '2100-01-01').getTime() -
        new Date(b.endDate !== '-' ? b.endDate : '2100-01-01').getTime(),
      sortDirections: ['ascend', 'descend'],
      class: 'select-none text-nowrap',
    },
    {
      title: t('signDate'),
      dataIndex: 'signDate',
      key: 'signDate',
      sorter: (a: any, b: any) =>
        new Date(a.signDate !== '-' ? a.signDate : '2100-01-01').getTime() -
        new Date(b.signDate !== '-' ? b.signDate : '2100-01-01').getTime(),
      sortDirections: ['ascend', 'descend'],
      class: 'text-nowrap',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: t('active'), value: COMMON.CONTRACT_STATUS.ACTIVE },
        { text: t('expired'), value: COMMON.CONTRACT_STATUS.EXPIRED },
        { text: t('cancelled'), value: COMMON.CONTRACT_STATUS.CANCELLED },
        { text: t('wait_for_signature'), value: COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE },
        { text: t('not_in_effect'), value: COMMON.CONTRACT_STATUS.NOT_IN_EFFECT },
      ],
      onFilter: (value: any, record: any) => record.status === value,
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
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const data = ref<any[]>([]);

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

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  data.value = props.contracts.map((contract, index) => ({
    no: index + 1,
    contract_id: contract.ID,
    building: contract.buildingName ?? '',
    room_floor: contract.roomFloor ?? '',
    room_no: contract.roomNo ?? '',
    startDate: convertToDate(contract.startDate),
    endDate: contract.endDate.Valid ? convertToDate(contract.endDate.Time!) : '-',
    signDate: contract.signDate.Valid ? convertToDate(contract.signDate.Time!) : '-',
    status: contract.status,
    action: contract.ID,
  }));
});
</script>
