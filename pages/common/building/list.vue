<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('building_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('building_list') }}</h1>
      <div class="flex justify-end items-center">
        <!-- <div></div>
        <a-input-search
          id="searchBuilding"
          v-model:value="searchValue"
          class="w-[500px]"
          :placeholder="$t('enter_search')"
          enter-button
          @search="filterBuildingList"
        /> -->
        <NuxtLink
          v-if="userRole?.toString() === roles.owner"
          id="addBuildingLink"
          name="addBuildingLink"
          :to="pageRoutes.common.building.add"
        >
          <a-button type="primary" class="flex items-center rounded-sm"><PlusOutlined /></a-button>
        </NuxtLink>
      </div>
    </div>
    <div class="mt-5 overflow-auto p-3 flex-1" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <div v-if="buildingList.length > 0" class="flex justify-center items-center">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <CommonBuildingListCard
            v-for="(building, index) in buildingList"
            v-show="current * 8 >= index + 1 && (current - 1) * 8 < index + 1"
            :id="building.id"
            :key="index"
            :name="building.name"
            :address="building.address"
            :total-room="building.totalRoom"
            :total-floor="building.totalFloor"
            :images="building.images"
          />
        </div>
      </div>
      <div v-else class="w-full h-full flex items-center justify-center">
        <table class="w-full h-full">
          <tbody>
            <tr class="h-full">
              <td :colspan="100">
                <div class="h-full w-full">
                  <div class="flex flex-col items-center justify-center overflow-hidden w-full h-full">
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
      <div v-if="buildingList.length > 8" class="flex justify-center mt-10 mb-3">
        <a-pagination v-model:current="current" :total="buildingList.length" :default-page-size="8" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { ref } from 'vue';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Building List',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Building List',
  meta: [
    {
      name: 'description',
      content: 'List of buildings in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
const buildingList = ref<
  {
    id: number;
    name: string;
    address: string;
    totalRoom: number;
    totalFloor: number;
    images: string[];
  }[]
>([]);
const { $event } = useNuxtApp();
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const current = ref(1);
// const searchValue = ref('');
// const buildingListFiltered = ref<
//   {
//     id: number;
//     name: string;
//     address: string;
//     totalRoom: number;
//     totalFloor: number;
//     image: string;
//   }[]
// >([]);

// ---------------------- Functions ----------------------
async function getBuildingList() {
  try {
    $event.emit('loading');
    const response = await api.common.building.getList();
    const data = response.data;
    buildingList.value = data.map((element) => {
      return {
        id: element.ID,
        name: element.name,
        address: element.address,
        totalRoom: element.totalRoom,
        totalFloor: element.totalFloor,
        images: element.images.map((image) => {
          return image.path as string;
        }),
      };
    });
    // buildingListFiltered.value = buildingList.value;
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  } finally {
    $event.emit('loading');
  }
}

// function filterBuildingList() {
//   buildingListFiltered.value = buildingList.value.filter((building) => {
//     return removeDiacritics(building.name).toLowerCase().includes(searchValue.value.toLowerCase().trim());
//   });
//   current.value = 1;
// }

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getBuildingList();
});

// ---------------------- Event Listeners ----------------------
$event.on('reload-building-list', getBuildingList);
</script>
