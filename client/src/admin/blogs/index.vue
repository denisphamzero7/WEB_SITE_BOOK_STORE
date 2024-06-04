<template>
    <div class="p-6 bg-gray-700 min-h-screen">
      <!-- Header -->
      <h1 class="flex items-center font-medium text-3xl text-white mb-6">
        <li class="rounded-full bg-[#0f172ab3] p-3 text-xl text-white pi pi-pencil mr-3"></li>
        {{ header }}
      </h1>
  
      <!-- Add Blog Button -->
      <div class="flex justify-end mb-4">
        <router-link :to="{ name: 'Create-Blog' }">
          <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add Blog
          </button>
        </router-link>
      </div>
  
      <!-- Blog Table -->
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
              v-for="blog in paginatedBlogs"
              :key="blog._id"
              class="odd:bg-gray-700 even:bg-gray-800 hover:bg-gray-600"
            >
              <td class="py-3 px-4">{{ shortText(blog.title || 'No title available', 30) }}</td>
              <td class="py-3 px-4">{{ blog.author || 'N/A' }}</td>
              <td class="py-3 px-4">{{ blog.category || 'N/A' }}</td>
              <td class="py-3 px-4">{{ blog.createdAt || 'N/A' }}</td>
              <td class="py-3 px-4">
                <button @click="editBlog(blog)" class="text-blue-400 hover:text-blue-600">
                  Edit
                </button>
                <button
                  @click="handleDeleteBlog(blog._id)"
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
          :totalItems="totalBlogs"
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
        header: 'Blogs Manager',
        currentPage: 1,
        itemsPerPage: 4,
        searchQuery: ''
      }
    },
    mounted() {
      this.fetchBlog()
    },
    computed: {
      ...mapGetters('blog', ['blogs']),
      filteredBlogs() {
        if (!this.searchQuery) {
          return this.blogs
        }
        return this.blogs.filter((blog) =>
          blog.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      },
      totalBlogs() {
        return this.filteredBlogs.length
      },
      paginatedBlogs() {
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.filteredBlogs.slice(start, end)
      }
    },
    methods: {
      ...mapActions('blog', ['fetchBlog', 'deleteAnBlog']),
      shortText(text, maxLength) {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
      },
      editBlog(blog) {
        this.$router.push({ name: 'Edit-Blog', params: { bid: blog._id } })
      },
      async handleDeleteBlog(blogId) {
        try {
          await this.deleteAnBlog(blogId)
          this.fetchBlog()
          alert('deleteBlog')
        } catch (error) {
          console.error('Error deleting blog:', error)
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
  