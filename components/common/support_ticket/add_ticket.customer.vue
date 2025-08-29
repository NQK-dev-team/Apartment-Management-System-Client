<template>
  <a-modal id="addTicketModal" v-model:open="openAddModal.value" name="addTicketModal" class="w-[700px]">
    <template #title>{{ $t('support_ticket_detail') }}</template>
    <template #footer>
      <a-button id="closeAddTicketModalButton" name="closeAddTicketModalButton" @click="openAddModal.value = false">{{
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
          <a-select
            id="building_name"
            v-model:value="newTicket.buildingID"
            :placeholder="$t('select_building')"
            class="w-full text-left"
          >
            <a-select-option v-for="(elem, index) in customerBuilding" :key="index" :value="elem.buildingID">{{
              elem.buildingName
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          class="ms-2 flex-1 flex flex-col"
          :name="['floor']"
          :rules="[{ required: true, message: $t('please_select_floor'), trigger: 'blur' }]"
        >
          <label for="room_floor" class="mb-1">{{ $t('floor') }}<span class="text-red-500 ms-1">*</span></label>
          <a-select
            id="room_floor"
            v-model:value="newTicket.floor"
            :disabled="!newTicket.buildingID"
            :placeholder="newTicket.buildingID ? $t('select_floor') : '-'"
            class="w-full text-left"
          >
            <a-select-option
              v-for="(elem, index) in customerBuilding.find(
                (item) => newTicket && item.buildingID === newTicket.buildingID
              )?.floors"
              :key="index"
              :value="elem.floorValue"
              >{{ elem.floorValue }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item
          class="flex-1 flex flex-col"
          :name="['roomID']"
          :rules="[{ required: true, message: $t('please_select_room'), trigger: 'blur' }]"
        >
          <label for="room_no" class="mb-1">{{ $t('room_no') }}<span class="text-red-500 ms-1">*</span></label>
          <a-select
            id="room_no"
            v-model:value="newTicket.roomID"
            :disabled="!newTicket.floor"
            :placeholder="newTicket.floor ? $t('select_room') : '-'"
            class="w-full text-left"
          >
            <a-select-option
              v-for="(elem, index) in customerBuilding
                .find((item) => newTicket && item.buildingID === newTicket.buildingID)
                ?.floors.find((f) => newTicket && f.floorValue === newTicket.floor)?.rooms"
              :key="index"
              :value="elem.roomID"
              >{{ elem.roomNo }}</a-select-option
            >
          </a-select>
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
import type { AddSupportTicket } from '~/types/support_ticket';

// ---------------------- Variables ----------------------
const props = defineProps({
  openAddModal: {
    type: Object as PropType<{ value: boolean }>,
    required: true,
  },
});
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
const customerBuilding = ref<
  {
    buildingID: number;
    buildingName: string;
    floors: {
      floorValue: number;
      rooms: {
        roomID: number;
        roomNo: number;
      }[];
    }[];
  }[]
>([]);

// ---------------------- Functions ----------------------
async function getRoomList() {
  try {
    $event.emit('loading');
    const response = await api.common.room.getList();
    const data = response.data;
    customerBuilding.value = [];

    data.forEach((elem) => {
      if (customerBuilding.value.findIndex((item) => item.buildingID === elem.buildingID) === -1) {
        customerBuilding.value.push({
          buildingID: elem.buildingID,
          buildingName: elem.buildingName || '',
          floors: [],
        });
      }

      const buildingResult = customerBuilding.value.find((item) => item.buildingID === elem.buildingID);
      if (buildingResult) {
        if (buildingResult.floors.findIndex((item) => item.floorValue === elem.floor) === -1) {
          buildingResult.floors.push({
            floorValue: elem.floor,
            rooms: [],
          });
        }

        const floorResult = buildingResult.floors.find((item) => item.floorValue === elem.floor);
        if (floorResult) {
          if (floorResult.rooms.findIndex((item) => item.roomID === elem.ID) === -1) {
            floorResult.rooms.push({
              roomID: elem.ID,
              roomNo: elem.no,
            });
          }
        }
      }
    });
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

    $event.emit('refetchCustomerSupportTickets');
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
      roomID: undefined,
      buildingID: undefined,
      floor: undefined,
    };
    ticketFormRef.value?.clearValidate();
  }
);

watch(
  () => newTicket.value?.buildingID,
  () => {
    if (!newTicket.value) {
      return;
    }
    newTicket.value.floor = undefined;
  }
);

watch(
  () => newTicket.value?.floor,
  () => {
    if (!newTicket.value) {
      return;
    }
    newTicket.value.roomID = undefined;
  }
);

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getRoomList();
});
</script>
