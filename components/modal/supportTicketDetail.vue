<template>
  <div>
    <a-modal v-model:open="data.isOpen" title="Support ticket detail" @ok="handleOk" @cancel="handleCancel" class="w-[800px]">
      <div class="flex-1 flex flex-col me-6">
        <!-- First flex items-center -->
        <div class="flex items-center">
          <div class="flex-1 me-2">
            <label for="building" class="flex mb-1">
              <span>{{ $t('building') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="building"
              value="Building A"
              placeholder="Building"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="floor" class="flex mb-1">
              <span>{{ $t('floor') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="floor"
              value="F1"
              placeholder="Floor"
              disabled
              readonly
            />
          </div>
        </div>
        <!-- Second flex items-center -->
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="room_number" class="flex mb-1">
              <span>{{ $t('room_number') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="room_number"
              value="A101"
              placeholder="Room number"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="ticket_id" class="flex mb-1">
              <span>{{ $t('ticket_id') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="ticket_id"
              value="XXXX-XXXX-XXXX-XXXX"
              placeholder="Ticket ID"
              disabled
              readonly
            />
          </div>
        </div>
        <!-- Third flex items-center -->
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="customer_responsible" class="flex mb-1">
              <span>{{ $t('customer_responsible') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="customer_responsible"
              value="Nguyen Van A"
              placeholder="Customer responsible"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="ticket_creation_date" class="flex mb-1">
              <span>{{ $t('ticket_creation_date') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="ticket_creation_date"
              value="dd/mm/yyyy"
              placeholder="Ticket creation date"
              disabled
              readonly
            />
          </div>
        </div>
        <!-- Fourth flex items-center -->
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="status" class="flex mb-1">
              <span>{{ $t('status') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="status"
              value="Manager approve"
              placeholder="Status"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="manager" class="flex mb-1">
              <span>{{ $t('manager_approving') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="manager"
              value="Manager A"
              placeholder="Manager"
              disabled
              readonly
            />
          </div>
        </div>
        <!-- Fifth flex items-center -->
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="manager_decision" class="flex mb-1">
              <span>{{ $t('manager_decision') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="manager_decision"
              value="Approve"
              placeholder="Decision of the manager"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="decision_date" class="flex mb-1">
              <span>{{ $t('decision_date') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="decision_date"
              value="dd/mm/yyyy"
              placeholder="Decision date"
              disabled
              readonly
            />
          </div>
        </div>
        <!-- Sixth flex items-center -->
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="owner" class="flex mb-1">
              <span>{{ $t('owner_approving') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="owner"
              value="Owner A"
              placeholder="Owner"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="owner_decision" class="flex mb-1">
              <span>{{ $t('owner_decision') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="owner_decision"
              value="Approve"
              placeholder="Owner decision"
              disabled
              readonly
            />
          </div>
        </div>
        <!-- Seventh flex items-center -->
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="decision_date_2" class="flex mb-1">
              <span>{{ $t('decision_date') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="decision_date_2"
              value="dd/mm/yyyy"
              placeholder="Decision date"
              disabled
              readonly
            />
          </div>
          <div class="flex-1 me-2">
            <label for="heading" class="flex mb-1">
              <span>{{ $t('title') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-input
              id="heading"
              value="Broken water pipe"
              placeholder="Heading"
              disabled
              readonly
            />
          </div>
        </div>
        <!-- Eighth flex items-center -->
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="content" class="flex mb-1">
              <span>{{ $t('content') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-textarea
              id="content"
              value="Islum purem ect(generate filler content, make sure it a paragraph of at least 150 words)"
              placeholder="Content"
              disabled
              readonly
            />
          </div>
        </div>
        <!-- Image upload -->
        <div class="flex items-center mt-5">
          <div class="flex-1 me-2">
            <label for="image" class="flex mb-1">
              <span>{{ $t('image') }}</span>
              <span class="text-red-500">*</span>
            </label>
            <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" show-upload-list>
              <template #fileList>
                <a-upload-list :file-list="fileList" />
              </template>
            </a-upload>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadProps } from 'ant-design-vue';

const open = ref<boolean>(false);
const props = defineProps({
  data: {
    type: Object as PropType<{ isOpen: boolean }>,
    required: true,
  },
});
const data = toRef(props, 'data');

const fileList = ref<UploadProps['fileList']>([
  {
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  },
  {
    uid: '2',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  },
  {
    uid: '3',
    name: 'zzz.png',
    status: 'error',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  },
]);

// ---------------------- Functions ----------------------
function handleOk() {
  data.value.isOpen = false;
}

function handleCancel() {
  data.value.isOpen = false;
}
</script>