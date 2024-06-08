<template>
  <div>
    <div v-if="!getProductDetail" class="text-center py-4">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="container mx-auto flex flex-col lg:flex-row my-6 gap-8 justify-center">
        <div class="overflow-hidden rounded-lg border border-gray-300 shadow-md">
          <img
            class="w-full lg:w-64 p-2 rounded-t-lg"
            :src="productDetail.images[0]"
            :alt="productDetail.name"
          />
        </div>
        <div class="p-6 flex-1">
          <h1 class="text-3xl lg:text-4xl font-bold mb-4">{{ productDetail.name }}</h1>
          <div class="text-sm text-gray-600 mb-4">
            <span>Released: {{ formatDate(productDetail.createdAt) }}</span>
            <span class="mx-2">|</span>
            <span>By: {{ author }}</span>
            <span class="mx-2">|</span>
            <span>Publisher: {{ publisher }}</span>
          </div>
          <div class="flex items-center mb-4">
            <a-rate :value="getstar" allowHalf />
            <span class="text-xl text-red-600 ml-3">{{ getstar }} đánh giá</span>
          </div>
          <div class="text-xl lg:text-2xl font-medium mb-4">Price: {{ formatPrice }}</div>
          <div class="mb-4">
            <span class="text-xl">Thể loại sách:</span>
            {{ formatBookCategories(productDetail.bookcategory) }}
          </div>
          <div class="text-lg mb-6">{{ productDetail.description }}</div>
          <div class="flex items-center mb-4">
            <label class="font-medium mr-2">Quantity:</label>
            <input
              v-model="countProducts"
              type="number"
              min="1"
              :max="productDetail.quantity"
              class="w-16 lg:w-20 px-2 py-1 border border-gray-400 rounded-md"
            />
            <div class="ml-4 flex gap-2">
              <button @click.prevent="incrementCount" class="btn btn-red">+</button>
              <button @click.prevent="decrementCount" class="btn btn-red">-</button>
            </div>
          </div>
          <button @click.prevent="addToCart" class="btn btn-green lg:w-1/2">Add to Cart</button>
        </div>
      </div>
      <!-- Sản phẩm đề xuất -->
      <div class="container mx-auto mt-8">
        <h1 class="text-xl lg:text-2xl font-bold mb-4">Sản phẩm được đề xuất</h1>
        <div v-if="recommendedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Product
            v-for="product in recommendedProducts"
            :key="product._id"
            :product="product"
            @click="selectProduct(product._id)"
          />
        </div>
        <div v-else>
          <div v-if="relatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Product
              v-for="product in relatedProducts"
              :key="product._id"
              :product="product"
              @click="selectProduct(product._id)"
            />
          </div>
          <div v-else class="text-red-600 text-lg">No related products found.</div>
        </div>
      </div>
      <!-- Phần nhận xét và đánh giá -->
      <div class="container mx-auto mt-8">
        <!-- Nội dung nhận xét và đánh giá -->
        <h1 class="text-xl lg:text-2xl font-bold mb-4">Comments and Ratings</h1>
        <div v-if="productDetail.rating && productDetail.rating.length > 0" class="mb-6">
          <div
            v-for="comment in productDetail.rating"
            :key="comment._id"
            class="border-b border-gray-300 py-4 flex items-start space-x-4"
          >
            <div>
              <img :src="comment.postedBy.avatar" alt="" class="rounded-full w-12 h-12" />
            </div>
            <div class="flex-1">
              <div class="flex justify-between">
                <div>
                  <p class="text-sm font-semibold text-gray-800">
                    {{ comment.postedBy.firstname }} {{ comment.postedBy.lastname }}
                  </p>
                  <p class="text-sm text-gray-500">{{ formatDate(productDetail.createdAt) }}</p>
                </div>
                <div class="flex items-center">
                  <a-rate :value="comment.start" disabled allowHalf />
                </div>
              </div>
              <p class="text-lg text-gray-700 mt-2">{{ comment.comments }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-red-600 text-lg">No comments yet.</div>
        <div class="border-t border-gray-300 py-4">
          <form @submit.prevent="voterating">
            <h2 class="text-lg lg:text-xl font-medium mb-2">Add a Comment</h2>
            <textarea
              v-model="newComment"
              rows="4"
              class="w-full px-3 py-2 border border-gray-400 rounded-md mb-4"
            ></textarea>
            <div class="flex items-center mb-4">
              <Rating :value="rating" :max-stars="5" @change="updateRating"></Rating>
            </div>
            <button type="submit" class="btn btn-green">Submit Comment</button>
          </form>
        </div>
      </div>
      <Toast
        :message="Toast.message"
        :duration="2000"
        :position="Toast.position"
        :backgroundcolor="Toast.backgroundcolor"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Product from '../components/Product.vue'
import Rating from './Rating.vue'
import { format } from 'date-fns'
import Toast from './Toast.vue'

export default {
  components: { Rating, Toast, Product },
  data() {
    return {
      Toast: {
        message: '',
        position: '',
        backgroundcolor: ''
      },
      countProducts: 1,
      rating: 0,
      newComment: ''
    }
  },
  created() {
    this.fetchProductDetail(this.$route.params.id)
    this.recommendProduct(this.$route.params.id)
    this.fetchProduct()
  },
  methods: {
    ...mapActions('product', [
      'fetchProductDetail',
      'postrating',
      'fetchProduct',
      'recommendProduct'
    ]),
    ...mapActions('user', ['addProductToCart']),

    selectProduct(productId) {
      this.fetchProductDetail(productId)
    },
    formatBookCategories(categories) {
      if (Array.isArray(categories)) {
        return categories.join(', ')
      }
      return 'N/A'
    },
    incrementCount() {
      if (this.countProducts < this.getProductDetail.quantity) {
        this.countProducts++
      }
    },
    decrementCount() {
      if (this.countProducts > 1) {
        this.countProducts--
      }
    },
    async addToCart() {
      try {
        const availableQuantity = this.getProductDetail.quantity
        if (availableQuantity === 0) {
          alert('sản phẩm hết hàng')
        } else {
          const data = { pid: this.getProductDetail._id, quantity: this.countProducts }
          const response = await this.addProductToCart(data)
          if (!response) {
            alert('bạn chưa đăng nhập')
          } else {
            alert('thêm vào giỏ hàng thành công')
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async voterating() {
      try {
        const data = {
          pid: this.productDetail._id,
          start: this.rating,
          comments: this.newComment
        }
        const response = await this.postrating(data)
        if (response) {
          await this.fetchProductDetail(this.$route.params.id)
          alert('vote thành công')
          this.rating = 0
          this.newComment = ''
        } else {
          console.log('bạn đăng nhập')
          alert('bạn chưa đăng nhập')
        }
      } catch (error) {
        console.log(error)
      }
    },
    clearToast() {
      this.Toast.message = ''
    },
    updateRating(newRating) {
      this.rating = newRating
    },
    formatDate(date) {
      if (date && typeof date === 'string') {
        const parsedDate = Date.parse(date)
        if (!isNaN(parsedDate)) {
          return format(new Date(parsedDate), 'yyyy-MM-dd HH:mm:ss')
        }
      }
      return 'Invalid date'
    }
  },
  computed: {
    ...mapGetters('product', ['getProductDetail', 'getProducts', 'recommendedProducts']),
    relatedProducts() {
      const authorId = this.productDetail.author?._id
      return this.getProducts.filter(
        (product) => product.author?._id === authorId && product._id !== this.getProductDetail._id
      )
    },
    formatPrice() {
      if (typeof this.productDetail.price !== 'number') {
        return 'Invalid Price'
      }
      return this.productDetail.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    productDetail() {
      return this.getProductDetail || {}
    },
    author() {
      return this.productDetail.author?.name || ''
    },
    publisher() {
      return this.productDetail.publisher?.title || ''
    },
    getstar() {
      return this.productDetail.totalRating ? this.productDetail.totalRating[0] : 0
    },
    sortedRating() {
      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      this.productDetail.rating.forEach((rating) => {
        const stars = rating.start
        counts[stars] += 1
      })
      return Object.entries(counts).sort((a, b) => b[0] - a[0])
    }
  }
}
</script>

<style scoped>
.btn {
  @apply py-2 px-4 rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-red {
  @apply bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 focus:ring-red-400 focus:ring-offset-red-200;
}

.btn-green {
  @apply bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 focus:ring-green-400 focus:ring-offset-green-200;
}
</style>
