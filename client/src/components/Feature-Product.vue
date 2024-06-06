<template>
  <div class="relative overflow-hidden">
    <button
      class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none z-10"
      @click="prev"
    >
      <i class="pi pi-arrow-circle-left text-xl"></i>
    </button>
    <div class="flex overflow-hidden">
      <transition-group v-bind="groupAttrs" class="flex w-full">
        <Product
          v-for="(product, index) in getVisibleProducts"
          :key="product._id"
          :product="product"
          class="flex-shrink-0 transition-transform duration-500 ease-in-out"
          :class="productClass"
        />
      </transition-group>
    </div>
    <button
      class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none z-10"
      @click="next"
    >
      <i class="pi pi-arrow-circle-right text-xl"></i>
    </button>
  </div>
</template>

<script>
import Product from '../components/Product.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { Product },
  data() {
    return {
      currentIndex: 0,
      visibleCards: 6,
      timer: null,
      windowWidth: window.innerWidth
    }
  },
  computed: {
    ...mapGetters('product', ['getFeaturedProducts']),
    getVisibleProducts() {
      return this.getFeaturedProducts.slice(this.currentIndex, this.currentIndex + this.visibleCards);
    },
    productClass() {
      if (this.windowWidth >= 1024) {
        return 'w-1/6'; // 6 products
      } else if (this.windowWidth >= 768) {
        return 'w-1/4'; // 4 products
      } else {
        return 'w-full'; // 1 product
      }
    },
    groupAttrs() {
      return {
        name: 'slide-fade',
        tag: 'div', // Ensure a single root element
        class: 'flex w-full'
      }
    }
  },
  mounted() {
    this.fetchFeaturedProducts();
    this.startAutoSlide();
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // Set initial visibleCards based on window width
  },
  methods: {
    ...mapActions('product', ['fetchFeaturedProducts']),
    next() {
      if (this.currentIndex < this.getFeaturedProducts.length - this.visibleCards) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Reset to the start if at the end
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.getFeaturedProducts.length - this.visibleCards; // Go to the last slide if at the start
      }
    },
    startAutoSlide() {
      this.timer = setInterval(() => {
        this.next()
      }, 5000)
    },
    stopAutoSlide() {
      clearInterval(this.timer)
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 1024) {
        this.visibleCards = 6;
      } else if (this.windowWidth >= 768) {
        this.visibleCards = 4;
      } else {
        this.visibleCards = 1;
      }
    }
  },
  beforeDestroy() {
    this.stopAutoSlide();
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style>
/* Tailwind CSS classes are used instead of scoped styles */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
}
</style>
