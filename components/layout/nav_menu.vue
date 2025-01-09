<template>
  <div
    class="relative h-full flex flex-col py-2 border-r-[1px] border-solid border-[#0505050f] shadow-2xl menu_transition overflow-auto hideBrowserScrollbar"
    :class="[
      lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
        ? ''
        : 'bg-[#1f1f1f] text-white',
      !collapse ? 'w-[250px]' : 'w-[75px]',
    ]"
  >
    <div class="fixed top-[50%] collapse_button_transform" :class="[!collapse ? 'left-[230px]' : 'left-[55px]']">
      <DoubleLeftOutlined
        class="text-xl shadow-2xl border-[1px] border-solid rounded-full w-10 h-10 flex items-center justify-center"
        :class="[
          lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1
            ? 'bg-white border-[#0505050f] text-gray-500'
            : 'bg-[#1f1f1f] border-[#272727] text-white',
        ]"
        :rotate="collapse ? 180 : 0"
        @click="collapse = !collapse"
      />
    </div>
    <div class="flex flex-col w-full flex-1">
      <template v-if="props.role !== '001'">
        <LayoutNavItemCollapse
          class="mb-1"
          :label="$t('building')"
          :icon="House"
          :collapse="collapse"
          :href="pageRoutes.common.building.list"
          :children="buildingList"
        />
        <LayoutNavItem
          v-if="props.role === '110'"
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
        <LayoutNavItem
          v-if="props.role === '110'"
          :href="pageRoutes.common.report.page"
          :icon="Report"
          :label="$t('income_report')"
          :collapse="collapse"
        />
        <LayoutNavItemCollapse
          v-if="props.role === '110'"
          :label="$t('notice')"
          :icon="Notice"
          :collapse="collapse"
          :hide-when-collapse="true"
          :children="[
            {
              label: $t('notice_sent'),
              icon: Sent,
              href: pageRoutes.common.notice.sent,
              isChild: true,
              itemLevel: 1,
            },
            {
              label: $t('new_notice'),
              icon: Write,
              href: pageRoutes.common.notice.new,
              isChild: true,
              itemLevel: 1,
            },
          ]"
          :class="[collapse ? '' : 'my-1']"
        />
        <LayoutNavItemCollapse
          v-if="props.role === '010'"
          :label="$t('notice')"
          :icon="Notice"
          :collapse="collapse"
          :hide-when-collapse="true"
          :children="[
            {
              label: $t('notice_inbox'),
              icon: Inbox,
              href: pageRoutes.common.notice.inbox,
              isChild: true,
              itemLevel: 1,
            },
            {
              label: $t('notice_starred'),
              icon: Star,
              href: pageRoutes.common.notice.starred,
              isChild: true,
              itemLevel: 1,
            },
            {
              label: $t('notice_sent'),
              icon: Sent,
              href: pageRoutes.common.notice.sent,
              isChild: true,
              itemLevel: 1,
            },
            {
              label: $t('new_notice'),
              icon: Write,
              href: pageRoutes.common.notice.new,
              isChild: true,
              itemLevel: 1,
            },
          ]"
          :class="[collapse ? '' : 'my-1']"
        />
      </template>
      <template v-if="props.role === '001'">
        <LayoutNavItem :href="pageRoutes.common.room.list" :icon="House" :label="$t('room')" :collapse="collapse" />
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
        <LayoutNavItemCollapse
          :label="$t('notice')"
          :icon="Notice"
          :collapse="collapse"
          :hide-when-collapse="true"
          :children="[
            {
              label: $t('notice_inbox'),
              icon: Inbox,
              href: pageRoutes.common.notice.inbox,
              isChild: true,
              itemLevel: 1,
            },
            {
              label: $t('notice_starred'),
              icon: Star,
              href: pageRoutes.common.notice.starred,
              isChild: true,
              itemLevel: 1,
            },
          ]"
          :class="[collapse ? '' : 'my-1']"
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
import Notice from '~/public/svg/notice.svg';
import Sent from '~/public/svg/sent.svg';
import Write from '~/public/svg/write.svg';
import Star from '~/public/svg/star.svg';
import Inbox from '~/public/svg/inbox.svg';
import { pageRoutes } from '~/consts/page_routes';
// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const collapse = ref<boolean>(false);
const props = defineProps({
  role: {
    type: String,
    required: true,
  },
});
const buildingList = ref([
  {
    label: t('building', { name: '123' }),
    href: '/building/123',
    isChild: true,
    hideWhenCollapse: true,
    itemLevel: 1,
    searchChildren: true,
    children: [
      {
        label: t('room', { name: '123' }),
        itemValue: '123',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
    ],
  },
  {
    label: t('building', { name: '123' }),
    href: '/building/123',
    isChild: true,
    hideWhenCollapse: true,
    itemLevel: 1,
    searchChildren: true,
    children: [
      {
        label: t('room', { name: '123' }),
        itemValue: '123',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'asdasda' }),
        itemValue: 'asdasda',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'adasd1' }),
        itemValue: 'adasd1',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
      {
        label: t('room', { name: 'jihgipfjhio' }),
        itemValue: 'jihgipfjhio',
        href: '/building/123/room/123',
        isChild: true,
        hideWhenCollapse: true,
        itemLevel: 2,
      },
    ],
  },
]);

// ---------------------- Functions ----------------------
</script>

<script lang="ts">
export const navItemPaddings = ['', 'ps-8', 'ps-12', 'ps-16', 'ps-20'];
</script>

<style lang="css" scoped>
.menu_transition{
  transition: width 0.25s ease-out;
}

.collapse_button_transform{
  transition: left 0.25s ease-out;
}
</style>
