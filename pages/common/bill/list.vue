<template>
    <div>
        <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
            <a-breadcrumb>
                <a-breadcrumb-item>{{ $t('bill_list') }}</a-breadcrumb-item>
            </a-breadcrumb>
            <h1 class="mt-3 text-2xl">{{ $t('bill_list') }}</h1>
            <div class="flex justify-center">
                <a-input-search class="w-[500px]" v-model:value="searchValue" :placeholder="$t('enter_search')"
                    enter-button />
            </div>
        </div>
        <div>
            <CommonBillListTable :contractID="''" :owner="''" :customerID="''" :billID="''" :paymentPeriod="''"
                :amount="0" :status="''" :paidBy="''" :paymentDate="''" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { ref } from 'vue';

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
    No: number;
    'Contract ID': string;
    Owner: string;
    'Customer ID': string;
    'Bill ID': string;
    'Payment Period': string;
    Amount: number;
    Status: string;
    'Paid by': string;
    'Payment Date': string;
}[]>([]);
const { $event } = useNuxtApp();
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
    () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const current = ref(1);
const searchValue = ref("");
</script>
