<template>
  <div class="p-6 bg-gray-700 min-h-screen">
    <!-- Header -->
    <h1 class="flex items-center font-medium text-3xl text-white mb-6">
      <li class="rounded-full bg-[#0f172ab3] p-3 text-xl text-white pi pi-box mr-3"></li>
      {{ header }}
    </h1>

    <!-- Order Table -->
    <div class="bg-[#0f172ab3] p-4 rounded-lg shadow-lg overflow-x-auto">
      <div class="mb-4 flex justify-end">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by user name..."
          class="p-2 w-80 bg-gray-800 text-white rounded"
        />
      </div>
      <table class="min-w-full text-white border-collapse">
        <thead>
          <tr class="bg-gray-800">
            <th class="border border-gray-600 py-2 px-4">User</th>
            <th class="border border-gray-600 py-2 px-4">Total</th>
            <th class="border border-gray-600 py-2 px-4">Address</th>
            <th class="border border-gray-600 py-2 px-4">Status</th>
            <th class="border border-gray-600 py-2 px-4">Created At</th>
            <th class="border border-gray-600 py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in paginatedOrders"
            :key="order._id"
            class="odd:bg-gray-700 even:bg-gray-800 hover:bg-gray-600"
          >
            <td class="border border-gray-600 py-2 px-4">
              {{ order.orderBy.firstname }} {{ order.orderBy.lastname }}
            </td>
            <td class="border border-gray-600 py-2 px-4">{{ order.total }}</td>
            <td class="border border-gray-600 py-2 px-4">{{ order.address }}</td>
            <td class="border border-gray-600 py-2 px-4 flex items-center">
              <select
                v-model="order.status"
                @change="updateOrder(order)"
                class="p-2 bg-gray-800 text-white rounded"
              >
                <option
                  value="success"
                  :selected="order.status === 'success'"
                  class="bg-gray-700 text-white"
                >
                  Success
                </option>
                <option
                  value="pending"
                  :selected="order.status === 'pending'"
                  class="bg-gray-700 text-white"
                >
                  Pending
                </option>
                <option
                  value="shipped"
                  :selected="order.status === 'shipped'"
                  class="bg-gray-700 text-white"
                >
                  Shipped
                </option>
                <option
                  value="delivered"
                  :selected="order.status === 'delivered'"
                  class="bg-gray-700 text-white"
                >
                  Delivered
                </option>
                <option
                  value="cancelled"
                  :selected="order.status === 'cancelled'"
                  class="bg-gray-700 text-white"
                >
                  Cancelled
                </option>
              </select>
            </td>
            <td class="border border-gray-600 py-2 px-4">{{ formatDate(order.createdAt) }}</td>
            <td class="border border-gray-600 py-2 px-4">
              <button @click="viewOrder(order)" class="text-blue-400 hover:text-blue-600">
                View
              </button>
              <button @click="deleteOrder(order._id)" class="text-red-500 hover:text-red-700 ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center mt-4">
        <Pagination
          :totalItems="filteredOrders.length"
          :itemsPerPage="itemsPerPage"
          :currentPage="currentPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { format } from 'date-fns'
import Pagination from '../../components/Pagination.vue'
import io from'socket.io-client';
export default {
  components: {
    Pagination
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 4,
      header: 'Orders Manager',
      searchQuery: '',
      socket: null
    }
  },
  mounted() {
    this.fetchOrdersByadmin();
    // this.setupSocket();
  },
  computed: {
    ...mapGetters('order', ['Order']),
    filteredOrders() {
      let filtered = this.Order
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter((order) => {
          const userName = `${order.orderBy.firstname} ${order.orderBy.lastname}`.toLowerCase()
          return userName.includes(query)
        })
      }
      return filtered
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredOrders.slice(start, end)
    }
  },
  methods: {
    ...mapActions('order', ['fetchOrdersByadmin', 'deleteOrder', 'updateOrderStatus']),
    // setupSocket(){
    //   this.socket = io('http://localhost:3000'); // Make sure the URL matches your server's URL
    // this.socket.on('statuschanged', (data) => {
    //   if (data.orderId) {
    //     this.fetchOrdersByadmin(); // Fetch the updated orders if any order status changes
    //   }
    // });
    // },
    viewOrder(order) {
    this.$router.push({
      name: 'View-Order',
      params: { oid: order._id }
    })
  },
    formatDate(date) {
      return format(new Date(date), 'yyyy-MM-dd HH:mm:ss')
    },
    handlePageChange(page) {
      this.currentPage = page
    },
    async updateOrder(order) {
      try {
        await this.updateOrderStatus({ oid: order._id, status: order.status })
      } catch (error) {
        console.error('Error updating order status:', error)
        // Optionally, notify the user about the error
      }
    }
  }
}
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
