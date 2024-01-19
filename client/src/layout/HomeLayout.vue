<template>
    <div class="w-full flex flex-col ">
      <div>
        <HeaderTop/>
       <HeaderMidlle />
       <HeaderBottom/>
      </div>
      <div>
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
    components: {HeaderTop,HeaderMidlle,HeaderBottom,FooterBottom},
    name:'Home-Layout',
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>
