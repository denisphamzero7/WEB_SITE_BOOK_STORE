<template>
    <div class="flex flex-row  ">
      
      <Sidebarcart/>
    
      <div class="w-full ">
        <slot/>
      </div>
    </div>
</template>

<script>
import Sidebarcart from '../pages/sidebar/SideBar-Cart.vue'


export default {
    components: {Sidebarcart},
    name:'member-Layout',
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>
