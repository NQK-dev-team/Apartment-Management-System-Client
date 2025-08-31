<template>
  <ClientOnly>
    <div class="w-full h-full flex flex-col px-5">
      <div class="px-4 mt-3 py-3" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#141414] text-white']">
        <a-breadcrumb>
          <a-breadcrumb-item>{{ $t('dashboard') }}</a-breadcrumb-item>
        </a-breadcrumb>
        <h1 class="mt-3 text-2xl">{{ $t('dashboard') }}</h1>
      </div>
      <div class="flex-1 flex flex-col my-3 overflow-auto hideBrowserScrollbar">
        <div class="mt-5 flex items-center min-w-[1600px]">
          <div
            class="flex-1 h-52 rounded-lg flex items-center px-5"
            :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#141414] text-white']"
          >
            <div class="h-full flex items-center justify-center">
              <div class="p-5 rounded-[50%]" :class="[lightMode ? 'bg-gray-100' : 'bg-gray-500']">
                <Building class="text-3xl" />
              </div>
            </div>
            <div class="flex-1 h-full flex flex-col justify-center ms-10">
              <p class="text-lg">{{ $t('total_building') }}</p>
              <p class="text-3xl font-bold text-start">{{ buildingStats?.totalBuildings || 0 }}</p>
            </div>
          </div>
          <div
            class="flex-1 h-52 rounded-lg flex items-center px-5 ms-5"
            :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#141414] text-white']"
          >
            <div class="h-full flex items-center justify-center">
              <div class="p-5 rounded-[50%]" :class="[lightMode ? 'bg-gray-100' : 'bg-gray-500']">
                <Room class="text-3xl" />
              </div>
            </div>
            <div class="flex-1 h-full flex flex-col justify-center ms-10">
              <p class="text-lg">{{ $t('total_room') }}</p>
              <p class="text-3xl font-bold text-start">{{ buildingStats?.totalRooms || 0 }}</p>
            </div>
          </div>
          <div
            class="flex-1 h-52 rounded-lg flex items-center px-5 ms-5"
            :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#141414] text-white']"
          >
            <div class="h-full flex items-center justify-center">
              <div class="p-5 rounded-[50%]" :class="[lightMode ? 'bg-gray-100' : 'bg-gray-500']">
                <User class="text-3xl" />
              </div>
            </div>
            <div class="flex-1 h-full flex flex-col justify-center ms-10">
              <p class="text-lg">{{ $t('total_customer') }}</p>
              <p class="text-3xl font-bold text-start">{{ totalCustomers }}</p>
            </div>
          </div>
          <div
            class="flex-1 h-52 rounded-lg flex items-center px-5 ms-5"
            :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#141414] text-white']"
          >
            <div class="h-full flex items-center justify-center">
              <div class="p-5 rounded-[50%]" :class="[lightMode ? 'bg-gray-100' : 'bg-gray-500']">
                <Contract class="text-3xl" />
              </div>
            </div>
            <div class="flex-1 h-full flex flex-col justify-center ms-10">
              <p class="text-lg">{{ $t('total_contract') }}</p>
              <p class="text-3xl font-bold text-start">{{ contractStats?.total_contract || 0 }}</p>
            </div>
          </div>
        </div>
        <div class="mt-10 flex items-center min-w-[1600px]">
          <div
            class="flex-1 px-5 rounded-lg h-[650px] py-5"
            :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#141414] text-white']"
          >
            <div class="text-lg mb-[56px]">
              {{ $t('statistic_room') }}
            </div>
            <div class="w-[500px]">
              <Doughnut
                v-if="roomDoughnutChartData"
                id="roomDoughnutChart"
                :data="roomDoughnutChartData"
                :options="roomDoughnutChartOptions"
              />
            </div>
          </div>
          <div
            class="flex-1 ms-5 px-5 rounded-lg h-[650px] py-5"
            :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#141414] text-white']"
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
            <div v-if="rentContractDoughnutChartData">
              <div v-show="contractChartType === 1" class="w-[500px]">
                <Doughnut
                  id="contractRentDoughnutChart"
                  :options="rentContractDoughnutChartOptions"
                  :data="rentContractDoughnutChartData"
                />
              </div>
            </div>
            <div v-if="saleContractDoughnutChartData">
              <div v-show="contractChartType === 2" class="w-[500px]">
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
            :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#141414] text-white']"
          >
            <div class="text-lg mb-[56px]">
              {{ $t('statistic_bill') }}
            </div>
            <div class="w-[500px]">
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
        <div class="mt-10 flex min-w-[1600px]">
          <div
            class="flex-1 h-full rounded-lg py-5 px-5"
            :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#141414] text-white']"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="text-lg">
                {{ $t('revenue_overview') }}
              </div>
              <div>
                <label for="selectRevenueYear">{{ $t('select_year') }}:&nbsp;&nbsp;</label>
                <a-select id="selectRevenueYear" v-model:value="yearSelect">
                  <a-select-option
                    v-for="year in generateArrayFromRange(2020, $dayjs().year())"
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
            <Line
              v-if="revenueLineChartData"
              id="revenueLineChart"
              :data="revenueLineChartData"
              :options="revenueLineChartOptions"
            />
          </div>
          <div class="w-[400px] ms-5">
            <div class="px-5 py-5 rounded-md" :class="[lightMode ? 'bg-[#ffffff]' : 'bg-[#141414] text-white']">
              <h2 class="text-lg mb-3">{{ $t('calendar') }}</h2>
              <hr />
              <a-calendar class="mt-3" :fullscreen="false" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { api } from '~/services/api';
