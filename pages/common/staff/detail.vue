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
        <h1 class="mt-3 text-2xl">{{ staffFullName }}</h1>
        <div class="flex justify-end">
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
                $event.emit('staffDetailCancelEditMode');
              }
            "
            >{{ $t('cancel') }}</a-button
          >
          <a-button v-show="editMode" type="primary" class="rounded-sm" @click="validateUpdateForm">{{
            $t('save_changes')
          }}</a-button>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <a-form ref="formRef" class="py-3" :model="staffInfo.data" layout="vertical">
        <div class="grid grid-cols-6 gap-x-2">
          <div id="left_side" class="col-span-5">
            <div class="h-full flex-1 flex flex-col">
              <div class="flex items-center">
                <a-form-item class="flex-1 me-5">
                  <label for="employee_number" class="flex mb-1">
                    <span>{{ $t('employee_number') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="employee_number"
                    :value="staffInfo.data.no"
                    :placeholder="$t('enter_employee_no')"
                    disabled
                    readonly
                  />
                </a-form-item>
                <a-form-item class="flex-1" name="middleName">
                  <label for="lastName" class="flex mb-1">
                    <span>{{ $t('last_name') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="lastName"
                    :value="staffInfo.data.lastName"
                    :placeholder="$t('enter_employee_last_name')"
                    disabled
                    readonly
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item class="flex-1 me-5">
                  <label for="middleName" class="flex mb-1">
                    <span>{{ $t('middle_name') }}</span>
                  </label>
                  <a-input
                    id="middleName"
                    :value="staffInfo.data.middleName"
                    :placeholder="editMode ? $t('enter_employee_middle_name') : '-'"
                    disabled
                    readonly
                  />
                </a-form-item>
                <a-form-item class="flex-1">
                  <label for="firstName" class="flex mb-1">
                    <span>{{ $t('name') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="firstName"
                    :value="staffInfo.data.firstName"
                    :placeholder="$t('enter_employee_first_name')"
                    disabled
                    readonly
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item class="flex-1 me-5">
                  <label for="gender" class="flex mb-1">
                    <span>{{ $t('gender') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-select
                    id="gender"
                    :value="staffInfo.data.gender"
                    class="w-full"
                    :class="[staffInfo.data.gender === 0 ? 'text-gray-500' : '']"
                    :placeholder="$t('select_employee_gender')"
                    disabled
                    readonly
                  >
                    <a-select-option :value="COMMON.USER_GENDER.MALE">{{ $t('male') }}</a-select-option>
                    <a-select-option :value="COMMON.USER_GENDER.FEMALE">{{ $t('female') }}</a-select-option>
                    <a-select-option :value="COMMON.USER_GENDER.OTHER">{{ $t('other') }}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item class="flex-1">
                  <label for="dob" class="flex mb-1">
                    <span>{{ $t('dob') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-date-picker
                    id="dob"
                    :value="staffInfo.data.dob"
                    class="w-full"
                    :placeholder="$t('select_employee_dob')"
                    disabled
                    readonly
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item class="flex-1 me-5" name="oldSSN">
                  <label for="ssn" class="flex mb-1">
                    <span>{{ $t('ssn') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="ssn"
                    :value="staffInfo.data.ssn"
                    :placeholder="$t('enter_employee_ssn')"
                    disabled
                    readonly
                  />
                </a-form-item>
                <a-form-item class="flex-1">
                  <label for="oldSSN" class="flex mb-1">
                    <span>{{ $t('old_ssn') }}</span>
                  </label>
                  <a-input
                    id="oldSSN"
                    :value="staffInfo.data.oldSSN"
                    :placeholder="editMode ? $t('enter_employee_old_ssn') : '-'"
                    disabled
                    readonly
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item class="flex-1 me-5">
                  <label for="pob" class="flex mb-1">
                    <span>{{ $t('pob') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="pob"
                    :value="staffInfo.data.pob"
                    :placeholder="$t('enter_employee_pob')"
                    disabled
                    readonly
                  />
                </a-form-item>
                <a-form-item class="flex-1">
                  <label for="phone" class="flex mb-1">
                    <span>{{ $t('phone') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="phone"
                    :value="staffInfo.data.phone"
                    :placeholder="$t('enter_employee_phone')"
                    autocomplete="phone"
                    disabled
                    readonly
                  />
                </a-form-item>
              </div>
              <div class="flex items-center">
                <a-form-item class="flex-1 me-5">
                  <label for="email" class="flex mb-1">
                    <span>{{ $t('email') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="email"
                    :value="staffInfo.data.email"
                    :placeholder="$t('enter_employee_email')"
                    autocomplete="email"
                    disabled
                    readonly
                  />
                </a-form-item>
                <div class="flex-1">
                  <a-form-item class="flex-1">
                    <label for="permanent_address" class="flex mb-1">
                      <span>{{ $t('permanent_address') }}</span>
                      <span class="text-red-500 ms-1">*</span>
                    </label>
                    <a-input
                      id="permanent_address"
                      :value="staffInfo.data.permanentAddress"
                      :placeholder="$t('enter_employee_permanent_address')"
                      autocomplete="off"
                      disabled
                      readonly
                    />
                  </a-form-item>
                </div>
              </div>
              <div class="flex items-center">
                <a-form-item class="flex-1 me-5">
                  <label for="temporary_address" class="flex mb-1">
                    <span>{{ $t('temporary_address') }}</span>
                    <span class="text-red-500 ms-1">*</span>
                  </label>
                  <a-input
                    id="temporary_address"
                    :value="staffInfo.data.temporaryAddress"
                    :placeholder="$t('enter_employee_temporary_address')"
                    autocomplete="off"
                    disabled
                    readonly
                  />
                </a-form-item>
                <div class="flex-1"></div>
              </div>
              <div v-if="!editMode" class="mt-5">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
                </div>
                <CommonStaffDetailScheduleTable :schedules="schedules" />
              </div>
              <CommonStaffEditScheduleTable
                v-else
                :schedules="staffInfo.data.schedules"
                :original-schedules="originalSchedules"
                :building-list="buildingList"
                :form-ref="formRef"
              />
            </div>
          </div>
          <div class="col-span-1 px-3">
            <a-form-item class="align_validation_message_middle" name="profileFilePath">
              <div>{{ $t('avatar') }}<span class="text-red-500 ms-1">*</span></div>
              <img :src="staffInfo.data.profileFilePath" :alt="$t('avatar')" class="w-full h-full mt-1" />
            </a-form-item>
            <a-form-item class="mt-5 align_validation_message_middle">
              <div>{{ $t('national_id') + ' ' + $t('front_face') }}<span class="text-red-500 ms-1">*</span></div>
              <img :src="staffInfo.data.ssnFrontFilePath" :alt="$t('avatar')" class="w-full h-full mt-1" />
            </a-form-item>
            <a-form-item class="mt-5 align_validation_message_middle">
              <div>{{ $t('national_id') + ' ' + $t('back_face') }}<span class="text-red-500 ms-1">*</span></div>
              <img :src="staffInfo.data.ssnBackFilePath" :alt="$t('avatar')" class="w-full h-full mt-1" />
            </a-form-item>
          </div>
        </div>
        <div class="flex flex-col items-center mt-5">
          <a-button class="w-[100px] rounded-sm mt-3" @click.prevent="navigateTo(pageRoutes.common.staff.list)">
            {{ $t('back') }}
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
import dayjs, { type Dayjs } from 'dayjs';
import type { ManagerSchedule, EditStaff } from '~/types/user';
import type { NullTime } from '~/types/basic_model';
import { COMMON } from '~/consts/common';
import type { Building } from '~/types/building';

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
const { t } = useI18n();
const route = useRoute();
const staffID = Number(route.params.id as string);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const staffInfo = ref<EditStaff>({
  data: {
    ID: staffID,
    firstName: '',
    middleName: '',
    lastName: '',
    ssn: '',
    oldSSN: '',
    dob: '',
    pob: '',
    no: '',
    email: '',
    phone: '',
    ssnFrontFilePath: undefined,
    ssnBackFilePath: undefined,
    profileFilePath: undefined,
    gender: undefined,
    temporaryAddress: '',
    permanentAddress: '',
    schedules: {
      data: [],
    },
  },
});
const staffFullName = ref('');
const schedules = ref<ManagerSchedule[]>([]);
const buildingList = ref<Building[]>([]);
const formRef = ref();
const originalSchedules = ref<
  {
    ID: number;
    start: string | Dayjs;
    end: string | Dayjs;
    buildingID: number | undefined;
    isNew: boolean;
    isDeleted: boolean;
  }[]
>([]);
const editMode = ref(false);

// ---------------------- Functions ----------------------
async function getStaffDetailInfo() {
  try {
    $event.emit('loading');
    const response = await api.common.staff.getDetail(staffID);
    const scheduleResponse = await api.common.staff.getSchedule(staffID);
    const buildingResponse = await api.common.building.getList();

    schedules.value = scheduleResponse.data.sort(
      (a, b) =>
        new Date(b.startDate as string).getTime() - new Date(a.startDate as string).getTime() ||
        new Date((b.endDate as NullTime).Valid ? ((b.endDate as NullTime).Time! as string) : '2100-01-01').getTime() -
          new Date((a.endDate as NullTime).Valid ? ((a.endDate as NullTime).Time! as string) : '2100-01-01').getTime()
    );

    staffFullName.value = getUserName(response.data);

    staffInfo.value.data.ID = response.data.ID;
    staffInfo.value.data.no = response.data.no;
    staffInfo.value.data.firstName = response.data.firstName;
    staffInfo.value.data.middleName = response.data.middleName.Valid ? (response.data.middleName.String as string) : '';
    staffInfo.value.data.lastName = response.data.lastName;
    staffInfo.value.data.ssn = response.data.ssn;
    staffInfo.value.data.oldSSN = response.data.oldSSN.Valid ? (response.data.oldSSN.String as string) : '';
    staffInfo.value.data.dob = dayjs(response.data.dob);
    staffInfo.value.data.pob = response.data.pob || '';
    staffInfo.value.data.email = response.data.email;
    staffInfo.value.data.phone = response.data.phone;
    staffInfo.value.data.ssnFrontFilePath = response.data.ssnFrontFilePath;
    staffInfo.value.data.ssnBackFilePath = response.data.ssnBackFilePath;
    staffInfo.value.data.profileFilePath = response.data.profileFilePath;
    staffInfo.value.data.gender = response.data.gender;
    staffInfo.value.data.temporaryAddress = response.data.temporaryAddress;
    staffInfo.value.data.permanentAddress = response.data.permanentAddress;
    staffInfo.value.data.schedules.data = scheduleResponse.data
      .sort(
        (a, b) =>
          new Date(b.startDate as string).getTime() - new Date(a.startDate as string).getTime() ||
          new Date((b.endDate as NullTime).Valid ? ((b.endDate as NullTime).Time! as string) : '2100-01-01').getTime() -
            new Date((a.endDate as NullTime).Valid ? ((a.endDate as NullTime).Time! as string) : '2100-01-01').getTime()
      )
      .map((schedule) => ({
        ID: schedule.ID,
        start: dayjs(schedule.startDate as string),
        end: (schedule.endDate as NullTime).Valid ? dayjs((schedule.endDate as NullTime).Time as string) : '',
        buildingID: schedule.buildingID,
        isNew: false,
        isDeleted: false,
      }));
    originalSchedules.value = JSON.parse(
      JSON.stringify(
        scheduleResponse.data.map((schedule: ManagerSchedule) => ({
          ID: schedule.ID,
          start: schedule.startDate,
          end: schedule.endDate,
          buildingID: schedule.buildingID,
          isNew: false,
          isDeleted: false,
        }))
      )
    );
    buildingList.value = buildingResponse.data;
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
    staffInfo.value.data.ID = 0;
  } finally {
    $event.emit('loading');
  }
}

async function updateStaff() {
  try {
    $event.emit('loading');
    const data = new FormData();
    staffInfo.value.data.schedules.data.forEach((schedule) => {
      if (schedule.isDeleted) {
        data.append('deletedSchedules[]', schedule.ID.toString());
      } else if (schedule.isNew) {
        data.append(
          'newSchedules[]',
          JSON.stringify({
            buildingID: schedule.buildingID,
            startDate: convertToDate((schedule.start as Dayjs).toDate().toISOString()),
            endDate: schedule.end ? convertToDate((schedule.end as Dayjs).toDate().toISOString()) : null,
          })
        );
      } else {
        data.append(
          'schedules[]',
          JSON.stringify({
            id: schedule.ID,
            buildingID: schedule.buildingID,
            startDate: convertToDate((schedule.start as Dayjs).toDate().toISOString()),
            endDate: schedule.end ? convertToDate((schedule.end as Dayjs).toDate().toISOString()) : null,
          })
        );
      }
    });

    await api.common.staff.update(staffInfo.value.data.ID, data);

    notification.success({
      message: t('update_success'),
      description: t('staff_new_information_updated'),
    });

    await getStaffDetailInfo();

    editMode.value = false;
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

async function validateUpdateForm() {
  try {
    if (!formRef.value) {
      return;
    }
    await formRef.value.validate();
    $event.emit('updateItem', {
      callback: updateStaff,
      updateModalContent: 'update_staff_confirm',
    });
  } catch (err: any) {
    /* empty */
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(async () => {
  await getStaffDetailInfo();

  if (staffInfo.value.data.ID === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});
</script>
