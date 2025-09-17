<template>
  <a-form>
    <h2 class="mt-5 text-xl font-bold">{{ $t('bill_info') }}</h2>
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
        <a-form-item name="contract_id">
          <label for="contract_id" class="flex mb-1">
            <span>{{ $t('contract_id') }}</span>
          </label>
          <a-input id="contract_id" disabled readonly :value="bill.contractID" :placeholder="$t('contract_id')">
            <template #suffix>
              <NuxtLink
                id="contractDetailLink"
                name="contractDetailLink"
                :to="pageRoutes.common.contract.detail(bill.contractID)"
                :title="$t('detail')"
                target="_blank"
                ><LinkOutlined
              /></NuxtLink>
            </template>
          </a-input>
        </a-form-item>
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
            <template v-if="userRole?.toString() === roles.owner || userRole?.toString() === roles.manager" #suffix>
              <NuxtLink
                id="contractHouseholderDetailLink"
                name="contractHouseholderDetailLink"
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
        <a-form-item name="bill_name">
          <label for="bill_name" class="flex mb-1">
            <span>{{ $t('bill_name') }}</span>
          </label>
          <a-input id="bill_name" disabled readonly :value="bill.title" :placeholder="$t('bill_name')" />
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
          </label>
          <a-input id="status" disabled readonly :value="$t(getBillStatusStr())" :placeholder="$t('status')" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="paid_by">
          <label for="paid_by" class="flex mb-1">
            <span>{{ $t('paid_by') }}</span>
          </label>
          <a-input
            id="paid_by"
            disabled
            readonly
            :value="bill.payerID.Valid ? `${bill.payer.no} - ${getUserName(bill.payer)}` : '-'"
            :title="bill.payerID.Valid ? `${bill.payer.no} - ${getUserName(bill.payer)}` : '-'"
            placeholder="-"
          >
            <template
              v-if="
                bill.payerID.Valid && (userRole?.toString() === roles.owner || userRole?.toString() === roles.manager)
              "
              #suffix
            >
              <NuxtLink
                :to="pageRoutes.common.customer.detail(bill.payerID.Int64 as number)"
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
            :value="bill.paymentTime.Time && bill.paymentTime.Valid ? bill.paymentTime.Time : ''"
            placeholder="-"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="bill_note">
          <label for="bill_note" class="flex mb-1">
            <span>{{ $t('note') }}</span>
          </label>
          <a-textarea id="bill_note" disabled readonly :value="bill.note.String" :placeholder="$t('note')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
    </a-row>
    <h2 class="mt-10 text-xl font-bold">{{ $t('payment_list') }}</h2>
    <a-table
      :columns="paymentTableColumns"
      :data-source="paymentTableData"
      class="mt-3"
      :scroll="{ x: 'max-content' }"
      :pagination="false"
    >
      <template v-if="paymentTableData.length" #summary>
        <a-table-summary-row>
          <a-table-summary-cell class="font-bold text-lg">{{ $t('total_payment') }}</a-table-summary-cell>
          <a-table-summary-cell></a-table-summary-cell>
          <a-table-summary-cell>
            <a-typography-text id="totalPaymentCalculation" class="font-bold text-lg">{{
              formatPrice(bill.amount)
            }}</a-typography-text>
          </a-table-summary-cell>
        </a-table-summary-row>
      </template>
    </a-table>
  </a-form>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';
import type { Bill } from '~/types/bill';

// ---------------------- Variables ----------------------
const props = defineProps({
  bill: {
    type: Object as PropType<Bill>,
    required: true,
  },
});
const bill = toRef(props, 'bill');
const { t } = useI18n();
const paymentTableColumns = computed<any>(() => {
  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap',
    },
    {
      title: t('payment_name'),
      dataIndex: 'payment_name',
      key: 'payment_name',
      class: 'text-nowrap',
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      key: 'amount',
      class: 'text-nowrap',
      sorter: (a: any, b: any) => a.amount - b.amount,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: t('note'),
      dataIndex: 'note',
      key: 'note',
      class: 'text-nowrap',
    },
  ];
});
const paymentTableData = computed(() => {
  return bill.value.billPayments.map((payment, index) => ({
    key: index,
    no: index + 1,
    payment_name: payment.name,
    amount: formatPrice(payment.amount),
    note: payment.note.String,
  }));
});
const userRole = useCookie('userRole');

// ---------------------- Functions ----------------------
function getBillStatusStr(): string {
  if (bill.value.status === COMMON.BILL_STATUS.UN_PAID) {
    return 'un_paid';
  } else if (bill.value.status === COMMON.BILL_STATUS.PAID) {
    return 'paid';
  } else if (bill.value.status === COMMON.BILL_STATUS.OVERDUE) {
    return 'overdue';
  } else if (bill.value.status === COMMON.BILL_STATUS.PROCESSING) {
    return 'processing';
  } else if (bill.value.status === COMMON.BILL_STATUS.CANCELLED) {
    return 'cancelled';
  }

  return '-';
}
</script>
