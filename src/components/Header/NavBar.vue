<template>
  <div class="navbar sticky top-0 bg-opacity-90 backdrop-blur">
    <div class="navbar-start">
      <div class="flex-1">
        <HandwrittenName class="btn btn-sm btn-ghost text-sm h-10 w-20 p-2" />
      </div>
    </div>
    <div class="navbar-center"></div>
    <!-- <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="User Avatar" src="https://github.com/tyree-z.png" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge badge-sm bg-accent">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import HandwrittenName from '@/components/Content/HandwrittenFirstName.vue'

// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
// ]
</script>
