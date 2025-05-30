<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.staff.list">{{ $t('notice') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('new_notice') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex justify-between items-center">
        <h1 class="mt-3 text-2xl">{{ $t('new_notice') }}</h1>
      </div>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <div class="w-full flex-1 flex flex-col mt-3">
        <div class="flex-1 me-5">
          <label for="title" class="flex mb-1 text-xl font-bold">
            <span>{{ $t('title') }}</span>
          </label>
          <a-input id="title" :value="$t('title')" :placeholder="$t('title')" class="mt-2" />
        </div>
        <!-- <div class="flex items-center justify-center mt-3">
          <imageUpload :label="$t('image')"/>
        </div> -->

        <!-- <div class="flex-1 me-5">
          <label for="content" class="flex mb-1 text-xl font-bold">
            <span>{{ $t('content') }}</span>
          </label>
          <div id="text-tools">

          </div>
          <a-textarea id="content_box" :value="$t('content')" :placeholder="$t('content')" :rows="12" class="mt-2"/>
        </div> -->
        <div class="flex-1 me-5">
          <label for="content" class="flex mb-1 text-xl font-bold">
            <span>{{ $t('content') }}</span>
          </label>
          <div id="text-tools">
            <!-- Quill Editor -->
            <!-- QUILL editor is used here to have a powerful rich text editing function -->
            <div ref="quillEditor" style="height: 300px"></div>
          </div>
          <!--
          To save the content entered in the Quill editor, you can retrieve the HTML content using quillInstance.root.innerHTML. For example:
          function saveContent() {
            const content = quillInstance?.root.innerHTML || '';
            console.log('Saved Content:', content);
            // Save the content to your backend or state
          } -->
        </div>
        <div class="flex items-center mt-3">
          <h2 class="me-3 text-xl font-bold">{{ $t('reciever') }}:</h2>
          <p
            class="me-3 cursor-pointer select-none"
            :class="[
              option === 1
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 1"
          >
            {{ $t('employee') }}
          </p>
          <p
            class="mx-3 cursor-pointer select-none"
            :class="[
              option === 2
                ? 'text-[#1890FF] border-b-2 border-[#1890FF]'
                : 'hover:text-[#40a9ff] active:text-[#096dd9]',
            ]"
            @click="option = 2"
          >
            {{ $t('customer') }}
          </p>
        </div>
        <div class="flex items-center mt-3">
          <h2 class="me-3 text-xl font-bold">{{ $t('building') }}:</h2>
          <a-select
            :options="options"
            mode="multiple"
            size="large"
            placeholder="Select building"
            style="width: 200px"
            id="building-select"
          ></a-select>

          <h2 v-show="option === 2" class="ms-5 me-3 text-xl font-bold">{{ $t('floor') }}:</h2>
          <a-select
            v-show="option === 2"
            :options="options"
            mode="multiple"
            size="large"
            placeholder="Select floor"
            style="width: 200px"
            id="floor-select"
          ></a-select>
        </div>
        <div class="flex flex-col justify-start mt-3">
          <p v-show="option === 1" id="number-of-manager-selected">
            Number of customer selected: {{ selectedEmployeeCount }}
          </p>
          <p v-show="option === 2" id="number-of-customer-selected">
            Number of customer selected: {{ selectedCustomerCount }}
          </p>
          <h2 v-show="option === 1" class="text-xl font-bold">{{ $t('employee_list') }}</h2>
          <h2 v-show="option === 2" class="text-xl font-bold">{{ $t('customer_list') }}</h2>
        </div>

        <ClientOnly>
          <CustomerTable v-show="option === 2" @update-selected-count="updateSelectedCustomerCount" />
          <EmployeeTable v-show="option === 1" @update-selected-count="updateSelectedEmployeeCount" />
        </ClientOnly>
        <div class="flex flex-col items-center my-5">
          <a-button class="my-2 w-[100px] rounded-sm" type="primary">
            <NuxtLink :to="pageRoutes.common.staff.list">{{ $t('sent') }}</NuxtLink>
          </a-button>
          <a-button class="my-2 w-[100px] rounded-sm">
            <NuxtLink :to="pageRoutes.common.staff.list">{{ $t('back') }}</NuxtLink>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import CustomerTable from '@/components/common/notice/CustomerTable.vue';
import EmployeeTable from '@/components/common/notice/EmployeeTable.vue';
// import imageUpload from '@/components/common/customComponent/imageUpload.vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { ref, onMounted } from 'vue';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'New notice',
  layout: 'main',
  middleware: ['authorization-owner'],
});

useHead({
  title: 'New notice',
  meta: [
    {
      name: 'description',
      content: 'New notice information in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const route = useRoute();
const staffID = Number(route.params.id as string);
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);

const option = ref<number>(1);
const options = [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }));

const quillEditor = ref<HTMLDivElement | null>(null);
let quillInstance: Quill | null = null;

const { t } = useI18n();

// Reactive property to store the count of selected customers
const selectedCustomerCount = ref(0);
const selectedEmployeeCount = ref(0);

// ---------------------- Functions ----------------------

// Function to handle the emitted event
function updateSelectedCustomerCount(count: number) {
  selectedCustomerCount.value = count;
}
// Function to handle the emitted event
function updateSelectedEmployeeCount(count: number) {
  selectedEmployeeCount.value = count;
}
// ---------------------- Lifecycles ----------------------
onMounted(() => {
  if (quillEditor.value) {
    quillInstance = new Quill(quillEditor.value, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['undo', 'redo'], // Undo and Redo
          [{ font: [] }], // Font selection
          ['bold', 'italic', 'underline'], // Bold, Italic, Underline
          [{ color: [] }], // Font color
          [{ align: '' }, { align: 'center' }, { align: 'right' }], // Alignment
          [{ list: 'ordered' }, { list: 'bullet' }], // Ordered and Bullet lists
        ],
      },
    });

    // Example: Listen for text changes
    quillInstance.on('text-change', () => {
      console.log('Content:', quillInstance?.root.innerHTML);
    });
  }
});

// ---------------------- Watchers ----------------------

// ---------------------- Events ----------------------
</script>

<style scoped>
#text-tools {
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
