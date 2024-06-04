<template>
  <div class="flex justify-center items-center gap-4 mt-5">
    <button 
      @click="goToPage(currentPage - 1)" 
      :disabled="currentPage === 1"
      class="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    <span class="text-white">Page {{ currentPage }} of {{ totalPages }}</span>
    <button 
      @click="goToPage(currentPage + 1)" 
      :disabled="currentPage === totalPages"
      class="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  methods: {
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    }
  }
};
</script>
