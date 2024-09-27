<template>
  <div class="w-full container mx-auto">
    <header class="flex justify-start border-b border-black py-4">
      <h2 class="text-2xl font-semibold">Wish List</h2>
    </header>
    <div class="py-3 flex  flex-wrap gap-2" v-if="wishlist">
      <Product v-for="product in wishlist" :key="product._id" :product="product" />
    </div>
    <div v-else>wishlist not found</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Product from '../components/Product.vue';

export default {
  components: { Product },
  computed: {
    ...mapGetters('user', ['User','wishlist' ]),
   
  },
  methods: {
    // ...mapActions('user', ['fetchcurrentuser']),
  },
 
};
</script>

<style scoped>
/* Thêm kiểu dạng nếu cần thiết */
</style>
