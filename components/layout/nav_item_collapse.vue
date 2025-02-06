<template>
  <div>
    <template v-if="props.href">
      <NuxtLink
        v-show="!props.collapse || !props.hideWhenCollapse"
        class="h-[40px] items-center flex-1"
        style="display: flex"
        :to="props.href"
        :class="[
          lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
            ? 'light_nav'
            : 'dark_nav',
          currentRoute.path.includes(props.href)
            ? lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
              ? 'light_selected'
              : 'dark_selected'
            : '',
          currentRoute.path.includes(props.href) &&
          (lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1) &&
          !props.collapse
            ? 'light_selected_border'
            : '',
          props.collapse ? 'justify-center px-5' : 'justify-start ps-5',
        ]"
        :title="props.label"
      >
        <component :is="props.icon" :class="[props.collapse ? 'text-2xl' : 'text-xl']" />
        <span
          v-show="!props.collapse"
          :class="[props.icon ? 'ms-3' : '', props.isChild && navItemPaddings[props.itemLevel]]"
          class="flex-1 text-sm truncate"
        >
          {{ props.label }}
        </span>
        <span
          v-if="props.children.length"
          v-show="!props.collapse"
          style="display: flex"
          class="items-center w-12 h-full justify-center"
          @click="toggleDropdown"
        >
          <DownArrow v-show="isDropdownOpen" />
          <UpArrow v-show="!isDropdownOpen" />
        </span>
        <!-- <span v-if="props.isChild" class="h-full w-[4px]"></span> -->
      </NuxtLink>
    </template>
    <template v-else>
      <div
        v-show="!props.collapse || !props.hideWhenCollapse"
        style="display: flex"
        class="h-[40px] items-center flex-1 cursor-pointer select-none"
        :class="[
          lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
            ? 'light_nav'
            : 'dark_nav',
          props.collapse ? 'justify-center px-5' : 'justify-start ps-5',
        ]"
        :title="props.label"
        @click="toggleDropdown"
      >
        <component :is="props.icon" :class="[props.collapse ? 'text-2xl' : 'text-xl']" />
        <span
          v-show="!props.collapse"
          :class="[props.icon ? 'ms-3' : '', props.isChild && navItemPaddings[props.itemLevel]]"
          class="flex-1 text-sm truncate"
        >
          {{ props.label }}
        </span>
        <span
          v-if="props.children.length"
          v-show="!props.collapse"
          style="display: flex"
          class="items-center w-12 h-full justify-center"
        >
          <DownArrow v-show="isDropdownOpen" />
          <UpArrow v-show="!isDropdownOpen" />
        </span>
        <!-- <span v-if="props.isChild" class="h-full w-[4px]"></span> -->
      </div>
    </template>
    <div
      v-show="isDropdownOpen || props.collapse"
      class="flex-col"
      style="display: flex"
      :class="[
        lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
          ? props.collapse
            ? ''
            : 'bg-[#FAFAFA]'
          : '',
      ]"
    >
      <div v-if="props.searchChildren" class="px-5">
        <a-select
          v-show="!props.collapse"
          :id="`${props.itemValue} select`"
          v-model:value="selectValue"
          :options="
            props.children.map((child) => ({
              value: child.itemValue,
            }))
          "
          mode="multiple"
          :placeholder="$t('enter_search')"
          max-tag-count="responsive"
          class="w-full"
          :class="[props.isChild && navItemPaddings[props.itemLevel]]"
        ></a-select>
      </div>
      <div
        :class="[
          props.children.every((child) => !child.children || !child.children.length)
            ? 'overflow-auto max-h-[200px]'
            : '',
        ]"
      >
        <template v-for="(child, index) in props.children" :key="index">
          <template v-if="!child.children || !child.children.length">
            <LayoutNavItem
              v-show="!selectValue.length || selectValue.includes(child.itemValue ?? '')"
              :collapse="props.collapse"
              :label="child.label"
              :icon="child.icon"
              :href="child.href"
              :is-child="child.isChild"
              :hide-when-collapse="child.hideWhenCollapse"
              :item-level="child.itemLevel"
              :item-value="child.itemValue"
            />
          </template>
          <template v-else>
            <LayoutNavItemCollapse
              v-show="!selectValue.length || selectValue.includes(child.itemValue ?? '')"
              :collapse="props.collapse"
              :label="child.label"
              :icon="child.icon"
              :children="child.children"
              :href="child.href"
              :is-child="child.isChild"
              :hide-when-collapse="child.hideWhenCollapse"
              :item-level="child.itemLevel"
              :search-children="child.searchChildren"
              :item-value="child.itemValue"
            />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DownArrow from '~/public/svg/down_arrow.svg';
import UpArrow from '~/public/svg/up_arrow.svg';
import { navItemPaddings, type NavChildren } from './nav_menu.vue';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const currentRoute = useRoute();
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: [Object, String],
    default: null,
  },
  href: {
    type: String,
    default: '',
  },
  collapse: {
    type: Boolean,
    required: true,
  },
  hideWhenCollapse: {
    type: Boolean,
    default: false,
  },
  children: {
    type: Array as PropType<NavChildren[]>,
    default: () => [],
  },
  isChild: {
    type: Boolean,
    default: false,
  },
  itemLevel: {
    type: Number,
    default: 0,
  },
  searchChildren: {
    type: Boolean,
    default: false,
  },
  itemValue: {
    type: String,
    default: '',
  },
});
const isDropdownOpen = ref<boolean>(false);
const selectValue = ref<string[]>([]);

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
