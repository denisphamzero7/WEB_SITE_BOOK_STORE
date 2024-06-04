<template>
    <div>
      <!-- Check if chartData is defined and has required properties before rendering the chart -->
      <line-chart v-if="isDataValid" :chart-data="chartData" :options="options" />
      <div v-else class="text-white">Loading chart data...</div>
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  
  export default {
    name: 'TrendChart',
    components: {
      LineChart: Line
    },
    props: {
      chartData: {
        type: Object,
        required: true,
        default: () => ({ labels: [], datasets: [] })
      },
      options: {
        type: Object,
        default: () => ({
          responsive: true,
          maintainAspectRatio: false
        })
      }
    },
    computed: {
      // Check if chartData is valid (contains labels and datasets)
      isDataValid() {
        return this.chartData && this.chartData.labels && this.chartData.datasets;
      }
    }
  };
  </script>
  