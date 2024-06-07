<template>
  <div class="bg-blue-600">
    <div class="container mx-auto flex items-center text-white py-3 justify-between">
      <!-- Dropdown Section -->
      <div class="md:hidden">
        <router-link :to="{ name: 'Home-Page' }">
          <img src="../assets/logo.png" class="w-24" alt="Logo" />
        </router-link>
      </div>
      <div class="relative flex items-center gap-2 cursor-pointer font-semibold" @click="toggleDropdown">
        <li class="pi pi-align-justify flex  items-center"></li>
        <h1 class="hidden md:block text-base md:text-lg lg:text-xl">Danh mục sản phẩm</h1>
        <!-- Dropdown Menu -->
        <div v-if="dropdownOpen" class="absolute top-10 left-0 bg-white text-black rounded-lg shadow-lg z-10 w-48 mt-2">
          <ul class="py-2">
            <li v-for="category in allCategory" :key="category._id" class="px-4 py-2 hover:bg-gray-200 cursor-pointer" @click="selectCategory(category._id)">
              {{ category.title }}
            </li>
          </ul>
        </div>
      </div>
      <!-- Navigation Links -->
      <div class="hidden md:flex gap-6 font-semibold">
        <router-link class="hover:text-gray-200 text-sm md:text-base lg:text-lg" :to="{ name: 'Home-Page' }">Trang chủ</router-link>
        <router-link class="hover:text-gray-200 text-sm md:text-base lg:text-lg" :to="{ name: 'products-Page' }">Sản phẩm</router-link>
        <router-link class="hover:text-gray-200 text-sm md:text-base lg:text-lg" :to="{ name: 'Helps-page' }">Hỗ trợ khách hàng</router-link>
        <router-link class="hover:text-gray-200 text-sm md:text-base lg:text-lg" :to="{ name: 'news-page' }">Tin tức</router-link>
      </div>
      <!-- Hotline Section -->
      <div class="hidden md:flex items-center gap-2">
        <h1 class="font-semibold hidden md:block text-sm md:text-base lg:text-lg">Đường dây nóng</h1>
        <span class="text-lg hidden md:block">0337335747</span>
      </div>
      <!-- Cart and Avatar Section -->
      <div class="md:hidden flex justify-end items-center gap-3 ml-auto pr-5">
        <div v-if="User" class="flex gap-3">
          <div>
            <router-link :to="{ name: 'cartproduct-page' }">
              <span class="pi pi-shopping-cart text-2xl text-white">{{ cart.length }}</span>
            </router-link>
          </div>
          <div>
            <router-link :to="personalRoute" class="overflow-hidden rounded-full">
              <img :src="userAvatar" alt="Avatar" class="w-[40px] h-[40px] rounded-full transition duration-300 ease-in-out transform hover:scale-110">
            </router-link>
          </div>
        </div>
        <div v-else class="flex items-center gap-3">
          <div>
            <router-link :to="{ name: 'Login-Page' }" class="text-white pi pi-user"></router-link>
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
        <i class="pi pi-list text-2xl"></i>
      </div>
      <!-- Mobile Menu -->
      <div v-if="headerOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div class="bg-blue-600 w-2/3 min-h-screen p-5 relative overflow-y-auto border-b-4 border-white">
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
          <!-- Dropdown Section -->
          <div class="relative flex items-center gap-2 cursor-pointer font-semibold mt-6 mb-3" @click="toggleMobileDropdown">
            <i :class="mobileDropdownOpen ? 'pi pi-angle-up' : 'pi pi-angle-down'"></i>
            <h1>Danh mục sản phẩm</h1>
            <!-- Mobile Dropdown Menu -->
            <div v-if="mobileDropdownOpen" class="absolute top-12 left-0 bg-white text-black rounded-lg shadow-lg z-10 w-full mt-2">
              <ul class="py-2">
                <li v-for="category in allCategory" :key="category._id" class="px-4 py-2 hover:bg-gray-200 cursor-pointer" @click="selectCategory(category._id)">
                  {{ category.title }}
                </li>
              </ul>
            </div>
          </div>
          <!-- Navigation Links -->
          <div class="flex flex-col gap-3 font-semibold">
            <router-link class="hover:text-gray-200 text-sm md:text-base lg:text-lg" :to="{ name: 'Home-Page' }">Trang chủ</router-link>
            <router-link class="hover:text-gray-200 text-sm md:text-base lg:text-lg" :to="{ name: 'products-Page' }">Sản phẩm</router-link>
            <router-link class="hover:text-gray-200 text-sm md:text-base lg:text-lg" :to="{ name: 'Helps-page' }">Hỗ trợ khách hàng</router-link>
            <router-link class="hover:text-gray-200 text-sm md:text-base lg:text-lg" :to="{ name: 'news-page' }">Tin tức</router-link>
          </div>
          <!-- Đăng nhập và Đăng ký -->
          <div class="flex flex-col gap-3 font-semibold mt-3">
            <router-link class="hover:text-gray-200 text-sm md:text-base lg:text-lg" :to="{ name: 'Login-Page' }">Đăng nhập</router-link>
            <router-link class="hover:text-gray-200 text-sm md:text-base lg:text-lg" :to="{ name: 'signup-Page' }">Đăng ký</router-link>
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

<style>
/* Add any custom styles here */
</style>