import Room from '~/public/svg/room.svg';
import Building from '~/public/svg/building.svg';
import User from '~/public/svg/user.svg';
import Contract from '~/public/svg/contract.svg';
import { getMessageCode } from '~/consts/api_response';
import { COMMON } from '~/consts/common';
import type { BuildingStatistic } from '~/types/building';
import type { ContractStatistic } from '~/types/contract';
import type { BillStatistic } from '~/types/bill';
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

// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Report',
  layout: 'main',
  middleware: ['authorization-owner'],
});

useHead({
  title: 'Dashboard',
  meta: [
    {
      name: 'description',
      content: 'Management dashboard of the system',
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
const buildingStats = ref<BuildingStatistic | null>(null);
const totalCustomers = ref(0);
const contractStats = ref<ContractStatistic | null>(null);
const billStats = ref<BillStatistic | null>(null);
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
const contractChartType = ref(1);
const roomDoughnutChartData = ref<null | any>(null);
const roomDoughnutChartOptions = ref<any | null>(null);
const rentContractDoughnutChartData = ref<null | any>(null);
const rentContractDoughnutChartOptions = ref<any | null>(null);
const saleContractDoughnutChartData = ref<null | any>(null);
const saleContractDoughnutChartOptions = ref<any | null>(null);
const billDoughnutChartData = ref<null | any>(null);
const billDoughnutChartOptions = ref<any | null>(null);
const yearSelect = ref($dayjs().year());
const revenueLineChartData = ref<null | any>(null);
const revenueLineChartOptions = ref<any | null>(null);

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
async function getStatisticData() {
  try {
    $event.emit('loading');
    const buildingStatisticResponse = await api.common.building.buildingStatistic();
    const totalCustomersResponse = await api.common.customer.getTotal();
    const contractStatisticResponse = await api.common.contract.getStatistic();
    const billStatisticResponse = await api.common.bill.getStatistic(yearSelect.value);

    buildingStats.value = buildingStatisticResponse.data;
    totalCustomers.value = totalCustomersResponse.data;
    contractStats.value = contractStatisticResponse.data;
    billStats.value = billStatisticResponse.data;

    roomDoughnutChartData.value = {
      labels: [t('rented'), t('sold'), t('available'), t('maintenance'), t('unavailable')],
      datasets: [
        {
          label: t('total'),
          data: [
            { label: t('rented'), value: buildingStats.value?.totalRentedRooms || 0 },
            { label: t('sold'), value: buildingStats.value?.totalBoughtRooms || 0 },
            { label: t('available'), value: buildingStats.value?.totalAvailableRooms || 0 },
            { label: t('maintenance'), value: buildingStats.value?.totalMaintenancedRooms || 0 },
            { label: t('unavailable'), value: buildingStats.value?.totalUnavailableRooms || 0 },
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
          text: t('total_room') + ': ' + (buildingStats.value?.totalRooms || '0'),
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
            { label: t('active'), value: contractStats.value?.total_active_rent || 0 },
            { label: t('expired'), value: contractStats.value?.total_expire_rent || 0 },
            { label: t('cancelled'), value: contractStats.value?.total_cancel_rent || 0 },
            { label: t('wait_for_signature'), value: contractStats.value?.total_wait_for_signature_rent || 0 },
            { label: t('not_in_effect'), value: contractStats.value?.total_not_in_effect_rent || 0 },
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
          text: t('total_contract') + ': ' + (contractStats.value?.total_rent || '0'),
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
            { label: t('active'), value: contractStats.value?.total_active_buy || 0 },
            { label: t('cancelled'), value: contractStats.value?.total_cancel_buy || 0 },
            { label: t('wait_for_signature'), value: contractStats.value?.total_wait_for_signature_buy || 0 },
            { label: t('not_in_effect'), value: contractStats.value?.total_not_in_effect_buy || 0 },
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
          text: t('total_contract') + ': ' + (contractStats.value?.total_buy || '0'),
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
            { label: t('unpaid'), value: billStats.value?.totalUnpaid || 0 },
            { label: t('paid'), value: billStats.value?.totalPaid || 0 },
            { label: t('overdue'), value: billStats.value?.totalOverdue || 0 },
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
          text: t('total_bill') + ': ' + (billStats.value?.totalBill || '0'),
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
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 1)?.totalExpectedRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 2)?.totalExpectedRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 3)?.totalExpectedRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 4)?.totalExpectedRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 5)?.totalExpectedRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 6)?.totalExpectedRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 7)?.totalExpectedRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 8)?.totalExpectedRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 9)?.totalExpectedRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 10)
              ?.totalExpectedRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 11)
              ?.totalExpectedRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 12)
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
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 1)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 2)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 3)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 4)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 5)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 6)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 7)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 8)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 9)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 10)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 11)?.totalActualRevenue ||
              0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 12)?.totalActualRevenue ||
              0,
          ],
          borderColor: '#50c433',
          backgroundColor: '#50c433',
          fill: false,
          tension: 0.1,
        },
        {
          label: t('total_remaining_revenue'),
          data: [
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 1)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 2)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 3)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 4)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 5)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 6)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 7)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 8)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 9)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 10)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 11)
              ?.totalRemainingRevenue || 0,
            billStats.value?.revenueStatistic.find((item) => $dayjs(item.period).month() === 12)
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
    if (
      err.status === COMMON.HTTP_STATUS.INTERNAL_SERVER_ERROR ||
      err.response._data.message === getMessageCode('INVALID_PARAMETER') ||
      err.response._data.message === getMessageCode('PARAMETER_VALIDATION')
    ) {
      throw createError({
        status: 500,
        message: 'Internal server error',
        fatal: true,
      });
    }
  } finally {
    $event.emit('loading');
  }
}

