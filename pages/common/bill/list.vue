<template>
    <div class="w-full h-full flex flex-col px-5">
        <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
            <a-breadcrumb>
                <a-breadcrumb-item>{{ $t('bill_list') }}</a-breadcrumb-item>
            </a-breadcrumb>
            <h1 class="mt-3 text-2xl">{{ $t('bill_list') }}</h1>
            <div class="flex justify-between">
                <!-- p is a place holder, to space out the content -->
                <p class="mt-3 text-white">{{ $t('customer_list') }}</p> 
                <a-input-search class="w-[500px]" v-model:value="searchValue" :placeholder="$t('enter_search')" enter-button />
                <div class="flex">
                    <a-button type="primary" class="btn-icon">
                    <img :src="svgPaths.plus" alt="Add customer" class="w-[12px] h-[12px]"/>
                    </a-button>
                    <a-button type="primary" danger class="btn-icon ml-2">
                    <img :src="svgPaths.delete" alt="Delete customer" class="w-[12px] h-[12px]"/>
                    </a-button>
                </div>
            </div>
        </div>
        <div>
            <CommonBillListTable v-for="(bill, index) in billList"
                v-show="current * 8 >= index + 1 && (current - 1) * 8 < index + 1" :key="index" :period="bill.period"
                :status="bill.status" :note="bill.note" :paymentTime="bill.paymentDate" :amount="bill.amount"
                :payerID="bill.payerID" :payerName="bill.paidBy" :contractID="bill.contractID" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { ref } from 'vue';
import { svgPaths } from '~/consts/svg_paths';


// ---------------------- Metadata ----------------------
definePageMeta({
    name: 'Bill List',
    layout: 'main',
    middleware: ['authorization-manager']
});

useHead({
    title: 'Bill List',
    meta: [
        {
            name: 'description',
            content: 'List of bills in the system',
        },
    ],
});

// ---------------------- Variables ----------------------
const billList = ref<{
    period: string;
    amount: number;
    status: number;
    paidBy: string;
    paymentDate: string;
    note: string;
    payerID: number;
    contractID: number;
}[]>([]);
const { $event } = useNuxtApp();
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
    () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const current = ref(1);
const searchValue = ref("");

// ---------------------- Functions ----------------------
async function getBillList() {
    try {
        $event.emit('loading');
        const response = await api.common.bill.getList();
        const data = response.data;
        billList.value = data.map(element => {
            return {
                period: element.period,
                amount: element.amount,
                status: element.status,
                paidBy: element.payer.firstName + ' ' + element.payer.lastName,
                paymentDate: element.paymentTime,
                note: element.note,
                payerID: element.payerID,
                contractID: element.contractID,
            }
        });

    } catch (err: any) {
        if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
            notification.error({
                message: t('system_error_title'),
                description: t('system_error_description'),
            });
        }
    } finally {
        $event.emit('loading');
    }
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
    getBillList();
});
</script>

<style scoped>
  .btn-icon {
    @apply flex items-center justify-center p-0 w-[36px] rounded-none;
  }
  </style>
