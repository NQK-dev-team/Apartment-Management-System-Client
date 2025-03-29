<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection" bordered class="mt-2">
      <template #summary>
        <a-table-summary-row>
          <a-table-summary-cell index="0" colSpan="3" align="center"><strong>{{ t('total') }}</strong></a-table-summary-cell>
          <a-table-summary-cell index="2" align="center"><strong>{{ totalBalance }}</strong></a-table-summary-cell>
          <a-table-summary-cell index="3" />
        </a-table-summary-row>
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
      title: t('service_name'),
      align: 'center',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: t('balance'),
      align: 'center',
      dataIndex: 'balance',
      width: '20%',
    },
    {
      title: t('note'),
      align: 'center',
      dataIndex: 'note',
    }
  ];
});

interface DataItem {
  no: number;
  key: string;
  name: string;
  balance: number;
  note: string;
}

const data: DataItem[] = [];
const services = ['Pool', 'Gym', 'Parking'];
const notes = ['', 'Note 1', 'Note 2', 'Note 3'];

function getRandomService() {
  const shuffled = services.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 1);
  return selected.toString();
}

function getRandomNote() {
  const shuffled = notes.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 1);
  return selected.toString();
}


for (let i = 0; i < 10; i++) {
  data.push({
    key: i.toString(),
    no: i + 1,
    name: getRandomService(),
    balance: 1000000,
    note: getRandomNote(),
  });
}

const dataSource = ref(data);

const totalBalance = computed(() => {
  return dataSource.value.reduce((total, item) => total + item.balance, 0);
});

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