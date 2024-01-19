<template>
    <div class="card">
      <Carousel :value="images" :numVisible="1" :numScroll="1" circular :responsiveOptions="responsiveOptions" :autoplayInterval="3000">
        <template #item="{ data }">
          <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
            <div class="mb-3">
              <img :src="data" :alt="data" class="w-full h-[300px] object-cover" />
            </div>
            {{ data.name }}
          </div>
        </template>
      </Carousel>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";  // Import computed from Vue
  
  import Carousel from 'primevue/carousel';
  import { useStore } from "vuex";
  
  const banners = ref([]);
  const store = useStore();
  const responsiveOptions = ref([
    {
      breakpoint: '1400px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ]);
  
  onMounted(async () => {
    await store.dispatch("banner/fetchBanner");
    banners.value = store.getters["banner/getBanner"];
  });
  
  // Use computed property to get the latest banner data
  const images = computed(() => store.getters["banner/getImagesByName"]("book sale banner"));
  </script>
  