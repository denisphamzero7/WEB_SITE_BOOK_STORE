<template>
  <div class="container mx-auto p-6 bg-gray-100 flex flex-nowrap md:flex-row flex-col ">
    
    <div class="bg-white p-4 md:p-6 w-full md:w-1/3 flex flex-col">
      <div class="mb-3 pr-2">
        <img src="../../src/assets/logo.png" alt="Logo" width="100px">
      </div>
      <div class="mb-3">
        <h1 class="text-2xl font-bold mb-2 text-gray-400">Liên hệ</h1>
        <div class="text-left">
          <div class="mb-2 flex gap-1">
            <span class="font-semibold whitespace-nowrap">Địa chỉ:</span>
            <p class="text-[#4f5d77] whitespace-nowrap">Hoà Quý - Ngũ Hành Sơn - Đà Nẵng</p>
          </div>
          <div class="mb-2 flex gap-1">
            <span class="font-semibold whitespace-nowrap">Email:</span>
            <p class="text-[#4f5d77] whitespace-nowrap">haupham@gmail.com</p>
          </div>
          <div class="flex gap-1">
            <span class="font-semibold whitespace-nowrap">Thời gian làm việc:</span>
            <p class="text-[#4f5d77] whitespace-nowrap">08:00 - 17:00, Thứ 2 - Thứ 7</p>
          </div>
        </div>
      </div>  
      <div>
        <h1 class="text-2xl font-bold mb-2 text-gray-400">Theo dõi chúng tôi</h1>
        <div class="space-x-4 text-4xl">
          <a href="#"><i class="pi pi-facebook text-3xl"></i></a>
          <a href="#"><i class="pi pi-link text-3xl text-blue-400"></i></a>
          <a href="#"><i class="pi pi-instagram text-3xl text-pink-600"></i></a>
        </div>
      </div>
    </div>

    <div class="p-4 md:p-6 px-2 w-full md:w-1/6 flex flex-col">
      <h1 class="text-2xl">Danh mục sản phẩm</h1>
      <ul class="py-2">
        <li v-for="category in allCategory" :key="category._id" class="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2" @click="selectCategory(category._id)">
          <span>{{ category.title }}</span>
        </li>
      </ul>
    </div>

    <div class="p-4 md:p-6 w-full md:w-1/6 flex flex-col">
      <h1 class="text-2xl">Chính sách</h1>
      <ul class="py-2">
        <li v-for="policy in allPolicies" :key="policy._id" class="py-2 hover:bg-gray-200 cursor-pointer">
          <a :href="policy.link" class="whitespace-nowrap">{{ policy.title }}</a>
        </li>
      </ul>
    </div>

    <div class="p-4 md:p-6 w-full md:w-1/3 flex flex-col">
      <h1 class="text-2xl">Thanh toán</h1>
      <span class="whitespace-nowrap">Hỗ trợ thanh toán qua các cổng</span>
      <ul class="py-2 flex gap-6 justify-center p-2">
        <li v-for="payment in allPayments" :key="payment._id" class="py-2 hover:bg-gray-200 cursor-pointer flex flex-col items-center">
          <i :class="payment.icon" class="text-4xl mb-2"></i>
          <a :href="payment.link" class="text-center whitespace-nowrap">{{ payment.title }}</a>
        </li>
      </ul>
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
