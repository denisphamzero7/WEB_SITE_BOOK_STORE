<template>
  <div class="flex justify-center bg-slate-300">
    <div class="surface-card p-4 shadow-2 border-round w-full max-w-[500px] my-[100px] lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Welcome Book store</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>

      <form @submit.prevent="success">
        <label for="email" class="block text-900 font-medium mb-2">Email</label>
        <InputText v-model="payload.email" id="email" type="text" class="w-full mb-3 border-2" />

        <label for="password1" class="block text-900 font-medium mb-2">Password</label>
        <InputText
          v-model="payload.password"
          id="password"
          type="password"
          class="w-full mb-3 border-2"
        />

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox id="rememberme1" :binary="true"  class="mr-2"></Checkbox>
            <label for="rememberme1">Remember me</label>
          </div>
          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >Forgot password?</a
          >
        </div>

        <MyCustomButton type="submit" label="Sign In" class="w-full bg-blue-500"></MyCustomButton>
      </form>
      <Toast
        :message="Toast.message"
        :duration="3000"
        :position="Toast.position"
        :backgroundcolor="Toast.backgroundcolor"
        @close="clearToast"
      />
    </div>
  </div>
</template>

<script>
import MyCustomButton from 'primevue/button'
import Checkbox from 'primevue/Checkbox'
import InputText from 'primevue/InputText'
import { mapActions } from 'vuex'
import Toast from '../../components/Toast.vue'
import router from '../../router/index'

export default {
  components: {
    MyCustomButton,
    Checkbox,
    InputText,
    Toast
  },
  data() {
    return {
      payload: {
        password: '1234',
        email: 'quanki@gmail.com'
      },
      Toast: {
        message: '',
        position: '',
        backgroundcolor: ''
      },
      checked: false
    }
  },

  methods: {
    ...mapActions('user', ['login', 'fetchcurrentuser']),

    async success() {
      try {
        const response = await this.login(this.payload)
        console.log(response)
        if (response) {
          await this.fetchcurrentuser()
          this.Toast = {
            message: 'Login successful!',
            position: 'bottom-right',
            backgroundcolor: 'success'
          }
          console.log(this.Toast);
          setTimeout(() => {
            router.push({ name: 'Home-Page' })
          }, 2000)
        } else {
          this.Toast = {
            message: 'Login failed',
            position: 'bottom-right',
            backgroundcolor: 'error'
          }
        }
      } catch (error) {
        console.log('Error response from server:', error)
        this.Toast = {
          message: 'Login error!',
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

<style scoped>
/* Add any custom styles here */
</style>
