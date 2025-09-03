<template>
  <NuxtLink :id="`building_${props.id}_link`" :to="pageRoutes.common.building.detail(props.id)">
    <a-card hoverable class="w-[275px] border-2 select-none" :title="props.name">
      <template #cover>
        <a-carousel :autoplay="true" arrows>
          <div v-for="(image, index) in props.images" :key="index">
            <img class="w-[275px] h-[325px] rounded-none p-[2px]" :src="image" :alt="`Building image ${index + 1}`" />
          </div>
        </a-carousel>
      </template>
      <template #actions>
        <NuxtLink :id="`edit_building_${props.id}_link`" :to="pageRoutes.common.building.edit(props.id)">
          <EditOutlined />
        </NuxtLink>
        <DeleteOutlined
          v-if="userRole?.toString() === roles.owner"
          :id="`delete_building_${props.id}_link`"
          class="text-red-500 hover:text-red-300 active:text-red-600"
          @click="
            (e: any) => {
              e.preventDefault();
              openDeleteBuildingModal();
            }
          "
        />
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
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';
import { api } from '~/services/api';

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
const { t } = useI18n();
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
  images: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});
const { $event } = useNuxtApp();

// ---------------------- Functions ----------------------
async function deleteBuilding() {
  try {
    $event.emit('loading');
    await api.common.building.deleteBuilding(props.id);
    $event.emit('deleteItemSuccess');
    $event.emit('reload-building-list');
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    } else if (
      err.response._data.message === getMessageCode('PERMISSION_DENIED') ||
      err.response._data.message === getMessageCode('INVALID_CREDENTIALS') ||
      err.response._data.message === getMessageCode('TOKEN_REFRESH_FAILED') ||
      err.response._data.message === getMessageCode('TOKEN_VERIFY_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('no_permission'),
      });
    } else if (
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('failed'),
        description: t('request_error'),
      });
    } else if (
      err.response._data.message === getMessageCode('UPDATE_FAILED') ||
      err.response._data.message === getMessageCode('CREATE_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('data_invalid'),
      });
    } else if (err.response._data.message === getMessageCode('DATA_NOT_FOUND')) {
      notification.error({
        message: t('failed'),
        description: t('data_not_found'),
      });
    }
  } finally {
    $event.emit('loading');
  }
}

function openDeleteBuildingModal() {
  $event.emit('deleteItem', { callback: deleteBuilding });
}
</script>
