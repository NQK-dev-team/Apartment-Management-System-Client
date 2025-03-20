<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('employee_list') }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t('employee_info') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex justify-between items-center">
        <h1 class="mt-3 text-2xl">Nguyễn Văn A</h1>
        <div>
          <a-button type="primary" class="rounded-none">{{ $t('edit') }}</a-button>
          <a-button type="primary" danger class="rounded-none ms-2">{{ $t('delete') }}</a-button>
        </div>
      </div>
    </div>
    <!-- Page main content -->
    <div class="px-4 py-3 mt-5 overflow-auto" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <!-- Heading of the  page -->
      <!-- <h1 class="flex justify-center mt-3 text-2xl ">{{ $t('employee_list') }}</h1> -->
      <!-- 2 columns -->
      <div class="flex">
        <!-- Input boxes -->
        <div class="flex-1 flex flex-col me-6">
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
                disabled
                readonly
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
                disabled
                readonly
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
                disabled
                readonly
              />
            </div>
            <div class="flex-1 me-2">
              <label for="data_of_birth" class="flex mb-1">
                <span>{{ $t('dob') }}</span>
                <span class="text-red-500">*</span>
              </label>
              <a-date-picker v-model:value="value1" class="w-full" placeholder="2000-05-08" disabled readonly/>
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
                disabled
                readonly
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
                disabled
                readonly
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
                disabled
                readonly
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
                disabled
                readonly
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
                disabled
                readonly
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
                disabled
                readonly
              />
            </div>
          </div>
        </div>
        <!-- Images -->
        <div class="flex flex-col w-72 h-72 mx-1">
          <label for="">{{ $t('avatar') }}</label>
          <img :src="svgPaths.placeholderImage" alt="avatar" class="" />
        </div>
        <div class="flex flex-col w-72 h-72 mx-1">
          <label for="">{{ $t('national_id') + ' ' + $t('front_face') }}</label>
          <img :src="svgPaths.placeholderImage" alt="national_id_front" class="" />
        </div>
        <div class="flex flex-col w-72 h-72 mx-1">
          <label for="">{{ $t('national_id') + ' ' + $t('back_face') }}</label>
          <img :src="svgPaths.placeholderImage" alt="national_id_back" class="" />
        </div>
      </div>
      <hr class="mt-6 border-gray-400">
      <div class="w-full flex-1 flex flex-col">
        <div class="flex items-center mt-2">
          <p
            class="me-3 cursor-pointer select-none"
            :class="[
              option === 1
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 1"
          >
            {{ $t('contract') }}
          </p>
          <p
            class="mx-3 cursor-pointer select-none"
            :class="[
              option === 2
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 2"
          >
            {{ $t('support_ticket') }}
          </p>
          <p
            class="mx-3 cursor-pointer select-none"
            :class="[
              option === 3
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 3"
          >
            {{ $t('building') }}
          </p>
        </div>
        <div class="flex items-center justify-center mt-3">
          <h2 v-show="option === 1" class="text-xl font-bold">{{ $t('contract') }}</h2>
          <h2 v-show="option === 2" class="text-xl font-bold">{{ $t('support_ticket') }}</h2>
          <h2 v-show="option === 3" class="text-xl font-bold">{{ $t('building') }}</h2>
        </div>
      </div>
      <div class="flex justify-between">
        <!-- p is a place holder, to space out the content -->
        <p class="mt-3 text-white">{{ $t('employee_list') }}</p>
        <a-input-search class="w-[500px]" v-model:value="searchValue" :placeholder="$t('enter_search')" enter-button />
        <div class="flex">
          <NuxtLink v-show="option !== 2">
            <a-button type="primary" class="btn-icon">
              <img :src="svgPaths.plus" alt="Add employee" class="w-[12px] h-[12px]"/>
            </a-button>
          </NuxtLink>

          <a-button v-show="option !== 2" type="primary" danger class="btn-icon ml-2">
            <img :src="svgPaths.delete" alt="Delete employee" class="w-[12px] h-[12px]" />
          </a-button>
        </div>
      </div>
      <ClientOnly>
        <CommonStaffContractTable v-show="option === 1"/>
        <CommonStaffSupportTicketTable v-show="option === 2"/>
        <CommonStaffBuildingTable v-show="option === 3"/>
      </ClientOnly>
      
      <div class="flex flex-col items-center mt-5">
        <a-button class="my-2 w-[100px]">{{ $t('back') }}</a-button>
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
  name: 'Staff detail',
  layout: 'main',
  middleware: ['authorization-manager']
});

useHead({
  title: 'Staff detail',
  meta: [
    {
      name: 'description',
      content: 'Detail of staff in the system',
    },
  ],
});

//use this to get the translation
const value1 = ref<Dayjs>();
const value2 = ref('Female');
const size = ref<SizeType>('large');
const option = ref<number>(1);
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
const searchValue = ref('');
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