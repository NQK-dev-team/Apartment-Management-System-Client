<template>
  <a-card hoverable class="w-[250px] h-[350px]" :title="props.name">
    <template #cover>
      <img alt="Building image" :src="props.image" />
    </template>
    <template #actions>
      <EditOutlined />
      <DeleteOutlined />
    </template>
    <a-card-meta :title="props.address"
      :description="`${props.totalFloor} ${$t(`${props.totalFloor > 1 ? 'floors' : 'floor'}`)} - ${props.totalRoom} ${$t(`${props.totalRoom > 1 ? 'rooms' : 'room'}`)}`">
    </a-card-meta>
  </a-card>
</template>
<script lang="ts" setup>

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
  }
});
</script>
