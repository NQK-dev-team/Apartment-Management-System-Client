<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('sent_notice') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('sent_notice') }}</h1>
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
            @search="searchNotification"
          />
          <div
            v-if="filteredSentList.length !== 0"
            id="notificationList"
            class="overflow-auto hideBrowserScrollbar flex-1 flex flex-col"
          >
            <div
              v-for="(notification, index) in filteredSentList"
              :key="index"
              class="cursor-pointer pe-2 flex items-center"
            >
              <div
                class="ps-3 rounded-md py-3 block w-full my-2 overflow-hidden"
                :class="[
                  {
                    'hover:bg-[#f0f0f0] active:bg-[#f5f5f5]':
                      lightMode && !(notificationDetail && notificationDetail.ID === notification.ID),
                  },
                  {
                    'hover:bg-[#797979] active:bg-[#a1a1a1]':
                      !lightMode && !(notificationDetail && notificationDetail.ID === notification.ID),
                  },
                  { 'text-[#ffffff] bg-[#1890FF]': notificationDetail && notificationDetail.ID === notification.ID },
                ]"
                @click="
                  (e: any) => {
                    if (e.target.nodeName === 'svg' || e.target.nodeName === 'path') {
                      return;
                    }
                    notificationDetail = notification;
                  }
                "
              >
                <div class="flex items-center justify-between pe-3">
                  <div class="text-lg font-semibold select-none text-ellipsis overflow-hidden whitespace-nowrap">
                    {{ notification.title }}
                  </div>
                  <!-- <div class="flex items-center ms-10">
                    <NuxtLink
                      :to="pageRoutes.common.notice.edit(notification.ID)"
                      class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
                      ><EditOutlined class="text-2xl w-[20px] h-[25px]"
                    /></NuxtLink>
                    <DeleteOutlined
                      class="text-2xl w-[20px] h-[25px] text-red-500 hover:text-red-400 active:text-red-200 ms-2"
                      @click="
                        () => {
                          $event.emit('deleteItem', {
                            callback: () => {
                              deleteNotification(notification.ID);
                            },
                          });
                        }
                      "
                    />
                  </div> -->
                </div>
                <div
                  class="text-sm select-none"
                  :class="[
                    {
                      'text-gray-700': lightMode && !(notificationDetail && notificationDetail.ID === notification.ID),
                      'text-gray-300': !lightMode && !(notificationDetail && notificationDetail.ID === notification.ID),
                      'text-[#ffffff]': notificationDetail && notificationDetail.ID === notification.ID,
                    },
                  ]"
                >
                  {{ $t('send_time') }}:&nbsp;
                  <!-- {{ convertToDateTime2(notification.sendTime, locale) }} -->
                  {{ $dayjs(notification.sendTime).fromNow() }}
                </div>
              </div>
              <!-- <div class="ms-1 h-[48px] my-2">
                <a-dropdown>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <NuxtLink
                          :to="pageRoutes.common.notice.edit(notification.ID)"
                          class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
                        >
                          <EditOutlined class="me-1" />{{ $t('edit') }}
                        </NuxtLink>
                      </a-menu-item>
                      <a-menu-item
                        @click="
                          () => {
                            $event.emit('deleteItem', {
                              callback: () => {
                                deleteNotification(notification.ID);
                              },
                            });
                          }
                        "
                      >
                        <span class="text-red-500 hover:text-red-400 active:text-red-200"
                          ><DeleteOutlined class="me-1" />{{ $t('delete') }}</span
                        >
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <div
                    class="h-full rounded-md flex items-center justify-center"
                    :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']"
                  >
                    <MoreOutlined class="text-xl" />
                  </div>
                </a-dropdown>
              </div> -->
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
            </div>
            <div class="mt-5" :class="[lightMode ? 'text-gray-700' : 'text-gray-300']">
              {{ $t('send_time') }}:&nbsp;
              {{ convertToDateTime2(notificationDetail.sendTime, locale) }}
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
import { websocketRoutes } from '~/consts/websocket_routes';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Sent Notice',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Sent Notice',
  meta: [
    {
      name: 'description',
      content: 'View and manage user sent notifications',
    },
  ],
});

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { t, locale } = useI18n();
const { $event, $dayjs } = useNuxtApp();
const offset = ref<number>(0);
const limit = ref<number>(500);
const sentList = ref<Notification[]>([]);
const filteredSentList = ref<Notification[]>([]);
const notificationDetail = ref<Notification | null>(null);
const searchText = ref('');
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const websocketConnection = ref<WebSocket | null>(null);
const userID = useCookie('userID');
$dayjs.locale(locale.value);
const scrollPosition = ref({
  top: 0,
  left: 0,
});

// ---------------------- Functions ----------------------
async function getSentList(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }

    const response = await api.common.notice.getSent(limit.value, offset.value);

    if (offset.value === 0) {
      sentList.value = response.data;
    } else {
      sentList.value.push(...response.data);
    }

    filteredSentList.value = sentList.value;

    if (response.data.length === limit.value) {
      offset.value += limit.value;
    }

    if (response.data.length < limit.value) {
      setTimeout(() => {
        if (notificationDetail.value && notificationDetail.value.ID !== sentList.value[0].ID) {
          document.getElementById('notificationList')?.scrollTo({
            top: scrollPosition.value.top,
            left: scrollPosition.value.left,
            behavior: 'smooth',
          });
        } else {
          document.getElementById('notificationList')?.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      }, 100);
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

function searchNotification() {
  filteredSentList.value = sentList.value.filter((notification) =>
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

// async function deleteNotification(id: number) {
//   try {
//     $event.emit('loading');
//     await api.common.notice.delete(id);

//     if (notificationDetail.value && notificationDetail.value.ID === id) {
//       notificationDetail.value = null;
//     }

//     filteredSentList.value = filteredSentList.value.filter((elem) => elem.ID !== id);
//     sentList.value = sentList.value.filter((elem) => elem.ID !== id);

//     $event.emit('deleteItemSuccess');
//   } catch (err: any) {
//     if (
//       err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
//       err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
//       err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
//     ) {
//       notification.error({
//         message: t('system_error_title'),
//         description: t('system_error_description'),
//       });
//     }
//   } finally {
//     $event.emit('loading');
//   }
// }

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
  getSentList();

  websocketConnection.value = new WebSocket(
    `${location.protocol.includes('https') ? 'wss' : 'ws'}://${location.host}/ws${websocketRoutes.notification}?clientUserID=${Number(userID?.value || 0)}`
  );

  websocketConnection.value.onmessage = (event) => {
    const data: { type: number; users: number[] } = JSON.parse(event.data);

    if (data.type === COMMON.WEBSOCKET_SIGNAL_TYPE.NEW_SENT && data.users.includes(Number(userID?.value || 0))) {
      scrollPosition.value = {
        top: document.getElementById('notificationList')?.scrollTop || 0,
        left: document.getElementById('notificationList')?.scrollLeft || 0,
      };

      if (offset.value === 0) {
        getSentList(false);
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
  getSentList(false);
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
