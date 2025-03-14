<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('employee_list') }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t('add_employees') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('add_employees') }}</h1>
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
                  <span>{{ $t('last_name') }}</span>
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
                  <span>{{ $t('middle_name') }}</span>
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
                  <span>{{ $t('name') }}</span>
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
                  <span>{{ $t('dob') }}</span>
                  <span class="text-red-500">*</span>
                </label>
                <a-date-picker v-model:value="value1" class="w-full" placeholder="Select date"/>
              </div>
            </div>
            <div class="flex items-center mt-5">
              <div class="flex-1 me-2">
                <label for="gender" class="flex mb-1">
                  <span>{{ $t('gender') }}</span>
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
                  <span>{{ $t('origin') }}</span>
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
                  <span>{{ $t('phone') }}</span>
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
                  <span>{{ $t('email') }}</span>
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
                <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'buildingName'">
                    <a-select v-model:value="record.buildingName" :options="buildingOptions" class="w-full"></a-select>
                  </template>
                  <template v-else-if="column.dataIndex === 'beginDate'">
                    <a-date-picker v-model:value="record.beginDate" class="w-full" placeholder="Select date"></a-date-picker>
                  </template>
                  <template v-else-if="column.dataIndex === 'endDate'">
                    <a-date-picker v-model:value="record.endDate" class="w-full" placeholder="Select date"></a-date-picker>
                  </template>
                  <template v-else-if="column.dataIndex === 'operation'">
                    <div>
                      <span>
                        
                      </span>
                      <a-button type="primary" shape="circle" :size="size" danger>
                        <template #icon>
                          X
                        </template>
                      </a-button>
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
      <div class="flex flex-col items-center mt-5">
        <a-button class="my-2 w-[100px]" type="primary">{{ $t('confirm') }}</a-button>
        <a-button class="my-2 w-[100px]">{{ $t('cancel') }}</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { reactive, ref, computed } from 'vue';
import type { UnwrapRef } from 'vue';
import { svgPaths } from '~/consts/svg_paths';
import imageUpload from '@/components/common/customComponent/imageUpload.vue';
import type { Dayjs } from 'dayjs';
import type { SelectProps } from 'ant-design-vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';

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

//use this to get the translation
const value1 = ref<Dayjs>();
const value2 = ref('Female');
const size = ref<SizeType>('large');
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

const buildingOptions = ref([
  { value: 'A1', label: 'A1' },
  { value: 'A2', label: 'A2' },
  { value: 'A3', label: 'A3' },
  { value: 'B1', label: 'B1' },
  { value: 'B2', label: 'B2' },
  { value: 'B3', label: 'B3' },
]);

const columns = computed(() => [
  {
    title: t('no'),
    align: 'center',
    dataIndex: 'no',
    width: '1%',
  },
  {
    title: t('building_name'),
    dataIndex: 'buildingName',
    width: '40%',
  },
  {
    title: "Begin date",
    dataIndex: 'beginDate',
    width: '20%',
  },
  {
    title: "End date",
    dataIndex: 'endDate',
    width: '20%',
  },
  {
    title: t('operation'),
    align: 'center',
    dataIndex: 'operation',
  },
]);

interface DataItem {
  key: string;
  no: number;
  buildingName: string;
  beginDate: Dayjs | null;
  endDate: Dayjs | null;
}

const data: DataItem[] = [];
const buildings = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'];

for (let i = 0; i < 20; i++) {
  data.push({
    key: i.toString(),
    no: i + 1,
    buildingName: buildings[Math.floor(Math.random() * buildings.length)],
    beginDate: null,
    endDate: null,
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

const focus = () => {
  console.log('focus');
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
</script>

<style scoped>
  .btn-icon {
    @apply flex items-center justify-center p-0 w-[36px] rounded-none;
  }
  .editable-row-operations a {
    margin-right: 8px;
  }
  .delete {
    color: red;
  }
</style>