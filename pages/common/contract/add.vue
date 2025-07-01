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
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <a-form :model="newContract">
        <h1 class="mt-5 text-2xl">{{ $t('contract_information') }}</h1>
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
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item name="building_address">
              <label for="building_address" class="flex mb-1">
                <span>{{ $t('building_address') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <a-input
                id="building_address"
                disabled
                readonly
                :value="buildingList.find((b) => b.ID === newContract.buildingID)?.address || ''"
                :placeholder="$t('building_address')"
              />
            </a-form-item>
          </a-col>
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
                :placeholder="$t('select_floor')"
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
                :placeholder="$t('select_room')"
                class="w-full text-left"
              >
                <a-select-option v-for="(room, index) in roomList" :key="index" :value="room.ID">{{
                  room.no
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
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
              >
                <a-select-option v-for="(customer, index) in customerList" :key="index" :value="customer.ID">
                  {{ customer.no }} - {{ getUserName(customer) }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item name="employee_number">
              <label for="employee_number" class="flex mb-1">
                <span>{{ $t('employee_number') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <!-- <a-input
                id="employee_number"
                disabled
                readonly
                :value="contract.creator.no"
                :placeholder="$t('employee_number')"
              >
                <template v-if="userRole?.toString() === roles.manager || userRole?.toString() === roles.owner" #suffix>
                  <NuxtLink
                    :to="
                      userRole?.toString() === roles.manager
                        ? pageRoutes.common.profile.index
                        : pageRoutes.common.staff.detail(contract.creatorID)
                    "
                    :title="$t('detail')"
                    ><LinkOutlined
                  /></NuxtLink>
                </template>
              </a-input> -->
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
              :rules="[{ required: true, message: $t('contract_value_require'), trigger: 'blur' }]"
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
        </a-row>
        <a-row :gutter="16">
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item name="created_date">
              <label for="created_date" class="flex mb-1">
                <span>{{ $t('created_date') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <!-- <a-input
                id="created_date"
                disabled
                readonly
                :value="convertToDate(contract.createdAt)"
                :placeholder="$t('created_date')"
              /> -->
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <!-- <a-form-item
              v-else
              :name="['newSignDate']"
              :rules="[
                {
                  validator: async (_: RuleObject, value: string) =>
                    validationRules.checkSignDate(_, value, $t, contract.startDate),
                  trigger: 'blur',
                },
              ]"
            >
              <label for="signed_date" class="flex mb-1">
                <span>{{ $t('signed_date') }}</span>
              </label>
              <a-date-picker
                id="signed_date"
                v-model:value="editContract.value.newSignDate"
                :disabled-date="disabledDate"
                class="w-full"
                :placeholder="$t('select_sign_date')"
              />
            </a-form-item> -->
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item name="active_date">
              <label for="active_date" class="flex mb-1">
                <span>{{ $t('active_date') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <!-- <a-input
                id="active_date"
                disabled
                readonly
                :value="convertToDate(contract.startDate)"
                :placeholder="$t('active_date')"
              /> -->
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item name="expire_date">
              <label for="expire_date" class="flex mb-1">
                <span>{{ $t('expire_date') }}</span>
              </label>
              <!-- <a-input
                id="expire_date"
                disabled
                readonly
                :value="
                  (editContract.value.status === COMMON.CONTRACT_STATUS.EXPIRED &&
                    contract.type !== COMMON.CONTRACT_TYPE.BUY) ||
                  editContract.value.status === COMMON.CONTRACT_STATUS.CANCELLED
                    ? currentDate
                    : contract.endDate.Valid && contract.endDate.Time
                      ? convertToDate(contract.endDate.Time)
                      : ''
                "
                :placeholder="$t('expire_date')"
                :class="[
                  (editContract.value.status === COMMON.CONTRACT_STATUS.EXPIRED &&
                    contract.type !== COMMON.CONTRACT_TYPE.BUY) ||
                  editContract.value.status === COMMON.CONTRACT_STATUS.CANCELLED
                    ? 'text-[#ff0000]'
                    : '',
                ]"
              /> -->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
            <a-form-item
              :name="['status']"
              :rules="[{ required: true, message: $t('please_select_contract_status'), trigger: 'blur' }]"
            >
              <label for="status" class="flex mb-1">
                <span>{{ $t('status') }}</span>
                <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
              </label>
              <!-- <ClientOnly>
                <a-select
                  id="status"
                  v-model:value="editContract.value.status"
                  placeholder="{{ $t('select_status') }}"
                  class="w-full text-left"
                >
                  <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{
                    $t('select_status')
                  }}</a-select-option>
                  <a-select-option
                    v-if="showActiveStatus"
                    :value="COMMON.CONTRACT_STATUS.ACTIVE"
                    :class="`text-[#50c433]`"
                    >{{ $t('active') }}</a-select-option
                  >
                  <a-select-option
                    v-if="showExpiredStatus"
                    :value="COMMON.CONTRACT_STATUS.EXPIRED"
                    :class="`text-[#888888]`"
                    >{{ $t('expired') }}</a-select-option
                  >
                  <a-select-option
                    v-if="showCancelledStatus"
                    :value="COMMON.CONTRACT_STATUS.CANCELLED"
                    :class="`text-[#ff0000]`"
                    >{{ $t('cancelled') }}</a-select-option
                  >
                  <a-select-option
                    v-if="showWaitingForSignatureStatus"
                    :value="COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE"
                    :class="`text-[#888888]`"
                    >{{ $t('wait_for_signature') }}</a-select-option
                  >
                  <a-select-option
                    v-if="showNotInEffectStatus"
                    :value="COMMON.CONTRACT_STATUS.NOT_IN_EFFECT"
                    :class="`text-[#888888]`"
                    >{{ $t('not_in_effect') }}</a-select-option
                  >
                </a-select>
              </ClientOnly> -->
            </a-form-item>
          </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
          <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
        </a-row>
        <div class="mt-10 flex items-center justify-between">
          <h1 class="text-2xl">{{ $t('paper_list') }}</h1>
          <div class="flex items-center">
            <a-button
              type="primary"
              :disabled="!fileListDeleteBucket.value.length"
              danger
              class="flex items-center justify-center w-8 h-8 rounded-sm mx-2"
              @click="
                () => {
                  // $event.emit('deleteItem', {
                  //   callback: () => {
                  //     editContract.value.files = editContract.value.files.filter(
                  //       (file) => !fileListDeleteBucket.value.includes(file.ID)
                  //     );
                  //     fileListDeleteBucket.value = [];
                  //   },
                  //   noPasswordRequired: true,
                  // });
                }
              "
              ><DeleteOutlined
            /></a-button>
            <a-button
              type="primary"
              class="flex items-center justify-center w-8 h-8 rounded-sm"
              @click="
                () => {
                  // addFilecounter++;
                  // editContract.value.files.push({
                  //   ID: -addFilecounter,
                  //   title: '',
                  //   path: [] as UploadFile[],
                  //   isNew: true,
                  // } as ContractFile);
                }
              "
              ><PlusOutlined
            /></a-button>
          </div>
        </div>
        <!-- <PaperListTable :edit-contract="editContract" :delete-bucket="fileListDeleteBucket" />
        <div class="mt-10 flex items-center justify-between">
          <h1 class="text-2xl">{{ $t('resident_list') }}</h1>
          <div class="flex items-center">
            <a-button
              class="flex items-center justify-center w-8 h-8 rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
              @click="resetResidentList"
            >
              <UndoOutlined />
            </a-button>
            <a-button
              type="primary"
              danger
              class="flex items-center justify-center w-8 h-8 rounded-sm mx-2"
              :disabled="!residentListDeleteBucket.value.length"
              @click="
                () => {
                  $event.emit('deleteItem', {
                    callback: () => {
                      editContract.value.residents.forEach((resident) => {
                        resident.isDeleted = residentListDeleteBucket.value.includes(resident.ID);
                      });
                      editContract.value.residents = editContract.value.residents.filter(
                        (resident) => !(residentListDeleteBucket.value.includes(resident.ID) && resident.isNew)
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
              class="flex items-center justify-center w-8 h-8 rounded-sm"
              @click="
                () => {
                  addResidentCounter++;
                  editContract.value.residents.push({
                    ID: -addResidentCounter,
                    firstName: '',
                    middleName: {
                      Valid: false,
                      String: '',
                    },
                    lastName: '',
                    ssn: '',
                    oldSSN: {
                      Valid: false,
                      String: '',
                    },
                    gender: 0,
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
                    isNew: true,
                    isDeleted: false,
                  });
                }
              "
              ><PlusOutlined
            /></a-button>
          </div>
        </div>
        <ResidentListTable
          :edit-contract="editContract"
          :delete-bucket="residentListDeleteBucket"
          :customers="customerList"
        /> -->
        <div class="flex flex-col items-center mt-5">
          <a-button class="w-[100px] rounded-sm" type="primary" html-type="submit">{{ $t('confirm') }}</a-button>
          <a-button class="w-[100px] rounded-sm mt-3" @click.prevent="navigateTo(pageRoutes.common.contract.list)">
            {{ $t('cancel') }}
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
import type { User } from '~/types/user';
import { COMMON } from '~/consts/common';
import type { Dayjs } from 'dayjs';
import { svgPaths } from '~/consts/svg_paths';
import type { AddContract } from '~/types/contract';
import type { Room, Building } from '~/types/building';

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
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event, $dayjs } = useNuxtApp();
const newContract = ref<AddContract>({
  buildingID: undefined,
  roomFloor: undefined,
  roomID: undefined,
  householderID: undefined,
  creatorID: undefined,
  type: undefined,
  value: undefined,
  signDate: '',
  startDate: '',
  endDate: '',
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

function disabledDate(current: Dayjs) {
  // Can not select days after today
  return current && current >= $dayjs().endOf('day');
}

async function addContract() {
  try {
    $event.emit('loading');

    // const formData = new FormData();
    // formData.append('status', editContract.value.value.status.toString());
    // if (editContract.value.value.newSignDate) {
    //   formData.append(
    //     'newSignDate',
    //     convertToDate((editContract.value.value.newSignDate as Dayjs).toDate().toISOString())
    //   );
    // }
    // const totalNewFiles = editContract.value.value.files.filter((file) => file.isNew).length;
    // formData.append('totalNewFiles', totalNewFiles.toString());
    // editContract.value.value.files
    //   .filter((file) => file.isNew)
    //   .forEach((file, index) => {
    //     formData.append(`file[${index}]file`, (file.path as UploadFile[])[0].originFileObj as File);
    //     formData.append(`file[${index}]title`, file.title || '');
    //   });
    // editContract.value.value.residents.forEach((resident) => {
    //   if (resident.isDeleted && !resident.isNew) {
    //     formData.append('removedResidents[]', resident.ID.toString());
    //   } else {
    //     const { userAccount, isNew, isDeleted, ...residentData } = resident;

    //     // Prepare resident data for submission
    //     const finalData = {
    //       firstName: residentData.firstName.trim(),
    //       middleName: residentData.middleName.String ? residentData.middleName.String.trim() : '',
    //       lastName: residentData.lastName.trim(),
    //       ssn: residentData.ssn.trim(),
    //       oldSSN: residentData.oldSSN.String ? residentData.oldSSN.String.trim() : '',
    //       phone: residentData.phone.String ? residentData.phone.String.trim() : '',
    //       email: residentData.email.String ? residentData.email.String.trim() : '',
    //       ID: residentData.ID <= 0 ? 0 : residentData.ID, // Ensure ID is 0 for new residents
    //       pob: residentData.pob.trim(),
    //       gender: resident.gender,
    //       userAccountID: residentData.userAccountID.Int64 ? residentData.userAccountID.Int64 : 0,
    //       relationWithHouseholder: residentData.relationWithHouseholder,
    //       dob:
    //         typeof residentData.dob === 'string'
    //           ? residentData.dob
    //           : convertToDate(residentData.dob.toDate().toISOString()),
    //     };

    //     formData.append('residents[]', JSON.stringify(finalData));
    //   }
    // });

    // await api.common.contract.updateContract(editContract.value.value.ID, formData);
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
  $event.emit('loading');
  await getCustomerList();
  await getBuildingList();
  $event.emit('loading');
});

// ---------------------- Watchers ----------------------
watch(offsetCustomer, getCustomerList);
watch(
  () => newContract.value.value,
  () => {
    if (newContract.value.value !== undefined && newContract.value.value < 0) {
      newContract.value.value = 0;
    }
  }
);
</script>
