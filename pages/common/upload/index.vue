<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('upload_service') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('upload_service') }}</h1>
    </div>
    <ClientOnly>
      <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
        <div class="mt-5">
          <div>
            <p class="font-bold mb-1">{{ $t('select_upload_category') }}</p>
            <a-radio-group v-model:value="importOption">
              <a-radio-button
                v-for="(value, index) in Object.values(COMMON.UPLOAD_TYPE)"
                :id="`import-option-${index}`"
                :key="value"
                :value="value"
                >{{ $t(getImportTypeLabel(value)) }}</a-radio-button
              >
            </a-radio-group>
          </div>
          <div class="mt-5">
            <p class="font-bold mb-1">{{ $t('display_category') }}</p>
            <a-select v-model:value="viewCatory" class="w-32">
              <a-select-option :value="1">{{ $t('upload_file') }}</a-select-option>
              <a-select-option :value="2">{{ $t('process_result') }}</a-select-option>
            </a-select>
          </div>
        </div>
        <hr class="my-5" />
        <div v-if="viewCatory === 1" class="flex-1">
          <CommonUploadUploadCustomer v-if="importOption === COMMON.UPLOAD_TYPE.ADD_CUSTOMERS" />
          <CommonUploadUploadContract v-if="importOption === COMMON.UPLOAD_TYPE.ADD_CONTRACTS" />
          <CommonUploadUploadBill v-if="importOption === COMMON.UPLOAD_TYPE.ADD_BILLS" />
        </div>
        <div v-else-if="viewCatory === 2" class="flex-1">
          <CommonUploadResultCustomer v-if="importOption === COMMON.UPLOAD_TYPE.ADD_CUSTOMERS" />
          <CommonUploadResultContract v-if="importOption === COMMON.UPLOAD_TYPE.ADD_CONTRACTS" />
          <CommonUploadResultBill v-if="importOption === COMMON.UPLOAD_TYPE.ADD_BILLS" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Upload',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Upload',
  meta: [
    {
      name: 'description',
      content: 'APM upload center page',
    },
  ],
});

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const importOption = ref<number | null>(null);
const viewCatory = ref(1);
</script>
