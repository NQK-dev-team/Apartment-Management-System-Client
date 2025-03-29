<template>
  <a-table :columns="columns">
    <template #headerCell="{ column }">
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'Status'">
        <span>
          <a-tag :color="record.Status === 0 ? 'volcano' : 'green'">
            {{ record.Status[0].toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a class="detail" style="color: deepskyblue;">{{ $t('detail') }}</a>
          <a-divider type="vertical" />
          <a class="delete" style="color: red;">{{ $t('delete') }}</a>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>

const { t } = useI18n();
const columns = computed<any>(() => {
  return [
    {
      name: t('no'),
      align: 'center',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: t('contract'),
      align: 'center',
      dataIndex: 'Contract ID',
      key: 'Contract ID',
    },
    {
      title: t('owner'),
      align: 'center',
      dataIndex: 'Owner',
      key: 'Owner',
    },
    {
      title: t('payer_id'),
      align: 'center',
      dataIndex: 'Payer ID',
      key: 'Payer ID',
    },
    {
      title: t('bill'),
      align: 'center',
      dataIndex: 'Bill ID',
      key: 'Bill ID',
    },
    {
      title: t('payment_period'),
      align: 'center',
      dataIndex: 'Payment Period',
      key: 'Payment Period',
    },
    {
      title: t('amount'),
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: t('status'),
      key: 'Status',
      dataIndex: 'Status',
    },
    {
      title: t('paid_by'),
      key: 'Paid by',
      dataIndex: 'Paid by',
    },
    {
      title: t('payment_date'),
      dataIndex: 'Payment Date',
      key: 'Payment Date',
    },
    {
      title: t('action'),
      key: 'action',
    },
  ]
});

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  period: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  paymentTime: {
    type: String,
    required: false,  
  },
  amount: {
    type: Number,
    required: true,
  },
  payerID: {
    type: Number,
    required: true,
  },
  payerName: {
    type: String,
    required: true,
  },
  contractID: {
    type: Number,
    required: true,
  },
});
const { $event } = useNuxtApp();
</script>

<style scoped>
.detail:hover {
  cursor: pointer;
  color: #B9EDFE;
}

.delete:hover {
  cursor: pointer;
  color: #E19495;
}
</style>