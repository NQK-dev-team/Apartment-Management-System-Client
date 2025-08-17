<template>
  <div
    class="relative h-full flex flex-col py-2 border-r-[1px] border-solid border-[#0505050f] shadow-xl menu_transition overflow-auto hideBrowserScrollbar"
    :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white', !collapse ? 'w-[250px]' : 'w-[75px]']"
  >
    <div class="fixed top-[50%] collapse_button_transform" :class="[!collapse ? 'left-[230px]' : 'left-[55px]']">
      <DoubleLeftOutlined
        class="text-xl border-[1px] border-solid rounded-full w-10 h-10 flex items-center justify-center"
        :class="[
          lightMode
            ? 'bg-white border-[#0505050f] text-gray-500 shadow-2xl'
            : 'bg-[#1f1f1f] border-[#272727] text-white',
        ]"
        :rotate="collapse ? 180 : 0"
        @click="collapse = !collapse"
      />
    </div>
    <div class="flex flex-col w-full flex-1">
      <LayoutNavItem
        v-if="props.role === roles.owner"
        :href="pageRoutes.common.report.index"
        :icon="Chart"
        :label="$t('dashboard')"
        :collapse="collapse"
      />
      <template v-if="props.role !== roles.customer">
        <LayoutBuildingNav :collapse="collapse" />
        <LayoutNavItem
          v-if="props.role === roles.owner"
          :href="pageRoutes.common.staff.list"
          :icon="Staff"
          :label="$t('staff')"
          :collapse="collapse"
        />
        <LayoutNavItem
          :href="pageRoutes.common.customer.list"
          :icon="User"
          :label="$t('customer')"
          :collapse="collapse"
        />
        <LayoutNavItem
          :href="pageRoutes.common.contract.list"
          :icon="Contract"
          :label="$t('contract')"
          :collapse="collapse"
        />
        <LayoutNavItem :href="pageRoutes.common.bill.list" :icon="Card" :label="$t('bill')" :collapse="collapse" />
        <LayoutNavItem
          :href="pageRoutes.common.support_ticket.list"
          :icon="Edit"
          :label="$t('support_ticket')"
          :collapse="collapse"
        />
      </template>
      <template v-if="props.role === roles.customer">
        <LayoutNavItem :href="pageRoutes.common.room.list" :icon="Room" :label="$t('room')" :collapse="collapse" />
        <LayoutNavItem
          :href="pageRoutes.common.contract.list"
          :icon="Contract"
          :label="$t('contract')"
          :collapse="collapse"
        />
        <LayoutNavItem :href="pageRoutes.common.bill.list" :icon="Card" :label="$t('bill')" :collapse="collapse" />
        <LayoutNavItem
          :href="pageRoutes.common.support_ticket.list"
          :icon="Edit"
          :label="$t('support_ticket')"
          :collapse="collapse"
        />
      </template>
      <ClientOnly>
        <LayoutNotificationNav :role="props.role" :collapse="collapse" :class="[collapse ? '' : 'my-1']" />
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts">
import Staff from '~/public/svg/staff.svg';
import User from '~/public/svg/user.svg';
import Contract from '~/public/svg/contract.svg';
import Card from '~/public/svg/card.svg';
import Edit from '~/public/svg/edit.svg';
import Room from '~/public/svg/room.svg';
import House from '~/public/svg/house.svg';
import Chart from '~/public/svg/chart.svg';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';

// ---------------------- Variables ----------------------
export const navItemPaddings = ['', 'ps-8', 'ps-12', 'ps-16', 'ps-20'];
</script>

<script lang="ts" setup>
// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const collapse = ref<boolean>(false);
const props = defineProps({
  role: {
    type: String,
    required: true,
  },
});
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
</script>

<style lang="css" scoped>
.menu_transition{
  transition: width 0.25s ease-in-out;
}

.collapse_button_transform{
  transition: left 0.25s ease-in-out;
}
</style>
