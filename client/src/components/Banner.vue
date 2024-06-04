<template>
  <div class="card">
    <Carousel :value="getBanner" :numVisible="1" :numScroll="1" circular :responsiveOptions="responsiveOptions" :autoplayInterval="3000">
      <template #item="{ data }">
        <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
          <div class="mb-3">
            <img :src="data.images[0]" :alt="data" class="w-full h-[300px] object-cover" />
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Carousel from 'primevue/carousel';

export default {
  components: {
    Carousel
  },
  data() {
    return {
      responsiveOptions: [
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
      ]
    };
  },
  mounted() {
   
    this.fetchBanner()
  },

  computed: {
 ...mapGetters('banner',['getBanner'])
  },
  methods:{
...mapActions('banner',['fetchBanner'])
  }
}
</script>
