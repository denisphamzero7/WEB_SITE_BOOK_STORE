<template>
  <div class="bg-blue-600">
    <div class="container mx-auto flex items-center text-white py-4 justify-between">
      <!-- Logo Section -->
      <div class="flex-shrink-0 md:hidden">
        <router-link :to="{ name: 'Home-Page' }">
          <img src="../assets/logo.png" class="w-24" alt="Logo" />
        </router-link>
      </div>

      <!-- Dropdown Section - Only for Desktop -->
      <div class="relative hidden md:flex items-center gap-2 cursor-pointer font-semibold" @click="toggleDropdown">
        <div class="flex items-center gap-1">
          <i class="pi pi-align-justify"></i>
          <h1 class="font-semibold text-lg m-0">Danh mục sản phẩm</h1>
        </div>
        <!-- Dropdown Menu -->
        <div v-if="dropdownOpen" class="absolute top-12 left-0 bg-white text-black rounded-lg shadow-lg z-10 w-100 mt-2">
          <ul class="py-2">
            <li v-for="category in allCategory" :key="category._id" class="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2" @click="selectCategory(category._id)">
              <i class="pi pi-tag"></i>
              <span>{{ category.title }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex gap-6 font-semibold">
        <router-link class="hover:text-gray-200" :class="linkClass" :to="{ name: 'Home-Page' }">Trang chủ</router-link>
        <router-link class="hover:text-gray-200" :class="linkClass" :to="{ name: 'products-Page' }">Sản phẩm</router-link>
        <router-link class="hover:text-gray-200" :class="linkClass" :to="{ name: 'Helps-page' }">Hỗ trợ khách hàng</router-link>
        <router-link class="hover:text-gray-200" :class="linkClass" :to="{ name: 'news-page' }">Tin tức</router-link>
      </div>

      <!-- Hotline Section -->
      <div class="hidden md:flex items-center text-center gap-2 justify-center">
        <h1 class="font-semibold m-0">Đường dây nóng</h1>
        <span class="text-xl text-red-500">1800-123-456</span>
      </div>

      <!-- Cart and Avatar Section -->
      <div class="flex items-center gap-3 ml-auto md:hidden mr-3" v-if="windowWidth < 768">
        <div v-if="User" class="flex gap-3 items-center">
          <div>
            <router-link :to="{ name: 'cartproduct-page' }">
              <span class="pi pi-shopping-cart text-3xl text-white">{{ cart.length }}</span>
            </router-link>
          </div>
          <div>
            <router-link :to="personalRoute" class="overflow-hidden rounded-full">
              <img :src="userAvatar" alt="Avatar" class="w-14 h-14 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110">
            </router-link>
          </div>
        </div>
        <div v-else class="flex items-center gap-3">
          <div>
            <router-link :to="{ name: 'Login-Page' }" class="text-white pi pi-user text-xl"></router-link>
          </div>
          <div>
            <router-link :to="{ name: 'cartproduct-page' }">
              <span class="pi pi-shopping-cart text-2xl text-white">{{ cart.length }}</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Responsive Toggle Button -->
      <div class="relative flex items-center gap-2 cursor-pointer font-semibold md:hidden" @click="toggleHeader">
        <i class="pi pi-list text-3xl"></i>
      </div>

      <!-- Mobile Menu -->
      <div v-if="headerOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div class="bg-blue-600 w-2/3 min-h-screen p-5 relative overflow-y-auto">
          <!-- Close Button -->
          <button class="absolute top-2 right-2 text-white text-2xl" @click="toggleHeader">
            &times;
          </button>

          <!-- Logo -->
          <div class="flex justify-center my-4">
            <router-link :to="{ name: 'Home-Page' }">
              <img src="../assets/logo.png" class="w-24" alt="Logo" />
            </router-link>
          </div>

          <!-- Search Input -->
          <div class="flex justify-center my-4">
            <input type="text" v-model="searchQuery" @keyup.enter="searchProducts" placeholder="Tìm kiếm..." class="w-full px-4 py-2 rounded-lg border-2 border-gray-300 text-black">
          </div>

          <!-- Mobile Navigation Links -->
          <div class="flex flex-col gap-3 font-semibold">
            <router-link class="hover:text-gray-200" :class="linkClass" :to="{ name: 'Home-Page' }">Trang chủ</router-link>
            <router-link class="hover:text-gray-200" :class="linkClass" :to="{ name: 'products-Page' }">Sản phẩm</router-link>
            <router-link class="hover:text-gray-200" :class="linkClass" :to="{ name: 'Helps-page' }">Hỗ trợ khách hàng</router-link>
            <router-link class="hover:text-gray-200" :class="linkClass" :to="{ name: 'news-page' }">Tin tức</router-link>
          </div>

          <!-- Đăng nhập và Đăng ký -->
          <div class="flex flex-col gap-3 font-semibold mt-3">
            <router-link class="hover:text-gray-200" :class="linkClass" :to="{ name: 'Login-Page' }">Đăng nhập</router-link>
            <router-link class="hover:text-gray-200" :class="linkClass" :to="{ name: 'signup-Page' }">Đăng ký</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import defaultAvatar from '../assets/avatardefault.jpg'

export default {
  data() {
    return {
      dropdownOpen: false,
      headerOpen: false,
      mobileDropdownOpen: false,
      windowWidth: window.innerWidth,
      searchQuery: ''
    }
  },
  mounted() {
    this.fetchCategory()
    window.addEventListener('resize', this.handleResize)
    this.fetchcurrentuser()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapGetters('category', ['allCategory']),
    ...mapGetters('user', ['User', 'cart']),
    ...mapGetters('product', ['getproductbysearch']),
    personalRoute() {
      if (this.User.role === "admin") {
        return { name: 'Dashboard' }
      } else if (this.User.role === "user") {
        return { name: 'personal' }
      } else {
        return { name: 'Home-Page' }
      }
    },
    userAvatar() {
      return this.User?.avatar || defaultAvatar
    },
    linkClass() {
      return "text-sm md:text-base lg:text-lg"
    }
  },
  methods: {
    ...mapActions('product', ['fetchProductByCategory', 'searchname']),
    ...mapActions('user', ['fetchcurrentuser']),
    ...mapActions('category', ['fetchCategory']),
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    toggleHeader() {
      this.headerOpen = !this.headerOpen
    },
    toggleMobileDropdown() {
      this.mobileDropdownOpen = !this.mobileDropdownOpen
    },
    async selectCategory(categoryId) {
      try {
        await this.fetchProductByCategory(categoryId)
        this.$router.push({ name: 'products-Page', query: { category: categoryId } })
        this.dropdownOpen = false
        this.mobileDropdownOpen = false
        this.headerOpen = false
      } catch (error) {
        console.log(error)
      }
    },
    async searchProducts() {
      try {
        await this.searchname(this.searchQuery)
        this.$router.push({ name: 'products-Page', query: { search: this.searchQuery } })
        this.headerOpen = false
      } catch (error) {
        console.log(error)
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth >= 768) {
        this.headerOpen = false
        this.mobileDropdownOpen = false
      }
    }
  }
}
</script>
