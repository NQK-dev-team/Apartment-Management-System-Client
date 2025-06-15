<template>
  <a-table :data-source="data" :columns="columns" class="mt-5" :scroll="{ x: 'max-content' }">
    <template #bodyCell="{ column, value, record }">
      <template v-if="column.dataIndex === 'customerNumber' && value !== '-'">
        <span>
          {{ value }}
          <NuxtLink
            :to="pageRoutes.common.customer.detail(record.id)"
            target="_blank"
            class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
            ><LinkOutlined
          /></NuxtLink>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import type { RoomResident } from '~/types/contract';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const props = defineProps({
  residents: {
    type: Array as () => RoomResident[],
    required: true,
  },
});
const columns: any = computed(() => {
  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap w-[75px]',
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      class: 'text-nowrap',
    },
    {
      title: t('customer_no'),
      dataIndex: 'customerNumber',
      key: 'customerNumber',
      class: 'text-nowrap',
    },
    {
      title: t('gender'),
      dataIndex: 'gender',
      key: 'gender',
      class: 'text-nowrap',
    },
    {
      title: t('dob'),
      dataIndex: 'dob',
      key: 'dob',
      class: 'text-nowrap',
    },
    {
      title: t('ssn'),
      dataIndex: 'ssn',
      key: 'ssn',
      class: 'text-nowrap',
    },
    {
      title: t('old_ssn'),
      dataIndex: 'old_ssn',
      key: 'old_ssn',
      class: 'text-nowrap',
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
      class: 'text-nowrap',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      class: 'text-nowrap',
    },
    {
      title: t('relationship_with_owner'),
      dataIndex: 'relationship_with_owner',
      key: 'relationship_with_owner',
      class: 'text-nowrap',
    },
  ];
});
const data = computed(() => {
  return props.residents.map((resident, index) => ({
    no: index + 1,
    name: getUserName(resident),
    customerNumber: resident.userAccountID ? resident.userAccount.no : '-',
    gender: t(getUserGender(resident)),
    dob: convertToDate(resident.dob),
    ssn: resident.ssn,
    old_ssn: resident.oldSSN.String || '-',
    phone: resident.phone,
    email: resident.email,
    id: resident.userAccountID || null,
    relationship_with_owner:
      resident.relationWithHouseholder === COMMON.RESIDENT_TYPE.PARENT
        ? t('parent')
        : resident.relationWithHouseholder === COMMON.RESIDENT_TYPE.SPOUSE
          ? t('spouse')
          : resident.relationWithHouseholder === COMMON.RESIDENT_TYPE.CHILD
            ? t('child')
            : t('other'),
  }));
});
</script>
