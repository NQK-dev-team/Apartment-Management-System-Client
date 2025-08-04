<template>
  <a-form ref="editForm" :model="user" class="grid grid-cols-6 gap-x-2 py-3">
    <div class="col-span-5">
      <div class="flex-1 flex flex-col me-6">
        <div class="flex items-center">
          <a-form-item class="flex-1 me-5" name="user_no">
            <label for="user_no" class="flex mb-1">
              <span>{{ $t('user_no') }}</span>
            </label>
            <a-input id="user_no" :value="user.no" :placeholder="$t('user_no')" disabled readonly />
          </a-form-item>
          <a-form-item
            class="flex-1"
            :name="['lastName']"
            :rules="[{ required: true, message: t('user_last_name_require'), trigger: 'blur' }]"
          >
            <label for="last_name" class="flex mb-1">
              <span>{{ $t('last_name') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-input id="last_name" v-model:value="user.lastName" :placeholder="$t('enter_user_last_name')" />
          </a-form-item>
        </div>
        <div class="flex items-center mt-5">
          <a-form-item class="flex-1 me-5" name="middle_name">
            <label for="middle_name" class="flex mb-1">
              <span>{{ $t('middle_name') }}</span>
            </label>
            <a-input
              id="middle_name"
              v-model:value="user.middleName.String as string"
              :placeholder="$t('enter_user_middle_name')"
            />
          </a-form-item>
          <a-form-item
            class="flex-1"
            :name="['firstName']"
            :rules="[{ required: true, message: t('user_first_name_require'), trigger: 'blur' }]"
          >
            <label for="first_name" class="flex mb-1">
              <span>{{ $t('name') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-input
              id="first_name"
              v-model:value="user.firstName"
              :placeholder="$t('enter_user_first_name')"
              autocomplete="off"
            />
          </a-form-item>
        </div>
        <div class="flex items-center mt-5">
          <a-form-item
            class="flex-1 me-5"
            name="gender"
            :rules="[{ required: true, message: $t('please_select_user_gender'), trigger: 'blur' }]"
          >
            <label for="gender" class="flex mb-1">
              <span>{{ $t('gender') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-select id="gender" v-model:value="user.gender" class="w-full" :placeholder="$t('select_user_gender')">
              <a-select-option :value="COMMON.USER_GENDER.MALE">{{ $t('male') }}</a-select-option>
              <a-select-option :value="COMMON.USER_GENDER.FEMALE">{{ $t('female') }}</a-select-option>
              <a-select-option :value="COMMON.USER_GENDER.OTHER">{{ $t('other') }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            class="flex-1"
            name="dobDayjs"
            :rules="[
              { required: true, message: t('user_dob_required'), trigger: 'blur' },
              {
                validator: async (_: RuleObject, value: string) => validationRules.dateOfBirth2(_, value, $t),
                trigger: 'blur',
              },
            ]"
          >
            <label for="date_of_birth" class="flex mb-1">
              <span>{{ $t('dob') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-date-picker
              id="date_of_birth"
              v-model:value="user.dobDayjs"
              class="w-full"
              :placeholder="$t('enter_user_dob')"
              :disabled-date="disabledDate"
            />
          </a-form-item>
        </div>
        <div class="flex items-center mt-5">
          <a-form-item
            class="flex-1 me-5"
            name="ssn"
            :rules="[
              { required: true, message: t('user_ssn_required'), trigger: 'blur' },
              { pattern: /^[0-9]{12}$/, message: $t('invalid_ssn'), trigger: 'blur' },
            ]"
          >
            <label for="ssn" class="flex mb-1">
              <span>{{ $t('ssn') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-input id="ssn" v-model:value="user.ssn" :placeholder="$t('enter_user_ssn')" />
          </a-form-item>
          <a-form-item
            class="flex-1"
            :name="['oldSSN', 'String']"
            :rules="[{ pattern: /^[0-9]{9}$/, message: $t('invalid_oldSSN'), trigger: 'blur' }]"
          >
            <label for="old_ssn" class="flex mb-1">
              <span>{{ $t('old_ssn') }}</span>
            </label>
            <a-input
              id="old_ssn"
              v-model:value="user.oldSSN.String as string"
              :placeholder="$t('enter_user_old_ssn')"
            />
          </a-form-item>
        </div>
        <div class="flex items-center mt-5">
          <a-form-item
            class="flex-1 me-5"
            name="pob"
            :rules="[{ required: true, message: t('user_pob_required'), trigger: 'blur' }]"
          >
            <label for="pob" class="flex mb-1">
              <span>{{ $t('pob') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-input id="pob" v-model:value="user.pob" :placeholder="$t('enter_user_pob')" />
          </a-form-item>
          <a-form-item
            class="flex-1"
            name="phone"
            :rules="[
              { required: true, message: $t('user_phone_required'), trigger: 'blur' },
              { pattern: /^[0-9]{10}$/, message: $t('invalid_phone'), trigger: 'blur' },
            ]"
          >
            <label for="phone_number" class="flex mb-1">
              <span>{{ $t('phone') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-input id="phone_number" v-model:value="user.phone" :placeholder="$t('enter_user_phone')" />
          </a-form-item>
        </div>
        <div class="flex items-center mt-5">
          <a-form-item class="flex-1 me-5">
            <label for="email" class="flex mb-1">
              <span>{{ $t('email') }}</span>
            </label>
            <a-input id="email" :value="user.email" :placeholder="$t('email')" disabled readonly autocomplete="off" />
          </a-form-item>
          <a-form-item
            class="flex-1"
            name="permanentAddress"
            :rules="[{ required: true, message: t('user_permanent_address_required'), trigger: 'blur' }]"
          >
            <label for="permanent_address" class="flex mb-1">
              <span>{{ $t('permanent_address') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-input
              id="permanent_address"
              v-model:value="user.permanentAddress"
              :placeholder="$t('enter_user_permanent_address')"
            />
          </a-form-item>
        </div>
        <div class="flex items-center mt-5">
          <a-form-item
            class="flex-1 me-5"
            name="temporaryAddress"
            :rules="[{ required: true, message: t('user_temporary_address_required'), trigger: 'blur' }]"
          >
            <label for="temporary_address" class="flex mb-1">
              <span>{{ $t('temporary_address') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-input
              id="temporary_address"
              v-model:value="user.temporaryAddress"
              :placeholder="$t('enter_user_temporary_address')"
            />
          </a-form-item>
          <a-form-item class="flex-1"></a-form-item>
        </div>
      </div>
    </div>
    <div class="col-span-1 px-3">
      <a-form-item class="w-full">
        <div class="flex items-center">
          <label for="profileFilePath">
            {{ $t('avatar') }}
          </label>
          <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
        </div>
        <img v-show="!user.newProfile || !user.newProfile.length" :src="user.profileFilePath" alt="avatar" />
        <img
          v-show="user.newProfile && user.newProfile.length"
          :src="previewNewProfileFile"
          :alt="$t('avatar')"
          class="w-full h-full mt-1"
        />
        <div class="text-center mt-3">
          <a-upload
            id="profileFilePath"
            v-model:file-list="user.newProfile"
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
      <a-form-item class="w-full mt-5">
        <div class="flex items-center">
          <label for="ssnFrontFilePath">
            {{ $t('national_id') + ' ' + $t('front_face') }}
          </label>
          <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
        </div>
        <img
          v-show="!user.newFrontSSN || !user.newFrontSSN.length"
          :src="user.ssnFrontFilePath"
          alt="national_id_front"
        />
        <img
          v-show="user.newFrontSSN && user.newFrontSSN.length"
          :src="previewNewFrontSSNFile"
          :alt="$t('national_id_front')"
          class="w-full h-full mt-1"
        />
        <div class="text-center mt-3">
          <a-upload
            id="ssnFrontFilePath"
            v-model:file-list="user.newFrontSSN"
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
      <a-form-item class="w-full mt-5">
        <div class="flex items-center">
          <label for="ssnBackFilePath">
            {{ $t('national_id') + ' ' + $t('back_face') }}
          </label>
          <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
        </div>
        <img v-show="!user.newBackSSN || !user.newBackSSN.length" :src="user.ssnBackFilePath" alt="national_id_back" />
        <img
          v-show="user.newBackSSN && user.newBackSSN.length"
          :src="previewNewBackSSNFile"
          :alt="$t('national_id_back')"
          class="w-full h-full mt-1"
        />
        <div class="text-center mt-3">
          <a-upload
            id="ssnBackFilePath"
            v-model:file-list="user.newBackSSN"
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
  </a-form>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import type { User } from '~/types/user';
import type { FormInstance } from 'ant-design-vue';
import type { RuleObject } from 'ant-design-vue/es/form';
import { svgPaths } from '~/consts/svg_paths';
import { validationRules } from '~/consts/validation_rules';
import type { Dayjs } from 'dayjs';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';
import { api } from '~/services/api';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});
const user = toRef(props, 'user');
const { $event, $dayjs } = useNuxtApp();
const { t } = useI18n();
const editForm = ref<FormInstance>();
const previewNewFrontSSNFile = ref('');
const previewNewBackSSNFile = ref('');
const previewNewProfileFile = ref('');
const isNewAvatarValid = ref(false);
const isNewSSNFrontValid = ref(false);
const isNewSSNBackValid = ref(false);

// ---------------------- Functions ----------------------
async function updateUserInfo() {
  try {
    $event.emit('loading');

    const data = new FormData();
    data.append('lastName', user.value.lastName.trim());
    data.append('middleName', user.value.middleName.String ? user.value.middleName.String.trim() : '');
    data.append('firstName', user.value.firstName.trim());
    data.append('gender', user.value.gender.toString());
    data.append('dob', user.value.dobDayjs!.format('YYYY-MM-DD'));
    data.append('ssn', user.value.ssn.trim());
    data.append('oldSSN', user.value.oldSSN.String ? user.value.oldSSN.String.trim() : '');
    data.append('pob', user.value.pob.trim());
    data.append('phone', user.value.phone.trim());
    data.append('permanentAddress', user.value.permanentAddress.trim());
    data.append('temporaryAddress', user.value.temporaryAddress.trim());
    if (user.value.newProfile && user.value.newProfile.length) {
      data.append('newProfile', user.value.newProfile[0].originFileObj as File);
    }
    if (user.value.newFrontSSN && user.value.newFrontSSN.length) {
      data.append('newFrontSSN', user.value.newFrontSSN[0].originFileObj as File);
    }
    if (user.value.newBackSSN && user.value.newBackSSN.length) {
      data.append('newBackSSN', user.value.newBackSSN[0].originFileObj as File);
    }

    await api.common.profile.updateProfile(data);

    notification.info({
      message: t('update_success'),
      description: t('profile_info_updated'),
    });

    $event.emit('refetchProfile');
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

async function validateForm() {
  try {
    if (!editForm.value) {
      return;
    }
    await editForm.value.validateFields();

    updateUserInfo();
  } catch (error) {
    /* empty */
  }
}

function clearValidation() {
  if (editForm.value) {
    editForm.value.clearValidate();
  }
}

function disabledDate(current: Dayjs) {
  // Can not select days after today
  return current && current >= $dayjs().endOf('day');
}

async function handleAvatarChange(event: UploadChangeParam<UploadFile<any>>) {
  if (!isNewAvatarValid.value) {
    user.value.newProfile = [];
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

  for (const file of files) {
    if (file) {
      const base64 = await getBase64(file);
      imageList.push(base64 as string);
    }
  }

  previewNewProfileFile.value = imageList.length ? imageList[0] : '';
}

async function handleSSNFrontChange(event: UploadChangeParam<UploadFile<any>>) {
  if (!isNewSSNFrontValid.value) {
    user.value.newFrontSSN = [];
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

  for (const file of files) {
    if (file) {
      const base64 = await getBase64(file);
      imageList.push(base64 as string);
    }
  }

  previewNewFrontSSNFile.value = imageList.length ? imageList[0] : '';
}

async function handleSSNBackChange(event: UploadChangeParam<UploadFile<any>>) {
  if (!isNewSSNBackValid.value) {
    user.value.newBackSSN = [];
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

  for (const file of files) {
    if (file) {
      const base64 = await getBase64(file);
      imageList.push(base64 as string);
    }
  }

  previewNewBackSSNFile.value = imageList.length ? imageList[0] : '';
}

function beforeUploadAvatarImage(file: any): boolean {
  isNewAvatarValid.value = false;
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
  isNewAvatarValid.value = true;
  return true;
}

function beforeUploadSSNFrontImage(file: any): boolean {
  isNewSSNFrontValid.value = false;
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
  isNewSSNFrontValid.value = true;
  return true;
}

function beforeUploadSSNBackImage(file: any): boolean {
  isNewSSNBackValid.value = false;
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
  isNewSSNBackValid.value = true;
  return true;
}

// ---------------------- Events ----------------------
$event.on('updateUserInfo', validateForm);
$event.on('cancelProfileEditMode', () => {
  clearValidation();
});
</script>
