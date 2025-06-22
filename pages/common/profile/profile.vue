<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ t('profile') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex justify-between mt-5">
        <h1 class="mt-3 text-2xl">Nguyễn Văn A</h1>
      </div>
    </div>
    <div class="flex-1 flex-col mt-5 mb-3 overflow-auto px-4 "
      :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <!-- Edit and Delete icons -->
      <!-- <EditOutlined />
      <DeleteOutlined /> -->
      <!-- notification list collum-->

      <!-- notification content collum -->
        <div class="flex items-center mt-3">
          <p
            class="me-3 cursor-pointer select-none"
            :class="[
              option === 1
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 1"
          >
            {{ t('profile') }}
          </p>
          <p
            class="mx-3 cursor-pointer select-none"
            :class="[
              option === 2
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 2"
          >
            {{ t('security') }}
          </p>
        </div>
        <div class="flex items-center justify-center mt-3">
          <h2 v-show="option === 1" class="text-xl font-bold">{{ t('profile') }}</h2>
          <h2 v-show="option === 2" class="text-xl font-bold">{{ t('password_reset') }}</h2>
        </div>
        <ClientOnly>
          <template v-if="option === 1">
            <div class="flex py-3">
              <div class="flex-initial w-3/4 flex-col me-6">
                <div class="flex items-center">
                  <div class="flex-1 me-5">
                    <label for="customer_no" class="flex mb-1">
                      <span>{{ t('customer_no') }}</span>
                    </label>
                    <a-input id="customer_no" value="customerInfo.no" :placeholder="t('customer_no')" disabled readonly />
                  </div>
                  <div class="flex-1">
                    <label for="last_name" class="flex mb-1">
                      <span>{{ t('last_name') }}</span>
                    </label>
                    <a-input id="last_name" value="customerInfo.lastName" :placeholder="t('last_name')" disabled readonly />
                  </div>
                </div>
                <div class="flex items-center mt-5">
                  <div class="flex-1 me-5">
                    <label for="middle_name" class="flex mb-1">
                      <span>{{ t('middle_name') }}</span>
                    </label>
                    <a-input
                      id="middle_name"
                      value="customerInfo.middleName.Valid ? (customerInfo.middleName.String as string) : ''"
                      :placeholder="t('middle_name')"
                      disabled
                      readonly
                    />
                  </div>
                  <div class="flex-1">
                    <label for="first_name" class="flex mb-1">
                      <span>{{ t('name') }}</span>
                    </label>
                    <a-input
                      id="first_name"
                      value="customerInfo.firstName"
                      :placeholder="t('name')"
                      disabled
                      readonly
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="flex items-center mt-5">
                  <div class="flex-1 me-5">
                    <label for="gender" class="flex mb-1">
                      <span>{{ t('gender') }}</span>
                    </label>
                    <a-select id="gender" value="customerInfo.gender" class="w-full" disabled readonly>
                      <a-select-option value="COMMON.USER_GENDER.MALE">{{ t('male') }}</a-select-option>
                      <a-select-option value="COMMON.USER_GENDER.FEMALE">{{ t('female') }}</a-select-option>
                      <a-select-option value="COMMON.USER_GENDER.OTHER">{{ t('other') }}</a-select-option>
                    </a-select>
                  </div>
                  <div class="flex-1">
                    <label for="date_of_birth" class="flex mb-1">
                      <span>{{ t('dob') }}</span>
                    </label>
                    <a-date-picker id="date_of_birth" :value="dob" class="w-full" disabled readonly />
                  </div>
                </div>
                <div class="flex items-center mt-5">
                  <div class="flex-1 me-5">
                    <label for="ssn" class="flex mb-1">
                      <span>{{ t('ssn') }}</span>
                    </label>
                    <a-input id="ssn" value="customerInfo.ssn" :placeholder="t('ssn')" disabled readonly />
                  </div>
                  <div class="flex-1">
                    <label for="old_ssn" class="flex mb-1">
                      <span>{{ t('old_ssn') }}</span>
                    </label>
                    <a-input
                      id="old_ssn"
                      value="customerInfo.oldSSN.Valid ? (customerInfo.oldSSN.String as string) : ''"
                      :placeholder="t('old_ssn')"
                      disabled
                      readonly
                    />
                  </div>
                </div>
                <div class="flex items-center mt-5">
                  <div class="flex-1 me-5">
                    <label for="pob" class="flex mb-1">
                      <span>{{ t('pob') }}</span>
                    </label>
                    <a-input id="pob" value="customerInfo.pob" :placeholder="t('pob')" disabled readonly />
                  </div>
                  <div class="flex-1">
                    <label for="phone_number" class="flex mb-1">
                      <span>{{ t('phone') }}</span>
                    </label>
                    <a-input id="phone_number" value="customerInfo.phone" :placeholder="t('phone')" disabled readonly />
                  </div>
                </div>
                <div class="flex items-center mt-5">
                  <div class="flex-1 me-5">
                    <label for="email" class="flex mb-1">
                      <span>{{ t('email') }}</span>
                    </label>
                    <a-input
                      id="email"
                      value="customerInfo.email"
                      :placeholder="t('email')"
                      disabled
                      readonly
                      autocomplete="off"
                    />
                  </div>
                  <div class="flex-1">
                    <label for="permanent_address" class="flex mb-1">
                      <span>{{ t('permanent_address') }}</span>
                    </label>
                    <a-input
                      id="permanent_address"
                      value="customerInfo.permanentAddress"
                      :placeholder="t('permanent_address')"
                      disabled
                      readonly
                    />
                  </div>
                </div>
                <div class="flex items-center mt-5">
                  <div class="flex-1 me-5">
                    <label for="temporary_address" class="flex mb-1">
                      <span>{{ t('temporary_address') }}</span>
                    </label>
                    <a-input
                      id="temporary_address"
                      value="customerInfo.temporaryAddress"
                      :placeholder="t('temporary_address')"
                      disabled
                      readonly
                    />
                  </div>
                  <div class="flex-1"></div>
                </div>
              </div>
              <div class="flex-initial w-1/4 flex-col">
                <div class="flex flex-col w-[200px] h-[300px]">
                  <div>{{ t('avatar') }}</div>
                  <img :src="svgPaths.placeholderImage" alt="avatar" />
                </div>
                <div class="flex flex-col w-[200px] h-[300px]">
                  <div>{{ t('national_id') + ' ' + t('front_face') }}</div>
                  <img :src="svgPaths.placeholderImage" alt="national_id_front" />
                </div>
                <div class="flex flex-col w-[200px] h-[300px]">
                  <div>{{ t('national_id') + ' ' + t('back_face') }}</div>
                  <img :src="svgPaths.placeholderImage" alt="national_id_back" />
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="option === 2">
            <div class="flex justify-center">
              <div class="flex w-1/4 flex-col items-center">
                <a-form-item class="w-full my-2" :label="t('password')" name="password" :labelCol="{ span: 24 }" :wrapperCol="{ span: 24 }">
                  <a-input-password autocomplete="off" />
                </a-form-item>
                <a-form-item class="w-full mb-2" :label="t('new_password')" name="new_password" :labelCol="{ span: 24 }" :wrapperCol="{ span: 24 }">
                  <a-input-password autocomplete="off" />
                </a-form-item>
                <a-form-item class="w-full mb-2" :label="t('confirm_new_password')" name="confirm_new_password" :labelCol="{ span: 24 }" :wrapperCol="{ span: 24 }">
                  <a-input-password autocomplete="off" />
                </a-form-item>
                <a-button type="primary" class="mt-3 w-[175px] rounded-sm">{{ t('password_reset') }}</a-button>
              </div>
            </div>
            
            
          </template>
        </ClientOnly>
        

    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services/api';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { svgPaths } from '~/consts/svg_paths';
import dayjs, { type Dayjs } from 'dayjs';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Profile',
  layout: 'main',
  middleware: ['authorization-owner'],
});

useHead({
  title: 'Profile',
  meta: [
    {
      name: 'description',
      content: 'Use profile to manage your account settings.',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');

const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const selectedIdx = ref<number | null>(null);
const option = ref<number>(1);
const dob = computed<Dayjs>(() => {
  const date = new Date();
  date.setFullYear(1990, 0, 1); // Default to January 1, 1990
  return dayjs(date);
});
// ---------------------- Functions ----------------------
</script>

<style lang="css" scoped>
  .thick-border {
    border-width: 2px !important;
    border-color: white;
  }
</style>