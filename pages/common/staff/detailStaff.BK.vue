<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.staff.list">{{ $t('employee_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('employee_info') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex justify-between items-center">
        <h1 class="mt-3 text-2xl">{{ getUserName(staffInfo) }}</h1>
        <div>
          <a-button type="primary" class="rounded-none">
            <NuxtLink :to="pageRoutes.common.staff.edit(staffID)">{{ $t('edit') }}</NuxtLink>
          </a-button>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <div class="flex py-3">
        <div class="flex-1 flex flex-col me-6">
          <div class="flex items-center">
            <div class="flex-1 me-5">
              <label for="employee_number" class="flex mb-1">
                <span>{{ $t('employee_number') }}</span>
              </label>
              <a-input
                id="employee_number"
                :value="staffInfo.no"
                :placeholder="$t('employee_number')"
                disabled
                readonly
              />
            </div>
            <div class="flex-1">
              <label for="last_name" class="flex mb-1">
                <span>{{ $t('last_name') }}</span>
              </label>
              <a-input id="last_name" :value="staffInfo.lastName" :placeholder="$t('last_name')" disabled readonly />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-5">
              <label for="middle_name" class="flex mb-1">
                <span>{{ $t('middle_name') }}</span>
              </label>
              <a-input
                id="middle_name"
                :value="staffInfo.middleName.Valid ? (staffInfo.middleName.String as string) : ''"
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
                :value="staffInfo.firstName"
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
              <a-select id="gender" :value="staffInfo.gender" class="w-full" disabled readonly>
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
              <a-input id="ssn" :value="staffInfo.ssn" :placeholder="$t('ssn')" disabled readonly />
            </div>
            <div class="flex-1">
              <label for="old_ssn" class="flex mb-1">
                <span>{{ $t('old_ssn') }}</span>
              </label>
              <a-input
                id="old_ssn"
                :value="staffInfo.oldSSN.Valid ? (staffInfo.oldSSN.String as string) : ''"
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
              <a-input id="pob" :value="staffInfo.pob" :placeholder="$t('pob')" disabled readonly />
            </div>
            <div class="flex-1">
              <label for="phone_number" class="flex mb-1">
                <span>{{ $t('phone') }}</span>
              </label>
              <a-input id="phone_number" :value="staffInfo.phone" :placeholder="$t('phone')" disabled readonly />
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="flex-1 me-5">
              <label for="email" class="flex mb-1">
                <span>{{ $t('email') }}</span>
              </label>
              <a-input
                id="email"
                :value="staffInfo.email"
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
                :value="staffInfo.permanentAddress"
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
                :value="staffInfo.temporaryAddress"
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
          <img :src="staffInfo.profileFilePath" alt="avatar" />
        </div>
        <div class="flex flex-col w-[200px] h-[300px] mx-5">
          <div>{{ $t('national_id') + ' ' + $t('front_face') }}</div>
          <img :src="staffInfo.ssnFrontFilePath" alt="national_id_front" />
        </div>
        <div class="flex flex-col w-[200px] h-[300px]">
          <div>{{ $t('national_id') + ' ' + $t('back_face') }}</div>
          <img :src="staffInfo.ssnBackFilePath" alt="national_id_back" />
        </div>
      </div>
      <hr class="border-gray-400 mt-2" />
      <div class="w-full flex-1 flex flex-col">
        <!-- <div class="flex items-center mt-3">
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
          <p
            class="mx-3 cursor-pointer select-none"
            :class="[
              option === 3
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 3"
          >
            {{ $t('management_schedule') }}
          </p>
        </div> -->
        <div class="flex items-center justify-center mt-3">
          <!-- <h2 v-show="option === 1" class="text-xl font-bold">{{ $t('contract') }}</h2>
          <div v-show="option === 2" class="flex-col items-center w-full" style="display: flex">
            <h2 class="text-xl font-bold">{{ $t('support_ticket') }}</h2>
            <div class="flex justify-end w-full">
              <a-range-picker v-model:value="timeRange" :disabled-date="disabledDate" />
            </div>
          </div> -->
          <!-- <h2 v-show="option === 3" class="text-xl font-bold">{{ $t('management_schedule') }}</h2> -->
          <h2 class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
        </div>
        <ClientOnly>
          <!-- <CommonStaffDetailContractTable v-if="contracts.length" v-show="option === 1" :contracts="contracts" />
          <CommonStaffDetailContractTable v-else v-show="option === 1" :contracts="[]" />
          <CommonStaffDetailSupportTicketTable
            v-if="tickets.length"
            v-show="option === 2"
            :tickets="tickets"
            :staff-info="staffInfo"
          />
          <CommonStaffDetailSupportTicketTable
            v-else
            v-show="option === 2"
            :tickets="[]"
            :staff-info="staffInfo"
          />
          <CommonStaffDetailBuildingTable v-if="schedules.length" v-show="option === 3" :schedules="schedules" />
          <CommonStaffDetailBuildingTable v-else v-show="option === 3" :schedules="[]" /> -->
          <CommonStaffDetailBuildingTable v-if="schedules.length" :schedules="schedules" />
          <CommonStaffDetailBuildingTable v-else :schedules="[]" />
        </ClientOnly>
        <div class="flex flex-col items-center my-5">
          <a-button class="my-2 w-[100px] rounded-sm">
            <NuxtLink :to="pageRoutes.common.staff.list">{{ $t('back') }}</NuxtLink>
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
import dayjs, { type Dayjs } from 'dayjs';
import type { ManagerSchedule, User } from '~/types/user';
// import type { Contract } from '~/types/contract';
// import type { SupportTicket } from '~/types/support_ticket';
import type { NullTime } from '~/types/basic_model';
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Staff Detail',
  layout: 'main',
  middleware: ['authorization-owner'],
});

