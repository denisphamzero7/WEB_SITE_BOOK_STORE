<template>
  <div class="flex justify-between bg-[#f2f3f8] py-2">
    <div class="md:container flex items-center justify-between">
      <div class="text-xs font-semibold flex gap-2">
        <span class="pi pi-phone text-xs">0337335747</span>
        <span>|</span>
        <span>Theo dõi đơn hàng</span>
      </div>
      <div class="text-xs font-semibold flex gap-2" v-if="!isAuthenticated">
        <router-link :to="{ name: 'Login-Page' }"><span class="cursor-pointer">Đăng nhập</span></router-link>
        <span>/</span>
        <RouterLink :to="{ name: 'signup-Page' }"><span class="cursor-pointer">Đăng ký</span> </RouterLink>
      </div>
      <div v-else class="text-xs font-semibold flex gap-3 items-center">
        <span>{{User && User.firstname ? User.firstname : 'Guest'}}</span>
        <button class="flex items-center w-full gap-1 border-2  p-1" @click="logout">
          <span class="pi pi-sign-out"></span>
          <h1> log out</h1>
         </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
  data() {
    return {
      
    };
  },
  

  computed: {
    ...mapGetters('user', ['isAuthenticated', 'User']),
  },
  methods: {
    ...mapActions('user', ['logout']),
   
  },
};
</script>

<style lang="scss" scoped></style>
