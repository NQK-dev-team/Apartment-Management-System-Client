<template>
  <div class="w-[300px] h-full">
    <div class="flex">
      <h2 class="text-xl">{{ $t('building_image') }}</h2>
      <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
    </div>
    <div class="flex flex-col">
      <div v-for="(image, index) in displayImages" :key="index" class="mt-3">
        <img :src="image" :alt="$t('building_image') + ` ${index}`" class="w-full" />
      </div>
    </div>
    <div class="mt-3 text-center">
      <a-upload
        v-model:file-list="imageList"
        accept=".png,.jpg,.jpeg"
        multiple
        list-type="text"
        @remove="
          (file) => {
            if (!isNaN(Number(file.uid))) {
              removeItems.buildingImages.push(Number(file.uid));
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
      <div class="mt-5 text-sm" :class="[lightMode ? 'text-[#00000080]' : 'text-[#d2d2d2a3]']">
        {{ $t('recommended_resolution') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';
import type { Building } from '~/types/building';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<Building>,
    required: true,
  },
  removeItems: {
    type: Object as PropType<{
      buildingImages: number[];
      roomImages: number[];
      rooms: number[];
      schedules: number[];
      services: number[];
    }>,
    required: true,
  },
  addItems: {
    required: true,
    type: Object as PropType<{
      buildingImages: {
        ID: number;
        image: UploadFile;
      }[];
      roomImages: {
        roomID: number;
        images: UploadFile[];
      }[];
      rooms: {
        status: number;
        area: number | string;
        description: string;
        images: UploadFile[];
        floor: number;
      }[];
      schedules: {
        managerID: number;
        managerNo: string | undefined;
        start: string | undefined;
        end: string | undefined;
      }[];
      services: {
        name: string;
        price: number | string;
      }[];
    }>,
  },
});
const imageList = asyncComputed<any>(async () => {
  const result: {
    uid: string;
    name: string;
    status: string;
    url: string;
  }[] = [];

  result.push(
    ...props.buildingInfo.images.map((image) => ({
      uid: String(image.ID),
      name: image.title ?? '',
      status: 'done',
      url: image.path,
    }))
  );

  return result;
});
const removeItems = toRef(props, 'removeItems');
const displayImages = computed(() => {
  const result: {
    ID: number;
    url: string;
  }[] = [];

  result.push(
    ...props.buildingInfo.images.map((image) => {
      return {
        ID: image.ID,
        url: image.path,
      };
    })
  );

  props.removeItems.buildingImages.forEach((imageID) => {
    const index = result.findIndex((image) => image.ID === imageID);
    if (index !== -1) {
      result.splice(index, 1);
    }
  });

  props.addItems.buildingImages.forEach(async (image) => {
    if (image.image.originFileObj) {
      const base64 = await getBase64(image.image.originFileObj);
      result.push({
        ID: image.ID,
        url: base64 as string,
      });
    }
  });

  return result.map((image) => image.url);
});

// ---------------------- Functions ----------------------
function handleFileUpload(event: UploadChangeParam<UploadFile<any>>) {
  event.fileList.forEach((file) => {
    if (file.status !== 'done')
    {
      
    }
  });
}
</script>
