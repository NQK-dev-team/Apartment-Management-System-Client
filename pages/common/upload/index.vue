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
          <div class="mt-5 flex items-center justify-between">
            <div class="flex items-center">
              <div>
                <p class="font-bold mb-1">{{ $t('display_category') }}</p>
                <a-select id="viewCatory" v-model:value="viewCatory" name="viewCatory" class="w-32">
                  <a-select-option :value="1">{{ $t('upload_file') }}</a-select-option>
                  <a-select-option :value="2">{{ $t('process_result') }}</a-select-option>
                </a-select>
              </div>
              <div v-if="viewCatory === 2" class="ms-5">
                <p class="font-bold mb-1">{{ $t('process_date') }}</p>
                <a-date-picker id="process_date" v-model:value="daySelect" :disabled-date="disabledDate" class="w-48" />
              </div>
            </div>
            <div v-if="viewCatory === 1 && importOption" class="mt-[28px]">
              <a-button
                id="downloadExampleFileButton"
                name="downloadExampleFileButton"
                class="flex items-center"
                @click="downloadExampleFile"
                ><DownloadOutlined />{{ $t('example_file') }}</a-button
              >
            </div>
          </div>
        </div>
        <hr class="my-5" />
        <div v-if="viewCatory === 1" class="flex-1">
          <CommonUploadUploadCustomer v-if="importOption === COMMON.UPLOAD_TYPE.ADD_CUSTOMERS" />
          <CommonUploadUploadContract v-if="importOption === COMMON.UPLOAD_TYPE.ADD_CONTRACTS" />
          <CommonUploadUploadBill v-if="importOption === COMMON.UPLOAD_TYPE.ADD_BILLS" />
        </div>
        <div v-else-if="viewCatory === 2" class="flex-1">
          <CommonUploadResultCustomer
            v-if="importOption === COMMON.UPLOAD_TYPE.ADD_CUSTOMERS"
            :day-select="daySelect"
          />
          <CommonUploadResultContract
            v-if="importOption === COMMON.UPLOAD_TYPE.ADD_CONTRACTS"
            :day-select="daySelect"
          />
          <CommonUploadResultBill v-if="importOption === COMMON.UPLOAD_TYPE.ADD_BILLS" :day-select="daySelect" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
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
const importOption = ref<number | undefined>(undefined);
const viewCatory = ref(1);
const { $dayjs } = useNuxtApp();
const daySelect = ref<Dayjs>($dayjs());
const { locale } = useI18n();

// ---------------------- Functions ----------------------
function disabledDate(current: Dayjs) {
  // Can not select days after today
  return current && current >= $dayjs().endOf('day');
}

function downloadExampleFile() {
  if (importOption.value === COMMON.UPLOAD_TYPE.ADD_CUSTOMERS) {
    if (locale.value === COMMON.LOCALE.VI) {
      window.open('/file/MAU_KHACH_HANG.xlsx', '_blank');
    } else if (locale.value === COMMON.LOCALE.EN) {
      window.open('/file/CUSTOMER_EXAMPLE.xlsx', '_blank');
    }
  } else if (importOption.value === COMMON.UPLOAD_TYPE.ADD_CONTRACTS) {
    if (locale.value === COMMON.LOCALE.VI) {
      window.open('/file/MAU_HOP_DONG.xlsx', '_blank');
    } else if (locale.value === COMMON.LOCALE.EN) {
      window.open('/file/CONTRACT_EXAMPLE.xlsx', '_blank');
    }
  } else if (importOption.value === COMMON.UPLOAD_TYPE.ADD_BILLS) {
    if (locale.value === COMMON.LOCALE.VI) {
      window.open('/file/MAU_HOA_DON.xlsx', '_blank');
    } else if (locale.value === COMMON.LOCALE.EN) {
      window.open('/file/BILLING_EXAMPLE.xlsx', '_blank');
    }
  }
}
</script>
