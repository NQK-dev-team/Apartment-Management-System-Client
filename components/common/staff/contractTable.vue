<template>
  <div>
    <div class="flex justify-center mt-5 mb-3">
      <a-input-search
        v-model:value="searchValue"
        class="w-[500px]"
        :placeholder="$t('enter_search')"
        enter-button
        @search="filter"
      />
    </div>
    <a-table :columns="columns" :data-source="data" class="mt-2">
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
const searchValue = ref('');

const columns = computed(() => [
  {
    title: t('no'),
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: t('customer_name'),
    dataIndex: 'customer_name',
    key: 'customer_name',
  },
  {
    title: t('customer_no'),
    dataIndex: 'customer_no',
    key: 'customer_no',
  },
  {
    title: t('contract_id'),
    dataIndex: 'contract_id',
    key: 'contract_id',
  },
  {
    title: t('startDate'),
    dataIndex: 'startDate',
    key: 'startDate',
    // filters: [
    //   { text: 'First Quarter 2024', value: '01/01/2024-03/31/2024' },
    //   { text: 'Second Quarter 2024', value: '04/01/2024-06/30/2024' },
    //   { text: 'Third Quarter 2024', value: '07/01/2024-09/30/2024' },
    //   { text: 'Fourth Quarter 2024', value: '10/01/2024-12/31/2024' },
    // ],
    // onFilter: (value, record) => {
    //   const [start, end] = value.split('-');
    //   const recordDate = new Date(record.startDate);
    //   return recordDate >= new Date(start) && recordDate <= new Date(end);
    // },
  },
  {
    title: t('endDate'),
    dataIndex: 'endDate',
    key: 'endDate',
    // filters: [
    //   { text: 'First Quarter 2024', value: '01/01/2024-03/31/2024' },
    //   { text: 'Second Quarter 2024', value: '04/01/2024-06/30/2024' },
    //   { text: 'Third Quarter 2024', value: '07/01/2024-09/30/2024' },
    //   { text: 'Fourth Quarter 2024', value: '10/01/2024-12/31/2024' },
    // ],
    // onFilter: (value, record) => {
    //   const [start, end] = value.split('-');
    //   const recordDate = new Date(record.endDate);
    //   return recordDate >= new Date(start) && recordDate <= new Date(end);
    // },
  },
  {
    title: t('signDate'),
    dataIndex: 'signDate',
    key: 'signDate',
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
  },
  {
    title: t('action'),
    dataIndex: 'action',
    key: 'action',
  },
]);

const data = ref<any[]>([]);

// ---------------------- Functions ----------------------
function filter() {
  data.value = props.contracts
    .map((contract, index) => ({
      no: index + 1,
      customer_name: getUserName(contract.householder),
      customer_no: contract.householder.no,
      contract_id: contract.ID,
      startDate: convertToDate(contract.startDate),
      endDate: contract.endDate.Valid ? convertToDate(contract.endDate.Time!) : '-',
      signDate: contract.signDate.Valid ? convertToDate(contract.signDate.Time!) : '-',
      status: contract.status,
      action: contract.ID,
    }))
    .filter((elem) => {
      const search = removeDiacritics(searchValue.value.trim().toLowerCase());
      return removeDiacritics(elem.customer_name.toLowerCase()).includes(search) || elem.customer_no.includes(search);
    });
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  data.value = props.contracts.map((contract, index) => ({
    no: index + 1,
    customer_name: getUserName(contract.householder),
    customer_no: contract.householder.no,
    contract_id: contract.ID,
    startDate: convertToDate(contract.startDate),
    endDate: contract.endDate.Valid ? convertToDate(contract.endDate.Time!) : '-',
    signDate: contract.signDate.Valid ? convertToDate(contract.signDate.Time!) : '-',
    status: contract.status,
    action: contract.ID,
  }));
});
</script>
