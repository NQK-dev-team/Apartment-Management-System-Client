<template>
  <div>
    <a-modal v-model:open="data.isOpen" title="Support ticket detail" @ok="handleOk" @cancel="handleCancel" class="w-[800px]">
      <div class="flex-1 flex flex-col me-6">
        <div class="flex items-center">
          <div class="flex-1 me-2">
            <label for="last_name" class="flex mb-1">
              <span>{{ $t('last_name') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="last_name"
              value="Nguyễn"
              placeholder="Last name"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="name" class="flex mb-1">
              <span>{{ $t('middle_name') }}</span>
            </label>
            <a-input
              id="middle_name"
              value="Văn"
              placeholder="Middle name"
              disabled
              readonly
            />
          </div>
        </div>
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="name" class="flex mb-1">
              <span>{{ $t('name') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="name"
              value="Tùng"
              placeholder="Name"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="data_of_birth" class="flex mb-1">
              <span>{{ $t('dob') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-date-picker v-model:value="value1" class="w-full" placeholder="2000-05-08" disabled readonly/>
          </div>
        </div>
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="gender" class="flex mb-1">
              <span>{{ $t('gender') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-select
              ref="select"
              v-model:value="value2"
              style="width: 120px"
              :options="options2"
              @focus="focus"
              @change="handleChange"
              class="w-full"
              disabled
              readonly
            ></a-select>
          </div>
          <div class="flex-1 me-2">
            <label for="CCCD" class="flex mb-1">
              <span>CCCD</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="cccd"
              value="09220000XXXX"
              placeholder="CCCD"
              disabled
              readonly
            />
          </div>
        </div>
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="CMND" class="flex mb-1">
              <span>CMND</span>
            </label>
            <a-input
              id="cmnd"
              value="Empty"
              placeholder="CMND"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="origin" class="flex mb-1">
              <span>{{ $t('origin') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="origin"
              value="Đồng Nai"
              placeholder="Origin"
              disabled
              readonly
            />
          </div>
        </div>
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="phone_number" class="flex mb-1">
              <span>{{ $t('phone') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="phone_number"
              value="093275XXXX"
              placeholder="Phone number"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="login_email" class="flex mb-1">
              <span>{{ $t('email') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="login_email"
              value="testmail1@gmail.com"
              placeholder="testmail1@gmail.com"
              disabled
              readonly
            />
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const open = ref<boolean>(false);
const props = defineProps({
  data: {
    type: Object as PropType<{ isOpen: boolean}>,
    required: true,
  },
});
const data = toRef(props, 'data');

// ---------------------- Functions ----------------------
function handleOk() {
  data.value.isOpen = false;
}

function handleCancel() {
  data.value.isOpen = false;
}
</script>

