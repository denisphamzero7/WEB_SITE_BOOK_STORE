<template>
    <div class="p-6 bg-gray-700 min-h-screen">
      <!-- Header -->
      <h1 class="flex items-center font-medium text-3xl text-white mb-6">
        <li class="rounded-full bg-[#0f172ab3] p-3 text-xl text-white pi pi-pencil mr-3"></li>
        {{ header }}
      </h1>
  
      <!-- Add news Button -->
      <div class="flex justify-end mb-4">
        <router-link :to="{ name: 'Create-news' }">
          <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add news
          </button>
        </router-link>
      </div>
  
      <!-- news Table -->
      <div class="bg-[#0f172ab3] p-4 rounded-lg shadow-lg overflow-x-auto">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by title..."
          class="p-2 w-full mb-4 bg-gray-800 text-white rounded placeholder-gray-500 focus:outline-none focus:bg-gray-900"
        />
  
        <table class="w-full text-white">
          <thead>
            <tr class="bg-gray-800">
              <th class="py-3 px-4">Title</th>
              <th class="py-3 px-4">Author</th>
              <th class="py-3 px-4">Category</th>
              <th class="py-3 px-4">Created At</th>
              <th class="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="news in paginatednews"
              :key="news._id"
              class="odd:bg-gray-700 even:bg-gray-800 hover:bg-gray-600"
            >
              <td class="py-3 px-4">{{ shortText(news.title || 'No title available', 30) }}</td>
              <td class="py-3 px-4">{{ news.author || 'N/A' }}</td>
              <td class="py-3 px-4">{{ news.category || 'N/A' }}</td>
              <td class="py-3 px-4">{{ news.createdAt || 'N/A' }}</td>
              <td class="py-3 px-4">
                <button @click="editnews(news)" class="text-blue-400 hover:text-blue-600">
                  Edit
                </button>
                <button
                  @click="handleDeletenews(news._id)"
                  class="text-red-500 hover:text-red-700 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center mt-4">
        <Pagination
          :totalItems="totalnews"
          :itemsPerPage="itemsPerPage"
          :currentPage="currentPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex'
  import Pagination from '../../components/Pagination.vue'
  
  export default {
    components: {
      Pagination
    },
    data() {
      return {
        header: 'news Manager',
        currentPage: 1,
        itemsPerPage: 4,
        searchQuery: ''
      }
    },
    mounted() {
      this.fetchnews()
    },
    computed: {
      ...mapGetters('news', ['news']),
      filterednews() {
        if (!this.searchQuery) {
          return this.news
        }
        return this.news.filter((news) =>
          news.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      },
      totalnews() {
        return this.filterednews.length
      },
      paginatednews() {
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.filterednews.slice(start, end)
      }
    },
    methods: {
      ...mapActions('news', ['fetchnews', 'deleteAnnews']),
      shortText(text, maxLength) {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
      },
      editnews(news) {
        this.$router.push({ name: 'Edit-news', params: { bid: news._id } })
      },
      async handleDeletenews(newsId) {
        try {
          await this.deleteAnnews(newsId)
          this.fetchnews()
          alert('deletenews')
        } catch (error) {
          console.error('Error deleting news:', error)
        }
      },
      handlePageChange(page) {
        this.currentPage = page
      }
    },
    watch: {
      searchQuery() {
        this.currentPage = 1
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  /* Add any additional scoped styles here */
  </style>
  