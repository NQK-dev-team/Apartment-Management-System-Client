<template>
  <div class="w-full h-full">
    <img src="/image/auth_background.png" class="w-full h-full fixed" />
    <div class="w-full h-full flex items-center justify-center relative">
      <a-form
        class="w-96 bg-white p-8 rounded-lg shadow-lg"
        :model="formData"
        :rules="rules"
        name="basic"
        autocomplete="off"
        :hide-required-mark="true"
        layout="vertical"
        @finish="setNewPassword"
      >
        <div class="flex items-center justify-center mb-5">
          <img src="/svg/logo.svg" alt="Logo" class="w-[50px] h-[50px] select-none" />
          <h1 class="ms-2 font-bold text-2xl">NQK Management</h1>
        </div>
        <div class="flex justify-end">
          <div>
            <a-dropdown :trigger="['click']" placement="bottomRight">
              <p class="text-center cursor-pointer flex items-center">
                <img v-show="locale === 'vi'" src="/svg/vi.svg" alt="Vietnamese" class="w-[20px]" />
                <img v-show="locale === 'en'" src="/svg/en.svg" alt="English" class="w-[20px]" />
                <down-outlined style="font-size: 11px" class="ms-1"></down-outlined>
              </p>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="vi" @click="setLocale('vi')">
                    <img src="/svg/vi.svg" alt="Vietnamese" class="w-[20px]" />
                  </a-menu-item>
                  <a-menu-item key="en" @click="setLocale('en')">
                    <img src="/svg/en.svg" alt="English" class="w-[20px]" />
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <a-form-item class="mb-1" :label="t('new_password')" name="newPassword">
          <a-input v-model:value="formData.newPassword" autocomplete="off" type="password" />
        </a-form-item>

        <a-form-item class="mb-1" :label="t('confirm_new_password')" name="confirmPassword">
          <a-input v-model:value="formData.confirmPassword" autocomplete="off" type="password" />
        </a-form-item>

        <a-form-item class="mb-0 mt-5">
          <a-button class="w-full" type="primary" html-type="submit">{{ $t('confirm') }}</a-button>
        </a-form-item>

        <a-form-item class="flex justify-center mb-0">
          <a-button type="link" :href="pageRoutes.authentication.login">{{ $t('return_to_login') }}</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services/api';
import type { RuleObject } from 'ant-design-vue/es/form';
import { pageRoutes } from '~/consts/page_routes';

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
  ] as RuleObject[],
  confirmPassword: [
    {
      required: true,
      message: t('confirm_new_password_require'),
      trigger: 'blur',
    },
    {
      validator: async (_: RuleObject, value: string) => {
        if (value && value !== formData.value.newPassword) {
          return Promise.reject(t('confirm_new_password_not_match'));
        }
        return Promise.resolve();
      },
      trigger: 'blur',
    },
  ] as RuleObject[],
}));

// ---------------------- Functions ----------------------
async function setNewPassword() {}
</script>
