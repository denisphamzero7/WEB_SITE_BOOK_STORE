<template>
  <div class=" justify-between bg-gray-200 py-2 hidden md:block">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <div class="text-xs font-semibold flex gap-2 mb-2 md:mb-0 md:mr-4">
        <span class="text-xs">0337335747</span>
        <span>|</span>
        <span>Theo dõi đơn hàng</span>
      </div>
      <div class="text-xs font-semibold flex gap-2" v-if="!isAuthenticated">
        <router-link :to="{ name: 'Login-Page' }" class="cursor-pointer">Đăng nhập</router-link>
        <span>/</span>
        <router-link :to="{ name: 'signup-Page' }" class="cursor-pointer">Đăng ký</router-link>
      </div>
      <div v-else class="text-xs font-semibold flex gap-3 items-center">
        <span>{{ User && User.firstname ? User.firstname : 'Guest' }}</span>
        <button class="flex items-center gap-1 border-2 p-1 border-gray-400" @click="logout">
          <span class="pi pi-sign-out"></span>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'User']),
  },
  methods: {
    ...mapActions('user', ['logout']),
  },
};
</script>
