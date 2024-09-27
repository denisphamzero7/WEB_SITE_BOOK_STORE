<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Order History</h1>
    <div class="overflow-x-auto">
      <!-- Form search -->
      <form @submit.prevent="statusOrder" class="flex items-center space-x-4 mb-6">
        <select v-model="status" class="block w-64 px-4 py-2 border rounded-md text-gray-700 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          <option value="">Select status</option>
          <option value="cancelled">Cancelled</option>
          <option value="success">Success</option>
        </select>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <span class="pi pi-search"></span>
        </button>
      </form>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
          <!-- Table head -->
          <thead class="bg-gray-100">
            <!-- Header row -->
            <tr>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- No orders found -->
            <tr v-if="!paginatedOrders.length">
              <td colspan="5" class="py-3 px-4 text-center text-gray-500">No orders found.</td>
            </tr>
            <!-- Loop through orders -->
            <tr v-for="(item, index) in paginatedOrders" :key="item._id">
              <td class="py-3 px-4 text-sm text-gray-900">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td class="py-3 px-4 text-sm text-gray-900">
                <ul>
                  <li v-for="el in item.products" :key="el._id" class="flex items-center space-x-2 mb-2">
                    <img :src="el.product.images" class="w-16 h-16" alt="">
                    <div>
                      <span class="block text-gray-900">{{ el.product.name }}</span>
                      <span class="block text-gray-500">Quantity: {{ el.quantity }}</span>
                    </div>
                  </li>
                </ul>
              </td>
              <td class="py-3 px-4 text-sm text-gray-900">${{ item.total.toFixed(2) }}</td>
              <td class="py-3 px-4 text-sm text-gray-900">{{ item.status }}</td>
              <td class="py-3 px-4 text-sm text-gray-900">{{ new Date(item.createdAt).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Pagination -->
    <Pagination  :totalItems="totalOrders" :itemsPerPage="itemsPerPage" :currentPage="currentPage" @page-changed="handlePageChange" />
    <!-- Toast -->
    <Toast :message="Toast.message" :duration="3000" :position="Toast.position" :backgroundcolor="Toast.backgroundcolor" @close="clearToast" />
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue' // Điều chỉnh đường dẫn khi cần thiết
import Toast from '../components/Toast.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Pagination,
    Toast
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 3,
      status: '',
      Toast: {
        message: '',
        position: '',
        backgroundcolor: ''
      }
    }
  },
  created() {
    this.fetchOrder({ page: this.currentPage, limit: this.itemsPerPage })
  },
  computed: {
    ...mapGetters('order', ['Order']),
    totalOrders() {
      return this.Order.length
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.Order.slice(start,end)
    }
  },
  methods: {
    ...mapActions('order', ['fetchOrder', 'getorderbystatus']),
    clearToast() {
      this.Toast.message = ''
    },
    async statusOrder() {
      try {
        if (this.status.trim() !== '') {
          const response = await this.getorderbystatus(this.status)
          if (response) {
            this.Toast = {
              message: `Found ${this.status}: ${response.length} orders`,
              position: 'bottom-left',
              backgroundcolor: 'success'
            }
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    handlePageChange(page) {
      this.currentPage = page
      this.fetchOrder({ page: this.currentPage, limit: this.itemsPerPage })
    }
  }
}
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh ở đây nếu cần */
</style>
