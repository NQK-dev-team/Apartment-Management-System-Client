<template>
  <a-form ref="editForm" :model="editContract.value">
    <h1 class="mt-5 text-2xl">{{ $t('contract_information') }}</h1>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
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
        <a-form-item>
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
        <a-form-item>
          <label for="room_floor" class="flex mb-1">
            <span>{{ $t('floor') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="room_floor" disabled readonly :value="contract.roomFloor" :placeholder="$t('floor')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
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
        <a-form-item>
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
        <a-form-item>
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
        <a-form-item>
          <label for="contract_id" class="flex mb-1">
            <span>{{ $t('contract_id') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="contract_id" disabled readonly :value="contract.ID" :placeholder="$t('contract_id')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
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
        <a-form-item>
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
        <a-form-item>
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
        <a-form-item>
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
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
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
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="expire_date" class="flex mb-1">
            <span>{{ $t('expire_date') }}</span>
          </label>
          <a-input
            id="expire_date"
            disabled
            readonly
            :value="contract.endDate.Valid && contract.endDate.Time ? convertToDate(contract.endDate.Time) : ''"
            :placeholder="$t('expire_date')"
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
          <a-select
            id="status"
            v-model:value="editContract.value.status"
            placeholder="{{ $t('select_status') }}"
            class="w-full text-left"
          >
            <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{ $t('select_status') }}</a-select-option>
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
          @click="() => {}"
        >
          <UndoOutlined />
        </a-button>
        <a-button
          type="primary"
          danger
          class="flex items-center justify-center w-8 h-8 rounded-sm mx-2"
          @click="() => {}"
          ><DeleteOutlined
        /></a-button>
        <a-button type="primary" class="flex items-center justify-center w-8 h-8 rounded-sm" @click="() => {}"
          ><PlusOutlined
        /></a-button>
      </div>
    </div>
    <CommonContractResidentList />
  </a-form>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';
import { svgPaths } from '~/consts/svg_paths';
import type { Contract, ContractFile } from '~/types/contract';
import PaperListTable from './edit_mode/paper_list_table.vue';
import type { UploadFile, FormInstance } from 'ant-design-vue';

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
const { $event } = useNuxtApp();
const userRole = useCookie('userRole');
const fileListDeleteBucket = ref({ value: [] as number[] });
const residentListDeleteBucket = ref({ value: [] as number[] });
const addFilecounter = ref(0);
const addResidentCounter = ref(0);
const editForm = ref<FormInstance>();

// ---------------------- Functions ----------------------
async function validateForm() {
  try {
    if (!editForm.value) return;
    await editForm.value.validateFields();
    $event.emit('validateFormSuccessUpdateContract');
  } catch (error) {
    /* empty */
  }
}

// ---------------------- Events ----------------------
$event.on('validateFormEditContract', validateForm);
</script>
