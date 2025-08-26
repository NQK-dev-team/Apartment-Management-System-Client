<template>
  <div class="w-full h-full bg-[#1f1f1f] flex justify-between items-center px-3">
    <NuxtLink
      :to="
        userRole?.toString() === roles.owner
          ? pageRoutes.common.report.index
          : userRole?.toString() === roles.manager
            ? pageRoutes.common.building.list
            : pageRoutes.common.room.list
      "
      class="flex items-center"
    >
      <img :src="svgPaths.logo" alt="Logo" class="w-[32px] h-[32px] select-none" />
      <h2 class="ms-2 text-white select-none">NQK Management</h2>
    </NuxtLink>
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
              <a-menu-item
                :key="COMMON.LOCALE.VI"
                :class="[lightMode ? '' : 'hover:bg-[#222F3C]']"
                @click="setLocale(COMMON.LOCALE.VI as any)"
              >
                <div class="flex items-center">
                  <img :src="svgPaths.vi" alt="Vietnamese" class="w-[24px] h-[24px] select-none" />
                  <p class="ms-2" :class="[lightMode ? '' : 'text-white']">Tiếng Việt</p>
                </div>
              </a-menu-item>
              <a-menu-item
                :key="COMMON.LOCALE.EN"
                :class="[lightMode ? '' : 'hover:bg-[#222F3C]']"
                @click="setLocale(COMMON.LOCALE.EN as any)"
              >
                <div class="flex items-center">
                  <img :src="svgPaths.en" alt="English" class="w-[24px] h-[24px] select-none" />
                  <p class="ms-2" :class="[lightMode ? '' : 'text-white']">English</p>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div v-if="userRole?.toString() === roles.owner || userRole?.toString() === roles.manager" class="mx-3 h-[24px]">
        <NuxtLink :to="pageRoutes.common.upload.index" class="h-[22px] flex items-center">
          <img :src="svgPaths.upload" alt="Import" class="w-[14px] h-[14px] select-none" />
        </NuxtLink>
      </div>
      <div v-if="userRole?.toString() !== roles.owner" class="mx-3 h-[24px]">
        <a-dropdown :trigger="['click']" placement="bottomRight">
          <div class="ant-dropdown-link cursor-pointer h-[22px] flex items-center">
            <a-badge dot :count="newNotificationCount">
              <img :src="svgPaths.notification" alt="Notification" class="w-[17px] h-[17px] select-none" />
            </a-badge>
          </div>
          <template #overlay>
            <a-menu class="w-[400px] px-2">
              <div class="flex items-center justify-between">
                <p class="font-bold text-lg select-none">{{ $t('notifications') }}</p>
                <div
                  class="flex items-center cursor-pointer text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
                  @click="readAllNotification"
                >
                  <DoubleTick class="text-lg" />
                  <p class="select-none">{{ $t('mark_all_as_read') }}</p>
                </div>
              </div>
              <a-menu-divider />
              <div id="notificationDropdownList" class="overflow-auto max-h-[400px]">
                <NuxtLink
                  v-for="(notification, index) in notificationList"
                  :key="index"
                  :to="pageRoutes.common.notice.inbox(notification.ID)"
                  class="pb-5 pt-3 cursor-pointer rounded-md px-2 flex flex-col"
                  :class="[
                    {
                      'hover:bg-[#f0f0f0] active:bg-[#f5f5f5]': lightMode,
                    },
                    {
                      'hover:bg-[#797979] active:bg-[#a1a1a1]': !lightMode,
                    },
                  ]"
                  @click="notificationList[index].isRead = COMMON.NOTIFICATION.READ"
                >
                  <div
                    class="select-none text-ellipsis overflow-hidden whitespace-nowrap"
                    :class="[
                      {
                        'font-bold text-black': lightMode && notification.isRead === COMMON.NOTIFICATION.UNREAD,
                        'font-bold text-white': !lightMode && notification.isRead === COMMON.NOTIFICATION.UNREAD,
                        'text-gray-500': lightMode && notification.isRead === COMMON.NOTIFICATION.READ,
                        'text-gray-400': !lightMode && notification.isRead === COMMON.NOTIFICATION.READ,
                      },
                    ]"
                  >
                    {{ notification.title }}
                  </div>
                  <div
                    class="text-xs select-none"
                    :class="[
                      {
                        'font-bold text-black': lightMode && notification.isRead === COMMON.NOTIFICATION.UNREAD,
                        'font-bold text-white': !lightMode && notification.isRead === COMMON.NOTIFICATION.UNREAD,
                        'text-gray-500': lightMode && notification.isRead === COMMON.NOTIFICATION.READ,
                        'text-gray-400': !lightMode && notification.isRead === COMMON.NOTIFICATION.READ,
                      },
                    ]"
                  >
                    {{ getTimeDifferenceFromNow(notification.sendTime, locale) }}
                  </div>
                </NuxtLink>
              </div>
              <a-menu-divider v-if="canLoadMore" />
              <div
                v-if="canLoadMore"
                class="flex items-center justify-center text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9] select-none cursor-pointer my-1"
                @click="getMoreNotification"
              >
                {{ $t('load_more') }}
              </div>
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
</template>

