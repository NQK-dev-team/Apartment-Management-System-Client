<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <NuxtLink :to="pageRoutes.common.bill.list">{{ $t('bill_list') }}</NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t('bill_info') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex items-center justify-between">
        <h1 class="mt-3 text-2xl">{{ bill ? bill.title : '' }}</h1>
        <div
          v-if="
            (userRole?.toString() === roles.manager || userRole?.toString() === roles.owner) &&
            bill &&
            bill.status !== COMMON.BILL_STATUS.PAID &&
            bill.status !== COMMON.BILL_STATUS.PROCESSING
          "
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
                editBill = { value: JSON.parse(JSON.stringify(bill)) }; // Reset to original billing information
                $event.emit('cancelBillingEditMode');
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
                $event.emit('updateBillingInfo');
              }
            "
            >{{ $t('save_changes') }}</a-button
          >
        </div>
      </div>
    </div>
    <div
      id="page_content"
      class="flex-1 flex flex-col px-4 mt-5"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <template v-if="bill && editBill">
        <CommonBillDetailViewMode v-if="!editMode" :bill="bill" />
        <CommonBillDetailEditMode v-else :edit-bill="editBill" :old-bill="bill" />
      </template>
      <div class="flex flex-col items-center my-5">
        <a-button class="my-2 w-[100px] rounded-sm">
          <NuxtLink :to="pageRoutes.common.bill.list">{{ $t('back') }}</NuxtLink>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';
import { api } from '~/services/api';
import type { Bill } from '~/types/bill';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Billing Detail',
  layout: 'main',
});

useHead({
  title: 'Billing Detail',
  meta: [
    {
      name: 'description',
      content: 'Detail of a billing payment',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const userRole = useCookie('userRole');
const editMode = ref(false);
const route = useRoute();
const billID = Number(route.params.id as string);
const bill = ref<Bill | null>(null);
const editBill = ref<{ value: Bill }>({ value: {} as Bill });
const { $event, $dayjs } = useNuxtApp();

// ---------------------- Functions ----------------------
async function getBillingDetail() {
  try {
    $event.emit('loading');
    const response = await api.common.bill.getDetail(billID);
    response.data.paymentTime.Time = response.data.paymentTime.Valid ? $dayjs(response.data.paymentTime.Time) : '';
    response.data.payerID.Int64 = response.data.payerID.Valid ? response.data.payerID.Int64 : null;
    bill.value = response.data;
    editBill.value = { value: JSON.parse(JSON.stringify(bill.value)) };
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
  await getBillingDetail();

  if (!bill.value || !bill.value.ID) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});

// ---------------------- Events ----------------------
$event.on('updateBillingSuccess', () => {
  notification.info({
    message: t('update_success'),
    description: t('bill_info_updated'),
  });

  notification.info({
    message: t('edit_mode_inactive'),
  });
  editMode.value = false;
  $event.emit('cancelBillingEditMode');

  getBillingDetail();
});
</script>
