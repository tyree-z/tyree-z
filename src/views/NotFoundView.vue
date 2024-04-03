<template>
  <ParticleCanvas class="w-full h-full blur-lg" />
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="grid grid-cols-1 gap-3">
        <h1 style="color: yellow">404</h1>
        <h1>Not Found Sorry</h1>
        <div class="max-w-md place-self-center">
          <div class="py-6">
            <div class="text-base-content">
              <router-link to="/" class="goBackCursor">Go Back</router-link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import ParticleCanvas from '../components/Content/ParticleCanvas.vue'
</script>

<style scoped>
h1 {
  font-family: 'Moon';
  font-size: 150%;
}
.goBackCursor {
  cursor: alias;
}
</style>
