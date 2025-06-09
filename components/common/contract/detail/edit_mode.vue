<template>
  <a-form class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
    <h1 class="mt-5 text-2xl">{{ $t('contract_information') }}</h1>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="building_name" class="flex mb-1">
            <span>{{ $t('building') }}</span>
          </label>
          <a-input id="building_name" disabled readonly :placeholder="$t('building_name')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="building_address" class="flex mb-1">
            <span>{{ $t('building_address') }}</span>
          </label>
          <a-input id="building_address" disabled readonly :placeholder="$t('building_address')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="room_floor" class="flex mb-1">
            <span>{{ $t('floor') }}</span>
          </label>
          <a-input id="room_floor" disabled readonly :placeholder="$t('floor')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="room_no" class="flex mb-1">
            <span>{{ $t('room_no') }}</span>
          </label>
          <a-input id="room_no" disabled readonly :placeholder="$t('room_no')" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="customer_no" class="flex mb-1">
            <span>{{ $t('customer_no') }}</span>
          </label>
          <a-input id="customer_no" disabled readonly :placeholder="$t('customer_no')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="employee_number" class="flex mb-1">
            <span>{{ $t('employee_number') }}</span>
          </label>
          <a-input id="employee_number" disabled readonly :placeholder="$t('employee_number')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="contract_id" class="flex mb-1">
            <span>{{ $t('contract_id') }}</span>
          </label>
          <a-input id="contract_id" disabled readonly :placeholder="$t('contract_id')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="contract_type" class="flex mb-1">
            <span>{{ $t('contract_type') }}</span>
          </label>
          <a-input id="contract_type" disabled readonly :placeholder="$t('contract_type')" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="contract_value" class="flex mb-1">
            <span>{{ $t('contract_value') }}</span>
          </label>
          <a-input id="contract_value" disabled readonly :placeholder="$t('contract_value')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="created_date" class="flex mb-1">
            <span>{{ $t('created_date') }}</span>
          </label>
          <a-input id="created_date" disabled readonly :placeholder="$t('created_date')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="signed_date" class="flex mb-1">
            <span>{{ $t('signed_date') }}</span>
          </label>
          <a-input id="signed_date" disabled readonly :placeholder="$t('signed_date')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="active_date" class="flex mb-1">
            <span>{{ $t('active_date') }}</span>
          </label>
          <a-input id="active_date" disabled readonly :placeholder="$t('active_date')" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="signed_date" class="flex mb-1">
            <span>{{ $t('signed_date') }}</span>
          </label>
          <a-input id="signed_date" disabled readonly :placeholder="$t('signed_date')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item>
          <label for="active_date" class="flex mb-1">
            <span>{{ $t('active_date') }}</span>
          </label>
          <a-input id="active_date" disabled readonly :placeholder="$t('active_date')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
    </a-row>
    <div class="mt-5 flex items-center justify-between">
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
    <div class="mt-5 flex items-center justify-between">
      <h1 class="text-2xl">{{ $t('bill_list') }}</h1>
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
    <CommonContractBillList />
  </a-form>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { svgPaths } from '~/consts/svg_paths';
import { api } from '~/services/api';
import type { Building } from '~/types/building';
import type { Contract } from '~/types/contract';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
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
const buildings = ref<Building[]>([]);
const { $event } = useNuxtApp();

// ---------------------- Functions ----------------------
async function getBuildings() {
  try {
    $event.emit('loading');
    const response = await api.common.building.getList();
    buildings.value = response.data;

    $event.emit('editModeContractOn');
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      $event.emit('errorEditContract');
    }
  } finally {
    $event.emit('loading');
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getBuildings();
});
</script>
