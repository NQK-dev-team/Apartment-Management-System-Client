<template>
  <div class="w-full h-full flex flex-col px-5">
    <!-- Page header -->
    <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#1f1f1f] text-white']">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $t('employee_list') }}</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="mt-3 text-2xl">{{ $t('employee_list') }}</h1>
      <div class="flex justify-between">
        <div></div>
        <a-input-search
          v-model:value="searchValue"
          class="w-[500px]"
          :placeholder="$t('enter_search')"
          enter-button
          @search="searchEmployee"
        />
        <div class="flex">
          <a-button
            type="primary"
            danger
            :disabled="!deleteBucket.length"
            class="rounded-sm me-2"
            @click="
              () => {
                $event.emit('deleteItem', { callback: deleteEmployee });
              }
            "
          >
            <img :src="svgPaths.delete" alt="Delete employee" class="w-[12px] h-[12px]" />
          </a-button>
          <NuxtLink :to="pageRoutes.common.staff.add">
            <a-button type="primary" class="rounded-sm">
              <img :src="svgPaths.plus" alt="Add employee" class="w-[12px] h-[12px]" />
            </a-button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- Page main content -->
    <div
      class="flex-1 flex flex-col px-4 mt-5 overflow-auto"
      :class="[lightMode ? 'bg-white' : 'bg-[#1f1f1f] text-white']"
    >
      <!-- Table -->
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :row-selection="{
          selectedRowKeys: deleteBucket,
          onChange: (selectedRowKeys: any[] | number[]) => {
            deleteBucket = selectedRowKeys;
          },
        }"
        class="mt-3"
        :scroll="{ x: 'max-content' }"
      >
        <template #bodyCell="{ value, column }">
          <template v-if="column.key === 'action'">
            <NuxtLink
              :to="pageRoutes.common.staff.detail(value)"
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
import { getUserGender, getUserName } from '~/utils/user';
import { convertToDate } from '~/utils/formatter';
import { removeDiacritics } from '~/utils/diacritics';

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Staff List',
  layout: 'main',
  middleware: ['authorization-owner'],
});

useHead({
  title: 'Staff List',
  meta: [
    {
      name: 'description',
      content: 'List of staff members in the system',
    },
  ],
});

// ---------------------- Variables ----------------------
// Use this to get the translation
const { t } = useI18n();
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const { $event } = useNuxtApp();
const searchValue = ref('');
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
    title: t('employee_number'),
    dataIndex: 'employeeNumber',
    key: 'employeeNumber',
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
    title: t('temporary_address'),
    dataIndex: 'temporary_address',
    key: 'temporary_address',
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
    employeeNumber: string;
    gender: string;
    dob: string;
    ssn: string;
    old_ssn: string;
    phone: string;
    email: string;
    temporary_address: string;
    action: number;
    key: number;
  }[]
>([]);
const deleteBucket = ref<number[]>([]);

// ---------------------- Functions ----------------------
function searchEmployee() {
  dataSource.value = userList.value
    .map((user, index) => {
      return {
        no: index + 1,
        name: getUserName(user),
        employeeNumber: user.no,
        gender: t(getUserGender(user)),
        dob: convertToDate(user.dob),
        ssn: user.ssn,
        old_ssn: user.oldSSN.String || '-',
        phone: user.phone,
        email: user.email,
        temporary_address: user.temporaryAddress,
        action: user.ID,
        key: user.ID,
      };
    })
    .filter((user) => {
      const search = removeDiacritics(searchValue.value.trim()).toLowerCase();
      return (
        removeDiacritics(user.name.toLowerCase()).includes(search) ||
        user.employeeNumber.includes(search) ||
        user.ssn.includes(search) ||
        (user.old_ssn !== '-' && user.old_ssn.includes(search)) ||
        user.phone.includes(search) ||
        user.email.includes(search) ||
        removeDiacritics(user.temporary_address.toLowerCase()).includes(search)
      );
    });

  deleteBucket.value = deleteBucket.value.filter((item) => dataSource.value.find((user) => user.action === item));
}

async function getEmployeeList() {
  try {
    $event.emit('loading');
    deleteBucket.value = [];
    const response = await api.common.staff.getList();
    const data = response.data;
    userList.value = data;
    dataSource.value = data.map((user, index) => {
      return {
        no: index + 1,
        name: getUserName(user),
        employeeNumber: user.no,
        gender: t(getUserGender(user)),
        dob: convertToDate(user.dob),
        ssn: user.ssn,
        old_ssn: user.oldSSN.String || '-',
        phone: user.phone,
        email: user.email,
        temporary_address: user.temporaryAddress,
        action: user.ID,
        key: user.ID,
      };
    });
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

async function deleteEmployee() {
  try {
    $event.emit('loading');
    await api.common.staff.deleteMany(deleteBucket.value);
    $event.emit('deleteItemSuccess');
    getEmployeeList();
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

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getEmployeeList();
});
</script>
