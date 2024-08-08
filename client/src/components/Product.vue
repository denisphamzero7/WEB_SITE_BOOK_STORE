```html
<template>
  <div class="card-product cursor-pointer p-2 relative">
    <div class="overflow-hidden relative">
      <img :src="getImageSrc(product?.images)" :alt="product.name" class="h-[200px] w-[300px] object-cover rounded-xl transform hover:scale-125 transition-transform" />
      <span v-if="product.discount > 0" class="discount-badge absolute top-2 right-2 font-bold text-sm p-2 rounded-full px-4 animate-pulse bg-gradient-to-r from-red-500 to-yellow-500 text-white">
        Sale {{ product.discount }}%
      </span>
    </div>
    <div
      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300"
      :class="{ 'opacity-100': product.hover }"
      @mouseover="product.hover = true"
      @mouseout="product.hover = false"
    >
      <div class="p-2 rounded-lg flex items-center gap-3">
        <button @click="openProductModal(product)" title="xem nhanh" class="relative">
          <div class="tooltip hidden absolute bg-red-500 text-antiquewhite p-1 rounded transform -translate-x-1/2 -top-9 transition-opacity duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-5 after:border-t-red-500 after:border-transparent">
            xem nhanh
          </div>
          <i class="pi pi-eye bg-white p-2 rounded-md hover:bg-red-500"></i>
        </button>
        <button @click.prevent="handleWishlistUpdate" title="yêu thích" class="relative">
          <i :class="['pi pi-heart-fill', 'p-2 rounded-md bg-white', isProductInWishlist ? 'text-red-500' : 'text-gray-500 hover:text-red-500']"></i>
          <div class="tooltip hidden absolute bg-red-500 text-antiquewhite p-1 rounded transform -translate-x-1/2 -top-9 transition-opacity duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-5 after:border-t-red-500 after:border-transparent">
            yêu thích
          </div>
        </button>
      </div>
    </div>
    <div class="p-2 flex flex-col items-center">
      <h2 class="font-bold text-lg mb-2 line-clamp-1 sm:line-clamp-2 group-hover:line-clamp-none">{{ shortname(product.name) }}</h2>
      <h3>Author : {{ product.author?.name}}</h3>
      <div class="flex items-center gap-2">
        <span v-if="product.discount > 0" class="text-sm line-through opacity-75">{{ product.price }}</span>
        <span v-if="product.discount > 0" class="text-xl font-semibold">{{ product.discountedPrice }}</span>
        <span v-else class="text-xl font-semibold">{{ product.price }}</span>
        <button @click.prevent="addToCart" class="relative">
          <div class=" hidden absolute bg-red-500 text-antiquewhite p-1 rounded transform -translate-x-1/2 -top-9 transition-opacity duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-5 after:border-t-red-500 after:border-transparent">
            buy
          </div>
          <i class="pi pi-shopping-cart bg-white p-2 rounded-md hover:bg-red-500"></i>
        </button>
      </div>
    </div>
    <Toast
      :message="Toast.message"
      :duration="2000"
      :position="Toast.position"
      :backgroundcolor="Toast.backgroundcolor"
      @close="clearToast"
    />
    <ModalProduct />
  </div>
</template>

<script>
import ModalProduct from './Modal-Product.vue';
import { mapActions, mapGetters } from 'vuex';
import Toast from './Toast.vue';
import Tooltip from 'primevue/tooltip';
import product from '@/service/product';

export default {
  components: { ModalProduct, Toast, Tooltip },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      Toast: {
        message: '',
        position: '',
        backgroundcolor: ''
      },
    };
  },

  computed: {
    ...mapGetters('product', ['isModalOpen']),
    ...mapGetters('user', ['getWishlist', 'User', 'wishlist']),
    isProductInWishlist() {
      if (this.wishlist) {
        return this.wishlist.some(item => item._id === this.product._id);
      } else {
        return false;
      }
    },
    author(){
      if (this.product && this.product.author && Array.isArray(this.product.author)) {
        return this.product.author.map(item => item.name).join(', ');
      }
      return '';
    
    }
  },
  methods: {
    ...mapActions('product', ['openProductModal', 'getcountproducts']),
    ...mapActions('user', ['addProductToCart', 'updatewishlist', 'fetchcurrentuser']),
    getAuthorNames() {
      if (this.product && this.product.author && Array.isArray(this.product.author)) {
        return this.product.author.map(item => item.name).join(', ');
      }
      return '';
    },
    
    getImageSrc(images) {
      if (Array.isArray(images)) {
        return images.length > 1 ? images[0] : images[0];
      }
      return images;
    },
    clearToast() {
      this.Toast.message = '';
    },
    shortname(name) {
      const maxLength = 20; // Số ký tự tối đa
      if (name.length <= maxLength) return name;
      return name.substring(0, maxLength) + '...';
    },
    async handleWishlistUpdate() {
      try {
        const productId = this.product._id;
        const response = await this.updatewishlist(productId);
        if (response) {
          await this.fetchcurrentuser();
          if (this.isProductInWishlist) {
            this.Toast = {
              message: 'Đã thêm vào danh sách yêu thích',
              position: 'bottom-center',
              backgroundcolor: 'success'
            };
          } else {
            this.Toast = {
              message: 'Đã xoá trong danh sách yêu thích',
              position: 'bottom-center',
              backgroundcolor: 'error'
            };
          }
        } else {
          this.Toast = {
            message: 'Bạn chưa đăng nhập',
            position: 'bottom-center',
            backgroundcolor: 'error'
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addToCart() {
      if (this.getcountproducts === '0') {
        this.Toast = {
          message: 'Vui lòng chọn số lượng sản phẩm',
          position: 'bottom-center',
          backgroundcolor: 'error'
        };
      } else {
        try {
          const cartData = {
            pid: this.product._id,
            quantity: this.getcountproducts,
            price: this.product.discount > 0 ? this.product.discountedPrice : this.product.price
          };
          await this.addProductToCart(cartData);
          this.Toast = {
            message: 'Thêm vào giỏ hàng thành công',
            position: 'bottom-center',
            backgroundcolor: 'success'
          };
          this.$router.push('/cart');
        } catch (error) {
          console.error('Failed to add product to cart', error);
          this.Toast = {
            message: 'Thêm vào giỏ hàng thất bại',
            position: 'bottom-center',
            backgroundcolor: 'error'
          };
        }
      }
    }
  }
};
</script>

<style scoped>

</style>


