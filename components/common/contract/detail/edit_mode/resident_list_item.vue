<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td class="text-sm text-center align-middle py-[16px]">
      <a-form-item class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox
          :id="`check_resident_${props.index + 1}`"
          :checked="checked"
          @click="checked ? removeFromBucket() : addToBucket()"
        ></a-checkbox>
      </a-form-item>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <a-form-item class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        {{ props.index + 1 }}
      </a-form-item>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item class="px-3">
          <a-select
            :id="`resident_${props.index + 1}`"
            v-model:value="customerNo as string"
            class="w-full text-left"
            :class="[resident.userAccountID ? '' : 'text-[#9ca3af]']"
            show-search
            :options="[
              ...customers.map((customer) => ({
                value: customer.ID,
                label: `${customer.no} - ${getUserName(customer)}`,
              })),
            ]"
            :placeholder="$t('search_by_customer_no')"
            @change="
              resident.userAccountID =
                customers.find((customer) => customerNo && customer.no.includes(customerNo))?.ID ?? 0
            "
          ></a-select>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID !== 0" class="px-3 align_validation_message_start">
          <a-input
            :id="`resident_${props.index + 1}_last_name`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.lastName ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          :name="['residents', props.index, 'lastName']"
          :rules="[{ required: true, message: $t('customer_last_name_require'), trigger: 'blur' }]"
          class="px-3"
        >
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID !== 0" class="px-3">
          <a-input
            :id="`resident_${props.index + 1}_middle_name`"
            :value="
              customers.find((customer) => customerNo && customer.no.includes(customerNo))?.middleName?.String ?? ''
            "
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item v-else class="px-3"> </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID !== 0" class="px-3 align_validation_message_start">
          <a-input
            :id="`resident_${props.index + 1}_first_name`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.firstName ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          :name="['residents', props.index, 'firstName']"
          :rules="[{ required: true, message: $t('customer_first_name_require'), trigger: 'blur' }]"
          class="px-3"
        >
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID !== 0" class="px-3 align_validation_message_start">
          <a-select
            :id="`resident_${props.index + 1}_gender`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.gender ?? 0"
            class="w-full text-left"
            :class="[
              (customers.find((customer) => customerNo && customer.no.includes(customerNo))?.gender ?? 0 === 0)
                ? 'text-gray-500'
                : '',
            ]"
            :placeholder="$t('select_employee_gender')"
            disabled
            readonly
          >
            <a-select-option :value="COMMON.USER_GENDER.MALE">{{ $t('male') }}</a-select-option>
            <a-select-option :value="COMMON.USER_GENDER.FEMALE">{{ $t('female') }}</a-select-option>
            <a-select-option :value="COMMON.USER_GENDER.OTHER">{{ $t('other') }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-else
          :name="['residents', props.index, 'gender']"
          :rules="[{ required: true, message: $t('please_select_customer_gender'), trigger: 'blur' }]"
          class="px-3"
        >
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID !== 0" class="px-3 align_validation_message_start">
          <a-input
            :id="`resident_${props.index + 1}_dob`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.dob ?? ''"
            disabled
            readonly
          />
        </a-form-item>
        <a-form-item
          v-else
          name="dob"
          :rules="[
            { required: true, message: $t('please_select_customer_birthdate'), trigger: 'blur' },
            {
              validator: async (_: RuleObject, value: string) => validationRules.dateOfBirth(_, value, $t, true),
              trigger: 'blur',
            },
          ]"
          class="px-3"
        >
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID !== 0" class="px-3 align_validation_message_start">
          <a-input
            :id="`resident_${props.index + 1}_pob`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.pob ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          name="pob"
          :rules="[{ required: true, message: $t('please_enter_customer_pob'), trigger: 'blur' }]"
          class="px-3"
        >
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID !== 0" class="px-3 align_validation_message_start">
          <a-input
            :id="`resident_${props.index + 1}_ssn`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.ssn ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          name="ssn"
          :rules="[
            { required: true, message: $t('please_enter_customer_ssn'), trigger: 'blur' },
            { pattern: /^[0-9]{12}$/, message: $t('invalid_ssn'), trigger: 'blur' },
          ]"
          class="px-3"
        >
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID !== 0" class="px-3 align_validation_message_start">
          <a-input
            :id="`resident_${props.index + 1}_old_ssn`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.oldSSN?.String ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          name="oldSSN"
          :rules="[{ pattern: /^[0-9]{9}$/, message: $t('invalid_oldSSN'), trigger: 'blur' }]"
          class="px-3"
        >
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID !== 0" class="px-3 align_validation_message_start">
          <a-input
            :id="`resident_${props.index + 1}_phone`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.phone ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          name="phone"
          :rules="[
            { required: true, message: $t('please_enter_customer_phone'), trigger: 'blur' },
            { pattern: /^[0-9]{10}$/, message: $t('invalid_phone'), trigger: 'blur' },
          ]"
          class="px-3"
        >
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID !== 0" class="px-3 align_validation_message_start">
          <a-input
            :id="`resident_${props.index + 1}_email`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.email ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          name="email"
          :rules="[
            { required: true, message: $t('please_enter_customer_email'), trigger: 'blur' },
            { type: 'email', message: $t('email_invalid'), trigger: 'blur' },
          ]"
          class="px-3"
        >
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item class="px-3 align_validation_message_start"> </a-form-item>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { RoomResident } from '~/types/contract';
import type { User } from '~/types/user';
import { validationRules } from '~/consts/validation_rules';
import type { RuleObject } from 'ant-design-vue/es/form';
import { COMMON } from '~/consts/common';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  resident: {
    type: Object as PropType<RoomResident>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteBucket: {
    type: Object as PropType<{ value: number[] }>,
    required: true,
  },
  customers: {
    type: Array as PropType<User[]>,
    required: true,
  },
});
const deleteBucket = toRef(props, 'deleteBucket');
const resident = toRef(props, 'resident');
const checked = computed(() => deleteBucket.value.value.includes(resident.value.ID));
const customers = toRef(props, 'customers');
const customerNo = ref<string | null>(null);

// ---------------------- Functions ----------------------
function removeFromBucket() {
  const index = deleteBucket.value.value.indexOf(resident.value.ID);
  if (index !== -1) {
    deleteBucket.value.value.splice(index, 1);
  }
}

function addToBucket() {
  if (!deleteBucket.value.value.includes(resident.value.ID)) {
    deleteBucket.value.value.push(resident.value.ID);
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  customerNo.value = resident.value.userAccountID
    ? (customers.value.find((customer) => customer.ID === resident.value.userAccountID)?.no ?? null)
    : null;
});
</script>