<script lang="ts" setup>
import Profile from '~/public/svg/profile.svg';
import { api } from '~/services/api';
import { pageRoutes } from '~/consts/page_routes';
import { getMessageCode } from '~/consts/api_response';
import { svgPaths } from '~/consts/svg_paths';
import { COMMON } from '~/consts/common';
import { websocketRoutes } from '~/consts/websocket_routes';
import type { Notification } from '~/types/notification';
import { roles } from '~/consts/roles';
import DoubleTick from '~/public/svg/double_tick.svg';

// ---------------------- Variables ----------------------
const { setLocale, locale } = useI18n();
const { $event } = useNuxtApp();
const lightModeCookie = useCookie('lightMode');
const userNameCookie = useCookie('userName');
const userImageCookie = useCookie('userImage');
const imageSrc = ref<string>('/image/default_user_image.png');
const userName = ref<string>('');
const { t } = useI18n();
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const websocketConnection = ref<WebSocket | undefined>(undefined);
const userID = useCookie('userID');
const noticeOffset = ref(0);
const noticeLimit = ref(10);
const canLoadMore = ref(true);
const notificationList = ref<Notification[]>([]);
const userRole = useCookie('userRole');
const newNotificationCount = computed(() => {
  return notificationList.value.filter((elem) => elem.isRead === COMMON.NOTIFICATION.UNREAD).length;
});
const scrollPosition = ref({ top: 0, left: 0 });
const previousOffset = ref(0);

// ---------------------- Functions ----------------------
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

async function getNotificationList() {
  try {
    const response = await api.common.notice.getInbox(noticeLimit.value, noticeOffset.value);

    if (response.data.length < noticeLimit.value) {
      canLoadMore.value = false;
    }

    setTimeout(async () => {
      document.getElementById('notificationDropdownList')?.scrollTo({
        top: scrollPosition.value.top,
        left: scrollPosition.value.left,
        behavior: 'smooth',
      });
    }, 100);

    notificationList.value.push(...response.data);

    if (previousOffset.value !== 0 && noticeOffset.value !== previousOffset.value) {
      noticeOffset.value += noticeLimit.value;
      getNotificationList();
    } else {
      previousOffset.value = 0;
    }
  } catch (err: any) {
    console.error(err);
  }
}

function getMoreNotification() {
  if (canLoadMore.value) {
    noticeOffset.value += noticeLimit.value;
    getNotificationList();
  }
}

async function readAllNotification() {
  try {
    const result = notificationList.value.filter((elem) => !elem.isRead);

    if (result.length === 0) {
      return;
    }

    await api.common.notice.markManyAsRead(result.map((elem) => elem.ID));
    notificationList.value
      .filter((elem) => !elem.isRead)
      .forEach((elem) => {
        elem.isRead = COMMON.NOTIFICATION.READ;
      });
  } catch (err: any) {
    /* empty */
  }
}

async function getUserInfo() {
  try {
    const response = await api.common.profile.getProfile();
    userName.value = getUserName(response.data);
    imageSrc.value = response.data.profileFilePath;
  } catch (err: any) {
    userName.value = userNameCookie && userNameCookie.value ? userNameCookie.value : '';
    imageSrc.value = userImageCookie && userImageCookie.value ? userImageCookie.value : '';
  } finally {
    if (!imageSrc.value) {
      imageSrc.value = '/image/default_user_image.png';
    }
  }
}

// ------------------------ Lifecycles ----------------------
onMounted(() => {
  getNotificationList();
  getUserInfo();

  websocketConnection.value = new WebSocket(
    `${location.protocol.includes('https') ? 'wss' : 'ws'}://${location.host}/ws${websocketRoutes.notification}?clientUserID=${Number(userID?.value || 0)}`
  );

  websocketConnection.value.onmessage = async (event) => {
    const data: { type: number; users: number[] } = JSON.parse(event.data);

    if (data.type === COMMON.WEBSOCKET_SIGNAL_TYPE.NEW_INBOX && data.users.includes(Number(userID?.value || 0))) {
      notificationList.value = [];
      previousOffset.value = noticeOffset.value;
      noticeOffset.value = 0;
      scrollPosition.value = {
        top: document.getElementById('notificationDropdownList')?.scrollTop || 0,
        left: document.getElementById('notificationDropdownList')?.scrollLeft || 0,
      };
      getNotificationList();
    }
  };
});

onUnmounted(() => {
  websocketConnection.value?.close();
});
</script>
