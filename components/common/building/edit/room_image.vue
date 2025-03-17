<template>
  <a-upload
    :id="`room_${roomInfo.no}_images_${props.readOnly ? 3 : 1}`"
    v-model:file-list="imageList"
    accept=".png,.jpg,.jpeg"
    multiple
    list-type="picture-card"
    class="custom_room_image_upload"
    :class="[props.readOnly ? 'custom_room_image_upload_hide_delete_button readonly-image-list' : '']"
    :disabled="props.readOnly"
    @preview="handlePreview"
    @change="(e: any) => handleFileUpload(e)"
    @remove="
      (file) => {
        if (isNaN(Number(file.uid))) {
          roomInfo.images = roomInfo.images.filter((image: any) => image.uid !== file.uid);
        } else {
          const foundImage = roomInfo.images.find((image: any) => !image.isNew && image.ID === Number(file.uid));
          if (foundImage) {
            foundImage.isDeleted = true;
          }
        }
      }
    "
  >
    <div>
      <plus-outlined />
      <div style="margin-top: 8px">{{ $t('upload_file') }}</div>
    </div>
    <a-modal width="500px" :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="Image Preview" style="width: 100%" :src="previewImage" />
    </a-modal>
  </a-upload>
</template>

<script lang="ts" setup>
import { getBase64 } from '#build/imports';
import type { UploadProps, UploadFile } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue/es/upload/interface';
import type { RoomImage } from '~/types/building';

// ---------------------- Variables ----------------------
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const props = defineProps({
  roomInfo: {
    type: Object as PropType<{
      ID: number;
      createdAt: string;
      createdBy: number;
      updatedAt: string;
      updatedBy: number;
      no: number;
      floor: number;
      description: string;
      area: number | string;
      status: number;
      buildingID: number;
      images: ((RoomImage | UploadFile) & {
        isDeleted: boolean;
        isNew: boolean;
      })[];
      isDeleted: boolean;
      isNew: boolean;
    }>,
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const roomInfo = toRef(props, 'roomInfo');
const imageList = ref<any[]>([]);
const { $event } = useNuxtApp();

// ---------------------- Functions ----------------------
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

function handleFileUpload(event: UploadChangeParam<UploadFile<any>>) {
  event.fileList.forEach((file) => {
    if (file.status === 'done' && isNaN(Number(file.uid))) {
      if (props.roomInfo.images.find((image: any) => image.isNew && image.uid === file.uid)) {
        return;
      }
      roomInfo.value.images.push({
        ...file,
        isNew: true,
        isDeleted: false,
      });
    }
  });
}

function getImageList() {
  const result: {
    uid: string | number;
    name: string;
    status: string;
    url: string;
  }[] = [];

  props.roomInfo.images.forEach((image: any) => {
    if (image.isDeleted) return;

    if (!image.isNew) {
      result.push({
        uid: image.ID,
        name: image.title ?? '',
        status: 'done',
        url: image.path,
      });
    } else {
      result.push({
        uid: image.uid,
        name: image.name,
        status: 'done',
        url: image.url,
      });
    }
  });

  return result;
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  imageList.value = getImageList();
});

// ---------------------- Event Listeners ----------------------
$event.on('resetRoomImageBuildingEdit', (e) => {
  if (roomInfo.value.floor === e) {
    imageList.value = getImageList();
  }
});
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
