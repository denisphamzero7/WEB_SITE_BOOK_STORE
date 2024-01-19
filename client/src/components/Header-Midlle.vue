<template>
  <div class="bg-red-50">
    <div class="md:container flex items-center justify-between">
      <div class="logo">
       <router-link :to="{name:'Home-Page'}">
        <img
          src="../assets/logo.png"
          alt=""
          class="object-contain w-[100px] h-[100px]"
        />
       </router-link>
      </div>
      <div>
        <SearchInfor class="w-full" />
      </div>
      <div>
      <span>giỏ hàng</span></div>
     <div v-if="isAuthenticated" class="flex justify-center gap-3">
     <router-link :to="{name:'User-Page'}"> <div>người dùng</div></router-link>
    </div>
    <div v-if="!isAuthenticated" class="flex justify-center gap-3">
     <router-link :to="{name:'User-Page'}"> <div>người dùng</div></router-link>
    </div>
    
     </div>
  </div>
</template>

<script>
import SearchInfor from "./Search-Infor.vue";
import { mapGetters,mapActions } from "vuex";
export default {
  components: { SearchInfor },
  setup() {
    return {};
  },
 
  
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'User']),
  },
};
</script>

<style lang="scss" scoped></style>
