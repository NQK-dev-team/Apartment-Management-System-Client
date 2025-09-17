<template>
  <a-table
    :row-selection="{
      selectedRowKeys: deleteBucket.value,
      onChange: (selectedRowKeys: any) => {
        deleteBucket.value = selectedRowKeys;
      },
      getCheckboxProps: (record: any) => ({
        disabled: !(
          ((inChargeRooms || []).includes(record.room_id) || userRole?.toString() === roles.owner) &&
          (record.status === COMMON.CONTRACT_STATUS.CANCELLED ||
            record.status === COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE)
        ),
        name: `check_contract_${record.no}`,
        id: `check_contract_${record.no}`,
      }),
    }"
    :data-source="data"
    :columns="columns"
    class="mt-5"
    :scroll="{ x: 'max-content' }"
  >
    <template #bodyCell="{ column, value, record }">
      <template v-if="column.dataIndex === 'action'">
        <!-- <NuxtLink
          v-if="userRole?.toString() === roles.owner || record.employee_id.toString() === userID?.toString()"
          :to="pageRoutes.common.contract.detail(value)"
          target="_blank"
          class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
          >{{ $t('detail') }}</NuxtLink
        >
        <div v-else></div> -->
        <NuxtLink
          v-if="(inChargeRooms || []).includes(record.room_id) || userRole?.toString() === roles.owner"
          :to="pageRoutes.common.contract.detail(value)"
          target="_blank"
          class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
          >{{ $t('detail') }}</NuxtLink
        >
        <div v-else></div>
      </template>
      <template v-if="column.dataIndex === 'customer_no'">
        <span
          >{{ value }}
          <NuxtLink
            :to="pageRoutes.common.customer.detail(record.customer_id)"
            target="_blank"
            class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
            ><LinkOutlined /></NuxtLink
        ></span>
      </template>
      <template v-if="column.dataIndex === 'employee_number'">
        <span
          >{{ value }}
          <NuxtLink
            v-if="userRole?.toString() === roles.owner && record.creator_role !== roles.owner"
            :to="pageRoutes.common.staff.detail(record.employee_id)"
            target="_blank"
            class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
            ><LinkOutlined
          /></NuxtLink>
          <NuxtLink
            v-if="userRole?.toString() === roles.manager && record.employee_id.toString() === userID?.toString()"
            :to="pageRoutes.common.profile.index"
            target="_blank"
            class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
            ><LinkOutlined /></NuxtLink
        ></span>
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
          :id="`${column.dataIndex}SearchInput`"
          ref="searchInput"
          :name="`${column.dataIndex}SearchInput`"
          :placeholder="t('enter_search')"
          :value="selectedKeys[0]"
          class="block width-[200px] mb-[8px]"
          @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <div class="flex items-center">
          <a-button
            :id="`${column.dataIndex}ClearButton`"
            size="small"
            :name="`${column.dataIndex}ClearButton`"
            class="w-[90px] h-[25px] inline-flex items-center justify-center"
            @click="handleReset(clearFilters)"
            >{{ t('clear') }}</a-button
          >
          <a-button
            :id="`${column.dataIndex}ApplyButton`"
            type="primary"
            :name="`${column.dataIndex}ApplyButton`"
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
        v-if="
          column.dataIndex === 'room_no' ||
          column.dataIndex === 'customer' ||
          column.dataIndex === 'customer_no' ||
          column.dataIndex === 'employee' ||
          column.dataIndex === 'employee_number' ||
          column.dataIndex === 'contract_id'
        "
        :id="`${column.dataIndex}SearchIcon`"
        :name="`${column.dataIndex}SearchIcon`"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <FilterFilled
        v-else
        :id="`${column.dataIndex}FilterIcon`"
        :name="`${column.dataIndex}FilterIcon`"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import type { Contract } from '~/types/contract';
import { COMMON } from '~/consts/common';
import { roles } from '~/consts/roles';

