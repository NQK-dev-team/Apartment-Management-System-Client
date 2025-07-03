<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.customer.list">{{ $t('customer_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('add_customer') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('add_customer') }}</h1>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <a-form v-show="!addSuccess" class="py-3" :model="customerInfo" layout="vertical" @finish="addCustomer">
        <div class="grid grid-cols-6 gap-x-2">
          <div class="col-span-5">
            <div class="h-full flex-1 flex flex-col">
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="lastName"
                  :rules="[{ required: true, message: $t('customer_last_name_require'), trigger: 'blur' }]"
                >
                  <label for="lastName" class="flex mb-1">
                    <span>{{ $t('last_name') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="lastName"
                    v-model:value="customerInfo.lastName"
                    :placeholder="$t('enter_customer_last_name')"
                  />
                </a-form-item>
                <a-form-item class="flex-1" name="middleName">
                  <label for="middleName" class="flex mb-1">
                    <span>{{ $t('middle_name') }}</span>
                  </label>
                  <a-input
                    id="middleName"
                    v-model:value="customerInfo.middleName"
                    :placeholder="$t('enter_customer_middle_name')"
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="firstName"
                  :rules="[{ required: true, message: $t('customer_first_name_require'), trigger: 'blur' }]"
                >
                  <label for="firstName" class="flex mb-1">
                    <span>{{ $t('name') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="firstName"
                    v-model:value="customerInfo.firstName"
                    :placeholder="$t('enter_customer_first_name')"
                  />
                </a-form-item>
                <a-form-item
                  class="flex-1"
                  name="dob"
                  :rules="[
                    { required: true, message: $t('please_select_customer_birthdate'), trigger: 'blur' },
                    {
                      validator: async (_: RuleObject, value: string) =>
                        validationRules.dateOfBirth(_, value, $t, true),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <label for="dob" class="flex mb-1">
                    <span>{{ $t('dob') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-date-picker
                    id="dob"
                    v-model:value="customerInfo.dob"
                    class="w-full"
                    :placeholder="$t('select_customer_dob')"
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="gender"
                  :rules="[{ required: true, message: $t('please_select_customer_gender'), trigger: 'blur' }]"
                >
                  <label for="gender" class="flex mb-1">
                    <span>{{ $t('gender') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-select
                    id="gender"
                    v-model:value="customerInfo.gender"
                    class="w-full"
                    :class="[customerInfo.gender === 0 ? 'text-gray-500' : '']"
                    :placeholder="$t('select_customer_gender')"
                  >
                    <a-select-option :value="COMMON.USER_GENDER.MALE">{{ $t('male') }}</a-select-option>
                    <a-select-option :value="COMMON.USER_GENDER.FEMALE">{{ $t('female') }}</a-select-option>
                    <a-select-option :value="COMMON.USER_GENDER.OTHER">{{ $t('other') }}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  class="flex-1"
                  name="ssn"
                  :rules="[
                    { required: true, message: $t('please_enter_customer_ssn'), trigger: 'blur' },
                    { pattern: /^[0-9]{12}$/, message: $t('invalid_ssn'), trigger: 'blur' },
                  ]"
                >
                  <label for="ssn" class="flex mb-1">
                    <span>{{ $t('ssn') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input id="ssn" v-model:value="customerInfo.ssn" :placeholder="$t('enter_customer_ssn')" />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="oldSSN"
                  :rules="[{ pattern: /^[0-9]{9}$/, message: $t('invalid_oldSSN'), trigger: 'blur' }]"
                >
                  <label for="oldSSN" class="flex mb-1">
                    <span>{{ $t('old_ssn') }}</span>
                  </label>
                  <a-input
                    id="oldSSN"
                    v-model:value="customerInfo.oldSSN"
                    :placeholder="$t('enter_customer_old_ssn')"
                  />
                </a-form-item>
                <a-form-item
                  class="flex-1"
                  name="pob"
                  :rules="[{ required: true, message: $t('please_enter_customer_pob'), trigger: 'blur' }]"
                >
                  <label for="pob" class="flex mb-1">
                    <span>{{ $t('pob') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input id="pob" v-model:value="customerInfo.pob" :placeholder="$t('enter_customer_pob')" />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="phone"
                  :rules="[
                    { required: true, message: $t('please_enter_customer_phone'), trigger: 'blur' },
                    { pattern: /^[0-9]{10}$/, message: $t('invalid_phone'), trigger: 'blur' },
                  ]"
                >
                  <label for="phone" class="flex mb-1">
                    <span>{{ $t('phone') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="phone"
                    v-model:value="customerInfo.phone"
                    :placeholder="$t('enter_customer_phone')"
                    autocomplete="phone"
                  />
                </a-form-item>
                <a-form-item
                  class="flex-1"
                  name="email"
                  :rules="[
                    { required: true, message: $t('please_enter_customer_email'), trigger: 'blur' },
                    { type: 'email', message: $t('email_invalid'), trigger: 'blur' },
                  ]"
                >
                  <label for="email" class="flex mb-1">
                    <span>{{ $t('email') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="email"
                    v-model:value="customerInfo.email"
                    :placeholder="$t('enter_customer_email')"
                    autocomplete="email"
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="permanentAddress"
                  :rules="[{ required: true, message: $t('please_enter_customer_permanent_address'), trigger: 'blur' }]"
                >
                  <label for="permanent_address" class="flex mb-1">
                    <span>{{ $t('permanent_address') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="permanent_address"
                    v-model:value="customerInfo.permanentAddress"
                    :placeholder="$t('enter_customer_permanent_address')"
                    autocomplete="off"
                  />
                </a-form-item>
                <div class="flex-1">
                  <a-form-item
                    class="flex-1 me-2"
                    name="temporaryAddress"
                    :rules="[
                      { required: true, message: $t('please_enter_customer_temporary_address'), trigger: 'blur' },
                    ]"
                  >
                    <label for="temporary_address" class="flex mb-1">
                      <span>{{ $t('temporary_address') }}</span>
                      <span class="text-red-500 ms-1">*</span>
                    </label>
                    <a-input
                      id="temporary_address"
                      v-model:value="customerInfo.temporaryAddress"
                      :placeholder="$t('enter_customer_temporary_address')"
                      autocomplete="off"
                    />
                  </a-form-item>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-1 px-3">
            <a-form-item
              class="align_validation_message_middle"
              name="profileFilePath"
              :rules="[{ required: true, message: $t('image_require'), trigger: 'blur' }]"
            >
              <label for="profileFilePath">{{ $t('avatar') }}<span class="text-red-500 ms-1">*</span></label>
              <img
                v-if="!customerInfo.profileFilePath || !customerInfo.profileFilePath.length"
                :src="svgPaths.placeholderImage"
                :alt="$t('avatar')"
                class="w-full h-full mt-1"
              />
              <img v-else :src="previewAvatar" :alt="$t('avatar')" class="w-full h-full mt-1" />
              <div class="text-center mt-3">
                <a-upload
                  id="profileFilePath"
                  v-model:file-list="customerInfo.profileFilePath"
                  :accept="COMMON.ALLOW_IMAGE_EXTENSIONS.join(',')"
                  :max-count="1"
                  :before-upload="beforeUploadAvatarImage"
                  @change="handleAvatarChange"
                >
                  <a-button class="flex items-center rounded-sm">
                    <upload-outlined></upload-outlined>
                    {{ $t('upload_file') }}
                  </a-button>
                </a-upload>
              </div>
            </a-form-item>
            <div class="text-sm text-center" :class="[lightMode ? 'text-[#00000080]' : 'text-[#d2d2d2a3]']">
              {{ $t('recommended_resolution') }}
            </div>
            <a-form-item
              class="mt-5 align_validation_message_middle"
              name="ssnFrontFilePath"
              :rules="[{ required: true, message: $t('image_require'), trigger: 'blur' }]"
            >
              <label for="ssnFrontFilePath"
                >{{ $t('national_id') + ' ' + $t('front_face') }}<span class="text-red-500 ms-1">*</span></label
              >
              <img
                v-if="!customerInfo.ssnFrontFilePath || !customerInfo.ssnFrontFilePath.length"
                :src="svgPaths.placeholderImage"
                :alt="$t('national_id') + ' ' + $t('front_face')"
                class="w-full h-full mt-1"
              />
              <img v-else :src="previewSSNFront" :alt="$t('avatar')" class="w-full h-full mt-1" />
              <div class="text-center mt-3">
                <a-upload
                  id="ssnFrontFilePath"
                  v-model:file-list="customerInfo.ssnFrontFilePath"
                  :accept="COMMON.ALLOW_IMAGE_EXTENSIONS.join(',')"
                  :max-count="1"
                  :before-upload="beforeUploadSSNFrontImage"
                  @change="handleSSNFrontChange"
                >
                  <a-button class="flex items-center rounded-sm">
                    <upload-outlined></upload-outlined>
                    {{ $t('upload_file') }}
                  </a-button>
                </a-upload>
              </div>
            </a-form-item>
            <div class="text-sm text-center" :class="[lightMode ? 'text-[#00000080]' : 'text-[#d2d2d2a3]']">
              {{ $t('recommended_resolution') }}
            </div>
            <a-form-item
              class="mt-5 align_validation_message_middle"
              name="ssnBackFilePath"
              :rules="[{ required: true, message: $t('image_require'), trigger: 'blur' }]"
            >
              <label for="ssnBackFilePath"
                >{{ $t('national_id') + ' ' + $t('back_face') }}<span class="text-red-500 ms-1">*</span></label
              >
              <img
                v-if="!customerInfo.ssnBackFilePath || !customerInfo.ssnBackFilePath.length"
                :src="svgPaths.placeholderImage"
                :alt="$t('national_id') + ' ' + $t('back_face')"
                class="w-full h-full mt-1"
              />
              <img v-else :src="previewSSNBack" :alt="$t('avatar')" class="w-full h-full mt-1" />
              <div class="text-center mt-3">
                <a-upload
                  id="ssnBackFilePath"
                  v-model:file-list="customerInfo.ssnBackFilePath"
                  :accept="COMMON.ALLOW_IMAGE_EXTENSIONS.join(',')"
                  :max-count="1"
                  :before-upload="beforeUploadSSNBackImage"
                  @change="handleSSNBackChange"
                >
                  <a-button class="flex items-center rounded-sm">
                    <upload-outlined></upload-outlined>
                    {{ $t('upload_file') }}
                  </a-button>
                </a-upload>
              </div>
            </a-form-item>
            <div class="text-sm text-center" :class="[lightMode ? 'text-[#00000080]' : 'text-[#d2d2d2a3]']">
              {{ $t('recommended_resolution') }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center mt-5">
          <a-button class="w-[100px] rounded-sm" type="primary" html-type="submit">{{ $t('confirm') }}</a-button>
          <a-button class="w-[100px] rounded-sm mt-3" @click.prevent="navigateTo(pageRoutes.common.customer.list)">
            {{ $t('cancel') }}
          </a-button>
        </div>
      </a-form>
      <ClientOnly>
        <div v-show="addSuccess" class="h-full w-full flex-col items-center justify-center" style="display: flex">
          <div class="flex items-center justify-center mt-5">
            <Success class="text-green-600 text-4xl" />
          </div>
          <h2 class="text-xl my-2">{{ $t('finish') }}</h2>
          <p class="text-center my-2">{{ $t('add_customer_success_title') }}</p>
          <p class="text-center my-2">{{ $t('add_customer_success_note') }}</p>
          <div class="my-2 flex flex-col items-center">
            <NuxtLink :to="pageRoutes.common.customer.detail(newCustomerID)">
              <a-button type="primary" class="rounded-sm mb-2">{{ $t('new_customer_detail') }}</a-button>
            </NuxtLink>
            <NuxtLink :to="pageRoutes.common.customer.list" class="w-full">
              <a-button class="rounded-sm w-full">{{ $t('back') }}</a-button>
            </NuxtLink>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { svgPaths } from '~/consts/svg_paths';
import { pageRoutes } from '~/consts/page_routes';
import type { NewCustomer } from '~/types/user';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';
import type { Building } from '~/types/building';
import type { RuleObject } from 'ant-design-vue/es/form';
import { validationRules } from '~/consts/validation_rules';
import { COMMON } from '~/consts/common';
import Success from '~/public/svg/success.svg';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Add New Customer',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Add New Customer',
  meta: [
    {
      name: 'description',
      content: 'Add new customer information to the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const customerInfo = ref<NewCustomer>({
  firstName: '',
  middleName: '',
  lastName: '',
  ssn: '',
  oldSSN: '',
  dob: '',
  pob: '',
  email: '',
  phone: '',
  ssnFrontFilePath: undefined,
  ssnBackFilePath: undefined,
  profileFilePath: undefined,
  gender: undefined,
  temporaryAddress: '',
  permanentAddress: '',
});
const { $event } = useNuxtApp();
const previewAvatar = ref<string>('');
const previewSSNFront = ref<string>('');
const previewSSNBack = ref<string>('');
const buildingList = ref<Building[]>([]);
const isAvatarValid = ref<boolean>(false);
const isSSNFrontValid = ref<boolean>(false);
const isSSNBackValid = ref<boolean>(false);
const newCustomerID = ref<number>(0);
const addSuccess = ref<boolean>(false);

// ---------------------- Functions ----------------------
async function handleAvatarChange(event: UploadChangeParam<UploadFile<any>>) {
  if (!isAvatarValid.value) {
    customerInfo.value.profileFilePath = [];
  }

  let isDone = true;

  event.fileList.forEach((file) => {
    if (file.status !== 'done') {
      isDone = false;
    }
  });

  if (!isDone) {
    return;
  }

  const files = event.fileList.map((file) => file.originFileObj);
  const imageList: string[] = [];
  // Array.from(files).forEach(async (file) => {
  //   if (file) {
  //     const base64 = await getBase64(file);
  //     imageList.push(base64 as string);
  //   }
  // });

  for (const file of files) {
    if (file) {
      const base64 = await getBase64(file);
      imageList.push(base64 as string);
    }
  }

  previewAvatar.value = imageList.length ? imageList[0] : '';
}

async function handleSSNFrontChange(event: UploadChangeParam<UploadFile<any>>) {
  if (!isSSNFrontValid.value) {
    customerInfo.value.ssnFrontFilePath = [];
  }

  let isDone = true;

  event.fileList.forEach((file) => {
    if (file.status !== 'done') {
      isDone = false;
    }
  });

  if (!isDone) {
    return;
  }

  const files = event.fileList.map((file) => file.originFileObj);
  const imageList: string[] = [];
  // Array.from(files).forEach(async (file) => {
  //   if (file) {
  //     const base64 = await getBase64(file);
  //     imageList.push(base64 as string);
  //   }
  // });

  for (const file of files) {
    if (file) {
      const base64 = await getBase64(file);
      imageList.push(base64 as string);
    }
  }

  previewSSNFront.value = imageList.length ? imageList[0] : '';
}

async function handleSSNBackChange(event: UploadChangeParam<UploadFile<any>>) {
  if (!isSSNBackValid.value) {
    customerInfo.value.ssnBackFilePath = [];
  }

  let isDone = true;

  event.fileList.forEach((file) => {
    if (file.status !== 'done') {
      isDone = false;
    }
  });

  if (!isDone) {
    return;
  }

  const files = event.fileList.map((file) => file.originFileObj);
  const imageList: string[] = [];
  // Array.from(files).forEach(async (file) => {
  //   if (file) {
  //     const base64 = await getBase64(file);
  //     imageList.push(base64 as string);
  //   }
  // });

  for (const file of files) {
    if (file) {
      const base64 = await getBase64(file);
      imageList.push(base64 as string);
    }
  }

  previewSSNBack.value = imageList.length ? imageList[0] : '';
}

function beforeUploadAvatarImage(file: any): boolean {
  isAvatarValid.value = false;
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_IMAGE_EXTENSIONS.includes(`.${type}`)) {
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_file_type', { types: COMMON.ALLOW_IMAGE_EXTENSIONS.join(', ') }),
    });
    return false;
  }

  if (file.size >= COMMON.IMAGE_SIZE_LIMIT) {
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_size', { size: COMMON.IMAGE_SIZE_LIMIT_STR }),
    });
    return false;
  }
  isAvatarValid.value = true;
  return true;
}

function beforeUploadSSNFrontImage(file: any): boolean {
  isSSNFrontValid.value = false;
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_IMAGE_EXTENSIONS.includes(`.${type}`)) {
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_file_type', { types: COMMON.ALLOW_IMAGE_EXTENSIONS.join(', ') }),
    });
    return false;
  }

  if (file.size >= COMMON.IMAGE_SIZE_LIMIT) {
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_size', { size: COMMON.IMAGE_SIZE_LIMIT_STR }),
    });
    return false;
  }
  isSSNFrontValid.value = true;
  return true;
}

function beforeUploadSSNBackImage(file: any): boolean {
  isSSNBackValid.value = false;
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_IMAGE_EXTENSIONS.includes(`.${type}`)) {
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_file_type', { types: COMMON.ALLOW_IMAGE_EXTENSIONS.join(', ') }),
    });
    return false;
  }

  if (file.size >= COMMON.IMAGE_SIZE_LIMIT) {
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_size', { size: COMMON.IMAGE_SIZE_LIMIT_STR }),
    });
    return false;
  }
  isSSNBackValid.value = true;
  return true;
}

async function getBuildingList() {
  try {
    $event.emit('loading');
    const buildingResponse = await api.common.building.getList();
    buildingList.value = buildingResponse.data;
  } catch (err: any) {
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

async function addCustomer() {
  try {
    $event.emit('loading');

    const data = new FormData();
    data.append('firstName', customerInfo.value.firstName.trim());
    data.append('lastName', customerInfo.value.lastName.trim());
    data.append('middleName', customerInfo.value.middleName ? customerInfo.value.middleName.trim() : '');
    data.append('ssn', customerInfo.value.ssn.trim());
    data.append('oldSSN', customerInfo.value.oldSSN ? customerInfo.value.oldSSN.trim() : '');
    data.append('dob', convertToDate(customerInfo.value.dob));
    data.append('pob', customerInfo.value.pob.trim());
    data.append('phone', customerInfo.value.phone.trim());
    data.append('permanentAddress', customerInfo.value.permanentAddress.trim());
    data.append('temporaryAddress', customerInfo.value.temporaryAddress.trim());
    data.append('email', customerInfo.value.email.trim());
    data.append('gender', customerInfo.value.gender ? customerInfo.value.gender.toString() : '3');
    data.append('profileImage', customerInfo.value.profileFilePath[0].originFileObj as File);
    data.append('frontSSNImage', customerInfo.value.ssnFrontFilePath[0].originFileObj as File);
    data.append('backSSNImage', customerInfo.value.ssnBackFilePath[0].originFileObj as File);

    const response = await api.common.customer.add(data);
    newCustomerID.value = response.data;
    addSuccess.value = true;

    // notification.info({
    //   message: t('add_customer_success'),
    //   description: t('new_customer_added_to_system'),
    // });
    // navigateTo(pageRoutes.common.customer.list);
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
    if (err.response._data.message === getMessageCode('EMAIL_ALREADY_EXISTS')) {
      notification.error({
        message: t('add_customer_fail'),
        description: t('email_exists'),
      });
    }
    if (err.response._data.message === getMessageCode('SSN_ALREADY_EXISTS')) {
      notification.error({
        message: t('add_customer_fail'),
        description: t('ssn_exists'),
      });
    }
    if (err.response._data.message === getMessageCode('PHONE_ALREADY_EXISTS')) {
      notification.error({
        message: t('add_customer_fail'),
        description: t('phone_exists'),
      });
    }
    if (err.response._data.message === getMessageCode('OLD_SSN_ALREADY_EXISTS')) {
      notification.error({
        message: t('add_customer_fail'),
        description: t('old_ssn_exists'),
      });
    }
  } finally {
    $event.emit('loading');
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getBuildingList();
});
</script>
