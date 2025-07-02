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
      <tbody v-if="contractFiles.length">
        <PaperListItem
          v-for="(file, index) in contractFiles"
          :key="index"
          :index="index"
          :file="file"
          :delete-bucket="deleteBucket"
        />
      </tbody>
      <tbody v-else>
        <tr class="h-[150px]">
          <td :colspan="14" class="border-b-[1px]" :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']">
            <div class="h-full w-full">
              <div
                class="flex flex-col items-center justify-center overflow-hidden"
                :style="{ width: `${pageContentWidth - 2}px` }"
              >
                <svg v-if="lightMode" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                    <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                    <g fill-rule="nonzero" stroke="#d9d9d9">
                      <path
                        d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                      ></path>
                      <path
                        d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                        fill="#fafafa"
                      ></path>
                    </g>
                  </g>
                </svg>
                <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                    <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                    <g fill-rule="nonzero" stroke="#3e3e3e">
                      <path
                        d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                      ></path>
                      <path
                        d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                        fill="#1d1d1d"
                      ></path>
                    </g>
                  </g>
                </svg>
                <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                  {{ $t('no_data') }}
                </p>
              </div>
            </div>
          </td>
        </tr>
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
const pageContentWidth = ref(0);

// ---------------------- Functions ----------------------
function removeAllFilesFromBucket() {
  const IDs = editContract.value.value.files.filter((file) => file.isNew).map((file) => file.ID);

  deleteBucket.value.value = deleteBucket.value.value.filter((id) => !IDs.includes(id));
}

function addAllFilesToBucket() {
  deleteBucket.value.value.push(...editContract.value.value.files.filter((file) => file.isNew).map((file) => file.ID));
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      pageContentWidth.value = entry.contentRect.width - 10;
    }
  });

  resizeObserver.observe(document.getElementById('page_content')!);
});
</script>
