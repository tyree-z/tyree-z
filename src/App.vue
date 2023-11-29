<template>
  <div v-if="!loaded && !initialLoad" class="loading-screen">
    <span class="loading loading-ring loading-lg text-accent"></span>
  </div>
  <!-- TODO Optimize Loading Screen / Entry Point Into App -->
  <div v-else class="bg-base-300">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

const loaded = ref(false)
// const initialLoad = localStorage.getItem('appLoaded') === 'true'
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

// If app has never loaded before, set a flag in localStorage
// if (!initialLoad) {
//   localStorage.setItem('appLoaded', 'true')
// }

// Lazy load the app content
onMounted(() => {
  console.log(`Client device in dark mode: ${prefersDark.matches}`)
  setTimeout(() => {
    loaded.value = true
  }, 1000)
})
</script>

<style>
.loading-screen {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
