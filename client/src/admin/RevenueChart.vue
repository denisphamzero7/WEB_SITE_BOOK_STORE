<template>
    <div class="p-4">
      <div class="max-w-3xl mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800">Revenue by Product</h2>
          <input
            type="date"
            v-model="selectedDate"
            class="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <canvas id="revenueChart" class="shadow-lg rounded-lg mb-4"></canvas>
        <div class="text-sm text-gray-600">
          <p>Select a date to filter the revenue data by that specific day. The chart will automatically update to reflect the revenue for the selected date.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
 
  
  export default {
    name: 'RevenueChart',
    data() {
      return {
        productRevenue: {},
        selectedDate: '', // For date filtering
      };
    },
    computed: {
      ...mapGetters('order', ['Order']),
    },
    methods: {
      ...mapActions('order', ['fetchOrdersByadmin']),
      parseOrderData() {
        this.productRevenue = {}; // Reset productRevenue
        this.Order.forEach((order) => {
          if (
            !this.selectedDate ||
            new Date(order.createdAt).toLocaleDateString() ===
              new Date(this.selectedDate).toLocaleDateString()
          ) {
            order.products.forEach((orderProduct) => {
              const productName = orderProduct.product.name;
              const productRevenueAmount =
                orderProduct.product.price * orderProduct.quantity;
  
              if (this.productRevenue[productName]) {
                this.productRevenue[productName] += productRevenueAmount;
              } else {
                this.productRevenue[productName] = productRevenueAmount;
              }
            });
          }
        });
        this.createPieChart();
      },
      createPieChart() {
        const canvas = document.getElementById('revenueChart');
        if (canvas instanceof HTMLCanvasElement) {
          const ctx = canvas.getContext('2d');
          
          // Define a set of colors
          const backgroundColors = [
            '#F87171', '#60A5FA', '#FBBF24', '#34D399', '#A78BFA', '#F472B6',
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
            '#C9CBCF', '#FFD700', '#6495ED', '#DC143C', '#00FF7F', '#8A2BE2'
          ];
          
          const borderColors = backgroundColors.map(color => {
            // Convert to darker border colors
            return color.replace(/0.2\)$/, '1)');
          });
    
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: Object.keys(this.productRevenue),
              datasets: [
                {
                  data: Object.values(this.productRevenue),
                  backgroundColor: backgroundColors.slice(0, Object.keys(this.productRevenue).length),
                  borderColor: borderColors.slice(0, Object.keys(this.productRevenue).length),
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Revenue by Product',
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      let label = context.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed !== null) {
                        label += new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(context.parsed);
                      }
                      return label;
                    },
                    // Add percentage callback
                    afterLabel: function (context) {
                      let label = '';
                      if (context.parsed !== null) {
                        label = `(${(context.parsed * 100 / context.dataset.data.reduce((a, b) => a + b)).toFixed(2)}%)`;
                      }
                      return label;
                    },
                  },
                },
              },
            },
          });
        }
      },
    },
    async mounted() {
      await this.fetchOrdersByadmin();
      this.parseOrderData();
    },
    watch: {
      selectedDate() {
        this.parseOrderData();
      },
    },
  };
  </script>
  
  <style scoped>
  #revenueChart {
    max-width: 600px;
    margin: auto;
  }
  </style>
  