<template>
  <div class="mt-3 mb-2 overflow-x-auto">
    <table class="w-full min-w-[2250px]">
      <thead
        class="border-b-[1px]"
        :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
      >
        <tr>
          <th class="text-sm text-center align-middle py-[16px] rounded-tl-lg min-w-[40px]">
            <div class="border-r-[1px] h-[20px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
              <a-checkbox
                id="check_all_residents_1"
                :disabled="!newContract.residents.length"
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
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[400px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('customer_no') }}
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[300px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('last_name') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[500px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('middle_name') }}
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[300px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('name') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[300px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('gender') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[300px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('dob') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[700px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('pob') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[300px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('ssn') }}
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[300px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('old_ssn') }}
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[300px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('phone') }}
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[300px]">
            <div
              class="border-r-[1px] h-[20px] flex items-center justify-center"
              :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
            >
              {{ $t('email') }}
            </div>
          </th>
          <th class="text-sm font-normal text-center align-middle py-[16px] w-[400px]">
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
          v-for="(resident, index) in residents"
          :key="resident.ID"
          :index="index"
          :resident="resident"
          :delete-bucket="deleteBucket"
          :customers="props.customers"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import ResidentList from './resident_list_item.vue';
import { svgPaths } from '~/consts/svg_paths';
import type { AddContract, RoomResident } from '~/types/contract';
import type { User } from '~/types/user';

// ---------------------- Variables ----------------------
const props = defineProps({
  newContract: {
    type: Object as PropType<AddContract>,
    required: true,
  },
  deleteBucket: {
    type: Object as PropType<{ value: number[] }>,
    required: true,
  },
  customers: {
    type: Array as PropType<User[]>,
    required: true,
  },
});
const newContract = toRef(props, 'newContract');
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const deleteBucket = toRef(props, 'deleteBucket');
const residents = computed<RoomResident[]>(() => {
  return newContract.value.residents.filter((resident) => !resident.isDeleted);
});
const checkAllResidents = computed(() => {
  return !!(
    residents.value.length && residents.value.every((resident) => deleteBucket.value.value.includes(resident.ID))
  );
});

// ---------------------- Functions ----------------------
function removeAllResidentsFromBucket() {
  const IDs = residents.value.map((resident) => resident.ID);
  deleteBucket.value.value = deleteBucket.value.value.filter((id) => !IDs.includes(id));
}

function addAllResidentsToBucket() {
  deleteBucket.value.value.push(...residents.value.map((resident) => resident.ID));
}
</script>
