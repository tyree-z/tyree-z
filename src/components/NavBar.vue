<template>
  <div class="navbar sticky top-0 bg-opacity-90 backdrop-blur">
    <div class="navbar-start">
      <div class="flex-1">
        <router-link to="/">
          <HandwrittenName class="btn btn-sm btn-ghost text-sm h-10 w-20 p-2" />
        </router-link>
      </div>
    </div>
    <div class="navbar-center"></div>
    <div class="navbar-end">
      <!-- <div class="dropdown dropdown-end">
        <label tabindex="0" class="avatar">
          <div class="w-10 rounded-full">
            <img alt="User Avatar" src="https://github.com/tyree-z.png" />
          </div>
        </label>
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge badge-sm bg-accent">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import HandwrittenName from '@/components/Content/HandwrittenFirstName.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let routeObject = router.currentRoute.value;

/* TODO

-- NavBar Showing Current Page --

Ex. 
When Visitng "/" which is the "HomeView"
"NavBar" should show a subtle underline underneath navigation selections.

${routeObject.name} shows route name from vue-router.


*/
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
