<template>
  <div class="bg-blue-600">
    <div class="container mx-auto flex items-center text-white py-3 justify-between">
      <!-- Dropdown Section -->
      <div 
        class="relative flex items-center gap-2 cursor-pointer font-semibold"
        @click="toggleDropdown"
      >
        <i class="pi pi-list"></i>
        <h1 class="hidden md:block">Danh mục sản phẩm</h1>
        <i class="pi pi-chevron-down"></i>
        <!-- Dropdown Menu -->
        <div 
          v-if="dropdownOpen"
          class="absolute top-10 left-0 bg-white text-black rounded-lg shadow-lg z-10 w-48 mt-2"
        >
          <ul class="py-2">
            <li 
              v-for="category in allCategory"
              :key="category._id"
              class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              @click="selectCategory(category._id)"
            >
              {{ category.title }}
            </li>
          </ul>
        </div>
      </div>
      <!-- Navigation Links -->
      <div class="hidden md:flex gap-6 font-semibold">
        <router-link class="hover:text-gray-200" :to="{ name: 'Home-Page' }">Trang chủ</router-link>
        <router-link class="hover:text-gray-200" :to="{ name: 'products-Page' }">Sản phẩm</router-link>
          <router-link class="hover:text-gray-200" :to="{ name: 'Helps-page' }">Hỗ trợ khách hàng</router-link>
        <router-link class="hover:text-gray-200" :to="{ name: 'news-page' }">Tin tức</router-link>
      </div>
      <!-- Hotline Section -->
      <div class="flex items-center gap-2">
        <h1 class="font-semibold hidden md:block">Đường dây nóng</h1>
        <span class="text-lg">0337335747</span>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      dropdownOpen: false,
    };
  },
  mounted() {
    this.fetchCategory();
  },
  computed: {
    
    ...mapGetters('category', ['allCategory'])
  },
  methods: {
    ...mapActions('product', ['fetchProductByCategory']),
    ...mapActions('category', ['fetchCategory']),
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    async selectCategory(categoryId) {  
   try {
    await this.fetchProductByCategory(categoryId)
    this.$router.push({ name: 'products-Page', query: { category: categoryId } });
      this.dropdownOpen = false;
   } catch (error) {
    console.log(error);
   }
    }
  },
};
</script>
