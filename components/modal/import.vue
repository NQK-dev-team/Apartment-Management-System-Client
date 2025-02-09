<template>
  <a-modal
    v-model:open="data.isOpen"
    :title="$t('import_file')"
    :ok-text="$t('finish_import')"
    :cancel-text="$t('cancel')"
    :ok-button-props="{
      disabled: !data.importOption || !data.fileList.length,
    }"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="w-full h-full">
      <div class="flex items-center">
        <label for="select_import_type" class="font-medium">{{ $t('import_type_list') }}</label>
        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
      </div>
      <a-select id="select_import_type" ref="select" v-model:value="data.importOption" class="w-full mt-1">
        <a-select-option :value="0" class="hidden">{{ $t('choose_option') }}</a-select-option>
        <a-select-option :value="1">{{ $t('add_buildings') }}</a-select-option>
        <a-select-option :value="2">{{ $t('add_rooms') }}</a-select-option>
        <a-select-option :value="3">{{ $t('add_employees') }}</a-select-option>
        <a-select-option :value="4">{{ $t('add_customers') }}</a-select-option>
        <a-select-option :value="5">{{ $t('add_bills') }}</a-select-option>
      </a-select>
      <div v-if="data.importOption" class="mt-4">
        <p class="font-medium">{{ $t('example_file') }}</p>
        <div class="flex items-center mt-1">
          <a-button class="flex items-center download-file" @click="getExampleCsv">
            <download-outlined></download-outlined>
            <span class="ms-2">
              {{ $t('example_file_csv') }}
            </span>
          </a-button>
          <a-button class="flex items-center ms-3 download-file" @click="getExampleXlsx">
            <download-outlined></download-outlined>
            <span class="ms-2">
              {{ $t('example_file_xls') }}
            </span>
          </a-button>
        </div>
      </div>
      <div v-if="data.importOption" class="mt-4">
        <div class="flex items-center">
          <label for="select_import_type" class="font-medium">{{ $t('choose_file') }}</label>
          <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
        </div>
        <div class="mt-1">
          <a-upload v-model:file-list="data.fileList" name="file" accept=".csv,.xlsx,.xls" multiple>
            <a-button class="flex items-center">
              <upload-outlined></upload-outlined>
              {{ $t('upload_file') }}
            </a-button>
          </a-upload>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { UploadFile } from '~/types/upload_file';
// ---------------------- Variables ----------------------
const props = defineProps({
  data: {
    type: Object as PropType<{ isOpen: boolean; importOption: number; fileList: UploadFile[] }>,
    required: true,
  },
  onCancel: {
    type: Function as PropType<() => void>,
    required: true,
  },
  onSubmit: {
    type: Function as PropType<() => void>,
    required: true,
  },
});
const data = toRef(props, 'data');

// ---------------------- Functions ----------------------
function handleOk() {
  data.value.isOpen = false;
  props.onSubmit();
}

function handleCancel() {
  data.value.isOpen = false;
  props.onCancel();
}

function getExampleCsv() {}

function getExampleXlsx() {}
</script>

<style></style>
