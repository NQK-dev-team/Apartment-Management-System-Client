<template>
  <div class="min-w-[350px] max-w-[350px] h-full">
    <div class="flex items-center justify-between">
      <div class="flex">
        <h2 class="text-xl">{{ $t('building_image') }}</h2>
        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
      </div>
      <!-- <a-button
        v-if="userRole?.toString() === roles.owner && !props.readOnly"
        class="flex items-center justify-center rounded-sm bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400 active:bg-gray-600 active:border-gray-600"
        size="small"
        @click="
          () => {
            buildingInfo.data.images = props.originalBuildingInfo.data.images;
            imageList = getImageList();
          }
        "
      >
        <UndoOutlined />
      </a-button>
      <div v-else></div> -->
    </div>
    <img
      v-if="!displayImages || !displayImages.length"
      :src="svgPaths.placeholderImage"
      :alt="$t('avatar')"
      class="w-full mt-1"
    />
    <div class="flex flex-col">
      <div v-for="(image, index) in displayImages" :key="index" class="mt-3">
        <img :src="image" :alt="$t('building_image') + ` ${index}`" class="w-full" />
      </div>
    </div>
    <div class="mt-3 text-center">
      <a-upload
        v-if="!props.readOnly && userRole?.toString() === roles.owner"
        v-model:file-list="imageList"
        :accept="COMMON.ALLOW_IMAGE_EXTENSIONS.join(',')"
        multiple
        list-type="text"
        :before-upload="beforeUploadBuildingImage"
        @remove="
          (file) => {
            if (isNaN(Number(file.uid))) {
              buildingInfo.data.images = buildingInfo.data.images.filter((image: any) => image.uid !== file.uid);
            } else {
              const foundImage = buildingInfo.data.images.find(
                (image: any) => !image.isNew && image.ID === Number(file.uid)
              );
              if (foundImage) {
                foundImage.isDeleted = true;
              }
            }
          }
        "
        @change="(e: any) => handleFileUpload(e)"
      >
        <a-button class="flex items-center">
          <upload-outlined></upload-outlined>
          {{ $t('upload_file') }}
        </a-button>
      </a-upload>
      <div
        v-if="!props.readOnly && userRole?.toString() === roles.owner"
        class="mt-5 text-sm"
        :class="[lightMode ? 'text-[#00000080]' : 'text-[#d2d2d2a3]']"
      >
        {{ $t('recommended_resolution') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';
import type { EditBuilding } from '~/types/building';
import { getBase64 } from '#build/imports';
import { roles } from '~/consts/roles';
import { COMMON } from '~/consts/common';
import { Upload } from 'ant-design-vue';

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
    required: true,
  },
  originalBuildingInfo: {
    type: Object as PropType<{ data: EditBuilding }>,
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const buildingInfo = toRef(props, 'buildingInfo');
const imageList = ref<any[]>([]);
const { t } = useI18n();
const displayImages = asyncComputed(async () => {
  const result: string[] = [];

  for (const image of props.buildingInfo.data.images) {
    if (image.isDeleted) {
      continue;
    } else if (image.isNew) {
      const file = await getBase64((image as any).originFileObj);
      result.push(file as string);
    } else {
      result.push((image as any).path);
    }
  }

  return result;
});

// ---------------------- Functions ----------------------
function handleFileUpload(event: UploadChangeParam<UploadFile<any>>) {
  event.fileList.forEach((file) => {
    if (file.status === 'done' && isNaN(Number(file.uid))) {
      if (props.buildingInfo.data.images.find((image: any) => image.isNew && image.uid === file.uid)) {
        return;
      }
      buildingInfo.value.data.images.push({
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

  props.buildingInfo.data.images.forEach((image: any) => {
    if (image.isDeleted) return;

    if (!image.isNew) {
      result.push({
        uid: image.ID,
        name: image.title || '',
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

function beforeUploadBuildingImage(file: any): boolean | string {
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_IMAGE_EXTENSIONS.includes(`.${type}`)) {
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_file_type', { types: COMMON.ALLOW_IMAGE_EXTENSIONS.join(', ') }),
    });
    return Upload.LIST_IGNORE;
  }

  if (file.size >= COMMON.IMAGE_SIZE_LIMIT) {
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_size', { size: COMMON.IMAGE_SIZE_LIMIT_STR }),
    });
    return Upload.LIST_IGNORE;
  }
  return true;
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  imageList.value = getImageList();
});
</script>
