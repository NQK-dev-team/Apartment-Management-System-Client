<template>
  <div>
    <NuxtLink
      class="h-[40px] items-center flex-1"
      style="display: flex"
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
        v-show="!props.collapse"
        style="display: flex"
        class="items-center w-12 h-full justify-center"
        @click="toggleDropdown"
      >
        <DownArrow v-show="isDropdownOpen" />
        <UpArrow v-show="!isDropdownOpen" />
      </span>
      <!-- <span class="h-full w-[4px]"></span> -->
    </NuxtLink>
  </div>
  <div
    v-show="isDropdownOpen || props.collapse"
    class="flex-col"
    style="display: flex"
    :class="[lightMode ? (props.collapse ? '' : 'bg-[#FAFAFA]') : '']"
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
import { computedAsync } from '@vueuse/core';
import type { Building } from '~/types/building';
import { isLightMode } from '#build/imports';

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
const lightMode = computed(() => isLightMode(lightModeCookie.value));

// ---------------------- Functions ----------------------
function toggleDropdown(e: Event) {
  e.preventDefault();
  isDropdownOpen.value = !isDropdownOpen.value;
}

async function getBuildingList(): Promise<Building[]> {
  try {
    const response = await api.common.building.getList();
    const data = response.data;
    return data;
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  }
  return [];
}

// ---------------------- Variables ----------------------
const buildingList = computedAsync(async () => {
  return await getBuildingList();
}, []);
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
