<template>
  <div class="w-full h-full">
    <img src="/image/auth_background.png" class="w-full h-full fixed" />
    <div class="w-full h-full flex items-center justify-center relative">
      <a-form
        v-if="showChangePassword"
        class="w-[400px] bg-white p-8 rounded-lg shadow-lg"
        :model="formData"
        :rules="rules"
        name="basic"
        autocomplete="off"
        :hide-required-mark="true"
        layout="vertical"
        @finish="setNewPassword"
      >
        <div class="flex items-center justify-center mb-5">
          <img :src="svgPaths.logo" alt="Logo" class="w-[50px] h-[50px] select-none" />
          <h1 class="ms-2 font-bold text-2xl">NQK Management</h1>
        </div>
        <div class="flex justify-end">
          <div>
            <a-dropdown :trigger="['click']" placement="bottomRight">
              <p class="text-center cursor-pointer flex items-center">
                <img v-show="locale === 'vi'" :src="svgPaths.vi" alt="Vietnamese" class="w-[20px]" />
                <img v-show="locale === 'en'" :src="svgPaths.en" alt="English" class="w-[20px]" />
                <down-outlined style="font-size: 11px" class="ms-1"></down-outlined>
              </p>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="vi" @click="setLocale('vi')">
                    <img :src="svgPaths.vi" alt="Vietnamese" class="w-[20px]" />
                  </a-menu-item>
                  <a-menu-item key="en" @click="setLocale('en')">
                    <img :src="svgPaths.en" alt="English" class="w-[20px]" />
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <a-alert v-show="!isValid" class="my-3 h-[40px] max-h-[40px]" :message="$t('invalid_password')" type="error" />

        <a-form-item class="mb-1" :label="t('new_password')" name="newPassword">
          <a-input-password v-model:value="formData.newPassword" autocomplete="off" />
        </a-form-item>

        <a-form-item class="mb-1" :label="t('confirm_new_password')" name="confirmPassword">
          <a-input-password v-model:value="formData.confirmPassword" autocomplete="off" />
        </a-form-item>

        <a-form-item class="mb-0 mt-5">
          <a-button class="w-full rounded-sm" type="primary" html-type="submit">{{ $t('confirm') }}</a-button>
        </a-form-item>

        <a-form-item class="flex justify-center mb-0">
          <a-button type="link" :href="pageRoutes.authentication.login">{{ $t('return_to_login') }}</a-button>
        </a-form-item>
      </a-form>
      <div v-if="tokenInvalid || userNotFound" class="w-96 bg-white p-8 rounded-lg shadow-lg">
        <div class="flex items-center justify-center mb-5">
          <img :src="svgPaths.logo" alt="Logo" class="w-[50px] h-[50px] select-none" />
          <h1 class="ms-2 font-bold text-2xl">NQK Management</h1>
        </div>
        <div class="flex justify-end">
          <div>
            <a-dropdown :trigger="['click']" placement="bottomRight">
              <p class="text-center cursor-pointer flex items-center">
                <img v-show="locale === 'vi'" :src="svgPaths.vi" alt="Vietnamese" class="w-[20px]" />
                <img v-show="locale === 'en'" :src="svgPaths.en" alt="English" class="w-[20px]" />
                <down-outlined style="font-size: 11px" class="ms-1"></down-outlined>
              </p>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="vi" @click="setLocale('vi')">
                    <img :src="svgPaths.vi" alt="Vietnamese" class="w-[20px]" />
                  </a-menu-item>
                  <a-menu-item key="en" @click="setLocale('en')">
                    <img :src="svgPaths.en" alt="English" class="w-[20px]" />
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <div class="flex items-center justify-center mt-5">
          <Fail class="text-red-600 text-3xl" />
        </div>
        <p v-if="tokenInvalid" class="my-2 text-center">{{ $t('invalid_link') }}</p>
        <p v-if="userNotFound" class="my-2 text-center">{{ $t('user_not_found') }}</p>
        <div class="flex items-center justify-center">
          <a-button type="link" :href="pageRoutes.authentication.login">{{ $t('return_to_login') }}</a-button>
        </div>
      </div>
    </div>
    <button v-show="false" ref="showResetPasswordModal" @click="info"></button>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services/api';
import type { RuleObject } from 'ant-design-vue/es/form';
import { pageRoutes } from '~/consts/page_routes';
import { getMessageCode } from '~/consts/api_response';
import { Modal } from 'ant-design-vue';
import { svgPaths } from '~/consts/svg_paths';
import Fail from '~/public/svg/fail.svg';
import { validationRules } from '~/consts/validation_rules';
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'New Password',
});

useHead({
  title: 'New Password',
  meta: [
    {
      name: 'description',
      content: 'Set new user password',
    },
  ],
});

// ---------------------- Types ----------------------
type PasswordForm = {
  newPassword: string;
  confirmPassword: string;
};

// ---------------------- Variables ----------------------
const { setLocale, locale, t } = useI18n();
const formData = ref<PasswordForm>({
  newPassword: '',
  confirmPassword: '',
});
const rules = computed(() => ({
  newPassword: [
    {
      required: true,
      message: t('new_password_require'),
      trigger: 'blur',
    },
    {
      validator: async (_: RuleObject, value: string) => validationRules.password(_, value, t),
      trigger: 'blur',
    },
  ] as RuleObject[],
  confirmPassword: [
    {
      required: true,
      message: t('confirm_new_password_require'),
      trigger: 'blur',
    },
    {
      validator: async (_: RuleObject, value: string) =>
        validationRules.confirmPasswordMatch(_, value, formData.value.newPassword, t),
      trigger: 'blur',
    },
  ] as RuleObject[],
}));
const tokenInvalid = ref<boolean>(false);
const userNotFound = ref<boolean>(false);
const showChangePassword = ref<boolean>(false);
const isValid = ref<boolean>(true);
const { $event } = useNuxtApp();
const route = useRoute();
const token = route.query.token as string;
const email = route.query.email as string;
const showResetPasswordModal = ref<HTMLButtonElement | null>(null);
const info = () => {
  Modal.info({
    title: t('notice'),
    content: t('reset_password_complete'),
    onOk: async () => {
      await navigateTo(pageRoutes.authentication.login);
    },
  });
};

// ---------------------- Functions ----------------------
async function checkToken() {
  try {
    $event.emit('loading');
    await api.authentication.checkPasswordResetToken(email, token);
    showChangePassword.value = true;
    tokenInvalid.value = false;
    userNotFound.value = false;
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
    } else {
      tokenInvalid.value = true;
      showChangePassword.value = false;
      userNotFound.value = false;
    }
  } finally {
    $event.emit('loading');
  }
}

async function setNewPassword() {
  try {
    isValid.value = true;
    $event.emit('loading');
    checkToken();

    if (tokenInvalid.value) {
      return;
    }

    await api.authentication.resetPassword(email, token, formData.value.newPassword, formData.value.confirmPassword);

    if (showResetPasswordModal.value) {
      showResetPasswordModal.value.click();
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
    } else if (err.response._data.message === getMessageCode('TOKEN_VERIFY_FAILED')) {
      tokenInvalid.value = true;
      showChangePassword.value = false;
      userNotFound.value = false;
    } else if (err.response._data.message === getMessageCode('USER_NOT_FOUND')) {
      userNotFound.value = true;
      tokenInvalid.value = false;
      showChangePassword.value = false;
    } else {
      isValid.value = false;
    }
  } finally {
    $event.emit('loading');
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  checkToken();
});
</script>
