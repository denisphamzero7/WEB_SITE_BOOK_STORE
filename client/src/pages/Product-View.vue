<template>
  <div class="container mx-auto">
    <header>sản phẩm</header>
    <div class="my-4">
      <label for="sort" class="mr-2">Sắp xếp theo:</label>
      <select id="sort" name="sort" class="border border-gray-300 rounded-md px-2 py-1" @change="sortProducts">
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </div>

    <div class="bg-blue-300 w-full min-h-screen gap-5  flex-wrap flex justify-center items-center overflow-hidden">
      <Product class="mt-2" v-for="product in sortedProducts" :key="product._id" :product="product" />
    </div>
  </div>
</template>

<script>
import Product from '../components/Product.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { Product },
  data() {
    return {
      sortOptions: [
        { value: 'relevance', label: 'Relevance' },
        { value: 'price-low-to-high', label: 'Price Low to High' },
        { value: 'price-high-to-low', label: 'Price High to Low' },
      ],
      selectedSortOption: 'relevance',
    }
  },
  created() {
    this.fetchProduct()
    
  },
  computed: {
   ...mapGetters('product', ['getProducts']),
    sortedProducts() {
      return this.sortProductsBy(this.getProducts, this.selectedSortOption)
    },
  },
  methods: {
   ...mapActions('product', ['fetchProduct','fetchProductbycategory']),
    sortProducts(event) {
      this.selectedSortOption = event.target.value
    },
    sortProductsBy(getProducts, sortBy) {
      switch (sortBy) {     
        case 'relevance':
          return getProducts
        case 'price-low-to-high':
          return getProducts.sort((a, b) => a.price - b.price)
        case 'price-high-to-low':
          return getProducts.sort((a, b) => b.price - a.price)
        default:
          return getProducts
      }
    },
  },
}
</script>

<style lang="css" scoped></style>