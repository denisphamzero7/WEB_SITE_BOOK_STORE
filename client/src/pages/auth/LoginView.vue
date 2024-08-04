<template>
  <div class="flex justify-center bg-slate-300">
    <div class="surface-card p-4 shadow-2 border-round w-full max-w-[500px] my-[100px] lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Welcome to Bookstore</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>

      <form @submit.prevent="handleLogin">
        <label for="email" class="block text-900 font-medium mb-2">Email</label>
        <input v-model="payload.email" id="email" type="text" class="w-full mb-3 border-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md p-2" />
        <span v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</span>

        <label for="password" class="block text-900 font-medium mb-2">Password</label>
        <input v-model="payload.password" id="password" type="password" class="w-full mb-3 border-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md p-2" />
        <span v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</span>

        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <input type="checkbox" v-model="checked" id="checkbox" />
            <label for="checkbox" class="ml-2">Remember me</label>
          </div>
          <a @click="handleForgotPassword" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Forgot password?</a>
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600">Login</button>
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
import { mapActions } from 'vuex';
import Toast from '../../components/Toast.vue';
import router from '../../router/index';

export default {
  components: {
    Toast
  },
  data() {
    return {
      payload: {
        email: '',
        password: ''
      },
      Toast: {
        message: '',
        position: '',
        backgroundcolor: ''
      },
      checked: false,
      emailError: '',
      passwordError: ''
    };
  },
  mounted() {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      this.payload.email = storedEmail;
      this.payload.password = storedPassword;
      this.checked = true;
    }
  },
  methods: {
    ...mapActions('user', ['login', 'fetchcurrentuser', 'forgotPassword']),

    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    validateForm() {
      this.emailError = '';
      this.passwordError = '';

      if (!this.payload.email) {
        this.emailError = 'Email is required.';
      } else if (!this.validateEmail(this.payload.email)) {
        this.emailError = 'Invalid email format.';
      }

      if (!this.payload.password) {
        this.passwordError = 'Password is required.';
      }

      return !this.emailError && !this.passwordError;
    },

    async handleLogin() {
      if (!this.validateForm()) return;

      try {
        const response = await this.login(this.payload);
        if (response) {
          if (this.checked) {
            localStorage.setItem('email', this.payload.email);
            localStorage.setItem('password', this.payload.password);
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
          }
          await this.fetchcurrentuser();
          this.showToast('Login successful!', 'bottom-right', 'success');
          setTimeout(() => {
            router.push({ name: 'Home-Page' });
          }, 2000);
        } else {
          this.showToast('Login failed', 'bottom-right', 'error');
        }
      } catch (error) {
        this.showToast('Login error!', 'top-right', 'error');
      }
    },

    async handleForgotPassword() {
      this.emailError = '';

      if (!this.payload.email) {
        this.emailError = 'Email is required to reset password.';
        return;
      }

      if (!this.validateEmail(this.payload.email)) {
        this.emailError = 'Invalid email format.';
        return;
      }

      try {
        const response = await this.forgotPassword(this.payload.email);
        if (response) {
          this.showToast('Password reset email sent!', 'bottom-right', 'success');
        } else {
          this.showToast('Failed to send password reset email', 'bottom-right', 'error');
        }
      } catch (error) {
        this.showToast('Error sending password reset email', 'top-right', 'error');
      }
    },

    showToast(message, position, backgroundcolor) {
      this.Toast = { message, position, backgroundcolor };
    },

    clearToast() {
      this.Toast.message = '';
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
