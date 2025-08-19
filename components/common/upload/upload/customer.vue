<template>
  <div class="flex overflow-auto">
    <a-table :columns="columns" :data="data" :scroll="{ x: 'max-content' }" class="flex-1"></a-table>
    <div class="ms-5 min-w-[300px] max-w-[300px]">
      <a-upload-dragger
        v-model:file-list="fileList"
        name="file"
        :multiple="true"
        :accept="COMMON.ALLOW_UPLOAD_FILE_EXTENSIONS.join(',')"
        :before-upload="beforeUploadFile"
        class="flex"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">{{ $t('drag_and_drop_file') }}</p>
      </a-upload-dragger>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import { type UploadFile, Upload } from 'ant-design-vue';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const columns: any = computed(() => {
  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap w-[50px]',
    },
    {
      title: t('file_name'),
      dataIndex: 'file_name',
      key: 'file_name',
      class: 'text-nowrap',
    },
    {
      title: t('upload_time'),
      dataIndex: 'upload_time',
      key: 'upload_time',
      class: 'text-nowrap',
    },
    {
      title: t('file_size'),
      dataIndex: 'file_size',
      key: 'file_size',
      class: 'text-nowrap',
    },
  ];
});
const data = ref<
  {
    no: number;
    ID: number;
    file_name: string;
    upload_time: string;
    file_size: string;
  }[]
>([]);
const fileList = ref<UploadFile[]>([]);

// ---------------------- Functions ----------------------
async function fetchUploadedFiles() {
  try {
    $event.emit('loading');
  } catch (err: any) {
    notification.error({
      message: t('system_error_title'),
      description: t('system_error_description'),
    });
  } finally {
    $event.emit('loading');
  }
}

function beforeUploadFile(file: any): boolean | string {
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_UPLOAD_FILE_EXTENSIONS.includes(`.${type}`)) {
    notification.error({
      message: t('invalid_file_title'),
      description: t('invalid_contract_file_type', { types: COMMON.ALLOW_UPLOAD_FILE_EXTENSIONS.join(', ') }),
    });
    return Upload.LIST_IGNORE;
  }

  if (file.size >= COMMON.UPLOAD_FILE_SIZE_LIMIT) {
    notification.error({
      message: t('invalid_file_title'),
      description: t('invalid_file_size', { size: COMMON.UPLOAD_FILE_SIZE_LIMIT_STR }),
    });
    return Upload.LIST_IGNORE;
  }
  return true;
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  fetchUploadedFiles();
});
</script>
