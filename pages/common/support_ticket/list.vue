<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('support_ticket_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex justify-between items-center">
        <h1 class="mt-3 text-2xl">{{ $t('support_ticket_list') }}</h1>
      </div>
      <div class="flex justify-center">
        <a-input-search class="w-[500px]" v-model:value="searchValue" :placeholder="$t('enter_search')" enter-button />
      </div>
    </div>
    <!-- Page main content -->
    <div class="px-4 py-3 mt-5 overflow-auto" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <!-- Heading of the  page -->
      <!-- <h1 class="flex justify-center mt-3 text-2xl ">{{ $t('employee_list') }}</h1> -->
      <!-- 2 columns -->
      <supportTicketTable/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import supportTicketTable from '@/components/common/supportTicket/supportTicketTable.vue';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Support ticket list',
  layout: 'main',
  middleware: ['authorization-manager']
});

useHead({
  title: 'Support ticket list',
  meta: [
    {
      name: 'description',
      content: 'List of support tickets',
    },
  ],
});

//use this to get the translation

const option = ref<number>(1);

const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const searchValue = ref('');

</script>

<style scoped>
  .btn-icon {
    @apply flex items-center justify-center p-0 w-[36px] rounded-none;
  }
  .editable-row-operations a {
    margin-right: 8px;
  }
  .delete {
    color: red;
  }
</style>