<template>
  <div :class="{ 'w-16': collapsed, 'w-64': !collapsed }" class="sidebar bg-gradient-to-b from-purple-700 to-blue-500 min-h-screen relative overflow-x-hidden">
    <!-- Your sidebar content here -->
    <div class="bg-blue-900 h-20 flex items-center justify-center" v-if="!collapsed">
      <div class="flex items-center space-x-3 py-2">
        <img :src="User.avatar" class="rounded-full w-14 h-14" />
        <span class="text-xl font-bold text-white">{{ User.firstname }}</span>
      </div>
    </div>
    <ul class="text-white mt-4 flex-grow">
      <router-link
        v-for="(link, index) in links"
        :key="index"
        :to="link.to"
        class="flex items-center py-3 px-4 hover:bg-purple-800 cursor-pointer transition-colors duration-200"
      >
        <i :class="link.icon" class="text-xl mr-3"></i>
        {{ link.text }}
      </router-link>
    </ul>
    <div>
      <li
        class="border-t border-purple-800 flex items-center py-3 px-4 hover:bg-purple-800 cursor-pointer transition-colors duration-200"
        @click="handleLogout"
      >
        <i class="pi pi-sign-out text-xl mr-3"></i>
        Log out
      </li>
    </div>
    
    <!-- Toggle Button -->
    <button class="absolute top-0 right-0 p-3 cursor-pointer transition-all duration-300" @click="toggleSidebar">
      <i v-if="collapsed" class="pi pi-align-justify text-white text-xl"></i>
      <i v-else class="pi pi-arrow-right text-white text-xl"></i>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  created() {
    this.fetchcurrentuser();
  },
  data() {
    return {
      collapsed: false,
      showUserInfo: true // Thêm biến để điều khiển hiển thị avatar và tên người dùng
    };
  },
  computed: {
    ...mapGetters('user', ['User']),
    links() {
      return [
        { to: { name: 'Dashboard' }, text: 'Dashboard', icon: 'pi pi-chart-bar' },
        { to: { name: 'Products' }, text: 'Products', icon: 'pi pi-list' },
        { to: { name: 'Users' }, text: 'Users', icon: 'pi pi-users' },
        { to: { name: 'Orders' }, text: 'Orders', icon: 'pi pi-cart-plus' },
        { to: { name: 'news-Manager' }, text: 'news', icon: 'pi pi-pencil ' },

      ];
    },
  },
  methods: {
    ...mapActions('user', {
      fetchcurrentuser: 'fetchcurrentuser',
      performLogout: 'logout'
    }),
    handleLogout() {
      this.performLogout().then(() => {
        this.$router.push({ name: 'Home-Page' });
      });
    },
    toggleSidebar() {
      this.collapsed = !this.collapsed;
      this.showUserInfo = !this.collapsed; // Ẩn avatar và tên người dùng khi sidebar được thu gọn
    },
  },
};
</script>

<style scoped>
/* Your Tailwind CSS styles here */
</style>
