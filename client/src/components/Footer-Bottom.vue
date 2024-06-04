<template>
  <div class="bg-gray-100 border-t border-gray-300 py-6">
    <div class="container mx-auto">
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-200">
              <th class="py-3 px-6 text-left">Company</th>
              <th class="py-3 px-6 text-left">Policies</th>
              <th class="py-3 px-6 text-left">Help</th>
              <th class="py-3 px-6 text-left">Misc</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-300">
              <td class="py-3 px-6">About Us</td>
              <td class="py-3 px-6">Privacy Policies</td>
              <td class="py-3 px-6">Payment</td>
              <td class="py-3 px-6">Affiliate</td>
            </tr>
            <tr class="border-b border-gray-300">
              <td class="py-3 px-6">Contact Us</td>
              <td class="py-3 px-6">Terms of Use</td>
              <td class="py-3 px-6">Shipping</td>
              <td class="py-3 px-6">Sitemap</td>
            </tr>
            <tr>
              <td class="py-3 px-6">Blog</td>
              <td class="py-3 px-6">Secure Shopping</td>
              <td class="py-3 px-6">FAQ</td>
              <td class="py-3 px-6"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex flex-wrap justify-center pt-4 gap-3">
      <a href="#" class="pi pi-facebook text-3xl md:text-4xl text-blue-800"></a>
      <a href="#" class="pi pi-instagram text-3xl md:text-4xl text-red-600"></a>
      <a href="#" class="pi pi-linkedin text-3xl md:text-4xl text-blue-600"></a>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
/* Add any necessary custom styles here */
</style>
