<template>
  <tr :class="[lightMode ? 'hover:bg-[#f1f1f1]' : 'hover:bg-[#32323280]']">
    <td v-if="!props.readOnly" class="text-sm text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <a-checkbox
          :id="`check_room_${roomInfo.no}`"
          :checked="checked"
          @click="checked ? removeFromBucket() : addToBucket()"
        ></a-checkbox>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        {{ roomInfo.no }}
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-select
            v-if="!props.readOnly"
            :id="`room_${roomInfo.no}_status_1`"
            v-model:value="roomInfo.status"
            placeholder="{{ $t('select_status') }}"
            class="w-full text-left"
          >
            <a-select-option :value="0" class="hidden">{{ $t('select_status') }}</a-select-option>
            <a-select-option :value="1" :class="`text-[#${roomStatusColor.rented}]`">{{
              $t('rented')
            }}</a-select-option>
            <a-select-option :value="2" :class="`text-[#${roomStatusColor.sold}]`">{{ $t('sold') }}</a-select-option>
            <a-select-option :value="3" :class="`text-[#${roomStatusColor.available}]`">{{
              $t('available')
            }}</a-select-option>
            <a-select-option :value="4" :class="`text-[#${roomStatusColor.maintance}]`">{{
              $t('maintenance')
            }}</a-select-option>
            <a-select-option :value="5" :class="`text-[#${roomStatusColor.unavailable}]`">{{
              $t('unavailable')
            }}</a-select-option>
          </a-select>
          <a-select
            v-else
            :id="`room_${roomInfo.no}_status_3`"
            :value="roomInfo.status"
            placeholder="{{ $t('select_status') }}"
            class="w-full text-left"
            disabled
            readonly
          >
            <a-select-option :value="0" class="hidden">{{ $t('select_status') }}</a-select-option>
            <a-select-option :value="1" :class="`text-[#${roomStatusColor.rented}]`">{{
              $t('rented')
            }}</a-select-option>
            <a-select-option :value="2" :class="`text-[#${roomStatusColor.sold}]`">{{ $t('sold') }}</a-select-option>
            <a-select-option :value="3" :class="`text-[#${roomStatusColor.available}]`">{{
              $t('available')
            }}</a-select-option>
            <a-select-option :value="4" :class="`text-[#${roomStatusColor.maintance}]`">{{
              $t('maintenance')
            }}</a-select-option>
            <a-select-option :value="5" :class="`text-[#${roomStatusColor.unavailable}]`">{{
              $t('unavailable')
            }}</a-select-option>
          </a-select>
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-input
            v-if="!props.readOnly"
            :id="`room_${roomInfo.no}_area_1`"
            v-model:value="roomInfo.area"
            :placeholder="$t('enter_room_area')"
            type="number"
            :min="0"
          />
          <a-input
            v-else
            :id="`room_${roomInfo.no}_area_3`"
            :value="roomInfo.area"
            :placeholder="$t('enter_room_area')"
            type="number"
            :min="0"
            disabled
            readonly
          />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div class="border-r-[1px]" :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <a-textarea
            v-if="!props.readOnly"
            :id="`room_${roomInfo.no}_description_1`"
            v-model:value="roomInfo.description"
            :placeholder="$t('enter_room_description')"
          />
          <a-textarea
            v-else
            :id="`room_${roomInfo.no}_description_3`"
            :value="roomInfo.description"
            :placeholder="$t('enter_room_description')"
            disabled
            readonly
          />
        </div>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <CommonBuildingEditRoomImage :room-info="roomInfo" :read-only="props.readOnly" :floor="floor"/>
      </div>
    </td>
    <td class="text-sm font-normal text-center align-middle py-[16px]">
      <div :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']">
        <div class="px-3">
          <p v-if="room.ID <= 0" class="text-red-500">{{ $t('new') }}</p>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue';
import { roomStatusColor } from '~/consts/color';
import type { RoomImage } from '~/types/building';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  room: {
    type: Object as PropType<{
      ID: number;
      createdAt: string;
      createdBy: number;
      updatedAt: string;
      updatedBy: number;
      no: number;
      floor: number;
      description: string;
      area: number | string;
      status: number;
      buildingID: number;
      images: ((RoomImage | UploadFile) & {
        isDeleted: boolean;
        isNew: boolean;
      })[];
      isDeleted: boolean;
      isNew: boolean;
    }>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteBucket: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  floor: {
    type: Number,
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const roomInfo = toRef(props, 'room');
const { $event } = useNuxtApp();
const checked = computed(() => props.deleteBucket.includes(roomInfo.value.ID));

// ---------------------- Functions ----------------------
function removeFromBucket() {
  $event.emit('removeRoomFromDeleteBucket', roomInfo.value.ID);
}

function addToBucket() {
  $event.emit('addRoomToDeleteBucket', roomInfo.value.ID);
}
</script>
