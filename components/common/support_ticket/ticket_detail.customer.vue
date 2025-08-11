<template>
  <a-modal v-if="ticketDetail" v-model:open="detailModalVisible.value" class="w-[700px]">
    <template #title>{{ $t('support_ticket_detail') }}</template>
    <template #footer>
      <a-button @click="detailModalVisible.value = false">{{ $t('close') }}</a-button>
      <a-button
        v-if="
          ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.PENDING &&
          !ticketDetail.managerID &&
          !ticketDetail.ownerID &&
          ticketDetail.customerID === Number(userID || 0)
        "
        type="primary"
        class="ms-2"
        @click="handleSaveChanges"
        >{{ $t('save_changes') }}</a-button
      >
    </template>
    <a-form ref="ticketFormRef" :model="ticketDetail">
      <div class="flex w-full">
        <a-form-item class="flex-1 flex flex-col">
          <label for="building_name" class="mb-1">{{ $t('building') }}</label>
          <a-input id="building_name" :value="ticketDetail.buildingName" disabled readonly />
        </a-form-item>
        <a-form-item class="ms-2 flex-1 flex flex-col">
          <label for="room_floor" class="mb-1">{{ $t('floor') }}</label>
          <a-input id="room_floor" :value="ticketDetail.roomFloor" disabled readonly />
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item class="flex-1 flex flex-col">
          <label for="room_no" class="mb-1">{{ $t('room_no') }}</label>
          <a-input id="room_no" :value="ticketDetail.roomNo" disabled readonly />
        </a-form-item>
        <a-form-item class="ms-2 flex-1 flex flex-col">
          <label for="ticket_id" class="mb-1">{{ $t('ticket_id') }}</label>
          <a-input id="ticket_id" :value="ticketDetail.ID" disabled readonly />
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item class="flex-1 flex flex-col">
          <label for="customer" class="mb-1">{{ $t('customer') }}</label>
          <a-input
            id="customer"
            :value="ticketDetail.customer.no + ' - ' + getUserName(ticketDetail.customer)"
            disabled
            readonly
          />
        </a-form-item>
        <a-form-item class="ms-2 flex-1 flex flex-col">
          <label for="creation_date" class="mb-1">{{ $t('creation_date') }}</label>
          <a-input id="creation_date" :value="convertToDateTime(ticketDetail.createdAt)" disabled readonly />
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item class="flex-1 flex flex-col">
          <label for="status" class="mb-1">{{ $t('status') }}</label>
          <a-input
            id="status"
            :value="
              ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.PENDING
                ? t('pending')
                : ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.APPROVED
                  ? t('approved')
                  : t('denied')
            "
            :class="{
              'text-green-500': ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.APPROVED,
              'text-red-500': ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.REJECTED,
            }"
            disabled
            readonly
          />
        </a-form-item>
        <a-form-item class="ms-2 flex-1 flex flex-col">
          <label for="manager" class="mb-1">{{ $t('manager_approving') }}</label>
          <a-input
            id="manager"
            :value="ticketDetail.managerID ? ticketDetail.manager.no + ' - ' + getUserName(ticketDetail.manager) : '-'"
            :title="ticketDetail.managerID ? ticketDetail.manager.no + ' - ' + getUserName(ticketDetail.manager) : '-'"
            disabled
            readonly
          />
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item class="flex-1 flex flex-col">
          <label for="manager_decision" class="mb-1">{{ $t('manager_decision') }}</label>
          <a-input
            id="manager_decision"
            :value="!ticketDetail.managerID ? '-' : ticketDetail.managerResult ? t('approved') : t('denied')"
            disabled
            readonly
          />
        </a-form-item>
        <a-form-item class="ms-2 flex-1 flex flex-col">
          <label for="decision_time_1" class="mb-1">{{ $t('decision_time') }}</label>
          <a-input
            id="decision_time_1"
            :value="
              ticketDetail?.managerResolveTime.Valid
                ? convertToDateTime(ticketDetail.managerResolveTime.Time! as string)
                : '-'
            "
            disabled
            readonly
          />
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item class="flex-1 flex flex-col">
          <label for="owner" class="mb-1">{{ $t('owner_approving') }}</label>
          <a-input
            id="owner"
            :value="ticketDetail.ownerID ? ticketDetail.owner.no + ' - ' + getUserName(ticketDetail.owner) : '-'"
            :title="ticketDetail.ownerID ? ticketDetail.owner.no + ' - ' + getUserName(ticketDetail.owner) : '-'"
            disabled
            readonly
          />
        </a-form-item>
        <a-form-item class="ms-2 flex-1 flex flex-col">
          <label for="owner_decision" class="mb-1">{{ $t('owner_decision') }}</label>
          <a-input
            id="owner_decision"
            :value="ticketDetail.ownerID ? (ticketDetail.ownerResult ? t('approved') : t('denied')) : '-'"
            disabled
            readonly
          />
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item class="flex-1 flex flex-col">
          <label for="decision_time_2" class="mb-1">{{ $t('decision_time') }}</label>
          <a-input
            id="decision_time_2"
            :value="
              ticketDetail?.ownerResolveTime.Valid
                ? convertToDateTime(ticketDetail.ownerResolveTime.Time! as string)
                : '-'
            "
            disabled
            readonly
          />
        </a-form-item>
        <a-form-item
          v-if="
            ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.PENDING &&
            !ticketDetail.managerID &&
            !ticketDetail.ownerID &&
            ticketDetail.customerID === Number(userID || 0)
          "
          class="ms-2 flex-1 flex flex-col"
          :name="['title']"
          :rules="[{ required: true, message: $t('ticket_title_required') }]"
        >
          <label for="title" class="mb-1">{{ $t('title') }}<span class="text-red-500 ms-1">*</span></label>
          <a-input id="title" v-model:value="ticketDetail.title" />
        </a-form-item>
        <a-form-item v-else class="ms-2 flex-1 flex flex-col">
          <label for="title" class="mb-1">{{ $t('title') }}</label>
          <a-input id="title" :value="ticketDetail.title" disabled readonly />
        </a-form-item>
      </div>
      <div class="flex w-full mt-5">
        <a-form-item
          v-if="
            ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.PENDING &&
            !ticketDetail.managerID &&
            !ticketDetail.ownerID &&
            ticketDetail.customerID === Number(userID || 0)
          "
          class="flex-1 flex flex-col"
          :name="['content']"
          :rules="[{ required: true, message: $t('ticket_content_required') }]"
        >
          <label for="content" class="mb-1">{{ $t('content') }}<span class="text-red-500 ms-1">*</span></label>
          <a-textarea id="content" v-model:value="ticketDetail.content" />
        </a-form-item>
        <a-form-item v-else class="flex-1 flex flex-col">
          <label for="content" class="mb-1">{{ $t('content') }}</label>
          <a-textarea id="content" :value="ticketDetail.content" disabled readonly />
        </a-form-item>
        <a-form-item
          v-if="
            ticketDetail.status === COMMON.SUPPORT_TICKET_STATUS.PENDING &&
            !ticketDetail.managerID &&
            !ticketDetail.ownerID &&
            ticketDetail.customerID === Number(userID || 0)
          "
          class="ms-2 flex-1"
        >
          <div class="flex flex-col">
            <label for="image">{{ $t('image') }}</label>
            <a-upload
              id="image"
              v-model:file-list="ticketDetail.fileList"
              class="mt-2"
              multiple
              :before-upload="beforeUploadImage"
              @change="handleFileUpload"
            >
              <a-button class="flex items-center">
                <upload-outlined></upload-outlined>
                {{ $t('upload_file') }}
              </a-button>
            </a-upload>
          </div>
        </a-form-item>
        <a-form-item v-else class="ms-2 flex-1 flex flex-col">
          <label for="image">{{ $t('image') }}</label>
          <a-upload
            id="image"
            :file-list="
              ticketDetail.files.map((file, index) => ({
                uid: index.toString(),
                name: file.title || `File ${index + 1}`,
                url: file.path as string,
                status: 'done',
              }))
            "
            class="hide_delete_button"
          >
          </a-upload>
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { COMMON } from '~/consts/common';
import type { SupportTicket } from '~/types/support_ticket';
import { type FormInstance, Upload } from 'ant-design-vue';
import type { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload/interface';
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';

// ---------------------- Variables ----------------------
const props = defineProps({
  ticketDetail: {
    type: Object as PropType<SupportTicket | null>,
    required: false,
    default: () => null,
  },
  detailModalVisible: {
    type: Object as PropType<{ value: boolean }>,
    required: true,
  },
});
const userID = useCookie('userID');
const { t } = useI18n();
const ticketDetail = toRef(props, 'ticketDetail');
const ticketFormRef = ref<FormInstance>();
const detailModalVisible = toRef(props, 'detailModalVisible');
const fileCounter = ref(0);
const { $event } = useNuxtApp();

// ---------------------- Functions ----------------------
async function updateTicket() {
  try {
    $event.emit('loading');

    if (!ticketDetail.value) {
      return;
    }

    const formData = new FormData();
    formData.append('title', ticketDetail.value.title ? ticketDetail.value.title.trim() : '');
    formData.append('content', ticketDetail.value.content ? ticketDetail.value.content.trim() : '');
    ticketDetail.value.files.forEach((file) => {
      if (file.ID < 0) {
        formData.append('newFiles[]', (file.path[0] as UploadFile).originFileObj as Blob);
      } else if (file.isDeleted) {
        formData.append('deletedFiles[]', file.ID.toString());
      }
    });

    await api.common.support_ticket.update(ticketDetail.value.ID, formData);

    notification.success({
      message: t('update_success'),
      description: t('ticket_info_updated'),
    });

    $event.emit('refetchCustomerSupportTickets');
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

async function handleSaveChanges() {
  try {
    if (!ticketFormRef.value) {
      return;
    }

    await ticketFormRef.value.validateFields();
    await updateTicket();
  } catch (err: any) {
    /* empty */
  }
}

function handleFileUpload(event: UploadChangeParam<UploadFile<any>>) {
  if (event.file.status === 'done') {
    fileCounter.value++;
    event.file.uid = (-fileCounter.value).toString();
    ticketDetail.value!.files.push({
      ID: Number(event.file.uid),
      title: null,
      no: null,
      supportTicketID: ticketDetail.value!.ID,
      path: [event.file],
      createdAt: '',
      createdBy: 0,
      isDeleted: undefined,
    });
  } else if (event.file.status === 'removed') {
    if (Number(event.file.uid) < 0) {
      const index = ticketDetail.value!.files.findIndex((file) => file.ID === Number(event.file.uid));
      if (index !== -1) {
        ticketDetail.value!.files.splice(index, 1);
      }
    } else {
      const result = ticketDetail.value!.files.find((file) => file.ID === Number(event.file.uid));
      if (result) {
        result.isDeleted = true;
      }
    }
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
  () => detailModalVisible.value.value,
  () => {
    fileCounter.value = 0;
    if (!ticketDetail.value || !detailModalVisible.value.value) {
      return;
    }
    ticketDetail.value.fileList = [];
    ticketDetail.value.files.forEach((file) => {
      ticketDetail.value!.fileList!.push({
        uid: file.ID.toString(),
        name: file.title || '',
        url: file.path as string,
        status: 'done',
      });
    });
  }
);
</script>
