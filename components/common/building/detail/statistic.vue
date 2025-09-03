<template>
  <div class="flex-1 flex-col my-3 overflow-auto hideBrowserScrollbar" style="display: flex">
    <div class="mt-5 flex items-center min-w-[1400px]">
      <div
        class="flex-1 h-52 rounded-lg flex items-center px-5"
        :class="[lightMode ? 'bg-[#f1f1f1]' : 'bg-[#141414] text-white']"
      >
        <div class="h-full flex items-center justify-center">
          <div class="p-5 rounded-[50%]" :class="[lightMode ? 'bg-[#fdfdfd]' : 'bg-gray-500']">
            <Room class="text-3xl" />
          </div>
        </div>
        <div class="flex-1 h-full flex flex-col justify-center ms-10">
          <p class="text-lg">{{ $t('total_room') }}</p>
          <p class="text-3xl font-bold text-start">{{ statistic?.totalRooms || 0 }}</p>
        </div>
      </div>
      <div
        class="flex-1 h-52 rounded-lg flex items-center px-5 ms-5"
        :class="[lightMode ? 'bg-[#f1f1f1]' : 'bg-[#141414] text-white']"
      >
        <div class="h-full flex items-center justify-center">
          <div class="p-5 rounded-[50%]" :class="[lightMode ? 'bg-[#fdfdfd]' : 'bg-gray-500']">
            <Contract class="text-3xl" />
          </div>
        </div>
        <div class="flex-1 h-full flex flex-col justify-center ms-10">
          <p class="text-lg">{{ $t('total_contract') }}</p>
          <p class="text-3xl font-bold text-start">{{ statistic?.total_contract || 0 }}</p>
        </div>
      </div>
      <div class="flex-1 h-52 rounded-lg flex items-center px-5 ms-5"></div>
      <div class="flex-1 h-52 rounded-lg flex items-center px-5 ms-5"></div>
    </div>
    <div class="mt-10 flex items-center min-w-[1400px]">
      <div
        class="flex-1 px-5 rounded-lg h-[650px] py-5"
        :class="[lightMode ? 'bg-[#f1f1f1]' : 'bg-[#141414] text-white']"
      >
        <div class="text-lg mb-[56px]">
          {{ $t('statistic_room') }}
        </div>
        <div class="flex items-center justify-center">
          <div class="w-[450px]">
            <Doughnut
              v-if="roomDoughnutChartData"
              id="roomDoughnutChart"
              :data="roomDoughnutChartData"
              :options="roomDoughnutChartOptions"
            />
          </div>
        </div>
      </div>
      <div
        class="flex-1 ms-5 px-5 rounded-lg h-[650px] py-5"
        :class="[lightMode ? 'bg-[#f1f1f1]' : 'bg-[#141414] text-white']"
      >
        <div class="text-lg">
          {{ $t('statistic_contract') }}
        </div>
        <div class="my-3">
          <a-radio-group id="contractChartType" v-model:value="contractChartType" name="contractChartType">
            <a-radio-button id="contractChartTypeRent" name="contractChartTypeRent" :value="1">{{
              $t('rent')
            }}</a-radio-button>
            <a-radio-button id="contractChartTypeBuy" name="contractChartTypeBuy" :value="2">{{
              $t('buy')
            }}</a-radio-button>
          </a-radio-group>
        </div>
        <div v-if="rentContractDoughnutChartData" class="flex items-center justify-center">
          <div v-show="contractChartType === 1" class="w-[450px]">
            <Doughnut
              id="contractRentDoughnutChart"
              :options="rentContractDoughnutChartOptions"
              :data="rentContractDoughnutChartData"
            />
          </div>
        </div>
        <div v-if="saleContractDoughnutChartData">
          <div v-show="contractChartType === 2" class="w-[450px]">
            <Doughnut
              id="contractSaleDoughnutChart"
              :options="saleContractDoughnutChartOptions"
              :data="saleContractDoughnutChartData"
            />
          </div>
        </div>
      </div>
      <div
        class="flex-1 ms-5 px-5 rounded-lg h-[650px] py-5"
        :class="[lightMode ? 'bg-[#f1f1f1]' : 'bg-[#141414] text-white']"
      >
        <div class="text-lg mb-[56px]">
          {{ $t('statistic_bill') }}
        </div>
        <div class="flex items-center justify-center">
          <div class="w-[450px]">
            <Doughnut
              v-if="billDoughnutChartData"
              id="billDoughnutChart"
              class="w-full h-full"
              :data="billDoughnutChartData"
              :options="billDoughnutChartOptions"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 flex min-w-[1400px]">
      <div class="flex-1 h-full rounded-lg py-5 px-5" :class="[lightMode ? 'bg-[#f1f1f1]' : 'bg-[#141414] text-white']">
        <div class="flex items-center justify-between mb-3">
          <div class="text-lg">
            {{ $t('revenue_overview') }}
          </div>
          <div>
            <label for="selectRevenueYear">{{ $t('select_year') }}:&nbsp;&nbsp;</label>
            <a-select id="selectRevenueYear" v-model:value="yearSelect">
              <a-select-option
                v-for="year in generateArrayFromRange(COMMON.SYSTEM_START_YEAR, $dayjs().year())"
                :id="`revenueYear_${year}`"
                :key="year"
                :name="`revenueYear_${year}`"
                :value="year"
              >
                {{ year }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="flex-1">
          <Line
            v-if="revenueLineChartData"
            id="revenueLineChart"
            :data="revenueLineChartData"
            :options="revenueLineChartOptions"
          />
        </div>
      </div>
      <div class="w-[400px] ms-5">
        <div class="px-5 py-5 rounded-md" :class="[lightMode ? 'bg-[#ffffff] border-2' : 'bg-[#141414] text-white']">
          <h2 class="text-lg mb-3">{{ $t('calendar') }}</h2>
          <hr />
          <a-calendar class="mt-3" :fullscreen="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BuildingStatistic } from '~/types/building';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Line, Doughnut } from 'vue-chartjs';
import { COMMON } from '~/consts/common';
import { getMessageCode } from '~/consts/api_response';
import Room from '~/public/svg/room.svg';
import Contract from '~/public/svg/contract.svg';
import { api } from '~/services/api';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  statistic: {
    type: Object as PropType<BuildingStatistic>,
    required: true,
  },
});
const statistic = toRef(props, 'statistic');
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart: any) => {
    // Access the plugin's options
    const options = chart.options.plugins.myCustomPlugin;

    // Use the parameters
    const myText = options?.text || '';
    const myColor = options?.color || '';

    // Get the chart's context
    const { ctx } = chart;
    ctx.save();

    // Get the center coordinates of the chart
    const centerX = chart.getDatasetMeta(0).data[0].x;
    const centerY = chart.getDatasetMeta(0).data[0].y;

    // Set font properties
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '16px Arial'; // Customize font
    ctx.fillStyle = myColor; // Customize color

    // Draw the text
    ctx.fillText(myText, centerX, centerY);

    ctx.restore();
  },
};
const { $event, $dayjs } = useNuxtApp();
const yearSelect = ref($dayjs().year());
const { t } = useI18n();
const contractChartType = ref(1);
const roomDoughnutChartData = ref<null | any>(null);
const roomDoughnutChartOptions = ref<any | null>(null);
const rentContractDoughnutChartData = ref<null | any>(null);
const rentContractDoughnutChartOptions = ref<any | null>(null);
const saleContractDoughnutChartData = ref<null | any>(null);
const saleContractDoughnutChartOptions = ref<any | null>(null);
const revenueLineChartData = ref<null | any>(null);
const revenueLineChartOptions = ref<any | null>(null);
const billDoughnutChartData = ref<null | any>(null);
const billDoughnutChartOptions = ref<any | null>(null);
const route = useRoute();
const buildingID = Number(route.params.id as string);

