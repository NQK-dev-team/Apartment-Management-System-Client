<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('employee_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('employee_list') }}</h1>
    </div>
    <!-- Page main content -->
    <div class="px-4 py-3 mt-5 overflow-auto" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <h1 class="flex justify-center mt-3 text-2xl ">{{ $t('employee_list') }}</h1>
      <div class="flex justify-between">

        <!-- p is a place holder, to space out the content -->
        <p class="mt-3 text-white">{{ $t('employee_list') }}</p> 
        <a-input-search class="w-[500px]" v-model:value="searchValue" :placeholder="$t('enter_search')" enter-button />
        <div class="flex">
          <a-button type="primary" class="btn-icon">
            <img :src="svgPaths.plus" alt="Add employee" class="w-[12px] h-[12px]"/>
          </a-button>
          <a-button type="primary" danger class="btn-icon ml-2">
            <img :src="svgPaths.delete" alt="Delete employee" class="w-[12px] h-[12px]"/>
          </a-button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { ref } from 'vue';
import { svgPaths } from '~/consts/svg_paths';
import { PlusOutlined } from '#build/components';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Staff List',
  layout: 'main',
  middleware: ['authorization-manager']
});

useHead({
  title: 'Staff List',
  meta: [
    {
      name: 'description',
      content: 'List of staff members in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
// const buildingList = ref<{
//   name: string;
//   address: string;
//   totalRoom: number;
//   totalFloor: number;
//   image: string;
// }[]>([]);
// const { $event } = useNuxtApp();

//use this to get the translation
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
// const current = ref(1);
const searchValue = ref("");

// ---------------------- Functions ----------------------
// async function getBuildingList() {
//   try {
//     $event.emit('loading');
//     const response = await api.common.building.getList();
//     const data = response.data;
//     buildingList.value = data.map(element => {
//       return {
//         name: element.name,
//         address: element.address,
//         totalRoom: element.totalRoom,
//         totalFloor: element.totalFloor,
//         image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//         // image: element.image[0]
//       }
//     });

//   } catch (err: any) {
//     if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
//       notification.error({
//         message: t('system_error_title'),
//         description: t('system_error_description'),
//       });
//     }
//   } finally {
//     $event.emit('loading');
//   }
// }

// ---------------------- Lifecycles ----------------------
// onMounted(() => {
//   getBuildingList()
// });
</script>

<style scoped>
  .btn-icon {
    @apply flex items-center justify-center p-0 w-[36px] rounded-none;
  }
</style>