<template>
  <a-table
    :row-selection="{
      selectedRowKeys: deleteBucket.value,
      onChange: (selectedRowKeys: any) => {
        deleteBucket.value = selectedRowKeys;
      },
      getCheckboxProps: (record: any) => ({
        disabled:
          !(userRole?.toString() === roles.owner || record.employee_id.toString() === userID?.toString()) ||
          (record.status !== COMMON.CONTRACT_STATUS.CANCELLED &&
            record.status !== COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE),
      }),
    }"
    :data-source="data"
    :columns="columns"
    class="mt-5"
    :scroll="{ x: 'max-content' }"
  >
    <template #bodyCell="{ column, value, record }">
      <template v-if="column.dataIndex === 'action'">
        <NuxtLink
          v-if="userRole?.toString() === roles.owner || record.employee_id.toString() === userID?.toString()"
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
  </a-table>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import type { Contract } from '~/types/contract';
import { roles } from '~/consts/roles';
import { COMMON } from '~/consts/common';
import { getUserRole } from '#build/imports';

// ---------------------- Variables ----------------------
const userID = useCookie('userID');
const userRole = useCookie('userRole');
const { t } = useI18n();
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
const columns: any = computed(() => {
  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap',
    },
    {
      title: t('customer'),
      dataIndex: 'customer',
      key: 'customer',
      class: 'text-nowrap',
    },
    {
      title: t('customer_no'),
      dataIndex: 'customer_no',
      key: 'customer_no',
      class: 'text-nowrap',
    },
    {
      title: t('employee'),
      dataIndex: 'employee',
      key: 'employee',
      class: 'text-nowrap',
    },
    {
      title: t('employee_number'),
      dataIndex: 'employee_number',
      key: 'employee_number',
      class: 'text-nowrap',
    },
    {
      title: t('contract_id'),
      dataIndex: 'contract_id',
      key: 'contract_id',
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
  return props.contracts.map((contract, index) => ({
    no: index + 1,
    customer: getUserName(contract.householder),
    customer_no: contract.householder.no,
    customer_id: contract.householder.ID,
    employee: getUserName(contract.creator),
    employee_number: contract.creator.no,
    employee_id: contract.creator.ID,
    contract_id: contract.ID,
    startDate: convertToDate(contract.startDate),
    endDate: contract.endDate.Valid ? convertToDate(contract.endDate.Time!) : '-',
    signDate: contract.signDate.Valid ? convertToDate(contract.signDate.Time!) : '-',
    status: contract.status,
    action: contract.ID,
    key: contract.ID,
    creator_role: getUserRole(contract.creator),
  }));
});
const deleteBucket = toRef(props, 'deleteBucket');
</script>
