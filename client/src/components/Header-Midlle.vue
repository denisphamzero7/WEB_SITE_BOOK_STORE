<template>
  <div class="bg-red-50 hidden md:block">
    <div class="container mx-auto flex items-center justify-between gap-5">
      <div class="logo w-1/3">
        <router-link :to="{ name: 'Home-Page' }">
          <img src="../assets/logo.png" alt="" class="object-contain w-20 h-20" />
        </router-link>
      </div>
      <div class="flex w-2/3 ml-6 h-2rem">
        <input
          type="text"
          v-model="nameproduct"
          class="pl-2 outline-none w-full border-2 border-black-alpha-10 rounded-l-lg"
          placeholder="Tìm kiếm"
        />
        <button class="bg-blue-300 px-2 rounded-r-lg" @click="searchProduct">
          <i class="pi pi-search"></i>
        </button>
      </div>
      <div class="w-1/3 flex justify-end items-center gap-3">
        <div v-if="User" class="flex gap-3">
          <div>
            <router-link :to="{ name: 'cartproduct-page' }">
              <span class="pi pi-shopping-cart text-3xl text-blue-800">{{ cart.length }}</span>
            </router-link>
          </div>
          <div>
            <router-link :to="personalRoute" class="overflow-hidden rounded-full">
              <img :src="userAvatar" alt="Avatar" class="w-[40px] h-[40px] rounded-full transition duration-300 ease-in-out transform hover:scale-110">
            </router-link>
          </div>
        </div>
        <div v-else>đăng nhập</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import defaultAvatar from '../assets/avatardefault.jpg'

export default {
  data() {
    return {
      nameproduct: null
    }
  },
  created() {
    this.fetchcurrentuser()
  },
  computed: {
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
    ...mapActions('product', ['searchname']),
    ...mapActions('user', ['fetchcurrentuser']),
    async searchProduct() {
      try {
        await this.searchname(this.nameproduct)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* Add any custom styles here */
</style>
