<template>
    <div class="p-2 cursor-pointer flex">
      <router-link to="" class="flex">
        <div class="w-48 flex-shrink-0">
          <img :src="blog.image" alt="Blog Image" class="w-full h-auto">
        </div>
        <div class="p-2">
          <div class="text-gray-600 text-xl">{{ blog.title }}</div>
          <div class="text-gray-600 text-sm break-words">{{ blog.description }}</div>
        </div>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      blog: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  /* No additional scoped styles needed as Tailwind handles it */
  </style>
  