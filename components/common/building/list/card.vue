<template>
  <NuxtLink :to="pageRoutes.common.building.detail(props.id)">
    <a-card hoverable class="w-[250px] border-2 select-none" :title="props.name">
      <template #cover>
        <img alt="Building image" :src="props.image" />
      </template>
      <template #actions>
        <NuxtLink :to="pageRoutes.common.building.edit(props.id)">
          <EditOutlined />
        </NuxtLink>
        <DeleteOutlined class="text-red-500 hover:text-red-300 active:text-red-600" />
      </template>
      <a-card-meta
        :title="props.address"
        :description="`${props.totalFloor} ${$t(`${props.totalFloor > 1 ? 'floors' : 'floor'}`)} - ${props.totalRoom} ${$t(`${props.totalRoom > 1 ? 'rooms' : 'room'}`)}`"
      >
      </a-card-meta>
    </a-card>
  </NuxtLink>
</template>
<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  totalRoom: {
    type: Number,
    required: true,
  },
  totalFloor: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});
</script>
