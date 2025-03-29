<template>
    <div class="flex flex-col h-full px-5">
        <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
            <a-breadcrumb>
                <a-breadcrumb-item>
                    <NuxtLink to="pages/common/bill/list.vue">{{ $t('bill_list') }}
                    </NuxtLink>
                </a-breadcrumb-item>
                <a-breadcrumb-item>{{ $t('bill_detail') }}</a-breadcrumb-item>
            </a-breadcrumb>
            <div class="flex justify-between mt-5">
                <h1 class="mt-3 text-2xl">{{ $t('bill_detail') }}</h1>
                <div class="flex">
                    <a-button type="primary" class="flex items-center justify-center p-2 rounded-none;">
                        {{ $t('edit') }}
                    </a-button>
                    <a-button type="primary" danger class="flex items-center justify-center p-2 rounded-none; ml-2">
                        {{ $t('delete') }}
                    </a-button>
                </div>
            </div>
        </div>
        <div class="flex-1 flex flex-col mt-5 overflow-auto px-4"
            :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
            <h1 class="mt-3 text-2xl">{{ $t('bill_info') }}</h1>
            <CommonBillDetailBillForm></CommonBillDetailBillForm>
            <h1 class="mt-3 text-2xl">{{ $t('payment_list') }}</h1>
            <CommonBillDetailPaymentList :serviceName="''" :amount="0" :note="''" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { ref } from 'vue';

// ---------------------- Metadata ----------------------
definePageMeta({
    name: 'Bill Detail',
    layout: 'main',
    middleware: ['authorization-manager']
});

useHead({
    title: 'Bill Detail',
    meta: [
        {
            name: 'description',
            content: 'Detail of a bill in the system',
        },
    ],
});

// ---------------------- Variables ----------------------
const billDetail = ref<{
    'Service Name': string;
    Amount: number;
    Note: string;
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


// ---------------------- Lifecycles ----------------------
// onMounted(() => {
//     getBill();
// });
</script>
