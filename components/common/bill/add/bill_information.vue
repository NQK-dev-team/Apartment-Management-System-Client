<template>
  <a-form :model="formState" v-bind="layout" name="nest-messages" :validate-messages="validateMessages"
    @finish="onFinish">
    <a-form-item :building="['bill', 'building']" :label="$t('building')" :rules="[{ required: true }]">
      <a-input v-model:value="formState.bill.building" />
    </a-form-item>
    <a-form-item :name="['bill', 'address']" :label="$t('address')" :rules="[{ type: 'string' }]">
      <a-input v-model:value="formState.bill.address" />
    </a-form-item>
    <a-form-item :name="['bill', 'floor']" :label="$t('floor')" :rules="[{ type: 'number', min: 1, max: 99 }]">
      <a-input-number v-model:value="formState.bill.floor" />
    </a-form-item>
    <a-form-item :name="['bill', 'room']" :label="$t('room')" :rules="[{ type: 'string' }]">
      <a-input v-model:value="formState.bill.room" />
    </a-form-item>
    <a-form-item :name="['bill', 'contract_id']" :label="$t('contract')" :rules="[{ type: 'string' }]">
      <a-input v-model:value="formState.bill.contract_id" />
    </a-form-item>
    <a-form-item :name="['bill', 'contract_type']" :label="$t('contract_type')" :rules="[{ type: 'string' }]">
      <a-input v-model:value="formState.bill.contract_type" />
    </a-form-item>
    <a-form-item :name="['bill', 'contract_price']" :label="$t('contract_price')" :rules="[{ type: 'number' }]">
      <a-input v-model:value="formState.bill.contract_price" />
    </a-form-item>
    <a-form-item :name="['bill', 'owner']" :label="$t('owner')" :rules="[{ type: 'string' }]">
      <a-input v-model:value="formState.bill.owner" />
    </a-form-item>
    <a-form-item :name="['bill', 'owner_id']" :label="$t('owner_id')" :rules="[{ type: 'string' }]">
      <a-input v-model:value="formState.bill.owner_id" />
    </a-form-item>
    <a-form-item :name="['bill', 'payment_period']" :label="$t('payment_period')" :rules="[{ type: 'string' }]">
      <a-input v-model:value="formState.bill.payment_period" />
    </a-form-item>
    <!-- change to dropdown later -->
    <a-form-item :name="['bill', 'status']" :label="$t('status')" :rules="[{ type: 'string' }]">
      <a-input v-model:value="formState.bill.status" />
    </a-form-item>
    <a-form-item :name="['bill', 'payment_date']" :label="$t('payment_date')" :rules="[{ type: 'date' }]">
      <a-input v-model:value="formState.bill.payment_date" />
    </a-form-item>
    <a-form-item :name="['bill', 'payer']" :label="$t('payer')" :rules="[{ type: 'string' }]">
      <a-input v-model:value="formState.bill.payer" />
    </a-form-item>
    <a-form-item :name="['bill', 'payer_id']" :label="$t('payer_id')" :rules="[{ type: 'string' }]">
      <a-input v-model:value="formState.bill.payer_id" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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
</script>
