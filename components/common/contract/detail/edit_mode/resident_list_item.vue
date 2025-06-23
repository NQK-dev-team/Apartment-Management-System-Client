<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td class="text-sm text-center align-middle py-[16px]">
      <a-form-item class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox
          :id="`check_resident_${props.index + 1}`"
          :checked="checked"
          @click="checked ? removeFromBucket() : addToBucket()"
        ></a-checkbox>
      </a-form-item>
    </td>
    <!-- <td class="text-sm font-normal text-center align-middle py-[16px]">
      <a-form-item class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        {{ props.index + 1 }}
      </a-form-item>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item
          :name="['files', props.index, 'title']"
          :rules="[{ required: true, message: $t('file_title_require'), trigger: 'blur' }]"
          class="px-3 align_validation_message_start"
        >
          <a-input
            v-if="!file.isNew"
            :id="`contract_file_${props.index + 1}_name`"
            :value="file.title ?? ''"
            :placeholder="$t('file_name')"
            type="text"
            disabled
            readonly
          />
          <a-input
            v-else
            :id="`contract_file_${props.index + 1}_name`"
            v-model:value="file.title as string"
            :placeholder="$t('enter_file_name')"
            type="text"
          />
        </a-form-item>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-form-item
          :name="['files', props.index, 'path']"
          :rules="[{ required: true, message: $t('file_require'), trigger: 'blur' }]"
          class="px-3"
        >
          <NuxtLink
            v-if="!file.isNew"
            :to="file.path as string"
            target="_blank"
            class="text-[#1890FF]"
            :title="file.path"
            ><LinkOutlined
          /></NuxtLink>
          <a-upload
            v-else
            :id="`contract_file_${props.index + 1}_file`"
            v-model:file-list="file.path as UploadFile[]"
            accept=".png,.jpg,.jpeg,.pdf"
          >
            <a-button class="flex flex-col items-center justify-center h-full w-full p-3">
              <plus-outlined />
              <div style="margin-top: 8px">{{ $t('upload_file') }}</div>
            </a-button>
          </a-upload>
        </a-form-item>
      </div>
    </td> -->
  </tr>
</template>

<script lang="ts" setup>
import type { RoomResident } from '~/types/contract';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  resident: {
    type: Object as PropType<RoomResident>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteBucket: {
    type: Object as PropType<{ value: number[] }>,
    required: true,
  },
});
const deleteBucket = toRef(props, 'deleteBucket');
const resident = toRef(props, 'resident');
const checked = computed(() => deleteBucket.value.value.includes(resident.value.ID));

// ---------------------- Functions ----------------------
function removeFromBucket() {
  const index = deleteBucket.value.value.indexOf(resident.value.ID);
  if (index !== -1) {
    deleteBucket.value.value.splice(index, 1);
  }
}

function addToBucket() {
  if (!deleteBucket.value.value.includes(resident.value.ID)) {
    deleteBucket.value.value.push(resident.value.ID);
  }
}
</script>