useHead({
  title: 'Staff Detail',
  meta: [
    {
      name: 'description',
      content: 'Staff detail information in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const route = useRoute();
const staffID = Number(route.params.id as string);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const staffInfo = ref<User>({
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

const dob = computed<Dayjs>(() => dayjs(staffInfo.value.dob));
// const option = ref<number>(1);
const schedules = ref<ManagerSchedule[]>([]);
// const contracts = ref<Contract[]>([]);
// const tickets = ref<SupportTicket[]>([]);
// const ticketApiOffset = ref<number>(0);
// const ticketApiLimit = ref<number>(500);
// const { t } = useI18n();
// const now = dayjs();
// const timeRange = ref<[Dayjs, Dayjs]>([now.startOf('month'), now]);

// ---------------------- Functions ----------------------
async function getStaffDetailInfo() {
  try {
    $event.emit('loading');
    const response = await api.common.staff.getDetail(staffID);
    const scheduleResponse = await api.common.staff.getSchedule(staffID);
    // const contractResponse = await api.common.staff.getContract(staffID);
    // const ticketResponse = await api.common.staff.getTicket(
    //   staffID,
    //   ticketApiLimit.value,
    //   ticketApiOffset.value,
    //   convertToDate(timeRange.value[0].toDate().toISOString()),
    //   convertToDate(timeRange.value[1].toDate().toISOString())
    // );

    staffInfo.value = response.data;
    schedules.value = scheduleResponse.data.sort(
      (a, b) =>
        new Date(b.startDate as string).getTime() - new Date(a.startDate as string).getTime() ||
        new Date((b.endDate as NullTime).Valid ? (b.endDate as NullTime).Time! : '2100-01-01').getTime() -
          new Date((a.endDate as NullTime).Valid ? (a.endDate as NullTime).Time! : '2100-01-01').getTime()
    );
    // contracts.value = contractResponse.data;
    // tickets.value = ticketResponse.data;

    // if (ticketResponse.data.length === ticketApiLimit.value) {
    //   ticketApiOffset.value += ticketApiLimit.value;
    // }
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
    staffInfo.value.ID = 0;
  } finally {
    $event.emit('loading');
  }
}

// function disabledDate(current: Dayjs) {
//   // Can not select days after today
//   return current && current >= dayjs().endOf('day');
// }

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  await getStaffDetailInfo();

  if (staffInfo.value.ID === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});

// ---------------------- Watchers ----------------------
// watch(ticketApiOffset, async (newTicketApiOffset, oldTicketApiOffset) => {
//   try {
//     const ticketResponse = await api.common.staff.getTicket(
//       staffID,
//       ticketApiLimit.value,
//       ticketApiOffset.value,
//       convertToDate(timeRange.value[0].toDate().toISOString()),
//       convertToDate(timeRange.value[1].toDate().toISOString())
//     );
//     tickets.value.push(...ticketResponse.data);

//     if (ticketResponse.data.length === ticketApiLimit.value) {
//       ticketApiOffset.value += ticketApiLimit.value;
//     }
//   } catch (err: any) {
//     if (
//       err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
//       err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
//       err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
//     ) {
//       if (oldTicketApiOffset > 0 && newTicketApiOffset === 0) {
//         notification.error({
//           message: t('system_error_title'),
//           description: t('system_error_description'),
//         });
//       } else {
//         notification.error({
//           message: t('system_error_title'),
//           description: t('system_error_description_fetch_error'),
//         });
//       }
//     }
//   }
// });

// watch(timeRange, () => {
//   $event.emit('refreshTicketTableDetailStaff');
// });

// ---------------------- Events ----------------------
// $event.on('refreshTicketTableDetailStaff', async () => {
//   tickets.value = [];
//   if (ticketApiOffset.value > 0) {
//     ticketApiOffset.value = 0;
//   } else {
//     try {
//       const ticketResponse = await api.common.staff.getTicket(
//         staffID,
//         ticketApiLimit.value,
//         ticketApiOffset.value,
//         convertToDate(timeRange.value[0].toDate().toISOString()),
//         convertToDate(timeRange.value[1].toDate().toISOString())
//       );
//       tickets.value = ticketResponse.data;

//       if (ticketResponse.data.length === ticketApiLimit.value) {
//         ticketApiOffset.value += ticketApiLimit.value;
//       }
//     } catch (err: any) {
//       if (
//         err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
//         err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
//         err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
//       ) {
//         notification.error({
//           message: t('system_error_title'),
//           description: t('system_error_description'),
//         });
//       }
//     }
//   }
// });
</script>
