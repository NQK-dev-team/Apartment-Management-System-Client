<template>
    <div class="w-full h-full">
        <img src="/image/auth_background.png" class="w-full h-full fixed" />
        <div class="w-full h-full flex items-center justify-center relative">
            <a-form class="w-96 bg-white p-8 rounded-lg shadow-lg" :model="formDta" :rules="rules" name="basic"
                autocomplete="off" :hide-required-mark="true" layout="vertical" @finish="login">
                <div class="flex items-center justify-center mb-5">
                    <img src="/svg/logo.svg" alt="Logo" class="w-[50px] h-[50px] select-none" />
                    <h1 class="ms-2 font-bold text-2xl">NQK Management</h1>
                </div>
                <a-form-item class="flex justify-center mb-0">
                    <a class="ms-2 font-bold text-2xl">{{ $t('create_new_password') }}</a>
                </a-form-item>
                <div class="flex justify-end">
                    <div>
                        <a-dropdown :trigger="['click']" placement="bottomRight">
                            <p class="text-center cursor-pointer flex items-center">
                                <img v-show="locale === 'vi'" src="/svg/vi.svg" alt="Vietnamese" class="w-[20px]" />
                                <img v-show="locale === 'en'" src="/svg/en.svg" alt="English" class="w-[20px]" />
                                <down-outlined style="font-size: 11px" class="ms-1"></down-outlined>
                            </p>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item key="vi" @click="setLocale('vi')">
                                        <img src="/svg/vi.svg" alt="Vietnamese" class="w-[20px]" />
                                    </a-menu-item>
                                    <a-menu-item key="en" @click="setLocale('en')">
                                        <img src="/svg/en.svg" alt="English" class="w-[20px]" />
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
                <a-form-item class="mb-1" :label="$t('password')" name="password">
                    <a-input-password v-model:value="formDta.password" autocomplete="off" />
                </a-form-item>
                <a-form-item class="mb-1" :label="$t('confirm_password')" name="confirm_password">
                    <a-input-password v-model:value="formDta.confirm_password" autocomplete="off" />
                </a-form-item>

                <a-form-item class="mb-0">
                    <a-button class="w-full" type="primary" html-type="submit">{{ $t('confirm') }}</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
// create new form and import later
import type { LoginForm } from '~/types/login';
import type { RuleObject } from 'ant-design-vue/es/form';
import { api } from '~/services/api';
// ---------------------- Metadata ----------------------
definePageMeta({
    name: 'Create New Password',
});

useHead({
    title: 'Create New Password',
    meta: [
        {
            name: 'description',
            content: 'User create new password',
        },
    ],
});
// ---------------------- Types ----------------------
type RecoverStep3Form = {
    password: string;
    confirm_password: string,
};
// ---------------------- Variables ----------------------
const { setLocale, locale, t } = useI18n();
const formDta = ref<RecoverStep3Form>({
    password: '',
    confirm_password: '',
});
const rules = computed(() => ({
    password: [
        {
            required: true,
            message: t('password_require'),
            trigger: 'change',
        },
    ] as RuleObject[],
    confirm_password: [
        {
            required: true,
            message: t('confirm_password_require'),
            trigger: 'change',
        },
    ] as RuleObject[],
}));

// ---------------------- Functions ----------------------
async function newPassword() {
    // api.authentication.login(formDta.value.email, formDta.value.password, formDta.value.remember).then((res) => { });
}
</script>