<template>
  <div class="flex overflow-auto w-full h-full pt-5">
    <div id="add_building_step_1_left_side" class="flex-1 h-full flex flex-col me-10">
      <div class="flex">
        <div class="flex-1">
          <label for="building_name_1" class="flex mb-1">
            <span>{{ $t('building_name') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="building_name_1" v-model:value="buildingInfo.name" :placeholder="$t('enter_building_name')" />
        </div>
        <div class="flex-1 ms-5">
          <label for="building_address_1" class="flex mb-1">
            <span>{{ $t('building_address') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="building_address_1"
            v-model:value="buildingInfo.address"
            :placeholder="$t('enter_building_address')"
          />
        </div>
      </div>
      <div class="mt-10">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('service_list') }}</h2>
          <div class="flex items-center">
            <a-button
              type="primary"
              danger
              class="flex items-center justify-center w-8 h-8 rounded-sm"
              :disabled="!serviceDeleteBucket.length"
              @click="
                () => {
                  openModal = true;
                  fallback = deleteServices;
                }
              "
              ><DeleteOutlined
            /></a-button>
            <a-button
              type="primary"
              class="ms-2 flex items-center justify-center w-8 h-8 rounded-sm"
              @click="
                buildingInfo.services.push({
                  name: '',
                  price: '',
                })
              "
              ><PlusOutlined
            /></a-button>
          </div>
        </div>
        <div class="mt-3 mb-2">
          <table class="w-full">
            <thead
              class="border-b-[1px]"
              :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
            >
              <tr>
                <th class="text-sm text-center align-middle py-[16px] rounded-tl-lg min-w-[40px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    <a-checkbox
                      id="check_all_services_1"
                      :disabled="!buildingInfo.services.length"
                      :checked="checkAllServices"
                      @click="checkAllServices ? removeAllServicesFromBucket() : addAllServicesToBucket()"
                    ></a-checkbox>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px] min-w-[75px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('no') }}
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px] flex items-center justify-center"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('service_name') }}
                    <div class="flex items-center">
                      <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                    </div>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px] flex items-center justify-center"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('service_price') }}
                    <div class="flex items-center">
                      <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="buildingInfo.services.length">
              <CommonBuildingAddServiceItem
                v-for="(service, index) in buildingInfo.services"
                :key="index"
                :index="index"
                :service="service"
                :service-delete-bucket="serviceDeleteBucket"
              />
            </tbody>
            <tbody v-else>
              <tr class="h-[150px]">
                <td
                  :colspan="100"
                  class="border-b-[1px]"
                  :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']"
                >
                  <div class="h-full w-full">
                    <div
                      class="flex flex-col items-center justify-center overflow-hidden"
                      :style="{ width: `${pageContentWidth - 2}px` }"
                    >
                      <svg
                        v-if="lightMode"
                        width="64"
                        height="41"
                        viewBox="0 0 64 41"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#d9d9d9">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#fafafa"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#3e3e3e">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#1d1d1d"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                        {{ $t('no_data') }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{{ $t('total') }}: {{ buildingInfo.services.length }}</p>
      </div>
      <div class="mt-10">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
          <div class="flex items-center">
            <a-button
              type="primary"
              danger
              class="flex items-center justify-center w-8 h-8 rounded-sm"
              :disabled="!scheduleDeleteBucket.length"
              @click="
                () => {
                  openModal = true;
                  fallback = deleteSchedules;
                }
              "
              ><DeleteOutlined
            /></a-button>
            <a-button
              type="primary"
              class="ms-2 flex items-center justify-center w-8 h-8 rounded-sm"
              @click="
                buildingInfo.schedules.push({
                  managerID: 0,
                  managerNo: undefined,
                  start: '',
                  end: '',
                })
              "
              ><PlusOutlined
            /></a-button>
          </div>
        </div>
        <div class="mt-3 mb-2">
          <table class="w-full">
            <thead
              class="border-b-[1px]"
              :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
            >
              <tr>
                <th class="text-sm text-center align-middle py-[16px] rounded-tl-lg min-w-[40px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    <a-checkbox
                      id="check_all_schedules_1"
                      :disabled="!buildingInfo.schedules.length"
                      :checked="checkAllSchedules"
                      @click="() => (checkAllSchedules ? removeAllSchedulesFromBucket() : addAllSchedulesToBucket())"
                    ></a-checkbox>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('no') }}
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px] flex items-center justify-center"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('employee') }}
                    <div class="flex items-center">
                      <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                    </div>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('email') }}
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('phone') }}
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px] flex items-center justify-center"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('startDate') }}
                    <div class="flex items-center">
                      <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                    </div>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px] flex items-center justify-center"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('endDate') }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="buildingInfo.schedules.length">
              <CommonBuildingAddScheduleItem
                v-for="(schedule, index) in buildingInfo.schedules"
                :key="index"
                :index="index"
                :schedule="schedule"
                :schedule-delete-bucket="scheduleDeleteBucket"
                :managers="props.managers"
              />
            </tbody>
            <tbody v-else>
              <tr class="h-[150px]">
                <td
                  :colspan="100"
                  class="border-b-[1px]"
                  :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']"
                >
                  <div class="h-full w-full">
                    <div
                      class="flex flex-col items-center justify-center overflow-hidden"
                      :style="{ width: `${pageContentWidth - 2}px` }"
                    >
                      <svg
                        v-if="lightMode"
                        width="64"
                        height="41"
                        viewBox="0 0 64 41"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#d9d9d9">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#fafafa"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#3e3e3e">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#1d1d1d"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                        {{ $t('no_data') }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{{ $t('total') }}: {{ buildingInfo.schedules.length }}</p>
      </div>
      <div class="mt-10">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('floor_list') }}</h2>
          <div class="flex items-center">
            <a-button
              type="primary"
              danger
              class="flex items-center justify-center w-8 h-8 rounded-sm"
              :disabled="!floorDeleteBucket.length"
              @click="
                () => {
                  openModal = true;
                  fallback = deleteFloors;
                }
              "
              ><DeleteOutlined
            /></a-button>
            <a-button
              type="primary"
              class="ms-2 flex items-center justify-center w-8 h-8 rounded-sm"
              @click="
                buildingInfo.floors.push({
                  rooms: [],
                })
              "
              ><PlusOutlined
            /></a-button>
          </div>
        </div>
        <div class="mt-3 mb-2">
          <table class="w-full">
            <thead
              class="border-b-[1px]"
              :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
            >
              <tr>
                <th class="text-sm text-center align-middle py-[16px] rounded-tl-lg min-w-[40px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    <a-checkbox
                      id="check_all_floors_1"
                      :disabled="!buildingInfo.floors.length"
                      :checked="checkAllFloors"
                      @click="() => (checkAllFloors ? removeAllFloorsFromBucket() : addAllFloorsToBucket())"
                    ></a-checkbox>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('floor_number') }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="buildingInfo.floors.length">
              <CommonBuildingAddFloorItem
                v-for="(_, index) in buildingInfo.floors"
                :key="index"
                :index="index"
                :floor-delete-bucket="floorDeleteBucket"
              />
            </tbody>
            <tbody v-else>
              <tr class="h-[150px]">
                <td
                  :colspan="100"
                  class="border-b-[1px]"
                  :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']"
                >
                  <div class="h-full w-full">
                    <div
                      class="flex flex-col items-center justify-center overflow-hidden"
                      :style="{ width: `${pageContentWidth - 2}px` }"
                    >
                      <svg
                        v-if="lightMode"
                        width="64"
                        height="41"
                        viewBox="0 0 64 41"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#d9d9d9">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#fafafa"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#3e3e3e">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#1d1d1d"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                        {{ $t('no_data') }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{{ $t('total') }}: {{ buildingInfo.floors.length }}</p>
      </div>
    </div>
    <div class="min-w-[350px] max-w-[350px] h-full">
      <div class="flex">
        <h2 class="text-xl">{{ $t('building_image') }}</h2>
        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
      </div>
      <img v-if="!imageList.length" :src="svgPaths.placeholderImage" :alt="$t('avatar')" class="w-full mt-1" />
      <div class="flex flex-col">
        <div v-for="(image, index) in imageList" :key="index" class="mt-3">
          <img :src="image" :alt="$t('building_image') + ` ${index}`" class="w-full" />
        </div>
      </div>
      <div class="mt-3 text-center">
        <a-upload
          v-model:file-list="buildingInfo.images"
          :accept="COMMON.ALLOW_IMAGE_EXTENSIONS.join(',')"
          multiple
          list-type="text"
          :before-upload="beforeUploadBuildingImage"
          @change="(e: any) => handleFileUpload(e)"
        >
          <a-button class="flex items-center rounded-sm">
            <upload-outlined></upload-outlined>
            {{ $t('upload_file') }}
          </a-button>
        </a-upload>
        <div class="mt-5 text-sm" :class="[lightMode ? 'text-[#00000080]' : 'text-[#d2d2d2a3]']">
          {{ $t('recommended_resolution') }}
        </div>
      </div>
    </div>
    <CommonBuildingAddConfirmDeleteModal :open="openModal" :fallback="fallback" />
  </div>
