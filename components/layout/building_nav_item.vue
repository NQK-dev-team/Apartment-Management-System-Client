<template>
  <div>
    <NuxtLink
      v-show="!props.collapse"
      class="h-[40px] items-center flex-1"
      style="display: flex"
      :to="pageRoutes.common.building.detail(building.ID)"
      :class="[
        lightMode ? 'light_nav' : 'dark_nav',
        currentRoute.path.includes(pageRoutes.common.building.detail(building.ID))
          ? lightMode
            ? 'light_selected'
            : 'dark_selected'
          : '',
        currentRoute.path.includes(pageRoutes.common.building.detail(building.ID)) &&
        lightMode &&
        !props.collapse
          ? 'light_selected_border'
          : '',
        props.collapse ? 'justify-center px-5' : 'justify-start ps-5',
      ]"
      :title="$t('building', { name: building.name })"
    >
      <span v-show="!props.collapse" class="flex-1 text-sm truncate" :class="navItemPaddings[1]">
        {{ building.name }}
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
      <span class="h-full w-[4px]"></span>
    </NuxtLink>
  </div>
  <div
    v-show="isDropdownOpen || props.collapse"
    class="flex-col"
    style="display: flex"
    :class="[lightMode ? (props.collapse ? '' : 'bg-[#FAFAFA]') : '']"
  >
    <div class="px-5">
      <a-select
        v-show="!props.collapse"
        v-model:value="selectValue"
        :options="
          roomList.map((room) => ({
            value: room.no,
          }))
        "
        mode="multiple"
        :placeholder="$t('enter_search')"
        max-tag-count="responsive"
        class="w-full"
        :class="navItemPaddings[1]"
      ></a-select>
    </div>
    <div class="overflow-auto max-h-[200px]">
      <template v-for="(room, index) in roomList" :key="index">
        <LayoutNavItem
          v-show="selectValue.length === 0 || selectValue.includes(room.no)"
          :label="$t('room', { name: room.no.toString() })"
          :collapse="props.collapse"
          :href="pageRoutes.common.building.roomDetail(building.ID, room.ID)"
          :is-child="true"
          :item-level="2"
          :hide-when-collapse="true"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DownArrow from '~/public/svg/down_arrow.svg';
import UpArrow from '~/public/svg/up_arrow.svg';
import { pageRoutes } from '~/consts/page_routes';
import type { Building, Room } from '~/types/building';
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { navItemPaddings } from './nav_menu.vue';
import { isLightMode } from '#build/imports';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const currentRoute = useRoute();
const props = defineProps({
  building: {
    type: Object as PropType<Building>,
    required: true,
  },
  collapse: {
    type: Boolean,
    required: true,
  },
});
const isDropdownOpen = ref<boolean>(false);
const roomList = ref<Room[]>([]);
const selectValue = ref<number[]>([]);
const lightMode = computed(() => isLightMode(lightModeCookie.value));

// ---------------------- Functions ----------------------
async function getBuildingRoom() {
  try {
    const response = await api.common.building.getRoomList(props.building.ID);
    const data = response.data;

    roomList.value = data;
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    }
  }
}

async function toggleDropdown(e: Event) {
  e.preventDefault();
  isDropdownOpen.value = !isDropdownOpen.value;

  if (isDropdownOpen.value && !roomList.value.length) {
    getBuildingRoom();
  }
}
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
