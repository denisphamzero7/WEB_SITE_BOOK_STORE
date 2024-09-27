<template>
  <div class="w-full flex flex-col min-h-screen">
    <div class="sticky top-0 z-50 bg-white">
      <HeaderTop/>
      <HeaderMidlle />
      <HeaderBottom/>
    </div>
    <div class="flex-grow">
      <slot/>
    </div>
    <div>
      <FooterBottom/>
    </div>


  </div>
</template>

<script>
import FooterBottom from '../components/Footer-Bottom.vue'
import HeaderMidlle from '../components/Header-Midlle.vue'
import HeaderTop from '../components/Header-Top.vue'
import HeaderBottom from '../components/Header-Bottom.vue'

export default {
  components: {HeaderTop, HeaderMidlle, HeaderBottom, FooterBottom},
  name: 'Home-Layout',
}
</script>

<style lang="scss" scoped>
</style>