</template>

<script lang="ts" setup>
import type { NewBuildingInfo } from '~/types/building';
import { svgPaths } from '~/consts/svg_paths';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';
import { getBase64 } from '#build/imports';
import type { User } from '~/types/user';
import { COMMON } from '~/consts/common';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<NewBuildingInfo>,
    required: true,
  },
  managers: {
    type: Array as PropType<User[]>,
    required: true,
  },
});
const buildingInfo = toRef(props, 'buildingInfo');
const serviceDeleteBucket = ref<number[]>([]);
const floorDeleteBucket = ref<number[]>([]);
const scheduleDeleteBucket = ref<number[]>([]);
const { $event } = useNuxtApp();
const checkAllServices = computed(
  () =>
    !!(buildingInfo.value.services.length && buildingInfo.value.services.length === serviceDeleteBucket.value.length)
);
const checkAllFloors = computed(
  () => !!(buildingInfo.value.floors.length && buildingInfo.value.floors.length === floorDeleteBucket.value.length)
);
const checkAllSchedules = computed(
  () =>
    !!(buildingInfo.value.schedules.length && buildingInfo.value.schedules.length === scheduleDeleteBucket.value.length)
);
const openModal = ref<boolean>(false);
const fallback = ref<() => void>(() => {});
const imageList = ref<string[]>([]);
const { t } = useI18n();
const invalidImages = ref<string[]>([]);
const pageContentWidth = ref(0);

