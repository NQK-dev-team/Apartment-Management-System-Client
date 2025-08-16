<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('notice_inbox') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('notice_inbox') }}</h1>
    </div>
    <ClientOnly>
      <div
        class="mt-5 p-3 flex-1 flex items-center overflow-auto"
        :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']"
      >
        <div
          class="border-r-[2px] w-[400px] flex flex-col h-full"
          :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
        >
          <a-input-search
            id="search_inbox"
            v-model:value="searchText"
            class="pe-2 mb-5"
            enter-button
            @search="searchInbox"
          />
          <div v-if="filteredInboxList.length !== 0" class="overflow-auto hideBrowserScrollbar flex-1 flex flex-col">
            <div
              v-for="(notification, index) in filteredInboxList"
              :key="index"
              class="cursor-pointer pe-2"
              @click="
                (e) => {
                  clickNotification(e, notification.ID);
                }
              "
            >
              <a-badge
                v-if="notification.isRead === COMMON.NOTIFICATION.UNREAD"
                dot
                class="ps-3 rounded-md py-3 block w-full my-2"
                :class="[
                  lightMode ? 'hover:bg-[#f0f0f0] active:bg-[#f5f5f5]' : 'hover:bg-[#797979] active:bg-[#a1a1a1]',
                ]"
              >
                <div class="flex items-center justify-between pe-3">
                  <div class="text-lg font-semibold select-none">
                    {{ notification.title }}
                  </div>
                  <div class="flex items-center">
                    <StarFilled
                      v-if="notification.isMarked === COMMON.NOTIFICATION.MARKED"
                      class="text-2xl w-[20px] h-[25px] text-yellow-500"
                    />
                    <StarOutlined
                      v-else-if="notification.isMarked === COMMON.NOTIFICATION.UNMARKED"
                      class="text-2xl w-[20px] h-[25px]"
                    />
                  </div>
                </div>
                <div class="text-sm select-none" :class="[lightMode ? 'text-gray-700' : 'text-gray-300']">
                  {{ $t('sender') }}:&nbsp;
                  {{ getUserName(notification.sender) }}
                </div>
                <div class="text-sm select-none" :class="[lightMode ? 'text-gray-700' : 'text-gray-300']">
                  {{ $t('send_time') }}:&nbsp;
                  {{
                    notification.createdAt === notification.updatedAt
                      ? convertToDateTime2(notification.sendTime, locale)
                      : convertToDateTime2(notification.updatedAt, locale)
                  }}
                </div>
              </a-badge>
              <div
                v-else-if="notification.isRead === COMMON.NOTIFICATION.READ"
                class="ps-3 rounded-md py-3 block w-full my-2"
                :class="[
                  lightMode ? 'hover:bg-[#f0f0f0] active:bg-[#f5f5f5]' : 'hover:bg-[#797979] active:bg-[#a1a1a1]',
                ]"
              >
                <div class="flex items-center justify-between pe-3">
                  <div class="text-lg font-semibold select-none">
                    {{ notification.title }}
                  </div>
                  <div class="flex items-center">
                    <StarFilled
                      v-if="notification.isMarked === COMMON.NOTIFICATION.MARKED"
                      class="text-2xl w-[20px] h-[25px] text-yellow-500"
                    />
                    <StarOutlined
                      v-else-if="notification.isMarked === COMMON.NOTIFICATION.UNMARKED"
                      class="text-2xl w-[20px] h-[25px]"
                    />
                  </div>
                </div>
                <div class="text-sm select-none" :class="[lightMode ? 'text-gray-700' : 'text-gray-300']">
                  {{ $t('sender') }}:&nbsp;
                  {{ getUserName(notification.sender) }}
                </div>
                <div class="text-sm select-none" :class="[lightMode ? 'text-gray-700' : 'text-gray-300']">
                  {{ $t('send_time') }}:&nbsp;
                  {{
                    notification.createdAt === notification.updatedAt
                      ? convertToDateTime2(notification.sendTime, locale)
                      : convertToDateTime2(notification.updatedAt, locale)
                  }}
                </div>
              </div>
            </div>
          </div>
          <tbody v-else>
            <tr class="h-[150px]">
              <td :colspan="100">
                <div class="h-full w-full">
                  <div
                    class="flex flex-col items-center justify-center overflow-hidden"
                    :style="{ width: `${400 - 2}px` }"
                  >
                    <svg v-if="lightMode" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                        <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                        <g fill-rule="nonzero" stroke="#d9d9d9">
                          <path
                            d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                          ></path>
                          <path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            fill="#fafafa"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                        <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                        <g fill-rule="nonzero" stroke="#3e3e3e">
                          <path
                            d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                          ></path>
                          <path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            fill="#1d1d1d"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                      {{ $t('no_data') }}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </div>
        <div class="h-full flex-1 overflow-auto hideBrowserScrollbar">
          <div v-if="notificationDetail" class="h-full w-full px-5">
            <div class="flex items-center justify-between">
              <div :class="[lightMode ? 'text-gray-700' : 'text-gray-300']">
                {{ $t('sender') }}:&nbsp;
                {{ getUserName(notificationDetail.sender) }}
              </div>
              <a-dropdown>
                <template #overlay>
                  <a-menu @click="handleMenuClick">
                    <a-menu-item :key="1">
                      <span v-if="notificationDetail.isRead === COMMON.NOTIFICATION.UNREAD" class="flex items-center"
                        ><Read class="text-md" />&nbsp;{{ $t('mark_as_read') }}</span
                      >
                      <span v-else-if="notificationDetail.isRead === COMMON.NOTIFICATION.READ" class="flex items-center"
                        ><Unread class="text-md" />&nbsp;{{ $t('mark_as_unread') }}</span
                      >
                    </a-menu-item>
                    <a-menu-item :key="2">
                      <span
                        v-if="notificationDetail.isMarked === COMMON.NOTIFICATION.UNMARKED"
                        class="flex items-center"
                        ><StarFilled class="text-yellow-500 text-md" />&nbsp;{{ $t('mark_as_important') }}</span
                      >
                      <span
                        v-else-if="notificationDetail.isMarked === COMMON.NOTIFICATION.MARKED"
                        class="flex items-center"
                        ><StarOutlined class="text-md" />&nbsp;{{ $t('mark_as_unimportant') }}</span
                      >
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-button size="small">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <rect width="24" height="24" fill="white"></rect>
                      <circle
                        cx="7"
                        cy="12"
                        r="0.5"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></circle>
                      <circle
                        cx="12"
                        cy="12"
                        r="0.5"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></circle>
                      <circle
                        cx="17"
                        cy="12"
                        r="0.5"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></circle>
                    </g>
                  </svg>
                </a-button>
              </a-dropdown>
            </div>
            <div class="mt-5" :class="[lightMode ? 'text-gray-700' : 'text-gray-300']">
              {{ $t('send_time') }}:&nbsp;
              {{
                notificationDetail.createdAt === notificationDetail.updatedAt
                  ? convertToDateTime2(notificationDetail.sendTime, locale)
                  : convertToDateTime2(notificationDetail.updatedAt, locale)
              }}
            </div>
            <h2 class="mt-10 text-center text-2xl">{{ notificationDetail.title }}</h2>
            <div v-html="sanitizeString(notificationDetail.content)"></div>
            <hr class="mt-5" />
            <p class="mt-3">{{ $t('attached_file') }}</p>
            <div class="inline-block mt-2">
              <a-upload
                :file-list="
                  notificationDetail.files

                    .map((file) => ({
                      uid: file.ID.toString(),
                      name: file.title,
                      status: 'done',
                      url: file.path,
                    }))
                    .filter((file) => isFileImage(file)) as any
                "
                class="custom_notice_image_upload custom_notice_image_upload_hide_delete_button"
                list-type="picture-card"
                @preview="handlePreview"
              >
              </a-upload>
              <a-upload
                :file-list="
                  notificationDetail.files

                    .map((file) => ({
                      uid: file.ID.toString(),
                      name: file.title,
                      status: 'done',
                      url: file.path,
                    }))
                    .filter((file) => !isFileImage(file)) as any
                "
                class="custom_notice_image_upload custom_notice_image_upload_hide_delete_button"
              >
              </a-upload>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
    <a-modal width="700px" :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="Image Preview" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { api } from '~/services/api';
