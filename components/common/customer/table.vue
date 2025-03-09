<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection" bordered class="mt-2">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex && column.dataIndex !== 'operation'">
          <div>
            {{ text }}
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div>
            <span>
              <a class="detail">{{ $t('edit') }}</a> | <a class="delete">{{$t('delete')}}</a>
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
      width: '1%',
    },
    {
      title: t('customer'),
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
      title: t('dob'),
      align: 'center',
      dataIndex: 'dob',
      width: '8%',
    },
    {
      title: t('ssn'),
      align: 'center',
      dataIndex: 'nationalId',
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
      title: t('room'),
      align: 'center',
      dataIndex: 'room',
      width: '10%',
    },
    {
      title: t('action'),
      align: 'center',
      dataIndex: 'operation',
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
  room: string;
}

const data: DataItem[] = [];
const genders = ['Male', 'Female'];
const rooms = ['A1-01', 'B1-01', 'C1-01'];

function getRandomRooms() {
  const shuffled = rooms.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 1);
  return selected.toString();
}

for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    no: i + 1,
    name: `Edward Long Man ${i}`,
    customerId: `${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`,
    gender: genders[Math.floor(Math.random() * genders.length)],
    dob: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/19${Math.floor(Math.random() * 30) + 70}`,
    nationalId: Math.random().toString().substr(2, 10),
    phoneNumber: Math.random().toString().substr(2, 10),
    contactMail: 'placeholder_email@gmail.com',
    room: getRandomRooms(),
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
.detail{
  color: deepskyblue !important;
}
.delete{
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