// ---------------------- Functions ----------------------
function handleFileUpload(event: UploadChangeParam<UploadFile<any>>) {
  buildingInfo.value.images = buildingInfo.value.images.filter((file) => !invalidImages.value.includes(file.uid));

  let isDone = true;

  event.fileList.forEach((file) => {
    if (file.status !== 'done') {
      isDone = false;
    }
  });

  if (!isDone) {
    return;
  }

  const files = event.fileList.map((file) => file.originFileObj);
  imageList.value = [];
  Array.from(files).forEach(async (file) => {
    if (file) {
      const base64 = await getBase64(file);
      imageList.value.push(base64 as string);
    }
  });
}

function deleteServices() {
  buildingInfo.value.services = buildingInfo.value.services.filter(
    (_, index) => !serviceDeleteBucket.value.includes(index)
  );
  serviceDeleteBucket.value = [];
}

function deleteFloors() {
  $event.emit('resetSelectedFloor');
  buildingInfo.value.floors = buildingInfo.value.floors.filter((_, index) => !floorDeleteBucket.value.includes(index));
  floorDeleteBucket.value = [];
}

function deleteSchedules() {
  buildingInfo.value.schedules = buildingInfo.value.schedules.filter(
    (_, index) => !scheduleDeleteBucket.value.includes(index)
  );
  scheduleDeleteBucket.value = [];
}

function addAllServicesToBucket() {
  serviceDeleteBucket.value = buildingInfo.value.services.map((_, index) => index);
}

function removeAllServicesFromBucket() {
  serviceDeleteBucket.value = [];
}

function addAllFloorsToBucket() {
  floorDeleteBucket.value = buildingInfo.value.floors.map((_, index) => index);
}

function removeAllFloorsFromBucket() {
  floorDeleteBucket.value = [];
}

function addAllSchedulesToBucket() {
  scheduleDeleteBucket.value = buildingInfo.value.schedules.map((_, index) => index);
}

function removeAllSchedulesFromBucket() {
  scheduleDeleteBucket.value = [];
}

function beforeUploadBuildingImage(file: any): boolean {
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_IMAGE_EXTENSIONS.includes(`.${type}`)) {
    invalidImages.value.push(file.uid);
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_file_type', { types: COMMON.ALLOW_IMAGE_EXTENSIONS.join(', ') }),
    });
    return false;
  }

  if (file.size >= COMMON.IMAGE_SIZE_LIMIT) {
    invalidImages.value.push(file.uid);
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_size', { size: COMMON.IMAGE_SIZE_LIMIT_STR }),
    });
    return false;
  }
  return true;
}

// ---------------------- Event Listeners ----------------------
$event.on('addServiceToDeleteBucket', (e: any) => {
  if (!serviceDeleteBucket.value.includes(e)) {
    serviceDeleteBucket.value.push(e);
  }
});

$event.on('addFloorToDeleteBucket', (e: any) => {
  if (!floorDeleteBucket.value.includes(e)) {
    floorDeleteBucket.value.push(e);
  }
});

$event.on('addScheduleToDeleteBucket', (e: any) => {
  if (!scheduleDeleteBucket.value.includes(e)) {
    scheduleDeleteBucket.value.push(e);
  }
});

$event.on('removeServiceFromDeleteBucket', (e: any) => {
  serviceDeleteBucket.value = serviceDeleteBucket.value.filter((idx) => idx !== e);
});

$event.on('removeFloorFromDeleteBucket', (e: any) => {
  floorDeleteBucket.value = floorDeleteBucket.value.filter((idx) => idx !== e);
});

$event.on('removeScheduleFromDeleteBucket', (e: any) => {
  scheduleDeleteBucket.value = scheduleDeleteBucket.value.filter((idx) => idx !== e);
});

$event.on('closeDeleteModalAddBuilding', () => {
  openModal.value = false;
});

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      pageContentWidth.value = entry.contentRect.width;
    }
  });

  resizeObserver.observe(document.getElementById('add_building_step_1_left_side')!);
});
</script>
