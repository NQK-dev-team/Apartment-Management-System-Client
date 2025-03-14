<template>
  <div class="Image-upload px-6 mb-3">
    <label for="">{{ label }}<span class="text-red-500">*</span></label>
    <img :src="svgPaths.placeholderImage" alt="Add employee" class="w-full h-full" />
    <div class="flex justify-center mt-3">
      <a-button class="flex items-center"><upload-outlined></upload-outlined>upload</a-button>
    </div>
    <div class="flex justify-between" title="upload-item">
      <a target="_blank" rel="noopener noreferrer" class="text-cyan-400" title="upload-item-view-linnk" href="http://www.baidu.com/xxx.png">xxx.png</a>
      <span title="progress-and-delete">
        <span class="" title="upload-progress"> 80%</span>
        <span class="pl-3">
          <button class="" title="Remove file" type="button">
            <span role="img" aria-label="delete" class="anticon anticon-delete">
              <svg focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
              </svg>
            </span>
          </button>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { svgPaths } from '~/consts/svg_paths';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
</style>