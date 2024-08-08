<template>
  <div class="container mx-auto p-4 bg-gray-700">
    <h1 class="text-2xl font-bold mb-4 text-white">Create Product</h1>

    <form @submit.prevent="submitProduct" class="space-y-4">
      <div class="flex flex-col">
        <label for="name" class="font-medium text-white">Product Name:</label>
        <input
          type="text"
          v-model="product.name"
          id="name"
          class="border p-2 rounded bg-gray-800 text-white"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="title" class="font-medium text-white">Title:</label>
        <input
          type="text"
          v-model="product.title"
          id="title"
          class="border p-2 rounded bg-gray-800 text-white"
          required
        />
      </div>

      <div class="flex flex-col">
        <label for="description" class="font-medium text-white">Description:</label>
        <textarea
          v-model="product.description"
          id="description"
          class="border p-2 rounded bg-gray-800 text-white"
          required
        ></textarea>
      </div>
      <div class="flex flex-col">
        <label for="author" class="font-medium text-white">Author:</label>
        <select
          v-model="product.author"
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
        <label for="publisher" class="font-medium text-white">Publisher:</label>
        <select
          v-model="product.publisher"
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
        <label for="category" class="font-medium text-white">Category:</label>
        <select
          v-model="product.category"
          id="category"
          class="border p-2 rounded bg-gray-800 text-white"
         
          required
        >
          <option v-for="category in allCategory" :key="category._id" :value="category._id">
            {{ category.title }}
          </option>
        </select>
      </div>
      <div class="flex flex-col">
        <label for="bookcategory" class="font-medium text-white">Bookcategory:</label>
        <select
          v-model="product.bookcategory"
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
        <label for="price" class="font-medium text-white">Price:</label>
        <input
          type="number"
          v-model.number="product.price"
          id="price"
          class="border p-2 rounded bg-gray-800 text-white"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="discount" class="font-medium text-white">Discount:</label>
        <input
          type="number"
          v-model.number="product.discount"
          id="discount"
          class="border p-2 rounded bg-gray-800 text-white"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="quantity" class="font-medium text-white">Quantity:</label>
        <input
          type="number"
          v-model.number="product.quantity"
          id="quantity"
          class="border p-2 rounded bg-gray-800 text-white"
          required
        />
      </div>
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
          <img
            v-if="product.images.length > 0"
            :src="product.images[0]"
            class="w-24 h-24 object-cover rounded"
            alt="Product Image"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        :disabled="loading"
      >
        Create
      </button>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
      <div v-if="success" class="text-green-500 mt-2">Update successful!</div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'create-product',
  data() {
    return {
      success: false,
      selectedImage: [],
      product: {
        name: '',
        title: '',
        description: '',
        price: '',
        quantity: '',
        discount: '',
        images: [],
        author: '',
        publisher: '',
        category: [],
        bookcategory: ''
      },
      images: []
    }
  },
  created() {
    this.fetchAuthors()
    this.fetchPublisher()
    this.fetchCategory()
    this.fetchBookCategory()
  },
  computed: {
    ...mapGetters('product', ['loading', 'error', 'allbookcategory']),
    ...mapGetters('author', ['allAuthors']),
    ...mapGetters('publisher', ['allPublishers']),
    ...mapGetters('category', ['allCategory'])
  },
  methods: {
    ...mapActions('product', ['createProduct', 'fetchBookCategory']),
    ...mapActions('author', ['fetchAuthors']),
    ...mapActions('publisher', ['fetchPublisher']),
    ...mapActions('category', ['fetchCategory']),
    async submitProduct() {
      try {
        const formData = new FormData()
        formData.append('name', this.product.name)
        formData.append('title', this.product.title)
        formData.append('author', this.product.author)
        formData.append('publisher', this.product.publisher)
        formData.append('category', this.product.category)
        formData.append('description', this.product.description)
        formData.append('price', this.product.price)
        formData.append('quantity', this.product.quantity)
        formData.append('discount', this.product.discount)
        
        this.product.bookcategory.forEach((categoryId) => {
        formData.append('bookcategory', categoryId);
      });

        for (let i = 0; i < this.images.length; i++) {
          formData.append('images', this.images[i])
        }

        await this.createProduct(formData)
        this.success = true
        setTimeout(() => {
          this.success = false
        }, 2000)
      } catch (error) {
        console.error(error)
      }
    },
    onFileChange(event) {
      const files = event.target.files
      this.images = files
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.product.images.unshift(e.target.result)
        }
        reader.readAsDataURL(files[i])
      }
    }
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
