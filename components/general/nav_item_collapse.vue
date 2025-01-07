<template>
  <div>
    <a
      v-if="props.href"
      class="h-[40px] flex items-center ps-5 flex-1 my-1"
      :href="props.href"
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
        props.collapse ? 'justify-center' : 'justify-start',
      ]"
    >
      <component :is="props.icon" :class="[props.collapse ? 'text-2xl' : 'text-xl']" />
      <p v-show="!props.collapse" :class="[props.icon ? 'ms-3' : '']" class="flex-1 text-sm">{{ props.label }}</p>
      <span class="flex items-center w-12 h-full justify-center" @click="toggleDropdown">
        <DownArrow v-show="!isDropdownOpen" />
        <UpArrow v-show="isDropdownOpen" />
      </span>
    </a>
    <div
      v-if="!props.href && !props.collapse"
      class="h-[40px] flex items-center flex-1 cursor-pointer select-none mt-1"
      :class="[
        lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
          ? 'light_nav'
          : 'dark_nav',
        props.collapse ? 'justify-center px-5' : 'justify-start ps-5',
      ]"
      @click="toggleDropdown"
    >
      <component :is="props.icon" :class="[props.collapse ? 'text-2xl' : 'text-xl']" />
      <p v-show="!props.collapse" :class="[props.icon ? 'ms-3' : '']" class="flex-1 text-sm">{{ props.label }}</p>
      <span v-if="!props.collapse" class="flex items-center w-12 h-full justify-center">
        <DownArrow v-show="!isDropdownOpen" />
        <UpArrow v-show="isDropdownOpen" />
      </span>
    </div>
    <div v-if="isDropdownOpen || props.collapse" class="flex flex-col" :class="[props.collapse ? '' : 'bg-[#F9F9F9]']">
      <GeneralNavItem
        v-for="(child, index) in props.children"
        :key="index"
        :collapse="props.collapse"
        :label="child.label"
        :icon="child.icon"
        :href="child.href"
        :is-child="child.isChild"
        :child-must-display="child.childMustDisplay"
        :class="[index !== props.children.length - 1 && props.collapse ? 'my-1' : '']"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DownArrow from '~/public/svg/down_arrow.svg';
import UpArrow from '~/public/svg/up_arrow.svg';
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
  children: {
    type: Array as PropType<
      { label: string; icon: string; href: string; isChild: boolean; childMustDisplay: boolean }[]
    >,
    default: () => [],
  },
  openDropdownFunction: {
    type: [Function],
    default: () => {},
  },
});
const isDropdownOpen = ref<boolean>(false);

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
