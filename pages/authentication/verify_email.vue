<template>
  <div class="w-full h-full">
    <img src="/image/auth_background.png" class="w-full h-full fixed" />
    <div class="w-full h-full flex items-center justify-center relative">
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
        <p v-if="tokenInvalid" class="mt-5 mb-3 text-center">{{ $t('invalid_link') }}</p>
        <p v-if="userNotFound" class="mt-5 mb-3 text-center">{{ $t('user_not_found') }}</p>
        <div class="flex items-center justify-center">
          <a-button type="link" :href="pageRoutes.authentication.login">{{ $t('return_to_login') }}</a-button>
        </div>
      </div>
      <div v-if="verifySuccess" class="w-96 bg-white p-8 rounded-lg shadow-lg">
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
        <p class="mt-5 mb-3 text-center">{{ $t('email_verify_success') }}</p>
        <div class="flex items-center justify-center">
          <a-button type="link" :href="pageRoutes.authentication.login">{{ $t('return_to_login') }}</a-button>
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

    await api.authentication.verifyEmail(email, token);

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
