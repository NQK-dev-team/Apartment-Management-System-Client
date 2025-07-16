<template>
  <a-form ref="editForm" :model="bill">
    <h1 class="mt-5 text-2xl">{{ $t('bill_info') }}</h1>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="building_name">
          <label for="building_name" class="flex mb-1">
            <span>{{ $t('building') }}</span>
          </label>
          <a-input id="building_name" disabled readonly :value="bill.buildingName" :placeholder="$t('building_name')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="room_floor">
          <label for="room_floor" class="flex mb-1">
            <span>{{ $t('floor') }}</span>
          </label>
          <a-input id="room_floor" disabled readonly :value="bill.roomFloor" :placeholder="$t('floor')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="room_no">
          <label for="room_no" class="flex mb-1">
            <span>{{ $t('room_no') }}</span>
          </label>
          <a-input id="room_no" disabled readonly :value="bill.roomNo" :placeholder="$t('room_no')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="contract_id" class="flex mb-1">
          <span>{{ $t('contract_id') }}</span>
        </label>
        <a-input id="contract_id" disabled readonly :value="bill.contractID" :placeholder="$t('contract_id')">
          <template #suffix>
            <NuxtLink :to="pageRoutes.common.contract.detail(bill.contractID)" :title="$t('detail')" target="_blank"
              ><LinkOutlined
            /></NuxtLink>
          </template>
        </a-input>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="house_holder">
          <label for="house_holder" class="flex mb-1">
            <span>{{ $t('house_holder') }}</span>
          </label>
          <a-input
            id="house_holder"
            disabled
            readonly
            :value="`${bill.contract.householder.no} - ${getUserName(bill.contract.householder)}`"
            :title="`${bill.contract.householder.no} - ${getUserName(bill.contract.householder)}`"
            :placeholder="$t('house_holder')"
          >
            <template #suffix>
              <NuxtLink
                :to="pageRoutes.common.customer.detail(bill.contract.householderID)"
                :title="$t('detail')"
                target="_blank"
              >
                <LinkOutlined />
              </NuxtLink>
            </template>
          </a-input>
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="payment_period">
          <label for="payment_period" class="flex mb-1">
            <span>{{ $t('payment_period') }}</span>
          </label>
          <a-date-picker
            id="payment_period"
            class="w-full"
            disabled
            readonly
            :value="$dayjs(bill.period)"
            :placeholder="$t('payment_period')"
            picker="month"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="status">
          <label for="status" class="flex mb-1">
            <span>{{ $t('status') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <!-- <a-input id="status" disabled readonly :value="$t(getBillStatusStr())" :placeholder="$t('status')" /> -->
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="paid_by" class="flex mb-1">
          <span>{{ $t('paid_by') }}</span>
        </label>
        <a-input
          id="paid_by"
          disabled
          readonly
          :value="bill.payerID ? `${bill.payer.no} - ${getUserName(bill.payer)}` : '-'"
          :title="bill.payerID ? `${bill.payer.no} - ${getUserName(bill.payer)}` : '-'"
          :placeholder="$t('paid_by')"
        >
          <template v-if="bill.payerID" #suffix>
            <NuxtLink :to="pageRoutes.common.customer.detail(bill.payerID)" :title="$t('detail')" target="_blank">
              <LinkOutlined />
            </NuxtLink>
          </template>
        </a-input>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="payment_time">
          <label for="payment_time" class="flex mb-1">
            <span>{{ $t('payment_time') }}</span>
          </label>
          <a-date-picker
            id="payment_time"
            class="w-full"
            show-time
            disabled
            readonly
            :value="bill.paymentTime.Time && bill.paymentTime.Valid ? $dayjs(bill.paymentTime.Time) : '-'"
            :placeholder="$t('payment_time')"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
    </a-row>
    <div class="mt-10 flex items-center justify-between">
      <h1 class="text-2xl">{{ $t('payment_list') }}</h1>
      <div class="flex items-center">
        <a-button
          class="flex items-center justify-center w-8 h-8 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
          @click="() => {}"
        >
          <UndoOutlined />
        </a-button>
        <a-button
          type="primary"
          :disabled="false"
          danger
          class="flex items-center justify-center w-8 h-8 rounded-sm mx-2"
          @click="
            () => {
              $event.emit('deleteItem', {
                callback: () => {},
                noPasswordRequired: true,
              });
            }
          "
          ><DeleteOutlined
        /></a-button>
        <a-button type="primary" class="flex items-center justify-center w-8 h-8 rounded-sm" @click="() => {}"
          ><PlusOutlined
        /></a-button>
      </div>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { Bill } from '~/types/bill';
import type { FormInstance } from 'ant-design-vue';
import api from '~/plugins/api';
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';

// ---------------------- Variables ----------------------
const props = defineProps({
  bill: {
    type: Object as PropType<Bill>,
    required: true,
  },
});
const bill = toRef(props, 'bill');
const editForm = ref<FormInstance>();
const { $event } = useNuxtApp();
const { t } = useI18n();

// ---------------------- Functions ----------------------
async function updateBill() {
  try {
    $event.emit('loading');

    const formData = new FormData();

    $event.emit('updateContractSuccess');
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

async function validateForm() {
  try {
    if (!editForm.value) {
      return;
    }
    await editForm.value.validateFields();
    updateBill();
  } catch (error) {
    /* empty */
  }
}

// ---------------------- Events ----------------------
$event.on('updateBillingInfo', validateForm);
$event.on('cancelBillingEditMode', () => {});
</script>
