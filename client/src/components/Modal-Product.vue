<template>
  <Teleport to="body">
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div class="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-3xl mx-4 sm:mx-6 md:mx-8 lg:mx-10 relative ">
        <button
          @click.prevent="closeProductModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl mb-3"
        >
          <i class="pi pi-times-circle"></i>
        </button>
        <div v-if="selectedProduct" class="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div class="flex flex-col sm:w-1/2">
            <img :src="selectedProduct.images" alt="Product Image" class="w-full h-auto rounded-lg shadow-md" />
            <div class="flex items-center justify-center mt-4">
              <button
                @click.prevent="decrementCount"
                class="border border-gray-300 p-2 rounded-l-lg hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                v-model="countproducts"
                class="border-t border-b border-gray-300 p-2 text-center w-12 sm:w-16"
              />
              <button
                @click.prevent="incrementCount"
                class="border border-gray-300 p-2 rounded-r-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              @click.prevent="addToCart"
              class="bg-red-600 text-white py-2 mt-4 rounded-md hover:bg-red-700 transition duration-300"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <div class="flex flex-col sm:w-1/2">
            <h1 class="text-xl sm:text-2xl font-semibold">{{ selectedProduct.name }}</h1>
            <div class="flex items-center gap-2 mt-2 border-b pb-2">
              <a-rate :value="getstar" disabled allowHalf />
              <span class="text-sm sm:text-lg text-red-600 pl-3">({{ getstar }} đánh giá)</span>
            </div>
            <span class="text-2xl sm:text-3xl text-red-600 mt-2 border-b pb-2">Giá: {{ selectedProduct.price }}$</span>
            <p class="font-bold text-base sm:text-lg mt-4 line-clamp-2">{{ selectedProduct.title }}</p>
            <p class="text-sm sm:text-base mt-1">Thể loại sách: {{ formatBookCategories(selectedProduct.bookcategory) }}</p>
            <p class="text-sm sm:text-base mt-1">Tác giả: {{ selectedProduct.author?.name }}</p>
            <p class="text-sm sm:text-base mt-1">Nhà xuất bản: {{ selectedProduct.publisher?.title }}</p>
            <p class="text-sm sm:text-base mt-1">Ngày phát hành: {{ formatDate(selectedProduct.createdAt) }}</p>
            <div class="flex gap-2 mt-2">
              <span class="text-sm sm:text-lg text-red-600">Số lượng: {{ selectedProduct.quantity }}</span>
              <span class="text-sm sm:text-lg text-red-600">Tình trạng: {{ selectedProduct.quantity > 0 ? 'Còn hàng' : 'Hết hàng' }}</span>
            </div>
            <div class="flex justify-center mt-4">
              <router-link :to="{ name: 'detail-product', params: { id: selectedProduct._id } }">
                <h1 class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">Xem chi tiết</h1>
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
          const data = { pid: this.selectedProduct._id, quantity: this.countproducts };
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
  }
}
</script>

<style scoped>
button {
  outline: none;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