import type { Notification } from '~/types/notification';
import type { UploadProps } from 'ant-design-vue';
import Read from '~/public/svg/read.svg';
import Unread from '~/public/svg/unread.svg';
import type { RuntimeConfig } from 'nuxt/schema';
import { websocketRoutes } from '~/consts/websocket_routes';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Inbox',
  layout: 'main',
});

useHead({
  title: 'Inbox',
  meta: [
    {
      name: 'description',
      content: 'View and manage user inbox notifications',
    },
  ],
});

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { t, locale } = useI18n();
const { $event } = useNuxtApp();
const offset = ref<number>(0);
const limit = ref<number>(500);
const inboxList = ref<Notification[]>([]);
const filteredInboxList = ref<Notification[]>([]);
const notificationDetail = ref<Notification | null>(null);
const searchText = ref('');
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const websocketConnection = ref<WebSocket | null>(null);
const userID = useCookie('userID');

// ---------------------- Functions ----------------------
async function getInboxList(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }

    const response = await api.common.notice.getInbox(limit.value, offset.value);

    if (offset.value === 0) {
      inboxList.value = response.data;
    } else {
      inboxList.value.push(...response.data);
    }

    filteredInboxList.value = inboxList.value;

    if (response.data.length === inboxList.value.length) {
      offset.value += limit.value;
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
    }
  } finally {
    if (emitLoading) {
      $event.emit('loading');
    }
  }
}

