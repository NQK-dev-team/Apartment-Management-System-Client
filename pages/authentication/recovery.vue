<template>
  <div class="w-full h-full">
    <img src="/image/auth_background.png" class="w-full h-full fixed" />
    <div class="w-full h-full flex items-center justify-center relative">
      <a-form
        class="w-[400px] bg-white p-8 rounded-lg shadow-lg"
        :model="formData"
        :rules="rules"
        name="basic"
        autocomplete="off"
        :hide-required-mark="true"
        layout="vertical"
        @finish="recover"
      >
        <div class="flex items-center justify-center mb-5">
          <img :src="svgPaths.logo" alt="Logo" class="w-[50px] h-[50px] select-none" />
          <h1 class="ms-2 font-bold text-2xl">NQK Management</h1>
        </div>
        <div class="flex justify-end">
          <div>
            <a-dropdown :trigger="['click']" placement="bottomRight">
              <p class="text-center cursor-pointer flex items-center">
                <img v-show="locale === COMMON.LOCALE.VI" :src="svgPaths.vi" alt="Vietnamese" class="w-[20px]" />
                <img v-show="locale === COMMON.LOCALE.EN" :src="svgPaths.en" alt="English" class="w-[20px]" />
                <down-outlined style="font-size: 11px" class="ms-1"></down-outlined>
              </p>
              <template #overlay>
                <a-menu>
                  <a-menu-item :key="COMMON.LOCALE.VI" @click="setLocale(COMMON.LOCALE.VI as any)">
                    <img :src="svgPaths.vi" alt="Vietnamese" class="w-[20px]" />
                  </a-menu-item>
                  <a-menu-item :key="COMMON.LOCALE.EN" @click="setLocale(COMMON.LOCALE.EN as any)">
                    <img :src="svgPaths.en" alt="English" class="w-[20px]" />
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <a-alert v-show="!isValid" class="my-3 h-[40px] max-h-[40px]" :message="$t('invalid_email')" type="error" />
        <a-alert v-show="!isFound" class="my-3 h-[40px] max-h-[40px]" :message="$t('user_not_found')" type="error" />

        <a-form-item class="mb-1" :label="t('recovery_email')" name="email">
          <a-input v-model:value="formData.email" autocomplete="email" type="email" />
        </a-form-item>

        <a-form-item class="mb-0 mt-5">
          <a-button class="w-full rounded-sm" type="primary" html-type="submit">{{ $t('confirm') }}</a-button>
        </a-form-item>

        <a-form-item class="flex justify-center mb-0">
          <a-button type="link" :href="pageRoutes.authentication.login">{{ $t('return_to_login') }}</a-button>
        </a-form-item>
      </a-form>
      <button v-show="false" ref="showSpamModal" @click="warning"></button>
      <button v-show="false" ref="showEmailRecoveryModal" @click="info"></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services/api';
import type { RuleObject } from 'ant-design-vue/es/form';
import { pageRoutes } from '~/consts/page_routes';
import { getMessageCode } from '~/consts/api_response';
import { svgPaths } from '~/consts/svg_paths';
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Recovery',
});

useHead({
  title: 'Recovery',
  meta: [
    {
      name: 'description',
      content: 'Recover user password',
    },
  ],
});

// ---------------------- Types ----------------------
type RecoveryForm = {
  email: string;
};

// ---------------------- Variables ----------------------
const { setLocale, locale, t } = useI18n();
const { $event } = useNuxtApp();
const formData = ref<RecoveryForm>({
  email: '',
});
const rules = computed(() => ({
  email: [
    {
      required: true,
      message: t('email_require'),
      trigger: 'blur',
    },
    {
      type: 'email',
      message: t('email_invalid'),
      trigger: 'blur',
    },
  ] as RuleObject[],
}));
const isFound = ref<boolean>(true);
const isValid = ref<boolean>(true);
const warning = () => {
  Modal.warning({
    title: t('warning'),
    content: t('spam_warning'),
  });
};
const info = () => {
  Modal.info({
    title: t('notice'),
    content: t('password_recovery_notice'),
  });
};
const showSpamModal = ref<HTMLButtonElement | null>(null);
const showEmailRecoveryModal = ref<HTMLButtonElement | null>(null);

// ---------------------- Functions ----------------------
async function recover() {
  try {
    isFound.value = true;
    $event.emit('loading');
    await api.authentication.recovery(formData.value.email);
    if (showEmailRecoveryModal.value) {
      showEmailRecoveryModal.value.click();
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
    } else if (err.response._data.message === getMessageCode('REQUEST_SPAM')) {
      if (showSpamModal.value) {
        showSpamModal.value.click();
      }
    } else if (err.response._data.message === getMessageCode('USER_NOT_FOUND')) {
      isFound.value = false;
    } else {
      isValid.value = false;
    }
  } finally {
    $event.emit('loading');
  }
}
</script>
