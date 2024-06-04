<template>
  <div class="flex flex-row">
    <SidebarAdmin :collapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>

<script>
import SidebarAdmin from '../pages/sidebar/sideBar-Admin.vue';

export default {
  components: { SidebarAdmin },
  data() {
    return {
      isSidebarCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>
