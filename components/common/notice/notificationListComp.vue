<template>
    <div
      class="flex h-16 mx-3 justify-between custom-border border-b-2 cursor-pointer"
      :class="selected ? 'border-b-sky-500' : 'border-b-gray-300'"
      @click="$emit('click')"
    >
      <h2
        class="flex flex-col justify-center font-semibold transition-colors"
        :class="selected ? 'text-sky-500' : 'text-black'"
      >
        Thông báo diễn tập PCCC
      </h2>
      <div class="flex">
        <EditOutlined class="text-sky-500 hover:text-sky-300 me-3"/>
        <DeleteOutlined class="text-red-500 hover:text-red-300"/>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  defineProps<{ selected: boolean }>();
  </script>

<style lang="css" scoped>
  .custom-border {
    border-width: 2px !important;
    border-color: white;
  }
</style>