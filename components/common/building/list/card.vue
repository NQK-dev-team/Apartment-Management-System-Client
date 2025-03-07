<template>
  <NuxtLink :to="pageRoutes.common.building.detail(props.id)">
    <a-card hoverable class="w-[250px] border-2 select-none" :title="props.name">
      <template #cover>
        <img alt="Building image" :src="props.image" class="w-[250px] h-[300px] rounded-none p-[2px]" />
      </template>
      <template v-if="userRole?.toString() === roles.owner" #actions>
        <NuxtLink :to="pageRoutes.common.building.edit(props.id)">
          <EditOutlined />
        </NuxtLink>
        <DeleteOutlined
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
  image: {
    type: String,
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
    if (
      err.status >= 500 ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
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
