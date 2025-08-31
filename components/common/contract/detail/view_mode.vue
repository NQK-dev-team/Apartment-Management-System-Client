<template>
  <div>
    <h2 class="mt-5 text-xl font-bold">{{ $t('contract_information') }}</h2>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="building_name" class="flex mb-1">
          <span>{{ $t('building') }}</span>
        </label>
        <a-input
          id="building_name"
          disabled
          readonly
          :value="contract.buildingName"
          :placeholder="$t('building_name')"
        />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="room_floor" class="flex mb-1">
          <span>{{ $t('floor') }}</span>
        </label>
        <a-input id="room_floor" disabled readonly :value="contract.roomFloor" :placeholder="$t('floor')"
      /></a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="room_no" class="flex mb-1">
          <span>{{ $t('room_no') }}</span>
        </label>
        <a-input id="room_no" disabled readonly :value="contract.roomNo" :placeholder="$t('room_no')"
      /></a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="customer_no" class="flex mb-1">
          <span>{{ $t('house_holder') }}</span>
        </label>
        <a-input
          id="customer_no"
          disabled
          readonly
          :value="contract.householder.no + ' - ' + getUserName(contract.householder)"
          :placeholder="$t('house_holder')"
        >
          <template v-if="userRole?.toString() === roles.manager || userRole?.toString() === roles.owner" #suffix>
            <NuxtLink
              id="toHouseholderDetailLink"
              name="toHouseholderDetailLink"
              :to="pageRoutes.common.customer.detail(contract.householderID)"
              :title="$t('detail')"
              target="_blank"
              ><LinkOutlined
            /></NuxtLink>
          </template>
        </a-input>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="employee_number" class="flex mb-1">
          <span>{{ $t('contract_creator') }}</span>
        </label>
        <a-input
          id="employee_number"
          disabled
          readonly
          :value="contract.creator.no + ' - ' + getUserName(contract.creator)"
          :placeholder="$t('contract_creator')"
        >
          <template v-if="userRole?.toString() === roles.owner" #suffix>
            <NuxtLink
              id="toCreatorDetailLink"
              name="toCreatorDetailLink"
              :to="pageRoutes.common.staff.detail(contract.creatorID)"
              :title="$t('detail')"
              ><LinkOutlined
            /></NuxtLink>
          </template>
          <template
            v-else-if="userRole?.toString() === roles.manager && Number(userID || 0) === contract.creatorID"
            #suffix
          >
            <NuxtLink
              id="toCreatorDetailLink"
              name="toCreatorDetailLink"
              :to="pageRoutes.common.profile.index"
              :title="$t('detail')"
              ><LinkOutlined
            /></NuxtLink>
          </template>
        </a-input>
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="contract_id" class="flex mb-1">
          <span>{{ $t('contract_id') }}</span>
        </label>
        <a-input id="contract_id" disabled readonly :value="contract.ID" :placeholder="$t('contract_id')" />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="contract_type" class="flex mb-1">
          <span>{{ $t('contract_type') }}</span>
        </label>
        <a-input
          id="contract_type"
          disabled
          readonly
          :value="$t(`${getContractType(contract.type)}`)"
          :placeholder="$t('contract_type')"
        />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="contract_value" class="flex mb-1">
          <span>{{ $t('contract_value') }}</span>
        </label>
        <a-input
          id="contract_value"
          disabled
          readonly
          :value="formatPrice(contract.value)"
          :placeholder="$t('contract_value')"
        />
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="created_date" class="flex mb-1">
          <span>{{ $t('created_date') }}</span>
        </label>
        <a-input
          id="created_date"
          disabled
          readonly
          :value="convertToDate(contract.createdAt)"
          :placeholder="$t('created_date')"
        />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="active_date" class="flex mb-1">
          <span>{{ $t('active_date') }}</span>
        </label>
        <a-input
          id="active_date"
          disabled
          readonly
          :value="convertToDate(contract.startDate)"
          :placeholder="$t('active_date')"
        />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="expire_date" class="flex mb-1">
          <span>{{ $t('expire_date') }}</span>
        </label>
        <a-input
          id="expire_date"
          disabled
          readonly
          :value="
            contract.endDate.Valid && contract.endDate.Time ? convertToDate(contract.endDate.Time as string) : '-'
          "
          placeholder="-"
        />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="signed_date" class="flex mb-1">
          <span>{{ $t('signed_date') }}</span>
        </label>
        <a-input
          id="signed_date"
          disabled
          readonly
          :value="
            contract.signDate.Valid && contract.signDate.Time ? convertToDate(contract.signDate.Time as string) : '-'
          "
          placeholder="-"
        />
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24">
        <label for="status" class="flex mb-1">
          <span>{{ $t('status') }}</span>
        </label>
        <a-input
          id="status"
          disabled
          readonly
          :value="$t(`${getContractStatus(contract.status)}`)"
          :class="`text-[#${contract.status === COMMON.CONTRACT_STATUS.ACTIVE ? '50c433' : contract.status === COMMON.CONTRACT_STATUS.EXPIRED ? '888888' : contract.status === COMMON.CONTRACT_STATUS.CANCELLED ? 'ff0000' : contract.status === COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE ? '888888' : '888888'}]`"
          :placeholder="$t('status')"
        />
      </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
      <a-col class="mt-3" :xl="6" :md="12" :sm="24" :span="24"> </a-col>
    </a-row>
    <h2 class="mt-10 text-xl font-bold">{{ $t('paper_list') }}</h2>
    <CommonContractDetailViewModePaperListTable :files="props.contract.files" />
    <template v-if="props.contract.residents.length">
      <h2 class="mt-10 text-xl font-bold">{{ $t('other_resident_list') }}</h2>
      <CommonContractDetailViewModeResidentListTable :residents="props.contract.residents" />
    </template>
    <div class="mt-10 flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t('bill_list') }}</h2>
      <div
        v-if="
          (userRole?.toString() === roles.owner || userRole?.toString() === roles.manager) &&
          contract.status === COMMON.CONTRACT_STATUS.ACTIVE
        "
        class="flex items-center"
      >
        <a-button
          id="deleteBillButton"
          name="deleteBillButton"
          type="primary"
          danger
          :disabled="!deleteBillBucket.value.length"
          class="rounded-sm me-2"
          @click="
            () => {
              $event.emit('deleteItem', { callback: deleteBills });
            }
          "
        >
          <img :src="svgPaths.delete" alt="Delete bill" class="w-[12px] h-[12px]" />
        </a-button>
        <NuxtLink id="addBillPageLink" name="addBillPageLink" :to="pageRoutes.common.bill.add2(contractID)">
          <a-button type="primary" class="rounded-sm">
            <img :src="svgPaths.plus" alt="Add employee" class="w-[12px] h-[12px]" />
          </a-button>
        </NuxtLink>
      </div>
    </div>
    <CommonContractDetailViewModeBillListTable :bills="props.contract.bills" :delete-bill-bucket="deleteBillBucket" />
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import { pageRoutes } from '~/consts/page_routes';
import { roles } from '~/consts/roles';
import { svgPaths } from '~/consts/svg_paths';
import { api } from '~/services/api';
import type { Contract } from '~/types/contract';

// ---------------------- Variables ----------------------
const userRole = useCookie('userRole');
const userID = useCookie('userID');
const route = useRoute();
const contractID = Number(route.params.id as string);
const props = defineProps({
  contract: {
    type: Object as PropType<Contract>,
    required: true,
  },
});
const contract = toRef(props, 'contract');
const deleteBillBucket = ref<{ value: number[] }>({ value: [] });
const { $event } = useNuxtApp();
const { t } = useI18n();

// ---------------------- Functions ----------------------
async function deleteBills() {
  try {
    $event.emit('loading');
    await api.common.bill.deleteMany(deleteBillBucket.value.value);
    $event.emit('deleteItemSuccess');
    deleteBillBucket.value.value = [];
    $event.emit('refetchContractBills');
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
</script>
