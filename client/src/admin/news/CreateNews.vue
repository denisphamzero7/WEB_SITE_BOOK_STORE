<template>
  <div class="p-6 bg-gray-700 min-h-screen">
    <h1 class="text-white text-3xl font-medium mb-6">Create News</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="title" class="block text-white text-sm font-medium mb-2">Title</label>
        <input type="text" id="title" v-model="news.title" class="w-full p-2 bg-gray-800 text-white rounded placeholder-gray-500 focus:outline-none focus:bg-gray-900" placeholder="Enter title" required>
      </div>
      <div class="mb-4">
        <label for="category" class="block text-white text-sm font-medium mb-2">Category</label>
        <input type="text" id="category" v-model="news.category" class="w-full p-2 bg-gray-800 text-white rounded placeholder-gray-500 focus:outline-none focus:bg-gray-900" placeholder="Enter category" required>
      </div>
      <div class="mb-4">
        <label for="description" class="block text-white text-sm font-medium mb-2">Description</label>
        <textarea id="description" v-model="news.description" class="w-full p-2 bg-gray-800 text-white rounded placeholder-gray-500 focus:outline-none focus:bg-gray-900" rows="8" placeholder="Enter description" required></textarea>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      news: {
        title: '',
        category: '',
        description: '',
      }
    };
  },
  methods: {
    ...mapActions('new', ['createNews']),
    async submitForm() {
      try {
        await this.createNew(this.news);
        console.log(this.new);
        alert('news created successfully');
        this.$router.push('/news');
      } catch (error) {
        console.error('Error creating news:', error);
        alert('Failed to create news');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* Add any additional scoped styles here */
</style>
