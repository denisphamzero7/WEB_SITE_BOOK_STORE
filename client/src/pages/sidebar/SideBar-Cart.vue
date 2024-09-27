<template>
  <div class="flex flex-col w-64 bg-gradient-to-b from-purple-700 to-blue-500 h-[150vh]">
    <div class="bg-purple-900 h-15 flex items-center justify-center">
      <div class="overflow-hidden py-2">
        <img :src="User?.avatar || defaultAvatar" class="rounded-full w-[40px] h-[40px]" />
        <span class="text-xl font-bold text-white">{{ User.firstname }}</span>
      </div>
    </div>
    <ul class="text-white mt-4">
      <router-link v-for="(link, index) in links" :key="index" :to="link.to" class="flex items-center py-2 px-4 hover:bg-purple-800 cursor-pointer">
        <i :class="link.icon" class="text-xl mr-2"></i> {{ link.text }}
      </router-link>
      <li class="flex items-center py-2 px-4 hover:bg-purple-800 cursor-pointer" @click="handlelogout">
        <i class="pi pi-sign-out text-xl mr-2"></i> Logout
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import defaultAvatar from '../../assets/avatardefault.jpg'

export default {
  created() {
    this.fetchcurrentuser();
  },
  computed: {
    ...mapGetters('user', ['User']),
    links() {
      return [
        { to: { name: 'personal' }, text: 'Personal', icon: 'pi pi-user' },
        { to: { name: 'mycart' }, text: 'My Cart', icon: 'pi pi-cart-plus' },
        { to: { name: 'history' }, text: 'Buy history', icon: 'pi pi-clock' },
        { to: { name: 'wisllist' }, text: 'Wishlist', icon: 'pi pi-list' },
        { to: { name: 'Home-Page' }, text: 'Go to Home Page', icon: 'pi pi-undo' },
      ];
    },
  },
  methods: {
    ...mapActions('user', ['fetchcurrentuser', 'logout']),
    async handlelogout() {
      await this.logout();
      this.$router.push({ name: 'Login-Page' }); // Redirect to login page or home page after logout
    },
  },
  data() {
    return {
      defaultAvatar, // Make defaultAvatar available in the template
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
