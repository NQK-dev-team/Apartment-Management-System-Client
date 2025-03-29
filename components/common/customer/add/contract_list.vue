<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection" bordered class="mt-2">
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.dataIndex && column.dataIndex !== 'operation' && column.dataIndex !== 'status'">
          <div>
            {{ text }}
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'status'">
          <span>
            <a-tag :color="record.status === 0 ? 'volcano' : 'green'">
              {{ record.status === 0 ? 'INACTIVE' : 'ACTIVE' }}
            </a-tag>
          </span>
        </template>

        <template v-else-if="column.dataIndex === 'operation'">
          <div>
            <span>
              <a class="detail">{{ $t('edit') }}</a> | <a class="delete">{{ $t('delete') }}</a>
            </span>
          </div>
        </template>
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
      width: '5%',
    },
    {
      title: t('customer'),
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: t('customer_id'),
      align: 'center',
      dataIndex: 'customerId',
      width: '15%',
    },
    {
      title: t('gender'),
      align: 'center',
      dataIndex: 'gender',
      width: '8%',
    },
    {
      title: t('ssn'),
      align: 'center',
      dataIndex: 'nationalId',
    },
    {
      title: t('phone'),
      align: 'center',
      dataIndex: 'phoneNumber',
    },
    {
      title: t('contract_id'),
      align: 'center',
      dataIndex: 'contractId',
      width: '12%',
    },
    {
      title: t('employee_name'),
      align: 'center',
      dataIndex: 'employeeName',
      width: '12%',
    },
    {
      title: t('employeeID'),
      align: 'center',
      dataIndex: 'employeeId',
      width: '12%',
    },
    {
      title: t('start'),
      align: 'center',
      dataIndex: 'startDate',
      width: '12%',
    },
    {
      title: t('end'),
      align: 'center',
      dataIndex: 'endDate',
      width: '12%',
    },
    {
      title: t('signDate'),
      align: 'center',
      dataIndex: 'signedDate',
      width: '12%',
    },
    {
      title: t('status'),
      align: 'center',
      dataIndex: 'status',
      width: '10%',
    },
    {
      title: t('action'),
      align: 'center',
      dataIndex: 'operation',
      width: '10%',
    },
  ];
});

interface DataItem {
  key: string;
  no: number;
  customer: string;
  customerId: string;
  gender: string;
  ssn: string;
  phone: string;
  contractId: string;
  employeeName: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  signedDate: string;
  status: number;
}

const data: DataItem[] = [];
const genders = ['Male', 'Female'];
const status = [0, 1];


for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    no: i + 1,
    customer: `Edward Queen ${i}`,
    customerId: `${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`,
    gender: genders[Math.floor(Math.random() * genders.length)],
    ssn: `${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`,
    phone: `+84${Math.floor(Math.random() * 1000000000)}`,
    contractId: `${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`,
    employeeName: `Edward King ${i}`,
    employeeId: `${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`,
    startDate: '2021-09-01',
    endDate: '2022-09-01',
    signedDate: '2021-09-01',
    status: 0,
  });
}

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