<template>
  <div class="navbar sticky top-0 bg-opacity-90 backdrop-blur shadow-sm">
    <div class="navbar-start">
      <div class="flex-1">
        <router-link to="/">
          <HandwrittenName class="btn btn-sm btn-ghost h-10 w-15 p-2" />
        </router-link>
      </div>
    </div>
    <div class="navbar-center space-x-4">
      <!-- Navigation Links -->
      <!-- <router-link
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        class="nav-link text-sm"
        :class="{ 'active-link': routeObject.name === link.name }"
      >
        {{ link.label }}
      </router-link> -->
    </div>
    <div class="navbar-end">
      <!--  -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import HandwrittenName from '@/components/Content/HandwrittenFirstName.vue';

const router = useRouter();
let routeObject = router.currentRoute.value;

// Define route links
const navLinks = [
  { name: 'resume', path: '/resume', label: 'Resume' },
  { name: 'nemea', path: '/nemeaa', label: 'Nemea' }
];
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.nav-link {
  padding: 8px;
  font-family: 'Moon';
  color: #383838;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #1d4ed8;
}

.active-link {
  color: #1d4ed8;
  border-bottom: 2px solid #1d4ed8;
}
</style>
