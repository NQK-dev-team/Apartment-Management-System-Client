<template>
  <div class="flex overflow-auto">
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 'max-content' }" class="flex-1">
      <template #bodyCell="{ column, value, record }">
        <template v-if="column.dataIndex === 'file_name'">
          <span
            >{{ value }}
            <NuxtLink
              :id="`get_file_${record.no}`"
              :name="`get_file_${record.no}`"
              :to="record.file_url"
              class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
              target="_blank"
            >
              <LinkOutlined /> </NuxtLink
          ></span>
        </template>
        <template v-if="column.dataIndex === 'process_result'">
          <a-tag
            :class="`text-[#${value === COMMON.PROCESS_RESULT.SUCCESS ? '50c433' : value === COMMON.PROCESS_RESULT.FAILED ? 'ff0000' : '888888'}]`"
          >
            {{
              value === COMMON.PROCESS_RESULT.SUCCESS
                ? $t('success')
                : value === COMMON.PROCESS_RESULT.FAILED
                  ? $t('failed')
                  : 'N/A'
            }}
          </a-tag>
        </template>
      </template>
      <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div class="p-[8px]">
          <a-input
            :id="`${column.dataIndex}SearchInput`"
            ref="searchInput"
            :name="`${column.dataIndex}SearchInput`"
            :placeholder="t('enter_search')"
            :value="selectedKeys[0]"
            class="block width-[200px] mb-[8px]"
            @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <div class="flex items-center">
            <a-button
              :id="`${column.dataIndex}ClearButton`"
              size="small"
              :name="`${column.dataIndex}ClearButton`"
              class="w-[90px] h-[25px] inline-flex items-center justify-center"
              @click="handleReset(clearFilters)"
              >{{ t('clear') }}</a-button
            >
            <a-button
              :id="`${column.dataIndex}ApplyButton`"
              type="primary"
              :name="`${column.dataIndex}ApplyButton`"
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
          :id="`${column.dataIndex}SearchIcon`"
          :name="`${column.dataIndex}SearchIcon`"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <FilterFilled
          v-else
          :id="`${column.dataIndex}FilterIcon`"
          :name="`${column.dataIndex}FilterIcon`"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { COMMON } from '~/consts/common';
import { api } from '~/services/api';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const { $event } = useNuxtApp();
const props = defineProps({
  daySelect: {
    type: Object as () => Dayjs,
    required: true,
  },
});
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
    {
      title: t('process_date'),
      dataIndex: 'process_date',
      key: 'process_date',
      class: 'text-nowrap select-none',
    },
    {
      title: t('process_result'),
      dataIndex: 'process_result',
      key: 'process_result',
      class: 'text-nowrap select-none',
      filters: [
        {
          text: t('success'),
          value: COMMON.PROCESS_RESULT.SUCCESS,
        },
        {
          text: t('failed'),
          value: COMMON.PROCESS_RESULT.FAILED,
        },
      ],
      onFilter: (value: any, record: any) => record.process_result === value,
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
    process_result: number;
    process_date: string;
  }[]
>([]);
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const selectDate = toRef(props, 'daySelect');

// ---------------------- Functions ----------------------
async function fetchProcessedFiles() {
  try {
    $event.emit('loading');
    data.value = [];
    const response = await api.common.upload.getProcessedFiles(
      COMMON.UPLOAD_TYPE.ADD_BILLS,
      selectDate.value.format('YYYY-MM-DD')
    );
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
        process_result: file.processResult.Int64!,
        process_date: convertToDate(file.processDate.Time as string),
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
  fetchProcessedFiles();
});

// ---------------------- Watchers ----------------------
watch(selectDate, () => {
  fetchProcessedFiles();
});
</script>
