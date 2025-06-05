<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <NuxtLink :to="pageRoutes.common.customer.list">{{ $t('customer_list') }}</NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t('customer_detail') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex justify-between mt-5">
        <h1 class="mt-3 text-2xl">{{ getUserName(customerInfo) }}</h1>
      </div>
    </div>
    <div
      class="flex-1 flex flex-col mt-5 overflow-auto px-4"
      :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']"
    >
      <div class="flex py-3">
        <div class="flex-1 flex flex-col me-6">
          <div class="flex items-center">
            <div class="flex-1 me-5">
              <label for="customer_no" class="flex mb-1">
                <span>{{ $t('customer_no') }}</span>
              </label>
              <a-input id="customer_no" :value="customerInfo.no" :placeholder="$t('customer_no')" disabled readonly />
            </div>
            <div class="flex-1">
              <label for="last_name" class="flex mb-1">
                <span>{{ $t('last_name') }}</span>
              </label>
              <a-input id="last_name" :value="customerInfo.lastName" :placeholder="$t('last_name')" disabled readonly />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-5">
              <label for="middle_name" class="flex mb-1">
                <span>{{ $t('middle_name') }}</span>
              </label>
              <a-input
                id="middle_name"
                :value="customerInfo.middleName.Valid ? (customerInfo.middleName.String as string) : ''"
                :placeholder="$t('middle_name')"
                disabled
                readonly
              />
            </div>
            <div class="flex-1">
              <label for="first_name" class="flex mb-1">
                <span>{{ $t('name') }}</span>
              </label>
              <a-input
                id="first_name"
                :value="customerInfo.firstName"
                :placeholder="$t('name')"
                disabled
                readonly
                autocomplete="off"
              />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-5">
              <label for="gender" class="flex mb-1">
                <span>{{ $t('gender') }}</span>
              </label>
              <a-select id="gender" :value="customerInfo.gender" class="w-full" disabled readonly>
                <a-select-option :value="COMMON.USER_GENDER.MALE">{{ $t('male') }}</a-select-option>
                <a-select-option :value="COMMON.USER_GENDER.FEMALE">{{ $t('female') }}</a-select-option>
                <a-select-option :value="COMMON.USER_GENDER.OTHER">{{ $t('other') }}</a-select-option>
              </a-select>
            </div>
            <div class="flex-1">
              <label for="date_of_birth" class="flex mb-1">
                <span>{{ $t('dob') }}</span>
              </label>
              <a-date-picker id="date_of_birth" :value="dob" class="w-full" disabled readonly />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-5">
              <label for="ssn" class="flex mb-1">
                <span>{{ $t('ssn') }}</span>
              </label>
              <a-input id="ssn" :value="customerInfo.ssn" :placeholder="$t('ssn')" disabled readonly />
            </div>
            <div class="flex-1">
              <label for="old_ssn" class="flex mb-1">
                <span>{{ $t('old_ssn') }}</span>
              </label>
              <a-input
                id="old_ssn"
                :value="customerInfo.oldSSN.Valid ? (customerInfo.oldSSN.String as string) : ''"
                :placeholder="$t('old_ssn')"
                disabled
                readonly
              />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-5">
              <label for="pob" class="flex mb-1">
                <span>{{ $t('pob') }}</span>
              </label>
              <a-input id="pob" :value="customerInfo.pob" :placeholder="$t('pob')" disabled readonly />
            </div>
            <div class="flex-1">
              <label for="phone_number" class="flex mb-1">
                <span>{{ $t('phone') }}</span>
              </label>
              <a-input id="phone_number" :value="customerInfo.phone" :placeholder="$t('phone')" disabled readonly />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-5">
              <label for="email" class="flex mb-1">
                <span>{{ $t('email') }}</span>
              </label>
              <a-input
                id="email"
                :value="customerInfo.email"
                :placeholder="$t('email')"
                disabled
                readonly
                autocomplete="off"
              />
            </div>
            <div class="flex-1">
              <label for="permanent_address" class="flex mb-1">
                <span>{{ $t('permanent_address') }}</span>
              </label>
              <a-input
                id="permanent_address"
                :value="customerInfo.permanentAddress"
                :placeholder="$t('permanent_address')"
                disabled
                readonly
              />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-5">
              <label for="temporary_address" class="flex mb-1">
                <span>{{ $t('temporary_address') }}</span>
              </label>
              <a-input
                id="temporary_address"
                :value="customerInfo.temporaryAddress"
                :placeholder="$t('temporary_address')"
                disabled
                readonly
              />
            </div>
            <div class="flex-1"></div>
          </div>
        </div>
        <div class="flex flex-col w-[200px] h-[300px]">
          <div>{{ $t('avatar') }}</div>
          <img :src="customerInfo.profileFilePath" alt="avatar" />
        </div>
        <div class="flex flex-col w-[200px] h-[300px] mx-5">
          <div>{{ $t('national_id') + ' ' + $t('front_face') }}</div>
          <img :src="customerInfo.ssnFrontFilePath" alt="national_id_front" />
        </div>
        <div class="flex flex-col w-[200px] h-[300px]">
          <div>{{ $t('national_id') + ' ' + $t('back_face') }}</div>
          <img :src="customerInfo.ssnBackFilePath" alt="national_id_back" />
        </div>
      </div>
      <hr class="border-gray-400 mt-2" />
      <div class="w-full flex-1 flex flex-col">
        <div class="flex items-center mt-3">
          <p
            class="me-3 cursor-pointer select-none"
            :class="[
              option === 1
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 1"
          >
            {{ $t('contract') }}
          </p>
          <p
            class="mx-3 cursor-pointer select-none"
            :class="[
              option === 2
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 2"
          >
            {{ $t('support_ticket') }}
          </p>
        </div>
        <div class="flex items-center justify-center mt-3">
          <h2 v-show="option === 1" class="text-xl font-bold">{{ $t('contract') }}</h2>
          <h2 v-show="option === 2" class="text-xl font-bold">{{ $t('support_ticket') }}</h2>
        </div>
        <ClientOnly>
          <CommonCustomerDetailContractTable v-if="contracts.length" v-show="option === 1" :contracts="contracts" />
          <CommonCustomerDetailContractTable v-else v-show="option === 1" :contracts="[]" />
          <CommonCustomerDetailSupportTicketTable v-if="tickets.length" v-show="option === 2" :tickets="tickets" />
          <CommonCustomerDetailSupportTicketTable v-else v-show="option === 2" :tickets="[]" />
        </ClientOnly>
        <div class="flex flex-col items-center my-5">
          <a-button class="my-2 w-[100px] rounded-sm">
            <NuxtLink :to="pageRoutes.common.customer.list">{{ $t('back') }}</NuxtLink>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import type { User } from '~/types/user';
