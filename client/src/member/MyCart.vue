<template>
  <div class="w-full container mx-auto p-4">
    <header class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
      <h2 class="text-2xl font-semibold">Giỏ hàng</h2>
      <router-link to="/" class="text-blue-500 hover:underline">Tiếp tục mua sắm</router-link>
    </header>
    <ul v-if="cart.length > 0" class="space-y-4">
      <li
        v-for="(cartItem, index) in cart"
        :key="index"
        class="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4"
      >
        <img
          :src="getImageSrc(cartItem.product?.images)"
          alt="Product Image"
          class="w-32 sm:w-32 h-32 object-cover rounded-md mb-4 sm:mb-0"
        />
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full sm:pl-4">
          <div class="flex flex-col w-full">
            <p class="text-gray-800 font-semibold text-lg">{{ cartItem.product?.name }}</p>
            <p class="text-gray-500">Giá: {{ cartItem.product?.price }}$</p>
            <div class="flex items-center mt-2">
              <input
                type="number"
                min="1"
                v-model="cartItem.quantity"
                class="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                @click.prevent="updatequantity(cartItem)"
                class="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Cập nhật
              </button>
            </div>
          </div>
          <button
            class="mt-4 sm:mt-0 sm:ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
            @click.prevent="removeItems(cartItem)"
          >
            Xóa
          </button>
        </div>
      </li>
    </ul>
    <p v-else class="text-center py-8 text-gray-500">Giỏ hàng của bạn đang trống.</p>
    <div class="mt-8 bg-gray-50 p-4 rounded-lg shadow-md">
      <header class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <h2 class="text-2xl font-semibold">Thông tin thanh toán</h2>
      </header>
      <div class="flex flex-col space-y-4">
        <span class="text-gray-800 text-lg">Tổng giá tiền: <span class="font-semibold">{{ totalCartPrice }} $</span></span>
        <router-link :to="{ name: 'check-out' }">
          <div
            class="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            :class="{ 'opacity-50 cursor-not-allowed': cart.length === 0 }"
          >
            <button :disabled="cart.length === 0">Đặt hàng</button>
          </div>
        </router-link>
      </div>
    </div>
    <Toast
      :message="Toast.message"
      :duration="3000"
      :position="Toast.position"
      :backgroundcolor="Toast.backgroundcolor"
      @close="clearToast"
    />
  </div>
</template>

<script>
import Toast from '../components/Toast.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { Toast },
  data() {
    return {
      Toast: {
        message: '',
        position: '',
        backgroundcolor: ''
      }
    }
  },
  created() {
    this.fetchcart()
  },
  computed: {
    ...mapGetters('user', ['cart']),
    totalCartPrice() {
      return this.cart.reduce((total, cartItem) => {
        return total + cartItem.product.price * cartItem.quantity
      }, 0).toFixed(2)
    },
  },
  methods: {
    ...mapActions('user', ['deleteProductToCart', 'fetchcart', 'addProductToCart']),
    ...mapActions('order', ['orderproduct']),
    getImageSrc(images) {
      if (Array.isArray(images)) {
        return images.length > 1 ? images[0] : images[0];
      }
      return images;
    },
    async updatequantity(cartItem) {
      try {
        const id = cartItem.product._id
        const newquantity = cartItem.quantity
        const stock = cartItem.product.quantity
        
        if (newquantity <= stock) {
          const data = { pid: id, quantity: newquantity }
          await this.addProductToCart(data)
          this.Toast = {
            message: 'Cập nhật số lượng thành công!',
            position: 'bottom-left',
            backgroundcolor: 'success'
          }
          setTimeout(() => {
            this.fetchcart();
          }, 2000);
        } else {
          this.Toast = {
            message: `Số lượng hiện tại còn: ${stock}`,
            position: 'bottom-right',
            backgroundcolor: 'error'
          }
        }
      } catch (error) {
        console.log(error)
        this.Toast = {
          message: 'Đã xảy ra lỗi khi cập nhật số lượng.',
          position: 'bottom-left',
          backgroundcolor: 'error'
        }
      }
    },
    async removeItems(cartItem) {
      try {
        await this.deleteProductToCart(cartItem)
        this.Toast = {
          message: 'Đã xóa sản phẩm',
          position: 'bottom-right',
          backgroundcolor: 'success'
        }
      } catch (error) {
        console.log(error)
      }
    },
    clearToast() {
      this.Toast.message = ''
    }
  }
}
</script>

<style scoped>
/* Custom styles if necessary */
</style>
