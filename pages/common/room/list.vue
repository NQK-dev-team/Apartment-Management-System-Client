<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('room_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('room_list') }}</h1>
      <!-- <div class="flex items-center justify-center">
        <a-input-search
          id="searchRoom"
          v-model:value="searchValue"
          class="w-[500px]"
          :placeholder="$t('enter_search')"
          enter-button
          @search="filterRoomList"
        />
      </div> -->
    </div>
    <div class="mt-5 overflow-auto p-3 flex-1" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <div class="flex justify-center items-center">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <CommonRoomListCard
            v-for="(room, index) in roomList"
            v-show="current * 8 >= index + 1 && (current - 1) * 8 < index + 1"
            :key="index"
            :room="room"
          />
        </div>
      </div>
      <div v-if="roomList.length > 8" class="flex justify-center mt-10 mb-3">
        <a-pagination v-model:current="current" :total="roomList.length" :default-page-size="8" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { COMMON } from '~/consts/common';
import type { Room } from '~/types/building';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Room List',
  layout: 'main',
  middleware: ['authorization-customer'],
});

useHead({
  title: 'Room List',
  meta: [
    {
      name: 'description',
      content: 'List of rooms that the user is included',
    },
  ],
});

// ---------------------- Variables ----------------------
const { $event } = useNuxtApp();
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const current = ref(1);
// const searchValue = ref('');
const roomList = ref<Room[]>([]);
// const filteredRoomList = ref<Room[]>([]);

// ---------------------- Functions ----------------------
async function getRoomList() {
  try {
    $event.emit('loading');
    const response = await api.common.room.getList();
    roomList.value = response.data;
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

// function filterRoomList() {
//   current.value = 1;
// }

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getRoomList();
});
</script>
