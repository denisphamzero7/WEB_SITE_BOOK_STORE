<template>
  <div class="flex h-full max-h-screen overflow-y-auto">
    <div class="w-1/3 p-8 flex items-center justify-center">
      <img src="../assets/payment.avif" class="max-h-full max-w-full object-contain" />
    </div>
    <div class="w-2/3 p-8">
      <h2 class="text-3xl font-bold mb-8">Check Your Cart</h2>
      <table class="w-full mb-2">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-3 text-center">No.</th>
            <th class="py-3 text-left">Product</th>
            <th class="py-3 text-center">Quantity</th>
            <th class="py-3 text-center">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <td class="py-2 text-center">{{ index + 1 }}</td>
            <td class="py-2">{{ item.product.name }}</td>
            <td class="py-2 text-center">{{ item.quantity }}</td>
            <td class="py-2 text-center">{{ item.product.price }}</td>
          </tr>
        </tbody>
      </table>
      <div class="bg-gray-100 border rounded p-4 mb-2">
        <div class="flex gap-2 mb-4">
          <span class="font-semibold">Total Price:</span>
          <p class="font-bold text-red-500">{{ totalCartPrice }}</p>
        </div>
        <div class="flex mb-2 text-center">
          <label for="address" class="text-lg text-center font-semibold mr-2">Shipping Address :</label>
          <input
            id="address"
            name="address"
            v-model="User.address"
            type="text"
            autocomplete="street-address"
            required
            class="flex-1 text-red-500 font-bold bg-white border border-gray-300 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div class="bg-gray-100 border rounded p-2">
        <label for="payment" class="block text-lg font-semibold mb-2 pl-3">Payment</label>
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
      return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)
    }
  },
  methods: {
    ...mapActions('user', ['fetchcart','updateAddress','fetchcurrentuser']),

   
  }
}
</script>
