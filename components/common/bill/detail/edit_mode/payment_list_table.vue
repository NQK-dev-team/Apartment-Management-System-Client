<template>
  <div class="mt-3 mb-2 overflow-x-auto">
    <table class="w-full min-w-[500px]">
      <thead
        class="border-b-[1px]"
        :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
      >
        <tr>
          <th class="text-sm text-center align-middle py-[16px] rounded-tl-lg w-[40px]">
            <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
              <a-checkbox
                id="check_all_files_1"
                :disabled="!payments.some((payment) => !payment.isDeleted)"
                :checked="checkAllPayments"
                @click="() => (checkAllPayments ? removeAllPaymentsFromBucket() : addAllPaymentsToBucket())"
              ></a-checkbox>
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
            <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
              {{ $t('no') }}
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] min-w-[700px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('payment_name') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] min-w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('amount') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] min-w-[500px] rounded-tr-lg">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('note') }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="payments.filter((payment) => !payment.isDeleted).length">
        <CommonBillDetailEditModePaymentListItem
          v-for="(payment, index) in payments.filter((p) => !p.isDeleted)"
          :key="index"
          :index="index"
          :payment="payment"
          :delete-bucket="deleteBucket"
        />
      </tbody>
      <tbody v-else>
        <tr class="h-[150px]">
          <td :colspan="100" class="border-b-[1px]" :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']">
            <div class="h-full w-full">
              <div
                class="flex flex-col items-center justify-center overflow-hidden"
                :style="{ width: `${pageContentWidth - 2}px` }"
              >
                <svg v-if="lightMode" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                    <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                    <g fill-rule="nonzero" stroke="#d9d9d9">
                      <path
                        d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                      ></path>
                      <path
                        d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                        fill="#fafafa"
                      ></path>
                    </g>
                  </g>
                </svg>
                <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                    <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                    <g fill-rule="nonzero" stroke="#3e3e3e">
                      <path
                        d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                      ></path>
                      <path
                        d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                        fill="#1d1d1d"
                      ></path>
                    </g>
                  </g>
                </svg>
                <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                  {{ $t('no_data') }}
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot
        v-if="payments.filter((payment) => !payment.isDeleted).length"
        class="h-[60px]"
        :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
      >
        <tr>
          <td
            :colspan="3"
            class="border-t-[1px] rounded-bl-lg"
            :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']"
          >
            <div
              class="border-r-[1px] font-bold text-lg ps-2"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('total_payment') }}
            </div>
          </td>
          <td :colspan="1" class="border-t-[1px]" :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']">
            <div class="font-bold text-lg ps-5" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
              {{ formatPrice(totalPayment) }}
            </div>
          </td>
          <td class="border-t-[1px] rounded-br-lg" :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']"></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { BillPayment } from '~/types/bill';
import { svgPaths } from '~/consts/svg_paths';

// ---------------------- Variables ----------------------
const props = defineProps({
  payments: {
    type: Array as () => BillPayment[],
    required: true,
  },
  deleteBucket: {
    type: Object as () => { value: number[] },
    required: true,
  },
});
const payments = toRef(props, 'payments');
const deleteBucket = toRef(props, 'deleteBucket');
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const pageContentWidth = ref(0);
const checkAllPayments = computed(() => {
  return !!(payments.value.length && payments.value.every((payment) => deleteBucket.value.value.includes(payment.ID)));
});
const totalPayment = computed(() => {
  return payments.value
    .filter((payment) => !payment.isDeleted && payment.amount !== undefined && payment.amount >= 0)
    .reduce((total, payment) => total + (payment.amount - 0), 0);
});

// ---------------------- Functions ----------------------
function addAllPaymentsToBucket() {
  payments.value.forEach((payment) => {
    if (!deleteBucket.value.value.includes(payment.ID)) {
      deleteBucket.value.value.push(payment.ID);
    }
  });
}

function removeAllPaymentsFromBucket() {
  payments.value.forEach((payment) => {
    const index = deleteBucket.value.value.indexOf(payment.ID);
    if (index !== -1) {
      deleteBucket.value.value.splice(index, 1);
    }
  });
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      pageContentWidth.value = entry.contentRect.width - 10;
    }
  });

  resizeObserver.observe(document.getElementById('page_content')!);
});
</script>
