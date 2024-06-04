<template>
    <div class="container mx-auto p-8">
      <h1 class="text-2xl font-bold mb-8">
        Đến với BookStore quý khách có thể dễ dàng chọn được đầu sách mình mong muốn. Và đặt hàng trực
        tuyến với thao tác rất đơn giản sau đây :
      </h1>
      <ol>
        <li v-for="(step, index) in steps" :key="index" class="mb-8">
          <h2 class="text-lg font-semibold mb-2 text-blue-800">{{ step.title }}</h2>
          <ul class="list-disc pl-4">
            <li v-for="(detail, i) in step.details" :key="i" class="mb-2">{{ detail }}</li>
          </ul>
        </li>
      </ol>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        steps: [
          {
            title: "1. Chọn sản phẩm.",
            details: [
              "Khách hàng lựa chọn xem sản phẩm cần mua...",
              "Sau khi xem xong các thông tin của sản phẩm, Qúy khách nhấn vào nút 'MUA NGAY'..."
            ]
          },
          {
            title: "2. Kiểm tra giỏ hàng.",
            details: [
              "Khách hàng điền đầy đủ thông tin vào các ô...",
              "Phần ghi chú cho đơn hàng nếu quý khách có những ghi chú đặc biệt trên đơn hàng..."
            ]
          },
          {
            title: "3. Cung cấp thông tin giao hàng.",
            details: [
              "Khách hàng điền đầy đủ thông tin vào các ô...",
              "Phần ghi chú cho đơn hàng nếu quý khách có những ghi chú đặc biệt trên đơn hàng..."
            ]
          },
          {
            title: "4. Chọn hình thức vận chuyển và thanh toán đơn hàng.",
            details: [
              "Hình thức vận chuyển: Khách hàng lựa chọn hình thức vận chuyển dựa trên khu vực và thời..."
            ]
          },
          {
            title: "5. Xác nhận đơn đặt hàng.",
            details: [
              "Quý khách kiểm tra lại 'Địa chỉ thanh toán', 'Địa chỉ giao hàng', 'Số tiền trên đơn hàng'..."
            ]
          }
        ]
      };
    }
  };
  </script>
  
  <style lang="scss" scoped>
  /* Add any custom styles here */
  </style>
  