<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ t('notice') }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{ t('sent_notice') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex justify-between mt-5">
        <h1 class="mt-3 text-2xl">{{ t('sent_notice') }}</h1>
      </div>
    </div>
    <div class="flex-1 flex mt-5 mb-3 overflow-auto px-4"
      :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <!-- Edit and Delete icons -->
      <!-- <EditOutlined />
      <DeleteOutlined /> -->
      <!-- notification list collum-->
      <div class="flex-initial flex-col w-1/4 flex mt-5 overflow-auto thick-border border-r-gray-300">
        <CommonNoticeNotificationListComp
          v-for="(item, idx) in 6"
          :key="idx"
          :selected="selectedIdx === idx"
          @click="selectedIdx = idx"
        />

      </div>

      <!-- notification content collum -->
      <div class="flex-1 flex mt-5 ms-5 overflow-auto">
        <CommonNoticeNotificationContent/>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services/api';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { svgPaths } from '~/consts/svg_paths';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Sent notification',
  layout: 'main',
  middleware: ['authorization-owner'],
});

useHead({
  title: 'Sent notification',
  meta: [
    {
      name: 'description',
      content: 'List of notification sent by the owner',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');

const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const selectedIdx = ref<number | null>(null);

// ---------------------- Functions ----------------------
</script>

<style lang="css" scoped>
  .thick-border {
    border-width: 2px !important;
    border-color: white;
  }
</style>