async function readNotification(notificationId: number) {
  try {
    const result = inboxList.value.find((elem) => elem.ID === notificationId);
    if (result && !result.isRead) {
      result.isRead = 1;
      await api.common.notice.readNotification(notificationId);
    }
    notificationDetail.value = result || null;
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
  }
}

async function unreadNotification(notificationId: number) {
  try {
    const result = inboxList.value.find((elem) => elem.ID === notificationId);
    if (result && result.isRead) {
      result.isRead = 0;
      await api.common.notice.unreadNotification(notificationId);
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
    }
  }
}

async function markNotification(notificationId: number) {
  try {
    const result = inboxList.value.find((elem) => elem.ID === notificationId);
    if (result && !result.isMarked) {
      result.isMarked = 1;
      await api.common.notice.markNotification(notificationId);
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
    }
  }
}

async function unmarkNotification(notificationId: number) {
  try {
    const result = inboxList.value.find((elem) => elem.ID === notificationId);
    if (result && result.isMarked) {
      result.isMarked = 0;
      await api.common.notice.unmarkNotification(notificationId);
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
    }
  }
}

async function clickNotification(event: any, notificationId: number) {
  if (event.target.nodeName === 'svg' || event.target.nodeName === 'path') {
    const result = inboxList.value.find((elem) => elem.ID === notificationId);

    if (result && result.isMarked === COMMON.NOTIFICATION.UNMARKED) {
      await markNotification(notificationId);
    } else if (result && result.isMarked === COMMON.NOTIFICATION.MARKED) {
      await unmarkNotification(notificationId);
    }
  } else {
    await readNotification(notificationId);
  }
}

function handleMenuClick(e: any) {
  const type: number = e.key;

  if (type === 1) {
    if (notificationDetail.value && notificationDetail.value.isRead === COMMON.NOTIFICATION.UNREAD) {
      readNotification(notificationDetail.value.ID);
    } else if (notificationDetail.value && notificationDetail.value.isRead === COMMON.NOTIFICATION.READ) {
      unreadNotification(notificationDetail.value.ID);
    }
  } else if (type === 2) {
    if (notificationDetail.value && notificationDetail.value.isMarked === COMMON.NOTIFICATION.UNMARKED) {
      markNotification(notificationDetail.value.ID);
    } else if (notificationDetail.value && notificationDetail.value.isMarked === COMMON.NOTIFICATION.MARKED) {
      unmarkNotification(notificationDetail.value.ID);
    }
  }
}

function searchInbox() {
  filteredInboxList.value = inboxList.value.filter((notification) =>
    removeDiacritics(notification.title.toLowerCase()).includes(removeDiacritics(searchText.value.toLowerCase()))
  );
}

// @ts-ignore
async function handlePreview(file: UploadProps['fileList'][number]) {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  const fileType = '.' + file.url.split('/').pop().split('.').pop();

  if (COMMON.ALLOW_IMAGE_EXTENSIONS.includes(fileType)) {
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
  } else {
    // Open file in new tab
    window.open(file.url, '_blank');
  }
}

// @ts-ignore
function isFileImage(file: UploadProps['fileList'][number]): boolean {
  if (!file.url && !file.preview) {
    return (file.originFileObj as File).type.startsWith('image/');
  }
  const fileType = '.' + file.url.split('/').pop().split('.').pop();

  if (COMMON.ALLOW_IMAGE_EXTENSIONS.includes(fileType)) {
    return true;
  }
  return false;
}

function handleCancel() {
  previewVisible.value = false;
  previewTitle.value = '';
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getInboxList();
  const config: RuntimeConfig = useRuntimeConfig();
  websocketConnection.value = new WebSocket(config.public.webSocketURL + websocketRoutes.notification);

  websocketConnection.value.onmessage = (event) => {
    const data: { type: number; users: number[] } = JSON.parse(event.data);

    if (data.type === COMMON.WEBSOCKET_SIGNAL_TYPE.NEW_INBOX && data.users.includes(Number(userID?.value || 0))) {
      if (offset.value === 0) {
        getInboxList(false);
      } else {
        offset.value = 0;
      }
    }
  };
});

onUnmounted(() => {
  websocketConnection.value?.close();
});

// ---------------------- Watchers ----------------------
watch(offset, () => {
  getInboxList(false);
});
</script>

<style lang="css">
.custom_notice_image_upload .ant-upload-list-item-actions{
  display:flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.custom_notice_image_upload a{
  padding-top: 3px !important;
}

.custom_notice_image_upload {
  display:flex !important;
  flex-direction: column !important;
}

.custom_notice_image_upload_hide_delete_button button{
  display:none !important;
}
</style>
