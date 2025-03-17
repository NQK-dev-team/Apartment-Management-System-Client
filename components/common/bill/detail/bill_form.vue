<template>
  <a-form :model="formState" layout="vertical" name="nest-messages" :validate-messages="validateMessages"
    @finish="onFinish">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['bill', 'building']" :label="$t('building')" :rules="[{ required: true }]">
          <a-input v-model:value="formState.bill.building" :disabled="true" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'address']" :label="$t('address')" :rules="[{ type: 'string' }]">
          <a-input v-model:value="formState.bill.address" :disabled="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'floor']" :label="$t('floor')" :rules="[{ type: 'number', min: 1, max: 99 }]">
          <a-input-number v-model:value="formState.bill.floor" :disabled="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'room']" :label="$t('room')" :rules="[{ type: 'string' }]">
          <a-input v-model:value="formState.bill.room" :disabled="true"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['bill', 'contract_id']" :label="$t('contract')" :rules="[{ type: 'string' }]">
          <a-input v-model:value="formState.bill.contract_id" :disabled="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'contract_type']" :label="$t('contract_type')" :rules="[{ type: 'string' }]">
          <a-input v-model:value="formState.bill.contract_type" :disabled="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'contract_price']" :label="$t('contract_price')" :rules="[{ type: 'number' }]">
          <a-input v-model:value="formState.bill.contract_price" :disabled="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'owner']" :label="$t('owner')" :rules="[{ type: 'string' }]">
          <a-input v-model:value="formState.bill.owner" :disabled="true"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['bill', 'owner_id']" :label="$t('owner_id')" :rules="[{ type: 'string' }]">
          <a-input v-model:value="formState.bill.owner_id" :disabled="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'payment_period']" :label="$t('payment_period')" :rules="[{ type: 'string' }]">
          <a-input v-model:value="formState.bill.payment_period" :disabled="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'status']" :label="$t('status')" :rules="[{ type: 'string' }]">
          <a-input v-model:value="formState.bill.status" :disabled="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'payment_date']" :label="$t('payment_date')" :rules="[{ type: 'date' }]">
          <a-date-picker v-model:value="formState.bill.payment_date" :disabled="true"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['bill', 'payer']" :label="$t('payer')" :rules="[{ type: 'string' }]">
          <a-input v-model:value="formState.bill.payer" :disabled="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['bill', 'payer_id']" :label="$t('payer_id')" :rules="[{ type: 'string' }]">
          <a-input v-model:value="formState.bill.payer_id" :disabled="true"/>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

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
