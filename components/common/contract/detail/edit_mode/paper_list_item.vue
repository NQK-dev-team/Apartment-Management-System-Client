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
          :rules="[{ required: true, message: $t('file_title_require'), trigger: 'blur' }]"
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
            v-model:value="file.title as string"
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
          :rules="[
            { required: true, message: $t('file_require'), trigger: 'blur' },
            // {
            //   validator: async (_: RuleObject, value: UploadFile[]) =>
            //     validationRules.checkContractFileType(_, value, $t),
            //   trigger: 'change',
            // },
          ]"
          class="px-3"
        >
          <NuxtLink
            v-if="!file.isNew"
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
            @change="(e: any) => handleFileUpload(e)"
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
import type { UploadFile, UploadChangeParam } from 'ant-design-vue';
import { COMMON } from '~/consts/common';
// import type { RuleObject } from 'ant-design-vue/es/form';
// import { validationRules } from '~/consts/validation_rules';

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
const validFile = ref(false);
// const uploadFile = ref([]);

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

function handleFileUpload(event: UploadChangeParam<UploadFile<any>>) {
  // if (event.fileList.length > 1 && event.fileList[1].status === 'done') {
  //   // Remove the first file if more than one file is uploaded
  //   event.fileList.splice(0, 1);
  // }

  if (!validFile.value) {
    file.value.path = [];
  }
}

function beforeUploadFile(file: any) {
  validFile.value = false;
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_FILE_EXTENSIONS.includes(`.${type}`)) {
    notification.error({
      message: t('invalid_file_title'),
      description: t('invalid_contract_file_type', { types: COMMON.ALLOW_FILE_EXTENSIONS.join(', ') }),
    });
    return false;
  }

  if (file.size >= COMMON.FILE_SIZE_LIMIT) {
    notification.error({
      message: t('invalid_file_title'),
      description: t('invalid_file_size', { size: COMMON.FILE_SIZE_LIMIT_STR }),
    });
    return false;
  }
  validFile.value = true;
  return true;
}

// // ---------------------- Watchers ----------------------
// watch(uploadFile, () => {
//   file.value.path = uploadFile.value.length > 0 ? uploadFile.value[0] : '';
// });
</script>
