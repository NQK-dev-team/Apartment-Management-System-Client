<template>
  <a-form :model="formState" layout="vertical" name="nest-messages" :validate-messages="validateMessages"
    @finish="onFinish">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['bill', 'building']" :label="$t('building')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.bill.building" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'address']" :label="$t('address')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.bill.address" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'floor']" :label="$t('floor')"
          :rules="[{ type: 'number', min: 1, max: 99, required: true }]">
          <a-input-number v-model:value="formState.bill.floor" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'room']" :label="$t('room')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.bill.room" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['bill', 'contract_id']" :label="$t('contract')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.bill.contract_id" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'contract_type']" :label="$t('contract_type')"
          :rules="[{ type: 'string', required: true }]">
          <a-select ref="select" v-model:value="formState.bill.contract_type" style="width: 120px"
            :options="optionsContractType" @change="handleChange" class="w-full"></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'contract_price']" :label="$t('contract_price')"
          :rules="[{ type: 'number', required: true }]">
          <a-input v-model:value="formState.bill.contract_price" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'owner']" :label="$t('owner')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.bill.owner" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['bill', 'owner_id']" :label="$t('owner_id')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.bill.owner_id" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'payment_period']" :label="$t('payment_period')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.bill.payment_period" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'status']" :label="$t('status')" :rules="[{ type: 'number', required: true }]">
          <a-select ref="select" v-model:value="formState.bill.status" style="width: 120px" :options="optionsStatus"
            @change="handleChange" class="w-full"></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'payment_date']" :label="$t('payment_date')"
          :rules="[{ type: 'date', required: true }]">
          <a-date-picker v-model:value="formState.bill.payment_date" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['bill', 'payer']" :label="$t('paid_by')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.bill.payer" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'payer_id']" :label="$t('payer_id')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.bill.payer_id" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { SelectProps } from 'ant-design-vue';
import type { SelectValue } from 'ant-design-vue/es/select';

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const optionsContractType = ref<SelectProps['options']>([
  { value: 'Buy', label: 'Buy' },
  { value: 'Rent', label: 'Rent' },
]);

const optionsStatus = ref<SelectProps['options']>([
  { value: 0, label: 'Unpaid' },
  { value: 1, label: 'Paid' },
]);

const formState = reactive({
  bill: {
    building: '',
    address: '',
    floor: 1,
    room: '',
    contract_id: '',
    contract_type: '',
    contract_price: 0,
    owner: '',
    owner_id: '',
    payment_period: '',
    status: '',
    payment_date: '',
    payer: '',
    payer_id: '',
  },
});

const onFinish = (values: any) => {
  console.log('Success:', values);
};
const handleChange = (value: SelectValue) => {
  if (typeof value === 'string') {
    console.log('Selected contract type:', value);
  } else {
    console.log('Invalid contract type selected:', value);
  }
};
</script>
