<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td v-if="!props.readOnly" class="text-sm text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox
          :id="`check_room_${1000 * (props.floor + 1) + props.index + 1}`"
          :checked="checked"
          @click="checked ? removeFromBucket() : addToBucket()"
        ></a-checkbox>
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
          <a-select
            v-if="!props.readOnly"
            :id="`room_${1000 * (props.floor + 1) + props.index + 1}_status_1`"
            v-model:value="roomInfo.status"
            placeholder="{{ $t('select_status') }}"
            class="w-full text-left"
          >
            <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{ $t('select_status') }}</a-select-option>
            <a-select-option :value="COMMON.ROOM_STATUS.RENTED" :class="`text-[#50c433]`">{{
              $t('rented')
            }}</a-select-option>
            <a-select-option :value="COMMON.ROOM_STATUS.SOLD" :class="`text-[#43b7f1]`">{{
              $t('sold')
            }}</a-select-option>
            <a-select-option :value="COMMON.ROOM_STATUS.AVAILABLE" :class="`text-[#888888]`">{{
              $t('available')
            }}</a-select-option>
            <a-select-option :value="COMMON.ROOM_STATUS.MAINTANCED" :class="`text-[#d8d535]`">{{
              $t('maintenance')
            }}</a-select-option>
            <a-select-option :value="COMMON.ROOM_STATUS.UNAVAILABLE" :class="`text-[#ff0000]`">{{
              $t('unavailable')
            }}</a-select-option>
          </a-select>
          <a-select
            v-else
            :id="`room_${1000 * (props.floor + 1) + props.index + 1}_status_3`"
            :value="roomInfo.status"
            placeholder="{{ $t('select_status') }}"
            class="w-full text-left"
            disabled
            readonly
          >
            <a-select-option :value="COMMON.HIDDEN_OPTION" class="hidden">{{ $t('select_status') }}</a-select-option>
            <a-select-option :value="COMMON.ROOM_STATUS.RENTED" :class="`text-[#50c433]`">{{
              $t('rented')
            }}</a-select-option>
            <a-select-option :value="COMMON.ROOM_STATUS.SOLD" :class="`text-[#43b7f1]`">{{
              $t('sold')
            }}</a-select-option>
            <a-select-option :value="COMMON.ROOM_STATUS.AVAILABLE" :class="`text-[#888888]`">{{
              $t('available')
            }}</a-select-option>
            <a-select-option :value="COMMON.ROOM_STATUS.MAINTANCED" :class="`text-[#d8d535]`">{{
              $t('maintenance')
            }}</a-select-option>
            <a-select-option :value="COMMON.ROOM_STATUS.UNAVAILABLE" :class="`text-[#ff0000]`">{{
              $t('unavailable')
            }}</a-select-option>
          </a-select>
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-input
            v-if="!props.readOnly"
            :id="`room_${1000 * (props.floor + 1) + props.index + 1}_area_1`"
            :placeholder="$t('enter_room_area')"
            type="number"
            :min="0"
            @change="
              (e: any) => {
                roomInfo.area = e.target.value ?? '';
              }
            "
          />
          <a-input
            v-else
            :id="`room_${1000 * (props.floor + 1) + props.index + 1}_area_3`"
            :value="roomInfo.area"
            :placeholder="$t('enter_room_area')"
            type="number"
            :min="0"
            disabled
            readonly
          />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-textarea
            v-if="!props.readOnly"
            :id="`room_${1000 * (props.floor + 1) + props.index + 1}_description_1`"
            v-model:value="roomInfo.description"
            :placeholder="$t('enter_room_description')"
          />
          <a-textarea
            v-else
            :id="`room_${1000 * (props.floor + 1) + props.index + 1}_description_3`"
            :value="roomInfo.description"
            :placeholder="$t('enter_room_description')"
            disabled
            readonly
          />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-upload
            :id="`room_${1000 * (props.floor + 1) + props.index + 1}_images_${props.readOnly ? 3 : 1}`"
            v-model:file-list="roomInfo.images"
            :accept="COMMON.ALLOW_IMAGE_EXTENSIONS.join(',')"
            multiple
            list-type="picture-card"
            class="custom_room_image_upload"
            :class="[props.readOnly ? 'custom_room_image_upload_hide_delete_button' : '']"
            :before-upload="beforeUploadRoomImage"
            @change="handleFileUpload"
            @preview="handlePreview"
          >
            <div v-if="!props.readOnly">
              <plus-outlined />
              <div style="margin-top: 8px">{{ $t('upload_file') }}</div>
            </div>
          </a-upload>
        </div>
      </div>
    </td>
    <a-modal width="500px" :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="Image Preview" style="width: 100%" :src="previewImage" />
    </a-modal>
  </tr>
</template>

<script lang="ts" setup>
import { getBase64 } from '#build/imports';
import type { UploadProps, UploadFile, UploadChangeParam } from 'ant-design-vue';
import { COMMON } from '~/consts/common';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  room: {
    type: Object as PropType<{
      status: number;
      area: number | string;
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
    default: () => [],
  },
  floor: {
    type: Number,
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const roomInfo = toRef(props, 'room');
const { $event } = useNuxtApp();
const checked = computed(() => props.deleteBucket.includes(props.index));
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const invalidImages = ref<string[]>([]);
const { t } = useI18n();

// ---------------------- Functions ----------------------
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

function handleFileUpload(event: UploadChangeParam<UploadFile<any>>) {
  roomInfo.value.images = roomInfo.value.images.filter((file) => !invalidImages.value.includes(file.uid));
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

function beforeUploadRoomImage(file: any) {
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_IMAGE_EXTENSIONS.includes(`.${type}`)) {
    invalidImages.value.push(file.uid);
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_file_type', { types: COMMON.ALLOW_IMAGE_EXTENSIONS.join(', ') }),
    });
    return false;
  }

  if (file.size >= COMMON.IMAGE_SIZE_LIMIT) {
    invalidImages.value.push(file.uid);
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_size', { size: COMMON.IMAGE_SIZE_LIMIT_STR }),
    });
    return false;
  }
  return true;
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

.custom_room_image_upload_hide_delete_button button{
  display:none !important;
}
</style>
