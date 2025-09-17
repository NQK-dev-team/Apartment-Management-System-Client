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
        <div class="mt-5">
          <div class="flex mb-1 text-xl font-bold">
            {{ $t('attached_file') }}
          </div>
          <div class="inline-block">
            <a-upload
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
            </a-upload>
          </div>
        </div>
        <div class="flex items-center mt-5">
          <h2 class="me-3 text-xl font-bold">{{ $t('reciever') }}:</h2>
          <p
            v-if="userRole?.toString() === roles.owner"
            id="receiverEmployee"
            name="receiverEmployee"
            class="me-3 cursor-pointer select-none"
            :class="[
              option === 1
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="
              () => {
                option = 1;
                // notificationData.receivers = [];
              }
            "
          >
            {{ $t('employee') }}
          </p>
          <p
            id="receiverCustomer"
            name="receiverCustomer"
            class="mx-3 cursor-pointer select-none"
            :class="[
              option === 2
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="
              () => {
                option = 2;
                // notificationData.receivers = [];
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
                id="chooseAllEmployee"
                v-model:checked="chooseAllStaff"
                name="chooseAllEmployee"
                class="ms-5"
                >{{ $t('choose_all_employee') }}</a-checkbox
              >
            </div>
            <div v-show="option === 2" class="items-center justify-between" style="display: flex">
              <div class="flex items-center">
                <h2 class="text-xl font-bold">{{ $t('customer_list') }}</h2>
                <a-checkbox
                  id="chooseAllCustomer"
                  v-model:checked="chooseAllCustomer"
                  name="chooseAllCustomer"
                  class="ms-5"
                  >{{ $t('choose_all_customer') }}</a-checkbox
                >
              </div>
              <div v-show="showLoadingIcon" class="items-center" style="display: flex">
                <a-spin :indicator="indicator" :class="[lightMode ? 'text-[#737373]' : 'text-black']" />
                <p class="ms-2" :class="[lightMode ? 'text-[#737373]' : 'text-black']">{{ $t('loading_data') }}</p>
              </div>
            </div>
          </ClientOnly>
        </div>
        <CommonNoticeEmployeeTable
          v-if="userRole?.toString() === roles.owner && option === 1"
          :staff-list="staffList"
          :notification-data="notificationData"
        />
        <CommonNoticeCustomerTable
          v-if="option === 2"
          :customer-list="customerList"
          :notification-data="notificationData"
        />
        <div class="flex flex-col items-center my-5">
          <a-button
            id="sendNotificationButton"
            name="sendNotificationButton"
            class="my-2 rounded-sm"
            type="primary"
            :disabled="
              notificationData.title === '' ||
              notificationData.content === '' ||
              (notificationData.customerReceivers.length === 0 && notificationData.staffReceivers.length === 0)
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
import type { User } from '~/types/user';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { Upload, type UploadFile } from 'ant-design-vue';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'New Notice',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'New Notice',
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
const option = ref<number>(userRole.value?.toString() === roles.owner ? 1 : 2);
const customerListAPIOffset = ref<number>(0);
const customerListAPILimit = ref<number>(500);
const staffList = ref<User[]>([]);
const customerList = ref<User[]>([]);
const notificationData = ref({
  title: '',
  content: '',
  customerReceivers: [] as number[],
  staffReceivers: [] as number[],
  files: [] as UploadFile[],
});
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
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    } else if (
      err.response._data.message === getMessageCode('PERMISSION_DENIED') ||
      err.response._data.message === getMessageCode('INVALID_CREDENTIALS') ||
      err.response._data.message === getMessageCode('TOKEN_REFRESH_FAILED') ||
      err.response._data.message === getMessageCode('TOKEN_VERIFY_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('no_permission'),
      });
    } else if (
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('failed'),
        description: t('request_error'),
      });
    } else if (
      err.response._data.message === getMessageCode('UPDATE_FAILED') ||
      err.response._data.message === getMessageCode('CREATE_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('data_invalid'),
      });
    } else if (err.response._data.message === getMessageCode('DATA_NOT_FOUND')) {
      notification.error({
        message: t('failed'),
        description: t('data_not_found'),
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
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    } else if (
      err.response._data.message === getMessageCode('PERMISSION_DENIED') ||
      err.response._data.message === getMessageCode('INVALID_CREDENTIALS') ||
      err.response._data.message === getMessageCode('TOKEN_REFRESH_FAILED') ||
      err.response._data.message === getMessageCode('TOKEN_VERIFY_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('no_permission'),
      });
    } else if (
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('failed'),
        description: t('request_error'),
      });
    } else if (
      err.response._data.message === getMessageCode('UPDATE_FAILED') ||
      err.response._data.message === getMessageCode('CREATE_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('data_invalid'),
      });
    } else if (err.response._data.message === getMessageCode('DATA_NOT_FOUND')) {
      notification.error({
        message: t('failed'),
        description: t('data_not_found'),
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

    if (notificationData.value.title === '') {
      notification.error({
        message: t('notification_send_fail'),
        description: t('notification_title_required'),
      });
      return;
    }

    if (notificationData.value.title.length > COMMON.MAX_LENGTH.NOTIFICATION_TITLE) {
      notification.error({
        message: t('notification_send_fail'),
        description: t('notification_title_max_length', { length: COMMON.MAX_LENGTH.NOTIFICATION_TITLE }),
      });
      return;
    }

    if (
      notificationData.value.content === '' ||
      notificationData.value.content === '<p></p>' ||
      notificationData.value.content === '<p><br></p>'
    ) {
      notification.error({
        message: t('notification_send_fail'),
        description: t('notification_content_required'),
      });
      return;
    }

    if (notificationData.value.customerReceivers.length === 0 && notificationData.value.staffReceivers.length === 0) {
      notification.error({
        message: t('notification_send_fail'),
        description: t('notification_receiver_required'),
      });
      return;
    }

    const data = new FormData();
    data.append('title', notificationData.value.title.trim());
    data.append('content', sanitizeString(notificationData.value.content.trim()));
    // notificationData.value.receivers.forEach((receiver) => {
    //   data.append('receivers[]', receiver.toString());
    // });
    data.append(
      'receiverStr',
      [...notificationData.value.customerReceivers, ...notificationData.value.staffReceivers].join(',')
    );
    notificationData.value.files.forEach((file) => {
      data.append('files[]', file.originFileObj as File);
    });

    await api.common.notice.add(data);

    notification.success({
      message: t('success'),
      description: t('notification_sent'),
    });

    notificationData.value = {
      title: '',
      content: '<p></p>',
      customerReceivers: [],
      staffReceivers: [],
      files: [],
    };
    chooseAllCustomer.value = false;
    chooseAllStaff.value = false;
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    } else if (
      err.response._data.message === getMessageCode('PERMISSION_DENIED') ||
      err.response._data.message === getMessageCode('INVALID_CREDENTIALS') ||
      err.response._data.message === getMessageCode('TOKEN_REFRESH_FAILED') ||
      err.response._data.message === getMessageCode('TOKEN_VERIFY_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('no_permission'),
      });
    } else if (
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('failed'),
        description: t('request_error'),
      });
    } else if (
      err.response._data.message === getMessageCode('UPDATE_FAILED') ||
      err.response._data.message === getMessageCode('CREATE_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('data_invalid'),
      });
    } else if (err.response._data.message === getMessageCode('DATA_NOT_FOUND')) {
      notification.error({
        message: t('failed'),
        description: t('data_not_found'),
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

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  $event.emit('loading');
  if (userRole.value?.toString() === roles.owner) {
    await getEmployeeList(false);
  }
  await getCustomerList(false);
  $event.emit('loading');
});

// ---------------------- Watchers ----------------------
watch(customerListAPIOffset, () => {
  getCustomerList(false);
});

watch(chooseAllStaff, () => {
  if (chooseAllStaff.value) {
    notificationData.value.staffReceivers = staffList.value.map((item) => item.ID);
  } else {
    notificationData.value.staffReceivers = [];
  }
});

watch(chooseAllCustomer, () => {
  if (chooseAllCustomer.value) {
    notificationData.value.customerReceivers = customerList.value.map((item) => item.ID);
  } else {
    notificationData.value.customerReceivers = [];
  }
});

watch(
  () => customerList.value.length,
  () => {
    if (chooseAllCustomer.value) {
      notificationData.value.customerReceivers = customerList.value.map((item) => item.ID);
    }
  }
);
</script>
