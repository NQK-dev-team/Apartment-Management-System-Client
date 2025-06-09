<template>
  <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
    <h1 class="mt-5 text-2xl">{{ $t('contract_information') }}</h1>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="building_name" class="flex mb-1">
          <span>{{ $t('building') }}</span>
        </label>
        <a-input id="building_name" disabled readonly :placeholder="$t('building_name')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="building_address" class="flex mb-1">
          <span>{{ $t('building_address') }}</span>
        </label>
        <a-input id="building_address" disabled readonly :placeholder="$t('building_address')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="room_floor" class="flex mb-1">
          <span>{{ $t('floor') }}</span>
        </label>
        <a-input id="room_floor" disabled readonly :placeholder="$t('floor')"
      /></a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="room_no" class="flex mb-1">
          <span>{{ $t('room_no') }}</span>
        </label>
        <a-input id="room_no" disabled readonly :placeholder="$t('room_no')"
      /></a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="customer_no" class="flex mb-1">
          <span>{{ $t('customer_no') }}</span>
        </label>
        <a-input id="customer_no" disabled readonly :placeholder="$t('customer_no')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="employee_number" class="flex mb-1">
          <span>{{ $t('employee_number') }}</span>
        </label>
        <a-input id="employee_number" disabled readonly :placeholder="$t('employee_number')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="contract_id" class="flex mb-1">
          <span>{{ $t('contract_id') }}</span>
        </label>
        <a-input id="contract_id" disabled readonly :placeholder="$t('contract_id')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="contract_type" class="flex mb-1">
          <span>{{ $t('contract_type') }}</span>
        </label>
        <a-input id="contract_type" disabled readonly :placeholder="$t('contract_type')" />
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="contract_value" class="flex mb-1">
          <span>{{ $t('contract_value') }}</span>
        </label>
        <a-input id="contract_value" disabled readonly :placeholder="$t('contract_value')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="created_date" class="flex mb-1">
          <span>{{ $t('created_date') }}</span>
        </label>
        <a-input id="created_date" disabled readonly :placeholder="$t('created_date')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="signed_date" class="flex mb-1">
          <span>{{ $t('signed_date') }}</span>
        </label>
        <a-input id="signed_date" disabled readonly :placeholder="$t('signed_date')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="active_date" class="flex mb-1">
          <span>{{ $t('active_date') }}</span>
        </label>
        <a-input id="active_date" disabled readonly :placeholder="$t('active_date')" />
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="signed_date" class="flex mb-1">
          <span>{{ $t('signed_date') }}</span>
        </label>
        <a-input id="signed_date" disabled readonly :placeholder="$t('signed_date')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="active_date" class="flex mb-1">
          <span>{{ $t('active_date') }}</span>
        </label>
        <a-input id="active_date" disabled readonly :placeholder="$t('active_date')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
    </a-row>
    <h1 class="mt-5 text-2xl">{{ $t('other_resident_list') }}</h1>
    <CommonContractResidentList />
    <h1 class="mt-5 text-2xl">{{ $t('bill_list') }}</h1>
    <CommonContractBillList />
  </div>
</template>

<script lang="ts" setup>
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
});
const contract = toRef(props, 'contract');
</script>
