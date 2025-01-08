<template>
  <a
    v-show="!props.collapse || !props.hideWhenCollapse"
    class="h-[40px] items-center pe-5"
    style="display: flex"
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
      props.collapse ? 'justify-center px-5' : 'justify-start ps-5',
      !props.isChild ? 'my-1' : props.collapse ? 'my-1' : 'my-0',
    ]"
  >
    <component
      :is="props.icon"
      v-show="!props.isChild || (props.isChild && props.collapse && !props.hideWhenCollapse)"
      :class="[props.collapse ? 'text-2xl' : 'text-xl']"
    />
    <p
      v-show="!props.collapse"
      :class="[
        !props.isChild || (props.isChild && props.collapse && !props.hideWhenCollapse) ? 'ms-3' : '',
        props.isChild && navItemPaddings[props.itemLevel],
      ]"
      class="flex-1 text-sm"
    >
      {{ props.label }}
    </p>
  </a>
</template>

<script lang="ts" setup>
import { navItemPaddings } from './nav_menu.vue';
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
    required: true,
  },
  collapse: {
    type: Boolean,
    required: true,
  },
  isChild: {
    type: Boolean,
    default: false,
  },
  hideWhenCollapse: {
    type: Boolean,
    default: false,
  },
  itemLevel: {
    type: Number,
    default: 0,
  },
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
