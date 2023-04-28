<template>
  <header class="navbar navbar-expand-md bg-purple-lt d-print-none">
    <div class="container-xl">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-menu"
        aria-controls="navbar-menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <router-link to="/">
          <HandwrittenFirstName />
        </router-link>
      </h1>
      <NavBarProfile />
      <div class="collapse navbar-collapse" id="navbar-menu">
        <div
          class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="https://status.tyree.ca">
                <span class="nav-link-icon d-md-none d-lg-inline-block">
                  <IconListCheck class="icon icon-tabler icon-tabler-zoom-check" />
                </span>
                <span class="nav-link-title"> Service Status </span>
              </a>
            </li>
            <!--  -->

            <li
              v-if="isAuthenticated"
              class="nav-item dropdown"
              :class="{ active: $route.path === ['/apps/myschedule', '/apps/whosworking'] }"
            >
              <a
                class="nav-link dropdown-toggle"
                href="#navbar-apps"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                role="button"
                aria-expanded="false"
              >
                <span class="nav-link-icon d-md-none d-lg-inline-block"
                  ><IconCampfire class="icon" />
                </span>
                <span class="nav-link-title"> Apps </span>
              </a>
              <div class="dropdown-menu">
                <div class="dropend">
                  <a
                    class="dropdown-item dropdown-toggle"
                    href="#navbar-apps-work"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    role="button"
                    aria-expanded="false"
                  >
                    Work
                  </a>
                  <div class="dropdown-menu">
                    <router-link to="/apps/myschedule" class="dropdown-item"
                      >My Schedule</router-link
                    >
                    <router-link to="/apps/whosworking" class="dropdown-item"
                      >Whos Working Today</router-link
                    >
                  </div>
                </div>
              </div>
            </li>

            <!--  -->
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { IconListCheck, IconCampfire } from '@tabler/icons-vue'
import { useAuth0 } from '@auth0/auth0-vue'

import NavBarProfile from './NavBarProfile.vue'
import HandwrittenFirstName from '../Content/HandwrittenFirstName.vue'

const { isAuthenticated } = useAuth0()
</script>

<style scoped>
a {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

a,
.nav-link:hover {
  color: #d8d8d8;
  transition: 0.4s;
}
</style>
