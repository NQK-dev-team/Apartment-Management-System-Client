<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <NuxtLink :to="pageRoutes.common.contract.list">{{ $t('contract_list') }}</NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t('contract_information') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex items-center justify-between">
        <h1 class="mt-3 text-2xl">{{ $t('contract') }} {{ contract ? contract.ID : '' }}</h1>
        <div
          v-if="userRole?.toString() === roles.manager || userRole?.toString() === roles.owner"
          class="flex justify-end"
        >
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
                editContract = { value: JSON.parse(JSON.stringify(contract)) }; // Reset to original contract
              }
            "
            >{{ $t('cancel') }}</a-button
          >
          <a-button v-show="editMode" type="primary" class="rounded-sm" @click="updateContract">{{
            $t('save_changes')
          }}</a-button>
        </div>
      </div>
    </div>
    <template v-if="contract && editContract">
      <CommonContractDetailViewMode v-if="!editMode" :contract="contract" />
      <CommonContractDetailEditMode v-else :contract="contract" :edit-contract="editContract" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { useI18n } from 'vue-i18n';
import { roles } from '~/consts/roles';
import type { Contract } from '~/types/contract';
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Contract Detail',
  layout: 'main',
  // middleware: ['authorization-manager', 'authorization-customer'],
});

useHead({
  title: 'Contract Detail',
  meta: [
    {
      name: 'description',
      content: 'Detail of a contract in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const editMode = ref<boolean>(false);
const userRole = useCookie('userRole');
const contract = ref<Contract | null>(null);
const route = useRoute();
const contractID = Number(route.params.id as string);
const editContract = ref<{ value: Contract }>({ value: {} as Contract });

// ---------------------- Functions ----------------------
async function getContractDetail(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }

    const response = await api.common.contract.getDetail(contractID);
    contract.value = response.data;
    editContract.value.value = JSON.parse(JSON.stringify(contract.value)); // Create a deep copy for editing
  } catch (err: any) {
    contract.value = null;
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
  } finally {
    if (emitLoading) {
      $event.emit('loading');
    }
  }
}

async function updateContract() {
  try {
    $event.emit('loading');

    getContractDetail(false); // Refresh contract details
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

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  await getContractDetail();

  if (!contract.value || !contract.value.ID) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});

// ---------------------- Expose ----------------------
$event.on('errorEditContract', () => {
  editMode.value = false;
  notification.error({
    message: t('system_error_title'),
    description: t('system_error_description'),
  });
});
</script>
