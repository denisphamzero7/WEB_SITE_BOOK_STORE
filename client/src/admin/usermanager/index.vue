<template>
  <div class="p-6 bg-gray-700 min-h-screen">
    <!-- Header -->
    <h1 class="flex items-center font-medium text-3xl text-white mb-6">
      <li class="rounded-full bg-[#0f172ab3] p-3 text-xl text-white pi pi-box mr-3"></li>
      {{ header }}
    </h1>

    <!-- User Table -->
    <div class="bg-[#0f172ab3] p-4 rounded-lg shadow-lg overflow-x-auto">
      <div class="mb-4 flex justify-end">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by name..." 
          class="p-2 w-full sm:w-80 bg-gray-800 text-white rounded"
        />
      </div>
      <table class="min-w-full text-white border-collapse">
        <thead>
          <tr class="bg-gray-800">
            <th class="border border-gray-600 py-2 px-4">First Name</th>
            <th class="border border-gray-600 py-2 px-4">Last Name</th>
            <th class="border border-gray-600 py-2 px-4">Avatar</th>
            <th class="border border-gray-600 py-2 px-4">Roles</th>
            <th class="border border-gray-600 py-2 px-4">Email</th>
            <th class="border border-gray-600 py-2 px-4">Mobile</th>
            <th class="border border-gray-600 py-2 px-4">Status</th>
            <th class="border border-gray-600 py-2 px-4">Address</th>
            <th class="border border-gray-600 py-2 px-4">Create At</th>
            <th class="border border-gray-600 py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in paginatedUsers"
            :key="user._id"
            class="odd:bg-gray-700 even:bg-gray-800 hover:bg-gray-600"
          >
            <td class="border border-gray-600 py-2 px-4">{{ user.firstname }}</td>
            <td class="border border-gray-600 py-2 px-4">{{ user.lastname }}</td>
            <td class="border border-gray-600 py-2 px-4 overflow-hidden">
              <img :src="user.avatar ? user.avatar : defaultAvatar" class="object-contain w-14 h-14 rounded-xl" alt="" />
            </td>
            <td class="border border-gray-600 py-2 px-4">{{ user.role }}</td>
            <td class="border border-gray-600 py-2 px-4">{{ user.email }}</td>
            <td class="border border-gray-600 py-2 px-4">{{ user.mobile }}</td>
            <td class="border border-gray-600 py-2 px-4">{{ user.isBlocked ? 'Blocked' : 'Active' }}</td>
            <td class="border border-gray-600 py-2 px-4">{{ shortText(user.address, 30) }}</td>
            <td class="border border-gray-600 py-2 px-4">{{ formatDate(user.updatedAt) }}</td>
            <td class="border border-gray-600 py-2 px-4">
              <button @click="editUser(user)" class="text-blue-400 hover:text-blue-600">
                Edit
              </button>
              <button @click="deleteUser(user._id)" class="text-red-500 hover:text-red-700 ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center mt-4">
        <Pagination :totalItems="filteredUsers.length" :itemsPerPage="itemsPerPage" :currentPage="currentPage" @page-changed="handlePageChange" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { format } from 'date-fns';
import Pagination from '../../components/Pagination.vue';
import defaultAvatar from '../../assets/avatardefault.jpg';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 4,
      header: 'Users Manager',
      searchQuery: '',
      defaultAvatar,
    };
  },
  mounted() {
    this.fetchAllUsers({ page: this.currentPage, limit: this.itemsPerPage });
  },
  computed: {
    ...mapGetters('user', ['users']),
    filteredUsers() {
      let filtered = this.users;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((user) => {
          const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
          return fullName.includes(query);
        });
      }
      return filtered;
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredUsers.slice(start, end);
    },
  },
  methods: {
    ...mapActions('user', ['fetchAllUsers', 'deleteUser']),
    editUser(user) {
      this.$router.push({ name: 'Edit-User', params: { id: user._id } });
    },
    shortText(text, maxLength) {
      if (text) {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      } else {
        return '';
      }
    },
    formatDate(date) {
      return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
