<template>
  <div>
    <div
      v-show="!props.collapse"
      style="display: flex"
      class="h-[40px] items-center flex-1 cursor-pointer select-none"
      :class="[
        lightMode ? 'light_nav' : 'dark_nav',
        props.collapse ? 'justify-center px-5' : 'justify-start ps-5',
      ]"
      :title="$t('notice')"
      @click="toggleDropdown"
    >
      <component :is="Notice" :class="[props.collapse ? 'text-2xl' : 'text-xl']" />
      <span v-show="!props.collapse" class="flex-1 text-sm truncate ms-3">
        {{ $t('notice') }}
      </span>
      <span v-show="!props.collapse" style="display: flex" class="items-center w-12 h-full justify-center">
        <DownArrow v-show="isDropdownOpen" />
        <UpArrow v-show="!isDropdownOpen" />
      </span>
      <span class="h-full w-[4px]"></span>
    </div>
    <div
      v-show="isDropdownOpen || props.collapse"
      class="flex-col"
      style="display: flex"
      :class="[lightMode ? (props.collapse ? '' : 'bg-[#FAFAFA]') : '']"
    >
      <div>
        <LayoutNavItem
          v-if="props.role !== roles.owner"
          :label="$t('notice_inbox')"
          :icon="Inbox"
          :collapse="props.collapse"
          :href="pageRoutes.common.notice.inbox"
          :is-child="true"
          :item-level="1"
        />
        <LayoutNavItem
          v-if="props.role !== roles.owner"
          :label="$t('notice_starred')"
          :icon="Star"
          :collapse="props.collapse"
          :href="pageRoutes.common.notice.starred"
          :is-child="true"
          :item-level="1"
        />
        <LayoutNavItem
          v-if="props.role !== roles.customer"
          :label="$t('notice_sent')"
          :icon="Sent"
          :collapse="props.collapse"
          :href="pageRoutes.common.notice.sent"
          :is-child="true"
          :item-level="1"
        />
        <LayoutNavItem
          v-if="props.role !== roles.customer"
          :label="$t('new_notice')"
          :icon="Write"
          :collapse="props.collapse"
          :href="pageRoutes.common.notice.new"
          :is-child="true"
          :item-level="1"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Notice from '~/public/svg/notice.svg';
import Sent from '~/public/svg/sent.svg';
import Write from '~/public/svg/write.svg';
import Star from '~/public/svg/star.svg';
import Inbox from '~/public/svg/inbox.svg';
import DownArrow from '~/public/svg/down_arrow.svg';
import UpArrow from '~/public/svg/up_arrow.svg';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';
import { isLightMode } from '#build/imports';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const props = defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
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
