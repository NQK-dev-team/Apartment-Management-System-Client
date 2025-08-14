<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('new_notice') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('new_notice') }}</h1>
    </div>
    <div class="mt-5 overflow-auto p-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <div class="w-full flex-1 flex flex-col mt-3">
        <div>
          <label for="title" class="flex mb-1 text-xl font-bold">
            <span>{{ $t('title') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="title" v-model:value="notificationData.title" :placeholder="$t('title')" class="mt-2" />
        </div>
        <div class="mt-5">
          <div class="flex mb-1 text-xl font-bold">
            {{ $t('content') }}
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </div>
          <ClientOnly>
            <CommonNoticeQuill id="content" v-model:content="notificationData.content" />
          </ClientOnly>
        </div>
        <div class="flex items-center mt-5">
          <h2 class="me-3 text-xl font-bold">{{ $t('reciever') }}:</h2>
          <p
            v-if="userRole?.toString() === roles.owner"
            class="me-3 cursor-pointer select-none"
            :class="[
              option === 1
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="
              () => {
                option = 1;
                notificationData.recievers = [];
              }
            "
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
            @click="
              () => {
                option = 2;
                notificationData.recievers = [];
              }
            "
          >
            {{ $t('customer') }}
          </p>
        </div>
        <div class="flex flex-col justify-start mt-5">
          <ClientOnly>
            <div
              v-if="userRole?.toString() === roles.owner"
              v-show="option === 1"
              class="items-center"
              style="display: flex"
            >
              <h2 class="text-xl font-bold">
                {{ $t('employee_list') }}
              </h2>
              <a-checkbox
                class="ms-5"
                :checked="
                  !!notificationData.recievers.length &&
                  notificationData.recievers.length === staffList.length &&
                  notificationData.recievers.every((receiver) => !!staffList.find((item) => item.ID === receiver))
                "
                @change="
                  (e) => {
                    if (e.target.checked) {
                      notificationData.recievers = staffList.map((item) => item.ID);
                    } else {
                      notificationData.recievers = [];
                    }
                  }
                "
                >{{ $t('choose_all_employee') }}</a-checkbox
              >
            </div>
            <div v-show="option === 2" class="items-center" style="display: flex">
              <h2 class="text-xl font-bold">{{ $t('customer_list') }}</h2>
              <a-checkbox
                class="ms-5"
                :checked="
                  !!notificationData.recievers.length &&
                  notificationData.recievers.length === customerList.length &&
                  notificationData.recievers.every((receiver) => !!customerList.find((item) => item.ID === receiver))
                "
                @change="
                  (e) => {
                    if (e.target.checked) {
                      notificationData.recievers = customerList.map((item) => item.ID);
                    } else {
                      notificationData.recievers = [];
                    }
                  }
                "
                >{{ $t('choose_all_customer') }}</a-checkbox
              >
            </div>
          </ClientOnly>
        </div>
        <div class="mt-5">
          <CommonNoticeEmployeeTable
            v-if="userRole?.toString() === roles.owner && option === 1"
            :staff-list="staffList"
            :notification-data="notificationData"
            :building-list="buildingList"
          />
          <CommonNoticeCustomerTable
            v-if="option === 2"
            :customer-list="customerList"
            :notification-data="notificationData"
            :building-list="buildingList"
          />
        </div>
        <div class="flex flex-col items-center my-5">
          <a-button
            class="my-2 rounded-sm"
            type="primary"
            :disabled="
              notificationData.title === '' ||
              notificationData.content === '' ||
              notificationData.recievers.length === 0
            "
            @click="sendNotification"
          >
            {{ $t('send_notification') }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { roles } from '~/consts/roles';
import { svgPaths } from '~/consts/svg_paths';
import { api } from '~/services/api';
import type { Building } from '~/types/building';
import type { User } from '~/types/user';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'New notice',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'New notice',
  meta: [
    {
      name: 'description',
      content: 'Write new notice for customers or employees',
    },
  ],
});

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { t } = useI18n();
const { $event } = useNuxtApp();
const userRole = useCookie('userRole');
const option = ref<number>(1);
const customerListAPIOffset = ref<number>(0);
const customerListAPILimit = ref<number>(500);
const staffList = ref<User[]>([]);
const customerList = ref<User[]>([]);
const notificationData = ref({
  title: '',
  content: '',
  recievers: [] as number[],
});
const buildingList = ref<Building[]>([]);

// ---------------------- Functions ----------------------
async function getEmployeeList(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }

    const response = await api.common.staff.getList();
    staffList.value = response.data;
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    if (emitLoading) {
      $event.emit('loading');
    }
  }
}

async function getCustomerList(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }

    const response = await api.common.customer.getList(customerListAPILimit.value, customerListAPIOffset.value);

    if (customerListAPIOffset.value === 0) {
      customerList.value = response.data;
    } else {
      customerList.value.push(...response.data);
    }

    if (response.data.length === customerListAPILimit.value) {
      customerListAPIOffset.value += customerListAPILimit.value;
    }
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    if (emitLoading) {
      $event.emit('loading');
    }
  }
}

async function getBuildingList(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }
    const response = await api.common.building.getList();
    buildingList.value = response.data;
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    if (emitLoading) {
      $event.emit('loading');
    }
  }
}

async function sendNotification() {
  try {
    $event.emit('loading');

    console.log(notificationData.value);

    if (notificationData.value.title === '') {
      notification.error({
        message: t('notification_send_fail'),
        description: t('notification_title_required'),
      });
      return;
    }

    if (notificationData.value.content === '') {
      notification.error({
        message: t('notification_send_fail'),
        description: t('notification_content_required'),
      });
      return;
    }

    if (notificationData.value.recievers.length === 0) {
      notification.error({
        message: t('notification_send_fail'),
        description: t('notification_receiver_required'),
      });
      return;
    }

    notification.success({
      message: t('success'),
      description: t('notification_sent'),
    });

    notificationData.value = {
      title: '',
      content: '',
      recievers: [],
    };
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    $event.emit('loading');
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  $event.emit('loading');
  if (userRole.value?.toString() === roles.owner) {
    getEmployeeList(false);
  }
  getCustomerList(false);
  getBuildingList(false);
  $event.emit('loading');
});

// ---------------------- Watchers ----------------------
watch(customerListAPIOffset, () => {
  getCustomerList(false);
});
</script>
