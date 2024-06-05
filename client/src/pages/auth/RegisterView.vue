<template>
  <div class=" flex justify-center bg-slate-300">
  
<div class="surface-card p-4 shadow-2 border-round w-full max-w-[500px] my-[100px] lg:w-6">
   <div class="text-center mb-5">
      
       <div class="text-900 text-3xl font-medium mb-3">Welcome Book store</div>
       <span class="text-600 font-medium line-height-3">Don't have an account?</span>
       <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
   </div>

   <div @click.prevent="success">
       <label for="firstname" class="block text-900 font-medium mb-2">first name</label>
       <InputText v-model="payload.firstname" id="firstname" type="text" class="w-full mb-3 border-2" />

       <label for="lastname" class="block text-900 font-medium mb-2">last name</label>
       <InputText v-model="payload.lastname" id="lastname" type="text" class="w-full mb-3 border-2" />

       <label for="mobile" class="block text-900 font-medium mb-2">mobile</label>
       <input v-model="payload.mobile" id="number" type="number" class="w-full mb-3 border-2" />

       <label for="email" class="block text-900 font-medium mb-2">Email</label>
       <input v-model="payload.email" id="email" type="text" class="w-full mb-3 border-2" />

       <label for="password" class="block text-900 font-medium mb-2">Password</label>
       <input v-model="payload.password" id="password" type="password" class="w-full mb-3 border-2" />
       
       

       <button  label="Sign up" type="submit"  class="w-full bg-blue-500 "></button>
   </div>
</div>
<Toast
        :message="Toast.message"
        :duration="3000"
        :position="Toast.position"
        :backgroundcolor="Toast.backgroundcolor"
        @close="clearToast"
      />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Toast from '@/components/Toast.vue';
export default {
   components:{
  Toast
   },
   data() {
    return {
      payload: {
        firstname:"",
        lastname:"",
        email: "",
        mobile: "",
        password: "",
        
      },
      Toast: {
        message: '',
        position: '',
        backgroundcolor: ''
      },
    }},
    methods:{
        ...mapActions('user',['register']),
        async success() {
      try {
        const response = await this.register(this.payload)
        console.log(response)
        if (response) {
          this.Toast = {
            message: 'register successful!',
            position: 'bottom-right',
            backgroundcolor: 'success'
          }
          setTimeout(() => {
            router.push({ name: 'Login-Page' })
          }, 200)
        } else {
          this.Toast = {
            message: 'register failed',
            position: 'bottom-right',
            backgroundcolor: 'error'
          }
        }
      } catch (error) {
        console.log('Error response from server:', error)
        this.Toast = {
          message: 'register error!',
          position: 'top-right',
          backgroundcolor: 'error'
        }
      }
    },

    clearToast() {
      this.Toast.message = ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>