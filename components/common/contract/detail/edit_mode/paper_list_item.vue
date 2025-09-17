<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td class="text-sm text-center align-middle py-[16px]">
      <a-form-item
        class="border-r-[1px]"
        :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
        :name="`check_contract_${props.index + 1}`"
      >
        <a-checkbox
          :id="`check_contract_${props.index + 1}`"
          :disabled="!file.isNew"
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
          :name="['files', props.index, 'title']"
          :rules="[
            { required: true, message: $t('file_title_required'), trigger: 'blur' },
            {
              max: COMMON.MAX_LENGTH.CONTRACT_FILE_NAME,
              message: $t('file_name_max_length', { length: COMMON.MAX_LENGTH.CONTRACT_FILE_NAME }),
              trigger: 'blur',
            },
          ]"
          class="px-3 align_validation_message_start"
        >
          <a-input
            v-if="!file.isNew"
            :id="`contract_file_${props.index + 1}_name`"
            :value="file.title || ''"
            :placeholder="$t('file_name')"
            type="text"
            disabled
            readonly
          />
          <a-input
            v-else
            :id="`contract_file_${props.index + 1}_name`"
            v-model:value="file.title"
            :placeholder="$t('enter_file_name')"
            type="text"
          />
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item
          :name="['files', props.index, 'path']"
          :rules="[{ required: true, message: $t('file_require'), trigger: 'blur' }]"
          class="px-3 inline-block"
        >
          <NuxtLink
            v-if="!file.isNew"
            :id="`contract_file_${props.index + 1}_file`"
            :to="file.path as string"
            target="_blank"
            class="text-[#1890FF]"
            :title="file.path"
            ><LinkOutlined
          /></NuxtLink>
          <a-upload
            v-else
            :id="`contract_file_${props.index + 1}_file`"
            v-model:file-list="file.path as UploadFile[]"
            :max-count="1"
            :accept="COMMON.ALLOW_FILE_EXTENSIONS.join(',')"
            :before-upload="beforeUploadFile"
          >
            <a-button class="flex flex-col items-center justify-center h-full w-full p-3">
              <plus-outlined />
              <div style="margin-top: 8px">{{ $t('upload_file') }}</div>
            </a-button>
          </a-upload>
        </a-form-item>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { ContractFile } from '~/types/contract';
import { Upload, type UploadFile } from 'ant-design-vue';
import { COMMON } from '~/consts/common';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  file: {
    type: Object as PropType<ContractFile>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteBucket: {
    type: Object as PropType<{ value: number[] }>,
    required: true,
  },
});
const deleteBucket = toRef(props, 'deleteBucket');
const file = toRef(props, 'file');
const checked = computed(() => deleteBucket.value.value.includes(file.value.ID));
const { t } = useI18n();

// ---------------------- Functions ----------------------
function removeFromBucket() {
  const index = deleteBucket.value.value.indexOf(file.value.ID);
  if (index !== -1) {
    deleteBucket.value.value.splice(index, 1);
  }
}

function addToBucket() {
  if (!deleteBucket.value.value.includes(file.value.ID)) {
    deleteBucket.value.value.push(file.value.ID);
  }
}

function beforeUploadFile(file: any): boolean | string {
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_FILE_EXTENSIONS.includes(`.${type}`) && !COMMON.ALLOW_FILE_EXTENSIONS_ADVANCE.includes(type)) {
    notification.error({
      message: t('invalid_file_title'),
      description: t('invalid_contract_file_type', { types: COMMON.ALLOW_FILE_EXTENSIONS.join(', ') }),
    });
    return Upload.LIST_IGNORE;
  }

  if (file.size >= COMMON.FILE_SIZE_LIMIT) {
    notification.error({
      message: t('invalid_file_title'),
      description: t('invalid_file_size', { size: COMMON.FILE_SIZE_LIMIT_STR }),
    });
    return Upload.LIST_IGNORE;
  }
  return true;
}
</script>
