<template>
  <div class="mt-3 mb-2 overflow-x-auto">
    <table class="w-full min-w-[500px]">
      <thead
        class="border-b-[1px]"
        :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
      >
        <tr>
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
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
              {{ $t('file_link') }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <CommonContractDetailViewModePaperListItem
          v-for="(file, index) in props.files"
          v-show="current * 5 >= index + 1 && (current - 1) * 5 < index + 1"
          :key="index"
          :index="index"
          :file="file"
        />
      </tbody>
    </table>
    <div v-if="props.files.length > 5" class="flex items-center justify-end mt-5">
      <a-pagination v-model:current="current" :total="props.files.length" :page-size="5" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ContractFile } from '~/types/contract';

// ---------------------- Variables ----------------------
const props = defineProps({
  files: {
    type: Array as () => ContractFile[],
    required: true,
  },
});
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const current = ref(1);
</script>
