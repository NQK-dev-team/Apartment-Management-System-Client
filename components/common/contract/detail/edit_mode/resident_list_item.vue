<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td class="text-sm text-center align-middle py-[16px]">
      <a-form-item
        class="border-r-[1px]"
        :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
        :name="`check_resident_${props.index + 1}`"
      >
        <a-checkbox
          :id="`check_resident_${props.index + 1}`"
          :checked="checked"
          @click="checked ? removeFromBucket() : addToBucket()"
        ></a-checkbox>
      </a-form-item>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <a-form-item
        name="row_no"
        class="border-r-[1px]"
        :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
      >
        {{ props.index + 1 }}
      </a-form-item>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item :name="`resident_${props.index + 1}`" class="px-3">
          <a-select
            :id="`resident_${props.index + 1}`"
            v-model:value="customerNo as string"
            class="w-full text-left"
            :class="[resident.userAccountID.Int64 ? '' : 'text-[#9ca3af]']"
            show-search
            :options="[
              ...customers.map((customer) => ({
                value: customer.ID,
                label: `${customer.no} - ${getUserName(customer)}`,
              })),
            ]"
            :allow-clear="true"
            :placeholder="$t('search_by_customer_no')"
            @change="
              resident.userAccountID.Int64 =
                customers.find((customer) => customerNo && customer.no.includes(customerNo))?.ID ?? 0;
              resident.userAccountID.Valid = !!resident.userAccountID.Int64;
            "
          ></a-select>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID.Int64" :name="`resident_${props.index + 1}_last_name`" class="px-3">
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
          class="px-3 align_validation_message_start"
        >
          <a-input
            :id="`resident_${props.index + 1}_last_name`"
            v-model:value="resident.lastName"
            :placeholder="$t('enter_customer_last_name')"
          ></a-input>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID.Int64" :name="`resident_${props.index + 1}_middle_name`" class="px-3">
          <a-input
            :id="`resident_${props.index + 1}_middle_name`"
            :value="
              customers.find((customer) => customerNo && customer.no.includes(customerNo))?.middleName?.String ?? ''
            "
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item v-else :name="`resident_${props.index + 1}_middle_name`" class="px-3">
          <a-input
            :id="`resident_${props.index + 1}_middle_name`"
            v-model:value="resident.middleName.String as string"
            :placeholder="$t('enter_customer_middle_name')"
            @change="
              () => {
                resident.middleName.Valid = !!resident.middleName.String;
              }
            "
          ></a-input>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID.Int64" :name="`resident_${props.index + 1}_first_name`" class="px-3">
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
          class="px-3 align_validation_message_start"
        >
          <a-input
            :id="`resident_${props.index + 1}_first_name`"
            v-model:value="resident.firstName"
            :placeholder="$t('enter_customer_first_name')"
          ></a-input>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID.Int64" :name="`resident_${props.index + 1}_gender`" class="px-3">
          <a-select
            :id="`resident_${props.index + 1}_gender`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.gender ?? 0"
            class="w-full text-left"
            :class="[
              (customers.find((customer) => customerNo && customer.no.includes(customerNo))?.gender ?? 0 === 0)
                ? 'default-selected'
                : '',
            ]"
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
          class="px-3 align_validation_message_start"
        >
          <a-select
            :id="`resident_${props.index + 1}_gender`"
            v-model:value="resident.gender"
            class="w-full text-left"
            :class="[resident.gender === 0 ? 'default-selected' : '']"
            :placeholder="$t('select_customer_gender')"
          >
            <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{
              $t('select_customer_gender')
            }}</a-select-option>
            <a-select-option :value="COMMON.USER_GENDER.MALE">{{ $t('male') }}</a-select-option>
            <a-select-option :value="COMMON.USER_GENDER.FEMALE">{{ $t('female') }}</a-select-option>
            <a-select-option :value="COMMON.USER_GENDER.OTHER">{{ $t('other') }}</a-select-option>
          </a-select>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID.Int64" :name="`resident_${props.index + 1}_dob`" class="px-3">
          <a-input
            :id="`resident_${props.index + 1}_dob`"
            :value="
              convertToDate(customers.find((customer) => customerNo && customer.no.includes(customerNo))?.dob ?? '')
            "
            disabled
            readonly
          />
        </a-form-item>
        <a-form-item
          v-else
          :name="['residents', props.index, 'dob']"
          :rules="[
            { required: true, message: $t('please_select_customer_birthdate'), trigger: 'blur' },
            {
              validator: async (_: RuleObject, value: string) => validationRules.dateOfBirth(_, value, $t, true),
              trigger: 'blur',
            },
          ]"
          class="px-3 align_validation_message_start"
        >
          <a-date-picker
            :id="`resident_${props.index + 1}_dob`"
            v-model:value="resident.dob"
            class="w-full"
            :placeholder="$t('select_customer_dob')"
          />
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID.Int64" :name="`resident_${props.index + 1}_pob`" class="px-3">
          <a-input
            :id="`resident_${props.index + 1}_pob`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.pob.String ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          :name="['residents', props.index, 'pob']"
          :rules="[{ required: true, message: $t('please_enter_customer_pob'), trigger: 'blur' }]"
          class="px-3 align_validation_message_start"
        >
          <a-input
            :id="`resident_${props.index + 1}_pob`"
            v-model:value="resident.pob.String as string"
            :placeholder="$t('enter_customer_pob')"
          ></a-input>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID.Int64" :name="`resident_${props.index + 1}_ssn`" class="px-3">
          <a-input
            :id="`resident_${props.index + 1}_ssn`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.ssn ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          :name="['residents', props.index, 'ssn']"
          :rules="[
            { required: true, message: $t('please_enter_customer_ssn'), trigger: 'blur' },
            { pattern: /^[0-9]{12}$/, message: $t('invalid_ssn'), trigger: 'blur' },
          ]"
          class="px-3 align_validation_message_start"
        >
          <a-input
            :id="`resident_${props.index + 1}_ssn`"
            v-model:value="resident.ssn.String as string"
            :placeholder="$t('enter_customer_ssn')"
          ></a-input>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID.Int64" :name="`resident_${props.index + 1}_old_ssn`" class="px-3">
          <a-input
            :id="`resident_${props.index + 1}_old_ssn`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.oldSSN?.String ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          :name="['residents', props.index, 'oldSSN', 'String']"
          :rules="[{ pattern: /^[0-9]{9}$/, message: $t('invalid_oldSSN'), trigger: 'blur' }]"
          class="px-3 align_validation_message_start"
        >
          <a-input
            :id="`resident_${props.index + 1}_old_ssn`"
            v-model:value="resident.oldSSN.String as string"
            :placeholder="$t('enter_customer_old_ssn')"
            @change="
              () => {
                resident.oldSSN.Valid = !!resident.oldSSN.String;
              }
            "
          ></a-input>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID.Int64" :name="`resident_${props.index + 1}_phone`" class="px-3">
          <a-input
            :id="`resident_${props.index + 1}_phone`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.phone ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          :name="['residents', props.index, 'phone', 'String']"
          :rules="[{ pattern: /^[0-9]{10}$/, message: $t('invalid_phone'), trigger: 'blur' }]"
          class="px-3 align_validation_message_start"
        >
          <a-input
            :id="`resident_${props.index + 1}_phone`"
            v-model:value="resident.phone.String as string"
            :placeholder="$t('enter_customer_phone')"
            @change="
              () => {
                resident.phone.Valid = !!resident.phone.String;
              }
            "
          ></a-input>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item v-if="resident.userAccountID.Int64" :name="`resident_${props.index + 1}_email`" class="px-3">
          <a-input
            :id="`resident_${props.index + 1}_email`"
            :value="customers.find((customer) => customerNo && customer.no.includes(customerNo))?.email ?? ''"
            disabled
            readonly
          ></a-input>
        </a-form-item>
        <a-form-item
          v-else
          :name="['residents', props.index, 'email', 'String']"
          :rules="[{ type: 'email', message: $t('email_invalid'), trigger: 'blur' }]"
          class="px-3 align_validation_message_start"
        >
          <a-input
            :id="`resident_${props.index + 1}_email`"
            v-model:value="resident.email.String as string"
            :placeholder="$t('enter_customer_email')"
            @change="
              () => {
                resident.email.Valid = !!resident.email.String;
              }
            "
          ></a-input>
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item
          class="px-3 align_validation_message_start"
          :name="['residents', props.index, 'relationWithHouseholder']"
          :rules="[
            {
              validator: async (_: RuleObject, value: number) =>
                validationRules.emptyResidentRelationship(_, value, $t),
              trigger: 'blur',
            },
          ]"
        >
          <a-select
            :id="`resident_${props.index + 1}_relationship_with_owner`"
            v-model:value="resident.relationWithHouseholder"
            class="w-full text-left"
            :class="[resident.relationWithHouseholder === 0 ? 'default-selected' : '']"
          >
            <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{
              $t('select_relationship')
            }}</a-select-option>
            <a-select-option :value="COMMON.RESIDENT_TYPE.SPOUSE">{{ $t('spouse') }}</a-select-option>
            <a-select-option :value="COMMON.RESIDENT_TYPE.CHILD">{{ $t('child') }}</a-select-option>
            <a-select-option :value="COMMON.RESIDENT_TYPE.PARENT">{{ $t('parent') }}</a-select-option>
            <a-select-option :value="COMMON.RESIDENT_TYPE.OTHER">{{ $t('other') }}</a-select-option>
          </a-select>
        </a-form-item>
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
// const { $dayjs } = useNuxtApp();
const deleteBucket = toRef(props, 'deleteBucket');
const resident = toRef(props, 'resident');
const checked = computed(() => deleteBucket.value.value.includes(resident.value.ID));
const customers = toRef(props, 'customers');
const customerNo = ref<string | null>(null);
const { $event } = useNuxtApp();

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

// ---------------------- Watchers ----------------------
watch(customers, () => {
  if (!customerNo.value) {
    customerNo.value =
      customers.value.find((customer) => customer.ID === resident.value.userAccountID.Int64)?.no ?? null;
  }
});

// ---------------------- Events ----------------------
$event.on('resetResidentListItemContractEditMode', () => {
  customerNo.value = customers.value.find((customer) => customer.ID === resident.value.userAccountID.Int64)?.no ?? null;
});
</script>
