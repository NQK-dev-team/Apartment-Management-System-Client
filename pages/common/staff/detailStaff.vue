<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('employee_list') }}</a-breadcrumb-item>
        <a-breadcrumb-item>Thông tin nhân viên</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex justify-between items-center">
        <h1 class="mt-3 text-2xl">Nguyễn Văn A</h1>
        <div>
          <a-button type="primary" class="rounded-none">Chỉnh sửa</a-button>
          <a-button type="primary" danger class="rounded-none ms-2">Xoá</a-button>
        </div>
      </div>
    </div>
    <!-- Page main content -->
    <div class="px-4 py-3 mt-5 overflow-auto" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <!-- Heading of the  page -->
      <!-- <h1 class="flex justify-center mt-3 text-2xl ">{{ $t('employee_list') }}</h1> -->
      <!-- 2 columns -->
      <div class="flex overflow-x-auto">
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
          <img :src="svgPaths.placeholderImage" alt="Add employee" class="" />
        </div>
        <div class="flex flex-col w-72 h-72 mx-1">
          <label for="">{{ $t('national_id') + ' ' + $t('front_face') }}</label>
          <img :src="svgPaths.placeholderImage" alt="Add employee" class="" />
        </div>
        <div class="flex flex-col w-72 h-72 mx-1">
          <label for="">{{ $t('national_id') + ' ' + $t('back_face') }}</label>
          <img :src="svgPaths.placeholderImage" alt="Add employee" class="" />
        </div>
      </div>
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