async function getBillStatisticData() {
  try {
    $event.emit('loading');
    const response = await api.common.bill.getStatistic(yearSelect.value);
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
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 1)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 2)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 3)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 4)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 5)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 6)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 7)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 8)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 9)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 10)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 11)?.totalExpectedRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 12)?.totalExpectedRevenue || 0,
          ],
          borderColor: '#888888',
          backgroundColor: '#888888',
          fill: false,
          tension: 0.1,
        },
        {
          label: t('total_actual_revenue'),
          data: [
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 1)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 2)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 3)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 4)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 5)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 6)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 7)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 8)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 9)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 10)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 11)?.totalActualRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 12)?.totalActualRevenue || 0,
          ],
          borderColor: '#50c433',
          backgroundColor: '#50c433',
          fill: false,
          tension: 0.1,
        },
        {
          label: t('total_remaining_revenue'),
          data: [
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 1)?.totalRemainingRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 2)?.totalRemainingRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 3)?.totalRemainingRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 4)?.totalRemainingRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 5)?.totalRemainingRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 6)?.totalRemainingRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 7)?.totalRemainingRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 8)?.totalRemainingRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 9)?.totalRemainingRevenue || 0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 10)?.totalRemainingRevenue ||
              0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 11)?.totalRemainingRevenue ||
              0,
            responseData.revenueStatistic.find((item) => $dayjs(item.period).month() === 12)?.totalRemainingRevenue ||
              0,
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

function generateArrayFromRange(n: number, m: number) {
  // Calculate the length of the array
  const length = m - n + 1;

  // Use Array.from to create an array of the correct length
  // The map function adds the starting value 'n' to each index 'i'
  return Array.from({ length: length }, (_, i) => n + i);
}

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  getStatisticData();
});

// ---------------------- Watchers ----------------------
watch(yearSelect, () => {
  // Handle year selection change
  getBillStatisticData();
});
</script>
