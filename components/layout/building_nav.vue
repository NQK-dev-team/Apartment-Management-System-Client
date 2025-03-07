<template>
  <div class="mb-1">
    <NuxtLink
      class="h-[40px] items-center flex-1 flex"
      :to="pageRoutes.common.building.list"
      :class="[
        lightMode ? 'light_nav' : 'dark_nav',
        currentRoute.path.includes(pageRoutes.common.building.list)
          ? lightMode
            ? 'light_selected'
            : 'dark_selected'
          : '',
        currentRoute.path.includes(pageRoutes.common.building.list) && lightMode && !props.collapse
          ? 'light_selected_border'
          : '',
        props.collapse ? 'justify-center px-5' : 'justify-start ps-5',
      ]"
      :title="$t('building')"
    >
      <component :is="House" :class="[props.collapse ? 'text-2xl' : 'text-xl']" />
      <span v-show="!props.collapse" class="flex-1 text-sm truncate ms-3">
        {{ $t('building') }}
      </span>
      <span
        class="items-center w-12 h-full justify-center"
        :class="[!props.collapse ? 'flex' : 'hidden']"
        @click="toggleDropdown"
      >
        <DownArrow v-show="isDropdownOpen" />
        <UpArrow v-show="!isDropdownOpen" />
      </span>
    </NuxtLink>
  </div>
  <div
    class="flex-col"
    :class="[
      lightMode ? (props.collapse ? '' : 'bg-[#FAFAFA]') : '',
      isDropdownOpen || props.collapse ? 'flex' : 'hidden',
    ]"
  >
    <template v-for="(building, index) in buildingList" :key="index">
      <LayoutBuildingNavItem :collapse="collapse" :building="building" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import DownArrow from '~/public/svg/down_arrow.svg';
import UpArrow from '~/public/svg/up_arrow.svg';
import { pageRoutes } from '~/consts/page_routes';
import House from '~/public/svg/house.svg';
import { api } from '~/services/api';
import { getMessageCode } from '~/consts/api_response';
import type { Building } from '~/types/building';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const currentRoute = useRoute();
const props = defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});
const isDropdownOpen = ref<boolean>(false);
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const buildingList = ref<Building[]>([]);
// ---------------------- Functions ----------------------
function toggleDropdown(e: Event) {
  e.preventDefault();
  isDropdownOpen.value = !isDropdownOpen.value;
}

async function getBuildingList() {
  try {
    const response = await api.common.building.getList();
    const data = response.data;
    buildingList.value = data;
  } catch (err: any) {
    if (
      err.status >= 500 ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getBuildingList();
});
</script>

<style lang="css" scoped>
.light_nav{
  color: #000;
}

.light_selected{
  color:#1890FF;
  background-color: #E6F7FF;
}

.light_selected_border{
  border-right: 4px solid #1890FF;
}

.light_nav:hover{
  background-color: #e9e9e9;
}

.light_nav:active{
  background-color: #e6f7ff;
}

.dark_nav{
  color: #ffffffa6;
}

.dark_nav:hover{
  color:#ffffff;
}

.dark_selected{
  color:#ffffff;
  background-color: #1890FF;
}
</style>
