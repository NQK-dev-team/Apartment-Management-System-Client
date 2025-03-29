<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
    <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.bill.list">{{ $t('bill_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('edit_bill') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('edit_bill') }}</h1>
    </div>
    <div class="flex-1 flex flex-col mt-5 overflow-auto px-4" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <h1 class="mt-3 text-2xl">{{$t('bill_info')}}</h1>
      <CommonBillAddBillInformation />
      <div class="flex justify-between" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
            <h1 class="mt-3 text-2xl">{{$t('payment_list')}}</h1>
            <div class="flex">
              <a-button type="primary" class="flex items-center justify-center p-0 w-[36px] rounded-none;">
                <img :src="svgPaths.plus" alt="Add customer" class="w-[12px] h-[12px]"/>
              </a-button>
              <a-button type="primary" danger class="flex items-center justify-center p-0 w-[36px] rounded-none; ml-2">
                <img :src="svgPaths.delete" alt="Delete customer" class="w-[12px] h-[12px]"/>
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
    name: 'Edit a Bill',
    layout: 'main',
    middleware: ['authorization-owner'],
  });
  
  useHead({
    title: 'Edit a Bill',
    meta: [
      {
        name: 'description',
        content: 'Edit a bill in the system',
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
//   async function createNewBuilding() {
//     billInfo.value.services.forEach((service) => {
//       service.price = parseFloat(service.price.toString());
//     });
//     billInfo.value.floors.forEach((floor) => {
//       floor.rooms.forEach((room) => {
//         room.area = parseFloat(room.area.toString());
//       });
//     });
  
//     try {
//       $event.emit('loading');
//       await api.common.bill.addNewBuilding(billInfo.value);
  
//       addSuccess.value = true;
//     } catch (err: any) {
//       step.value--;
//       if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
//         notification.error({
//           message: t('system_error_title'),
//           description: t('system_error_description'),
//         });
//       }
//     } finally {
//       $event.emit('loading');
//     }
//   }
  
//   function checkStep1(): boolean {
//     if (billInfo.value.name === '') {
//       notification.error({
//         message: t('empty_bill_name'),
//       });
//       return false;
//     }
//     if (billInfo.value.address === '') {
//       notification.error({
//         message: t('empty_bill_address'),
//       });
//       return false;
//     }
//     if (billInfo.value.images.length === 0) {
//       notification.error({
//         message: t('bill_image_require'),
//       });
//       return false;
//     }
//     if (billInfo.value.services.find((service) => service.name === '') !== undefined) {
//       notification.error({
//         message: t('empty_service_name', {
//           no: billInfo.value.services.findIndex((service) => service.name === '') + 1,
//         }),
//       });
//       return false;
//     }
//     if (billInfo.value.services.find((service) => service.price === '') !== undefined) {
//       notification.error({
//         message: t('empty_service_price', {
//           no: billInfo.value.services.findIndex((service) => service.price === '') + 1,
//         }),
//       });
//       return false;
//     }
//     return true;
//   }
  
//   function checkStep2(): boolean {
//     let isOK = true;
  
//     billInfo.value.floors.forEach((floor, floorIdx) => {
//       if (!isOK) return;
//       floor.rooms.forEach((room) => {
//         if (!isOK) return;
//         if (room.status === 0 && isOK) {
//           notification.error({
//             message: t('empty_room_status', {
//               no: 1000 * (floorIdx + 1) + billInfo.value.floors.findIndex((floor) => floor.rooms.includes(room)) + 1,
//             }),
//           });
//           isOK = false;
//         }
//         if (room.area === '' && isOK) {
//           notification.error({
//             message: t('empty_room_area', {
//               no: 1000 * (floorIdx + 1) + billInfo.value.floors.findIndex((floor) => floor.rooms.includes(room)) + 1,
//             }),
//           });
//           isOK = false;
//         }
//         if (room.area === '0' && isOK) {
//           notification.error({
//             message: t('zero_room_area', {
//               no: 1000 * (floorIdx + 1) + billInfo.value.floors.findIndex((floor) => floor.rooms.includes(room)) + 1,
//             }),
//           });
//           isOK = false;
//         }
//         if (room.images.length === 0 && isOK) {
//           notification.error({
//             message: t('room_image_require', {
//               no: 1000 * (floorIdx + 1) + billInfo.value.floors.findIndex((floor) => floor.rooms.includes(room)) + 1,
//             }),
//           });
//           isOK = false;
//         }
//       });
//     });
  
//     return isOK;
//   }
  
  // ---------------------- Watchers ----------------------
//   watch(step, () => {
//     if (step.value === 2) {
//       if (!checkStep1()) {
//         step.value = 1;
//       }
//     }
//     if (step.value === 3) {
//       if (!checkStep2()) {
//         step.value = 2;
//       }
//       billInfo.value.images = billInfo.value.images.filter((image: UploadFile) => image.status === 'done');
//     }
//   });
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
  