<template>
  <div class="container mx-auto p-4 bg-gray-700">
    <h1 class="text-2xl font-bold mb-4 text-white">Edit Product</h1>
    <div v-if="getProductDetail">
      <form @submit.prevent="updateProduct" class="space-y-4">
        <div class="flex flex-col">
          <label for="name" class="font-medium text-white">Product Name:</label>
          <input
            type="text"
            v-model.lazy="getProductDetail.name"
            id="name"
            class="border p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="author" class="font-medium text-white">Author:</label>
          <select
            v-model.lazy="getProductDetail.author._id"
            id="author"
            class="border p-2 rounded bg-gray-800 text-white"
            required
          >
            <option v-for="author in allAuthors" :key="author._id" :value="author._id">
              {{ author.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="category" class="font-medium text-white">Category:</label>
          <select
            v-model.lazy="getProductDetail.category"
            id="category"
            class="border p-2 rounded bg-gray-800 text-white"
            required
          >
            <option v-for="category in allCategory" :key="category._id" :value="category._id">
              {{category.title }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
        <label for="bookcategory" class="font-medium text-white">Bookcategory:</label>
        <select
          v-model="getProductDetail.bookcategory"
          id="bookcategory"
          class="border p-2 rounded bg-gray-800 text-white"
          multiple
          required
        >
          <option
            v-for="bookcategory in allbookcategory"
            :key="bookcategory._id"
            :value="bookcategory.title"
          >
            {{ bookcategory.title }}
          </option>
        </select>
      </div>
        <div class="flex flex-col">
          <label for="publisher" class="font-medium text-white">Publisher:</label>
          <select
            v-model.lazy="getProductDetail.publisher._id"
            id="publisher"
            class="border p-2 rounded bg-gray-800 text-white"
            required
          >
            <option v-for="publisher in allPublishers" :key="publisher._id" :value="publisher._id">
              {{ publisher.title }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="description" class="font-medium text-white">Description:</label>
          <textarea
            v-model.lazy="getProductDetail.description"
            id="description"
            class="border p-2 rounded bg-gray-800 text-white"
            required
          ></textarea>
        </div>
        <div class="flex flex-col">
          <label for="price" class="font-medium text-white">Price:</label>
          <input
            type="number"
            v-model.lazy="getProductDetail.price"
            id="price"
            class="border p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="quantity" class="font-medium text-white">Quantity:</label>
          <input
            type="number"
            v-model.lazy="getProductDetail.quantity"
            id="quantity"
            class="border p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" :disabled="loading">
          Update
        </button>
        <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
        <div v-if="success" class="text-green-500 mt-2">Update successful!</div>
      </form>
      <div class="mt-8">
        <input
          type="file"
          id="product"
          ref="product"
          accept="image/*"
          @change="onFileChange"
          multiple
          class="block w-full px-4 py-2 border rounded-md text-gray-700 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        <div class="flex justify-center mt-4">
          <img :src="getProductDetail.images[0]" class="w-24 h-24 object-cover rounded" alt="Product Image">
        </div>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <div
            v-for="(image, index) in getProductDetail.images"
            :key="index"
            class="cursor-pointer"
            @click="selectImage(image, index)"
          >
            <img :src="image" class="w-24 h-24 object-cover rounded border-2 border-transparent hover:border-blue-500" alt="Product Image">
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-white">Loading product details...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import debounce from 'lodash/debounce';
import router from '../../router/index'
export default {
  data() {
    return {
      success: false,
      selectedImage: []
    };
  },
  computed: {
    ...mapGetters('product', ['getProductDetail', 'loading', 'error','allbookcategory']),
    ...mapGetters('author', ['allAuthors']),
    ...mapGetters('publisher', ['allPublishers']),
    ...mapGetters('category', ['allCategory']),
  },
  created() {
    const productId = this.$route.params.id;
    this.fetchProductDetail(productId);
    this.fetchAuthors();
    this.fetchPublisher();
    this.fetchCategory();
    this.fetchBookCategory()
  },
  methods: {
    ...mapActions('product', ['fetchProductDetail', 'updateproduct', 'uploadimageproduct','fetchBookCategory']),
    ...mapActions('author', ['fetchAuthors']),
    ...mapActions('publisher', ['fetchPublisher']),
    ...mapActions('category', ['fetchCategory']),
    updateProduct: debounce(async function () {
      try {
        const id = this.$route.params.id;
        const data = this.getProductDetail;
        await this.updateproduct({ pid: id, data: data });
        this.success = true;
        setTimeout(() => {
          this.success = false;
          this.$router.push('/admin/products')
        }, 2000); 
       
      } catch (error) {
        console.error(error);
      }
    }, 500),
    async onFileChange(event) {
      const files = Array.from(event.target.files);
      const promises = files.map(file => {
        const formData = new FormData();
        formData.append('images', file);
        return this.uploadimageproduct({ pid: this.$route.params.id, data: formData }).then(() => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.getProductDetail.images.unshift(e.target.result);
          };
          reader.readAsDataURL(file);
        });
      });

      try {
        await Promise.all(promises);
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    },
    async selectImage(image, index) {
      this.getProductDetail.images.unshift(
        this.getProductDetail.images.splice(index, 1)[0]
      );
      try {
        const data = { ...this.getProductDetail };
        await this.updateproduct({ pid: this.$route.params.id, data: data });
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 3000); // Hide success message after 3 seconds
      } catch (error) {
        console.error('Error updating product with selected image:', error);
      }
    }
  }
};
</script>
