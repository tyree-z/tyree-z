<template>
  <header class="navbar navbar-expand-md navbar-dark bg-purple-lt text-light d-print-none">
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
        <a href=".">
          <HandwrittenFirstName />
        </a>
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
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { IconListCheck } from '@tabler/icons-vue'

import NavBarProfile from './NavBarProfile.vue'
import HandwrittenFirstName from '../Content/HandwrittenFirstName.vue'
</script>

<style scoped>
a {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
