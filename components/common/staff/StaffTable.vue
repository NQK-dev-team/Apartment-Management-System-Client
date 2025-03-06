<template>
  <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection" bordered class="mt-2">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex && column.dataIndex !== 'operation'">
        <div>
          {{ text }}
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div>
          <span>
            <NuxtLink class="text-blue-600">Edit</NuxtLink> | <NuxtLink class="text-red-600">Delete</NuxtLink>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NuxtLink } from '#components';

interface DataItem {
  key: string;
  no: number;
  name: string;
  employeeId: string;
  gender: string;
  dob: string;
  nationalId: string;
  phoneNumber: string;
  contactMail: string;
  buildingManaging: string;
}

const props = defineProps<{
  columns: Array<object>;
  dataSource: Array<DataItem>;
  rowSelection: object;
}>();
</script>

<style scoped>

</style>