<template>
  <a-form :model="formState" layout="vertical" name="nest-messages" :validate-messages="validateMessages"
    @finish="onFinish">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['customer', 'last_name']" :label="$t('last_name')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.last_name" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'middle_name']" :label="$t('middle_name')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.middle_name" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'first_name']" :label="$t('name')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.first_name" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'dob']" :label="$t('dob')" :rules="[{ type: 'date', required: true }]">
          <a-date-picker v-model:value="formState.customer.dob" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['customer', 'gender']" :label="$t('gender')" :rules="[{ type: 'string', required: true }]">
          <a-select ref="select" v-model:value="formState.customer.gender" style="width: 120px" :options="optionsGender"
            @change="handleChange" class="w-full"></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'ssn']" :label="$t('ssn')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.ssn" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'old_ssn']" :label="$t('old_ssn')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.old_ssn" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'origin']" :label="$t('origin')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.origin" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['customer', 'phone']" :label="$t('phone')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.phone" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['customer', 'email']" :label="$t('email')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.customer.email" />
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

const optionsGender = ref<SelectProps['options']>([
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
]);

const formState = reactive({
  customer: {
    last_name: '',
    middle_name: '',
    first_name: '',
    dob: '',
    gender: '',
    ssn: '',
    old_ssn: '',
    origin: '',
    phone: '',
    email: '',
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
