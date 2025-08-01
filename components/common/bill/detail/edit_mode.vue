<template>
  <a-form
    v-if="
      (userRole?.toString() === roles.manager || userRole?.toString() === roles.owner) &&
      props.oldBill &&
      props.oldBill.status !== COMMON.BILL_STATUS.PAID &&
      props.oldBill.status !== COMMON.BILL_STATUS.PROCESSING
    "
    ref="editForm"
    :model="bill.value"
  >
    <h1 class="mt-5 text-2xl">{{ $t('bill_info') }}</h1>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="building_name">
          <label for="building_name" class="flex mb-1">
            <span>{{ $t('building') }}</span>
          </label>
          <a-input
            id="building_name"
            disabled
            readonly
            :value="bill.value.buildingName"
            :placeholder="$t('building_name')"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="room_floor">
          <label for="room_floor" class="flex mb-1">
            <span>{{ $t('floor') }}</span>
          </label>
          <a-input id="room_floor" disabled readonly :value="bill.value.roomFloor" :placeholder="$t('floor')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="room_no">
          <label for="room_no" class="flex mb-1">
            <span>{{ $t('room_no') }}</span>
          </label>
          <a-input id="room_no" disabled readonly :value="bill.value.roomNo" :placeholder="$t('room_no')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="contract_id">
          <label for="contract_id" class="flex mb-1">
            <span>{{ $t('contract_id') }}</span>
          </label>
          <a-input id="contract_id" disabled readonly :value="bill.value.contractID" :placeholder="$t('contract_id')">
            <template #suffix>
              <NuxtLink
                :to="pageRoutes.common.contract.detail(bill.value.contractID)"
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
            :value="`${bill.value.contract.householder.no} - ${getUserName(bill.value.contract.householder)}`"
            :title="`${bill.value.contract.householder.no} - ${getUserName(bill.value.contract.householder)}`"
            :placeholder="$t('house_holder')"
          >
            <template #suffix>
              <NuxtLink
                :to="pageRoutes.common.customer.detail(bill.value.contract.householderID)"
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
        <a-form-item :name="['title']" :rules="[{ required: true, message: $t('bill_name_require'), trigger: 'blur' }]">
          <label for="bill_name" class="flex mb-1 justify-between">
            <div class="flex items-center">
              <span>{{ $t('bill_name') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
            <a-button
              class="items-center justify-center rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
              size="small"
              style="display: flex"
              @click="
                () => {
                  bill.value.title = props.oldBill.title;
                  clearValidation();
                  useTimeout(0, {
                    callback: () => {
                      validateForm(false);
                    },
                  });
                }
              "
            >
              <UndoOutlined />
            </a-button>
          </label>
          <a-input id="bill_name" v-model:value="bill.value.title" :placeholder="$t('enter_bill_name')" />
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
            :value="$dayjs(bill.value.period)"
            :placeholder="$t('payment_period')"
            picker="month"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item
          :name="['status']"
          :rules="[{ required: true, message: $t('bill_status_require'), trigger: 'change' }]"
        >
          <label for="status" class="flex mb-1 justify-between">
            <div class="flex items-center">
              <span>{{ $t('status') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
            <a-button
              class="items-center justify-center rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
              size="small"
              style="display: flex"
              @click="
                () => {
                  bill.value.status = props.oldBill.status;
                  clearValidation();
                  useTimeout(0, {
                    callback: () => {
                      validateForm(false);
                    },
                  });
                }
              "
            >
              <UndoOutlined />
            </a-button>
          </label>
          <ClientOnly>
            <a-select
              id="status"
              v-model:value="bill.value.status"
              :placeholder="$t('select_status')"
              class="w-full text-left"
            >
              <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{ $t('select_status') }}</a-select-option>
              <a-select-option :value="COMMON.BILL_STATUS.UN_PAID" :class="`text-[#888888] hidden`">{{
                $t('unpaid')
              }}</a-select-option>
              <a-select-option :value="COMMON.BILL_STATUS.PAID" :class="`text-[#50c433]`">{{
                $t('paid')
              }}</a-select-option>
              <a-select-option :value="COMMON.BILL_STATUS.CANCELLED" :class="`text-[#ff0000]`">{{
                $t('cancelled')
              }}</a-select-option>
              <a-select-option :value="COMMON.BILL_STATUS.OVERDUE" :class="`text-[#ff0000] hidden`">{{
                $t('overdue')
              }}</a-select-option>
              <a-select-option :value="COMMON.BILL_STATUS.PROCESSING" :class="`text-[#d8d535] hidden`">{{
                $t('processing')
              }}</a-select-option>
            </a-select>
          </ClientOnly>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item v-if="bill.value.status !== COMMON.BILL_STATUS.PAID" name="paid_by">
          <label for="paid_by" class="flex mb-1">
            <span>{{ $t('paid_by') }}</span>
          </label>
          <a-input
            id="paid_by"
            disabled
            readonly
            :value="bill.value.payerID.Valid ? `${bill.value.payer.no} - ${getUserName(bill.value.payer)}` : '-'"
            :title="bill.value.payerID.Valid ? `${bill.value.payer.no} - ${getUserName(bill.value.payer)}` : '-'"
            placeholder="-"
          >
            <template v-if="bill.value.payerID.Valid" #suffix>
              <NuxtLink
                :to="pageRoutes.common.customer.detail(bill.value.payerID.Int64 as number)"
                :title="$t('detail')"
                target="_blank"
              >
                <LinkOutlined />
              </NuxtLink>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          v-else
          :name="['payerID', 'Int64']"
          :rules="[{ required: true, message: $t('paid_by_required'), trigger: 'change' }]"
        >
          <label for="paid_by" class="flex mb-1">
            <span>{{ $t('paid_by') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-select
            id="paid_by"
            v-model:value="bill.value.payerID.Int64 as number"
            class="w-full text-left"
            show-search
            :placeholder="$t('select_customer')"
            :filter-option="filterOption"
          >
            <a-select-option
              v-for="(customer, index) in customerList"
              :key="index"
              :value="customer.ID"
              :label="`${customer.no} - ${getUserName(customer)}`"
            >
              {{ customer.no }} - {{ getUserName(customer) }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item v-if="bill.value.status !== COMMON.BILL_STATUS.PAID" name="payment_time">
          <label for="payment_time" class="flex mb-1">
            <span>{{ $t('payment_time') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-date-picker
            id="payment_time"
            class="w-full"
            disabled
            readonly
            :value="bill.value.paymentTime.Time && bill.value.paymentTime.Valid ? bill.value.paymentTime.Time : ''"
            placeholder="-"
          />
        </a-form-item>
        <a-form-item
          v-else
          :name="['paymentTime', 'Time']"
          :rules="[{ required: true, message: $t('payment_time_required'), trigger: 'change' }]"
        >
          <label for="payment_time" class="flex mb-1">
            <span>{{ $t('payment_time') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-date-picker
            id="payment_time"
            v-model:value="bill.value.paymentTime.Time as Dayjs | string"
            class="w-full"
            :placeholder="$t('enter_payment_time')"
            :disabled-date="disabledDate"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="bill_note">
          <label for="bill_note" class="flex mb-1 justify-between">
            <span>{{ $t('note') }}</span>
            <a-button
              class="items-center justify-center rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
              size="small"
              style="display: flex"
              @click="bill.value.note = JSON.parse(JSON.stringify(props.oldBill.note))"
            >
              <UndoOutlined />
            </a-button>
          </label>
          <a-textarea id="bill_note" v-model:value="bill.value.note.String as string" :placeholder="$t('enter_note')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
    </a-row>
    <div class="mt-10 flex items-center justify-between">
      <h1 class="text-2xl">{{ $t('payment_list') }}</h1>
      <div class="flex items-center">
        <a-button
          class="flex items-center justify-center w-8 h-8 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
          @click="
            () => {
              bill.value.billPayments = JSON.parse(JSON.stringify(props.oldBill.billPayments));
              clearValidation();
              useTimeout(0, {
                callback: () => {
                  validateForm(false);
                },
              });
            }
          "
        >
          <UndoOutlined />
        </a-button>
        <a-button
          type="primary"
          :disabled="deleteBucket.value.length === 0"
          danger
          class="flex items-center justify-center w-8 h-8 rounded-sm mx-2"
          @click="
            () => {
              $event.emit('deleteItem', {
                callback: () => {
                  const deletedIDs = [] as number[];
                  bill.value.billPayments.forEach((payment) => {
                    if (deleteBucket.value.includes(payment.ID)) {
                      if (payment.ID < 0) {
                        deletedIDs.push(payment.ID);
                      } else {
                        payment.isDeleted = true;
                      }
                    }
                  });
                  bill.value.billPayments = bill.value.billPayments.filter(
                    (payment) => !deletedIDs.includes(payment.ID)
                  );
                  deleteBucket.value = [];
                },
                noPasswordRequired: true,
              });
            }
          "
          ><DeleteOutlined
        /></a-button>
        <a-button
          type="primary"
          class="flex items-center justify-center w-8 h-8 rounded-sm"
          @click="
            () => {
              addCounter++;
              bill.value.billPayments.push({
                ID: -addCounter,
                name: '',
                amount: 0,
                note: {
                  Valid: false,
                  String: '',
                },
              } as BillPayment);
            }
          "
          ><PlusOutlined
        /></a-button>
      </div>
    </div>
    <CommonBillDetailEditModePaymentListTable :payments="bill.value.billPayments" :delete-bucket="deleteBucket" />
  </a-form>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { Bill, BillPayment, UpdateBill } from '~/types/bill';
import type { FormInstance } from 'ant-design-vue';
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import { api } from '~/services/api';
import { roles } from '~/consts/roles';
import type { User } from '~/types/user';
import type { Dayjs } from 'dayjs';

// ---------------------- Variables ----------------------
const props = defineProps({
  editBill: {
    type: Object as PropType<{ value: Bill }>,
    required: true,
  },
  oldBill: {
    type: Object as PropType<Bill>,
    required: true,
  },
});
const bill = toRef(props, 'editBill');
const editForm = ref<FormInstance>();
const { $event, $dayjs } = useNuxtApp();
const { t } = useI18n();
const deleteBucket = ref({ value: [] as number[] });
const addCounter = ref(0);
const userRole = useCookie('userRole');
const customerList = ref<User[]>([]);

// ---------------------- Functions ----------------------
async function updateBill() {
  try {
    $event.emit('loading');

    const data: UpdateBill = {
      title: bill.value.value.title,
      status: bill.value.value.status,
      note: bill.value.value.note.String || '',
      payments: bill.value.value.billPayments
        .filter((payment) => payment.ID > 0 && !payment.isDeleted)
        .map((payment) => ({
          ID: payment.ID,
          name: payment.name,
          amount: Number(payment.amount),
          note: payment.note.String || '',
        })),
      newPayments: bill.value.value.billPayments
        .filter((payment) => payment.ID < 0 && !payment.isDeleted)
        .map((payment) => ({
          name: payment.name,
          amount: Number(payment.amount),
          note: payment.note.String || '',
        })),
      deletedPayments: bill.value.value.billPayments
        .filter((payment) => payment.ID > 0 && payment.isDeleted)
        .map((payment) => payment.ID),
      payerID:
        props.oldBill.status !== COMMON.BILL_STATUS.PAID &&
        bill.value.value.status === COMMON.BILL_STATUS.PAID &&
        bill.value.value.payerID.Int64
          ? bill.value.value.payerID.Int64
          : 0,
      paymentTime:
        props.oldBill.status !== COMMON.BILL_STATUS.PAID &&
        bill.value.value.status === COMMON.BILL_STATUS.PAID &&
        bill.value.value.paymentTime.Time
          ? convertToDate($dayjs(bill.value.value.paymentTime.Time).toString())
          : '',
    };

    await api.common.bill.updateBill(bill.value.value.ID, data);

    $event.emit('updateBillingSuccess');
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

async function validateForm(callUpdateBill = true) {
  try {
    if (!editForm.value) {
      return;
    }
    await editForm.value.validateFields();

    const oldPayments = bill.value.value.billPayments.filter((payment) => payment.ID > 0 && !payment.isDeleted);
    const deletedPaymenst = bill.value.value.billPayments.filter((payment) => payment.ID > 0 && payment.isDeleted);
    const newPayments = bill.value.value.billPayments.filter((payment) => payment.ID < 0 && !payment.isDeleted);

    if (oldPayments.length + newPayments.length - deletedPaymenst.length === 0) {
      notification.error({
        message: t('error'),
        description: t('bill_payment_list_empty'),
      });
      return;
    }

    if (callUpdateBill) {
      $event.emit('updateItem', {
        callback: updateBill,
        updateModalContent: 'confirm_update_bill',
      });
    }
  } catch (error) {
    /* empty */
  }
}

function clearValidation() {
  if (editForm.value) {
    editForm.value.clearValidate();
  }
}

async function getCustomerList() {
  try {
    const response = await api.common.contract.getDetail(bill.value.value.contractID);
    customerList.value = [];

    customerList.value.push(response.data.householder);

    response.data.residents.forEach((resident) => {
      if (resident.userAccountID.Valid && resident.userAccount) {
        customerList.value.push(resident.userAccount);
      }
    });
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

function filterOption(input: string, option: any) {
  return removeDiacritics(option.label.toLowerCase()).includes(removeDiacritics(input.toLowerCase()));
}

function disabledDate(current: Dayjs) {
  // Can not select days after today or before the first day of billing period
  const firstDayOfPeriod = $dayjs(bill.value.value.period).startOf('month');
  return current && (current >= $dayjs().endOf('day') || current < firstDayOfPeriod);
}

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  $event.emit('loading');
  await getCustomerList();
  $event.emit('loading');
});

// ---------------------- Events ----------------------
$event.on('updateBillingInfo', () => {
  validateForm();
});
$event.on('cancelBillingEditMode', clearValidation);
</script>
