<template>
  <div class="bg-gray-700 p-6">
    <h1 class="flex items-center font-medium text-3xl text-white mb-6">
      <li class="rounded-full bg-[#0f172ab3] p-3 text-xl pi pi-chart-line mr-3"></li>
      {{ header }}
    </h1>
    <div class="flex flex-wrap justify-between gap-6">
      <div class="w-[30%] h-[120px] flex justify-between items-center px-5 py-3 rounded-lg bg-[#0f172ab3] shadow-lg">
        <span class="flex flex-col items-start text-gray-400">
          Clients: <span class="text-white text-2xl font-semibold">{{ statistical.totalUser }}</span>
        </span>
        <li class="pi pi-users text-green-600 text-3xl"></li>
      </div>
      <div class="w-[30%] h-[120px] flex justify-between items-center px-5 py-3 rounded-lg bg-[#0f172ab3] shadow-lg">
        <span class="flex flex-col items-start text-gray-400">
          Sales: <span class="text-white text-2xl font-semibold">{{ statistical.totalPayment }} $</span>
        </span>
        <li class="pi pi-shopping-cart text-blue-500 text-3xl"></li>
      </div>
      <div class="w-[30%] h-[120px] flex justify-between items-center px-5 py-3 rounded-lg bg-[#0f172ab3] shadow-lg">
        <span class="flex flex-col items-start text-gray-400">
          Orders: <span class="text-white text-2xl font-semibold">{{ statistical.totalOrder }}</span>
        </span>
        <li class="pi pi-box text-red-500 text-3xl"></li>
      </div>
      <div class="w-[30%] h-[120px] flex justify-between items-center px-5 py-3 rounded-lg bg-[#0f172ab3] shadow-lg">
        <span class="flex flex-col items-start text-gray-400">
          Products: <span class="text-white text-2xl font-semibold">{{ statistical.totalProduct }}</span>
        </span>
        <li class="pi pi-shopping-bag  text-red-500 text-3xl"></li>
      </div>
    </div>
    <div>
      <h1 class="flex items-center font-medium text-3xl text-white mt-6">
        <li class="rounded-full bg-[#0f172ab3] p-3 text-xl pi pi-chart-line mr-3"></li>
        {{ header1 }}
      </h1>
      <div class="card mt-4 bg-[#0f172ab3] p-4 rounded-lg shadow-lg">
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-96" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'primevue/chart'; // Ensure this import is correct
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Chart // Register the Chart component here
  },
  data() {
    return {
      header: 'Overview',
      header1: 'Trends Overview',
      chartData: null,
      chartOptions: null
    };
  },
  computed: {
    ...mapGetters('user', ['statistical'])
  },
  mounted() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
    this.fetchstatistical();
  },
  methods: {
    ...mapActions('user', ['fetchstatistical']),
    setChartData() {
      const documentStyle = getComputedStyle(document.documentElement);

      return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--cyan-500'),
            tension: 0.4
          },
          {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--gray-500'),
            tension: 0.4
          }
        ]
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
/* No additional styles needed as Tailwind CSS handles it */
</style>
