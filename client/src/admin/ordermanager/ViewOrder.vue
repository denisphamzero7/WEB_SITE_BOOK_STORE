<template>
  <div class="p-6 bg-gray-700 text-white min-h-screen roboto-regular">
    <h1 class="text-3xl font-bold mb-4 p-2 rounded-lg">Order Details</h1>
    <div class="mb-8 bg-gray-800 p-4 rounded-lg">
      <p class="mb-2"><strong>Order ID:</strong> {{ order._id }}</p>
      <p class="mb-2"><strong>Status:</strong> {{ order.status }}</p>
      <p class="mb-2"><strong>Total:</strong> ${{ order.total }}</p>
      <p class="mb-2"><strong>Shipping Address:</strong> {{ order.address }}</p>
      <p class="mb-2"><strong>Ordered By:</strong> {{ order.orderBy?.firstname }} {{ order.orderBy?.lastname }}</p>
    </div>
    <h2 class="text-2xl font-bold mb-4">Ordered Products</h2>
    <div v-if="order.products && order.products.length">
      <table class="min-w-full bg-gray-800 text-white border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-900">
            <th class="py-2 px-4 border-b border-gray-600 border-r">Product Name</th>
            <th class="py-2 px-4 border-b border-gray-600 border-r">Image</th>
            <th class="py-2 px-4 border-b border-gray-600 border-r">Price</th>
            <th class="py-2 px-4 border-b border-gray-600">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.products" :key="index" class="bg-gray-800 hover:bg-gray-700">
            <td class="py-2 px-4 border-b border-gray-600 border-r">{{ item.product.name }}</td>
            <td class="py-2 px-4 border-b border-gray-600 border-r">
              <img :src="item.product.images" :alt="item.product.name" class="h-16 w-16 object-cover rounded">
            </td>
            <td class="py-2 px-4 border-b border-gray-600 border-r">${{ item.product.price }}</td>
            <td class="py-2 px-4 border-b border-gray-600">{{ item.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="mt-4">
      <p>No products ordered.</p>
    </div>
    <button @click="printPDF" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Print to PDF
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'jspdf-font';
export default {
  mounted() {
    this.getAnOrder(this.$route.params.oid);
  },
  methods: {
    ...mapActions('order', ['getAnOrder']),
    async printPDF() {
      const doc = new jsPDF();
      doc.addFont( 'Noto Sans ExtraCondensed', 'normal');
      doc.setFont('Noto Sans ExtraCondensed', 'normal');
      doc.text('Order Details', 15, 30);

      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.text('Page ' + i + ' of ' + totalPages, 15, doc.internal.pageSize.height - 10);
      }

      doc.setFontSize(12);
      let yOffset = 50;
      const orderData = [
        ['Order ID', this.order._id],
        ['Status', this.order.status],
        ['Total', `$${this.order.total}`],
        ['Shipping Address', this.order.address],
        ['Ordered By', `${this.order.orderBy?.firstname} ${this.order.orderBy?.lastname}`]
      ];
      doc.text('Order Information:', 15, yOffset);
      orderData.forEach((data) => {
        yOffset += 10;
        doc.text(`${data[0]}: ${data[1]}`, 20, yOffset);
      });

      if (this.order.products && this.order.products.length) {
        const productsData = this.order.products.map((item) => [
          item.product.name,
          '', // Placeholder for image
          `$${item.product.price}`,
          item.quantity
        ]);

        const loadImages = async () => {
          const promises = this.order.products.map((item, index) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = item.product.images;
              img.onload = () => {
                resolve({ img, index });
              };
            });
          });
          return Promise.all(promises);
        };

        const images = await loadImages();

        doc.autoTable({
          startY: yOffset + 20,
          head: [['Product Name', 'Image', 'Price', 'Quantity']],
          body: productsData,
          didDrawCell: (data) => {
            if (data.column.index === 1 && data.cell.section === 'body') {
              const imageInfo = images.find(img => img.index === data.row.index);
              if (imageInfo) {
                doc.addImage(imageInfo.img, 'JPEG', data.cell.x + 2, data.cell.y + 2, 16, 16);
              }
            }
          },
          styles: { fontSize: 10, cellPadding: 5, overflow: 'linebreak' }
        });
      } else {
        doc.text('No products ordered.', 15, yOffset + 10);
      }

      doc.save(`order_${this.order._id}.pdf`);
    }
  },
  computed: {
    ...mapGetters('order', ['order']),
  }
}

</script>

<style scoped>
.roboto-regular {
  font-family: 'Noto Sans ExtraCondensed', sans-serif;
 
}
</style>