// ---------------------- Init ChartJS ----------------------
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  centerTextPlugin,
  LineElement,
  PointElement
);

// ---------------------- Functions ----------------------
async function getBillStatisticData() {
  try {
    $event.emit('loading');
    const response = await api.common.building.buildingStatistic(buildingID, yearSelect.value);
    const responseData = response.data;

    revenueLineChartData.value = {
      labels: [
        t('january'),
        t('february'),
        t('march'),
        t('april'),
        t('may'),
        t('june'),
        t('july'),
        t('august'),
        t('september'),
        t('october'),
        t('november'),
        t('december'),
      ],
      datasets: [
        {
          label: t('total_expected_revenue'),
          data: [
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 1)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 2)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 3)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 4)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 5)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 6)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 7)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 8)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 9)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 10)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 11)
              ?.totalExpectedRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 12)
              ?.totalExpectedRevenue || 0,
          ],
          borderColor: '#888888',
          backgroundColor: '#888888',
          fill: false,
          tension: 0.1,
        },
        {
          label: t('total_actual_revenue'),
          data: [
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 1)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 2)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 3)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 4)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 5)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 6)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 7)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 8)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 9)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 10)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 11)
              ?.totalActualRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 12)
              ?.totalActualRevenue || 0,
          ],
          borderColor: '#50c433',
          backgroundColor: '#50c433',
          fill: false,
          tension: 0.1,
        },
        {
          label: t('total_remaining_revenue'),
          data: [
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 1)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 2)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 3)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 4)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 5)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 6)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 7)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 8)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 9)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 10)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 11)
              ?.totalRemainingRevenue || 0,
            (responseData.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 12)
              ?.totalRemainingRevenue || 0,
          ],
          borderColor: '#ff0000',
          backgroundColor: '#ff0000',
          fill: false,
          tension: 0.1,
        },
      ],
    };
    revenueLineChartOptions.value = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: lightMode.value ? '#000000' : '#ffffff',
          },
        },
        tooltip: {
          callbacks: {
            // This function is called to format the text for each tooltip item.
            label: (context: any) => {
              // 'context' contains all the data about the hovered item.
              const value = context.parsed.y; // Get the raw value.
              const label = context.dataset.label || ''; // Get the dataset label.

              // Return the formatted string with the desired suffix.
              return `${label}: ${formatPrice(value)}`;
            },
          },
        },
      },
      scales: {
        y: {
          // Begin configuration for the y-axis
          ticks: {
            // Use the callback to add a suffix to each tick label
            callback: function (value: any) {
              // 'value' is the numerical tick value
              return formatPrice(value);
            },
          },
        },
        x: {},
      },
    };
  } catch (err: any) {
    if (err.response._data.message === getMessageCode('SYSTEM_ERROR')) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    } else if (
      err.response._data.message === getMessageCode('PERMISSION_DENIED') ||
      err.response._data.message === getMessageCode('INVALID_CREDENTIALS') ||
      err.response._data.message === getMessageCode('TOKEN_REFRESH_FAILED') ||
      err.response._data.message === getMessageCode('TOKEN_VERIFY_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('no_permission'),
      });
    } else if (
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      notification.error({
        message: t('failed'),
        description: t('request_error'),
      });
    } else if (
      err.response._data.message === getMessageCode('UPDATE_FAILED') ||
      err.response._data.message === getMessageCode('CREATE_FAILED')
    ) {
      notification.error({
        message: t('failed'),
        description: t('data_invalid'),
      });
    } else if (err.response._data.message === getMessageCode('DATA_NOT_FOUND')) {
      notification.error({
        message: t('failed'),
        description: t('data_not_found'),
      });
    }
  } finally {
    $event.emit('loading');
  }
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  roomDoughnutChartData.value = {
    labels: [t('rented'), t('sold'), t('available'), t('maintenance'), t('unavailable')],
    datasets: [
      {
        label: t('total'),
        data: [
          { label: t('rented'), value: statistic.value?.totalRentedRooms || 0 },
          { label: t('sold'), value: statistic.value?.totalBoughtRooms || 0 },
          { label: t('available'), value: statistic.value?.totalAvailableRooms || 0 },
          { label: t('maintenance'), value: statistic.value?.totalMaintenancedRooms || 0 },
          { label: t('unavailable'), value: statistic.value?.totalUnavailableRooms || 0 },
        ],
        backgroundColor: ['#50c433', '#43b7f1', '#888888', '#d8d535', '#ff0000'],
      },
    ],
  };
  roomDoughnutChartOptions.value = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: lightMode.value ? '#000000' : '#ffffff',
        },
      },
      myCustomPlugin: {
        text: t('total_room') + ': ' + (statistic.value?.totalRooms || '0'),
        color: lightMode.value ? '#000000' : '#ffffff',
      },
    },
  };

  rentContractDoughnutChartData.value = {
    labels: [t('active'), t('expired'), t('cancelled'), t('wait_for_signature'), t('not_in_effect')],
    datasets: [
      {
        label: t('total'),
        data: [
          { label: t('active'), value: statistic.value?.total_active_rent || 0 },
          { label: t('expired'), value: statistic.value?.total_expire_rent || 0 },
          { label: t('cancelled'), value: statistic.value?.total_cancel_rent || 0 },
          { label: t('wait_for_signature'), value: statistic.value?.total_wait_for_signature_rent || 0 },
          { label: t('not_in_effect'), value: statistic.value?.total_not_in_effect_rent || 0 },
        ],
        backgroundColor: ['#50c433', '#888888', '#ff0000', '#d8d535', 'rgb(255, 99, 132)'],
      },
    ],
  };
  rentContractDoughnutChartOptions.value = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: lightMode.value ? '#000000' : '#ffffff',
        },
      },
      myCustomPlugin: {
        text: t('total_contract') + ': ' + (statistic.value?.total_rent || '0'),
        color: lightMode.value ? '#000000' : '#ffffff',
      },
    },
  };

  saleContractDoughnutChartData.value = {
    labels: [t('active'), t('cancelled'), t('wait_for_signature'), t('not_in_effect')],
    datasets: [
      {
        label: t('total'),
        data: [
          { label: t('active'), value: statistic.value?.total_active_buy || 0 },
          { label: t('cancelled'), value: statistic.value?.total_cancel_buy || 0 },
          { label: t('wait_for_signature'), value: statistic.value?.total_wait_for_signature_buy || 0 },
          { label: t('not_in_effect'), value: statistic.value?.total_not_in_effect_buy || 0 },
        ],
        backgroundColor: ['#50c433', '#ff0000', '#d8d535', 'rgb(255, 99, 132)'],
      },
    ],
  };
  saleContractDoughnutChartOptions.value = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: lightMode.value ? '#000000' : '#ffffff',
        },
      },
      myCustomPlugin: {
        text: t('total_contract') + ': ' + (statistic.value?.total_buy || '0'),
        color: lightMode.value ? '#000000' : '#ffffff',
      },
    },
  };

  billDoughnutChartData.value = {
    labels: [t('unpaid'), t('paid'), t('overdue')],
    datasets: [
      {
        label: t('total'),
        data: [
          { label: t('unpaid'), value: statistic.value?.totalUnpaid || 0 },
          { label: t('paid'), value: statistic.value?.totalPaid || 0 },
          { label: t('overdue'), value: statistic.value?.totalOverdue || 0 },
        ],
        backgroundColor: ['#888888', '#50c433', '#ff0000'],
      },
    ],
  };
  billDoughnutChartOptions.value = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: lightMode.value ? '#000000' : '#ffffff',
        },
      },
      myCustomPlugin: {
        text: t('total_bill') + ': ' + (statistic.value?.totalBill || '0'),
        color: lightMode.value ? '#000000' : '#ffffff',
      },
    },
  };

  revenueLineChartData.value = {
    labels: [
      t('january'),
      t('february'),
      t('march'),
      t('april'),
      t('may'),
      t('june'),
      t('july'),
      t('august'),
      t('september'),
      t('october'),
      t('november'),
      t('december'),
    ],
    datasets: [
      {
        label: t('total_expected_revenue'),
        data: [
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 1)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 2)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 3)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 4)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 5)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 6)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 7)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 8)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 9)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 10)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 11)
            ?.totalExpectedRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 12)
            ?.totalExpectedRevenue || 0,
        ],
        borderColor: '#888888',
        backgroundColor: '#888888',
        fill: false,
        tension: 0.1,
      },
      {
        label: t('total_actual_revenue'),
        data: [
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 1)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 2)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 3)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 4)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 5)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 6)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 7)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 8)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 9)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 10)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 11)
            ?.totalActualRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 12)
            ?.totalActualRevenue || 0,
        ],
        borderColor: '#50c433',
        backgroundColor: '#50c433',
        fill: false,
        tension: 0.1,
      },
      {
        label: t('total_remaining_revenue'),
        data: [
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 1)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 2)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 3)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 4)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 5)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 6)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 7)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 8)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 9)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 10)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 11)
            ?.totalRemainingRevenue || 0,
          (statistic.value?.revenueStatistic || []).find((item) => $dayjs(item.period).month() + 1 === 12)
            ?.totalRemainingRevenue || 0,
        ],
        borderColor: '#ff0000',
        backgroundColor: '#ff0000',
        fill: false,
        tension: 0.1,
      },
    ],
  };
  revenueLineChartOptions.value = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: lightMode.value ? '#000000' : '#ffffff',
        },
      },
      tooltip: {
        callbacks: {
          // This function is called to format the text for each tooltip item.
          label: (context: any) => {
            // 'context' contains all the data about the hovered item.
            const value = context.parsed.y; // Get the raw value.
            const label = context.dataset.label || ''; // Get the dataset label.

            // Return the formatted string with the desired suffix.
            return `${label}: ${formatPrice(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        // Begin configuration for the y-axis
        ticks: {
          // Use the callback to add a suffix to each tick label
          callback: function (value: any) {
            // 'value' is the numerical tick value
            return formatPrice(value);
          },
        },
      },
      x: {},
    },
  };
});

// ---------------------- Watchers ----------------------
watch(yearSelect, () => {
  // Handle year selection change
  getBillStatisticData();
});
</script>
