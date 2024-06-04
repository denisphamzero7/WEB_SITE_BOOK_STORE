<template>
  <div class="w-full container mx-auto">
    <header class="flex justify-start border-b border-black py-4">
      <h2 class="text-2xl font-semibold">Giỏ hàng</h2>
    </header>
    <ul v-if="cart.length > 0" class="space-y-4 w-full">
      <li
        v-for="(cartItem, index) in cart"
        :key="index"
        class="flex items-center justify-between bg-white shadow-md p-4 rounded-lg w-full"
      >
        <div class="flex items-center space-x-4 w-full">
          <img
          :src="getImageSrc(cartItem.product?.images)"
            alt="Product Image"
            class="w-20 h-30 object-cover rounded-md"
          />
          <div class="w-1/2">
            
            <p class="text-gray-800">tên: {{ cartItem.product?.name }}</p>
            <p class="text-gray-500">giá: {{ cartItem.product?.price }} <span>$</span></p>
            <p>
              <input
                type="number"
                min="1"
               
                v-model="cartItem.quantity"
                class="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
        
             
              <button
                @click.prevent="updatequantity(cartItem)"
                class="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Cập nhật
              </button>
            </p>
          </div>
          <div class="flex items-center">
            <button
              class="bg-red-500 text-white p-2 rounded-md hover:shadow-lg ml-5" 
              @click.prevent="removeItems(cartItem)"
            >
              Xóa
            </button>
          </div>
        </div>
      </li>
    </ul>
    <p v-else class="text-center py-8">Giỏ hàng của bạn đang trống.</p>
    <div class="flex flex-col mt-4">
      <header class="flex justify-start border-b border-black py-4">
        <h2 class="text-2xl font-semibold">Thông tin thanh toán</h2>
      </header>
      <div class="flex flex-col justify-between mt-4 space-y-2">
        <span class="text-gray-800">Tổng giá tiền: {{ totalCartPrice }} VND</span>
        <router-link :to="{ name: 'check-out' }">
          <div
            class="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
/* Thêm kiểu dạng nếu cần thiết */
</style>
