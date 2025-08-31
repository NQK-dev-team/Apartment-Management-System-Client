<template>
  <NuxtLink
    :id="`to_room_${props.index + 1}_detail_link`"
    :name="`to_room_${props.index + 1}_detail_link`"
    :to="pageRoutes.common.room.detail(room.ID)"
  >
    <a-card hoverable class="w-[275px] border-2 select-none" :title="$t('room', { name: room.no })">
      <template #cover>
        <a-carousel :autoplay="true" arrows>
          <div v-for="(image, index) in room.images" :key="index">
            <img
              class="w-[275px] h-[325px] rounded-none p-[2px]"
              :src="image.path as string"
              :alt="`Room image ${index + 1}`"
            />
          </div>
        </a-carousel>
      </template>
      <a-card-meta :title="$t('floor', { name: room.floor })">
        <template #description>
          <p>{{ room.buildingName }}</p>
          <p>{{ room.buildingAddress }}</p>
        </template>
      </a-card-meta>
    </a-card>
  </NuxtLink>
</template>
<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import type { Room } from '~/types/building';

// ---------------------- Variables ----------------------
const props = defineProps({
  room: {
    type: Object as PropType<Room>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const room = toRef(props, 'room');
</script>
