<template>
    <div>
        <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
            <a-breadcrumb>
                <a-breadcrumb-item>
                    <<NuxtLink to="pages/common/bill/list.vue">{{ $t('bill_list') }}
                        </NuxtLink>
                </a-breadcrumb-item>
                <a-breadcrumb-item>{{ $t('bill_detail') }}</a-breadcrumb-item>
            </a-breadcrumb>
            <h1 class="mt-3 text-2xl">{{ $t('bill_detail') }}</h1>
        </div>
        <div>
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
</script>
