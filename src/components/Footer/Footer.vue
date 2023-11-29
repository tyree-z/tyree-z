<template>
  <footer
    class="fixed bottom-0 left-0 z-20 w-full p-4 bg-opacity-90 backdrop-blur shadow md:flex md:items-center md:justify-between md:p-4"
  >
    <span class="text-xs text-base-content sm:text-center"
      >© 2023 <router-link to="/" class="text-base-content">Tyree Zacharopoulos</router-link>. All
      Rights Reserved.
    </span>
    <span class="text-xs text-base-content sm:text-center"><span id="packageVersion"></span></span>
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
