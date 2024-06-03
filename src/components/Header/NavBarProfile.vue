<template>
  <div class="navbar-nav flex-row order-md-last">
    <NavBarNotificationWidget />
    <div v-if="isAuthenticated" class="nav-item dropdown">
      <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
        <span class="avatar avatar-sm" :style="{ backgroundImage: `url(${user.picture})` }"></span>
        <div class="d-none d-xl-block ps-2">
          <div class="user-select-none">{{ user.name }}</div>
          <div class="user-select-none mt-1 small text-muted">{{ user.email }}</div>
        </div>
      </a>
      <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
        <a href="#" class="dropdown-item text-teal">Status</a>
        <a href="#" class="dropdown-item text-green">Profile</a>
        <a href="#" class="dropdown-item text-orange">Feedback</a>
        <div class="dropdown-divider"></div>
        <a href="./settings.html" class="dropdown-item text-yellow">Settings</a>
        <a href="#" class="dropdown-item text-danger" @click.prevent="authLogout">Logout</a>
      </div>
    </div>
    <LoginButton v-else />
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import LoginButton from '../Auth/LoginButton.vue';
import NavBarNotificationWidget from './NavBarNotificationWidget.vue';

const { isAuthenticated, user, logout } = useAuth0();

const authLogout = () => logout({ returnTo: window.location.origin });
</script>
