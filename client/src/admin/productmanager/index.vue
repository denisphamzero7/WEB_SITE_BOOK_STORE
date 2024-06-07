<template>
  <div class="p-6 bg-gray-700 min-h-screen">

  
    <!-- Header -->
    <h1 class="flex items-center font-medium text-3xl text-white mb-6">
      <li class="rounded-full bg-[#0f172ab3] p-3 text-xl text-white pi pi-box mr-3"></li>
      {{ header }}
    </h1>

    <!-- Add Product Button -->
    <div class="flex justify-end mb-4">
      <router-link :to="{ name: 'create-product' }">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add Product
        </button>
      </router-link>
    </div>

    <!-- Product Table -->
    <div class="bg-[#0f172ab3] p-4 rounded-lg shadow-lg overflow-x-auto">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name..."
        class="p-2 w-full mb-4 bg-gray-800 text-white rounded placeholder-gray-500 focus:outline-none focus:bg-gray-900"
      />

      <table class="w-full text-white">
        <thead>
          <tr class="bg-gray-800">
            <th class="py-3 px-4">Name</th>
            <th class="py-3 px-4">Image</th>
            <th class="py-3 px-4 hidden md:table-cell">Category</th>
            <th class="py-3 px-4 hidden md:table-cell">Author</th>
            <th class="py-3 px-4 hidden md:table-cell">Description</th>
            <th class="py-3 px-4 hidden md:table-cell">Publisher</th>
            <th class="py-3 px-4 hidden md:table-cell">Quantity</th>
            <th class="py-3 px-4">Price</th>
            <th class="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in paginatedProduct"
            :key="product._id"
            class="odd:bg-gray-700 even:bg-gray-800 hover:bg-gray-600"
          >
            <td class="py-3 px-4">{{ shortText(product.name || 'No name available', 30) }}</td>
            <td class="py-3 px-4">
              <img
                :src="product.images[0] || 'default-image-url.jpg'"
                alt="Product Image"
                class="w-16 h-16 object-cover rounded-lg"
              />
            </td>
            <td class="py-3 px-4 hidden md:table-cell">{{ product.category?.title || 'N/A' }}</td>
            <td class="py-3 px-4 hidden md:table-cell">{{ product.author?.name || 'N/A' }}</td>
            <td class="py-3 px-4 hidden md:table-cell">{{ product.description || 'N/A' }}</td>
            <td class="py-3 px-4 hidden md:table-cell">{{ product.publisher?.title || 'N/A' }}</td>
            <td class="py-3 px-4 hidden md:table-cell">{{ product.quantity || 'N/A' }}</td>
            <td class="py-3 px-4">{{ product.price || 0 }}$</td>
            <td class="py-3 px-4">
              <button @click="editProduct(product)" class="text-blue-400 hover:text-blue-600">
                Edit
              </button>
              <button
                @click="handleDeleteProduct(product._id)"
                class="text-red-500 hover:text-red-700 ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center mt-4">
      <Pagination
        :totalItems="totalProduct"
        :itemsPerPage="itemsPerPage"
        :currentPage="currentPage"
        @page-changed="handlePageChange"
      />
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import Pagination from '../../components/Pagination.vue'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      header: 'Products Manager',
      currentPage: 1,
      itemsPerPage: 4,
      searchQuery: '',
  
    }

  },
  mounted() {
    this.fetchProduct()
  },
  computed: {
    ...mapGetters('product', ['getProducts']),
    filteredProducts() {
      if (!this.searchQuery) {
        return this.getProducts
      }
      return this.getProducts.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    totalProduct() {
      return this.filteredProducts.length
    },
    paginatedProduct() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredProducts.slice(start, end)
    }
  },
  methods: {
    ...mapActions('product', ['fetchProduct', 'deleteProduct']),
    togglemenu(){
      this.menu=!this.menu;
    },
    shortText(text, maxLength) {
      return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
    },
    formatBookCategories(categories) {
      if (Array.isArray(categories)) {
        return categories.join(', ')
      }
      return 'N/A'
    },
    editProduct(product) {
      this.$router.push({ name: 'Edit-product', params: { id: product._id } })
    },
    async handleDeleteProduct(productId) {
      try {
        await this.deleteProduct(productId)
        this.fetchProduct()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    },
    handlePageChange(page) {
      this.currentPage = page
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1
    }
  }
}
</script>

<style lang="scss" scoped>
/* Add any additional scoped styles here */
</style>
