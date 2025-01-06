<template>
  <div
    class="relative h-full flex flex-col py-2 border-r-[1px] border-solid border-[#0505050f] shadow-2xl menu_transition"
    :class="[
      lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
        ? ''
        : 'bg-[#001529] text-white',
      !collapse ? 'w-[225px]' : 'w-[75px]',
    ]"
  >
    <div class="absolute top-[50%] collapse_button_transform" :class="[!collapse ? 'left-[90%]' : 'left-[70%]']">
      <DoubleLeftOutlined
        class="text-xl shadow-2xl border-[1px] border-solid rounded-full w-10 h-10 flex items-center justify-center"
        :class="[
          lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
            ? 'bg-white border-[#0505050f] text-gray-500'
            : 'bg-[#001529] border-[#272727] text-white',
        ]"
        :rotate="collapse ? 180 : 0"
        @click="collapse = !collapse"
      />
    </div>
    <div class="flex flex-col w-full flex-1">
      <template v-if="props.role !== '001'">
        <GeneralNavItem href="/staff" :icon="Staff" :label="$t('staff')" :collapse="collapse" />
        <GeneralNavItem class="my-1" href="/customer" :icon="User" :label="$t('customer')" :collapse="collapse" />
        <GeneralNavItem class="my-1" href="/contract" :icon="Contract" :label="$t('contract')" :collapse="collapse" />
        <GeneralNavItem class="my-1" href="/bill" :icon="Card" :label="$t('bill')" :collapse="collapse" />
        <GeneralNavItem
          class="my-1"
          href="/support-ticket"
          :icon="Edit"
          :label="$t('support_ticket')"
          :collapse="collapse"
        />
        <GeneralNavItem class="my-1" href="/report" :icon="Report" :label="$t('income_report')" :collapse="collapse" />
      </template>
      <template v-if="props.role === '001'">
        <GeneralNavItem class="my-1" href="/room" :icon="House" :label="$t('room')" :collapse="collapse" />
        <GeneralNavItem class="my-1" href="/contract" :icon="Contract" :label="$t('contract')" :collapse="collapse" />
        <GeneralNavItem class="my-1" href="/bill" :icon="Card" :label="$t('bill')" :collapse="collapse" />
        <GeneralNavItem
          class="my-1"
          href="/support-ticket"
          :icon="Edit"
          :label="$t('support_ticket')"
          :collapse="collapse"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Staff from '~/public/svg/staff.svg';
import User from '~/public/svg/user.svg';
import Contract from '~/public/svg/contract.svg';
import Card from '~/public/svg/card.svg';
import Edit from '~/public/svg/edit.svg';
import Report from '~/public/svg/report.svg';
import House from '~/public/svg/house.svg';
// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const collapse = ref<boolean>(false);
const props = defineProps({
  role: {
    type: String,
    required: true,
  },
});

// ---------------------- Functions ----------------------
</script>

<style lang="css" scoped>
.menu_transition{
  transition: width 0.25s;
}

.collapse_button_transform{
  transition: left 0.1s linear;
}
</style>
