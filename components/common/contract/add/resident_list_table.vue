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
      <tbody v-if="residents.length">
        <ResidentList
          v-for="(resident, index) in residents"
          :key="resident.ID"
          :index="index"
          :resident="resident"
          :delete-bucket="deleteBucket"
          :customers="props.customers"
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
  return newContract.value.residents;
});
const checkAllResidents = computed(() => {
  return !!(
    residents.value.length && residents.value.every((resident) => deleteBucket.value.value.includes(resident.ID))
  );
});
const pageContentWidth = ref(0);

// ---------------------- Functions ----------------------
function removeAllResidentsFromBucket() {
  const IDs = residents.value.map((resident) => resident.ID);
  deleteBucket.value.value = deleteBucket.value.value.filter((id) => !IDs.includes(id));
}

function addAllResidentsToBucket() {
  deleteBucket.value.value.push(...residents.value.map((resident) => resident.ID));
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
