<template>
  <div class="w-full h-full flex flex-col px-5">
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item
          ><NuxtLink :to="pageRoutes.common.contract.list">{{ $t('contract_list') }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ $t('add_contract') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('add_contract') }}</h1>
    </div>
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"></div>
  </div>
</template>

<script lang="ts" setup>
import { pageRoutes } from '~/consts/page_routes';
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import type { User } from '~/types/user';
import { COMMON } from '~/consts/common';
import type { Dayjs } from 'dayjs';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Add New Contract',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Add New Contract',
  meta: [
    {
      name: 'description',
      content: 'Add a contract to the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event, $dayjs } = useNuxtApp();
const offsetCustomer = ref(0);
const limitCustomer = ref(500);
const customerList = ref<User[]>([]);
const fileListDeleteBucket = ref({ value: [] as number[] });
const residentListDeleteBucket = ref({ value: [] as number[] });
const addFilecounter = ref(0);
const addResidentCounter = ref(0);

// ---------------------- Functions ----------------------
async function getCustomerList() {
  try {
    const response = await api.common.customer.getList(limitCustomer.value, offsetCustomer.value);
    const data = response.data;

    if (offsetCustomer.value === 0) {
      customerList.value = data;
    } else {
      customerList.value.push(...data);
    }

    if (response.data.length === limitCustomer.value) {
      offsetCustomer.value += limitCustomer.value;
    }
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
  }
}

function disabledDate(current: Dayjs) {
  // Can not select days after today
  return current && current >= $dayjs().endOf('day');
}

async function addContract() {
  try {
    $event.emit('loading');

    // const formData = new FormData();
    // formData.append('status', editContract.value.value.status.toString());
    // if (editContract.value.value.newSignDate) {
    //   formData.append(
    //     'newSignDate',
    //     convertToDate((editContract.value.value.newSignDate as Dayjs).toDate().toISOString())
    //   );
    // }
    // const totalNewFiles = editContract.value.value.files.filter((file) => file.isNew).length;
    // formData.append('totalNewFiles', totalNewFiles.toString());
    // editContract.value.value.files
    //   .filter((file) => file.isNew)
    //   .forEach((file, index) => {
    //     formData.append(`file[${index}]file`, (file.path as UploadFile[])[0].originFileObj as File);
    //     formData.append(`file[${index}]title`, file.title || '');
    //   });
    // editContract.value.value.residents.forEach((resident) => {
    //   if (resident.isDeleted && !resident.isNew) {
    //     formData.append('removedResidents[]', resident.ID.toString());
    //   } else {
    //     const { userAccount, isNew, isDeleted, ...residentData } = resident;

    //     // Prepare resident data for submission
    //     const finalData = {
    //       firstName: residentData.firstName.trim(),
    //       middleName: residentData.middleName.String ? residentData.middleName.String.trim() : '',
    //       lastName: residentData.lastName.trim(),
    //       ssn: residentData.ssn.trim(),
    //       oldSSN: residentData.oldSSN.String ? residentData.oldSSN.String.trim() : '',
    //       phone: residentData.phone.String ? residentData.phone.String.trim() : '',
    //       email: residentData.email.String ? residentData.email.String.trim() : '',
    //       ID: residentData.ID <= 0 ? 0 : residentData.ID, // Ensure ID is 0 for new residents
    //       pob: residentData.pob.trim(),
    //       gender: resident.gender,
    //       userAccountID: residentData.userAccountID.Int64 ? residentData.userAccountID.Int64 : 0,
    //       relationWithHouseholder: residentData.relationWithHouseholder,
    //       dob:
    //         typeof residentData.dob === 'string'
    //           ? residentData.dob
    //           : convertToDate(residentData.dob.toDate().toISOString()),
    //     };

    //     formData.append('residents[]', JSON.stringify(finalData));
    //   }
    // });

    // await api.common.contract.updateContract(editContract.value.value.ID, formData);
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

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getCustomerList();
});
</script>
