<template>
  <a-modal id="addTicketModal" v-model:open="openAddModal.value" name="addTicketModal" class="w-[700px]">
    <template #title>{{ $t('support_ticket_detail') }}</template>
    <template #footer>
      <a-button id="closeAddTicketModal" name="closeAddTicketModal" @click="openAddModal.value = false">{{
        $t('close')
      }}</a-button>
      <a-button
        id="createTicketButton"
        name="createTicketButton"
        type="primary"
        class="ms-2"
        @click="handleCreateClick"
        >{{ $t('create_ticket') }}</a-button
      >
    </template>
    <a-form v-if="newTicket" ref="ticketFormRef" :model="newTicket">
      <div class="flex w-full">
        <a-form-item
          class="flex-1 flex flex-col"
          :name="['buildingID']"
          :rules="[{ required: true, message: $t('please_select_building'), trigger: 'blur' }]"
        >
          <label for="building_name" class="mb-1">{{ $t('building') }}<span class="text-red-500 ms-1">*</span></label>
          <a-input id="building_name" :value="roomData.buildingName" disabled readonly />
        </a-form-item>
        <a-form-item
          class="ms-2 flex-1 flex flex-col"
          :name="['floor']"
          :rules="[{ required: true, message: $t('please_select_floor'), trigger: 'blur' }]"
        >
          <label for="room_floor" class="mb-1">{{ $t('floor') }}</label>
          <a-input id="room_floor" :value="roomData.floor" disabled readonly />
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item
          class="flex-1 flex flex-col"
          :name="['roomID']"
          :rules="[{ required: true, message: $t('please_select_room'), trigger: 'blur' }]"
        >
          <label for="room_no" class="mb-1">{{ $t('room_no') }}</label>
          <a-input id="room_no" :value="roomData.no" disabled readonly />
        </a-form-item>
        <a-form-item class="ms-2 flex-1 flex flex-col">
          <label for="customer" class="mb-1">{{ $t('customer') }}</label>
          <a-input id="customer" :value="userNo + ' - ' + userName" disabled readonly />
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item
          class="flex-1 flex flex-col"
          :name="['title']"
          :rules="[
            { required: true, message: $t('ticket_title_required') },
            {
              max: COMMON.MAX_LENGTH.SUPPORT_TICKET_TITLE,
              message: $t('ticket_title_max_length', { length: COMMON.MAX_LENGTH.SUPPORT_TICKET_TITLE }),
            },
          ]"
        >
          <label for="title" class="mb-1">{{ $t('title') }}<span class="text-red-500 ms-1">*</span></label>
          <a-input id="title" v-model:value="newTicket.title" />
        </a-form-item>
        <a-form-item
          class="ms-2 flex-1 flex flex-col"
          :name="['content']"
          :rules="[{ required: true, message: $t('ticket_content_required') }]"
        >
          <label for="content" class="mb-1">{{ $t('content') }}<span class="text-red-500 ms-1">*</span></label>
          <a-textarea id="content" v-model:value="newTicket.content" />
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item class="flex-1">
          <div class="flex flex-col">
            <label for="image">{{ $t('image') }}</label>
            <a-upload
              id="image"
              v-model:file-list="newTicket.fileList"
              class="mt-2"
              :accept="COMMON.ALLOW_IMAGE_EXTENSIONS.join(',')"
              multiple
              :before-upload="beforeUploadImage"
            >
              <a-button class="flex items-center">
                <upload-outlined></upload-outlined>
                {{ $t('upload_file') }}
              </a-button>
            </a-upload>
          </div>
        </a-form-item>
        <a-form-item class="ms-2 flex-1 flex flex-col"> </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { Upload, type FormInstance } from 'ant-design-vue';
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { api } from '~/services/api';
import type { Room } from '~/types/building';
import type { AddSupportTicket } from '~/types/support_ticket';

// ---------------------- Variables ----------------------
const props = defineProps({
  openAddModal: {
    type: Object as PropType<{ value: boolean }>,
    required: true,
  },
  roomData: {
    type: Object as PropType<Room>,
    required: true,
  },
});
const roomData = toRef(props, 'roomData');
const openAddModal = toRef(props, 'openAddModal');
const ticketFormRef = ref<FormInstance>();
const { $event } = useNuxtApp();
const { t } = useI18n();
const newTicket = ref<
  | (AddSupportTicket & {
      buildingID: number | undefined;
      floor: number | undefined;
    })
  | undefined
>(undefined);
const userName = useCookie('userName');
const userNo = useCookie('userNo');

// ---------------------- Functions ----------------------
async function addTicket() {
  try {
    $event.emit('loading');
    const formData = new FormData();
    formData.append('title', newTicket.value?.title?.trim() ?? '');
    formData.append('content', newTicket.value?.content?.trim() ?? '');
    formData.append('roomID', newTicket.value?.roomID?.toString() ?? '');
    newTicket.value?.fileList.forEach((file) => {
      formData.append('files[]', file.originFileObj as File);
    });

    await api.common.support_ticket.add(formData);

    notification.success({
      message: t('create_ticket_success'),
      description: t('new_ticket_created'),
    });

    $event.emit('refetchRoomTickets');
    openAddModal.value.value = false;
  } catch (err: any) {
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
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

async function handleCreateClick() {
  try {
    await ticketFormRef.value?.validate();
    await addTicket();
  } catch (err: any) {
    /* empty */
  }
}

function beforeUploadImage(file: any): boolean | string {
  let type = file.type || '';
  if (type) {
    type = type.split('/')[1] || '';
  } else {
    type = file.name.split('.').pop() || '';
  }

  if (!COMMON.ALLOW_IMAGE_EXTENSIONS.includes(`.${type}`)) {
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_file_type', { types: COMMON.ALLOW_IMAGE_EXTENSIONS.join(', ') }),
    });
    return Upload.LIST_IGNORE;
  }

  if (file.size >= COMMON.IMAGE_SIZE_LIMIT) {
    notification.error({
      message: t('invalid_image_title'),
      description: t('invalid_image_size', { size: COMMON.IMAGE_SIZE_LIMIT_STR }),
    });
    return Upload.LIST_IGNORE;
  }
  return true;
}

// ---------------------- Watchers ----------------------
watch(
  () => openAddModal.value.value,
  () => {
    newTicket.value = {
      title: '',
      content: '',
      fileList: [],
      roomID: roomData.value.ID,
      buildingID: roomData.value.buildingID,
      floor: roomData.value.floor,
    };
    ticketFormRef.value?.clearValidate();
  }
);
</script>
