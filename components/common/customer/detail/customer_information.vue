<template>
  <a-form :model="formState" layout="vertical" name="nest-messages" :validate-messages="validateMessages" @finish="onFinish">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['customer', 'last_name']" :label="$t('last_name')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.last_name" :disable="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'middle_name']" :label="$t('middle_name')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.middle_name" :disable="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'first_name']" :label="$t('name')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.first_name" :disable="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'dob']" :label="$t('dob')" :rules="[{ type: 'date', required: true }]">
          <a-date-picker v-model:value="formState.customer.dob" :disable="true"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['customer', 'gender']" :label="$t('gender')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.gender" :disable="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'ssn']" :label="$t('ssn')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.ssn" :disable="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'old_ssn']" :label="$t('old_ssn')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.old_ssn" :disable="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'origin']" :label="$t('origin')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.origin" :disable="true"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['customer', 'phone']" :label="$t('phone')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.phone" :disable="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'email']" :label="$t('email')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.email" :disable="true"/>
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
  customer: {
    last_name: '',
    middle_name: '',
    first_name:'',
    dob:'',
    gender:'',
    ssn:'',
    old_ssn:'',
    origin:'',
    phone:'',
    email:'',
  },
});

const onFinish = (values: any) => {
  console.log('Success:', values);
};
</script>
