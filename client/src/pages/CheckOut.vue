<template>
  <div class="flex flex-col md:flex-row h-full max-h-screen overflow-y-auto bg-gray-50">
    <div class="md:w-1/3 p-4 md:p-8 flex items-center justify-center bg-white">
      <img src="../assets/payment.avif" class="max-h-full max-w-full object-contain rounded-lg shadow-md" />
    </div>
    <div class="md:w-2/3 p-4 md:p-8">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Check Your Cart</h2>
      <table class="w-full mb-4 md:mb-6 border-collapse">
        <thead class="bg-gray-200 text-gray-700">
          <tr>
            <th class="py-2 md:py-3 text-center">No.</th>
            <th class="py-2 md:py-3 text-left">Product</th>
            <th class="py-2 md:py-3 text-center">Quantity</th>
            <th class="py-2 md:py-3 text-center">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index" class="odd:bg-white even:bg-gray-100">
            <td class="py-2 text-center">{{ index + 1 }}</td>
            <td class="py-2">{{ item.product.name }}</td>
            <td class="py-2 text-center">{{ item.quantity }}</td>
            <td class="py-2 text-center">{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
      <div class="bg-gray-100 border rounded-lg p-4 mb-4 md:mb-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <span class="font-semibold text-lg">Total Price:</span>
          <p class="font-bold text-red-500 text-xl">{{ totalCartPrice }} VND</p>
        </div>
        <div class="flex flex-col md:flex-row md:items-center mb-2">
          <label for="address" class="text-lg font-semibold mb-2 md:mb-0 md:mr-2">Shipping Address:</label>
          <input
            id="address"
            name="address"
            v-model="User.address"
            type="text"
            autocomplete="street-address"
            required
            class="flex-1 text-gray-700 bg-white border border-gray-300 py-2 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
          />
        </div>
      </div>
      <div class="bg-gray-100 border rounded-lg p-4">
        <label for="payment" class="block text-lg font-semibold mb-2">Payment</label>
        <Paypal />
      </div>
    </div>
  </div>
</template>

<script>
import Paypal from '../components/Paypal.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { Paypal },
  data() {
    return {
      info: 'The shipping address will be saved to your account to help you a faster checkout with your next orders.'
    }
  },
  created() {
    this.fetchcart();
    this.fetchcurrentuser()
  },
  computed: {
    ...mapGetters('user', ['cart', 'User']),

    totalCartPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    }
  },
  methods: {
    ...mapActions('user', ['fetchcart', 'updateAddress', 'fetchcurrentuser']),
  }
}
</script>

<style scoped>
/* Additional styles if necessary */
</style>
