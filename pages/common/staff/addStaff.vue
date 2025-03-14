<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('employee_list') }}</a-breadcrumb-item>
        <a-breadcrumb-item>Add employee</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">Add employee</h1>
    </div>
    <!-- Page main content -->
    <div class="px-4 py-3 mt-5 overflow-auto" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <!-- Heading of the  page -->
      <!-- <h1 class="flex justify-center mt-3 text-2xl ">{{ $t('employee_list') }}</h1> -->
      <!-- 2 colums -->
      <div class="grid grid-cols-6 gap-x-2">
        <!-- left col -->
        <div class="min-h-[50px] col-span-4">
          <!-- Input boxes -->
          <div class="h-full flex-1 flex flex-col me-24">
            <div class="flex items-center">
              <div class="flex-1 me-2">
                <label for="last_name" class="flex mb-1">
                  <span>Last name</span>
                  <span class="text-red-500">*</span>
                </label>
                <a-input
                  id="last_name"
                  value="Nguyễn"
                  placeholder="Last name"
                />
              </div>
              <div class="flex-1 me-2">
                <label for="name" class="flex mb-1">
                  <span>Middle Name</span>
                </label>
                <a-input
                  id="middle_name"
                  value="Văn"
                  placeholder="Middle name"
                />
              </div>
            </div>
            <div class="flex items-center mt-5">
              <div class="flex-1 me-2">
                <label for="name" class="flex mb-1">
                  <span>Name</span>
                  <span class="text-red-500">*</span>
                </label>
                <a-input
                  id="name"
                  value="Tùng"
                  placeholder="Name"
                />
              </div>
              <div class="flex-1 me-2">
                <label for="data_of_birth" class="flex mb-1">
                  <span>Ngày sinh</span>
                  <span class="text-red-500">*</span>
                </label>
                <a-date-picker v-model:value="value1" class="w-full" placeholder="Select date"/>
              </div>
            </div>
            <div class="flex items-center mt-5">
              <div class="flex-1 me-2">
                <label for="gender" class="flex mb-1">
                  <span>Last name</span>
                  <span class="text-red-500">*</span>
                </label>
                <a-select
                  ref="select"
                  v-model:value="value2"
                  style="width: 120px"
                  :options="options2"
                  @focus="focus"
                  @change="handleChange"
                  class="w-full"
                ></a-select>
              </div>
              <div class="flex-1 me-2">
                <label for="CCCD" class="flex mb-1">
                  <span>CCCD</span>
                  <span class="text-red-500">*</span>
                </label>
                <a-input
                  id="cccd"
                  value="09220000XXXX"
                  placeholder="CCCD"
                />
              </div>
            </div>
            <div class="flex items-center mt-5">
              <div class="flex-1 me-2">
                <label for="CMND" class="flex mb-1">
                  <span>CMND</span>
                </label>
                <a-input
                  id="cmnd"
                  value="Empty"
                  placeholder="CMND"
                />
              </div>
              <div class="flex-1 me-2">
                <label for="origin" class="flex mb-1">
                  <span>Quê quán</span>
                  <span class="text-red-500">*</span>
                </label>
                <a-input
                  id="origin"
                  value="Đồng Nai"
                  placeholder="Origin"
                />
              </div>
            </div>
            <div class="flex items-center mt-5">
              <div class="flex-1 me-2">
                <label for="phone_number" class="flex mb-1">
                  <span>Số điện thoại</span>
                  <span class="text-red-500">*</span>
                </label>
                <a-input
                  id="phone_number"
                  value="093275XXXX"
                  placeholder="Phone number"
                />
              </div>
              <div class="flex-1 me-2">
                <label for="login_email" class="flex mb-1">
                  <span>Email đăng nhập</span>
                  <span class="text-red-500">*</span>
                </label>
                <a-input
                  id="login_email"
                  value="testmail1@gmail.com"
                  placeholder="testmail1@gmail.com"
                />
              </div>
            </div>
            <!-- Building managing section -->
            <div>
              <!-- Heading and buttons -->
              <div class="flex justify-between items-center mt-5">
                <!-- p is a place holder, to space out the content -->
                <h2 class="mt-3 text-2xl">{{ $t('building_managing') }}</h2>
                <div class="flex">
                  <NuxtLink>
                    <a-button type="primary" class="btn-icon">
                      <img :src="svgPaths.plus" alt="Add employee" class="w-[12px] h-[12px]"/>
                    </a-button>
                  </NuxtLink>

                  <a-button type="primary" danger class="btn-icon ml-2">
                    <img :src="svgPaths.delete" alt="Delete employee" class="w-[12px] h-[12px]" />
                  </a-button>
                </div>
              </div>
              <!-- Building managing section table -->
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
                        <NuxtLink class="detail">Edit</NuxtLink> | <NuxtLink class="delete">Delete</NuxtLink>
                      </span>
                    </div>
                  </template>
                </template>
              </a-table>
            </div>
          </div>
          
        </div>
        <!-- right col -->
        <div class="col-span-2 px-3">
          <imageUpload :label="$t('avatar')"/>
          <imageUpload :label="$t('national_id') + ' ' + $t('front_face')"/>
          <imageUpload :label="$t('national_id') + ' ' + $t('back_face')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import { svgPaths } from '~/consts/svg_paths';
import imageUpload from '@/components/common/customComponent/imageUpload.vue';
import type { Dayjs } from 'dayjs';
import type { SelectProps } from 'ant-design-vue';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Staff add',
  layout: 'main',
  middleware: ['authorization-manager']
});

useHead({
  title: 'Add staff member',
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
const value1 = ref<Dayjs>();
const value2 = ref('Female');
const options2 = ref<SelectProps['options']>([
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other'},
]);
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);

const columns = computed(() => [
  {
    title: t('no'),
    dataIndex: 'no',
    width: '1%',
  },
  {
    title: t('building_name'),
    dataIndex: 'buildingName',
    width: '12%',
  },
  {
    title: "Begin date",
    dataIndex: 'beginDate',
    width: '12%',
  },
  {
    title: "End date",
    dataIndex: 'endDate',
    width: '12%',
  },
  {
    title: t('operation'),
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
//     if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
//       notification.error({
//         message: t('system_error_title'),
//         description: t('system_error_description'),
//       });
//     }
//   } finally {
//     $event.emit('loading');
//   }
// }
const focus = () => {
  console.log('focus');
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

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