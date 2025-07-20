<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td class="text-sm text-center align-middle py-[16px]">
      <a-form-item
        class="border-r-[1px]"
        :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
        :name="`check_payment_${props.index + 1}`"
      >
        <a-checkbox
          :id="`check_payment_${props.index + 1}`"
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
        <a-form-item
          :name="['billPayments', props.index, 'name']"
          :rules="[{ required: true, message: $t('payment_name_require'), trigger: 'blur' }]"
          class="px-3 align_validation_message_start"
        >
          <a-input
            :id="`payment_${props.index + 1}_name`"
            v-model:value="payment.name"
            :placeholder="$t('enter_payment_name')"
            type="text"
          />
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item
          :name="['billPayments', props.index, 'amount']"
          :rules="[
            { required: true, message: $t('payment_amount_require'), trigger: 'blur' },
            {
              validator: async (_: RuleObject, value: string) =>
                validationRules.checkNonNegative(_, value, $t, 'payment_amount_invalid'),
              trigger: 'blur',
            },
          ]"
          class="px-3 align_validation_message_start"
        >
          <a-input
            :id="`payment_${props.index + 1}_amount`"
            v-model:value="payment.amount"
            :placeholder="$t('enter_payment_amount')"
            type="number"
            :min="0"
          />
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item :name="`payment_${props.index + 1}_note`" class="px-3 align_validation_message_start">
          <a-textarea
            :id="`payment_${props.index + 1}_note`"
            v-model:value="payment.note.String as string"
            :placeholder="$t('enter_payment_note')"
            type="text"
          />
        </a-form-item>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { validationRules } from '~/consts/validation_rules';
import type { BillPayment } from '~/types/bill';
import type { RuleObject } from 'ant-design-vue/es/form';

// ---------------------- Variables ----------------------
const props = defineProps({
  payment: {
    type: Object as () => BillPayment,
    required: true,
  },
  deleteBucket: {
    type: Object as () => { value: number[] },
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const payment = toRef(props, 'payment');
const deleteBucket = toRef(props, 'deleteBucket');
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const checked = computed(() => deleteBucket.value.value.includes(payment.value.ID));

// ---------------------- Functions ----------------------
function removeFromBucket() {
  const index = deleteBucket.value.value.indexOf(payment.value.ID);
  if (index !== -1) {
    deleteBucket.value.value.splice(index, 1);
  }
}

function addToBucket() {
  if (!deleteBucket.value.value.includes(payment.value.ID)) {
    deleteBucket.value.value.push(payment.value.ID);
  }
}

// // ---------------------- Watchers ----------------------
// watch(
//   () => payment.value.amount,
//   () => {
//     setTimeout(() => {
//       if (payment.value.amount !== undefined && payment.value.amount < 0) {
//         payment.value.amount = 0;
//       }
//     }, 1000);
//   }
// );
</script>
