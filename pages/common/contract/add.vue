<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.contract.list">{{ $t('contract_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('add_contract') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('add_contract') }}</h1>
    </div>
    <div
      id="page_content"
      class="flex-1 flex flex-col px-4 mt-5"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <a-form v-show="!addSuccess" :model="newContract" @finish="addContract">
        <h2 class="mt-5 text-xl font-bold">{{ $t('contract_information') }}</h2>
        <a-row :gutter="16">
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['buildingID']"
              :rules="[{ required: true, message: $t('please_select_building'), trigger: 'blur' }]"
            >
              <label for="building_name" class="flex mb-1">
                <span>{{ $t('building') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-select
                id="building_name"
                v-model:value="newContract.buildingID"
                :placeholder="$t('select_building')"
                class="w-full text-left"
              >
                <a-select-option v-for="(building, index) in buildingList" :key="index" :value="building.ID">{{
                  building.name
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item name="building_address">
              <label for="building_address" class="flex mb-1">
                <span>{{ $t('building_address') }}</span>
              </label>
              <a-input
                id="building_address"
                disabled
                readonly
                :value="buildingList.find((b) => b.ID === newContract.buildingID)?.address || ''"
                :placeholder="$t('building_address')"
              />
            </a-form-item>
          </a-col> -->
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['roomFloor']"
              :rules="[{ required: true, message: $t('please_select_floor'), trigger: 'blur' }]"
            >
              <label for="room_floor" class="flex mb-1">
                <span>{{ $t('floor') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-select
                id="room_floor"
                v-model:value="newContract.roomFloor"
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
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['roomID']"
              :rules="[{ required: true, message: $t('please_select_room'), trigger: 'blur' }]"
            >
              <label for="room_no" class="flex mb-1">
                <span>{{ $t('room_no') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-select
                id="room_no"
                v-model:value="newContract.roomID"
                :disabled="!roomList.length"
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
              :name="['householderID']"
              :rules="[{ required: true, message: $t('please_select_customer'), trigger: 'blur' }]"
            >
              <label for="customer_no" class="flex mb-1">
                <span>{{ $t('customer_no') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-select
                id="customer_no"
                v-model:value="newContract.householderID"
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
        </a-row>
        <a-row :gutter="16">
          <!-- <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['householderID']"
              :rules="[{ required: true, message: $t('please_select_customer'), trigger: 'blur' }]"
            >
              <label for="customer_no" class="flex mb-1">
                <span>{{ $t('customer_no') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-select
                id="customer_no"
                v-model:value="newContract.householderID"
                class="w-full text-left"
                show-search
                :placeholder="$t('select_customer')"
              >
                <a-select-option v-for="(customer, index) in customerList" :key="index" :value="customer.ID">
                  {{ customer.no }} - {{ getUserName(customer) }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item name="employee_number">
              <label for="employee_number" class="flex mb-1">
                <span>{{ $t('employee_number') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-input
                id="employee_number"
                disabled
                readonly
                :value="creatorInfo"
                :placeholder="$t('employee_number')"
              />
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['type']"
              :rules="[{ required: true, message: $t('please_select_contract_type'), trigger: 'blur' }]"
            >
              <label for="contract_type" class="flex mb-1">
                <span>{{ $t('contract_type') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-select
                id="contract_type"
                v-model:value="newContract.type"
                class="w-full text-left"
                :placeholder="$t('select_contract_type')"
              >
                <a-select-option :value="COMMON.CONTRACT_TYPE.RENT">
                  {{ $t('rent_contract') }}
                </a-select-option>
                <a-select-option :value="COMMON.CONTRACT_TYPE.BUY">
                  {{ $t('buy_contract') }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['value']"
              :rules="[
                { required: true, message: $t('contract_value_require'), trigger: 'blur' },
                {
                  validator: async (_: RuleObject, value: string) =>
                    validationRules.checkNonNegative(_, value, $t, 'contract_value_invalid'),
                  trigger: 'blur',
                },
              ]"
            >
              <label for="contract_value" class="flex mb-1">
                <span>{{ $t('contract_value') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-input
                id="contract_value"
                v-model:value="newContract.value"
                :placeholder="$t('contract_value')"
                type="number"
                :min="0"
              />
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['createdAt']"
              :rules="[{ required: true, message: $t('contract_create_date_require'), trigger: 'blur' }]"
            >
              <label for="created_date" class="flex mb-1">
                <span>{{ $t('created_date') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-date-picker id="created_date" v-model:value="newContract.createdAt" class="w-full" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <!-- <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['createdAt']"
              :rules="[{ required: true, message: $t('contract_create_date_require'), trigger: 'blur' }]"
            >
              <label for="created_date" class="flex mb-1">
                <span>{{ $t('created_date') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-date-picker id="created_date" v-model:value="newContract.createdAt" class="w-full" />
            </a-form-item>
          </a-col> -->
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['startDate']"
              :rules="[
                { required: true, message: $t('active_date_required'), trigger: 'blur' },
                {
                  validator: async (_: RuleObject, value: string) =>
                    validationRules.checkActiveDate(
                      _,
                      value,
                      $t,
                      newContract.createdAt ? newContract.createdAt.toString() : ''
                    ),
                  trigger: 'blur',
                },
              ]"
            >
              <label for="active_date" class="flex mb-1">
                <span>{{ $t('active_date') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-date-picker id="active_date" v-model:value="newContract.startDate" class="w-full" />
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              v-if="newContract.type === COMMON.CONTRACT_TYPE.RENT"
              :name="['endDate']"
              :rules="[
                { required: true, message: $t('expire_date_required'), trigger: 'blur' },
                {
                  validator: async (_: RuleObject, value: string) =>
                    validationRules.checkEndDate(
                      _,
                      value,
                      $t,
                      newContract.startDate ? newContract.startDate.toString() : ''
                    ),
                  trigger: 'blur',
                },
              ]"
            >
              <label for="expire_date" class="flex mb-1">
                <span>{{ $t('expire_date') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-date-picker id="expire_date" v-model:value="newContract.endDate" class="w-full" />
            </a-form-item>
            <a-form-item
              v-else
              :name="['endDate']"
              :rules="[
                {
                  validator: async (_: RuleObject, value: string) =>
                    validationRules.checkEndDate(
                      _,
                      value,
                      $t,
                      newContract.startDate ? newContract.startDate.toString() : ''
                    ),
                  trigger: 'blur',
                },
              ]"
            >
              <label for="expire_date" class="flex mb-1">
                <span>{{ $t('expire_date') }}</span>
              </label>
              <a-date-picker
                id="expire_date"
                v-model:value="newContract.endDate"
                class="w-full"
                disabled
                readonly
                :placeholder="$t('not_applicable')"
              />
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['signDate']"
              :rules="[
                {
                  validator: async (_: RuleObject, value: string) =>
                    validationRules.checkSignDate(
                      _,
                      value,
                      $t,
                      newContract.startDate ? newContract.startDate.toString() : ''
                    ),
                  trigger: 'blur',
                },
                {
                  validator: async (_: RuleObject, value: string) =>
                    validationRules.checkSignDate2(
                      _,
                      value,
                      $t,
                      newContract.createdAt ? newContract.createdAt.toString() : ''
                    ),
                  trigger: 'blur',
                },
              ]"
            >
              <label for="signed_date" class="flex mb-1">
                <span>{{ $t('signed_date') }}</span>
              </label>
              <a-date-picker id="signed_date" v-model:value="newContract.signDate" class="w-full" />
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item :name="['status']">
              <label for="status" class="flex mb-1">
                <span>{{ $t('status') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <ClientOnly>
                <a-select
                  id="status"
                  disabled
                  readonly
                  :value="contractStatus"
                  class="w-full text-left"
                  placeholder="-"
                >
                  <a-select-option :value="COMMON.CONTRACT_STATUS.ACTIVE" :class="`text-[#50c433]`">{{
                    $t('active')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.CONTRACT_STATUS.EXPIRED" :class="`text-[#888888]`">{{
                    $t('expired')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.CONTRACT_STATUS.CANCELLED" :class="`text-[#ff0000]`">{{
                    $t('cancelled')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE" :class="`text-[#888888]`">{{
                    $t('wait_for_signature')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.CONTRACT_STATUS.NOT_IN_EFFECT" :class="`text-[#888888]`">{{
                    $t('not_in_effect')
                  }}</a-select-option>
                </a-select>
              </ClientOnly>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row :gutter="16">
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item :name="['status']">
              <label for="status" class="flex mb-1">
                <span>{{ $t('status') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <ClientOnly>
                <a-select
                  id="status"
                  disabled
                  readonly
                  :value="contractStatus"
                  class="w-full text-left"
                  placeholder="-"
                >
                  <a-select-option :value="COMMON.CONTRACT_STATUS.ACTIVE" :class="`text-[#50c433]`">{{
                    $t('active')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.CONTRACT_STATUS.EXPIRED" :class="`text-[#888888]`">{{
                    $t('expired')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.CONTRACT_STATUS.CANCELLED" :class="`text-[#ff0000]`">{{
                    $t('cancelled')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE" :class="`text-[#888888]`">{{
                    $t('wait_for_signature')
                  }}</a-select-option>
                  <a-select-option :value="COMMON.CONTRACT_STATUS.NOT_IN_EFFECT" :class="`text-[#888888]`">{{
                    $t('not_in_effect')
                  }}</a-select-option>
                </a-select>
              </ClientOnly>
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
        </a-row> -->
        <div class="mt-10 flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('paper_list') }}</h2>
          <div class="flex items-center">
            <a-button
              type="primary"
              :disabled="!fileListDeleteBucket.value.length"
              danger
              class="flex items-center justify-center w-8 h-8 rounded-sm mx-2"
              @click="
                () => {
                  $event.emit('deleteItem', {
                    callback: () => {
                      newContract.files = newContract.files.filter(
                        (file) => !fileListDeleteBucket.value.includes(file.ID)
                      );
                      fileListDeleteBucket.value = [];
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
                  addFilecounter++;
                  newContract.files.push({
                    ID: -addFilecounter,
                    title: '',
                    path: [] as UploadFile[],
                  } as ContractFile);
                }
              "
              ><PlusOutlined
            /></a-button>
          </div>
        </div>
        <CommonContractAddPaperListTable :new-contract="newContract" :delete-bucket="fileListDeleteBucket" />
        <div class="mt-10 flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('resident_list') }}</h2>
          <div class="flex items-center">
            <a-button
              type="primary"
              danger
              class="flex items-center justify-center w-8 h-8 rounded-sm"
              :disabled="!residentListDeleteBucket.value.length"
              @click="
                () => {
                  $event.emit('deleteItem', {
                    callback: () => {
                      newContract.residents = newContract.residents.filter(
                        (resident) => !residentListDeleteBucket.value.includes(resident.ID)
                      );
                      residentListDeleteBucket.value = [];
                    },
                    noPasswordRequired: true,
                  });
                }
              "
              ><DeleteOutlined
            /></a-button>
            <a-button
              type="primary"
              class="flex items-center justify-center w-8 h-8 rounded-sm ms-2"
              @click="
                () => {
                  addResidentCounter++;
                  newContract.residents.push({
                    ID: -addResidentCounter,
                    firstName: '',
                    middleName: {
                      Valid: false,
                      String: '',
                    },
                    lastName: '',
                    ssn: {
                      Valid: false,
                      String: '',
                    },
                    oldSSN: {
                      Valid: false,
                      String: '',
                    },
                    gender: undefined,
                    dob: '',
                    pob: '',
                    phone: {
                      Valid: false,
                      String: '',
                    },
                    email: {
                      Valid: false,
                      String: '',
                    },
                    relationWithHouseholder: 0,
                    userAccountID: {
                      Valid: false,
                      Int64: 0,
                    },
                    userAccount: undefined,
                    createdAt: '',
                    createdBy: 0,
                    updatedAt: '',
                    updatedBy: 0,
                  } as RoomResident);
                }
              "
              ><PlusOutlined
            /></a-button>
          </div>
        </div>
        <CommonContractAddResidentListTable
          :new-contract="newContract"
          :delete-bucket="residentListDeleteBucket"
          :customers="customerList"
        />
        <div class="flex flex-col items-center mt-5">
          <a-button class="w-[100px] rounded-sm" type="primary" html-type="submit">{{ $t('confirm') }}</a-button>
          <a-button class="w-[100px] rounded-sm mt-3" @click.prevent="navigateTo(pageRoutes.common.contract.list)">
            {{ $t('cancel') }}
          </a-button>
        </div>
      </a-form>
      <ClientOnly>
        <div v-show="addSuccess" class="h-full w-full flex-col items-center justify-center" style="display: flex">
          <div class="flex items-center justify-center mt-5">
            <Success class="text-green-600 text-4xl" />
          </div>
          <h2 class="text-xl my-2">{{ $t('finish') }}</h2>
          <p class="text-center my-2">{{ $t('add_contract_success_title') }}</p>
          <p class="text-center my-2">{{ $t('add_contract_success_note') }}</p>
          <div class="my-2 flex flex-col items-center">
            <NuxtLink :to="pageRoutes.common.contract.detail(newContractID)">
              <a-button type="primary" class="rounded-sm mb-2">{{ $t('new_contract_detail') }}</a-button>
            </NuxtLink>
            <NuxtLink :to="pageRoutes.common.contract.list" class="w-full">
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
import type { User } from '~/types/user';
import { COMMON } from '~/consts/common';
import { svgPaths } from '~/consts/svg_paths';
import type { AddContract, ContractFile, RoomResident } from '~/types/contract';
import type { Room, Building } from '~/types/building';
import { validationRules } from '~/consts/validation_rules';
import type { RuleObject } from 'ant-design-vue/es/form';
import type { UploadFile } from 'ant-design-vue';
import Success from '~/public/svg/success.svg';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Add New Contract',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Add New Contract',
  meta: [
    {
      name: 'description',
      content: 'Add a contract to the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const userNo = useCookie('userNo');
const userName = useCookie('userName');
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event, $dayjs } = useNuxtApp();
const route = useRoute();
const buildingID = Number(route.query.buildingID as string);
const roomID = Number(route.query.roomID as string);
const floor = Number(route.query.floor as string);
const customerID = Number(route.query.customerID as string);
const newContract = ref<AddContract>({
  buildingID: buildingID || undefined,
  roomFloor: floor || undefined,
  roomID: roomID || undefined,
  householderID: customerID || undefined,
  creatorID: undefined,
  type: undefined,
  value: undefined,
  signDate: '',
  startDate: '',
  endDate: '',
  createdAt: '',
  status: COMMON.HIDDEN_OPTION,
  files: [],
  residents: [],
});
const offsetCustomer = ref(0);
const limitCustomer = ref(500);
const customerList = ref<User[]>([]);
const buildingList = ref<Building[]>([]);
const fileListDeleteBucket = ref({ value: [] as number[] });
const residentListDeleteBucket = ref({ value: [] as number[] });
const addFilecounter = ref(0);
const addResidentCounter = ref(0);
const floorList = computed<number[]>(() => {
  const result: number[] = [];

  if (!newContract.value.buildingID) {
    return result;
  }

  const building = buildingList.value.find((b) => b.ID === newContract.value.buildingID);
  if (!building) {
    return result;
  }

  for (let i = 1; i <= building.totalFloor; i++) {
    result.push(i);
  }

  return result;
});
const roomList = computed<Room[]>(() => {
  const result: Room[] = [];

  if (!newContract.value.buildingID || !newContract.value.roomFloor) {
    return result;
  }

  const building = buildingList.value.find((b) => b.ID === newContract.value.buildingID);
  if (!building) {
    return result;
  }

  if (!building.rooms || !building.rooms.length) {
    return result;
  }

  for (const room of building.rooms) {
    if (room.floor === newContract.value.roomFloor && room.status === COMMON.ROOM_STATUS.AVAILABLE) {
      result.push(room);
    }
  }

  return result;
});
const creatorInfo = computed<string>(() => {
  if (userNo.value && userName.value) {
    return `${userNo.value} - ${userName.value}`;
  }

  return '';
});
const addSuccess = ref(false);
const newContractID = ref(0);
const contractStatus = computed<number | undefined>(() => {
  const currentDate = $dayjs().set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);

  if (newContract.value.createdAt && newContract.value.startDate) {
    const createDate = $dayjs(newContract.value.createdAt)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0);
    const startDate = $dayjs(newContract.value.startDate)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0);

    if (startDate.isBefore(createDate)) {
      return undefined;
    }

    if (newContract.value.signDate) {
      const signDate = $dayjs(newContract.value.signDate)
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .set('millisecond', 0);

      if (signDate.isBefore(createDate)) {
        return undefined;
      }

      if (startDate.isBefore(signDate)) {
        return undefined;
      }
    }

    if (newContract.value.endDate) {
      const endDate = $dayjs(newContract.value.endDate)
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .set('millisecond', 0);

      if (endDate.isBefore(startDate)) {
        return undefined;
      }
    }
  }

  if (newContract.value.createdAt && newContract.value.startDate) {
    const startDate = $dayjs(newContract.value.startDate)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0);

    if (!newContract.value.signDate) {
      if (currentDate.isBefore(startDate)) {
        return COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE;
      } else {
        return COMMON.CONTRACT_STATUS.CANCELLED;
      }
    } else {
      if (!newContract.value.endDate) {
        if (currentDate.isBefore(startDate)) {
          return COMMON.CONTRACT_STATUS.NOT_IN_EFFECT;
        } else {
          return COMMON.CONTRACT_STATUS.ACTIVE;
        }
      } else {
        const endDate = $dayjs(newContract.value.endDate)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0);

        if (endDate.isBefore(currentDate)) {
          return COMMON.CONTRACT_STATUS.EXPIRED;
        } else {
          if (currentDate.isBefore(startDate)) {
            return COMMON.CONTRACT_STATUS.NOT_IN_EFFECT;
          } else {
            return COMMON.CONTRACT_STATUS.ACTIVE;
          }
        }
      }
    }
  }

  return undefined;
});

// ---------------------- Functions ----------------------
async function getCustomerList() {
  try {
    const response = await api.common.customer.getList(limitCustomer.value, offsetCustomer.value);
    const data = response.data;

    if (offsetCustomer.value === 0) {
      customerList.value = data;
    } else {
      customerList.value.push(...data);
    }

    if (response.data.length === limitCustomer.value) {
      offsetCustomer.value += limitCustomer.value;
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

async function addContract() {
  try {
    $event.emit('loading');

    const formData = new FormData();
    formData.append('buildingID', newContract.value.buildingID?.toString() || '');
    formData.append('roomID', newContract.value.roomID?.toString() || '');
    formData.append('householderID', newContract.value.householderID?.toString() || '');
    formData.append('contractType', newContract.value.type?.toString() || '');
    formData.append('contractValue', newContract.value.value?.toString() || '0');
    formData.append(
      'createdAt',
      newContract.value.createdAt ? convertToDate(newContract.value.createdAt.toString()) || '' : ''
    );
    formData.append(
      'startDate',
      newContract.value.startDate ? convertToDate(newContract.value.startDate.toString()) || '' : ''
    );
    formData.append(
      'endDate',
      newContract.value.endDate ? convertToDate(newContract.value.endDate.toString()) || '' : ''
    );
    formData.append(
      'signDate',
      newContract.value.signDate ? convertToDate(newContract.value.signDate.toString()) || '' : ''
    );
    const totalNewFiles = newContract.value.files.length;
    formData.append('totalNewFiles', totalNewFiles.toString());
    newContract.value.files.forEach((file, index) => {
      formData.append(`file[${index}]file`, (file.path as UploadFile[])[0].originFileObj as File);
      formData.append(`file[${index}]title`, file.title || '');
    });
    newContract.value.residents.forEach((resident) => {
      const { userAccount, ...residentData } = resident;

      // Prepare resident data for submission
      const finalData = {
        firstName: residentData.firstName.trim(),
        middleName: residentData.middleName.String ? residentData.middleName.String.trim() : '',
        lastName: residentData.lastName.trim(),
        ssn: residentData.ssn.String ? residentData.ssn.String.trim() : '',
        oldSSN: residentData.oldSSN.String ? residentData.oldSSN.String.trim() : '',
        phone: residentData.phone.String ? residentData.phone.String.trim() : '',
        email: residentData.email.String ? residentData.email.String.trim() : '',
        ID: residentData.ID <= 0 ? 0 : residentData.ID, // Ensure ID is 0 for new residents
        pob: residentData.pob ? residentData.pob.trim() : '',
        gender: resident.gender,
        userAccountID: residentData.userAccountID.Int64 ? residentData.userAccountID.Int64 : 0,
        relationWithHouseholder: residentData.relationWithHouseholder,
        dob:
          typeof residentData.dob === 'string'
            ? residentData.dob
            : convertToDate(residentData.dob.toDate().toISOString()),
      };

      formData.append('residents[]', JSON.stringify(finalData));
    });

    const response = await api.common.contract.addContract(formData);
    newContractID.value = response.data;
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

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  $event.emit('loading');
  await getCustomerList();
  await getBuildingList();
  $event.emit('loading');
});

// ---------------------- Watchers ----------------------
watch(offsetCustomer, getCustomerList);
// watch(
//   () => newContract.value.value,
//   () => {
//     if (newContract.value.value !== undefined && newContract.value.value < 0) {
//       newContract.value.value = 0;
//     }
//   }
// );
watch(
  () => newContract.value.type,
  () => {
    if (newContract.value.type === COMMON.CONTRACT_TYPE.BUY) {
      newContract.value.endDate = '';
    }
  }
);
watch(
  () => newContract.value.buildingID,
  () => {
    newContract.value.roomFloor = undefined;
    newContract.value.roomID = undefined;
  }
);
watch(
  () => newContract.value.roomFloor,
  () => {
    newContract.value.roomID = undefined;
  }
);
</script>
