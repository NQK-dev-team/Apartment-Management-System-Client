<template>
  <div class="mt-3 mb-2 overflow-x-auto">
    <table class="w-full min-w-[1500px]">
      <thead
        class="border-b-[1px]"
        :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
      >
        <tr>
          <th class="text-sm text-center align-middle py-[16px] rounded-tl-lg w-[40px]">
            <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
              <a-checkbox
                id="check_all_schedules_1"
                :disabled="!editContract.value.residents.length"
                :checked="checkAllResidents"
                @click="() => (checkAllResidents ? removeAllResidentsFromBucket() : addAllResidentsToBucket())"
              ></a-checkbox>
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
            <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
              {{ $t('no') }}
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[250px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('customer_no') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('last_name') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('middle_name') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('first_name') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('gender') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('dob') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('ssn') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('old_ssn') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('phone') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('email') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[200px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('relationship_with_owner') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <ResidentList
          v-for="(resident, index) in editContract.value.residents.filter((resident) => !resident.isDeleted)"
          v-show="current * 5 >= index + 1 && (current - 1) * 5 < index + 1"
          :key="index"
          :index="index"
          :resident="resident"
          :delete-bucket="deleteBucket"
        />
      </tbody>
    </table>
    <div
      v-if="editContract.value.residents.filter((resident) => !resident.isDeleted).length > 5"
      class="flex items-center justify-end mt-5"
    >
      <a-pagination
        v-model:current="current"
        :total="editContract.value.residents.filter((resident) => !resident.isDeleted).length"
        :page-size="5"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ResidentList from './resident_list_item.vue';
import { svgPaths } from '~/consts/svg_paths';
import type { Contract } from '~/types/contract';

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
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const current = ref(1);
const deleteBucket = toRef(props, 'deleteBucket');
const checkAllResidents = computed(() => {
  const currentPage = editContract.value.value.residents
    .filter((_, index) => current.value * 5 >= index + 1 && (current.value - 1) * 5 < index + 1)
    .filter((resident) => !resident.isDeleted);

  return !!(currentPage.length && currentPage.every((resident) => deleteBucket.value.value.includes(resident.ID)));
});

// ---------------------- Functions ----------------------
function removeAllResidentsFromBucket() {
  const IDs = editContract.value.value.residents
    .filter((_, index) => current.value * 5 >= index + 1 && (current.value - 1) * 5 < index + 1)
    .filter((resident) => !resident.isDeleted)
    .map((resident) => resident.ID);

  deleteBucket.value.value = deleteBucket.value.value.filter((id) => !IDs.includes(id));
}

function addAllResidentsToBucket() {
  deleteBucket.value.value.push(
    ...editContract.value.value.residents
      .filter((_, index) => current.value * 5 >= index + 1 && (current.value - 1) * 5 < index + 1)
      .filter((resident) => !resident.isDeleted)
      .map((resident) => resident.ID)
  );
}
</script>
