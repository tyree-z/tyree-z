<template>
  <footer
    class="fixed bottom-0 left-0 z-20 w-full p-4 bg-opacity-90 backdrop-blur shadow md:flex md:items-center md:justify-between md:p-4"
  >
    <span class="text-xs text-base-content sm:text-center"
      >© 2023 <router-link to="/" class="text-base-content">Tyree Zacharopoulos</router-link>. All
      Rights Reserved.
    </span>
    <ul
      class="flex flex-wrap items-center mt-3 text-xs font-medium text-gray-700 dark:text-gray-400 sm:mt-0"
    >
      <!-- <li>
        <a href="#" class="mr-4 hover:underline md:mr-6">About</a>
      </li>
      <li>
        <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
      </li>
      <li>
        <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
      </li>
      <li>
        <a href="#" class="hover:underline">Contact</a>
      </li> -->
      <li class="ml-6">
        <p id="packageVersion"></p>
      </li>
    </ul>
  </footer>
</template>

<script>
import packageJson from '../../../package.json'
export default {
  name: 'FooterComponent',
  created() {
    this.$nextTick(() => {
      document.getElementById('packageVersion').innerHTML = 'v' + packageJson.version
    })
  }
}
</script>

<style scoped>
.footer {
  text-decoration: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
