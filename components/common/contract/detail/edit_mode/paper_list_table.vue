<template>
  <div class="mt-3 mb-2 overflow-x-auto">
    <table class="w-full min-w-[500px]">
      <thead
        class="border-b-[1px]"
        :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
      >
        <tr>
          <th class="text-sm text-center align-middle py-[16px] rounded-tl-lg w-[40px]">
            <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
              <a-checkbox
                id="check_all_files_1"
                :disabled="!contractFiles.some((file) => file.isNew)"
                :checked="checkAllFiles"
                @click="() => (checkAllFiles ? removeAllFilesFromBucket() : addAllFilesToBucket())"
              ></a-checkbox>
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
            <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
              {{ $t('no') }}
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('file_name') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('file_link') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <PaperListItem
          v-for="(file, index) in contractFiles"
          :key="index"
          :index="index"
          :file="file"
          :delete-bucket="deleteBucket"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { Contract } from '~/types/contract';
import PaperListItem from './paper_list_item.vue';
import { svgPaths } from '~/consts/svg_paths';

// ---------------------- Variables ----------------------
const props = defineProps({
  editContract: {
    type: Object as PropType<{ value: Contract }>,
    required: true,
  },
  deleteBucket: {
    type: Object as PropType<{ value: number[] }>,
    required: true,
  },
});
const editContract = toRef(props, 'editContract');
const contractFiles = computed(() => {
  return editContract.value.value.files || [];
});
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const deleteBucket = toRef(props, 'deleteBucket');
const checkAllFiles = computed(() => {
  const currentPage = editContract.value.value.files.filter((file) => file.isNew);

  return !!(currentPage.length && currentPage.every((file) => deleteBucket.value.value.includes(file.ID)));
});

// ---------------------- Functions ----------------------
function removeAllFilesFromBucket() {
  const IDs = editContract.value.value.files.filter((file) => file.isNew).map((file) => file.ID);

  deleteBucket.value.value = deleteBucket.value.value.filter((id) => !IDs.includes(id));
}

function addAllFilesToBucket() {
  deleteBucket.value.value.push(...editContract.value.value.files.filter((file) => file.isNew).map((file) => file.ID));
}
</script>
