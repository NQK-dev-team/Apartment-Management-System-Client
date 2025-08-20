<template>
  <div class="flex overflow-auto">
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 'max-content' }" class="flex-1">
      <template #bodyCell="{ column, value, record }">
        <template v-if="column.dataIndex === 'file_name'">
          <span
            >{{ value }}
            <NuxtLink
              :to="record.file_url"
              class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
              target="_blank"
            >
              <LinkOutlined /> </NuxtLink
          ></span>
        </template>
      </template>
      <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div class="p-[8px]">
          <a-input
            ref="searchInput"
            :placeholder="t('enter_search')"
            :value="selectedKeys[0]"
            class="block width-[200px] mb-[8px]"
            @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <div class="flex items-center">
            <a-button
              size="small"
              class="w-[90px] h-[25px] inline-flex items-center justify-center"
              @click="handleReset(clearFilters)"
              >{{ t('clear') }}</a-button
            >
            <a-button
              type="primary"
              size="small"
              class="inline-flex items-center justify-center w-[100px] h-[25px] ms-[8px]"
              @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
            >
              <template #icon>
                <SearchOutlined />
              </template>
              {{ t('search') }}
            </a-button>
          </div>
        </div>
      </template>
      <template #customFilterIcon="{ filtered, column }">
        <SearchOutlined
          v-if="column.dataIndex === 'upload_by' || column.dataIndex === 'file_name'"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <FilterFilled v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
    </a-table>
    <div class="ms-5 min-w-[300px] max-w-[300px]">
      <a-upload-dragger
        v-model:file-list="fileList"
        name="file"
        class="flex flex-col"
        :multiple="true"
        :show-upload-list="false"
        :accept="[...COMMON.ALLOW_UPLOAD_FILE_EXTENSIONS, ...COMMON.ALLOW_UPLOAD_FILE_EXTENSIONS_ADVANCE].join(',')"
        :before-upload="beforeUploadFile"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text text-sm">{{ $t('drag_and_drop_file') }}</p>
      </a-upload-dragger>
      <p
        class="text-xs mt-2 text-center"
        :class="[
          {
            'text-gray-400': lightMode,
            'text-gray-500': !lightMode,
          },
        ]"
      >
        {{ $t('upload_note') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import { type UploadFile, Upload, type UploadChangeParam } from 'ant-design-vue';
import { api } from '~/services/api';
import type { RuntimeConfig } from 'nuxt/schema';
import { websocketRoutes } from '~/consts/websocket_routes';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const { $event } = useNuxtApp();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const searchInput = ref();
const columns: any = computed(() => {
  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap w-[50px] select-none',
    },
    {
      title: t('file_name'),
      dataIndex: 'file_name',
      key: 'file_name',
      class: 'text-nowrap select-none',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.file_name.toString().toLowerCase().includes(val.trim().toLowerCase()));
      },
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: t('upload_time'),
      dataIndex: 'upload_time',
      key: 'upload_time',
      class: 'text-nowrap select-none',
      sorter: (a: any, b: any) =>
        new Date(a.upload_time !== '-' ? a.upload_time : '2100-01-01').getTime() -
        new Date(b.upload_time !== '-' ? b.upload_time : '2100-01-01').getTime(),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('upload_by'),
      dataIndex: 'upload_by',
      key: 'upload_by',
      class: 'text-nowrap select-none',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => record.upload_by.toString().toLowerCase().includes(val.trim().toLowerCase()));
      },
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: t('file_size'),
      dataIndex: 'file_size',
      key: 'file_size',
      class: 'text-nowrap select-none',
      sorter: (a: any, b: any) => a.file_size_numeric - b.file_size_numeric,
      sortDirections: ['ascend', 'descend'],
    },
  ];
});
const data = ref<
  {
    no: number;
    ID: number;
    file_name: string;
    upload_time: string;
    upload_by: string;
    file_size: string;
    file_url: string;
    file_size_numeric: number;
  }[]
>([]);
const fileList = ref<UploadFile[]>([]);
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const timeOut = ref();
const websocketConnection = ref<WebSocket | null>(null);

// ---------------------- Functions ----------------------
async function fetchUploadedFiles() {
  try {
    $event.emit('loading');
    data.value = [];
    const response = await api.common.upload.getUploadFiles(COMMON.UPLOAD_TYPE.ADD_CUSTOMERS);
    response.data.forEach((file, index) => {
      data.value.push({
        no: index + 1,
        ID: file.ID,
        file_name: file.fileName,
        upload_time: convertToDateTime(file.createdAt),
        upload_by: file.creator.no + ' - ' + getUserName(file.creator),
        file_size: getFileSizeString(file.size),
        file_url: file.urlPath,
        file_size_numeric: file.size,
      });
    });
  } catch (err: any) {
    notification.error({
      message: t('system_error_title'),
      description: t('system_error_description'),
    });
  } finally {
    $event.emit('loading');
  }
}

async function uploadFile(file: UploadFile) {
  try {
    const formdata = new FormData();
    formdata.append('uploadType', COMMON.UPLOAD_TYPE.ADD_CUSTOMERS.toString());
    formdata.append('file', file.originFileObj as File);

    await api.common.upload.uploadFile(formdata);
    notification.success({
      message: t('file_upload_success', { name: file.name }),
    });
  } catch (err: any) {
    notification.error({
      message: t('file_upload_failed', { name: file.name }),
    });
  }
}

function beforeUploadFile(file: any): boolean | string {
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (
    !COMMON.ALLOW_UPLOAD_FILE_EXTENSIONS.includes(`.${type}`) &&
    !COMMON.ALLOW_UPLOAD_FILE_EXTENSIONS_ADVANCE.includes(type)
  ) {
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

async function handleChange(info: UploadChangeParam) {
  if (info.fileList.every((file) => file.status !== 'uploading')) {
    for (const file of info.fileList) {
      if (file.status === 'done') {
        await uploadFile(file);
      } else if (file.status === 'error') {
        notification.error({
          message: t('file_upload_failed', { name: file.name }),
        });
      }
    }

    fileList.value = [];

    // await fetchUploadedFiles();
  }
}

function handleSearch(selectedKeys: any, confirm: any, dataIndex: any) {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
}

function handleReset(clearFilters: any) {
  clearFilters({ confirm: true });
  state.searchText = '';
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  fetchUploadedFiles();

  const config: RuntimeConfig = useRuntimeConfig();

  websocketConnection.value = new WebSocket(config.public.webSocketURL + websocketRoutes.index);

  websocketConnection.value.onmessage = (event) => {
    const data: { type: number; users: number[] } = JSON.parse(event.data);

    if (data.type === COMMON.WEBSOCKET_SIGNAL_TYPE.UPLOAD_CUSTOMER) {
      if (timeOut.value) {
        clearTimeout(timeOut.value);
      }
      timeOut.value = setTimeout(() => {
        fetchUploadedFiles();
      }, 1000);
    }
  };
});

onUnmounted(() => {
  websocketConnection.value?.close();
});
</script>
