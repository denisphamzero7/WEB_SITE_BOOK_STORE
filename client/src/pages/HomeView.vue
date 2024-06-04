<template>
    <div class="flex flex-col items-center">
      <div class="w-full">
        <Banner />
      </div>
      <div class="md:container mx-auto py-4">
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <li class="flex flex-col items-center justify-center gap-3">
            <img src="../assets/icon/icon-truck.png" alt="icon-truck" class="w-20">
            <div class="text-center">
              <span class="font-extrabold">Miễn phí ship</span>
              <p class="text-sm text-[#90908E]">Đơn hàng trên 1 triệu</p>
            </div>
          </li>
          <li class="flex flex-col items-center justify-center gap-3">
            <img src="../assets/icon/icon-bag.png" alt="icon-bag" class="w-20">
            <div class="text-center">
              <span class="font-extrabold">Miễn phí trả hàng</span>
              <p class="text-sm text-[#90908E]">Trong 30 ngày</p>
            </div>
          </li>
          <li class="flex flex-col items-center justify-center gap-3">
            <img src="../assets/icon/icon-purchase.png" alt="icon-purchase" class="w-20">
            <div class="text-center">
              <span class="font-extrabold">Nhận ưu đãi 20%</span>
              <p class="text-sm text-[#90908E]">Khi đăng ký thành viên</p>
            </div>
          </li>
          <li class="flex flex-col items-center justify-center gap-3">
            <img src="../assets/icon/call.png" alt="call" class="w-20">
            <div class="text-center">
              <span class="font-extrabold">Hỗ trợ 24/24</span>
              <p class="text-sm text-[#90908E]">Dịch vụ Hỗ trợ 24/24</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="md:container mx-auto px-4">
        <h1 class="font-extrabold text-lg mb-4">Danh Mục Nổi Bật</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FeatureProduct />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Banner from '../components/Banner.vue';
  import FeatureProduct from '../components/Feature-Product.vue';
  
  export default {
    components: { Banner, FeatureProduct },
  };
  </script>
  
  <style lang="scss" scoped>
  @media (max-width: 639px) {
    /* Thiết lập các cột của dịch vụ để hiển thị ở cấp độ di động */
    .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-4 {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
  
    /* Đảm bảo các mục dịch vụ hiển thị dọc trên di động */
    .flex.flex-col.items-center.justify-center.gap-3 {
      flex-direction: column;
      text-align: center;
    }
  }
  </style>
  