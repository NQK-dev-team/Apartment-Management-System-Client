<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.staff.list">{{ $t('employee_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('add_employee') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('add_employee') }}</h1>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <a-form class="py-3" :model="staffInfo" layout="vertical" @finish="addStaff">
        <div class="grid grid-cols-6 gap-x-2">
          <div class="col-span-5">
            <div class="h-full flex-1 flex flex-col">
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="lastName"
                  :rules="[{ required: true, message: $t('employee_last_name_require'), trigger: 'blur' }]"
                >
                  <label for="lastName" class="flex mb-1">
                    <span>{{ $t('last_name') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="lastName"
                    v-model:value="staffInfo.lastName"
                    :placeholder="$t('enter_employee_last_name')"
                  />
                </a-form-item>
                <a-form-item class="flex-1" name="middleName">
                  <label for="middleName" class="flex mb-1">
                    <span>{{ $t('middle_name') }}</span>
                  </label>
                  <a-input
                    id="middleName"
                    v-model:value="staffInfo.middleName"
                    :placeholder="$t('enter_employee_middle_name')"
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="firstName"
                  :rules="[{ required: true, message: $t('employee_first_name_require'), trigger: 'blur' }]"
                >
                  <label for="firstName" class="flex mb-1">
                    <span>{{ $t('name') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="firstName"
                    v-model:value="staffInfo.firstName"
                    :placeholder="$t('enter_employee_first_name')"
                  />
                </a-form-item>
                <a-form-item
                  class="flex-1"
                  name="dob"
                  :rules="[
                    { required: true, message: $t('please_select_employee_birthdate'), trigger: 'blur' },
                    {
                      validator: async (_: RuleObject, value: string) => validationRules.dateOfBirth(_, value, $t),
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
                    v-model:value="staffInfo.dob"
                    class="w-full"
                    :placeholder="$t('select_employee_dob')"
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="gender"
                  :rules="[{ required: true, message: $t('please_select_employee_gender'), trigger: 'blur' }]"
                >
                  <label for="gender" class="flex mb-1">
                    <span>{{ $t('gender') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-select
                    id="gender"
                    v-model:value="staffInfo.gender"
                    class="w-full"
                    :class="[staffInfo.gender === 0 ? 'text-gray-500' : '']"
                    :placeholder="$t('select_employee_gender')"
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
                    { required: true, message: $t('please_enter_employee_ssn'), trigger: 'blur' },
                    { pattern: /^[0-9]{12}$/, message: $t('invalid_ssn'), trigger: 'blur' },
                  ]"
                >
                  <label for="ssn" class="flex mb-1">
                    <span>{{ $t('ssn') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input id="ssn" v-model:value="staffInfo.ssn" :placeholder="$t('enter_employee_ssn')" />
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
                  <a-input id="oldSSN" v-model:value="staffInfo.oldSSN" :placeholder="$t('enter_employee_old_ssn')" />
                </a-form-item>
                <a-form-item
                  class="flex-1"
                  name="pob"
                  :rules="[{ required: true, message: $t('please_enter_employee_pob'), trigger: 'blur' }]"
                >
                  <label for="pob" class="flex mb-1">
                    <span>{{ $t('pob') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input id="pob" v-model:value="staffInfo.pob" :placeholder="$t('enter_employee_pob')" />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="phone"
                  :rules="[
                    { required: true, message: $t('please_enter_employee_phone'), trigger: 'blur' },
                    { pattern: /^[0-9]{10}$/, message: $t('invalid_phone'), trigger: 'blur' },
                  ]"
                >
                  <label for="phone" class="flex mb-1">
                    <span>{{ $t('phone') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="phone"
                    v-model:value="staffInfo.phone"
                    :placeholder="$t('enter_employee_phone')"
                    autocomplete="phone"
                  />
                </a-form-item>
                <a-form-item
                  class="flex-1"
                  name="email"
                  :rules="[
                    { required: true, message: $t('please_enter_employee_email'), trigger: 'blur' },
                    { type: 'email', message: $t('email_invalid'), trigger: 'blur' },
                  ]"
                >
                  <label for="email" class="flex mb-1">
                    <span>{{ $t('email') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="email"
                    v-model:value="staffInfo.email"
                    :placeholder="$t('enter_employee_email')"
                    autocomplete="email"
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item
                  class="flex-1 me-2"
                  name="permanentAddress"
                  :rules="[{ required: true, message: $t('please_enter_employee_permanent_address'), trigger: 'blur' }]"
                >
                  <label for="permanent_address" class="flex mb-1">
                    <span>{{ $t('permanent_address') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="permanent_address"
                    v-model:value="staffInfo.permanentAddress"
                    :placeholder="$t('enter_employee_permanent_address')"
                    autocomplete="off"
                  />
                </a-form-item>
                <div class="flex-1">
                  <a-form-item
                    class="flex-1 me-2"
                    name="temporaryAddress"
                    :rules="[
                      { required: true, message: $t('please_enter_employee_temporary_address'), trigger: 'blur' },
                    ]"
                  >
                    <label for="temporary_address" class="flex mb-1">
                      <span>{{ $t('temporary_address') }}</span>
                      <span class="text-red-500 ms-1">*</span>
                    </label>
                    <a-input
                      id="temporary_address"
                      v-model:value="staffInfo.temporaryAddress"
                      :placeholder="$t('enter_employee_temporary_address')"
                      autocomplete="off"
                    />
                  </a-form-item>
                </div>
              </div>
              <CommonStaffAddScheduleTable :schedules="staffInfo.schedules" :building-list="buildingList" />
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
                v-if="!staffInfo.profileFilePath || !staffInfo.profileFilePath.length"
                :src="svgPaths.placeholderImage"
                :alt="$t('avatar')"
                class="w-full h-full mt-1"
              />
              <img v-else :src="previewAvatar" :alt="$t('avatar')" class="w-full h-full mt-1" />
              <div class="text-center mt-3">
                <a-upload
                  id="profileFilePath"
                  v-model:file-list="staffInfo.profileFilePath"
                  :max-count="1"
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
                v-if="!staffInfo.ssnFrontFilePath || !staffInfo.ssnFrontFilePath.length"
                :src="svgPaths.placeholderImage"
                :alt="$t('national_id') + ' ' + $t('front_face')"
                class="w-full h-full mt-1"
              />
              <img v-else :src="previewSSNFront" :alt="$t('avatar')" class="w-full h-full mt-1" />
              <div class="text-center mt-3">
                <a-upload
                  id="ssnFrontFilePath"
                  v-model:file-list="staffInfo.ssnFrontFilePath"
                  :max-count="1"
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
                v-if="!staffInfo.ssnBackFilePath || !staffInfo.ssnBackFilePath.length"
                :src="svgPaths.placeholderImage"
                :alt="$t('national_id') + ' ' + $t('back_face')"
                class="w-full h-full mt-1"
              />
              <img v-else :src="previewSSNBack" :alt="$t('avatar')" class="w-full h-full mt-1" />
              <div class="text-center mt-3">
                <a-upload
                  id="ssnBackFilePath"
                  v-model:file-list="staffInfo.ssnBackFilePath"
                  :max-count="1"
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
          <a-button class="w-[100px] rounded-sm mt-3" @click.prevent="navigateTo(pageRoutes.common.staff.list)">
            {{ $t('cancel') }}
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { svgPaths } from '~/consts/svg_paths';
import { pageRoutes } from '~/consts/page_routes';
import type { NewStaff } from '~/types/user';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';
import type { Building } from '~/types/building';
import type { RuleObject } from 'ant-design-vue/es/form';
import { validationRules } from '~/consts/validation_rules';
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Add New Staff',
  layout: 'main',
  middleware: ['authorization-owner'],
});

useHead({
  title: 'Add New Staff',
  meta: [
    {
      name: 'description',
      content: 'Add new staff information to the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const staffInfo = ref<NewStaff>({
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
  schedules: [],
});
const { $event } = useNuxtApp();
const previewAvatar = ref<string>('');
const previewSSNFront = ref<string>('');
const previewSSNBack = ref<string>('');
const buildingList = ref<Building[]>([]);

// ---------------------- Functions ----------------------
async function handleAvatarChange(event: UploadChangeParam<UploadFile<any>>) {
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

async function addStaff() {
  try {
    $event.emit('loading');

    const staff = staffInfo.value;
    const data = new FormData();
    data.append('firstName', staff.firstName.trim());
    data.append('lastName', staff.lastName.trim());
    data.append('middleName', staff.middleName ? staff.middleName.trim() : '');
    data.append('ssn', staff.ssn.trim());
    data.append('oldSSN', staff.oldSSN ? staff.oldSSN.trim() : '');
    data.append('dob', convertToDate(staff.dob));
    data.append('pob', staff.pob.trim());
    data.append('phone', staff.phone.trim());
    data.append('permanentAddress', staff.permanentAddress.trim());
    data.append('temporaryAddress', staff.temporaryAddress.trim());
    data.append('email', staff.email.trim());
    data.append('gender', staff.gender ? staff.gender.toString() : '3');
    staff.schedules.forEach((schedule) => {
      data.append(
        'schedules[]',
        JSON.stringify({
          buildingID: schedule.buildingID,
          startDate: convertToDate(schedule.start as string),
          endDate: schedule.end ? convertToDate(schedule.end as string) : '',
        })
      );
    });
    data.append('profileImage', staff.profileFilePath[0].originFileObj as File);
    data.append('frontSSNImage', staff.ssnFrontFilePath[0].originFileObj as File);
    data.append('backSSNImage', staff.ssnBackFilePath[0].originFileObj as File);

    await api.common.staff.add(data);

    notification.info({
      message: t('add_staff_success'),
      description: t('new_staff_added_to_system'),
    });
    navigateTo(pageRoutes.common.staff.list);
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
        message: t('add_staff_fail'),
        description: t('email_exists'),
      });
    }
    if (err.response._data.message === getMessageCode('SSN_ALREADY_EXISTS')) {
      notification.error({
        message: t('add_staff_fail'),
        description: t('ssn_exists'),
      });
    }
    if (err.response._data.message === getMessageCode('PHONE_ALREADY_EXISTS')) {
      notification.error({
        message: t('add_staff_fail'),
        description: t('phone_exists'),
      });
    }
    if (err.response._data.message === getMessageCode('OLD_SSN_ALREADY_EXISTS')) {
      notification.error({
        message: t('add_staff_fail'),
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
