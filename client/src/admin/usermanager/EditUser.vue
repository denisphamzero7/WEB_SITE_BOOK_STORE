<template>
  <div class="p-6 bg-gray-700 min-h-screen">
    <!-- Header -->
    <h1 class="flex items-center font-medium text-3xl text-white mb-6">
      <li class="rounded-full bg-[#0f172ab3] p-3 text-xl text-white pi pi-box mr-3"></li>
      Edit Profile
    </h1>

    <!-- User Form -->
    <form @submit.prevent="updateUser">
      <div class="bg-[#0f172ab3] p-4 rounded-lg shadow-lg">
        <!-- Avatar Display and Upload -->
        <div class="mb-4">
          <label for="avatar" class="block text-white text-sm mb-2">Avatar</label>
          <div class="flex items-center">
            <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar" class="w-16 h-16 rounded-full mr-4">
            <input type="file" id="avatar" @change="handleAvatarChange" accept="image/*" class="p-2 bg-gray-800 text-white rounded">
          </div>
        </div>
        <!-- First Name -->     
        <div class="mb-4">
          <label for="firstname" class="block text-white text-sm">First Name</label>
          <input type="text" id="firstname" v-model="edituser.firstname" class="p-2 w-full bg-gray-800 text-white rounded">
        </div>
        <!-- Last Name -->
        <div class="mb-4">
          <label for="lastname" class="block text-white text-sm">Last Name</label>
          <input type="text" id="lastname" v-model="edituser.lastname" class="p-2 w-full bg-gray-800 text-white rounded">
        </div>
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-white text-sm">Email</label>
          <input type="email" id="email" v-model="edituser.email" class="p-2 w-full bg-gray-800 text-white rounded">
        </div>
        <!-- Mobile -->
        <div class="mb-4">
          <label for="mobile" class="block text-white text-sm">Mobile</label>
          <input type="tel" id="mobile" v-model="edituser.mobile" class="p-2 w-full bg-gray-800 text-white rounded">
        </div>
        <!-- Address -->
        <div class="mb-4">
          <label for="address" class="block text-white text-sm">Address</label>
          <textarea id="address" v-model="edituser.address" class="p-2 w-full bg-gray-800 text-white rounded"></textarea>
        </div>
        <!-- Role -->
        <div class="mb-4">
          <label for="role" class="block text-white text-sm">Role</label>
          <select id="role" v-model="edituser.role" class="p-2 w-full bg-gray-800 text-white rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <!-- Status -->
        <div class="mb-4">
          <label for="isBlocked" class="block text-white text-sm">Status</label>
          <select id="isBlocked" v-model="edituser.isBlocked" class="p-2 w-full bg-gray-800 text-white rounded">
            <option value="true">Blocked</option>
            <option value="false">Active</option>
          </select>
        </div>
        <!-- Submit Button -->
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update Profile
          </button>
        </div>
      </div>
    </form>
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
import { mapActions, mapGetters } from 'vuex';
import Toast from '../../components/Toast.vue'
import defaultAvatar from '../../assets/avatardefault.jpg'

export default {
  components: { Toast },
  data() {
    return {
      avatarFile: null,
      defaultAvatar,
      Toast: {
        message: '',
        position: '',
        backgroundcolor: ''
      },
      success:false
    };
  },
  mounted() {
    this.getUserById(this.$route.params.id);
  },
  computed: {
    ...mapGetters('user', ['edituser']),
    avatarUrl() {
      return this.edituser.avatar? this.edituser.avatar : defaultAvatar;
    }
  },
  methods: {
    clearToast() {
      this.Toast.message = '';
    },
    ...mapActions('user', ['updateUserByAdmin']),
    handleAvatarChange(event) {
      this.avatarFile = event.target.files[0];
    },
    async updateUser() {
      const formData = new FormData();
      formData.append('firstname', this.edituser.firstname);
      formData.append('lastname', this.edituser.lastname);
      formData.append('email', this.edituser.email);
      formData.append('address', this.edituser.address);
      formData.append('phone', this.edituser.mobile); // Corrected from phone to mobile
      formData.append('role', this.edituser.role);
      formData.append('isBlocked', this.edituser.isBlocked);
      if (this.avatarFile) {
        formData.append('avatar', this.avatarFile);
      }
      const id = this.$route.params.id;
      try {
        await this.updateUserByAdmin({ userId:id, data:formData });
        this.success = true;
        this.Toast = {
          message: 'Update successful!',
          position: 'bottom-left',
          backgroundcolor: 'success',
        };
       
      } catch (error) {
        this.Toast = {
          message: `Update failed`,
          position: 'bottom-left',
          backgroundcolor: 'error',
        };
      } 
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
