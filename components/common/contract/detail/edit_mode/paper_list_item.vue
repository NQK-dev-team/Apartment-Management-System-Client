<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        {{ props.index + 1 }}
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-input
            :id="`contract_file_${props.index + 1}_name`"
            :value="file.title ?? ''"
            :placeholder="$t('file_name')"
            type="text"
            disabled
            readonly
          />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <NuxtLink :to="file.path" target="_blank" class="text-[#1890FF]" :title="file.path"
            ><LinkOutlined
          /></NuxtLink>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { ContractFile } from '~/types/contract';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  file: {
    type: Object as PropType<ContractFile>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>
