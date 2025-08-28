<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('customer_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('customer_list') }}</h1>
      <div class="flex justify-between">
        <div></div>
        <a-input-search
          v-model:value="searchValue"
          class="w-[500px]"
          :placeholder="$t('enter_search')"
          enter-button
          @search="searchCustomer"
        />
        <div class="flex">
          <a-button
            type="primary"
            danger
            :disabled="!deleteBucket.length"
            class="rounded-sm me-2"
            @click="
              () => {
                $event.emit('deleteItem', { callback: deleteCustomer });
              }
            "
          >
            <img :src="svgPaths.delete" alt="Delete customer" class="w-[12px] h-[12px]" />
          </a-button>
          <NuxtLink :to="pageRoutes.common.customer.add">
            <a-button type="primary" class="rounded-sm">
              <img :src="svgPaths.plus" alt="Add employee" class="w-[12px] h-[12px]" />
            </a-button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- Page main content -->
    <div class="flex-1 flex flex-col px-4 mt-5" :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :row-selection="{
          selectedRowKeys: deleteBucket,
          onChange: (selectedRowKeys: any[] | number[]) => {
            if (!isFilter) {
              deleteBucket = selectedRowKeys;
            } else {
              selectedRowKeys.forEach((key) => {
                if (!deleteBucket.find((item) => item === key)) {
                  deleteBucket.push(key);
                }
              });
            }
          },
        }"
        class="mt-3"
        :scroll="{ x: 'max-content' }"
      >
        <template #bodyCell="{ value, column }">
          <template v-if="column.key === 'action'">
            <NuxtLink
              :to="pageRoutes.common.customer.detail(value)"
              class="text-[#1890FF] hover:text-[#40a9ff] active:text-[#096dd9]"
            >
              {{ $t('detail') }}
            </NuxtLink>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMessageCode } from '~/consts/api_response';
import { api } from '~/services/api';
import { svgPaths } from '~/consts/svg_paths';
import { pageRoutes } from '~/consts/page_routes';
import type { User } from '~/types/user';
import { COMMON } from '~/consts/common';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Customer List',
  layout: 'main',
  middleware: ['authorization-manager'],
});

useHead({
  title: 'Customer List',
  meta: [
    {
      name: 'description',
      content: 'List of customers in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const searchValue = ref('');
const deleteBucket = ref<number[]>([]);
const { $event } = useNuxtApp();
const userList = ref<User[]>([]);
const columns = computed(() => [
  {
    title: t('no'),
    dataIndex: 'no',
    key: 'no',
    class: 'text-nowrap',
  },
  {
    title: t('name'),
    dataIndex: 'name',
    key: 'name',
    class: 'text-nowrap',
  },
  {
    title: t('customer_no'),
    dataIndex: 'customerNumber',
    key: 'customerNumber',
    class: 'text-nowrap',
  },
  {
    title: t('gender'),
    dataIndex: 'gender',
    key: 'gender',
    class: 'text-nowrap',
  },
  {
    title: t('dob'),
    dataIndex: 'dob',
    key: 'dob',
    class: 'text-nowrap',
  },
  {
    title: t('ssn'),
    dataIndex: 'ssn',
    key: 'ssn',
    class: 'text-nowrap',
  },
  {
    title: t('old_ssn'),
    dataIndex: 'old_ssn',
    key: 'old_ssn',
    class: 'text-nowrap',
  },
  {
    title: t('phone'),
    dataIndex: 'phone',
    key: 'phone',
    class: 'text-nowrap',
  },
  {
    title: t('email'),
    dataIndex: 'email',
    key: 'email',
    class: 'text-nowrap',
  },
  {
    title: t('action'),
    dataIndex: 'action',
    key: 'action',
    class: 'text-nowrap',
  },
]);
const dataSource = ref<
  {
    no: number;
    name: string;
    customerNumber: string;
    gender: string;
    dob: string;
    ssn: string;
    old_ssn: string;
    phone: string;
    email: string;
    action: number;
    key: number;
  }[]
>([]);
const offset = ref<number>(0);
const limit = ref<number>(500);
const isFilter = ref<boolean>(false);

// ---------------------- Functions ----------------------
function searchCustomer() {
  dataSource.value = userList.value
    .map((user, index) => {
      return {
        no: index + 1,
        name: getUserName(user),
        customerNumber: user.no,
        gender: t(getUserGender(user)),
        dob: convertToDate(user.dob),
        ssn: user.ssn,
        old_ssn: user.oldSSN.String || '-',
        phone: user.phone,
        email: user.email,
        action: user.ID,
        key: user.ID,
      };
    })
    .filter((user) => {
      const search = removeDiacritics(searchValue.value.trim()).toLowerCase();
      return (
        removeDiacritics(user.name.toLowerCase()).includes(search) ||
        user.customerNumber.includes(search) ||
        user.ssn.includes(search) ||
        (user.old_ssn !== '-' && user.old_ssn.includes(search)) ||
        user.phone.includes(search) ||
        user.email.includes(search)
      );
    });

  isFilter.value = !!searchValue.value.trim();
}

async function getCustomerList(emitLoading = true) {
  try {
    if (emitLoading) {
      $event.emit('loading');
    }

    deleteBucket.value = [];
    const response = await api.common.customer.getList(limit.value, offset.value);
    const data = response.data;
    userList.value = data;
    dataSource.value = data.map((user, index) => {
      return {
        no: index + 1,
        name: getUserName(user),
        customerNumber: user.no,
        gender: t(getUserGender(user)),
        dob: convertToDate(user.dob),
        ssn: user.ssn,
        old_ssn: user.oldSSN.String || '-',
        phone: user.phone,
        email: user.email,
        action: user.ID,
        key: user.ID,
      };
    });

    if (response.data.length === limit.value) {
      offset.value += limit.value;
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
  } finally {
    if (emitLoading) {
      $event.emit('loading');
    }
  }
}

async function deleteCustomer() {
  try {
    $event.emit('loading');
    await api.common.customer.deleteMany(deleteBucket.value);
    $event.emit('deleteItemSuccess');
    if (offset.value > 0) {
      deleteBucket.value = [];
      userList.value = [];
      dataSource.value = [];
      offset.value = 0;
    } else {
      getCustomerList(false);
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
  } finally {
    $event.emit('loading');
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getCustomerList();
});

// ---------------------- Watchers ----------------------
watch(offset, async () => {
  const response = await api.common.customer.getList(limit.value, offset.value);
  const data = response.data;
  userList.value.push(...data);
  dataSource.value.push(
    ...data.map((user, index) => {
      return {
        no: index + 1,
        name: getUserName(user),
        customerNumber: user.no,
        gender: t(getUserGender(user)),
        dob: convertToDate(user.dob),
        ssn: user.ssn,
        old_ssn: user.oldSSN.String || '-',
        phone: user.phone,
        email: user.email,
        action: user.ID,
        key: user.ID,
      };
    })
  );

  if (response.data.length === limit.value) {
    offset.value += limit.value;
  }
});
</script>
