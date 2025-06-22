<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ t('report') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex justify-between mt-5">
        <h1 class="mt-3 text-2xl">{{ t('report') }}</h1>
      </div>
    </div>
    <div class="flex-1 flex-col mt-5 mb-3 overflow-auto px-4 "
      :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <!-- Edit and Delete icons -->
      <!-- <EditOutlined />
      <DeleteOutlined /> -->
      <!-- notification list collum-->

      <!-- notification content collum -->
        <div class="flex items-center mt-3">
          <p
            class="me-3 cursor-pointer select-none"
            :class="[
              option === 1
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 1"
          >
            {{ t('payment') }}
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
            {{ t('profit') }}
          </p>
        </div>
        <div class="flex items-center justify-center mt-3">
          <h2 v-show="option === 1" class="text-xl font-bold">{{ t('payment') }}</h2>
          <h2 v-show="option === 2" class="text-xl font-bold">{{ t('profit') }}</h2>
        </div>
        <ClientOnly>
          <div v-show="option === 1" class="mt-3">
            USE YOUR IMAGINATION TO FILL THIS SPACE WITH PAYMENT REPORT COMPONENT
          </div>
          <div v-show="option === 2" class="mt-3">
            USE YOUR IMAGINATION TO FILL THIS SPACE WITH PROFIT REPORT COMPONENT
          </div>
        </ClientOnly>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services/api';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { svgPaths } from '~/consts/svg_paths';
import dayjs, { type Dayjs } from 'dayjs';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Report',
  layout: 'main',
  middleware: ['authorization-owner'],
});

useHead({
  title: 'Report',
  meta: [
    {
      name: 'description',
      content: 'Report page of the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');

const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const option = ref<number>(1);

// ---------------------- Functions ----------------------
</script>

<style lang="css" scoped>
  .thick-border {
    border-width: 2px !important;
    border-color: white;
  }
</style>