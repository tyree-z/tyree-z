<template>
  <ParticleCanvas class="w-full h-full blur-lg" />
  <NavBar />
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="grid grid-cols-1 gap-3 prevent-select">
        <h1 class="statusCode">404</h1>
        <p>Not Found Sorry</p>
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
import ParticleCanvas from '@/components/Content/ParticleCanvas.vue';
import NavBar from '../components/NavBar.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
h1 {
  font-family: 'Moon';
  font-size: 150%;
  cursor: default;
}
p {
  font-family: 'Moon';
  cursor: default;
}
.statusCode {
  color: rgb(176, 159, 6);
}
.goBackCursor {
  cursor: alias;
}
</style>
