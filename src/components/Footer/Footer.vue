<template>
  <footer
    class="fixed bottom-0 left-0 z-20 w-full p-4 bg-opacity-90 backdrop-blur shadow md:flex md:items-center md:justify-between md:p-4"
  >
    <span class="text-xs text-base-content sm:text-center"
      >© {{ currentYear }} <router-link to="/" class="text-base-content">Tyree Zacharopoulos</router-link>. All
      Rights Reserved.
    </span>
    <span class="text-xs text-base-content sm:text-center"
      ><span id="packageVersion"></span
      ><a id="commitHash" :href="latestCommitUrl"> - {{ latestCommitHash }}</a></span
    >
  </footer>
</template>

<script>
import axios from 'axios'
import packageJson from '../../../package.json'
export default {
  name: 'FooterComponent',
  data() {
    return {
      latestCommitHash: '',
      latestCommitUrl: '',
      currentYear: ''
    }
  },
  created() {
    this.fetchLatestCommit()
    this.currentYear = new Date().getFullYear().toString();
    this.$nextTick(() => {
      document.getElementById('packageVersion').innerHTML = 'v' + packageJson.version
      document.getElementById('commitHash').innerHTML = ' - ' + this.latestCommitHash
    })
  },
  methods: {
    async fetchLatestCommit() {
      try {
        // Get em
        const response = await axios.get('https://api.github.com/repos/tyree-z/tyree-z/commits')
        const latestCommitSha = response.data[0].sha
        const latestCommitHtmlUrl = response.data[0].html_url
        // Set em
        this.latestCommitHash = latestCommitSha.slice(0, 7) // Displaying first 7 characters of SHA as version
        this.latestCommitUrl = latestCommitHtmlUrl
      } catch (error) {
        console.error('Error fetching latest commit:', error)
      }
    }
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
