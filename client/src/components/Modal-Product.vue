
<template>
  <Teleport to="body">
    <div 
      v-if="isModalOpen" 
      @click.prevent="closeProductModal" 
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50 overflow-auto"
    >
      <div class="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-lg md:max-w-3xl mx-2 sm:mx-4 md:mx-6 lg:mx-8 relative">
        <div v-if="selectedProduct" class="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 sm:overflow-scroll">
          <div class="flex flex-col sm:w-1/2 relative">
            <img :src="selectedProduct.images" alt="Product Image" class="w-full h-auto rounded-lg shadow-md" />
            <div v-if="selectedProduct.discount > 0" class="absolute top-0 right-0 animate-pulse bg-gradient-to-r from-red-500 to-yellow-500 text-white p-1 rounded-bl-lg">
              {{ selectedProduct.discount }}% OFF
            </div>
            <div class="flex items-center justify-center mt-2 sm:mt-4">
              <button @click.prevent="decrementCount" class="border border-gray-300 p-1 sm:p-2 rounded-l-lg hover:bg-gray-100">-</button>
              <input type="number" v-model="countproducts" class="border-t border-b border-gray-300 p-1 sm:p-2 text-center w-10 sm:w-12 md:w-16" />
              <button @click.prevent="incrementCount" class="border border-gray-300 p-1 sm:p-2 rounded-r-lg hover:bg-gray-100">+</button>
            </div>
            <button @click.prevent="addToCart" class="bg-red-600 text-white py-1 sm:py-2 mt-2 sm:mt-4 rounded-md hover:bg-red-700 transition duration-300">Thêm vào giỏ hàng</button>
          </div>
          <div class="flex flex-col sm:w-1/2">
            <h1 class="text-lg sm:text-xl md:text-2xl font-semibold">{{ selectedProduct.name }}</h1>
            <div class="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2 border-b pb-1 sm:pb-2">
              <a-rate :value="getstar" disabled allowHalf />
              <span class="text-xs sm:text-sm md:text-lg text-red-600 pl-2 sm:pl-3">({{ getstar }} đánh giá)</span>
            </div>
            <span v-if="selectedProduct.discount > 0" class="text-xl sm:text-2xl md:text-3xl text-red-600 mt-1 sm:mt-2 border-b pb-1 sm:pb-2">
              Giá: <s>{{ selectedProduct.price }}$</s> {{ selectedProduct.discountedPrice }}$
            </span>
            <span v-else class="text-xl sm:text-2xl md:text-3xl text-red-600 mt-1 sm:mt-2 border-b pb-1 sm:pb-2">
              Giá: {{ selectedProduct.price }}$
            </span>
            <p class="font-bold text-sm sm:text-base md:text-lg mt-2 sm:mt-4 line-clamp-2">{{ selectedProduct.title }}</p>
            <p class="text-xs sm:text-sm md:text-base mt-1">Thể loại sách: {{ selectedProduct.title }}</p>
            <p class="text-xs sm:text-sm md:text-base mt-1">Tác giả: {{ selectedProduct?.author.name }}</p>
            <p class="text-xs sm:text-sm md:text-base mt-1">Nhà xuất bản: {{ selectedProduct?.publisher.title }}</p>
            <p class="text-xs sm:text-sm md:text-base mt-1">Ngày phát hành: {{ formatDate(selectedProduct.createdAt) }}</p>
            <div class="flex gap-1 mt-1 sm:mt-2 grid-flow-row overflow-hidden">
              <span class="text-xs sm:text-sm md:text-lg text-red-600">Số lượng: {{ selectedProduct.quantity }}</span>
              <span class="text-xs sm:text-sm md:text-lg text-green-600">đã bán: {{ selectedProduct.sold }}</span>
              <span class="text-xs sm:text-sm md:text-lg text-red-600">Tình trạng: {{ selectedProduct.quantity > 0 ? 'Còn hàng' : 'Hết hàng' }}</span>
            </div>
            <div class="flex justify-center mt-2 sm:mt-4">
              <router-link :to="{ name: 'detail-product', params: { id: selectedProduct._id } }" @click.native="handleCloseAndNavigate(selectedProduct._id)">
                <h1 class="bg-red-600 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-lg hover:bg-red-700 transition duration-300">Xem chi tiết</h1>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <Toast
        :message="Toast.message"
        :duration="2000"
        :position="Toast.position"
        :backgroundcolor="Toast.backgroundcolor"
        @close="clearToast"
      />
    </div>
  </Teleport>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Toast from './Toast.vue'
import { format } from 'date-fns'
import author from '@/service/author';

export default {
  components: { Toast },
  data() {
    return {
      Toast: {
        message: '',
        position: '',
        backgroundcolor: ''
      },
      countproducts: 1
    }
  },
  computed: {
    getstar() {
      if (this.selectedProduct && this.selectedProduct.totalRating && this.selectedProduct.totalRating.length > 0) {
        return this.selectedProduct.totalRating[0];
      } else {
        return 0; // or any default value you prefer
      }
    },
    ...mapGetters('product', [
      'isModalOpen',
      'selectedProduct',
      'totalProductPrice',
      'getcountproducts'
    ])
  },
  methods: {
    ...mapActions('product', ['closeProductModal','recommendProduct']),
    ...mapActions('user', ['addProductToCart']),

    clearToast() {
      this.Toast.message = '';
    },
    incrementCount() {
      if (this.countproducts < this.selectedProduct.quantity) {
        this.countproducts++;
      }
    },
    decrementCount() {
      if (this.countproducts > 1) {
        this.countproducts--;
      }
    },
    async addToCart() {
      try {
        const availableQuantity = this.selectedProduct.quantity;
        if (availableQuantity === 0) {
          this.Toast = {
            message: 'Sản phẩm đã hết hàng',
            position: 'bottom-center',
            backgroundcolor: 'warning'
          };
        } else {
          const price = this.selectedProduct.discountedPrice > 0 ? this.selectedProduct.discountedPrice : this.selectedProduct.price
          const data = { pid: this.selectedProduct._id, quantity: this.countproducts, price: price };
          const response = await this.addProductToCart(data);
          if (response) {
            this.Toast = {
              message: 'Thêm vào giỏ hàng thành công!',
              position: 'bottom-center',
              backgroundcolor: 'success'
            };
          } else {
            this.Toast = {
              message: 'Thêm vào giỏ hàng thất bại!',
              position: 'bottom-center',
              backgroundcolor: 'error'
            };
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (date) {
        const formattedDate = new Date(date);
        if (!isNaN(formattedDate.getTime())) {
          return format(formattedDate, 'yyyy-MM-dd HH:mm:ss');
        }
      }
      return 'Invalid date';
    },
    formatBookCategories(categories) {
      if (Array.isArray(categories)) {
        return categories.join(", ");
      }
      return 'N/A';
    },
    handleCloseAndNavigate(productId) {
      this.closeProductModal(); // Đóng modal
      this.$router.push({ name: 'detail-product', params: { id: productId } }); // Chuyển hướng đến trang chi tiết sản phẩm
    }
  }
}
</script>

<style scoped>
/* Ensure the background overlay is transparent */
div.fixed.inset-0 {
  background-color: rgba(0, 0, 0, 0.7); /* 70% opacity */
}
</style>
