<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center text-blue-600">Reset Password</h1>
      <form @submit.prevent="resetPassword">
        <div class="mb-4 relative">
          <label for="password" class="block text-gray-700">New Password</label>
          <input type="password" name="password" id="password" v-model="password" class="mt-2 p-2 w-full border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span class="absolute inset-y-0 bottom-[-50px] right-0 pr-3 flex items-center cursor-pointer" @click="togglePasswordVisibility('password')">
            <i :class="passwordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'" class="h-10 w-10 text-gray-500"></i>
          </span>
        </div>
        <div class="mb-4 relative">
          <label for="confirmPassword" class="block text-gray-700">Confirm New Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" v-model="confirmPassword" class="mt-2 p-2 w-full border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span class="absolute inset-y-0 right-0 bottom-[-50px] pr-3 flex items-center cursor-pointer" @click="togglePasswordVisibility('confirmPassword')">
            <i :class="confirmPasswordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'" class="h-10 w-10 text-gray-500"></i>
          </span>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Reset Password</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      confirmPasswordVisible: false
    };
  },
  methods: {
    ...mapActions('user', ['ResetPassword']),
    togglePasswordVisibility(field) {
      const input = document.getElementById(field);
      if (field === 'password') {
        this.passwordVisible = !this.passwordVisible;
        input.type = this.passwordVisible ? 'text' : 'password';
      } else if (field === 'confirmPassword') {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
        input.type = this.confirmPasswordVisible ? 'text' : 'password';
      }
    },
    async resetPassword() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      try {
        const token = this.$route.params.token;
        const response = await this.ResetPassword({ token, password: this.password });
        console.log('Password reset successful', response);
        alert('Password reset successful!');
      } catch (error) {
        console.error('Error resetting password:', error.message);
        alert('An error occurred while resetting your password. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
