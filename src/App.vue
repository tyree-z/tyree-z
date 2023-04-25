<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Header/NavBar.vue'
import Footer from './components/Footer/Footer.vue'
</script>

<template>
  <NavBar />

  <RouterView />
  <Footer />
</template>
