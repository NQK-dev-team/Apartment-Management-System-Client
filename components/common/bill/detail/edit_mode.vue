<template>
  <a-form ref="editForm" :model="bill">
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="building_name">
          <label for="building_name" class="flex mb-1">
            <span>{{ $t('building') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="building_name"
            disabled
            readonly
            :value="contract.buildingName"
            :placeholder="$t('building_name')"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="building_address">
          <label for="building_address" class="flex mb-1">
            <span>{{ $t('building_address') }}</span>
          </label>
          <a-input
            id="building_address"
            disabled
            readonly
            :value="contract.buildingAddress"
            :placeholder="$t('building_address')"
          />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="room_floor">
          <label for="room_floor" class="flex mb-1">
            <span>{{ $t('floor') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="room_floor" disabled readonly :value="contract.roomFloor" :placeholder="$t('floor')" />
        </a-form-item>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <a-form-item name="room_no">
          <label for="room_no" class="flex mb-1">
            <span>{{ $t('room_no') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input id="room_no" disabled readonly :value="contract.roomNo" :placeholder="$t('room_no')" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
import type { Bill } from '~/types/bill';

// ---------------------- Variables ----------------------
const props = defineProps({
  bill: {
    type: Object as PropType<Bill>,
    required: true,
  },
});
const bill = toRef(props, 'bill');
const editForm = ref(null);

// ---------------------- Functions ----------------------

// ---------------------- Events ----------------------
</script>
