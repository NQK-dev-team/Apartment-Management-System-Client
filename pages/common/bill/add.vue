<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <NuxtLink :to="pageRoutes.common.bill.list">{{ $t('bill_list') }}</NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t('add_bill') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="text-2xl mt-3">{{ $t('add_bill') }}</h1>
    </div>
    <div
      id="page_content"
      class="flex-1 flex flex-col px-4 mt-5"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <a-form v-show="!addSuccess" ref="addForm" :model="bill" @finish="addBill">
        <h2 class="mt-5 text-xl font-bold">{{ $t('bill_info') }}</h2>
        <div class="mt-3 flex items-center">
          <p>{{ $t('search_contract_by') }}:</p>
          <div class="flex items-center ms-3">
            <a-radio-group v-model:value="searchByRoom">
              <a-radio :value="true">{{ $t('room') }}</a-radio>
              <a-radio :value="false">{{ $t('contract_id') }}</a-radio>
            </a-radio-group>
          </div>
        </div>
        <a-row :gutter="16">
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              v-if="searchByRoom"
              :name="['buildingID']"
              :rules="[{ required: true, message: $t('please_select_building'), trigger: 'blur' }]"
            >
              <label for="building_name" class="flex mb-1">
                <span>{{ $t('building') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-select
                id="building_name"
                v-model:value="bill.buildingID"
                :placeholder="$t('select_building')"
                class="w-full text-left"
              >
                <a-select-option v-for="(building, index) in buildingList" :key="index" :value="building.ID">{{
                  building.name
                }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else :name="['buildingID']">
              <label for="building_name" class="flex mb-1">
                <span>{{ $t('building') }}</span>
              </label>
              <a-select
                id="building_name"
                v-model:value="bill.buildingID"
                disabled
                readonly
                placeholder="-"
                class="w-full text-left"
              >
                <a-select-option v-for="(building, index) in buildingList" :key="index" :value="building.ID">{{
                  building.name
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              v-if="searchByRoom"
              :name="['floor']"
              :rules="[{ required: true, message: $t('please_select_floor'), trigger: 'blur' }]"
            >
              <label for="room_floor" class="flex mb-1">
                <span>{{ $t('floor') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-select
                id="room_floor"
                v-model:value="bill.floor"
                :disabled="!floorList.length"
                :placeholder="floorList.length ? $t('select_floor') : '-'"
                class="w-full text-left"
              >
                <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{ $t('select_floor') }}</a-select-option>
                <a-select-option v-for="(floor, index) in floorList" :key="index" :value="floor">{{
                  floor
                }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else :name="['floor']">
              <label for="room_floor" class="flex mb-1">
                <span>{{ $t('floor') }}</span>
              </label>
              <a-select
                id="room_floor"
                v-model:value="bill.floor"
                disabled
                readonly
                :placeholder="floorList.length ? $t('select_floor') : '-'"
                class="w-full text-left"
              >
                <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{ $t('select_floor') }}</a-select-option>
                <a-select-option v-for="(floor, index) in floorList" :key="index" :value="floor">{{
                  floor
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              v-if="searchByRoom"
              :name="['roomID']"
              :rules="[{ required: true, message: $t('please_select_room'), trigger: 'blur' }]"
            >
              <label for="room_no" class="flex mb-1">
                <span>{{ $t('room_no') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-select
                id="room_no"
                v-model:value="bill.roomID"
                :disabled="!roomList.length"
                :placeholder="roomList.length ? $t('select_room') : '-'"
                class="w-full text-left"
              >
                <a-select-option v-for="(room, index) in roomList" :key="index" :value="room.ID">{{
                  room.no
                }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else :name="['roomID']">
              <label for="room_no" class="flex mb-1">
                <span>{{ $t('room_no') }}</span>
              </label>
              <a-select
                id="room_no"
                v-model:value="bill.roomID"
                disabled
                readonly
                :placeholder="roomList.length ? $t('select_room') : '-'"
                class="w-full text-left"
              >
                <a-select-option v-for="(room, index) in roomList" :key="index" :value="room.ID">{{
                  room.no
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              v-if="searchByRoom"
              :name="['contractID']"
              :rules="[{ required: true, message: $t('contract_id_required'), trigger: 'blur' }]"
            >
              <label for="contract_id" class="flex mb-1">
                <span>{{ $t('contract_id') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-input
                id="contract_id"
                disabled
                readonly
                :value="bill.contractID"
                :placeholder="$t('select_contract_id')"
                :title="
                  bill.contractID && contractList.find((c) => c.ID === bill.contractID)
                    ? contractList.find((c) => c.ID === bill.contractID)?.ID
                    : '-'
                "
              />
            </a-form-item>
            <a-form-item
              v-else
              :name="['contractID']"
              :rules="[{ required: true, message: $t('contract_id_required'), trigger: 'blur' }]"
            >
              <label for="contract_id" class="flex mb-1">
                <span>{{ $t('contract_id') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-select
                id="contract_id"
                ref="contractDropDownRef"
                v-model:value="bill.contractID"
                show-search
                allow-clear
                :placeholder="$t('select_contract_id')"
                :filter-option="filterOption"
                class="w-full text-left"
                :title="
                  bill.contractID && contractList.find((c) => c.ID === bill.contractID)
                    ? contractList.find((c) => c.ID === bill.contractID)?.ID
                    : '-'
                "
                @focus="isContractDropDownFocused = true"
                @blur="isContractDropDownFocused = false"
                @change="
                  () => {
                    useTimeout(100, {
                      callback: () => {
                        if (contractDropDownRef) {
                          contractDropDownRef.blur();
                        }
                      },
                    });
                  }
                "
              >
                <a-select-option
                  v-for="(contract, index) in contractList"
                  :key="index"
                  :value="contract.ID"
                  :label="`${contract.ID} - ${getUserName(contract.householder)}`"
                  ><span>{{ contract.ID }}</span
                  ><span v-if="isContractDropDownFocused">
                    - {{ getUserName(contract.householder) }}</span
                  ></a-select-option
                >
              </a-select>
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
                :value="
                  bill.contractID && contractList.find((c) => c.ID === bill.contractID)
                    ? contractList.find((c) => c.ID === bill.contractID)?.householder.no +
                      ' - ' +
                      getUserName(contractList.find((c) => c.ID === bill.contractID)?.householder)
                    : '-'
                "
                :title="
                  bill.contractID && contractList.find((c) => c.ID === bill.contractID)
                    ? contractList.find((c) => c.ID === bill.contractID)?.householder.no +
                      ' - ' +
                      getUserName(contractList.find((c) => c.ID === bill.contractID)?.householder)
                    : '-'
                "
                :placeholder="$t('house_holder')"
              >
                <template v-if="bill.contractID && contractList.find((c) => c.ID === bill.contractID)" #suffix>
                  <NuxtLink
                    :to="
                      pageRoutes.common.customer.detail(
                        contractList.find((c) => c.ID === bill.contractID)?.householderID as number
                      )
                    "
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
            <a-form-item
              :name="['title']"
              :rules="[
                { required: true, message: $t('bill_name_require'), trigger: 'blur' },
                {
                  max: 255,
                  message: $t('bill_name_max_length', { length: 255 }),
                  trigger: 'blur',
                },
              ]"
            >
              <label for="bill_name" class="flex mb-1">
                <span>{{ $t('bill_name') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-input id="bill_name" v-model:value="bill.title" :placeholder="$t('enter_bill_name')" />
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['period']"
              :rules="[{ required: true, message: $t('payment_period_required'), trigger: 'blur' }]"
            >
              <label for="payment_period" class="flex mb-1">
                <span>{{ $t('payment_period') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-date-picker
                id="payment_period"
                v-model:value="bill.period"
                class="w-full"
                :placeholder="$t('select_payment_period')"
                picker="month"
              />
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <ClientOnly>
              <a-form-item name="status">
                <label for="bill_status" class="flex mb-1">
                  <span>{{ $t('status') }}</span>
                  <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                </label>
                <a-select
                  id="bill_status"
                  v-model:value="bill.status"
                  :placeholder="$t('select_status')"
                  class="w-full text-left"
                >
                  <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{
                    $t('select_status')
                  }}</a-select-option>
                  <a-select-option
                    :value="COMMON.BILL_STATUS.UN_PAID"
                    :class="[`text-[#50c433]`, { hidden: !showUnpaid }]"
                    >{{ $t('unpaid') }}</a-select-option
                  >
                  <a-select-option
                    :value="COMMON.BILL_STATUS.PAID"
                    :class="[`text-[#888888]`, { hidden: !showPaid }]"
                    >{{ $t('paid') }}</a-select-option
                  >
                  <a-select-option
                    :value="COMMON.BILL_STATUS.CANCELLED"
                    :class="[`text-[#ff0000]`, { hidden: !showCancelled }]"
                    >{{ $t('cancelled') }}</a-select-option
                  >
                  <a-select-option
                    :value="COMMON.BILL_STATUS.OVERDUE"
                    :class="[`text-[#888888]`, { hidden: !showOverdue }]"
                    >{{ $t('overdue') }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </ClientOnly>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <label for="paid_by" class="flex mb-1">
              <span>{{ $t('paid_by') }}</span>
            </label>
            <a-select
              id="paid_by"
              v-model:value="bill.payerID"
              class="w-full text-left"
              :class="[bill.payerID ? '' : 'text-[#9ca3af]']"
              show-search
              :options="[
                ...(Array.isArray(residentAccountList) ? residentAccountList : []).map((customer) => ({
                  value: customer.ID,
                  label: `${customer.no} - ${getUserName(customer)}`,
                })),
              ]"
              :allow-clear="true"
              :placeholder="$t('search_by_customer_no')"
              :filter-option="filterOption"
            ></a-select>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item v-if="!bill.payerID" name="payment_time">
              <label for="payment_time" class="flex mb-1">
                <span>{{ $t('payment_time') }}</span>
              </label>
              <a-date-picker
                id="payment_time"
                v-model:value="bill.paymentTime"
                disabled
                readonly
                class="w-full"
                :placeholder="$t('select_payment_time')"
              />
            </a-form-item>
            <a-form-item
              v-else
              :name="['paymentTime']"
              :rules="[{ required: true, message: $t('payment_time_required'), trigger: 'blur' }]"
            >
              <label for="payment_time" class="flex mb-1">
                <span>{{ $t('payment_time') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-date-picker
                id="payment_time"
                v-model:value="bill.paymentTime"
                class="w-full"
                :disabled-date="disabledDate"
                :placeholder="$t('select_payment_time')"
              />
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['note']"
              :rules="[
                {
                  max: 255,
                  message: $t('note_max_length', { length: 255 }),
                  trigger: 'blur',
                },
              ]"
            >
              <label for="bill_note" class="flex mb-1">
                <span>{{ $t('note') }}</span>
              </label>
              <a-textarea id="bill_note" v-model:value="bill.note" :placeholder="$t('enter_note')" />
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
        </a-row>
        <div class="mt-10 flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('payment_list') }}</h2>
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
      <ClientOnly>
        <div v-show="addSuccess" class="h-full w-full flex-col items-center justify-center" style="display: flex">
          <div class="flex items-center justify-center mt-5">
            <Success class="text-green-600 text-4xl" />
          </div>
          <h2 class="text-xl my-2">{{ $t('finish') }}</h2>
          <p class="text-center my-2">{{ $t('add_bill_success_title') }}</p>
          <p class="text-center my-2">{{ $t('add_bill_success_note') }}</p>
          <div class="my-2 flex flex-col items-center">
            <NuxtLink :to="pageRoutes.common.bill.detail(newBillID)">
              <a-button type="primary" class="rounded-sm mb-2">{{ $t('new_bill_detail') }}</a-button>
            </NuxtLink>
            <NuxtLink :to="pageRoutes.common.bill.list" class="w-full">
              <a-button class="rounded-sm w-full">{{ $t('back') }}</a-button>
            </NuxtLink>
          </div>
        </div>
      </ClientOnly>
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
import type { AddBill1, AddBill2, BillPayment } from '~/types/bill';
import type { User } from '~/types/user';
import type { Dayjs } from 'dayjs';
import Success from '~/public/svg/success.svg';

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
const { $event, $dayjs } = useNuxtApp();
const addForm = ref<FormInstance>();
const bill = ref<AddBill1>({
  buildingID: undefined,
  floor: undefined,
  roomID: undefined,
  contractID: undefined,
  period: '',
  status: undefined,
  note: '',
  paymentTime: '',
  payerID: undefined,
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
const residentAccountList = asyncComputed<User[]>(async () => {
  let result: User[] = [];

  if (!bill.value.contractID) {
    return result;
  }

  try {
    const response = await api.common.contract.getDetail(bill.value.contractID);
    result.push(response.data.householder);

    response.data.residents.forEach((resident) => {
      if (resident.userAccountID.Valid) {
        result.push(resident.userAccount!);
      }
    });
  } catch (err: any) {
    result = [];
  }

  return result;
});
const searchByRoom = ref<boolean>(true);
const showPaid = ref<boolean>(true);
const showUnpaid = ref<boolean>(true);
const showCancelled = ref<boolean>(true);
const showOverdue = ref<boolean>(true);
const isContractDropDownFocused = ref<boolean>(false);
const contractDropDownRef = ref<HTMLElement | undefined>(undefined);
const newBillID = ref(0);

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

async function addBill() {
  if (bill.value.billPayments.length === 0) {
    notification.error({
      message: t('error'),
      description: t('bill_payment_list_empty'),
    });
    return;
  }

  try {
    $event.emit('loading');

    const data: AddBill2 = {
      contractID: bill.value.contractID || 0,
      title: bill.value.title.trim(),
      period: convertToMonthYear($dayjs(bill.value.period).startOf('month').toDate().toISOString()),
      status: bill.value.status || 0,
      note: bill.value.note.trim(),
      paymentTime: bill.value.paymentTime ? convertToDate($dayjs(bill.value.paymentTime).toDate().toISOString()) : '',
      payerID: bill.value.payerID || 0,
      billPayments: bill.value.billPayments.map((payment) => ({
        name: payment.name.trim(),
        amount: Number(payment.amount.toString().trim()),
        note: payment.note.String ? payment.note.String.trim() : '',
      })),
    };

    const response = await api.common.bill.addBill(data);
    newBillID.value = response.data;

    addSuccess.value = true;
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

function filterOption(input: string, option: any) {
  return removeDiacritics(option.label.toLowerCase()).includes(removeDiacritics(input.toLowerCase()));
}

function disabledDate(current: Dayjs) {
  if (!bill.value.period) {
    return true; // If no period is set, disable all dates
  }

  // Can not select days after today or before the first day of billing period
  const firstDayOfPeriod = $dayjs(bill.value.period).startOf('month');
  return current && (current >= $dayjs().endOf('day') || current < firstDayOfPeriod);
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
watch(
  () => bill.value.buildingID,
  () => {
    if (!searchByRoom.value) {
      return;
    }
    bill.value.floor = undefined;
    bill.value.roomID = undefined;
  }
);
watch(
  () => bill.value.floor,
  () => {
    if (!searchByRoom.value) {
      return;
    }
    bill.value.roomID = undefined;
  }
);
watch(
  () => [bill.value.buildingID, bill.value.floor, bill.value.roomID],
  () => {
    if (bill.value.buildingID && bill.value.floor && bill.value.roomID && searchByRoom.value) {
      const result = contractList.value.find(
        (c) => c.buildingID === bill.value.buildingID && c.roomID === bill.value.roomID
      );

      if (result) {
        bill.value.contractID = result.ID;
      } else {
        bill.value.contractID = undefined;
      }
    }
  }
);
watch(
  () => bill.value.contractID,
  () => {
    bill.value.payerID = undefined;

    if (!searchByRoom.value) {
      const result = contractList.value.find((c) => c.ID === bill.value.contractID);

      if (!result) {
        bill.value.buildingID = undefined;
        bill.value.floor = undefined;
        bill.value.roomID = undefined;
        return;
      }

      bill.value.roomID = result.roomID;
      bill.value.buildingID = result.buildingID;
      bill.value.floor = result.roomFloor;
    }
  }
);
watch(
  () => [bill.value.payerID, bill.value.period],
  () => {
    const now: Dayjs = $dayjs();
    const currentMonth = now.month();
    const currentYear = now.year();

    if (!bill.value.period) {
      bill.value.paymentTime = '';
    }

    if (bill.value.period) {
      const periodMonth = $dayjs(bill.value.period).month();
      const periodYear = $dayjs(bill.value.period).year();

      if (bill.value.paymentTime) {
        const paymentTimeMonth = $dayjs(bill.value.paymentTime).month();
        const paymentTimeYear = $dayjs(bill.value.paymentTime).year();
        if (paymentTimeYear < periodYear || (paymentTimeYear === periodYear && paymentTimeMonth < periodMonth)) {
          bill.value.paymentTime = '';
        }
      }
    }

    if (bill.value.payerID) {
      bill.value.status = COMMON.BILL_STATUS.PAID;
      showUnpaid.value = false;
      showPaid.value = true;
      showOverdue.value = false;
      return;
    }

    if (bill.value.period) {
      const periodMonth = $dayjs(bill.value.period).month();
      const periodYear = $dayjs(bill.value.period).year();

      if (periodYear < currentYear || (periodYear === currentYear && periodMonth < currentMonth)) {
        bill.value.status = COMMON.BILL_STATUS.OVERDUE;
        showUnpaid.value = false;
        showPaid.value = false;
        showOverdue.value = true;
      } else {
        bill.value.status = COMMON.BILL_STATUS.UN_PAID;
        showUnpaid.value = true;
        showPaid.value = false;
        showOverdue.value = false;
      }
    } else {
      bill.value.status = undefined;
      showUnpaid.value = true;
      showPaid.value = true;
      showOverdue.value = true;
    }
  }
);
</script>
