<template>
  <div class="w-full h-full flex flex-col px-5">
    <div
      class="px-5 mt-3 py-3"
      :class="[
        lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
          ? 'bg-[#ffffff]'
          : 'bg-[#1f1f1f] text-white',
      ]"
    >
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.building.list">{{ $t('building_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('add_building') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('add_building') }}</h1>
      <a-steps class="px-52" type="navigation" :current="step" :items="stepItems"></a-steps>
    </div>
    <div
      class="flex-1 flex flex-col px-5 mt-5"
      :class="[
        lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
          ? 'bg-white'
          : 'bg-[#1f1f1f] text-white',
      ]"
    >
      <div v-show="step === 1" class="flex-1"></div>
      <div v-show="step === 2" class="flex-1"></div>
      <div v-show="step === 3" class="flex-1"></div>
      <div v-show="step === 4" class="flex-1"></div>
      <div class="steps-action flex flex-col items-center mb-3">
        <a-button v-show="step < 4" type="primary" class="w-[100px]" @click="step++">{{ $t('next') }}</a-button>
        <a-button v-show="step > 1 && step < 4" class="my-2 w-[100px]" @click="step--">{{
          $t('previous')
        }}</a-button>
        <NuxtLink v-show="step === 4" class="my-2 w-[100px]" :to="pageRoutes.common.building.list">
          <a-button type="primary" class="w-full h-full">{{ $t('back') }}</a-button>
        </NuxtLink>
        <a-button v-show="step === 1" class="my-2 w-[100px]">{{ $t('cancel') }}</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Add New Building',
  layout: 'main',
  middleware: ['authorization-owner'],
});

useHead({
  title: 'Add New Building',
  meta: [
    {
      name: 'description',
      content: 'Add a new building to the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const step = ref<number>(1);
const { t } = useI18n();
const stepItems = ref([
  {
    title: t('building_info'),
  },
  {
    title: t('room_info'),
  },
  {
    title: t('confirm'),
  },
  {
    title: t('finish'),
  },
]);

// ---------------------- Functions ----------------------
</script>

<style lang="css" scoped></style>
