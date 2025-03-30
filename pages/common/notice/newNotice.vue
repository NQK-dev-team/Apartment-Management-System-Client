<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.staff.list">Thông báo</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>Soạn thông báo</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex justify-between items-center">
        <h1 class="mt-3 text-2xl">Thông báo mới</h1>
        <div>
          <a-button type="primary" class="rounded-none">
            <NuxtLink :to="pageRoutes.common.staff.edit(staffID)">{{ $t('edit') }}</NuxtLink>
          </a-button>
        </div>
      </div>
    </div>
    <div
      class="flex-1 flex flex-col px-4 mt-5 overflow-auto"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <div class="w-full flex-1 flex flex-col">
        <div class="flex items-center mt-3">
          <h2 class="me-3 text-xl font-bold">Người nhận : </h2>
          <p
            class="me-3 cursor-pointer select-none"
            :class="[
              option === 1
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 1"
          >
            {{ $t('employee') }}
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
            {{ $t('customer') }}
          </p>
        </div>
        <div class="flex items-center mt-3">
          <h2 class="me-3 text-xl font-bold">{{ $t('building') }}: </h2>
          <a-select
            :options="options"
            mode="multiple"
            size="large"
            placeholder="Select building"
            style="width: 200px"
            id="building-select"
          ></a-select>

          <h2 v-show="option === 2" class="ms-5 me-3 text-xl font-bold">{{ $t('floor') }}: </h2>
          <a-select
            v-show="option === 2"  
            :options="options"
            mode="multiple"
            size="large"
            placeholder="Select floor"
            style="width: 200px"
            id="floor-select"
          ></a-select>
        </div>
        <div class="flex flex-col justify-start mt-3">
          <p v-show="option === 1">Number of manager selected: </p>
          <p v-show="option === 2">Number of customer selected: </p>
          <h2 v-show="option === 1" class="text-xl font-bold">{{ $t('employee_list') }}</h2>
          <h2 v-show="option === 2" class="text-xl font-bold">{{ $t('customer_list') }}</h2>
        </div>

        <div class="flex flex-col items-center my-5">
          <a-button class="my-2 w-[100px] rounded-sm" type="primary">
            <NuxtLink :to="pageRoutes.common.staff.list">{{ $t('sent') }}</NuxtLink>
          </a-button>
          <a-button class="my-2 w-[100px] rounded-sm">
            <NuxtLink :to="pageRoutes.common.staff.list">{{ $t('back') }}</NuxtLink>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';

import dayjs, { type Dayjs } from 'dayjs';
import type { ManagerSchedule, User } from '~/types/user';
import type { Contract } from '~/types/contract';
import type { SupportTicket } from '~/types/support_ticket';


// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'New notice',
  layout: 'main',
  middleware: ['authorization-owner'],
});

useHead({
  title: 'New notice',
  meta: [
    {
      name: 'description',
      content: 'New notice information in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const route = useRoute();
const staffID = Number(route.params.id as string);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);


const option = ref<number>(1);
const options = [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }));

const { t } = useI18n();

// ---------------------- Functions ----------------------


// ---------------------- Lifecycles ----------------------


// ---------------------- Watchers ----------------------


// ---------------------- Events ----------------------

</script>
