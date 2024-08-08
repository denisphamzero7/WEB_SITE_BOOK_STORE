<template>
  <div class="container mx-auto py-6 bg-gray-100">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div></div>
      <!-- Contact Information -->
      <div class="bg-white p-4  space-y-4">
        
        <img src="../../src/assets/logo.png" alt="Logo" class="w-24">
        <div>
          <h1 class="text-xl font-bold text-gray-700">Liên hệ</h1>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="font-semibold">Địa chỉ:</span>
              <p class="text-gray-600">Hoà Quý - Ngũ Hành Sơn - Đà Nẵng</p>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Email:</span>
              <p class="text-gray-600">haupham@gmail.com</p>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Thời gian làm việc:</span>
              <p class="text-gray-600">08:00 - 17:00, Thứ 2 - Thứ 7</p>
            </div>
          </div>
        </div>
        <div>
          <h1 class="text-xl font-bold text-gray-700">Theo dõi chúng tôi</h1>
          <div class="flex space-x-4 text-3xl">
            <a href="#"><i class="pi pi-facebook text-blue-600"></i></a>
            <a href="#"><i class="pi pi-linkedin text-blue-400"></i></a>
            <a href="#"><i class="pi pi-instagram text-pink-600"></i></a>
          </div>
        </div>
      </div>

      <!-- Product Categories -->
      <div class="bg-white p-4 flex flex-col items-center space-y-4">
        <h1 class="text-xl font-bold text-gray-700">Danh mục sản phẩm</h1>
        <ul class="space-y-2">
          <li v-for="category in allCategory" :key="category._id" class="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2" @click="selectCategory(category._id)">
            <span>{{ category.title }}</span>
          </li>
        </ul>
      </div>

      <!-- Policies -->
      <div class="bg-white p-4 flex flex-col items-center space-y-4">
        <h1 class="text-xl font-bold text-gray-700">Chính sách</h1>
        <ul class="space-y-2">
          <li v-for="policy in allPolicies" :key="policy._id" class="py-2 hover:bg-gray-200 cursor-pointer">
            <a :href="policy.link" class="block">{{ policy.title }}</a>
          </li>
        </ul>
      </div>

      <!-- Payment Methods -->
      <div class="bg-white p-4 flex flex-col items-center space-y-4">
        <h1 class="text-xl font-bold text-gray-700">Thanh toán</h1>
        <span class="text-gray-600">Hỗ trợ thanh toán qua các cổng</span>
        <ul class="flex flex-wrap gap-4 justify-center">
          <li v-for="payment in allPayments" :key="payment._id" class="flex flex-col items-center">
            <i :class="payment.icon" class="text-4xl mb-2"></i>
            <a :href="payment.link" class="text-center">{{ payment.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      allPolicies: [
        { _id: 1, title: 'Chính sách bảo mật', link: '/policy/privacy' },
        { _id: 2, title: 'Chính sách vận chuyển', link: '/policy/shipping' },
        { _id: 3, title: 'Chính sách đổi trả', link: '/policy/return' },
      ],
      allPayments: [
        { _id: 1, title: 'PayPal', icon: 'pi pi-paypal text-blue-600', link: 'https://www.paypal.com/home/' },
        { _id: 2, title: 'VNPAY', icon: 'pi pi-money-bill text-green-600', link: 'https://www.vnpay.vn/' },
        { _id: 3, title: 'OnePay', icon: 'pi pi-credit-card text-indigo-600', link: 'https://www.onepay.vn' }
      ]
    };
  },
  mounted() {
    this.fetchCategory();
  },
  methods: {
    ...mapActions('category', ['fetchCategory']),
    ...mapActions('product', ['fetchProductByCategory']),
    async selectCategory(categoryId) {
      try {
        await this.fetchProductByCategory(categoryId);
        this.$router.push({ name: 'products-Page', query: { category: categoryId } });
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    ...mapGetters('category', ['allCategory']),
  }
};
</script>

<style scoped>
/* Add any necessary custom styles here */
</style>
