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
        <a-alert
          v-show="!isValid"
          class="my-3 h-[40px] max-h-[40px]"
          :message="$t('invalid_credentials')"
          type="error"
        />

        <a-form-item class="mb-1" label="Email" name="email">
          <a-input v-model:value="formData.email" autocomplete="email" type="email" />
        </a-form-item>

        <a-form-item class="mb-1" :label="$t('password')" name="password">
          <a-input-password v-model:value="formData.password" autocomplete="off" />
        </a-form-item>

        <a-form-item name="remember" class="mb-5">
          <a-checkbox v-model:checked="formData.remember">{{ $t('remember_me') }}</a-checkbox>
        </a-form-item>

        <a-form-item class="mb-0">
          <a-button class="w-full" type="primary" html-type="submit">{{ $t('log_in') }}</a-button>
        </a-form-item>

        <a-form-item class="flex justify-center mb-0">
          <a-button type="link" :href="pageRoutes.authentication.recovery">{{ $t('forgot_password') }}</a-button>
        </a-form-item>
      </a-form>
      <button v-show="false" ref="showEmailVerifyModalButton" @click="info"></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RuleObject } from 'ant-design-vue/es/form';
import { Modal } from 'ant-design-vue';
import { getMessageCode } from '~/consts/api_response';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';
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
const formData = ref<LoginForm>({
  email: '',
  password: '',
  remember: false,
});
const rules = computed(() => ({
  email: [
    {
      required: true,
      message: t('email_require'),
      trigger: 'blur',
    },
  ] as RuleObject[],
  password: [
    {
      required: true,
      message: t('password_require'),
      trigger: 'blur',
    },
  ] as RuleObject[],
}));
const isValid = ref<boolean>(true);
const info = () => {
  Modal.info({
    title: t('notice'),
    content: t('email_verify'),
    width: '500px',
  });
};
const showEmailVerifyModalButton = ref<HTMLButtonElement | null>(null);
const { $event } = useNuxtApp();

// ---------------------- Functions ----------------------
async function login() {
  // api.authentication
  //   .login(formData.value.email, formData.value.password, formData.value.remember)
  //   .then(async () => {
  //     const roleCookie = useCookie('userRole');
  //     let targetRoute = '';
  //     if (
  //       roleCookie &&
  //       roleCookie.value &&
  //       (roleCookie.value.toString() === roles.owner || roleCookie.value.toString() === roles.manager)
  //     ) {
  //       targetRoute = pageRoutes.common.building.list;
  //     } else if (roleCookie && roleCookie.value && roleCookie.value.toString() === roles.customer) {
  //       targetRoute = pageRoutes.common.room.list;
  //     }
  //     roleCookie.value = null;
  //     await navigateTo(targetRoute);
  //   })
  //   .catch((err) => {
  //     if (err.status === 500) {
  //       notification.error({
  //         message: t('system_error_title'),
  //         description: t('system_error_description'),
  //       });
  //     } else if (err.response._data.message === getMessageCode('EMAIL_NOT_VERIFIED')) {
  //       if (showEmailVerifyModalButton.value) {
  //         showEmailVerifyModalButton.value.click();
  //       }
  //     } else {
  //       isValid.value = false;
  //     }
  //   });

  try {
    isValid.value = true;
    $event.emit('loading');
    await api.authentication.login(formData.value.email, formData.value.password, formData.value.remember);
    const roleCookie = useCookie('userRole');
    let targetRoute = '';
    if (
      roleCookie &&
      roleCookie.value &&
      (roleCookie.value.toString() === roles.owner || roleCookie.value.toString() === roles.manager)
    ) {
      targetRoute = pageRoutes.common.building.list;
    } else if (roleCookie && roleCookie.value && roleCookie.value.toString() === roles.customer) {
      targetRoute = pageRoutes.common.room.list;
    }
    // roleCookie.value = null;
    await navigateTo(targetRoute);
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    } else if (err.response._data.message === getMessageCode('EMAIL_NOT_VERIFIED')) {
      if (showEmailVerifyModalButton.value) {
        showEmailVerifyModalButton.value.click();
      }
    } else {
      isValid.value = false;
    }
  } finally {
    $event.emit('loading');
  }
}
</script>
