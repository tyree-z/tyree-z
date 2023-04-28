<template>
  <footer class="footer footer-transparent d-print-none">
    <div class="container-xl">
      <div class="row text-center align-items-center flex-row-reverse">
        <div class="col-12 col-lg-auto mt-3 mt-lg-0">
          <ul class="list-inline list-inline-dots mb-0">
            <li class="list-inline-item shadowText">
              Copyright © 2023
              <router-link to="/" class="link-secondary">Tyree Zacharopoulos</router-link> All
              rights reserved.
            </li>
            <li class="list-inline-item">
              <a class="link-secondary shadowText" rel="noopener"><a id="packageVersion"></a></a>
            </li>
            <!-- <li class="list-inline-item">BrowserID: <a id="bFP"></a></li> -->
          </ul>
        </div>
      </div>
    </div>
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
  position: fixed;
  bottom: 0;
  text-decoration: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: darkgray;
}
</style>
