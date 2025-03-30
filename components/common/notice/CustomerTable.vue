<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection" bordered class="mt-2">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex && column.dataIndex !== 'operation'">
          <div>
            {{ text }}
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const emit = defineEmits(['update-selected-count']); // Define the emitted event

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
      width: '15%',
    },
    {
      title: t('customer_id'),
      align: 'center',
      dataIndex: 'customerId',
      width: '15%',
    },
    {
      title: t('phone'),
      align: 'center',
      dataIndex: 'phoneNumber',
      width: '10%',
    },
    {
      title: t('ssn'),
      align: 'center',
      dataIndex: 'nationalId',
      width: '10%',
    },
    {
      title: t('email'),
      align: 'center',
      dataIndex: 'contactMail',
      width: '20%',
    },
    {
      title: t('room'),
      align: 'center',
      dataIndex: 'room',
      width: '20%',
    },
  ];
});

interface DataItem {
  key: string;
  no: number;
  name: string;
  customerId: string;
  phoneNumber: string;
  nationalId: string;
  contactMail: string;
  room: string;
}

const data: DataItem[] = [];
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
    phoneNumber: Math.random().toString().substr(2, 10),
    nationalId: Math.random().toString().substr(2, 10),
    contactMail: 'placeholder_email@gmail.com',
    room: getRandomRooms(),
  });
}

const dataSource = ref(data);

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    emit('update-selected-count', selectedRows.length); // Emit the count of selected rows
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows);
    emit('update-selected-count', selectedRows.length);
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    console.log(selected, selectedRows, changeRows);
    emit('update-selected-count', selectedRows.length);
  },
});
</script>

<style scoped>
</style>