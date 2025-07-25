<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <NuxtLink :to="pageRoutes.common.bill.list">{{ $t('bill_list') }}</NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t('add_bill') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('add_bill') }}</h1>
    </div>
    <div
      id="page_content"
      class="flex-1 flex flex-col px-4 mt-5"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <a-form ref="addForm" :model="bill">
        <h1 class="mt-5 text-2xl">{{ $t('bill_info') }}</h1>
        <!-- <a-row :gutter="16">
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
          </a-col>
        </a-row> -->
        <a-row :gutter="16">
          <!-- <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
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
          </a-col> -->
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['title']"
              :rules="[{ required: true, message: $t('bill_name_require'), trigger: 'blur' }]"
            >
              <label for="bill_name" class="flex mb-1">
                <span>{{ $t('bill_name') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-input id="bill_name" v-model:value="bill.title" :placeholder="$t('enter_bill_name')" />
            </a-form-item>
          </a-col>
          <!-- <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
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
            <a-form-item name="status">
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
                  placeholder="{{ $t('select_status') }}"
                  class="w-full text-left"
                >
                  <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{
                    $t('select_status')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.BILL_STATUS.UN_PAID" :class="`text-[#50c433] hidden`">{{
                    $t('unpaid')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.BILL_STATUS.PAID" :class="`text-[#888888] hidden`">{{
                    $t('paid')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.BILL_STATUS.CANCELLED" :class="`text-[#ff0000]`">{{
                    $t('cancelled')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.BILL_STATUS.OVERDUE" :class="`text-[#888888] hidden`">{{
                    $t('overdue')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.BILL_STATUS.PROCESSING" :class="`text-[#888888] hidden`">{{
                    $t('processing')
                  }}</a-select-option>
                </a-select>
              </ClientOnly>
            </a-form-item>
          </a-col> -->
        </a-row>
        <a-row :gutter="16">
          <!-- <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
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
                :value="
                  bill.value.paymentTime.Time && bill.value.paymentTime.Valid ? $dayjs(bill.value.paymentTime.Time) : ''
                "
                placeholder="-"
              />
            </a-form-item>
          </a-col> -->
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item name="bill_note">
              <label for="bill_note" class="flex mb-1">
                <span>{{ $t('note') }}</span>
              </label>
              <a-textarea id="bill_note" v-model:value="bill.note" :placeholder="$t('enter_note')" />
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
        </a-row>
        <div class="mt-10 flex items-center justify-between">
          <h1 class="text-2xl">{{ $t('payment_list') }}</h1>
          <div class="flex items-center">
            <a-button
              type="primary"
              :disabled="deleteBucket.value.length === 0"
              danger
              class="flex items-center justify-center w-8 h-8 rounded-sm me-2"
              @click="
                () => {
                  $event.emit('deleteItem', {
                    callback: () => {
                      const deletedIDs = [] as number[];
                      bill.billPayments.forEach((payment) => {
                        if (deleteBucket.value.includes(payment.ID)) {
                          if (payment.ID < 0) {
                            deletedIDs.push(payment.ID);
                          } else {
                            payment.isDeleted = true;
                          }
                        }
                      });
                      bill.billPayments = bill.billPayments.filter((payment) => !deletedIDs.includes(payment.ID));
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
                  bill.billPayments.push({
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
        <CommonBillAddPaymentListTable :payments="bill.billPayments" :delete-bucket="deleteBucket" />
        <div class="flex flex-col items-center my-5">
          <a-button class="w-[100px] rounded-sm" type="primary" html-type="submit">{{ $t('confirm') }}</a-button>
          <a-button html-type="button" class="my-2 w-[100px] rounded-sm">
            <NuxtLink :to="pageRoutes.common.bill.list">{{ $t('back') }}</NuxtLink>
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { svgPaths } from '~/consts/svg_paths';
import type { FormInstance } from 'ant-design-vue';
import type { Building, Room } from '~/types/building';
import { COMMON } from '~/consts/common';
import type { Contract } from '~/types/contract';
import type { AddBill1, BillPayment } from '~/types/bill';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Add New Billing',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Add New Billing',
  meta: [
    {
      name: 'description',
      content: 'Add new billing to the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const addSuccess = ref<boolean>(false);
const { $event } = useNuxtApp();
const addForm = ref<FormInstance>();
const bill = ref<AddBill1>({
  buildingID: 0,
  floor: 0,
  roomID: 0,
  contractID: 0,
  period: '',
  status: undefined,
  note: '',
  paymentTime: '',
  amount: 0,
  payerID: null,
  title: '',
  billPayments: [],
});
const addCounter = ref(0);
const buildingList = ref<Building[]>([]);
const contractList = ref<Contract[]>([]);
const deleteBucket = ref<{ value: number[] }>({ value: [] });
const offset = ref(0);
const limit = ref(500);
const floorList = computed<number[]>(() => {
  const result: number[] = [];

  if (!bill.value.buildingID) {
    return result;
  }

  const building = buildingList.value.find((b) => b.ID === bill.value.buildingID);
  if (!building) {
    return result;
  }
  result.push(...Array.from({ length: building.totalFloor }, (_, i) => i + 1));

  return result;
});
const roomList = computed<Room[]>(() => {
  const result: Room[] = [];

  if (!bill.value.buildingID || !bill.value.floor) {
    return result;
  }

  const building = buildingList.value.find((b) => b.ID === bill.value.buildingID);
  if (!building) {
    return result;
  }

  if (!building.rooms || !building.rooms.length) {
    return result;
  }

  for (const room of building.rooms) {
    if (room.floor === bill.value.floor) {
      result.push(room);
    }
  }

  return result;
});

// ---------------------- Functions ----------------------
async function getActiveContractList() {
  try {
    const response = await api.common.contract.getActiveList(limit.value, offset.value);

    if (offset.value === 0) {
      contractList.value = response.data;
    } else {
      contractList.value.push(...response.data);
    }

    if (response.data.length >= limit.value) {
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
  }
}

async function getBuildingList() {
  try {
    const response = await api.common.building.getList();
    buildingList.value = response.data;
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

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  $event.emit('loading');
  await getActiveContractList();
  await getBuildingList();
  $event.emit('loading');
});

// ---------------------- Watchers ----------------------
watch(offset, () => {
  getActiveContractList();
});
</script>
