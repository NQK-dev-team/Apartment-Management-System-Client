<template>
  <div class="w-full h-full">
    <img src="/image/auth_background.png" class="w-full h-full fixed" />
    <div class="w-full h-full flex items-center justify-center relative">
      <div v-if="tokenInvalid || userNotFound" class="w-[400px] bg-white p-8 rounded-lg shadow-lg">
        <div class="flex items-center justify-center mb-5">
          <img :src="svgPaths.logo" alt="Logo" class="w-[50px] h-[50px] select-none" />
          <h1 class="ms-2 font-bold text-2xl">NQK Management</h1>
        </div>
        <div class="flex justify-end">
          <div>
            <a-dropdown :trigger="['click']" placement="bottomRight">
              <p id="languageOption" name="languageOption" class="text-center cursor-pointer flex items-center">
                <img v-show="locale === COMMON.LOCALE.VI" :src="svgPaths.vi" alt="Vietnamese" class="w-[20px]" />
                <img v-show="locale === COMMON.LOCALE.EN" :src="svgPaths.en" alt="English" class="w-[20px]" />
                <down-outlined style="font-size: 11px" class="ms-1"></down-outlined>
              </p>
              <template #overlay>
                <a-menu>
                  <a-menu-item
                    id="lang_vi"
                    :key="COMMON.LOCALE.VI"
                    name="lang_vi"
                    @click="setLocale(COMMON.LOCALE.VI as any)"
                  >
                    <img :src="svgPaths.vi" alt="Vietnamese" class="w-[20px]" />
                  </a-menu-item>
                  <a-menu-item
                    id="lang_en"
                    :key="COMMON.LOCALE.EN"
                    name="lang_en"
                    @click="setLocale(COMMON.LOCALE.EN as any)"
                  >
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
          <a-button id="loginLink" name="loginLink" type="link" :href="pageRoutes.authentication.login">{{
            $t('return_to_login')
          }}</a-button>
        </div>
      </div>
      <div v-if="verifySuccess" class="w-[400px] bg-white p-8 rounded-lg shadow-lg">
        <div class="flex items-center justify-center mb-5">
          <img :src="svgPaths.logo" alt="Logo" class="w-[50px] h-[50px] select-none" />
          <h1 class="ms-2 font-bold text-2xl">NQK Management</h1>
        </div>
        <div class="flex justify-end">
          <div>
            <a-dropdown :trigger="['click']" placement="bottomRight">
              <p id="languageOption" name="languageOption" class="text-center cursor-pointer flex items-center">
                <img v-show="locale === COMMON.LOCALE.VI" :src="svgPaths.vi" alt="Vietnamese" class="w-[20px]" />
                <img v-show="locale === COMMON.LOCALE.EN" :src="svgPaths.en" alt="English" class="w-[20px]" />
                <down-outlined style="font-size: 11px" class="ms-1"></down-outlined>
              </p>
              <template #overlay>
                <a-menu>
                  <a-menu-item
                    id="lang_vi"
                    :key="COMMON.LOCALE.VI"
                    name="lang_vi"
                    @click="setLocale(COMMON.LOCALE.VI as any)"
                  >
                    <img :src="svgPaths.vi" alt="Vietnamese" class="w-[20px]" />
                  </a-menu-item>
                  <a-menu-item
                    id="lang_en"
                    :key="COMMON.LOCALE.EN"
                    name="lang_en"
                    @click="setLocale(COMMON.LOCALE.EN as any)"
                  >
                    <img :src="svgPaths.en" alt="English" class="w-[20px]" />
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <div class="flex items-center justify-center mt-5">
          <Success class="text-green-600 text-3xl" />
        </div>
        <p class="my-2 text-center">{{ $t('email_verify_success') }}</p>
        <div class="flex items-center justify-center">
          <a-button id="loginLink" name="loginLink" type="link" :href="pageRoutes.authentication.login">{{
            $t('return_to_login')
          }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services/api';
import { pageRoutes } from '~/consts/page_routes';
import { getMessageCode } from '~/consts/api_response';
import { svgPaths } from '~/consts/svg_paths';
import Success from '~/public/svg/success.svg';
import Fail from '~/public/svg/fail.svg';
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Email Verification',
});

useHead({
  title: 'Email Verification',
  meta: [
    {
      name: 'description',
      content: 'Verify user email',
    },
  ],
});

// ---------------------- Variables ----------------------
const { setLocale, locale, t } = useI18n();
const { $event } = useNuxtApp();
const route = useRoute();
const token = route.query.token as string;
const email = route.query.email as string;
const tokenInvalid = ref<boolean>(false);
const userNotFound = ref<boolean>(false);
const verifySuccess = ref<boolean>(false);

// ---------------------- Functions ----------------------
async function checkToken() {
  try {
    $event.emit('loading');

    await api.authentication.verifyEmail(email.trim(), token);

    verifySuccess.value = true;
  } catch (err: any) {
    verifySuccess.value = false;

    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    } else if (err.response._data.message === getMessageCode('TOKEN_VERIFY_FAILED')) {
      tokenInvalid.value = true;
      userNotFound.value = false;
    } else if (err.response._data.message === getMessageCode('USER_NOT_FOUND')) {
      userNotFound.value = true;
      tokenInvalid.value = false;
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
