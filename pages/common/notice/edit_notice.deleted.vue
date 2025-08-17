<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.notice.sent">{{ $t('sent_notice') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('edit_notice') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('edit_notice') }}</h1>
    </div>
    <div class="mt-5 overflow-auto p-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <div v-if="notificationInfo" class="w-full flex-1 flex flex-col mt-3">
        <div>
          <label for="title" class="flex mb-1 text-xl font-bold">
            <span>{{ $t('title') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="title" v-model:value="notificationInfo.title" :placeholder="$t('title')" class="mt-2" />
        </div>
        <div class="mt-5">
          <div class="flex mb-1 text-xl font-bold">
            {{ $t('content') }}
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </div>
          <ClientOnly>
            <CommonNoticeQuill id="content" v-model:content="notificationInfo.content" />
          </ClientOnly>
        </div>
        <div class="mt-5">
          <div class="flex mb-1 text-xl font-bold">
            {{ $t('attached_file') }}
          </div>
          <div class="inline-block">
            <!-- <a-upload
              id="files"
              v-model:file-list="notificationData.files"
              class="mt-2"
              :accept="COMMON.ALLOW_FILE_EXTENSIONS.join(',')"
              multiple
              :before-upload="beforeUploadFile"
            >
              <a-button class="flex items-center">
                <upload-outlined></upload-outlined>
                {{ $t('upload_file') }}
              </a-button>
            </a-upload> -->
          </div>
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
              <a-checkbox v-model:checked="chooseAllStaff" class="ms-5">{{ $t('choose_all_employee') }}</a-checkbox>
            </div>
            <div v-show="option === 2" class="items-center justify-between" style="display: flex">
              <div class="flex items-center">
                <h2 class="text-xl font-bold">{{ $t('customer_list') }}</h2>
                <a-checkbox v-model:checked="chooseAllCustomer" class="ms-5">{{
                  $t('choose_all_customer')
                }}</a-checkbox>
              </div>
              <div v-show="showLoadingIcon" class="items-center" style="display: flex">
                <a-spin :indicator="indicator" :class="[lightMode ? 'text-[#737373]' : 'text-black']" />
                <p class="ms-2" :class="[lightMode ? 'text-[#737373]' : 'text-black']">{{ $t('loading_data') }}</p>
              </div>
            </div>
          </ClientOnly>
        </div>
        <!-- <CommonNoticeEmployeeTable
          v-if="userRole?.toString() === roles.owner && option === 1"
          :staff-list="staffList"
          :notification-data="notificationData"
        />
        <CommonNoticeCustomerTable
          v-if="option === 2"
          :customer-list="customerList"
          :notification-data="notificationData"
        /> -->
        <div class="flex flex-col items-center my-5">
          <a-button
            class="my-2 rounded-sm"
            type="primary"
            :disabled="
              notificationInfo &&
              (notificationInfo.title === '' ||
                notificationInfo.content === '' ||
                (notificationInfo.customerReceivers!.length === 0 && notificationInfo.staffReceivers!.length === 0))
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
import { api } from '~/services/api';
import type { Notification } from '~/types/notification';
import type { User } from '~/types/user';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { Upload, type UploadFile } from 'ant-design-vue';
import { roles } from '~/consts/roles';
import { svgPaths } from '~/consts/svg_paths';
import { pageRoutes } from '~/consts/page_routes';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Edit Notice',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Edit Notice',
  meta: [
    {
      name: 'description',
      content: "Edit user's sent notification",
    },
  ],
});

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const route = useRoute();
const notificationId = Number(route.params.id as string);
const { $event } = useNuxtApp();
const { t } = useI18n();
const notificationInfo = ref<Notification | null>(null);
const userRole = useCookie('userRole');
const option = ref<number>(userRole.value?.toString() === roles.owner ? 1 : 2);
const customerListAPIOffset = ref<number>(0);
const customerListAPILimit = ref<number>(500);
const staffList = ref<User[]>([]);
const customerList = ref<User[]>([]);
const chooseAllStaff = ref(false);
const chooseAllCustomer = ref(false);
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
    'z-index': 20010,
  },
  spin: true,
});
const showLoadingIcon = ref(true);

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

    if (response.data.length === 0) {
      showLoadingIcon.value = false;
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

async function getNotificationDetail() {
  try {
    $event.emit('loading');

    const response = await api.common.notice.getDetail(notificationId);
    notificationInfo.value = response.data;

    await getEmployeeList(false);
    await getCustomerList(false);
  } catch (err: any) {
    notificationInfo.value = null;
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      throw createError({
        status: 500,
        message: 'Internal server error',
        fatal: true,
      });
    }
  } finally {
    $event.emit('loading');
  }
}

function beforeUploadFile(file: any): boolean | string {
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_FILE_EXTENSIONS.includes(`.${type}`) && !COMMON.ALLOW_FILE_EXTENSIONS_ADVANCE.includes(type)) {
    notification.error({
      message: t('invalid_file_title'),
      description: t('invalid_file_type', { types: COMMON.ALLOW_FILE_EXTENSIONS.join(', ') }),
    });
    return Upload.LIST_IGNORE;
  }

  if (file.size >= COMMON.FILE_SIZE_LIMIT) {
    notification.error({
      message: t('invalid_file_title'),
      description: t('invalid_file_size', { size: COMMON.FILE_SIZE_LIMIT_STR }),
    });
    return Upload.LIST_IGNORE;
  }
  return true;
}

async function sendNotification() {
  try {
    $event.emit('loading');
  } catch (err: any) {
  } finally {
    $event.emit('loading');
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  await getNotificationDetail();

  if (!notificationInfo.value || !notificationInfo.value.ID) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});

// ---------------------- Watchers ----------------------
watch(customerListAPIOffset, () => {
  getCustomerList(false);
});

watch(chooseAllStaff, () => {
  if (notificationInfo.value) {
    if (chooseAllStaff.value) {
      notificationInfo.value.receivers = staffList.value.map((item) => item.ID);
    } else {
      notificationInfo.value.receivers = [];
    }
  }
});

watch(chooseAllCustomer, () => {
  if (notificationInfo.value) {
    if (chooseAllCustomer.value) {
      notificationInfo.value.receivers = customerList.value.map((item) => item.ID);
    } else {
      notificationInfo.value.receivers = [];
    }
  }
});

watch(
  () => customerList.value.length,
  () => {
    if (chooseAllCustomer.value) {
      // notificationData.value.receivers = customerList.value.map((item) => item.ID);
    }
  }
);
</script>
