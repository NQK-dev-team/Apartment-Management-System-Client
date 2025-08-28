<template>
  <a-table class="mt-5" :columns="tableHeaders" :data-source="serviceList" :scroll="{ x: 'max-content' }">
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div class="p-[8px]">
        <a-input
          ref="searchInput"
          :placeholder="t('enter_search')"
          :value="selectedKeys[0]"
          class="block width-[200px] mb-[8px]"
          @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <div class="flex items-center">
          <a-button
            size="small"
            class="w-[90px] h-[25px] inline-flex items-center justify-center"
            @click="handleReset(clearFilters)"
            >{{ t('clear') }}</a-button
          >
          <a-button
            type="primary"
            size="small"
            class="inline-flex items-center justify-center w-[100px] h-[25px] ms-[8px]"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon>
              <SearchOutlined />
            </template>
            {{ t('search') }}
          </a-button>
        </div>
      </div>
    </template>
    <template #customFilterIcon="{ filtered, column }">
      <SearchOutlined v-if="column.dataIndex === 'name'" :style="{ color: filtered ? '#108ee9' : undefined }" />
      <FilterFilled v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #bodyCell="{ value, column }">
      <template v-if="column.key === 'price'">
        {{ formatPrice(value) }}
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import type { Service } from '~/types/building';

// ---------------------- Variables ----------------------
const { t } = useI18n();
const props = defineProps({
  services: {
    type: Object as PropType<Service[]>,
    required: true,
  },
});
const searchInput = ref();
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const tableHeaders = computed<any>(() => {
  return [
    {
      title: t('no'),
      dataIndex: 'no',
      key: 'no',
      class: 'text-nowrap',
    },
    {
      title: t('service_name'),
      dataIndex: 'name',
      key: 'name',
      customFilterDropdown: true,
      onFilter: (value: string, record: any) => {
        const values = value.split(',');
        return values.some((val) => removeDiacritics(record.name).toLowerCase().includes(val.trim().toLowerCase()));
      },
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
      class: 'text-nowrap',
    },
    {
      title: t('service_price'),
      dataIndex: 'price',
      key: 'price',
      sorter: (a: any, b: any) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
      class: 'text-nowrap',
    },
  ];
});
const serviceList = computed(() =>
  props.services.map((service, index) => {
    return {
      no: index + 1,
      name: service.name,
      price: service.price,
    };
  })
);

// ---------------------- Functions ----------------------
function handleSearch(selectedKeys: any, confirm: any, dataIndex: any) {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
}

function handleReset(clearFilters: any) {
  clearFilters({ confirm: true });
  state.searchText = '';
}
</script>
