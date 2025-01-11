<template>
  <div class="w-full h-full">
    <img src="/image/auth_background.png" class="w-full h-full fixed" />
    <div class="w-full h-full flex items-center justify-center relative">
      <a-form
        class="w-96 bg-white p-8 rounded-lg shadow-lg"
        :model="formDta"
        :rules="rules"
        name="basic"
        autocomplete="off"
        :hide-required-mark="true"
        layout="vertical"
        @finish="login"
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
        <a-form-item class="mb-1" label="Email" name="email">
          <a-input v-model:value="formDta.email" autocomplete="email" type="email" />
        </a-form-item>

        <a-form-item class="mb-1" :label="$t('password')" name="password">
          <a-input-password v-model:value="formDta.password" autocomplete="off" />
        </a-form-item>

        <a-form-item name="remember" class="mb-5">
          <a-checkbox v-model:checked="formDta.remember">{{ $t('remember_me') }}</a-checkbox>
        </a-form-item>

        <a-form-item class="mb-0">
          <a-button class="w-full" type="primary" html-type="submit">{{ $t('log_in') }}</a-button>
        </a-form-item>

        <a-form-item class="flex justify-center mb-0">
          <a-button type="link" href="/forgot-password">{{ $t('forgot_password') }}</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RuleObject } from 'ant-design-vue/es/form';
import { api } from '~/services/api';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Login',
});

useHead({
  title: 'Login',
  meta: [
    {
      name: 'description',
      content: 'Login page of the system',
    },
  ],
});

// ---------------------- Types ----------------------
type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

// ---------------------- Variables ----------------------
const { setLocale, locale, t } = useI18n();
const formDta = ref<LoginForm>({
  email: '',
  password: '',
  remember: false,
});
const rules = computed(() => ({
  email: [
    {
      required: true,
      message: t('email_require'),
      trigger: 'change',
    },
  ] as RuleObject[],
  password: [
    {
      required: true,
      message: t('password_require'),
      trigger: 'change',
    },
  ] as RuleObject[],
}));

// ---------------------- Functions ----------------------
async function login() {
  api.authentication.login(formDta.value.email, formDta.value.password, formDta.value.remember).then((res) => {});
}
</script>
