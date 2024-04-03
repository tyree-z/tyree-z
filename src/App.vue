<template>
  <transition name="fade">
    <div v-if="!loaded && !initialLoad" class="loading-screen">
      <span class="loading loading-ring loading-lg text-accent"></span>
    </div>
    <!-- TODO Optimize Loading Screen / Entry Point Into App -->
    <div v-else class="bg-base-300">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

const loaded = ref(false)

onMounted(() => {
  console.log(
    `Client device in dark mode: ${window.matchMedia('(prefers-color-scheme: dark)').matches}`
  )

  setTimeout(() => {
    loaded.value = true
  }, 1000)
})
</script>

<style>
.loading-screen {
  opacity: 1;
  transition: opacity 1s ease-out;
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
