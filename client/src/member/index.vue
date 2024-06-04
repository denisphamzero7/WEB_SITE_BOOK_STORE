<template>
  <div class="container mx-auto ">
    <div class="pt-4 flex flex-col items-start text-white">
      <div class="flex items-center gap-2">
        <li class="pi pi-user text-3xl bg-[#0f172ab3] p-3 rounded-full"></li>
        <h1 class="text-3xl font-bold">{{ profile }}</h1>
      </div>
    </div>

    <div v-if="User">
      <div class="flex justify-center" >
        <img :src="User.avatar ? User.avatar : defaultAvatar" class="w-24 h-24 object-cover rounded-full mb-4" alt="User Avatar">
      </div>
    
      <form class="max-w-lg mx-auto mt-4" @submit.prevent="updateUser">
        <div class="mb-4" v-for="(label, key) in userFormLabels" :key="key">
          <label :for="key" class="block text-gray-700 font-bold mb-2">{{ label }}</label>
          <input
            v-if="key !== 'avatar'"
            :type="key === 'email' ? 'email' : 'text'"
            :id="key"
            v-model="User[key]"
            :name="key"
            class="block w-full px-4 py-2 border rounded-md text-gray-700 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <input v-else
            type="file"
            id="avatar"
            ref="avatar"
            accept="image/*"
            @change="onFileChange"
            class="block w-full px-4 py-2 border rounded-md text-gray-700 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Update</button>
      </form>
      <p class="text-gray-700 mt-4 text-center">Role: {{ User.role }}</p>
      <Toast v-if="Toast.message" :message="Toast.message" :duration="2000" :position="Toast.position" :backgroundcolor="Toast.backgroundcolor" @close="clearToast" />
    </div>
    <div v-else>
      <p>Loading user information...</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Toast from '../components/Toast.vue';
import defaultAvatar from '../assets/avatardefault.jpg'

export default {
  components: {
    Toast,
  },
  data() {
    return {
      Toast: {
        message: '',
        position: 'bottom-left',
        backgroundcolor: '',
      },
      avatarFile: null,
      profile: 'Profile',
      defaultAvatar // Define defaultAvatar in the data
    };
  },
  created() {
    this.fetchcurrentuser();
  },
  computed: {
    ...mapGetters('user', ['User']),
    userFormLabels() {
      return {
        firstname: 'First Name',
        lastname: 'Last Name',
        email: 'Email',
        mobile: 'Mobile',
        address: 'Address',
        avatar: 'Avatar',
      };
    },
  },
  methods: {
    ...mapActions('user', ['fetchcurrentuser', 'updatecurrentuser']),
    clearToast() {
      this.Toast.message = '';
    },
    async updateUser() {
      const formData = new FormData();
      Object.keys(this.userFormLabels).forEach((key) => {
        if (key === 'avatar' && this.avatarFile) {
          formData.append(key, this.avatarFile);
        } else {
          formData.append(key, this.User[key]);
        }
      });

      try {
        const response = await this.updatecurrentuser(formData);
        if (response.success) {
          this.Toast = {
            message: 'Update successful!',
            position: 'bottom-left',
            backgroundcolor: 'bg-green-500',
          };
        } else {
          throw new Error(response.message || 'Unknown error');
        }
      } catch (error) {
        this.Toast = {
          message: `Update failed: ${error.message}`,
          position: 'bottom-left',
          backgroundcolor: 'bg-red-500',
        };
      } finally {
        setTimeout(() => {
          this.clearToast();
        }, 3000);
      }
    },
    onFileChange(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.avatarFile = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.User.avatar = e.target.result;
        };
        reader.readAsDataURL(this.avatarFile);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add any custom styles here */
</style>
