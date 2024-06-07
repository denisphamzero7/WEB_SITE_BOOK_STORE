<template>
  <div class="flex flex-row">
    <!-- Mobile Menu Container -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <!-- Mobile Menu Content -->
      <!-- Your mobile menu content here -->
    </div>

    <!-- SidebarAdmin -->
    <SidebarAdmin />

    <div class="w-full">
      <!-- Mobile Header -->
      <div class="bg-gray-700 md:hidden h-16 flex items-center justify-between px-4">
        <!-- Mobile Menu Toggle Button -->
        <button class="text-white text-2xl" @click="toggleMobileMenu">
          <i :class="isMobileMenuOpen ? 'pi pi-arrow-right' : 'pi pi-align-justify'"></i>
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
      isMobileMenuOpen: false,
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    handleResize() {
      // Check if the window width is greater than or equal to the desktop breakpoint (e.g., 768px)
      const isDesktop = window.innerWidth >= 768;
      // Close the mobile menu if the window is in desktop mode
      if (isDesktop) {
        this.isMobileMenuOpen = false;
      }
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
    // Your links computed property here
  },
};
</script>
