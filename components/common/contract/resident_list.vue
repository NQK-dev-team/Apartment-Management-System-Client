<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection" bordered class="mt-2">
      <template #bodyCell="{ column, text }">
        <div>
          {{ text }}
        </div>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>

const { t } = useI18n();
const columns = computed<any>(() => {
  return [
    {
      title: t('no'),
      align: 'center',
      dataIndex: 'no',
      width: '1%',
    },
    {
      title: t('full_name'),
      align: 'center',
      dataIndex: 'name',
      width: '12%',
    },
    {
      title: t('customer_id'),
      align: 'center',
      dataIndex: 'customerId',
      width: '12%',
    },
    {
      title: t('gender'),
      align: 'center',
      dataIndex: 'gender',
      width: '5%',
    },
    {
      title: t('ssn'),
      align: 'center',
      dataIndex: 'nationalId',
      width: '10%',
    },
    {
      title: t('origin'),
      align: 'center',
      dataIndex: 'origin',
      width: '10%',
    },
    {
      title: t('phone'),
      align: 'center',
      dataIndex: 'phoneNumber',
      width: '10%',
    },
    {
      title: t('email'),
      align: 'center',
      dataIndex: 'contactMail',
      width: '15%',
    },
    {
      title: t('relationship_with_owner'),
      align: 'center',
      dataIndex: 'relationship',
      width: '10%',
    },
  ];
});

interface DataItem {
  key: string;
  no: number;
  name: string;
  customerId: string;
  gender: string;
  dob: string;
  nationalId: string;
  phoneNumber: string;
  contactMail: string;
  relationship: string;
  origin: string;
}

const data: DataItem[] = [];

const dataSource = ref(data);

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    console.log(selected, selectedRows, changeRows);
  },
});
</script>

<style scoped>
.detail {
  color: deepskyblue !important;
}

.delete {
  color: red !important;
}

.detail:hover {
  cursor: pointer;
  color: #B9EDFE !important;
}

.delete:hover {
  cursor: pointer;
  color: #E19495 !important;
}
</style>