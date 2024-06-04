<template>
  <div class="p-6 bg-gray-700 text-white min-h-screen">
    <h1 class="text-3xl font-bold mb-4  p-2 rounded-lg">Order Details</h1>
    <div class="mb-8 bg-gray-800 p-4 rounded-lg">
      <p class="mb-2"><strong>Order ID:</strong> {{ order._id }}</p>
      <p class="mb-2"><strong>Status:</strong> {{ order.status }}</p>
      <p class="mb-2"><strong>Total:</strong> ${{ order.total }}</p>
      <p class="mb-2"><strong>Shipping Address:</strong> {{ order.address }}</p>
      <p class="mb-2"><strong>Ordered By:</strong> {{ order.orderBy?.firstname }} {{ order.orderBy?.lastname }}</p>
    </div>
    <h2 class="text-2xl font-bold mb-4">Ordered Products</h2>
    <div v-if="order.products && order.products.length">
      <table class="min-w-full bg-gray-800 text-white border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-900">
            <th class="py-2 px-4 border-b border-gray-600 border-r">Product Name</th>
            <th class="py-2 px-4 border-b border-gray-600 border-r">Image</th>
            <th class="py-2 px-4 border-b border-gray-600 border-r">Price</th>
            <th class="py-2 px-4 border-b border-gray-600">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.products" :key="index" class="bg-gray-800 hover:bg-gray-700">
            <td class="py-2 px-4 border-b border-gray-600 border-r">{{ item.product.name }}</td>
            <td class="py-2 px-4 border-b border-gray-600 border-r">
              <img :src="item.product.images" :alt="item.product.name" class="h-16 w-16 object-cover rounded">
            </td>
            <td class="py-2 px-4 border-b border-gray-600 border-r">${{ item.product.price }}</td>
            <td class="py-2 px-4 border-b border-gray-600">{{ item.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="mt-4">
      <p>No products ordered.</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  mounted() {
    this.getAnOrder(this.$route.params.oid);
  },
  methods: {
    ...mapActions('order', ['getAnOrder']),
  },
  computed: {
    ...mapGetters('order', ['order']),
  }
}
</script>

<style scoped>
/* No custom styles needed as Tailwind CSS classes handle styling */
</style>
