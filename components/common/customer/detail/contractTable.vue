<template>
  <div>
    <a-table :columns="columns" :data-source="data" class="mt-3" :scroll="{ x: 'max-content' }">
      <template #bodyCell="{ column, value }">
        <template v-if="column.dataIndex === 'action'">
          <NuxtLink
            :to="pageRoutes.common.contract.detail(value)"
            class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
            >{{ $t('detail') }}</NuxtLink
          >
        </template>
        <template v-if="column.dataIndex === 'status'">
          <a-tag
            :class="`text-[#${value === 1 ? '50c433' : value === 2 ? '888888' : value === 3 ? 'ff0000' : value === 4 ? '888888' : '888888'}]`"
          >
            {{
              value === 1
                ? $t('active')
                : value === 2
                  ? $t('expired')
                  : value === 3
                    ? $t('cancelled')
                    : value === 4
                      ? $t('wait_for_signature')
                      : $t('not_in_effect')
            }}
          </a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import type { Contract } from '~/types/contract';

// ---------------------- Variables ----------------------
const props = defineProps({
  contracts: {
    type: Object as PropType<Contract[]>,
    required: true,
  },
});
const { t } = useI18n();

const columns = computed<any[]>(() => [
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
  },
  {
    title: t('building'),
    dataIndex: 'building',
    key: 'building',
    class: 'text-nowrap',
  },
  {
    title: t('floor'),
    dataIndex: 'room_floor',
    key: 'room_floor',
    class: 'text-nowrap',
  },
  {
    title: t('room_no'),
    dataIndex: 'room_no',
    key: 'room_no',
    class: 'text-nowrap',
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
      { text: t('active'), value: 1 },
      { text: t('expired'), value: 2 },
      { text: t('cancelled'), value: 3 },
      { text: t('wait_for_signature'), value: 4 },
      { text: t('not_in_effect'), value: 5 },
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
]);

const data = ref<any[]>([]);

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
