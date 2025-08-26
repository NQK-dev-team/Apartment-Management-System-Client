<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('security_setting') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('security_setting') }}</h1>
    </div>
    <div
      class="flex-1 flex flex-col items-center px-4 mt-5"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <a-form class="mt-5 min-w-[600px] max-w-[600px]" :model="changeEmailModel" @finish="changeEmail">
        <h2 class="text-xl font-bold">{{ $t('change_email') }}</h2>
        <a-form-item name="oldEmail">
          <label for="old_email" class="flex mb-1">
            <span>{{ $t('current_email') }}</span>
          </label>
          <a-input
            id="old_email"
            :value="changeEmailModel.oldEmail"
            autocomplete="off"
            type="email"
            disabled
            readonly
          />
        </a-form-item>
        <a-form-item
          name="newEmail"
          :rules="[
            { required: true, message: $t('new_email_required'), trigger: 'blur' },
            {
              max: COMMON.MAX_LENGTH.EMAIL,
              message: t('email_max_length', { length: COMMON.MAX_LENGTH.EMAIL }),
              trigger: 'blur',
            },
            { type: 'email', message: $t('email_invalid'), trigger: 'blur' },
          ]"
        >
          <label for="new_email" class="flex mb-1">
            <span>{{ $t('new_email') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="new_email" v-model:value="changeEmailModel.newEmail" autocomplete="off" type="email" />
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: $t('empty_password'), trigger: 'blur' }]">
          <label for="password" class="flex mb-1">
            <span>{{ $t('password') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input-password id="password" v-model:value="changeEmailModel.password" autocomplete="off" />
        </a-form-item>
        <a-button class="w-full rounded-sm" type="primary" html-type="submit">{{ $t('confirm') }}</a-button>
      </a-form>
      <a-form :model="changePasswordModel" class="mt-20 min-w-[600px] max-w-[600px]" @finish="changePassword">
        <h2 class="text-xl font-bold">{{ $t('change_password') }}</h2>
        <a-form-item
          name="oldPassword"
          :rules="[{ required: true, message: $t('current_password_required'), trigger: 'blur' }]"
        >
          <label for="current_password" class="flex mb-1">
            <span>{{ $t('current_password') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input-password id="current_password" v-model:value="changePasswordModel.oldPassword" autocomplete="off" />
        </a-form-item>
        <a-form-item
          name="newPassword"
          :rules="[
            {
              required: true,
              message: t('new_password_require'),
              trigger: 'blur',
            },
            {
              max: COMMON.MAX_LENGTH.PASSWORD,
              message: t('password_max_length', { length: COMMON.MAX_LENGTH.PASSWORD }),
              trigger: 'blur',
            },
            {
              validator: async (_: RuleObject, value: string) => validationRules.password(_, value, t),
              trigger: 'blur',
            },
          ]"
        >
          <label for="new_password" class="flex mb-1">
            <span>{{ $t('new_password') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input-password id="new_password" v-model:value="changePasswordModel.newPassword" autocomplete="off" />
        </a-form-item>
        <a-form-item
          name="confirmNewPassword"
          :rules="[
            {
              required: true,
              message: t('confirm_new_password_require'),
              trigger: 'blur',
            },
            {
              validator: async (_: RuleObject, value: string) =>
                validationRules.confirmPasswordMatch(_, value, changePasswordModel.newPassword, t),
              trigger: 'blur',
            },
          ]"
        >
          <label for="confirm_new_password" class="flex mb-1">
            <span>{{ $t('confirm_new_password') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input-password
            id="confirm_new_password"
            v-model:value="changePasswordModel.confirmNewPassword"
            autocomplete="off"
          />
        </a-form-item>
        <a-button class="w-full rounded-sm" type="primary" html-type="submit">{{ $t('confirm') }}</a-button>
      </a-form>
    </div>
    <a-modal v-model:open="emailChangeModalVisible" @cancel="closeModal">
      <p class="mt-3">{{ $t('email_change_success_content') }}</p>
      <template #footer>
        <a-button type="primary" @click="closeModal">{{ $t('confirm') }}</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { svgPaths } from '~/consts/svg_paths';
import { api } from '~/services/api';
import type { User } from '~/types/user';
import { validationRules } from '~/consts/validation_rules';
import type { RuleObject } from 'ant-design-vue/es/form';
import { pageRoutes } from '~/consts/page_routes';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Security Settings',
  layout: 'main',
});

useHead({
  title: 'Security Settings',
  meta: [
    {
      name: 'description',
      content: 'Manage user security settings',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const changePasswordModel = ref<{
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}>({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});
const changeEmailModel = ref<{
  oldEmail: string;
  newEmail: string;
  password: string;
}>({
  oldEmail: '',
  newEmail: '',
  password: '',
});
const userInfo = ref<User | null>(null);
const emailChangeModalVisible = ref(false);

// ---------------------- Functions ----------------------
async function changePassword() {
  try {
    $event.emit('loading');

    await api.common.security.changePassword(changePasswordModel.value);

    changePasswordModel.value = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };

    notification.success({
      message: t('update_success'),
      description: t('new_password_has_been_set'),
    });
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.BAD_REQUEST ||
      err.response._data.message === getMessageCode('PASSWORD_INCORRECT')
    ) {
      notification.error({
        message: t('update_fail'),
        description: t('current_password_incorrect'),
      });
    } else if (
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

async function changeEmail() {
  try {
    $event.emit('loading');

    changeEmailModel.value.newEmail = changeEmailModel.value.newEmail.trim();
    changeEmailModel.value.oldEmail = changeEmailModel.value.oldEmail.trim();

    await api.common.security.changeEmail(changeEmailModel.value);
    await api.authentication.logout();
    emailChangeModalVisible.value = true;
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.BAD_REQUEST ||
      err.response._data.message === getMessageCode('PASSWORD_INCORRECT')
    ) {
      notification.error({
        message: t('update_fail'),
        description: t('password_incorrect'),
      });
    } else if (err.response._data.message === getMessageCode('EMAIL_ALREADY_EXISTS')) {
      notification.error({
        message: t('update_fail'),
        description: t('email_exists'),
      });
    } else if (
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

async function getUserInfo() {
  try {
    $event.emit('loading');
    const response = await api.common.profile.getProfile();

    userInfo.value = response.data;
    changeEmailModel.value.oldEmail = userInfo.value.email;
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
    userInfo.value = null;
  } finally {
    $event.emit('loading');
  }
}

async function closeModal() {
  emailChangeModalVisible.value = false;
  await navigateTo(pageRoutes.authentication.login);
}

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  await getUserInfo();

  if (userInfo.value === null || !userInfo.value.ID) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});
</script>
