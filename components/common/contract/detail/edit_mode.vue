<template>
  <a-form
    v-if="
      (userRole?.toString() === roles.manager || userRole?.toString() === roles.owner) &&
      contract.status !== COMMON.CONTRACT_STATUS.EXPIRED &&
      contract.status !== COMMON.CONTRACT_STATUS.CANCELLED
    "
    ref="editForm"
    :model="editContract.value"
  >
    <h1 class="mt-5 text-2xl">{{ $t('contract_information') }}</h1>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="building_name">
          <label for="building_name" class="flex mb-1">
            <span>{{ $t('building') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="building_name"
            disabled
            readonly
            :value="contract.buildingName"
            :placeholder="$t('building_name')"
          />
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
            :value="contract.buildingAddress"
            :placeholder="$t('building_address')"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="room_floor">
          <label for="room_floor" class="flex mb-1">
            <span>{{ $t('floor') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="room_floor" disabled readonly :value="contract.roomFloor" :placeholder="$t('floor')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="room_no">
          <label for="room_no" class="flex mb-1">
            <span>{{ $t('room_no') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="room_no" disabled readonly :value="contract.roomNo" :placeholder="$t('room_no')" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="customer_no">
          <label for="customer_no" class="flex mb-1">
            <span>{{ $t('customer_no') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="customer_no" disabled readonly :value="contract.householder.no" :placeholder="$t('customer_no')">
            <template #suffix>
              <NuxtLink
                :to="
                  userRole?.toString() === roles.customer
                    ? pageRoutes.common.profile.index
                    : pageRoutes.common.customer.detail(contract.householderID)
                "
                :title="$t('detail')"
                ><LinkOutlined
              /></NuxtLink>
            </template>
          </a-input>
        </a-form-item>
      </a-col>
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
          </a-input>
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="contract_id">
          <label for="contract_id" class="flex mb-1">
            <span>{{ $t('contract_id') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="contract_id" disabled readonly :value="contract.ID" :placeholder="$t('contract_id')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="contract_type">
          <label for="contract_type" class="flex mb-1">
            <span>{{ $t('contract_type') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="contract_type"
            disabled
            readonly
            :value="$t(`${getContractType(contract.type)}`)"
            :placeholder="$t('contract_type')"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="contract_value">
          <label for="contract_value" class="flex mb-1">
            <span>{{ $t('contract_value') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="contract_value"
            disabled
            readonly
            :value="formatPrice(contract.value)"
            :placeholder="$t('contract_value')"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="created_date">
          <label for="created_date" class="flex mb-1">
            <span>{{ $t('created_date') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="created_date"
            disabled
            readonly
            :value="convertToDate(contract.createdAt)"
            :placeholder="$t('created_date')"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="active_date">
          <label for="active_date" class="flex mb-1">
            <span>{{ $t('active_date') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="active_date"
            disabled
            readonly
            :value="convertToDate(contract.startDate)"
            :placeholder="$t('active_date')"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="expire_date">
          <label for="expire_date" class="flex mb-1">
            <span>{{ $t('expire_date') }}</span>
          </label>
          <a-input
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
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item v-if="contract.signDate.Valid && contract.signDate.Time" name="signed_date">
          <label for="signed_date" class="flex mb-1">
            <span>{{ $t('signed_date') }}</span>
          </label>
          <a-input
            id="signed_date"
            disabled
            readonly
            :value="contract.signDate.Valid && contract.signDate.Time ? convertToDate(contract.signDate.Time) : ''"
            :placeholder="$t('signed_date')"
          />
        </a-form-item>
        <a-form-item
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
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item
          :name="['status']"
          :rules="[{ required: true, message: $t('please_select_contract_status'), trigger: 'blur' }]"
        >
          <label for="status" class="flex mb-1">
            <span>{{ $t('status') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <ClientOnly>
            <a-select
              id="status"
              v-model:value="editContract.value.status"
              placeholder="{{ $t('select_status') }}"
              class="w-full text-left"
            >
              <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{ $t('select_status') }}</a-select-option>
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
          </ClientOnly>
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
              $event.emit('deleteItem', {
                callback: () => {
                  editContract.value.files = editContract.value.files.filter(
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
              editContract.value.files.push({
                ID: -addFilecounter,
                title: '',
                path: [] as UploadFile[],
                isNew: true,
              } as ContractFile);
            }
          "
          ><PlusOutlined
        /></a-button>
      </div>
    </div>
    <PaperListTable :edit-contract="editContract" :delete-bucket="fileListDeleteBucket" />
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
    />
  </a-form>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';
import { svgPaths } from '~/consts/svg_paths';
import type { Contract, ContractFile, RoomResident } from '~/types/contract';
import PaperListTable from './edit_mode/paper_list_table.vue';
import ResidentListTable from './edit_mode/resident_list_table.vue';
import type { UploadFile, FormInstance } from 'ant-design-vue';
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import type { User } from '~/types/user';
import type { RuleObject } from 'ant-design-vue/es/form';
import { validationRules } from '~/consts/validation_rules';
import type { Dayjs } from 'dayjs';

// ---------------------- Variables ----------------------
const props = defineProps({
  contract: {
    type: Object as PropType<Contract>,
    required: true,
  },
  editContract: {
    type: Object as PropType<{ value: Contract }>,
    required: true,
  },
});
const contract = toRef(props, 'contract');
const editContract = toRef(props, 'editContract');
const { $event, $dayjs } = useNuxtApp();
const { t } = useI18n();
const userRole = useCookie('userRole');
const fileListDeleteBucket = ref({ value: [] as number[] });
const residentListDeleteBucket = ref({ value: [] as number[] });
const addFilecounter = ref(0);
const addResidentCounter = ref(0);
const editForm = ref<FormInstance>();
const offsetCustomer = ref(0);
const limitCustomer = ref(500);
const customerList = ref<User[]>([]);
const currentDate = convertToDate(new Date().toISOString());
const isSignDateSet = computed(
  () => (contract.value.signDate.Valid && contract.value.signDate.Time) || editContract.value.value.newSignDate
);
const isContractActive = computed(() => {
  return !$dayjs().isBefore($dayjs(contract.value.startDate));
});
const showActiveStatus = computed(() => isSignDateSet.value && isContractActive.value);
const showExpiredStatus = computed(
  () => isSignDateSet.value && isContractActive.value && contract.value.type !== COMMON.CONTRACT_TYPE.BUY
);
const showCancelledStatus = computed(() => true);
const showWaitingForSignatureStatus = computed(() => !isSignDateSet.value && !isContractActive.value);
const showNotInEffectStatus = computed(() => isSignDateSet.value && !isContractActive.value);

// ---------------------- Functions ----------------------
async function clearResidentListValidation() {
  try {
    if (!editForm.value) return;
    editForm.value.clearValidate();
    await editForm.value.validateFields();
  } catch (error) {
    /* empty */
  }
}

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

function resetResidentList() {
  residentListDeleteBucket.value.value = [];
  editContract.value.value.residents = [];
  const residents: RoomResident[] = JSON.parse(JSON.stringify(contract.value.residents));
  for (let i = 0; i < residents.length; i++) {
    residents[i].dob = residents[i].dob ? $dayjs(residents[i].dob) : '';
  }
  editContract.value.value.residents = residents;
  clearResidentListValidation();
  setTimeout(() => {
    $event.emit('resetResidentListItemContractEditMode');
  }, 100);
}

function disabledDate(current: Dayjs) {
  // Can not select days after today
  return current && current >= $dayjs().endOf('day');
}

async function updateContract() {
  try {
    $event.emit('loading');

    const formData = new FormData();
    formData.append('status', editContract.value.value.status.toString());
    if (editContract.value.value.newSignDate) {
      formData.append(
        'newSignDate',
        convertToDate((editContract.value.value.newSignDate as Dayjs).toDate().toISOString())
      );
    }
    const totalNewFiles = editContract.value.value.files.filter((file) => file.isNew).length;
    formData.append('totalNewFiles', totalNewFiles.toString());
    editContract.value.value.files
      .filter((file) => file.isNew)
      .forEach((file, index) => {
        formData.append(`file[${index}]file`, (file.path as UploadFile[])[0].originFileObj as File);
        formData.append(`file[${index}]title`, file.title || '');
      });
    editContract.value.value.residents.forEach((resident) => {
      if (resident.isDeleted && !resident.isNew) {
        formData.append('removedResidents[]', resident.ID.toString());
      } else {
        const { userAccount, isNew, isDeleted, ...residentData } = resident;

        // Prepare resident data for submission
        const finalData = {
          firstName: residentData.firstName.trim(),
          middleName: residentData.middleName.String ? residentData.middleName.String.trim() : '',
          lastName: residentData.lastName.trim(),
          ssn: residentData.ssn.trim(),
          oldSSN: residentData.oldSSN.String ? residentData.oldSSN.String.trim() : '',
          phone: residentData.phone.String ? residentData.phone.String.trim() : '',
          email: residentData.email.String ? residentData.email.String.trim() : '',
          ID: residentData.ID <= 0 ? 0 : residentData.ID, // Ensure ID is 0 for new residents
          pob: residentData.pob.trim(),
          gender: resident.gender,
          userAccountID: residentData.userAccountID.Int64 ? residentData.userAccountID.Int64 : 0,
          relationWithHouseholder: residentData.relationWithHouseholder,
          dob:
            typeof residentData.dob === 'string'
              ? residentData.dob
              : convertToDate(residentData.dob.toDate().toISOString()),
        };

        formData.append('residents[]', JSON.stringify(finalData));
      }
    });

    await api.common.contract.updateContract(editContract.value.value.ID, formData);
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
    if (!editForm.value) return;
    await editForm.value.validateFields();

    $event.emit('updateItem', {
      callback: updateContract,
      updateModalContent: 'confirm_update_contract',
    });
  } catch (err: any) {
    /* empty */
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  if (userRole.value?.toString() === roles.manager || userRole.value?.toString() === roles.owner) {
    getCustomerList();
  }
});

// ---------------------- Events ----------------------
$event.on('cancelContractEditMode', () => {
  fileListDeleteBucket.value = { value: [] };
  residentListDeleteBucket.value = { value: [] };
  addFilecounter.value = 0;
  addResidentCounter.value = 0;
});
$event.on('updateContract', validateForm);

// ---------------------- Watchers ----------------------
watch(offsetCustomer, getCustomerList);
watch(
  () => editContract.value.value.newSignDate,
  () => {
    if (!editContract.value.value.newSignDate) {
      editContract.value.value.status = COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE;
    } else {
      if (!isContractActive.value) {
        editContract.value.value.status = COMMON.CONTRACT_STATUS.NOT_IN_EFFECT;
      } else {
        editContract.value.value.status = COMMON.CONTRACT_STATUS.ACTIVE;
      }
    }
  }
);
</script>