// ---------------------- Variables ----------------------
const props = defineProps({
  contracts: {
    type: Object as PropType<Contract[]>,
    required: true,
  },
  deleteBucket: {
    type: Object as PropType<{ value: number[] }>,
    required: true,
  },
});
const { t } = useI18n();
const searchInput = ref();
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const contracts = toRef(props, 'contracts');
const columns: any = computed(() => {
  const buildingSet = new Set<string>();
  const floorSet = new Set<number>();

  contracts.value.forEach((contract) => {
    if (contract.buildingName) {
      buildingSet.add(contract.buildingName);
    }
    if (contract.roomFloor) {
      floorSet.add(contract.roomFloor);
    }
  });

  const buildings = Array.from(buildingSet).sort();
  const floors = Array.from(floorSet).sort((a, b) => a - b);

  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap',
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
      dataIndex: 'floor',
      key: 'floor',
      class: 'text-nowrap',
      filters: floors.map((floor: number) => ({
        text: floor.toString(),
        value: floor,
      })),
      onFilter: (value: any, record: any) => record.floor === value,
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
    // {
    //   title: t('customer'),
    //   dataIndex: 'customer',
    //   key: 'customer',
    //   class: 'text-nowrap',
    //   customFilterDropdown: true,
    //   onFilter: (value: string, record: any) => {
    //     const values = value.split(',');
    //     return values.some((val) => record.customer.toString().toLowerCase().includes(val.trim().toLowerCase()));
    //   },
    //   onFilterDropdownOpenChange: (visible: boolean) => {
    //     if (visible) {
    //       setTimeout(() => {
    //         searchInput.value.focus();
    //       }, 100);
    //     }
    //   },
    // },
    // {
    //   title: t('customer_no'),
    //   dataIndex: 'customer_no',
    //   key: 'customer_no',
    //   class: 'text-nowrap',
    //   customFilterDropdown: true,
    //   onFilter: (value: string, record: any) => {
    //     const values = value.split(',');
    //     return values.some((val) => record.customer_no.toString().toLowerCase().includes(val.trim().toLowerCase()));
    //   },
    //   onFilterDropdownOpenChange: (visible: boolean) => {
    //     if (visible) {
    //       setTimeout(() => {
    //         searchInput.value.focus();
    //       }, 100);
    //     }
    //   },
    // },
    // {
    //   title: t('employee'),
    //   dataIndex: 'employee',
    //   key: 'employee',
    //   class: 'text-nowrap',
    //   customFilterDropdown: true,
    //   onFilter: (value: string, record: any) => {
    //     const values = value.split(',');
    //     return values.some((val) => record.employee.toString().toLowerCase().includes(val.trim().toLowerCase()));
    //   },
    //   onFilterDropdownOpenChange: (visible: boolean) => {
    //     if (visible) {
    //       setTimeout(() => {
    //         searchInput.value.focus();
    //       }, 100);
    //     }
    //   },
    // },
    // {
    //   title: t('employee_number'),
    //   dataIndex: 'employee_number',
    //   key: 'employee_number',
    //   class: 'text-nowrap',
    //   customFilterDropdown: true,
    //   onFilter: (value: string, record: any) => {
    //     const values = value.split(',');
    //     return values.some((val) => record.employee_number.toString().toLowerCase().includes(val.trim().toLowerCase()));
    //   },
    //   onFilterDropdownOpenChange: (visible: boolean) => {
    //     if (visible) {
    //       setTimeout(() => {
    //         searchInput.value.focus();
    //       }, 100);
    //     }
    //   },
    // },
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
    // {
    //   title: t('signDate'),
    //   dataIndex: 'signDate',
    //   key: 'signDate',
    //   sorter: (a: any, b: any) =>
    //     new Date(a.signDate !== '-' ? a.signDate : '2100-01-01').getTime() -
    //     new Date(b.signDate !== '-' ? b.signDate : '2100-01-01').getTime(),
    //   sortDirections: ['ascend', 'descend'],
    //   class: 'text-nowrap',
    // },
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
const data = computed(() => {
  return contracts.value.map((contract, index) => ({
    no: index + 1,
    customer: getUserName(contract.householder),
    customer_no: contract.householder.no,
    customer_id: contract.householder.ID,
    employee: getUserName(contract.creator),
    employee_number: contract.creator.no,
    employee_id: contract.creator.ID,
    contract_id: contract.ID,
    startDate: convertToDate(contract.startDate),
    endDate: contract.endDate.Valid ? convertToDate(contract.endDate.Time! as string) : '-',
    signDate: contract.signDate.Valid ? convertToDate(contract.signDate.Time! as string) : '-',
    status: contract.status,
    action: contract.ID,
    key: contract.ID,
    building: contract.buildingName,
    floor: contract.roomFloor,
    room_no: contract.roomNo,
    creator_role: getUserRole(contract.creator),
    room_id: contract.roomID,
  }));
});
const userRole = useCookie('userRole');
const deleteBucket = toRef(props, 'deleteBucket');
const userID = useCookie('userID');
const inChargeRooms = useCookie<number[]>('inChargeRooms');

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
