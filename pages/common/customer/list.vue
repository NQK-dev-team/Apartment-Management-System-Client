<template>
    <div class="w-full h-full flex flex-col px-5">
      <!-- Page header -->
      <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
        <a-breadcrumb>
          <a-breadcrumb-item>{{ $t('customer_list') }}</a-breadcrumb-item>
        </a-breadcrumb>
        <h1 class="mt-3 text-2xl">{{ $t('customer_list') }}</h1>
      </div>
      <!-- Page main content -->
      <div class="px-4 py-3 mt-5 overflow-auto" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
        <!-- Search bar and buttons -->
        <div class="flex justify-between">
          <!-- p is a place holder, to space out the content -->
          <p class="mt-3 text-white">{{ $t('customer_list') }}</p> 
          <a-input-search class="w-[500px]" v-model:value="searchValue" :placeholder="$t('enter_search')" enter-button />
          <div class="flex">
            <a-button type="primary" class="btn-icon">
              <img :src="svgPaths.plus" alt="Add customer" class="w-[12px] h-[12px]"/>
            </a-button>
            <a-button type="primary" danger class="btn-icon ml-2">
              <img :src="svgPaths.delete" alt="Delete customer" class="w-[12px] h-[12px]"/>
            </a-button>
            <CommonCustomerTable />
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
  import { PlusOutlined } from '#build/components';
  
  // ---------------------- Metadata ----------------------
  definePageMeta({
    name: 'Customer List',
    layout: 'main',
    middleware: ['authorization-manager']
  });
  
  useHead({
    title: 'Customer List',
    meta: [
      {
        name: 'description',
        content: 'List of staff customers in the system',
      },
    ],
  });
  
  // ---------------------- Variables ----------------------
  // const buildingList = ref<{
  
  
  //use this to get the translation
  const { t } = useI18n();
  const lightModeCookie = useCookie('lightMode');
  const lightMode = computed(
    () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
  );
  const searchValue = ref("");
  
  
  
  
  
  // ---------------------- Functions ----------------------
  
  
  // ---------------------- Lifecycles ----------------------
  
  </script>
  
  <style scoped>
    .btn-icon {
      @apply flex items-center justify-center p-0 w-[36px] rounded-none;
    }
    .editable-row-operations a {
      margin-right: 8px;
    }
  </style>