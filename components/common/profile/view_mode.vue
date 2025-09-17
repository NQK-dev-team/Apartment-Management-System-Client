<template>
  <div class="grid grid-cols-6 gap-x-2 py-3">
    <div class="col-span-5">
      <div class="flex-1 flex flex-col me-6">
        <div class="flex items-center">
          <div class="flex-1 me-5">
            <label for="user_no" class="flex mb-1">
              <span>{{ $t('user_no') }}</span>
            </label>
            <a-input id="user_no" :value="user.no" :placeholder="$t('user_no')" disabled readonly />
          </div>
          <div class="flex-1">
            <label for="last_name" class="flex mb-1">
              <span>{{ $t('last_name') }}</span>
            </label>
            <a-input id="last_name" :value="user.lastName" :placeholder="$t('last_name')" disabled readonly />
          </div>
        </div>
        <div class="flex items-center mt-5">
          <div class="flex-1 me-5">
            <label for="middle_name" class="flex mb-1">
              <span>{{ $t('middle_name') }}</span>
            </label>
            <a-input
              id="middle_name"
              :value="user.middleName.Valid ? user.middleName.String : '-'"
              placeholder="-"
              disabled
              readonly
            />
          </div>
          <div class="flex-1">
            <label for="first_name" class="flex mb-1">
              <span>{{ $t('name') }}</span>
            </label>
            <a-input
              id="first_name"
              :value="user.firstName"
              :placeholder="$t('name')"
              disabled
              readonly
              autocomplete="off"
            />
          </div>
        </div>
        <div class="flex items-center mt-5">
          <div class="flex-1 me-5">
            <label for="gender" class="flex mb-1">
              <span>{{ $t('gender') }}</span>
            </label>
            <a-select id="gender" :value="user.gender" class="w-full" disabled readonly>
              <a-select-option id="gender_male" name="gender_male" :value="COMMON.USER_GENDER.MALE">{{
                $t('male')
              }}</a-select-option>
              <a-select-option id="gender_female" name="gender_female" :value="COMMON.USER_GENDER.FEMALE">{{
                $t('female')
              }}</a-select-option>
              <a-select-option id="gender_other" name="gender_other" :value="COMMON.USER_GENDER.OTHER">{{
                $t('other')
              }}</a-select-option>
            </a-select>
          </div>
          <div class="flex-1">
            <label for="date_of_birth" class="flex mb-1">
              <span>{{ $t('dob') }}</span>
            </label>
            <a-date-picker id="date_of_birth" :value="$dayjs(user.dob)" class="w-full" disabled readonly />
          </div>
        </div>
        <div class="flex items-center mt-5">
          <div class="flex-1 me-5">
            <label for="ssn" class="flex mb-1">
              <span>{{ $t('ssn') }}</span>
            </label>
            <a-input id="ssn" :value="user.ssn" :placeholder="$t('ssn')" disabled readonly />
          </div>
          <div class="flex-1">
            <label for="old_ssn" class="flex mb-1">
              <span>{{ $t('old_ssn') }}</span>
            </label>
            <a-input
              id="old_ssn"
              :value="user.oldSSN.Valid ? user.oldSSN.String : '-'"
              placeholder="-"
              disabled
              readonly
            />
          </div>
        </div>
        <div class="flex items-center mt-5">
          <div class="flex-1 me-5">
            <label for="pob" class="flex mb-1">
              <span>{{ $t('pob') }}</span>
            </label>
            <a-input id="pob" :value="user.pob || ''" :placeholder="$t('pob')" disabled readonly />
          </div>
          <div class="flex-1">
            <label for="phone_number" class="flex mb-1">
              <span>{{ $t('phone') }}</span>
            </label>
            <a-input id="phone_number" :value="user.phone" :placeholder="$t('phone')" disabled readonly />
          </div>
        </div>
        <div class="flex items-center mt-5">
          <div class="flex-1 me-5">
            <label for="email" class="flex mb-1">
              <span>{{ $t('email') }}</span>
            </label>
            <a-input id="email" :value="user.email" :placeholder="$t('email')" disabled readonly autocomplete="off" />
          </div>
          <div class="flex-1">
            <label for="permanent_address" class="flex mb-1">
              <span>{{ $t('permanent_address') }}</span>
            </label>
            <a-input
              id="permanent_address"
              :value="user.permanentAddress"
              :placeholder="$t('permanent_address')"
              disabled
              readonly
            />
          </div>
        </div>
        <div class="flex items-center mt-5">
          <div class="flex-1 me-5">
            <label for="temporary_address" class="flex mb-1">
              <span>{{ $t('temporary_address') }}</span>
            </label>
            <a-input
              id="temporary_address"
              :value="user.temporaryAddress"
              :placeholder="$t('temporary_address')"
              disabled
              readonly
            />
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>
    <div class="col-span-1 px-3">
      <div class="w-full">
        <div>{{ $t('avatar') }}</div>
        <img :src="user.profileFilePath" alt="avatar" />
      </div>
      <div class="w-full mt-5">
        <div>{{ $t('national_id') + ' ' + $t('front_face') }}</div>
        <img :src="user.ssnFrontFilePath" alt="national_id_front" />
      </div>
      <div class="w-full mt-5">
        <div>{{ $t('national_id') + ' ' + $t('back_face') }}</div>
        <img :src="user.ssnBackFilePath" alt="national_id_back" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import type { User } from '~/types/user';

// ---------------------- Variables ----------------------
const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});
const user = toRef(props, 'user');
</script>
