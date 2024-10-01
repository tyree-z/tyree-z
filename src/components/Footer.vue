<template>
  <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-opacity-90 backdrop-blur shadow md:flex md:items-center md:justify-between md:p-4">
    <span class="text-xs text-base-content sm:text-center prevent-select">
      © {{ currentYear }} <router-link to="/" class="text-base-content">Tyree Zacharopoulos</router-link>. All Rights Reserved.
    </span>
    <span class="text-xs text-base-content sm:text-center prevent-select">
      <span id="packageVersion"></span><a id="commitHash" :href="latestCommitUrl"> - {{ latestCommitHash }}</a>
      <a href="https://uptime.tyree.ca" target="_blank" rel="noopener noreferrer" class="relative group ml-2">
        <span :class="['status-dot', apiStatus, 'inline-block', 'w-2.5', 'h-2.5', 'rounded-full', 'animate-pulse']"></span>
        <span
          class="absolute top-0 left-0 w-full h-full rounded-lg opacity-0 group-hover:opacity-100 group-hover:bg-opacity-20 group-hover:bg-gray-700 transition-opacity duration-300"
        ></span>
      </a>
    </span>
  </footer>
</template>

<script>
import axios from 'axios';
import packageJson from '../../package.json';

export default {
  name: 'FooterComponent',
  data() {
    return {
      latestCommitHash: '',
      latestCommitUrl: '',
      currentYear: '',
      apiStatus: 'offline',
      apiVersion: ''
    };
  },
  created() {
    this.fetchLatestCommit();
    this.checkApiStatus();
    this.currentYear = new Date().getFullYear().toString();
    this.$nextTick(() => {
      document.getElementById('packageVersion').innerHTML = 'v' + packageJson.version;
      /* TODO
        Show Frontend Version and Backend Version
        in Footer as F:v0.0.0/B:v0.0.0

        <span id="apiVersion"></span>
        document.getElementById('apiVersion').innerHTML = 'B:v' + this.apiVersion;

      */
      document.getElementById('commitHash').innerHTML = ' - ' + this.latestCommitHash;
    });
  },
  methods: {
    async fetchLatestCommit() {
      try {
        const response = await axios.get('https://api.tyree.ca/v1/web/github/latestcommit');
        this.latestCommitHash = response.data.short_hash; // Displaying first 7 characters of SHA as version
        this.latestCommitUrl = response.data.url;
      } catch (error) {
        console.error('Error fetching latest commit:', error);
      }
    },
    async checkApiStatus() {
      try {
        const response = await axios.get('https://api.tyree.ca/v1/status');
        if (response.status === 200 && response.data.health.alive === true) {
          this.apiStatus = 'online';
          this.apiVersion = response.data.version.api_version;
        } else {
          this.apiStatus = 'offline';
        }
      } catch (error) {
        this.apiStatus = 'offline';
        console.error('Error checking API status:', error);
      }
    }
  }
};
</script>

<style scoped>
.footer {
  text-decoration: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.online {
  @apply bg-green-700 shadow-green-500;
}
.offline {
  @apply bg-red-700 shadow-red-500;
}
</style>
