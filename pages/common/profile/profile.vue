<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('profile') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="mt-3 flex items-center justify-between">
        <h1 class="text-2xl">{{ userInfo ? getUserName(userInfo) : '' }}</h1>
        <div class="flex justify-end">
          <a-button
            v-show="!editMode"
            type="primary"
            class="rounded-sm"
            @click="
              () => {
                editMode = true;
                notification.info({
                  message: t('edit_mode_active'),
                });
              }
            "
            >{{ $t('edit') }}</a-button
          >
          <a-button
            v-show="editMode"
            class="rounded-sm me-2"
            @click="
              () => {
                notification.info({
                  message: t('edit_mode_inactive'),
                });
                editMode = false;
                userInfo = JSON.parse(JSON.stringify(oldUserInfo)); // Reset to old user info
                $event.emit('cancelProfileEditMode');
              }
            "
            >{{ $t('cancel') }}</a-button
          >
          <a-button
            v-show="editMode"
            type="primary"
            class="rounded-sm"
            @click="
              () => {
                $event.emit('updateUserInfo');
              }
            "
            >{{ $t('save_changes') }}</a-button
          >
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <CommonProfileEditMode v-if="editMode && userInfo && oldUserInfo" :user="userInfo" :old-info="oldUserInfo" />
      <CommonProfileViewMode v-if="!editMode && userInfo" :user="userInfo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { api } from '~/services/api';
import type { User } from '~/types/user';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Profile',
  layout: 'main',
});

useHead({
  title: 'Profile',
  meta: [
    {
      name: 'description',
      content: 'Manage user personal information',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const editMode = ref(false);
const { $event, $dayjs } = useNuxtApp();
const userInfo = ref<User | null>(null);
const oldUserInfo = ref<User | null>(null);

// ---------------------- Functions ----------------------
async function getUserInfo() {
  try {
    $event.emit('loading');
    const response = await api.common.profile.getProfile();

    userInfo.value = response.data;
    userInfo.value.dobDayjs = $dayjs(userInfo.value.dob);
    userInfo.value.newProfile = []; // Reset new profile file
    userInfo.value.newFrontSSN = []; // Reset new front SSN file
    userInfo.value.newBackSSN = []; // Reset new back SSN file
    oldUserInfo.value = JSON.parse(JSON.stringify(userInfo.value)); // Deep copy to oldUserInfo
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      throw createError({
        status: 500,
        message: 'Internal server error',
        fatal: true,
      });
    }
    userInfo.value = null;
  } finally {
    $event.emit('loading');
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  await getUserInfo();

  if (userInfo.value === null || !userInfo.value.ID) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});

// ---------------------- Events ----------------------
$event.on('refetchProfile', getUserInfo);
</script>
