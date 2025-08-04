<template>
  <div class="w-full h-full bg-[#1f1f1f] flex justify-between items-center px-3">
    <div class="flex items-center">
      <img :src="svgPaths.logo" alt="Logo" class="w-[32px] h-[32px] select-none" />
      <h2 class="ms-2 text-white select-none">NQK Management</h2>
    </div>
    <div class="flex items-center">
      <div class="me-3 h-[24px] flex items-center">
        <div
          v-show="lightModeCookie === null || lightModeCookie === undefined ? 1 : parseInt(lightModeCookie)"
          class="cursor-pointer"
          @click="switchThemeMode"
        >
          <img :src="svgPaths.lightMode" alt="Light mode" class="w-[24px] h-[24px] select-none" />
        </div>
        <div
          v-show="!(lightModeCookie === null || lightModeCookie === undefined ? 1 : parseInt(lightModeCookie))"
          class="cursor-pointer"
          @click="switchThemeMode"
        >
          <img :src="svgPaths.darkMode" alt="Dark mode" class="w-[22px] h-[22px] select-none" />
        </div>
      </div>
      <div class="mx-3 h-[24px]">
        <a-dropdown class="h-[22px] flex items-center" :trigger="['click']" placement="bottomRight">
          <div class="ant-dropdown-link cursor-pointer">
            <img :src="svgPaths.locale" alt="Choose locale" class="w-[15px] h-[15px] select-none" />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="vi" :class="[lightMode ? '' : 'hover:bg-[#222F3C]']" @click="setLocale('vi')">
                <div class="flex items-center">
                  <img :src="svgPaths.vi" alt="Vietnamese" class="w-[24px] h-[24px] select-none" />
                  <p class="ms-2" :class="[lightMode ? '' : 'text-white']">Tiếng Việt</p>
                </div>
              </a-menu-item>
              <a-menu-item key="en" :class="[lightMode ? '' : 'hover:bg-[#222F3C]']" @click="setLocale('en')">
                <div class="flex items-center">
                  <img :src="svgPaths.en" alt="English" class="w-[24px] h-[24px] select-none" />
                  <p class="ms-2" :class="[lightMode ? '' : 'text-white']">English</p>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div v-if="displayImport" class="mx-3 h-[24px]">
        <button class="h-[22px]" @click="openImportModal">
          <img :src="svgPaths.upload" alt="Import" class="w-[14px] h-[14px] select-none" />
        </button>
      </div>
      <div class="mx-3 h-[24px]">
        <a-dropdown :trigger="['click']" placement="bottomRight">
          <div class="ant-dropdown-link cursor-pointer h-[22px] flex items-center" @click="getNotificationList">
            <img :src="svgPaths.notification" alt="Notification" class="w-[17px] h-[17px] select-none" />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="TBD"> To Be Developed </a-menu-item>
              <a-menu-divider />
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="ms-3 h-[24px]">
        <a-dropdown :trigger="['click']" placement="bottomRight">
          <div class="ant-dropdown-link cursor-pointer">
            <img :src="imageSrc" alt="avatar" class="w-[22px] h-[22px] rounded-full select-none" />
          </div>
          <template #overlay>
            <a-menu class="shadow-2xl">
              <div class="px-[12px] py-[5px]">
                <span class="font-bold" :class="[lightMode ? '' : 'text-white']">{{ userName }}</span>
              </div>
              <a-menu-divider />
              <a-menu-item key="profile" :class="[lightMode ? '' : 'hover:bg-[#222F3C]']">
                <NuxtLink
                  :to="pageRoutes.common.profile.index"
                  class="flex items-center"
                  :class="[lightMode ? '' : 'text-white']"
                >
                  <Profile class="w-[12px] h-[12px] select-none" />
                  <p class="ms-2">{{ $t('profile') }}</p>
                </NuxtLink>
              </a-menu-item>
              <a-menu-item key="security" :class="[lightMode ? '' : 'hover:bg-[#222F3C]']">
                <NuxtLink
                  :to="pageRoutes.common.security.index"
                  class="flex items-center"
                  :class="[lightMode ? '' : 'text-white']"
                >
                  <LockOutlined class="w-[12px] h-[12px] select-none" />
                  <p class="ms-2">{{ $t('security_setting') }}</p>
                </NuxtLink>
              </a-menu-item>
              <a-menu-item key="logout" :class="[lightMode ? '' : 'hover:bg-[#222F3C]']" @click="logout">
                <div class="flex items-center">
                  <img :src="svgPaths.signOut" alt="Log out" class="w-[12px] h-[12px] select-none" />
                  <p class="ms-2 text-red-500">{{ $t('log_out') }}</p>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
  <ModalImport :data="modalImportData" :on-cancel="clearImportOption" :on-submit="submitImport" />
</template>

<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue';
import Profile from '~/public/svg/profile.svg';
import { api } from '~/services/api';
import { pageRoutes } from '~/consts/page_routes';
import { getMessageCode } from '~/consts/api_response';
import { svgPaths } from '~/consts/svg_paths';
import { COMMON } from '~/consts/common';

// ---------------------- Variables ----------------------
const { setLocale } = useI18n();
const { $event } = useNuxtApp();
const props = defineProps({
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const displayImport = toRef(props, 'isAdmin');
const lightModeCookie = useCookie('lightMode');
const userNameCookie = useCookie('userName');
const userImageCookie = useCookie('userImage');
const notifcationCount = ref<number>(0);
const modalImportData = ref<{ isOpen: boolean; importOption: number; fileList: UploadFile[] }>({
  isOpen: false,
  importOption: 0,
  fileList: [],
});
const imageSrc = ref<string>('/image/default_user_image.png');
const userName = ref<string>('');
const { t } = useI18n();
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
// ---------------------- Functions ----------------------
function openImportModal() {
  modalImportData.value.isOpen = true;
}

function switchThemeMode() {
  const currentMode =
    lightModeCookie.value === null || lightModeCookie.value === undefined ? 1 : parseInt(lightModeCookie.value);
  $event.emit('toggleTheme', { isLightMode: !currentMode });
}

async function logout() {
  try {
    await api.authentication.logout();
    await navigateTo(pageRoutes.authentication.login);
    $event.emit('loading');
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

function getNotificationList() {}

function clearImportOption() {
  modalImportData.value = {
    isOpen: false,
    importOption: 0,
    fileList: [],
  };
}

function submitImport() {
  clearImportOption();
}

// ------------------------ Event Listeners ----------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
$event.on('addNotification', (e: any) => {
  notifcationCount.value += e.notifcationCount;
});

// ------------------------ Lifecycles ----------------------
onMounted(() => {
  // Get user name and image from JWT token store
  userName.value = '';
  imageSrc.value = '';

  userName.value = userNameCookie && userNameCookie.value ? userNameCookie.value : '';
  imageSrc.value = userImageCookie && userImageCookie.value ? userImageCookie.value : '';

  if (!imageSrc.value) {
    imageSrc.value = '/image/default_user_image.png';
  }
});
</script>
