<template>
  <footer class="bg-gray-200 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class=" grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        <!-- Contact Information -->
        <div class="bg-white p-4  rounded-lg shadow-md ">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Liên hệ</h2>
          <ul>
            <li class="mb-2">
              <span class="font-semibold">Địa chỉ:</span>
              <p class="text-gray-600">Hoà Quý - Ngũ Hành Sơn - Đà Nẵng</p>
            </li>
            <li class="mb-2">
              <span class="font-semibold">Email:</span>
              <p class="text-gray-600">haupham@gmail.com</p>
            </li>
            <li class="mb-2">
              <span class="font-semibold">Thời gian làm việc:</span>
              <p class="text-gray-600">08:00 - 17:00, Thứ 2 - Thứ 7</p>
            </li>
          </ul>
        </div>

        <!-- Product Categories -->
        <div class="bg-white p-4  rounded-lg shadow-md">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Danh mục sản phẩm</h2>
          <ul>
            <li v-for="category in allCategory" :key="category._id" class="mb-2">
              <a :href="'/category/' + category._id" class="text-gray-600 hover:text-gray-900">{{ category.title }}</a>
            </li>
          </ul>
        </div>

        <!-- Policies -->
        <div class="bg-white p-4  rounded-lg shadow-md">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Chính sách</h2>
          <ul>
            <li v-for="policy in allPolicies" :key="policy._id" class="mb-2">
              <a :href="policy.link" class="text-gray-600 hover:text-gray-900">{{ policy.title }}</a>
            </li>
          </ul>
        </div>

        <!-- Payment Methods -->
        <div class="bg-white p-4  rounded-lg shadow-md">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Thanh toán</h2>
          <ul class="flex flex-wrap gap-4 justify-center">
            <li v-for="payment in allPayments" :key="payment._id" class="flex flex-col items-center">
              <i :class="payment.icon" class="text-4xl mb-2"></i>
              <a :href="payment.link" class="text-center text-gray-600 hover:text-gray-900">{{ payment.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      allPolicies: [
        { _id: 1, title: 'Chính sách bảo mật', link: '/policy/privacy' },
        { _id: 2, title: 'Chính sách vận chuyển', link: '/policy/shipping' },
        { _id: 3, title: 'Chính sách đổi trả', link: '/policy/return' }
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
/* Custom styles for responsive adjustments */
@media (max-width: 1024px) {
  footer {
    padding: 16px;
  }

  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.bg-white {
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.25rem;
  color: #1a202c;
}

ul {
  padding-left: 0;
}

a {
  transition: color 0.3s;
}

a:hover {
  color: #1a202c;
}

.text-center {
  text-align: center;
}
</style>
