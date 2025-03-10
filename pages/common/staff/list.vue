<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('employee_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('employee_list') }}</h1>
    </div>
    <!-- Page main content -->
    <div class="px-4 py-3 mt-5 overflow-auto" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <!-- Heading of the  page -->
      <!-- <h1 class="flex justify-center mt-3 text-2xl ">{{ $t('employee_list') }}</h1> -->
      <!-- Search bar and buttons -->
      <div class="flex justify-between">
        <!-- p is a place holder, to space out the content -->
        <p class="mt-3 text-white">{{ $t('employee_list') }}</p>
        <a-input-search class="w-[500px]" v-model:value="searchValue" :placeholder="$t('enter_search')" enter-button />
        <div class="flex">
          <NuxtLink :to="pageRoutes.common.staff.add">
            <a-button type="primary" class="btn-icon">
              <img :src="svgPaths.plus" alt="Add employee" class="w-[12px] h-[12px]"/>
            </a-button>
          </NuxtLink>

          <a-button type="primary" danger class="btn-icon ml-2">
            <img :src="svgPaths.delete" alt="Delete employee" class="w-[12px] h-[12px]" />
          </a-button>
        </div>
      </div>
      <!-- Table -->
      <StaffTable :columns="columns" :data-source="dataSource" :row-selection="rowSelection" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import { svgPaths } from '~/consts/svg_paths';
import { PlusOutlined } from '#build/components';
import StaffTable from '@/components/common/staff/StaffTable.vue';
import { pageRoutes } from '~/consts/page_routes';
import { NuxtLink } from '#components';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Staff List',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Staff List',
  meta: [
    {
      name: 'description',
      content: 'List of staff members in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
// const buildingList = ref<{
//   name: string;
//   address: string;
//   totalRoom: number;
//   totalFloor: number;
//   image: string;
// }[]>([]);
// const { $event } = useNuxtApp();

//use this to get the translation
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
// const current = ref(1);
const searchValue = ref('');

const columns = computed(() => [
    {
      title: t('no'),
      align: 'center',
      dataIndex: 'no',
      width: '1%',
    },
    {
      title: t('name'),
      align: 'center',
      dataIndex: 'name',
      width: '12%',
    },
    {
      title: t('employee_id'),
      align: 'center',
      dataIndex: 'employeeId',
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
      title: t('building_managing'),
      align: 'center',
      dataIndex: 'buildingManaging',
      width: '10%',
    },
    {
      title: t('action'),
      align: 'center',
      dataIndex: 'operation',
    },
  ]);

interface DataItem {
  key: string;
  no: number;
  name: string;
  employeeId: string;
  gender: string;
  dob: string;
  nationalId: string;
  phoneNumber: string;
  contactMail: string;
  buildingManaging: string;
}

const data: DataItem[] = [];
const genders = ['Male', 'Female'];
const buildings = ['A1', 'B1', 'C1'];

function getRandomBuildings() {
  const shuffled = buildings.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.floor(Math.random() * buildings.length) + 1);
  return selected.join(', ');
}

for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    no: i + 1,
    name: `Edward Long Man ${i}`,
    employeeId: `${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`,
    gender: genders[Math.floor(Math.random() * genders.length)],
    dob: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/19${Math.floor(Math.random() * 30) + 70}`,
    nationalId: Math.random().toString().substr(2, 10),
    phoneNumber: Math.random().toString().substr(2, 10),
    contactMail: 'placeholder_email@gmail.com',
    buildingManaging: getRandomBuildings(),
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

// ---------------------- Functions ----------------------
// async function getBuildingList() {
//   try {
//     $event.emit('loading');
//     const response = await api.common.building.getList();
//     const data = response.data;
//     buildingList.value = data.map(element => {
//       return {
//         name: element.name,
//         address: element.address,
//         totalRoom: element.totalRoom,
//         totalFloor: element.totalFloor,
//         image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//         // image: element.image[0]
//       }
//     });

//   } catch (err: any) {
//     if (err.status >= 500 || err.response._data.message === getMessageCode('INVALID_PARAMETER') || err.response._data.message === getMessageCode('PARAMETER_VALIDATION')) {
//       notification.error({
//         message: t('system_error_title'),
//         description: t('system_error_description'),
//       });
//     }
//   } finally {
//     $event.emit('loading');
//   }
// }

// ---------------------- Lifecycles ----------------------
// onMounted(() => {
//   getBuildingList()
// });
</script>

<style scoped>
.btn-icon {
    @apply flex items-center justify-center p-0 w-[36px] rounded-none;
  }
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
