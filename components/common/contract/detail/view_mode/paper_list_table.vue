<template>
  <a-table :data-source="data" :columns="columns" class="mt-5" :scroll="{ x: 'max-content' }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <NuxtLink :to="record.action" target="_blank" class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
          ><LinkOutlined
        /></NuxtLink>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import type { ContractFile } from '~/types/contract';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const props = defineProps({
  files: {
    type: Array as () => ContractFile[],
    required: true,
  },
});
const columns: any = computed(() => {
  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap w-[75px]',
    },
    {
      title: t('file_name'),
      dataIndex: 'file_name',
      key: 'file_name',
      class: 'text-nowrap',
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      class: 'text-nowrap w-[75px]',
    },
  ];
});
const data = computed(() => {
  return props.files.map((file, index) => ({
    no: index + 1,
    file_name: file.title ?? '',
    action: file.path,
  }));
});
</script>
