<template>
  <div class="bg-gray-700 p-6">
    <h1 class="flex items-center font-medium text-3xl text-white mb-6">
      <li class="rounded-full bg-[#0f172ab3] p-3 text-xl pi pi-chart-line mr-3"></li>
      {{ header }}
    </h1>
    <div class="flex flex-wrap justify-between gap-6">
      <div class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-[120px] flex justify-between items-center px-5 py-3 rounded-lg bg-[#0f172ab3] shadow-lg">
        <span class="flex flex-col items-start text-gray-400">
          Clients: <span class="text-white text-2xl font-semibold">{{ statistical.totalUser }}</span>
        </span>
        <li class="pi pi-users text-green-600 text-3xl"></li>
      </div>
      <div class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-[120px] flex justify-between items-center px-5 py-3 rounded-lg bg-[#0f172ab3] shadow-lg">
        <span class="flex flex-col items-start text-gray-400">
          Sales: <span class="text-white text-2xl font-semibold">{{ statistical.totalPayment }} $</span>
        </span>
        <li class="pi pi-shopping-cart text-blue-500 text-3xl"></li>
      </div>
      <div class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-[120px] flex justify-between items-center px-5 py-3 rounded-lg bg-[#0f172ab3] shadow-lg">
        <span class="flex flex-col items-start text-gray-400">
          Orders: <span class="text-white text-2xl font-semibold">{{ statistical.totalOrder }}</span>
        </span>
        <li class="pi pi-box text-red-500 text-3xl"></li>
      </div>
      <div class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-[120px] flex justify-between items-center px-5 py-3 rounded-lg bg-[#0f172ab3] shadow-lg">
        <span class="flex flex-col items-start text-gray-400">
          Products: <span class="text-white text-2xl font-semibold">{{ statistical.totalProduct }}</span>
        </span>
        <li class="pi pi-shopping-bag text-red-500 text-3xl"></li>
      </div>
    </div>
    <div class="w-full mt-6">
      <h1 class="flex items-center font-medium text-3xl text-white">
        <li class="rounded-full bg-[#0f172ab3] p-3 text-xl pi pi-chart-line mr-3"></li>
        {{ header1 }}
      </h1>
      <div class="card mt-4 bg-[#0f172ab3] p-4 rounded-lg shadow-lg">
        <Chart type="line" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'primevue/chart';
import { mapActions, mapGetters } from 'vuex';
import RevenueChart from './RevenueChart.vue';

export default {
  components: {
    Chart,
    RevenueChart
  },
  data() {
    return {
      header: 'Overview',
      header1: 'Total Products Sold',
      chartData: null,
      chartOptions: null
    };
  },
  computed: {
    ...mapGetters('user', ['statistical']),
    ...mapGetters('order', ['Order'])
  },
  mounted() {
    this.fetchstatistical();
    this.fetchOrdersByadmin();
  },
  methods: {
    ...mapActions('user', ['fetchstatistical']),
    ...mapActions('order', ['fetchOrdersByadmin']),
    prepareChartData() {
      const months = Array(12).fill(0);
      this.Order.forEach(order => {
        const month = new Date(order.createdAt).getMonth();
        order.products.forEach(product => {
          months[month] += product.quantity;
        });
      });
      
     

      this.chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Total Products Sold',
            data: months,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4
          }
        ],
       
      };

      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Months'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Total Products Sold'
            },
            min: 0
          }
        }
      };
    }
  },
  watch: {
    Order: 'prepareChartData'
  }
};
</script>

<style>
/* Add your custom styles here */

</style>
