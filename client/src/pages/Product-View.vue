<template>
  <div class="container mx-auto">
  
    <div class="my-4">
      <label for="sort" class="mr-2">Sắp xếp theo:</label>
      <select id="sort" name="sort" class="border border-gray-300 rounded-md px-2 py-1" @change="sortProducts">
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </div>

    <div class="bg-blue-300 w-full min-h-screen gap-5  flex-wrap flex justify-center items-center overflow-hidden px-10 py-5">
      <Product class="mt-2" v-for="product in paginatedProduct" :key="product._id" :product="product" />
    </div>
    <div>
      <Pagination   :totalItems="sortedProducts.length" :itemsPerPage="itemsPerPage" :currentPage="currentPage" @page-changed="changePage" class=" my-5"/>
    </div>
  </div>
</template>

<script>
import Product from '../components/Product.vue'
import { mapActions, mapGetters } from 'vuex'
import Pagination from '../components/Pagination.vue';
export default {
  components: { Product ,Pagination},
  data() {
    return {
      sortOptions: [
        { value: 'relevance', label: 'Relevance' },
        { value: 'price-low-to-high', label: 'Price Low to High' },
        { value: 'price-high-to-low', label: 'Price High to Low' },
      ],
      selectedSortOption: 'relevance',
      currentPage: 1,
      itemsPerPage: 10,
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
    paginatedProduct() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.sortedProducts.slice(start, end)
    }
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
    changePage(page){
      this.currentPage = page;
    }

  },
}
</script>

<style lang="css" scoped></style>