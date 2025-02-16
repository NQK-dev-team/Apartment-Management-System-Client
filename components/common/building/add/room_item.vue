<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td class="text-sm text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox :checked="checked" @click="checked ? removeFromBucket() : addToBucket()"></a-checkbox>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        {{ 1000 * (props.floor + 1) + props.index + 1 }}
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-select v-model:value="roomInfo.status" placeholder="{{ $t('select_status') }}" class="w-full text-left">
            <a-select-option :value="0" class="hidden">{{ $t('select_status') }}</a-select-option>
            <a-select-option :value="1" class="text-[#1B8800]">{{ $t('rented') }}</a-select-option>
            <a-select-option :value="2" class="text-[#086C9E]">{{ $t('sold') }}</a-select-option>
            <a-select-option :value="3" class="text-[#B57E17]">{{ $t('available') }}</a-select-option>
            <a-select-option :value="4" class="text-[#787878]">{{ $t('maintenance') }}</a-select-option>
            <a-select-option :value="5" class="text-[#FF0000]">{{ $t('unavailable') }}</a-select-option>
          </a-select>
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-input v-model:value="roomInfo.area" :placeholder="$t('enter_room_area')" type="number" :min="0" />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-textarea v-model:value="roomInfo.description" :placeholder="$t('enter_room_description')" />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-upload
            v-model:file-list="roomInfo.images"
            accept=".png,.jpg,.jpeg"
            multiple
            list-type="picture-card"
            class="custom_room_image_upload"
            @preview="handlePreview"
          >
            <div>
              <plus-outlined />
              <div style="margin-top: 8px">{{ $t('upload_file') }}</div>
            </div>
          </a-upload>
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="">
        <CloseCircleOutlined class="text-red-500 cursor-pointer text-lg" @click="removeRoom" />
      </div>
    </td>
    <a-modal width="700px" :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="Image Preview" style="width: 100%" :src="previewImage" />
    </a-modal>
  </tr>
</template>

<script lang="ts" setup>
import type { UploadFile } from '~/types/upload_file';
import { getBase64 } from '#build/imports';
import type { UploadProps } from 'ant-design-vue';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  room: {
    type: Object as PropType<{
      status: number;
      area: number;
      description: string;
      images: UploadFile[];
    }>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteBucket: {
    type: Array as PropType<number[]>,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
});
const roomInfo = toRef(props, 'room');
const { $event } = useNuxtApp();
const checked = computed(() => props.deleteBucket.includes(props.index));
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

// ---------------------- Functions ----------------------
function removeRoom() {
  $event.emit('deleteRoomFromList', props.index);
}

function removeFromBucket() {
  $event.emit('removeRoomFromDeleteBucket', props.index);
}

function addToBucket() {
  $event.emit('addRoomToDeleteBucket', props.index);
}

function handleCancel() {
  previewVisible.value = false;
  previewTitle.value = '';
}

// @ts-ignore
async function handlePreview(file: UploadProps['fileList'][number]) {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
}
</script>

<style lang="css">
.custom_room_image_upload .ant-upload-list-item-actions{
  display:flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.custom_room_image_upload a{
  padding-top: 3px !important;
}
</style>
