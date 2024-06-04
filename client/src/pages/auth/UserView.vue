<template>
    <div>
      <div v-if="isAuthenticated">
         <div class="md:container flex  justify-center">
              <div>
                <h2>infor</h2>
                <h1>{{User.firstname}}</h1>
                <h1>{{User.email}}</h1>
                <h1>{{User.mobile}}</h1>
              </div>     

         </div>
    </div>
    <div v-else class="md:container flex  justify-center">
           <h1>hãy đăng nhập !</h1> 
    </div>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';
export default {
   
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'User']),
  },

}
</script>

<style lang="scss" scoped>

</style>