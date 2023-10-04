<template>
  <footer
    class="fixed bottom-0 left-0 z-20 w-full p-4 bg-dark border-t border-gray-900 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600"
  >
    <span class="text-sm text-gray-700 sm:text-center dark:text-gray-400"
      >© 2023
      <router-link to="/" class="hover:underline text-primary">Tyree Zacharopoulos</router-link>.
      All Rights Reserved.</span
    >
    <ul
      class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-0"
    >
      <li>
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
