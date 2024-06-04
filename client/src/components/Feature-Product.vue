<template>
  <div class="carousel-container overflow-hidden">
    <div class="carousel" :style="{ transform: 'translateX(' + step + 'px)', width: width + 'px' }">
      <div class="inner">
        <Product v-for="product in getFeaturedProducts" :key="product._id" :product="product" :style="{ width: cardWidth + 'px' }"/>
      </div>
    </div>
    <button class="rounded-full ml-3" @click="prev" :disabled="currentIndex === 0">
      <li class="pi pi-arrow-circle-left text-xl"></li>
    </button>
    <button class="rounded-full mr-3" @click="next" :disabled="currentIndex === Math.ceil(getFeaturedProducts.length / visibleCards) - 1">
      <li class="pi pi-arrow-circle-right text-xl"></li>
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
      step: 0,
      cardWidth: 200,
      currentIndex: 0,
      timer: null,
      visibleCards: 3
    }
  },
  computed: {
    ...mapGetters('product', ['getFeaturedProducts']),
    width() {
      return this.getFeaturedProducts.length * this.cardWidth
    }
  },
  mounted() {
    this.startAutoSlide()
    this.fetchFeaturedProducts()
  },
  methods: {
    ...mapActions('product', ['fetchFeaturedProducts']),
    setStep() {
      this.step = -this.currentIndex * this.cardWidth;
    },
    next() {
      if (this.currentIndex < Math.ceil(this.getFeaturedProducts.length / this.visibleCards) - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Reset to the start if at the end
      }
      this.setStep();
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = Math.ceil(this.getFeaturedProducts.length / this.visibleCards) - 1; // Go to the last slide if at the start
      }
      this.setStep();
    },
    startAutoSlide() {
      this.timer = setInterval(() => {
        this.next()
      }, 5000)
    },
    stopAutoSlide() {
      clearInterval(this.timer)
    }
  },
  beforeDestroy() {
    this.stopAutoSlide()
  }
}
</script>

<style scoped>
.carousel-container {
  position: relative;
}

.carousel, .inner {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel {
  overflow: hidden;
}

.card {
  overflow: hidden;
  justify-content: center;
  white-space: normal;
  width: 200px;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
}

button:focus {
  outline: none;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:first-child {
  left: 0;
}

button:last-child {
  right: 0;
}

@media (max-width: 768px) {
  .card {
    width: 150px; /* Adjust the card width for smaller screens */
  }
}
</style>
