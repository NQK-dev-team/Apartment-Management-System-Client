<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
    <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.bill.list">{{ $t('bill_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('add_customer') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('add_customer') }}</h1>
    </div>
    <div class="flex-1 flex flex-col mt-5 overflow-auto px-4" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <h1 class="mt-3 text-2xl">{{$t('customer_information')}}</h1>
      <CommonCustomerAddCustomerInformation />
      <div class="flex justify-between" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
            <h1 class="mt-3 text-2xl">{{$t('contract_list')}}</h1>
            <div class="flex">
              <a-button type="primary" class="flex items-center justify-center p-0 w-[36px] rounded-none;">
                <img :src="svgPaths.plus" alt="Add contract" class="w-[12px] h-[12px]"/>
              </a-button>
              <a-button type="primary" danger class="flex items-center justify-center p-0 w-[36px] rounded-none; ml-2">
                <img :src="svgPaths.delete" alt="Delete contract" class="w-[12px] h-[12px]"/>
              </a-button>
            </div>
        </div>
      <CommonBillAddPaymentList />
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
  import { pageRoutes } from '~/consts/page_routes';
  import type { UploadFile } from 'ant-design-vue/es/upload/interface';
  import Success from '~/public/svg/success.svg';
  import { getMessageCode } from '~/consts/api_response';
  import { api } from '~/services/api';
  import { useI18n } from 'vue-i18n';
  import { svgPaths } from '~/consts/svg_paths';
  
  // ---------------------- Metadata ----------------------
  definePageMeta({
    name: 'Add New Customer',
    layout: 'main',
    middleware: ['authorization-owner'],
  });
  
  useHead({
    title: 'Add New Customer',
    meta: [
      {
        name: 'description',
        content: 'Add a new Customer to the system',
      },
    ],
  });
  
  // ---------------------- Variables ----------------------
  const { t } = useI18n();
  const lightModeCookie = useCookie('lightMode');
  const step = ref<number>(1);
  const highestStep = ref<number>(1);
  const lightMode = computed(
    () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
  );
  const addSuccess = ref<boolean>(false);
  const { $event } = useNuxtApp();
  
  // ---------------------- Functions ----------------------
  </script>
  
  <style lang="css" scoped>
  .step_title{
    color:rgba(0, 0, 0, 0.5);
  }
  
  .step_title_selected{
    color:black;
  }
  
  .step_title_dark{
    color:rgba(255, 255, 255, 0.45);
  }
  
  .step_title_selected_dark{
    color:white;
  }
  
  .step_number{
    color:rgba(0, 0, 0, 0.5);
    font-size:13px;
    height:18px;
  }
  
  .step_number_dark{
    color:rgba(255, 255, 255, 0.65);
    font-size:13px;
    height:18px;
  }
  
  .step_number_selected{
    color:white;
    font-size:13px;
    height:18px;
  }
  
  .step_number_selected_dark{
    color:white;
    font-size:13px;
    height:18px;
  }
  
  .step_number_background{
    background-color: rgba(0, 0, 0, 0.06);
  }
  
  .step_number_background_dark{
    background-color: rgba(255, 255, 255, 0.12);
  }
  
  .step_number_background_selected{
    background-color: rgb(22, 119, 255);
  }
  
  .step_number_background_completed{
    background-color:rgb(230, 244, 255);
  }
  
  .step_number_background_completed_dark{
    background-color: rgb(17, 26, 44);
  }
  
  .custom_step:hover .step_number_background,
  .custom_step:hover .step_number_background_dark,
  .custom_step:hover .step_number_background_selected,
  .custom_step:hover .step_number_background_completed,
  .custom_step:hover .step_number_background_completed_dark{
    border: 1px solid #1890ff !important;
  }
  
  .custom_step:hover .step_number,
  .custom_step:hover .step_title,
  .custom_step:hover .step_number_dark,
  .custom_step:hover .step_title_dark,
  .custom_step:hover .step_number_selected,
  .custom_step:hover .step_title_selected,
  .custom_step:hover .step_number_selected_dark,
  .custom_step:hover .step_title_selected_dark{
    color:#1890ff !important;
  }
  
  .step_border_transitition{
    transition:background-color 0.3s ease,border-color 0.3s ease;
  }
  </style>
  