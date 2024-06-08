<template>
  <div class="relative overflow-hidden">
    <button
      class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none z-10"
      @click="prev"
    >
      <i class="pi pi-arrow-circle-left text-xl"></i>
    </button>
    <div class="flex overflow-hidden">
      <transition-group class="flex w-full overflow-x-auto gap-3" name="slide">
        <Product
          v-for="(product, index) in visibleProducts"
          :key="product._id"
          :product="product"
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
      visibleCards: {
        mobile: 1,
        tablet: 3,
        desktop: 6
      },
      windowWidth: window.innerWidth
    }
  },
  computed: {
    ...mapGetters('product', ['getFeaturedProducts']),
    visibleProducts() {
      return this.getFeaturedProducts.slice(
        this.currentIndex,
        this.currentIndex + this.visibleCards[this.deviceType]
      );
    },
    deviceType() {
      if (this.windowWidth < 768) return 'mobile';
      else if (this.windowWidth < 1024) return 'tablet';
      else return 'desktop';
    }
  },
  mounted() {
    this.fetchFeaturedProducts();
    window.addEventListener('resize', this.updateVisibleCards);
  },
  destroyed() {
    window.removeEventListener('resize', this.updateVisibleCards);
  },
  methods: {
    ...mapActions('product', ['fetchFeaturedProducts']),
    next() {
      const maxIndex = this.getFeaturedProducts.length - this.visibleCards[this.deviceType];
      this.currentIndex = (this.currentIndex + 1) % (maxIndex + 1);
    },
    prev() {
      const maxIndex = this.getFeaturedProducts.length - this.visibleCards[this.deviceType];
      this.currentIndex = (this.currentIndex - 1 + maxIndex + 1) % (maxIndex + 1);
    },
    updateVisibleCards() {
      if (!this.timer) {
        this.timer = window.requestAnimationFrame(() => {
          this.windowWidth = window.innerWidth;
          this.timer = null;
        });
      }
    }
  }
};
</script>
