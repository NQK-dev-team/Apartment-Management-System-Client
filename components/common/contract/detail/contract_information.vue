<template>
  <a-form :model="formState" layout="vertical" name="nest-messages" :validate-messages="validateMessages"
    @finish="onFinish">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['contract', 'building']" :label="$t('building')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.contract.building" :disabled="true" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'address']" :label="$t('address')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.contract.address" :disabled="true" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'floor']" :label="$t('floor')" :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.contract.floor" :disabled="true" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'room']" :label="$t('room')" :rules="[{ type: 'string', required: true }]">
          <a-date-picker v-model:value="formState.contract.room" :disabled="true" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['contract', 'ID']" :label="$t('contract_id')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.contract.id" :disabled="true" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'type']" :label="$t('contract_type')"
          :rules="[{ type: 'number', required: true }]">
          <a-select ref="select" v-model:value="formState.contract.type" style="width: 120px" :options="optionsType"
            :disabled="true" @change="handleChange" class="w-full"></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'value']" :label="$t('contract_value')"
          :rules="[{ type: 'number', required: true }]">
          <a-input v-model:value="formState.contract.value" :disabled="true" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'created']" :label="$t('created_date')"
          :rules="[{ type: 'date', required: true }]">
          <a-date-picker v-model:value="formState.contract.created" :disabled="true" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item :name="['contract', 'signed']" :label="$t('signed_date')"
          :rules="[{ type: 'date', required: true }]">
          <a-date-picker v-model:value="formState.contract.signed" :disabled="true" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'active']" :label="$t('active_date')"
          :rules="[{ type: 'date', required: true }]">
          <a-date-picker v-model:value="formState.contract.active" :disabled="true" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'expire']" :label="$t('expire_date')"
          :rules="[{ type: 'date', required: true }]">
          <a-date-picker v-model:value="formState.contract.expire" :disabled="true" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'status']" :label="$t('status')" :rules="[{ type: 'number', required: true }]">
          <a-select ref="select" v-model:value="formState.contract.status" style="width: 120px" :options="optionsStatus"
            :disabled="true" @change="handleChange" class="w-full"></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'customer_id']" :label="$t('customer_id')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.contract.id" :disabled="true"/>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item :name="['contract', 'employee_id']" :label="$t('employeeID')"
          :rules="[{ type: 'string', required: true }]">
          <a-input v-model:value="formState.contract.id" :disabled="true" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { SelectProps } from 'ant-design-vue';
import type { SelectValue } from 'ant-design-vue/es/select';

const { t } = useI18n();

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

const optionsType = ref<SelectProps['options']>([
  { value: 1, label: t('rent') },
  { value: 2, label: t('buy') },
]);

const optionsStatus = ref<SelectProps['options']>([
  {
    value: 0, label: t('inactive')
  },
  { value: 1, label: t('active') },
]);

const formState = reactive({
  contract: {
    building: '',
    address: '',
    floor: '',
    room: '',
    id: '',
    type: '',
    value: '',
    created: '',
    signed: '',
    active: '',
    expire: '',
    status: '',
    customer_id: '',
    employee_id: '',
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
