<template lang="html">
  <div class="w-full h-[50px] bg-[#001529] flex justify-between items-center px-3">
    <div class="flex items-center">
      <img src="/svg/logo.svg" alt="Logo" class="w-[32px] h-[32px] select-none" />
      <h2 class="ms-2 text-white">NQK Management</h2>
    </div>
    <div class="flex items-center">
      <div class="me-3 h-[24px] flex items-center">
        <div
          v-show="lightModeCookie === null || lightModeCookie === undefined ? 1 : parseInt(lightModeCookie)"
          class="cursor-pointer"
          @click="switchThemeMode"
        >
          <img src="/svg/light_mode.svg" alt="Light mode" class="w-[24px] h-[24px] select-none" />
        </div>
        <div
          v-show="!(lightModeCookie === null || lightModeCookie === undefined ? 1 : parseInt(lightModeCookie))"
          class="cursor-pointer"
          @click="switchThemeMode"
        >
          <img src="/svg/dark_mode.svg" alt="Dark mode" class="w-[22px] h-[22px] select-none" />
        </div>
      </div>
      <div class="mx-3 h-[24px]">
        <a-dropdown
          class="h-[22px] flex items-center"
          :trigger="['click']"
          placement="bottomRight"
          :arrow="{ pointAtCenter: true }"
        >
          <div class="ant-dropdown-link cursor-pointer">
            <img src="/svg/locale.svg" alt="Choose locale" class="w-[15px] h-[15px] select-none" />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="vi" @click="setLocale('vi')">
                <div class="flex items-center">
                  <img src="/svg/vi.svg" alt="Vietnamese" class="w-[24px] h-[24px] select-none" />
                  <p class="ms-2">Tiếng Việt</p>
                </div>
              </a-menu-item>
              <a-menu-item key="en" @click="setLocale('en')">
                <div class="flex items-center">
                  <img src="/svg/en.svg" alt="English" class="w-[24px] h-[24px] select-none" />
                  <p class="ms-2">English</p>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div v-if="displayImport" class="mx-3 h-[24px]">
        <button class="h-[22px]" @click="openImportModal">
          <img src="/svg/upload.svg" alt="Import" class="w-[14px] h-[14px] select-none" />
        </button>
      </div>
      <div class="mx-3 h-[24px]">
        <a-dropdown :trigger="['click']" placement="bottomRight" :arrow="{ pointAtCenter: true }">
          <div class="ant-dropdown-link cursor-pointer h-[22px] flex items-center" @click="getNotificationList">
            <img src="/svg/notification.svg" alt="Notification" class="w-[17px] h-[17px] select-none" />
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
        <a-dropdown :trigger="['click']" placement="bottomRight" :arrow="{ pointAtCenter: true }">
          <div class="ant-dropdown-link cursor-pointer">
            <img :src="imageSrc" alt="avatar" class="w-[22px] h-[22px] rounded-full select-none" />
          </div>
          <template #overlay>
            <a-menu>
              <div class="px-[12px] py-[5px]">
                <span class="font-bold">{{ userName }}</span>
              </div>
              <a-menu-divider />
              <a-menu-item key="profile">
                <a href="/profile" class="flex items-center">
                  <img src="/svg/profile.svg" alt="Profile" class="w-[12px] h-[12px] select-none" />
                  <p class="ms-2">{{ $t('profile') }}</p>
                </a>
              </a-menu-item>
              <a-menu-item key="logout">
                <button class="flex items-center" @click="logout">
                  <img src="/svg/sign_out.svg" alt="Log out" class="w-[12px] h-[12px] select-none" />
                  <p class="ms-2 text-red-500">{{ $t('log_out') }}</p>
                </button>
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
import type { UploadFile } from '~/types/upload_file';
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
const notifcationCount = ref<number>(0);
const modalImportData = ref<{ isOpen: boolean; importOption: number; fileList: UploadFile[] }>({
  isOpen: false,
  importOption: 0,
  fileList: [],
});
const imageSrc = ref<string>('/image/default_user_image.png');
const userName = ref<string>('');

// ---------------------- Functions ----------------------
function openImportModal() {
  modalImportData.value.isOpen = true;
}

function switchThemeMode() {
  const currentMode =
    lightModeCookie.value === null || lightModeCookie.value === undefined ? 1 : parseInt(lightModeCookie.value);
  $event.emit('toggleTheme', { isLightMode: !currentMode });
}

function logout() {}

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
  // Get user name and image from JWT token
  userName.value = '';
  imageSrc.value = '';

  if (!imageSrc.value) {
    imageSrc.value = '/image/default_user_image.png';
  }
});
</script>

<style lang="css" scoped></style>
