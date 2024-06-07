<template>
  <div class="flex flex-row">
    <!-- Mobile Menu Container -->
    <div v-if="isMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div class="bg-blue-600 w-2/3 min-h-screen p-5 relative overflow-y-auto border-b-4 border-white">
        <!-- Close Button -->
        <button class="absolute top-2 right-2 text-white text-2xl" @click="toggleMenu">
          &times;
        </button>
        <!-- Menu Content -->
        <div>
          <div class="flex items-center space-x-3 py-2">
            <img :src="User.avatar" class="rounded-full w-14 h-14" />
            <span class="text-xl font-bold text-white">{{ User.firstname }}</span>
          </div>
          <ul class="text-white mt-4 flex-grow">
            <router-link v-for="(link, index) in links" :key="index" :to="link.to"
              class="flex items-center py-3 px-4 hover:bg-purple-800 cursor-pointer transition-colors duration-200">
              <i :class="link.icon" class="text-xl mr-3"></i>
              {{ link.text }}
            </router-link>
          </ul>
          <!-- Logout Button -->
          <li class="border-t border-purple-800 flex items-center py-3 px-4 hover:bg-purple-800 cursor-pointer transition-colors duration-200"
              @click="handleLogout">
            <i class="pi pi-sign-out text-xl mr-3"></i>
            Log out
          </li>
        </div>
      </div>
    </div>

    <!-- SidebarAdmin -->
    <SidebarAdmin />

    <div class="w-full">
      <!-- Mobile Header -->
      <div class="bg-gray-700 md:hidden h-16 flex items-center justify-between px-4">
        <!-- Mobile Menu Toggle Button -->
        <button class="text-white text-2xl" @click="toggleMenu">
          <i :class="isMenuOpen ? 'pi pi-arrow-right' : 'pi pi-align-justify'"></i>
        </button>
      </div>

      <!-- Main Content -->
      <div>
        <!-- Slot Content -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from '../pages/sidebar/sideBar-Admin.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { SidebarAdmin },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    ...mapActions('user', {
      fetchcurrentuser: 'fetchcurrentuser',
      performLogout: 'logout'
    }),
    handleLogout() {
      this.performLogout().then(() => {
        this.$router.push({ name: 'Home-Page' });
      });
    },
  },
  computed: {
    ...mapGetters('user', ['User']),
    links() {
      return [
        { to: { name: 'Dashboard' }, text: 'Dashboard', icon: 'pi pi-chart-bar' },
        { to: { name: 'Products' }, text: 'Products', icon: 'pi pi-list' },
        { to: { name: 'Users' }, text: 'Users', icon: 'pi pi-users' },
        { to: { name: 'Orders' }, text: 'Orders', icon: 'pi pi-cart-plus' },
        { to: { name: 'Blog-Manager' }, text: 'Blogs', icon: 'pi pi-pencil ' },
      ];
    },
  },
};
</script>