import dayjs, { type Dayjs } from 'dayjs';
import type { Contract } from '~/types/contract';
import type { SupportTicket } from '~/types/support_ticket';
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Customer Detail',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Customer Detail',
  meta: [
    {
      name: 'description',
      content: 'Customer detail information in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const route = useRoute();
const customerID = Number(route.params.id as string);
const { $event } = useNuxtApp();
const customerInfo = ref<User>({
  ID: 0,
  createdAt: '',
  createdBy: 0,
  updatedAt: '',
  updatedBy: 0,
  no: '',
  firstName: '',
  middleName: {
    String: '',
    Valid: false,
  },
  lastName: '',
  ssn: '',
  oldSSN: {
    String: '',
    Valid: false,
  },
  dob: '',
  pob: '',
  email: '',
  phone: '',
  permanentAddress: '',
  temporaryAddress: '',
  ssnFrontFilePath: '',
  ssnBackFilePath: '',
  profileFilePath: '',
  emailVerifiedAt: {
    Time: null,
    Valid: false,
  },
  isOwner: false,
  isManager: false,
  isCustomer: false,
  gender: 0,
});
const dob = computed<Dayjs>(() => dayjs(customerInfo.value.dob));
const option = ref<number>(1);
const contracts = ref<Contract[]>([]);
const tickets = ref<SupportTicket[]>([]);

// ---------------------- Functions ----------------------
async function getCustomerDetail() {
  try {
    $event.emit('loading');
    const customerInfoResponse = await api.common.customer.getDetail(customerID);
    const contractResponse = await api.common.customer.getContract(customerID);
    const ticketResponse = await api.common.customer.getTicket(customerID);

    customerInfo.value = customerInfoResponse.data;
    contracts.value = contractResponse.data;
    tickets.value = ticketResponse.data;
  } catch (err: any) {
    if (
      err.status >= 500 ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      throw createError({
        status: 500,
        message: 'Internal server error',
        fatal: true,
      });
    }
    customerInfo.value.ID = 0;
  } finally {
    $event.emit('loading');
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  await getCustomerDetail();

  if (customerInfo.value.ID === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});
</script>
